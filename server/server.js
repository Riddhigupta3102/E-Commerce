import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

import productsRouter from './routes/products.js';
import couponsRouter from './routes/coupons.js';
import ordersRouter from './routes/orders.js';
import authRouter from './routes/auth.js';
import reviewsRouter from './routes/reviews.js';
import { CATEGORIES } from './data/categories.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// API Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'ShopX Node.js Fullstack Backend is running',
    timestamp: new Date().toISOString()
  });
});

// Mount Routes
app.use('/api/products', productsRouter);
app.use('/api/coupons', couponsRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/auth', authRouter);
app.use('/api/reviews', reviewsRouter);

// Direct Category & Customer Routes
app.get('/api/categories', (req, res) => {
  res.json(CATEGORIES);
});

app.get('/api/customers', (req, res) => {
  try {
    const data = fs.readFileSync(path.join(__dirname, 'data/users.json'), 'utf8');
    res.json(JSON.parse(data));
  } catch {
    res.json([]);
  }
});

// Serve frontend in production if dist exists
const distPath = path.join(__dirname, '../dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
}

// Fallback handler for client-side routing & 404
app.use((req, res) => {
  if (!req.path.startsWith('/api') && fs.existsSync(path.join(distPath, 'index.html'))) {
    res.sendFile(path.join(distPath, 'index.html'));
  } else {
    res.status(404).json({ message: 'API route not found' });
  }
});

app.listen(PORT, () => {
  console.log(`=========================================`);
  console.log(`🚀 ShopX Fullstack Backend Server Running`);
  console.log(`📡 URL: http://localhost:${PORT}`);
  console.log(`🩺 Health: http://localhost:${PORT}/api/health`);
  console.log(`🛍️ Products: http://localhost:${PORT}/api/products`);
  console.log(`=========================================`);
});
