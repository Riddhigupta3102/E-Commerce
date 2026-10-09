import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ordersFilePath = path.join(__dirname, '../data/orders.json');

const router = express.Router();

// Initial demo orders
const INITIAL_ORDERS = [
  {
    id: 'SX-89241',
    date: '2026-08-28T14:32:00Z',
    status: 'Delivered',
    total: 317.99,
    subtotal: 339.98,
    discount: 33.99,
    delivery: 0.00,
    tax: 12.00,
    paymentMethod: 'Credit Card (**** 4242)',
    shippingAddress: {
      fullName: 'Riddhi Gupta',
      street: '742 Evergreen Terrace, Penthouse 4B',
      city: 'San Francisco, CA 94107'
    },
    items: [
      {
        id: 'prod-1',
        name: 'Apex Pro ANC Wireless Headphones',
        price: 249.99,
        quantity: 1,
        color: 'Midnight Black',
        size: 'Standard Over-Ear',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=200&q=80'
      },
      {
        id: 'prod-20',
        name: 'Ceramic Ultrasonic Aroma Diffuser & Ambient Lamp',
        price: 68.00,
        quantity: 1,
        color: 'Terracotta Matte',
        size: '300ml Capacity',
        image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=200&q=80'
      }
    ]
  },
  {
    id: 'SX-85410',
    date: '2026-07-12T09:15:00Z',
    status: 'Delivered',
    total: 179.99,
    subtotal: 179.99,
    discount: 0,
    delivery: 0,
    tax: 0,
    paymentMethod: 'Apple Pay',
    shippingAddress: {
      fullName: 'Riddhi Gupta',
      street: '742 Evergreen Terrace, Penthouse 4B',
      city: 'San Francisco, CA 94107'
    },
    items: [
      {
        id: 'prod-14',
        name: 'Strata Flow Carbon Running Shoes',
        price: 179.99,
        quantity: 1,
        color: 'Crimson Surge',
        size: 'US 8',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=200&q=80'
      }
    ]
  }
];

// Helper to load orders
function getOrders() {
  try {
    if (fs.existsSync(ordersFilePath)) {
      const data = fs.readFileSync(ordersFilePath, 'utf8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Error reading orders file:', err);
  }
  return [...INITIAL_ORDERS];
}

// Helper to save orders
function saveOrders(orders) {
  try {
    fs.writeFileSync(ordersFilePath, JSON.stringify(orders, null, 2), 'utf8');
  } catch (err) {
    console.error('Error saving orders file:', err);
  }
}

// GET /api/orders
router.get('/', (req, res) => {
  const orders = getOrders();
  res.json(orders);
});

// GET /api/orders/:id
router.get('/:id', (req, res) => {
  const orders = getOrders();
  const order = orders.find((o) => o.id.toLowerCase() === req.params.id.toLowerCase());

  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }

  res.json(order);
});

// POST /api/orders
router.post('/', (req, res) => {
  const {
    items = [],
    total = 0,
    subtotal = 0,
    discount = 0,
    delivery = 0,
    tax = 0,
    paymentMethod = 'Credit Card',
    shippingAddress = null,
    shippingOption = 'standard'
  } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({ message: 'Order must contain at least one item' });
  }

  const newOrder = {
    id: 'SX-' + Math.floor(Math.random() * 90000 + 10000),
    date: new Date().toISOString(),
    status: 'Processing',
    total: parseFloat(total) || 0,
    subtotal: parseFloat(subtotal) || 0,
    discount: parseFloat(discount) || 0,
    delivery: parseFloat(delivery) || 0,
    tax: parseFloat(tax) || 0,
    paymentMethod,
    shippingOption,
    shippingAddress: shippingAddress || {
      fullName: 'Valued Customer',
      street: '742 Evergreen Terrace, Penthouse 4B',
      city: 'San Francisco, CA 94107'
    },
    items
  };

  const orders = getOrders();
  const updatedOrders = [newOrder, ...orders];
  saveOrders(updatedOrders);

  res.status(201).json({
    success: true,
    message: 'Order created successfully',
    order: newOrder
  });
});

export default router;
