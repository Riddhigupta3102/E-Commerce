import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const usersFilePath = path.join(__dirname, '../data/users.json');

const router = express.Router();

const DEMO_USER = {
  id: 'usr-98124',
  name: 'Riddhi Gupta',
  email: 'riddhi.gupta@example.com',
  phone: '+1 (555) 345-6789',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
  role: 'VIP Member',
  memberSince: '2024-03-15',
  addresses: [
    {
      id: 'addr-1',
      isDefault: true,
      fullName: 'Riddhi Gupta',
      phone: '+1 (555) 345-6789',
      street: '742 Evergreen Terrace, Penthouse 4B',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94107',
      country: 'United States',
      label: 'Home'
    },
    {
      id: 'addr-2',
      isDefault: false,
      fullName: 'Riddhi Gupta (Design Studio)',
      phone: '+1 (555) 890-1234',
      street: '500 Howard Street, Suite 1200',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94105',
      country: 'United States',
      label: 'Work'
    }
  ]
};

function getUsers() {
  try {
    if (fs.existsSync(usersFilePath)) {
      const data = fs.readFileSync(usersFilePath, 'utf8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Error reading users file:', err);
  }
  return [DEMO_USER];
}

function saveUsers(users) {
  try {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), 'utf8');
  } catch (err) {
    console.error('Error saving users file:', err);
  }
}

// POST /api/auth/login
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Please provide both email and password' });
  }

  const users = getUsers();
  let user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());

  if (!user) {
    // For demo/simple fullstack: auto-create or adapt user
    const name = email.includes('riddhi')
      ? 'Riddhi Gupta'
      : email.split('@')[0].replace('.', ' ').replace(/\b\w/g, (l) => l.toUpperCase());

    user = {
      ...DEMO_USER,
      id: 'usr-' + Math.floor(Math.random() * 90000 + 10000),
      name,
      email: email.trim()
    };
    users.push(user);
    saveUsers(users);
  }

  res.json({
    success: true,
    message: `Welcome back, ${user.name}!`,
    user
  });
});

// POST /api/auth/register
router.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: 'Please fill in all required fields' });
  }

  const users = getUsers();
  const existing = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    return res.status(400).json({ success: false, message: 'User with this email already exists' });
  }

  const newUser = {
    id: 'usr-' + Math.floor(Math.random() * 90000 + 10000),
    name: name.trim(),
    email: email.trim(),
    phone: '',
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`,
    role: 'Member',
    memberSince: new Date().toISOString().split('T')[0],
    addresses: []
  };

  users.push(newUser);
  saveUsers(users);

  res.status(201).json({
    success: true,
    message: `Welcome to ShopX, ${name}! Your account has been created.`,
    user: newUser
  });
});

// GET /api/auth/customers or /api/auth/users
router.get(['/customers', '/users'], (req, res) => {
  const users = getUsers();
  res.json(users);
});

// GET /api/auth/profile
router.get('/profile', (req, res) => {
  const users = getUsers();
  const user = users[0] || DEMO_USER;
  res.json(user);
});

// PUT /api/auth/profile
router.put('/profile', (req, res) => {
  const updates = req.body;
  const users = getUsers();
  const userId = req.body.id || users[0]?.id;

  const userIdx = users.findIndex((u) => u.id === userId);
  if (userIdx === -1) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }

  users[userIdx] = { ...users[userIdx], ...updates };
  saveUsers(users);

  res.json({
    success: true,
    message: 'Profile updated successfully',
    user: users[userIdx]
  });
});

// POST /api/auth/addresses
router.post('/addresses', (req, res) => {
  const addressData = req.body;
  const users = getUsers();
  const user = users[0];

  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }

  const newAddress = {
    id: 'addr-' + Date.now(),
    isDefault: !user.addresses || user.addresses.length === 0 || !!addressData.isDefault,
    ...addressData
  };

  if (newAddress.isDefault) {
    user.addresses = (user.addresses || []).map((a) => ({ ...a, isDefault: false }));
  }

  user.addresses = [...(user.addresses || []), newAddress];
  saveUsers(users);

  res.status(201).json({
    success: true,
    message: 'Address saved successfully',
    addresses: user.addresses,
    newAddress
  });
});

// DELETE /api/auth/addresses/:id
router.delete('/addresses/:id', (req, res) => {
  const { id } = req.params;
  const users = getUsers();
  const user = users[0];

  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }

  user.addresses = (user.addresses || []).filter((a) => a.id !== id);
  saveUsers(users);

  res.json({
    success: true,
    message: 'Address removed',
    addresses: user.addresses
  });
});

export default router;
