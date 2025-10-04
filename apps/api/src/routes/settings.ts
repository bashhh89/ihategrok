import express from 'express';
import fs from 'fs';
import path from 'path';
import multer from 'multer';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = express.Router();

// ensure upload folder exists in web public
const uploadDir = path.join(__dirname, '..', '..', 'web', 'public', 'uploads');
fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const unique = `${Date.now()}-${file.originalname}`;
    cb(null, unique);
  },
});

const upload = multer({ storage });

// GET /api/settings - returns brand_settings JSON (if any)
router.get('/', async (_req, res) => {
  try {
    const row = await prisma.setting.findUnique({ where: { key: 'brand_settings' } });
    if (!row) return res.json({});
    return res.json(JSON.parse(row.value));
  } catch (err) {
    console.error('Error fetching settings', err);
    return res.status(500).json({ error: 'Failed to fetch settings' });
  }
});

// PUT /api/settings - save brand settings JSON
router.put('/', express.json(), async (req, res) => {
  try {
    const payload = req.body || {};
    const value = JSON.stringify(payload);
    const existing = await prisma.setting.findUnique({ where: { key: 'brand_settings' } });
    if (existing) {
      await prisma.setting.update({ where: { key: 'brand_settings' }, data: { value } });
    } else {
      await prisma.setting.create({ data: { key: 'brand_settings', value } });
    }
    return res.json({ ok: true });
  } catch (err) {
    console.error('Error saving settings', err);
    return res.status(500).json({ error: 'Failed to save settings' });
  }
});

// POST /api/settings/logo - upload a logo image
router.post('/logo', upload.single('logo'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    // return public path for frontend
    const publicPath = `/uploads/${req.file.filename}`;
    return res.json({ url: publicPath });
  } catch (err) {
    console.error('Logo upload error', err);
    return res.status(500).json({ error: 'Failed to upload logo' });
  }
});

// GET /api/settings/selectedModel - get saved AI model
router.get('/selectedModel', async (_req, res) => {
  try {
    const row = await prisma.setting.findUnique({ where: { key: 'selected_ai_model' } });
    if (!row) return res.json({ model: null });
    return res.json({ model: row.value });
  } catch (err) {
    console.error('Error fetching selected model', err);
    return res.status(500).json({ error: 'Failed to fetch selected model' });
  }
});

// PUT /api/settings/selectedModel - save AI model selection
router.put('/selectedModel', express.json(), async (req, res) => {
  try {
    const { model } = req.body;
    if (!model) return res.status(400).json({ error: 'Model is required' });
    
    const existing = await prisma.setting.findUnique({ where: { key: 'selected_ai_model' } });
    if (existing) {
      await prisma.setting.update({ 
        where: { key: 'selected_ai_model' }, 
        data: { value: model } 
      });
    } else {
      await prisma.setting.create({ 
        data: { key: 'selected_ai_model', value: model } 
      });
    }
    console.log('Saved selected AI model:', model);
    return res.json({ ok: true, model });
  } catch (err) {
    console.error('Error saving selected model', err);
    return res.status(500).json({ error: 'Failed to save selected model' });
  }
});

export { router as settingsRoutes };
