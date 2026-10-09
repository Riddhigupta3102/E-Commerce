# 🛍️ ShopX — Modern E-Commerce Web Application

**ShopX** is a modern, high-performance, responsive e-commerce web application built with **React.js, Vite, Tailwind CSS, and Context API**. Designed with a clean, premium aesthetic, intuitive UX, and modular architecture, it delivers a real-world shopping experience suitable for showcasing frontend engineering craftsmanship.

---

## 🌟 Key Highlights & Features

### 1. 🏠 Dynamic Home Page
- **Hero Showcase**: Impactful banner highlighting featured collections with floating micro-cards and quick call-to-actions.
- **Department Explorer**: Visual department cards with responsive image previews across 6 distinct categories.
- **Flash Deals with Live Countdown**: Interactive countdown timer calculating real-time hours, minutes, and seconds remaining.
- **Curated Sections**: Best sellers, Staff picks, New arrivals, and trending lifestyle picks.
- **Social Proof & Testimonials**: Verified customer review cards with star rating summaries.
- **Newsletter Subscription**: Instant input validation and subscriber feedback.

### 2. 🔍 Advanced Product Catalog & Multi-Facet Filtering
- **Real-Time Live Search**: Debounced search bar with autocomplete suggestions preview dropdown.
- **Multi-Facet Filter Sidebar & Mobile Drawer**:
  - Filter by Category (*Electronics, Men's Fashion, Women's Fashion, Footwear, Watches, Home & Living*)
  - Interactive Price Range Slider ($20 – $2,000)
  - Customer Star Rating filter (4★ & above, 3★ & above)
  - Brand selection checkboxes
  - In-Stock Only filter toggle
- **Active Filter Chips**: Interactive tags with individual removal and "Clear All" reset.
- **Flexible Sorting**: *Featured, Price: Low to High, Price: High to Low, Highest Rated, Newest Arrivals, Biggest Discount*.
- **View Switcher**: Seamless toggle between **4-Column Grid View** and **Horizontal List View**.
- **Pagination**: Client-side paginated results with page navigation.

### 3. 🔎 Product Details & Variant Selection
- **Interactive Image Gallery**: Multi-image thumbnail switcher with click-to-zoom mode.
- **Dynamic Variant Customization**:
  - Color palette selector with visual check indicator
  - Size / variant selector with **Size Guide Modal**
  - Quantity counter (+ / -) with stock threshold constraints
- **Stock Urgency Indicators**: Alerts when remaining stock is low.
- **Postal / Pin Code Delivery Checker**: Instant delivery estimator with calculated arrival dates.
- **Deep Information Tabs**:
  - Feature Highlights & Key Selling Points
  - Full Technical Specifications Table
  - Customer Reviews Breakdown with an interactive **"Write a Verified Review"** modal.
- **Recommendations**: Related and frequently bought together items.

### 4. 🛒 Shopping Cart & Free Shipping Goal
- **Quick Slide-Over Cart Drawer**: Instant slide-out drawer upon adding items without leaving the current page.
- **Dedicated Cart Page**: Complete line-item overview with item thumbnails, selected variants, and unit prices.
- **Free Shipping Progress Meter**: Dynamic calculation of amount remaining to unlock free delivery ($75 threshold).
- **Promo Code Engine**: Supports coupon validation (`SHOPX20` for 20% off, `WELCOME10` for $10 off, `FREESHIP` for free shipping).
- **Price Breakdown**: Dynamic calculation of Subtotal, Discount, Delivery fee, Estimated Tax (6%), and Grand Total.

### 5. 💳 Streamlined Multi-Step Checkout
- **3-Step Checkout Stepper**:
  1. *Shipping Address*: Choose from saved addresses or add a new address with validation.
  2. *Delivery Options*: Standard ground, Priority Express Air, or Next-Day Guaranteed.
  3. *Payment Options*: Simulated Credit/Debit Card (with visual card preview), Instant UPI / QR Code, Cash on Delivery, and Net Banking.
- **Order Placement**: Simulated authorization loader leading to an celebratory **Order Confirmation Page** with canvas confetti and invoice tracking ID.

### 6. 💖 Persistent Wishlist
- Save items from catalog or product pages with heart icon toggle.
- Move individual items or **"Move All to Cart"** in bulk.
- Persisted in browser `localStorage`.

### 7. 👤 User Profile Dashboard & Simulated Authentication
- **1-Click Demo Accounts**: Instant "Demo User" and "Demo Admin" buttons for swift evaluator testing.
- **Account Tabs**:
  - *Profile Overview*: Update personal info and view account role.
  - *My Orders*: Detailed order history cards with status badges (*Processing, In Transit, Delivered*) and modal invoice printer.
  - *Saved Addresses*: Manage delivery destinations (Add, Set Default, Delete).
- **Tabbed Auth Page**: Sign In, Account Registration, and Forgot Password recovery forms with live field validation.

### 8. 🔔 Global Notification System
- Custom floating Toast Notifications (Success, Error, Info, Warning) with auto-dismissal.

---

## 🛠️ Tech Stack

- **Core**: React 18 / 19, JavaScript (ES6+), HTML5, CSS3
- **Build Tool**: Vite (Lightning-fast HMR & production builds)
- **Styling**: Tailwind CSS, Custom Glassmorphism UI, Responsive Flexbox/Grid
- **Icons**: Lucide React
- **Routing**: React Router DOM (v6) with Scroll Restoration
- **State Management**: React Context API (`CartContext`, `WishlistContext`, `AuthContext`, `ToastContext`)
- **Storage**: Browser `localStorage` for cart, wishlist, auth state, and orders
- **Celebration Effects**: `canvas-confetti`

---

## 📂 Project Structure

```text
src/
├── assets/                  # Brand assets and images
├── components/
│   ├── cart/                # CartItem, CartSummary, CouponInput, FreeShippingProgress
│   ├── checkout/            # AddressStep, ShippingStep, PaymentStep, CheckoutSummary
│   ├── common/              # Button, Modal, RatingStars, Badge, Loader, Breadcrumbs, Pagination, EmptyState
│   ├── layout/              # Navbar, Footer, MobileNav, AnnouncementBar, QuickCartDrawer
│   ├── product/             # ProductCard, ProductGrid, ProductList, FilterSidebar, MobileFilterDrawer, SortDropdown, QuickViewModal, ImageGallery
│   └── profile/             # ProfileOverview, OrderHistoryCard, AddressCard, OrderDetailsModal
├── context/
│   ├── AuthContext.jsx      # Authentication, saved addresses, order history, demo logins
│   ├── CartContext.jsx      # Cart items, quantities, coupons, dynamic calculations, persistence
│   ├── WishlistContext.jsx  # Wishlist items, cart sync, persistence
│   └── ToastContext.jsx     # Floating toast notifications
├── data/
│   ├── products.js          # 30+ rich mock products with specs, variants, reviews
│   ├── categories.js        # Category metadata and cover images
│   ├── coupons.js           # Promotional promo codes
│   └── reviews.js           # Verified customer testimonials
├── hooks/
│   ├── useDebounce.js       # Search input debouncing
│   ├── useLocalStorage.js   # Generic storage synchronization hook
│   └── useScrollToTop.js    # Route navigation scroll reset
├── pages/
│   ├── HomePage.jsx         # Hero banner, categories, flash deals, featured, trending, reviews
│   ├── ProductsPage.jsx     # Catalog, search, multi-facet filtering, sorting, grid/list view
│   ├── ProductDetailsPage.jsx # Image zoom, variants, size guide, reviews, delivery checker
│   ├── CartPage.jsx         # Full cart, coupon code input, shipping progress, order summary
│   ├── CheckoutPage.jsx     # 3-step checkout with simulated payments & address selector
│   ├── OrderSuccessPage.jsx # Confetti burst, order ID, delivery estimate, invoice breakdown
│   ├── WishlistPage.jsx     # Saved favorites with bulk move-to-cart
│   ├── AuthPage.jsx         # Sign In / Register / Forgot Password with 1-click Demo accounts
│   ├── ProfilePage.jsx      # Account overview, order tracking, address management
│   └── NotFoundPage.jsx     # 404 page
├── services/
│   └── productService.js    # Communicates with backend REST API (/api/products) with fallback
├── styles/
│   └── index.css            # Tailwind directives, custom scrollbars, animations
├── utils/
│   ├── formatters.js        # Currency ($/₹), date, percentage discount calculators
│   └── validators.js        # Form validation helpers
├── App.jsx                  # Main router setup and provider tree
└── main.jsx                 # Application entry point

server/
├── routes/
│   ├── products.js          # REST API for products, search, filters, categories
│   ├── coupons.js           # REST API for promo codes validation
│   ├── orders.js            # REST API for order creation and order history
│   ├── auth.js              # REST API for authentication and address book
│   └── reviews.js           # REST API for reviews and testimonials
├── data/                    # JSON data store
└── server.js                # Express backend application entry point
```

---

## 🚀 Installation & How to Run (Fullstack)

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+ or v20+ recommended)
- `npm` (comes with Node.js)

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Run Fullstack in Development Mode
Starts both the **Node.js Express backend** (`http://localhost:5000`) and the **React Vite frontend** (`http://localhost:5173`) concurrently:
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173`. Any API calls to `/api/*` are automatically proxied to the backend.

### Running Separately (Optional):
- **Backend Only**:
  ```bash
  npm run server
  ```
  Runs on `http://localhost:5000`. Test health: `http://localhost:5000/api/health`
- **Frontend Only**:
  ```bash
  npm run client
  ```
  Runs on `http://localhost:5173`.

### Step 3: Production Build & Run
```bash
npm run build
npm start
```
This builds the optimized frontend bundle and runs the Node.js server which serves both the REST API and the frontend single-page application on `http://localhost:5000`.

---

## 📡 Backend REST API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Backend health check |
| `GET` | `/api/products` | Get products (with search, category, brand, price filters & pagination) |
| `GET` | `/api/products/:id` | Get product details by ID or slug |
| `GET` | `/api/products/featured` | Get featured collection products |
| `GET` | `/api/products/trending` | Get trending products |
| `GET` | `/api/products/best-sellers` | Get best sellers |
| `GET` | `/api/products/new-arrivals` | Get new arrivals |
| `GET` | `/api/products/flash-deals` | Get flash deal items |
| `GET` | `/api/products/search?q=query`| Quick search autocomplete |
| `GET` | `/api/products/related` | Get related products by category |
| `GET` | `/api/categories` | Get category list |
| `GET` | `/api/coupons` | List valid coupon codes |
| `POST` | `/api/coupons/apply` | Validate coupon code against subtotal |
| `GET` | `/api/orders` | Retrieve orders list |
| `POST` | `/api/orders` | Place a new order |
| `POST` | `/api/auth/login` | Authenticate user |
| `POST` | `/api/auth/register` | Register new user account |
| `GET` | `/api/reviews` | Get customer reviews & testimonials |

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).

