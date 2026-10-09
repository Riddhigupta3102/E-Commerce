import express from 'express';
import { PRODUCTS, BRANDS } from '../data/products.js';
import { CATEGORIES } from '../data/categories.js';

const router = express.Router();

/**
 * GET /api/products
 * Query params: search, category, subcategory, brand, minPrice, maxPrice, rating, inStockOnly, sortBy, page, limit
 */
router.get('/', (req, res) => {
  try {
    let list = [...PRODUCTS];

    const {
      search = '',
      category = 'all',
      subcategory = 'all',
      brand = 'all',
      minPrice = 0,
      maxPrice = 5000,
      rating = 0,
      inStockOnly = 'false',
      sortBy = 'featured',
      page = 1,
      limit = 12,
    } = req.query;

    const parsedMinPrice = parseFloat(minPrice) || 0;
    const parsedMaxPrice = parseFloat(maxPrice) || 5000;
    const parsedRating = parseFloat(rating) || 0;
    const parsedInStockOnly = inStockOnly === 'true' || inStockOnly === true;
    const parsedPage = parseInt(page, 10) || 1;
    const parsedLimit = parseInt(limit, 10) || 12;

    // Search
    if (search && search.trim()) {
      const q = search.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          (p.shortDescription && p.shortDescription.toLowerCase().includes(q))
      );
    }

    // Category
    if (category && category !== 'all') {
      list = list.filter((p) => p.category === category);
    }

    // Subcategory
    if (subcategory && subcategory !== 'all') {
      list = list.filter((p) => p.subcategory === subcategory);
    }

    // Brand
    if (brand && brand !== 'all') {
      list = list.filter((p) => p.brand.toLowerCase() === brand.toLowerCase());
    }

    // Price
    list = list.filter((p) => p.price >= parsedMinPrice && p.price <= parsedMaxPrice);

    // Rating
    if (parsedRating > 0) {
      list = list.filter((p) => p.rating >= parsedRating);
    }

    // In Stock
    if (parsedInStockOnly) {
      list = list.filter((p) => p.inStock && p.stock > 0);
    }

    // Sorting
    switch (sortBy) {
      case 'price-asc':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        list.sort((a, b) => b.price - a.price);
        break;
      case 'rating-desc':
        list.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        list.sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0));
        break;
      case 'discount':
        list.sort((a, b) => b.discount - a.discount);
        break;
      case 'featured':
      default:
        list.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
        break;
    }

    const total = list.length;
    const totalPages = Math.ceil(total / parsedLimit) || 1;
    const startIndex = (parsedPage - 1) * parsedLimit;
    const paginatedProducts = list.slice(startIndex, startIndex + parsedLimit);

    res.json({
      products: paginatedProducts,
      total,
      totalPages,
      currentPage: parsedPage,
      limit: parsedLimit,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
});

// GET /api/products/featured
router.get('/featured', (req, res) => {
  const limit = parseInt(req.query.limit, 10) || 8;
  const items = PRODUCTS.filter((p) => p.isFeatured).slice(0, limit);
  res.json(items);
});

// GET /api/products/trending
router.get('/trending', (req, res) => {
  const limit = parseInt(req.query.limit, 10) || 8;
  const items = PRODUCTS.filter((p) => p.isTrending).slice(0, limit);
  res.json(items);
});

// GET /api/products/best-sellers
router.get('/best-sellers', (req, res) => {
  const limit = parseInt(req.query.limit, 10) || 8;
  const items = PRODUCTS.filter((p) => p.isBestSeller).slice(0, limit);
  res.json(items);
});

// GET /api/products/new-arrivals
router.get('/new-arrivals', (req, res) => {
  const limit = parseInt(req.query.limit, 10) || 8;
  const items = PRODUCTS.filter((p) => p.isNewArrival).slice(0, limit);
  res.json(items);
});

// GET /api/products/flash-deals
router.get('/flash-deals', (req, res) => {
  const limit = parseInt(req.query.limit, 10) || 8;
  const items = PRODUCTS.filter((p) => p.isFlashDeal).slice(0, limit);
  res.json(items);
});

// GET /api/products/categories
router.get('/categories', (req, res) => {
  res.json(CATEGORIES);
});

// GET /api/products/brands
router.get('/brands', (req, res) => {
  res.json(BRANDS);
});

// GET /api/products/search (Quick auto-complete preview)
router.get('/search', (req, res) => {
  const query = req.query.q || '';
  const limit = parseInt(req.query.limit, 10) || 5;

  if (!query.trim()) {
    return res.json([]);
  }

  const q = query.toLowerCase().trim();
  const results = PRODUCTS.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
  ).slice(0, limit);

  res.json(results);
});

// GET /api/products/related?currentId=...&category=...&limit=...
router.get('/related', (req, res) => {
  const { currentId, category, limit = 4 } = req.query;
  const parsedLimit = parseInt(limit, 10) || 4;

  const related = PRODUCTS.filter(
    (p) => p.id !== currentId && p.category === category
  ).slice(0, parsedLimit);

  res.json(related);
});

// GET /api/products/:id (by ID or slug)
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const product = PRODUCTS.find((p) => p.id === id || p.slug === id);

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  res.json(product);
});

export default router;
