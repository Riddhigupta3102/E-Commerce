import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Sparkles,
  Flame,
  Star,
  Clock,
  ChevronRight,
  Award,
  Zap,
  Tag,
  CheckCircle2,
  TrendingUp,
  ShoppingBag,
  ShieldCheck,
  Truck,
  RotateCcw,
  Headphones
} from 'lucide-react';
import { productService } from '../services/productService';
import { CATEGORIES } from '../data/categories';
import { TESTIMONIALS } from '../data/reviews';
import { ProductCard } from '../components/product/ProductCard';
import { QuickViewModal } from '../components/product/QuickViewModal';
import { Button } from '../components/common/Button';
import { RatingStars } from '../components/common/RatingStars';
import { formatCurrency } from '../utils/formatters';

export const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [flashDeals, setFlashDeals] = useState([]);
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // Countdown timer for Flash Sale (hours, minutes, seconds)
  const [timeLeft, setTimeLeft] = useState({
    hours: 8,
    minutes: 42,
    seconds: 15,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const loadHomeData = async () => {
      setLoading(true);
      const [featured, flash, trending, newest] = await Promise.all([
        productService.getFeaturedProducts(6),
        productService.getFlashDeals(4),
        productService.getTrendingProducts(6),
        productService.getNewArrivals(4),
      ]);

      setFeaturedProducts(featured);
      setFlashDeals(flash);
      setTrendingProducts(trending);
      setNewArrivals(newest);
      setLoading(false);
    };

    loadHomeData();
  }, []);

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      
      {/* ==================== ULTRA-MODERN HERO BANNER (BLACK, RED, GREEN) ==================== */}
      <section className="relative overflow-hidden bg-dark-900 text-white rounded-b-3xl sm:rounded-b-[2.5rem] border-b border-slate-800 shadow-2xl">
        
        {/* Ambient Neon Lighting Auroras */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-brand-600/25 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/2 right-0 w-[30rem] h-[30rem] bg-emerald-600/20 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-brand-500/15 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-28 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              {/* Badges strip */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-950/90 text-brand-400 border border-brand-800/80 text-xs font-black tracking-wider uppercase shadow-xs">
                  <Flame className="w-3.5 h-3.5 fill-brand-500 text-brand-500 animate-pulse" />
                  <span>2026 Premium Collection</span>
                </span>

                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-800/80 text-xs font-bold shadow-xs">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Up to 30% OFF Live</span>
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight leading-[1.08] text-white">
                Uncompromising <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 via-rose-400 to-emerald-400">
                  Style & Precision.
                </span>
              </h1>

              {/* Subtext */}
              <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Curated for trendsetters and tech enthusiasts. Discover studio-grade acoustics, carbon running footwear, tailored virgin wool jackets, and modern ambient home essentials.
              </p>

              {/* CTA Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link to="/products" className="w-full sm:w-auto">
                  <Button
                    variant="primary"
                    size="lg"
                    icon={ShoppingBag}
                    className="w-full sm:w-auto shadow-glow-red hover:scale-105"
                  >
                    Shop New Drops
                  </Button>
                </Link>
                <Link to="/products?sort=discount" className="w-full sm:w-auto">
                  <Button
                    variant="accent"
                    size="lg"
                    icon={Flame}
                    className="w-full sm:w-auto shadow-glow-green hover:scale-105"
                  >
                    Explore Flash Deals
                  </Button>
                </Link>
              </div>

              {/* Highlights & Metrics */}
              <div className="grid grid-cols-3 gap-4 sm:gap-8 pt-8 border-t border-slate-800/80 max-w-lg mx-auto lg:mx-0 text-left">
                <div className="p-3 bg-dark-800/60 rounded-2xl border border-slate-800">
                  <p className="text-2xl sm:text-3xl font-black text-white">50k+</p>
                  <p className="text-xs text-slate-400 mt-0.5 font-medium">VIP Shoppers</p>
                </div>
                <div className="p-3 bg-dark-800/60 rounded-2xl border border-slate-800">
                  <p className="text-2xl sm:text-3xl font-black text-emerald-400">4.9★</p>
                  <p className="text-xs text-slate-400 mt-0.5 font-medium">Verified Rating</p>
                </div>
                <div className="p-3 bg-dark-800/60 rounded-2xl border border-slate-800">
                  <p className="text-2xl sm:text-3xl font-black text-brand-400">48h</p>
                  <p className="text-xs text-slate-400 mt-0.5 font-medium">Express Dispatch</p>
                </div>
              </div>

            </div>

            {/* Right Interactive Product Card Showcase with Floating Widgets */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md bg-dark-800/90 backdrop-blur-2xl border border-slate-700/80 rounded-3xl p-6 shadow-2xl space-y-4 transform hover:-translate-y-1 transition-all duration-300">
                
                {/* Floating Top Badge */}
                <div className="absolute -top-3.5 -right-3.5 bg-gradient-to-r from-brand-600 to-rose-600 text-white text-xs font-black px-4 py-1.5 rounded-full shadow-lg shadow-brand-600/30 flex items-center gap-1.5 z-20">
                  <Flame className="w-3.5 h-3.5 fill-white" />
                  <span>24% OFF TODAY</span>
                </div>

                {/* Floating Bottom Left Verified Badge */}
                <div className="absolute -bottom-4 -left-4 bg-dark-900/95 backdrop-blur-md border border-emerald-800/80 text-emerald-400 text-xs font-bold px-4 py-2 rounded-2xl shadow-xl flex items-center gap-2 z-20">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Free Express Delivery</span>
                </div>

                {/* Image Container */}
                <div className="aspect-square rounded-2xl overflow-hidden bg-slate-900 relative group">
                  <img
                    src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80"
                    alt="Apex Pro ANC Wireless Headphones"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Card Meta */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-brand-400">SonicWave Audio</span>
                    <span className="flex items-center text-xs font-bold text-amber-400">
                      <Star className="w-3.5 h-3.5 fill-amber-400 mr-1" /> 4.8 (312 reviews)
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white">Apex Pro ANC Wireless Headphones</h3>
                  <div className="flex items-baseline gap-3 pt-1">
                    <span className="text-2xl font-black text-emerald-400">$249.99</span>
                    <span className="text-sm text-slate-500 line-through">$329.99</span>
                    <span className="text-xs font-bold text-brand-400 bg-brand-950 px-2 py-0.5 rounded-md border border-brand-800">Save $80</span>
                  </div>
                </div>

                <Link to="/product/apex-pro-anc-wireless-headphones" className="block w-full pt-1">
                  <Button
                    variant="primary"
                    size="md"
                    className="w-full shadow-md shadow-brand-600/30"
                    icon={ArrowRight}
                    iconPosition="right"
                  >
                    View Product Details
                  </Button>
                </Link>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ==================== CATEGORIES SHOWCASE ==================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-brand-500">
              Curated Departments
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
              Shop by Category
            </h2>
          </div>
          <Link
            to="/products"
            className="text-xs sm:text-sm font-bold text-brand-400 hover:text-brand-300 inline-flex items-center gap-1 group"
          >
            <span>All Categories</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              to={`/products?category=${cat.slug}`}
              className="group relative rounded-2xl overflow-hidden bg-dark-800 border border-slate-800 p-3.5 hover:border-brand-600/60 hover:shadow-card-hover transition-all duration-300 flex flex-col"
            >
              <div className="aspect-square rounded-xl overflow-hidden bg-slate-900 mb-3 relative">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-dark-900/20 group-hover:bg-transparent transition-colors" />
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-slate-100 group-hover:text-brand-400 transition-colors line-clamp-1">
                {cat.name}
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">{cat.itemCount} items</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ==================== FLASH DEALS WITH COUNTDOWN ==================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-dark-900 via-brand-950 to-dark-900 border-2 border-brand-700/60 rounded-3xl p-6 sm:p-8 text-white shadow-2xl relative overflow-hidden">
          
          <div className="absolute top-0 right-0 w-80 h-80 bg-brand-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-800">
            
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-900/80 text-xs font-bold text-brand-300 border border-brand-700/80">
                <Flame className="w-4 h-4 fill-brand-400 text-brand-400" />
                <span>Limited Time Offers</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                Flash Deals of the Day
              </h2>
            </div>

            {/* Countdown Stepper */}
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-300 mr-1 hidden sm:inline">
                Ends In:
              </span>
              <div className="bg-dark-900/90 rounded-xl px-3 py-2 text-center min-w-[50px] border border-brand-700/50 shadow-inner">
                <span className="text-lg sm:text-xl font-black leading-none block text-brand-400">
                  {String(timeLeft.hours).padStart(2, '0')}
                </span>
                <span className="text-[9px] uppercase tracking-wider text-slate-400">Hours</span>
              </div>
              <span className="text-xl font-bold text-brand-500">:</span>
              <div className="bg-dark-900/90 rounded-xl px-3 py-2 text-center min-w-[50px] border border-brand-700/50 shadow-inner">
                <span className="text-lg sm:text-xl font-black leading-none block text-brand-400">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </span>
                <span className="text-[9px] uppercase tracking-wider text-slate-400">Mins</span>
              </div>
              <span className="text-xl font-bold text-brand-500">:</span>
              <div className="bg-dark-900/90 rounded-xl px-3 py-2 text-center min-w-[50px] border border-emerald-700/60 shadow-inner">
                <span className="text-lg sm:text-xl font-black leading-none block text-emerald-400">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </span>
                <span className="text-[9px] uppercase tracking-wider text-emerald-300">Secs</span>
              </div>
            </div>

          </div>

          {/* Flash Deals Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-6">
            {flashDeals.map((prod) => (
              <ProductCard
                key={prod.id}
                product={prod}
                onQuickView={setQuickViewProduct}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ==================== FEATURED PRODUCTS ==================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-500">
              Staff Picks & Top Rated
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
              Featured Products
            </h2>
          </div>
          <Link
            to="/products"
            className="text-xs sm:text-sm font-bold text-emerald-400 hover:text-emerald-300 inline-flex items-center gap-1 group"
          >
            <span>View All ({featuredProducts.length + 20}+)</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {featuredProducts.map((prod) => (
            <ProductCard
              key={prod.id}
              product={prod}
              onQuickView={setQuickViewProduct}
            />
          ))}
        </div>
      </section>

      {/* ==================== PROMOTIONAL BANNER ==================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-dark-900 via-dark-800 to-dark-900 border border-slate-800 text-white overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
            
            <div className="p-8 sm:p-12 lg:p-16 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950 text-emerald-400 text-xs font-bold border border-emerald-800">
                <Award className="w-4 h-4" />
                <span>Autumn Signature Series</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
                Crafted for Performance, Styled for Distinction.
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-lg">
                Engineered with aerospace-grade carbon, titanium, and natural flax fibers. Every piece is rigorously tested for enduring longevity.
              </p>
              <div className="pt-2 flex flex-wrap gap-4">
                <Link to="/products?category=accessories">
                  <Button variant="primary" size="lg" icon={ArrowRight} iconPosition="right">
                    Explore Timepieces
                  </Button>
                </Link>
                <Link to="/products?category=footwear">
                  <Button variant="accent" size="lg">
                    View Footwear
                  </Button>
                </Link>
              </div>
            </div>

            <div className="h-64 sm:h-96 lg:h-full relative overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1000&q=80"
                alt="Horology Atelier automatic watch"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-dark-900 via-transparent to-transparent hidden lg:block" />
            </div>

          </div>
        </div>
      </section>

      {/* ==================== TRENDING & NEW ARRIVALS ==================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-brand-500">
              Trending Collections
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
              Trending Right Now
            </h2>
          </div>
          <Link
            to="/products?sort=newest"
            className="text-xs sm:text-sm font-bold text-brand-400 hover:text-brand-300 inline-flex items-center gap-1 group"
          >
            <span>See Newest</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {trendingProducts.map((prod) => (
            <ProductCard
              key={prod.id}
              product={prod}
              onQuickView={setQuickViewProduct}
            />
          ))}
        </div>
      </section>

      {/* ==================== CUSTOMER TESTIMONIALS ==================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
            Real Experiences
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
            Loved by 50,000+ Customers Worldwide
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-dark-800 rounded-2xl border border-slate-800 p-6 shadow-card hover:border-brand-600/60 hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <RatingStars rating={t.rating} size="sm" />
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
                  "{t.comment}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-6 border-t border-slate-800 mt-4">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-emerald-500/40"
                />
                <div>
                  <div className="flex items-center gap-1">
                    <h4 className="text-xs font-bold text-white">{t.name}</h4>
                    {t.verified && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                  </div>
                  <p className="text-[11px] text-slate-400">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          isOpen={!!quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}

    </div>
  );
};
