import express from 'express';
import { COUPONS } from '../data/coupons.js';

const router = express.Router();

// GET /api/coupons
router.get('/', (req, res) => {
  res.json(COUPONS);
});

// POST /api/coupons/apply
router.post('/apply', (req, res) => {
  const { code, subtotal = 0 } = req.body;

  if (!code || !code.trim()) {
    return res.status(400).json({ valid: false, message: 'Please enter a coupon code' });
  }

  const cleanCode = code.trim().toUpperCase();
  const coupon = COUPONS.find((c) => c.code === cleanCode);

  if (!coupon) {
    return res.status(404).json({ valid: false, message: `Coupon code "${cleanCode}" is invalid` });
  }

  const numSubtotal = parseFloat(subtotal) || 0;
  if (coupon.minSpend && numSubtotal < coupon.minSpend) {
    return res.status(400).json({
      valid: false,
      message: `Coupon "${cleanCode}" requires minimum order of ₹${coupon.minSpend}`,
    });
  }

  let discountAmount = 0;
  if (coupon.type === 'percentage') {
    discountAmount = (numSubtotal * coupon.value) / 100;
  } else if (coupon.type === 'fixed') {
    discountAmount = Math.min(numSubtotal, coupon.value);
  }

  res.json({
    valid: true,
    coupon,
    discountAmount,
    message: `Coupon "${cleanCode}" applied successfully!`,
  });
});

export default router;
