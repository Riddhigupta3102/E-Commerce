import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  ShoppingBag,
  Heart,
  User,
  Search,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  Layers,
  ArrowRight,
  LogOut,
  Package,
  MapPin,
  Flame,
  Star
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';
import { productService } from '../../services/productService';
import { CATEGORIES } from '../../data/categories';
import { formatCurrency } from '../../utils/formatters';

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { itemCount, subtotal, setIsCartOpen } = useCart();
  const { wishlistCount } = useWishlist();
  const { user, isAuthenticated, logout } = useAuth();

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showCategoriesMenu, setShowCategoriesMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const searchRef = useRef(null);
  const userMenuRef = useRef(null);
  const categoryMenuRef = useRef(null);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setShowSearchDropdown(false);
    setShowUserMenu(false);
    setShowCategoriesMenu(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSearchDropdown(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setShowUserMenu(false);
      }
      if (categoryMenuRef.current && !categoryMenuRef.current.contains(e.target)) {
        setShowCategoriesMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearching(true);
      const results = await productService.quickSearch(searchQuery, 4);
      setSearchResults(results);
      setIsSearching(false);
      setShowSearchDropdown(true);
    }, 200);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setShowSearchDropdown(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-dark-900/95 backdrop-blur-md border-b border-slate-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-3 sm:gap-6">
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-slate-300 hover:text-brand-400 hover:bg-dark-800 rounded-xl transition-colors"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 via-rose-600 to-emerald-600 flex items-center justify-center text-white shadow-md shadow-brand-600/30 group-hover:scale-105 transition-transform">
              <ShoppingBag className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center">
                Shop<span className="text-brand-500">X</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 ml-0.5 inline-block"></span>
              </span>
              <span className="text-[9px] font-bold uppercase tracking-widest text-emerald-400 hidden sm:block -mt-1">
                Luxury Drops
              </span>
            </div>
          </Link>

          {/* Desktop Categories Dropdown */}
          <div className="hidden lg:block relative" ref={categoryMenuRef}>
            <button
              onClick={() => setShowCategoriesMenu(!showCategoriesMenu)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-bold text-slate-200 hover:text-white hover:bg-dark-800 transition-colors border border-transparent hover:border-slate-700"
            >
              <Layers className="w-4 h-4 text-brand-500" />
              <span>Categories</span>
              <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${showCategoriesMenu ? 'rotate-180' : ''}`} />
            </button>

            {showCategoriesMenu && (
              <div className="absolute top-full left-0 mt-2 w-72 bg-dark-900 rounded-2xl shadow-dropdown border border-slate-800 py-2.5 z-50 animate-slide-up">
                <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Explore Departments
                </div>
                {CATEGORIES.map((cat) => (
                  <Link
                    key={cat.id}
                    to={`/products?category=${cat.slug}`}
                    className="flex items-center justify-between px-3.5 py-2.5 text-sm font-semibold text-slate-300 hover:text-white hover:bg-dark-800 rounded-xl mx-1.5 transition-colors"
                  >
                    <span>{cat.name}</span>
                    <span className="text-xs text-slate-400 bg-dark-800 px-2 py-0.5 rounded-md border border-slate-700">
                      {cat.itemCount}
                    </span>
                  </Link>
                ))}
                <div className="border-t border-slate-800 mt-2 pt-2 px-3">
                  <Link
                    to="/products"
                    className="text-xs font-bold text-brand-400 hover:text-brand-300 flex items-center justify-between py-1"
                  >
                    <span>View All Products</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Live Search Bar with Autocomplete Dropdown */}
          <div className="flex-1 max-w-xl relative" ref={searchRef}>
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => searchQuery.trim() && setShowSearchDropdown(true)}
                placeholder="Search audio, sneakers, jackets, watches..."
                className="w-full pl-10 pr-10 py-2.5 bg-dark-800/90 hover:bg-dark-800 focus:bg-dark-900 text-sm text-white placeholder:text-slate-500 rounded-xl border border-slate-700/80 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all outline-none"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </form>

            {/* Quick Search Preview Dropdown */}
            {showSearchDropdown && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-dark-900 rounded-2xl shadow-dropdown border border-slate-800 py-2 z-50 animate-slide-up">
                <div className="px-3.5 py-1 text-xs font-semibold text-slate-400 flex items-center justify-between">
                  <span>Matching Items ({searchResults.length})</span>
                  {isSearching && <span className="text-brand-400">Searching...</span>}
                </div>

                {searchResults.length > 0 ? (
                  <div className="divide-y divide-slate-800">
                    {searchResults.map((item) => (
                      <Link
                        key={item.id}
                        to={`/product/${item.slug}`}
                        onClick={() => setShowSearchDropdown(false)}
                        className="flex items-center gap-3 p-3 hover:bg-dark-800 transition-colors"
                      >
                        <img
                          src={item.images[0]}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded-lg bg-slate-900 shrink-0 border border-slate-700"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-white truncate">{item.name}</p>
                          <p className="text-[11px] text-slate-400">{item.brand}</p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-xs font-bold text-emerald-400">{formatCurrency(item.price)}</span>
                            <span className="flex items-center text-[10px] text-amber-400 font-medium">
                              <Star className="w-3 h-3 fill-amber-400 text-amber-400 mr-0.5" />
                              {item.rating}
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                    <div className="p-2 bg-dark-800/60 text-center">
                      <button
                        onClick={handleSearchSubmit}
                        className="text-xs font-bold text-brand-400 hover:text-brand-300 inline-flex items-center gap-1"
                      >
                        See all results for "{searchQuery}" <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ) : (
                  !isSearching && (
                    <div className="p-6 text-center text-xs text-slate-400">
                      No products found matching "<span className="font-semibold text-white">{searchQuery}</span>".
                    </div>
                  )
                )}
              </div>
            )}
          </div>

          {/* Desktop Nav Actions */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            
            {/* Wishlist Button */}
            <Link
              to="/wishlist"
              className="relative p-2.5 text-slate-300 hover:text-brand-400 hover:bg-dark-800 rounded-xl transition-colors"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-brand-600 text-white text-[10px] font-black rounded-full flex items-center justify-center shadow-md shadow-brand-600/40">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 px-3 py-2 text-slate-300 hover:text-emerald-400 hover:bg-dark-800 rounded-xl transition-colors group"
              aria-label="Shopping Cart"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 group-hover:scale-105 transition-transform" />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-5 h-5 bg-emerald-500 text-white text-[10px] font-black rounded-full flex items-center justify-center shadow-md shadow-emerald-500/40">
                    {itemCount}
                  </span>
                )}
              </div>
              <div className="hidden xl:flex flex-col text-left">
                <span className="text-[10px] font-bold text-slate-400 uppercase leading-none">Cart</span>
                <span className="text-xs font-black text-emerald-400 leading-tight">{formatCurrency(subtotal)}</span>
              </div>
            </button>

            {/* User Account / Profile Dropdown (Riddhi Gupta) */}
            <div className="relative" ref={userMenuRef}>
              {isAuthenticated ? (
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-dark-800 transition-colors border border-transparent hover:border-slate-700"
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-lg object-cover ring-2 ring-brand-500/40"
                  />
                  <span className="hidden md:block text-xs font-bold text-white max-w-[90px] truncate">
                    {user.name.split(' ')[0]}
                  </span>
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-400 hidden md:block transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
                </button>
              ) : (
                <Link
                  to="/auth"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-brand-600 hover:bg-brand-500 rounded-xl shadow-md shadow-brand-600/30 transition-all"
                >
                  <User className="w-4 h-4" />
                  <span>Sign In</span>
                </Link>
              )}

              {/* User Dropdown Menu */}
              {showUserMenu && isAuthenticated && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-dark-900 rounded-2xl shadow-dropdown border border-slate-800 py-2.5 z-50 animate-slide-up">
                  <div className="px-4 py-2 border-b border-slate-800">
                    <p className="text-sm font-bold text-white">{user.name}</p>
                    <p className="text-xs text-slate-400 truncate">{user.email}</p>
                    <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-950 text-emerald-400 border border-emerald-800">
                      {user.role}
                    </span>
                  </div>

                  <div className="py-1.5">
                    <Link
                      to="/profile"
                      className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white hover:bg-dark-800"
                    >
                      <User className="w-4 h-4 text-slate-400" />
                      <span>My Profile</span>
                    </Link>
                    <Link
                      to="/profile?tab=orders"
                      className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white hover:bg-dark-800"
                    >
                      <Package className="w-4 h-4 text-slate-400" />
                      <span>My Orders ({user.orders?.length || 0})</span>
                    </Link>
                    <Link
                      to="/profile?tab=addresses"
                      className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white hover:bg-dark-800"
                    >
                      <MapPin className="w-4 h-4 text-slate-400" />
                      <span>Saved Addresses</span>
                    </Link>
                  </div>

                  <div className="border-t border-slate-800 pt-1.5">
                    <button
                      onClick={logout}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-brand-400 hover:bg-brand-950/40 transition-colors text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>
      </div>

      {/* Desktop Sub-Nav Header with Category Links & Deals */}
      <nav className="hidden lg:block bg-dark-900 border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-10 text-xs font-semibold text-slate-300">
            <div className="flex items-center gap-6">
              <Link to="/products" className="hover:text-brand-400 transition-colors">
                All Products
              </Link>
              {CATEGORIES.slice(0, 5).map((cat) => (
                <Link
                  key={cat.id}
                  to={`/products?category=${cat.slug}`}
                  className="hover:text-brand-400 transition-colors"
                >
                  {cat.name}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-5 text-xs font-bold">
              <Link to="/products?sort=discount" className="flex items-center gap-1.5 text-brand-400 hover:text-brand-300">
                <Flame className="w-3.5 h-3.5 fill-brand-500 text-brand-500" />
                <span>Special Offers</span>
              </Link>
              <Link to="/products?sort=newest" className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300">
                <Sparkles className="w-3.5 h-3.5" />
                <span>New Arrivals</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-16 z-50 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="w-4/5 max-w-sm h-full bg-dark-900 border-r border-slate-800 shadow-2xl p-5 overflow-y-auto flex flex-col justify-between animate-slide-up">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
                <span className="text-base font-bold text-white">Menu Navigation</span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1 text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-1">
                <Link
                  to="/"
                  className="block px-3 py-2.5 rounded-xl font-bold text-sm text-slate-200 hover:bg-dark-800"
                >
                  Home
                </Link>
                <Link
                  to="/products"
                  className="block px-3 py-2.5 rounded-xl font-bold text-sm text-slate-200 hover:bg-dark-800"
                >
                  All Products
                </Link>
                <Link
                  to="/wishlist"
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl font-bold text-sm text-slate-200 hover:bg-dark-800"
                >
                  <span>Wishlist</span>
                  {wishlistCount > 0 && (
                    <span className="bg-brand-600 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                      {wishlistCount}
                    </span>
                  )}
                </Link>
                <Link
                  to="/cart"
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl font-bold text-sm text-slate-200 hover:bg-dark-800"
                >
                  <span>Shopping Cart</span>
                  {itemCount > 0 && (
                    <span className="bg-emerald-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                      {itemCount}
                    </span>
                  )}
                </Link>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 px-3 mb-2">
                  Shop Departments
                </p>
                <div className="space-y-1">
                  {CATEGORIES.map((cat) => (
                    <Link
                      key={cat.id}
                      to={`/products?category=${cat.slug}`}
                      className="block px-3 py-2 text-xs font-semibold text-slate-300 hover:text-brand-400 hover:bg-dark-800 rounded-lg"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Auth button */}
            <div className="pt-6 border-t border-slate-800 mt-6">
              {isAuthenticated ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-3 px-2">
                    <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-xl ring-2 ring-brand-500/40" />
                    <div>
                      <p className="text-xs font-bold text-white">{user.name}</p>
                      <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
                    </div>
                  </div>
                  <Link
                    to="/profile"
                    className="block w-full text-center py-2 bg-dark-800 hover:bg-dark-700 text-white text-xs font-bold rounded-xl border border-slate-700 transition-colors"
                  >
                    Manage Account
                  </Link>
                  <button
                    onClick={logout}
                    className="block w-full text-center py-2 text-brand-400 text-xs font-semibold hover:bg-brand-950/40 rounded-xl transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <Link
                  to="/auth"
                  className="block w-full text-center py-2.5 bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold rounded-xl transition-colors shadow-md"
                >
                  Sign In / Register
                </Link>
              )}
            </div>

          </div>
        </div>
      )}
    </header>
  );
};
