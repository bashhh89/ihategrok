const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const UAParser = require('ua-parser-js');
const path = require('path');

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
      visitor_id TEXT NOT NULL,
      session_id TEXT NOT NULL,
      page_url TEXT NOT NULL,
      page_title TEXT,
      page_host TEXT,
      referrer TEXT,
      user_agent TEXT,
      browser TEXT,
      os TEXT,
      device TEXT
    )
  `);

  // Events table
  db.run(`
    CREATE TABLE IF NOT EXISTS events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
      visitor_id TEXT NOT NULL,
      session_id TEXT NOT NULL,
      event_name TEXT NOT NULL,
      event_data TEXT,
      page_url TEXT,
      user_agent TEXT
    )
  `);

  // Sessions table
  db.run(`
    CREATE TABLE IF NOT EXISTS sessions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      session_id TEXT UNIQUE NOT NULL,
      visitor_id TEXT NOT NULL,
      start_time DATETIME DEFAULT CURRENT_TIMESTAMP,
      last_activity DATETIME DEFAULT CURRENT_TIMESTAMP,
      page_count INTEGER DEFAULT 0,
      referrer TEXT,
      user_agent TEXT
    )
  `);
});

// Helper function to parse user agent
function parseUserAgent(userAgent) {
  const parser = new UAParser(userAgent);
  const result = parser.getResult();
  return {
    browser: result.browser.name || 'Unknown',
    os: result.os.name || 'Unknown',
    device: result.device.type || 'desktop'
  };
}

// Track any event (unified endpoint)
app.post('/track', (req, res) => {
  const { type, visitor_id, session_id, timestamp, user_agent, referrer, ...data } = req.body;
  
  if (!visitor_id || !session_id) {
    return res.status(400).json({ error: 'Missing visitor_id or session_id' });
  }

  const parsedUA = parseUserAgent(user_agent);

  if (type === 'page_view') {
    const { page_url, page_title, page_host } = data;
    
    db.run(`
      INSERT INTO page_views (visitor_id, session_id, page_url, page_title, page_host, referrer, user_agent, browser, os, device)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [visitor_id, session_id, page_url, page_title, page_host, referrer, user_agent, parsedUA.browser, parsedUA.os, parsedUA.device], (err) => {
      if (err) {
        console.error('Error inserting page view:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      
      // Update session
      db.run(`
        INSERT OR REPLACE INTO sessions (session_id, visitor_id, start_time, last_activity, page_count, referrer, user_agent)
        VALUES (?, ?, 
          COALESCE((SELECT start_time FROM sessions WHERE session_id = ?), datetime('now')),
          datetime('now'),
          COALESCE((SELECT page_count FROM sessions WHERE session_id = ?), 0) + 1,
          ?, ?)
      `, [session_id, visitor_id, session_id, session_id, referrer, user_agent]);

      res.json({ success: true });
    });
  } else if (type === 'event') {
    const { event_name, event_data, page_url } = data;
    
    db.run(`
      INSERT INTO events (visitor_id, session_id, event_name, event_data, page_url, user_agent)
      VALUES (?, ?, ?, ?, ?, ?)
    `, [visitor_id, session_id, event_name, JSON.stringify(event_data), page_url, user_agent], (err) => {
      if (err) {
        console.error('Error inserting event:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json({ success: true });
    });
  } else {
    res.status(400).json({ error: 'Invalid type' });
  }
});

// Analytics API endpoints
app.get('/api/stats/overview', (req, res) => {
  const days = parseInt(req.query.days) || 7;
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);
  
  db.get(`
    SELECT 
      COUNT(*) as total_views,
      COUNT(DISTINCT pv.visitor_id) as unique_visitors,
      COUNT(DISTINCT pv.page_url) as unique_pages,
      ROUND(AVG(CASE WHEN s.page_count = 1 THEN 1.0 ELSE 0.0 END) * 100, 1) as bounce_rate
    FROM page_views pv
    LEFT JOIN sessions s ON pv.session_id = s.session_id
    WHERE pv.timestamp >= datetime(?)
  `, [startDate.toISOString()], (err, row) => {
    if (err) {
      console.error('Error getting overview:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(row);
  });
});

app.get('/api/stats/daily', (req, res) => {
  const days = parseInt(req.query.days) || 7;
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);
  
  db.all(`
    SELECT 
      date(timestamp) as date,
      COUNT(*) as views,
      COUNT(DISTINCT visitor_id) as visitors
    FROM page_views 
    WHERE timestamp >= datetime(?)
    GROUP BY date(timestamp)
    ORDER BY date(timestamp)
  `, [startDate.toISOString()], (err, rows) => {
    if (err) {
      console.error('Error getting daily stats:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(rows);
  });
});

app.get('/api/stats/pages', (req, res) => {
  const days = parseInt(req.query.days) || 7;
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);
  
  db.all(`
    SELECT 
      page_url,
      page_title,
      COUNT(*) as views,
      COUNT(DISTINCT visitor_id) as unique_visitors
    FROM page_views 
    WHERE timestamp >= datetime(?)
    GROUP BY page_url, page_title
    ORDER BY views DESC
    LIMIT 10
  `, [startDate.toISOString()], (err, rows) => {
    if (err) {
      console.error('Error getting page stats:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(rows);
  });
});

app.get('/api/stats/events', (req, res) => {
  const days = parseInt(req.query.days) || 7;
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);
  
  db.all(`
    SELECT 
      event_name,
      COUNT(*) as count
    FROM events 
    WHERE timestamp >= datetime(?)
    GROUP BY event_name
    ORDER BY count DESC
    LIMIT 10
  `, [startDate.toISOString()], (err, rows) => {
    if (err) {
      console.error('Error getting event stats:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(rows);
  });
});

app.get('/api/stats/browsers', (req, res) => {
  const days = parseInt(req.query.days) || 7;
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);
  
  db.all(`
    SELECT 
      browser,
      COUNT(DISTINCT visitor_id) as count
    FROM page_views 
    WHERE timestamp >= datetime(?)
    GROUP BY browser
    ORDER BY count DESC
    LIMIT 6
  `, [startDate.toISOString()], (err, rows) => {
    if (err) {
      console.error('Error getting browser stats:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(rows);
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Analytics server running on http://0.0.0.0:${PORT}`);
  console.log(`Dashboard available at http://0.0.0.0:${PORT}`);
});