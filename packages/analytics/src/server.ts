import express from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';
import { format, subDays, startOfDay, endOfDay } from 'date-fns';
import UAParser from 'ua-parser-js';
import path from 'path';

const app = express();
const PORT = 3010;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files (dashboard)
app.use(express.static(path.join(__dirname, '../public')));

// Database setup
const db = new sqlite3.Database('./analytics.db');

// Initialize database tables
db.serialize(() => {
  // Page views table
  db.run(`
    CREATE TABLE IF NOT EXISTS page_views (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
      page_url TEXT NOT NULL,
      page_title TEXT,
      referrer TEXT,
      user_agent TEXT,
      ip_address TEXT,
      session_id TEXT,
      browser TEXT,
      os TEXT,
      device_type TEXT,
      country TEXT
    )
  `);

  // Events table
  db.run(`
    CREATE TABLE IF NOT EXISTS events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
      event_name TEXT NOT NULL,
      event_data TEXT,
      page_url TEXT,
      session_id TEXT,
      ip_address TEXT
    )
  `);

  // Sessions table
  db.run(`
    CREATE TABLE IF NOT EXISTS sessions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      session_id TEXT UNIQUE,
      first_visit DATETIME DEFAULT CURRENT_TIMESTAMP,
      last_visit DATETIME DEFAULT CURRENT_TIMESTAMP,
      page_count INTEGER DEFAULT 1,
      is_bounce BOOLEAN DEFAULT true
    )
  `);
});

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Middleware to extract IP
const getClientIP = (req: any) => {
  return req.headers['x-forwarded-for'] || 
         req.connection.remoteAddress || 
         req.socket.remoteAddress ||
         (req.connection.socket ? req.connection.socket.remoteAddress : null);
};

// Track page view
app.post('/track/pageview', (req, res) => {
  const {
    url,
    title,
    referrer,
    sessionId
  } = req.body;

  const userAgent = req.headers['user-agent'] || '';
  const ip = getClientIP(req);
  const parser = new UAParser(userAgent);
  const result = parser.getResult();

  // Insert page view
  db.run(`
    INSERT INTO page_views (
      page_url, page_title, referrer, user_agent, ip_address, 
      session_id, browser, os, device_type
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `, [
    url,
    title,
    referrer,
    userAgent,
    ip,
    sessionId,
    `${result.browser.name} ${result.browser.version}`,
    `${result.os.name} ${result.os.version}`,
    result.device.type || 'desktop'
  ]);

  // Update or create session
  db.run(`
    INSERT OR REPLACE INTO sessions (session_id, first_visit, last_visit, page_count, is_bounce)
    VALUES (
      ?,
      COALESCE((SELECT first_visit FROM sessions WHERE session_id = ?), CURRENT_TIMESTAMP),
      CURRENT_TIMESTAMP,
      COALESCE((SELECT page_count FROM sessions WHERE session_id = ?) + 1, 1),
      CASE WHEN COALESCE((SELECT page_count FROM sessions WHERE session_id = ?), 0) > 0 THEN false ELSE true END
    )
  `, [sessionId, sessionId, sessionId, sessionId]);

  res.json({ success: true });
});

// Track event
app.post('/track/event', (req, res) => {
  const {
    name,
    data,
    url,
    sessionId
  } = req.body;

  const ip = getClientIP(req);

  db.run(`
    INSERT INTO events (event_name, event_data, page_url, session_id, ip_address)
    VALUES (?, ?, ?, ?, ?)
  `, [name, JSON.stringify(data || {}), url, sessionId, ip]);

  res.json({ success: true });
});

// Analytics dashboard data endpoints
app.get('/api/stats/overview', (req, res) => {
  const days = parseInt(req.query.days as string) || 7;
  const startDate = format(subDays(new Date(), days), 'yyyy-MM-dd');

  db.all(`
    SELECT 
      COUNT(*) as total_views,
      COUNT(DISTINCT session_id) as unique_visitors,
      COUNT(DISTINCT page_url) as unique_pages,
      AVG(CASE WHEN is_bounce THEN 1 ELSE 0 END) * 100 as bounce_rate
    FROM page_views 
    WHERE DATE(timestamp) >= ?
  `, [startDate], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows[0] || {});
  });
});

app.get('/api/stats/daily', (req, res) => {
  const days = parseInt(req.query.days as string) || 7;
  const startDate = format(subDays(new Date(), days), 'yyyy-MM-dd');

  db.all(`
    SELECT 
      DATE(timestamp) as date,
      COUNT(*) as views,
      COUNT(DISTINCT session_id) as visitors
    FROM page_views 
    WHERE DATE(timestamp) >= ?
    GROUP BY DATE(timestamp)
    ORDER BY date
  `, [startDate], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows || []);
  });
});

app.get('/api/stats/pages', (req, res) => {
  const days = parseInt(req.query.days as string) || 7;
  const startDate = format(subDays(new Date(), days), 'yyyy-MM-dd');

  db.all(`
    SELECT 
      page_url,
      page_title,
      COUNT(*) as views,
      COUNT(DISTINCT session_id) as unique_visitors
    FROM page_views 
    WHERE DATE(timestamp) >= ?
    GROUP BY page_url, page_title
    ORDER BY views DESC
    LIMIT 10
  `, [startDate], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows || []);
  });
});

app.get('/api/stats/events', (req, res) => {
  const days = parseInt(req.query.days as string) || 7;
  const startDate = format(subDays(new Date(), days), 'yyyy-MM-dd');

  db.all(`
    SELECT 
      event_name,
      COUNT(*) as count
    FROM events 
    WHERE DATE(timestamp) >= ?
    GROUP BY event_name
    ORDER BY count DESC
    LIMIT 10
  `, [startDate], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows || []);
  });
});

app.get('/api/stats/browsers', (req, res) => {
  const days = parseInt(req.query.days as string) || 7;
  const startDate = format(subDays(new Date(), days), 'yyyy-MM-dd');

  db.all(`
    SELECT 
      browser,
      COUNT(*) as count
    FROM page_views 
    WHERE DATE(timestamp) >= ? AND browser IS NOT NULL
    GROUP BY browser
    ORDER BY count DESC
    LIMIT 10
  `, [startDate], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows || []);
  });
});

app.listen(PORT, () => {
  console.log(`📊 Analytics server running on http://localhost:${PORT}`);
});