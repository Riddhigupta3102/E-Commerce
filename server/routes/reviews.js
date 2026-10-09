import express from 'express';
import { TESTIMONIALS } from '../data/reviews.js';

const router = express.Router();

// GET /api/reviews
router.get('/', (req, res) => {
  res.json(TESTIMONIALS);
});

export default router;
