import { PRODUCTS, BRANDS } from '../data/products';
import { CATEGORIES } from '../data/categories';

const API_BASE = '/api';

/**
 * Helper to safely fetch from Node.js backend with fallback
 */
async function fetchFromApi(endpoint, fallbackFn) {
  try {
    const res = await fetch(`${API_BASE}${endpoint}`);
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn(`[ShopX Fullstack] API call to ${endpoint} failed, using local fallback.`, err);
  }
  return fallbackFn();
}

export const productService = {
  /**
   * Fetch all products with filtering, sorting, search, and pagination
   */
  async getProducts(options = {}) {
    const params = new URLSearchParams();
    Object.entries(options).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== '') {
        params.append(k, v);
      }
    });

    try {
      const res = await fetch(`${API_BASE}/products?${params.toString()}`);
      if (res.ok) {
        return await res.json();
      }
    } catch (err) {
      console.warn('[ShopX Fullstack] Failed to reach /api/products, falling back.', err);
    }

    // Local fallback
    let list = [...PRODUCTS];
    const {
      search = '',
      category = 'all',
      subcategory = 'all',
      brand = 'all',
      minPrice = 0,
      maxPrice = 5000,
      rating = 0,
      inStockOnly = false,
      sortBy = 'featured',
      page = 1,
      limit = 12,
    } = options;

    if (search.trim()) {
      const q = search.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          (p.shortDescription && p.shortDescription.toLowerCase().includes(q))
      );
    }

    if (category && category !== 'all') {
      list = list.filter((p) => p.category === category);
    }

    if (subcategory && subcategory !== 'all') {
      list = list.filter((p) => p.subcategory === subcategory);
    }

    if (brand && brand !== 'all') {
      list = list.filter((p) => p.brand.toLowerCase() === brand.toLowerCase());
    }

    list = list.filter((p) => p.price >= minPrice && p.price <= maxPrice);

    if (rating > 0) {
      list = list.filter((p) => p.rating >= rating);
    }

    if (inStockOnly) {
      list = list.filter((p) => p.inStock && p.stock > 0);
    }

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
    const totalPages = Math.ceil(total / limit) || 1;
    const startIndex = (page - 1) * limit;
    const paginatedProducts = list.slice(startIndex, startIndex + limit);

    return {
      products: paginatedProducts,
      total,
      totalPages,
      currentPage: page,
      limit,
    };
  },

  /**
   * Fetch single product by ID or Slug
   */
  async getProductById(id) {
    return fetchFromApi(`/products/${encodeURIComponent(id)}`, () => {
      return PRODUCTS.find((p) => p.id === id || p.slug === id) || null;
    });
  },

  /**
   * Quick sections
   */
  async getFeaturedProducts(limit = 8) {
    return fetchFromApi(`/products/featured?limit=${limit}`, () => {
      return PRODUCTS.filter((p) => p.isFeatured).slice(0, limit);
    });
  },

  async getTrendingProducts(limit = 8) {
    return fetchFromApi(`/products/trending?limit=${limit}`, () => {
      return PRODUCTS.filter((p) => p.isTrending).slice(0, limit);
    });
  },

  async getBestSellers(limit = 8) {
    return fetchFromApi(`/products/best-sellers?limit=${limit}`, () => {
      return PRODUCTS.filter((p) => p.isBestSeller).slice(0, limit);
    });
  },

  async getNewArrivals(limit = 8) {
    return fetchFromApi(`/products/new-arrivals?limit=${limit}`, () => {
      return PRODUCTS.filter((p) => p.isNewArrival).slice(0, limit);
    });
  },

  async getFlashDeals(limit = 8) {
    return fetchFromApi(`/products/flash-deals?limit=${limit}`, () => {
      return PRODUCTS.filter((p) => p.isFlashDeal).slice(0, limit);
    });
  },

  /**
   * Fetch related products based on category, excluding current
   */
  async getRelatedProducts(currentId, category, limit = 4) {
    return fetchFromApi(
      `/products/related?currentId=${encodeURIComponent(currentId)}&category=${encodeURIComponent(category)}&limit=${limit}`,
      () => {
        return PRODUCTS.filter((p) => p.id !== currentId && p.category === category).slice(0, limit);
      }
    );
  },

  /**
   * Quick search auto-complete preview
   */
  async quickSearch(query, limit = 5) {
    if (!query || !query.trim()) return [];
    return fetchFromApi(
      `/products/search?q=${encodeURIComponent(query)}&limit=${limit}`,
      () => {
        const q = query.toLowerCase().trim();
        return PRODUCTS.filter(
          (p) =>
            p.name.toLowerCase().includes(q) ||
            p.brand.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q)
        ).slice(0, limit);
      }
    );
  },

  getCategories() {
    return CATEGORIES;
  },

  getBrands() {
    return BRANDS;
  }
};
