import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { productService } from '../services/productService';
import { ImageGallery } from '../components/product/ImageGallery';
import { RatingStars } from '../components/common/RatingStars';
import { Button } from '../components/common/Button';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { ProductCard } from '../components/product/ProductCard';
import { Modal } from '../components/common/Modal';
import { Loader } from '../components/common/Loader';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import { formatCurrency, calculateDiscount, formatDate, getEstimatedDelivery } from '../utils/formatters';
import {
  Heart,
  ShoppingBag,
  Zap,
  Truck,
  ShieldCheck,
  CheckCircle2,
  MapPin,
  Ruler,
  Star,
  Share2,
  Check,
  Sparkles
} from 'lucide-react';

export const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { success, warning } = useToast();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('features'); // 'features' | 'specs' | 'reviews'

  // Pin Code delivery check simulation
  const [pinCode, setPinCode] = useState('');
  const [deliveryResult, setDeliveryResult] = useState(null);
  const [isCheckingPin, setIsCheckingPin] = useState(false);

  // Size Guide Modal
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  // Write Review Modal
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [newReview, setNewReview] = useState({ name: '', rating: 5, comment: '' });
  const [reviewsList, setReviewsList] = useState([]);

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      window.scrollTo({ top: 0, behavior: 'instant' });
      const found = await productService.getProductById(id);

      if (found) {
        setProduct(found);
        setSelectedColor(found.colors ? found.colors[0]?.name : null);
        setSelectedSize(found.sizes ? found.sizes[0] : null);
        setReviewsList(found.reviews || []);

        const related = await productService.getRelatedProducts(found.id, found.category, 4);
        setRelatedProducts(related);
      }
      setLoading(false);
    };

    loadProduct();
  }, [id]);

  if (loading) {
    return <Loader text="Loading product details..." size="lg" className="min-h-[60vh]" />;
  }

  if (!product) {
    return (
      <div className="max-w-3xl mx-auto py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">Product Not Found</h2>
        <p className="text-sm text-slate-400">The product you are looking for does not exist or has been removed.</p>
        <Link to="/products">
          <Button variant="primary">Return to Shop</Button>
        </Link>
      </div>
    );
  }

  const inWishlist = isInWishlist(product.id);
  const discountPercent = product.discount || calculateDiscount(product.originalPrice, product.price);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
    navigate('/checkout');
  };

  const handleCheckDelivery = (e) => {
    e.preventDefault();
    if (!pinCode.trim() || pinCode.length < 4) {
      warning('Please enter a valid postal / pin code');
      return;
    }
    setIsCheckingPin(true);
    setTimeout(() => {
      setIsCheckingPin(false);
      setDeliveryResult({
        available: true,
        date: getEstimatedDelivery(3),
      });
    }, 400);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      success('Product link copied to clipboard!');
    }
  };

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!newReview.name.trim() || !newReview.comment.trim()) {
      warning('Please complete all review fields');
      return;
    }

    const reviewObj = {
      id: 'r-' + Date.now(),
      user: newReview.name,
      rating: newReview.rating,
      date: new Date().toISOString().split('T')[0],
      comment: newReview.comment,
    };

    setReviewsList([reviewObj, ...reviewsList]);
    setShowReviewModal(false);
    setNewReview({ name: '', rating: 5, comment: '' });
    success('Thank you! Your verified review has been submitted.');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 text-slate-100">
      
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: 'Products', to: '/products' },
          { label: product.category.replace('-', ' '), to: `/products?category=${product.category}` },
          { label: product.name },
        ]}
      />

      {/* Main Details: Gallery + Purchase Config */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* Left: Interactive Image Gallery */}
        <div className="lg:col-span-7">
          <ImageGallery images={product.images} productName={product.name} />
        </div>

        {/* Right: Product Buying Panel */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Header & Badges */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-brand-400 bg-brand-950 px-3 py-1 rounded-full border border-brand-800">
                {product.brand}
              </span>
              <button
                onClick={handleShare}
                className="p-2 text-slate-400 hover:text-white hover:bg-dark-800 rounded-xl transition-colors border border-slate-800"
                title="Share product link"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight">
              {product.name}
            </h1>

            {/* Rating & Stock */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <RatingStars rating={product.rating} showCount={true} reviewsCount={reviewsList.length || product.reviewsCount} />
              <span className="text-slate-600">•</span>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {product.inStock ? `In Stock (${product.stock} units available)` : 'Out of Stock'}
              </span>
            </div>
          </div>

          {/* Pricing Box */}
          <div className="p-4 bg-dark-800 rounded-2xl border border-slate-800 space-y-1">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-black text-emerald-400">
                {formatCurrency(product.price)}
              </span>
              {product.originalPrice > product.price && (
                <>
                  <span className="text-base text-slate-500 line-through">
                    {formatCurrency(product.originalPrice)}
                  </span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-brand-950 text-brand-400 border border-brand-800">
                    Save {discountPercent}% ({formatCurrency(product.originalPrice - product.price)})
                  </span>
                </>
              )}
            </div>
            <p className="text-[11px] text-slate-400">Includes all applicable taxes & free express dispatch</p>
          </div>

          {/* Short Description */}
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {product.shortDescription}
          </p>

          {/* Color Selector */}
          {product.colors && product.colors.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-white">
                  Selected Color: <span className="text-brand-400 font-semibold">{selectedColor}</span>
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                {product.colors.map((c) => {
                  const isSelected = selectedColor === c.name;
                  return (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`w-8 h-8 rounded-full border-2 transition-all relative ${
                        isSelected
                          ? 'border-brand-500 ring-4 ring-brand-500/30 scale-110'
                          : 'border-slate-700 hover:scale-105'
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    >
                      {isSelected && (
                        <Check className="w-4 h-4 text-white stroke-[3] mx-auto drop-shadow" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Size Selector */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-white">
                  Select Size / Variant
                </span>
                <button
                  onClick={() => setShowSizeGuide(true)}
                  className="text-brand-400 hover:underline inline-flex items-center gap-1 font-semibold"
                >
                  <Ruler className="w-3.5 h-3.5" /> Size Guide
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => {
                  const isSelected = selectedSize === s;
                  return (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`px-3.5 py-2 text-xs font-semibold rounded-xl border transition-all ${
                        isSelected
                          ? 'bg-brand-600 text-white border-brand-600 shadow-glow-red'
                          : 'bg-dark-800 text-slate-300 border-slate-700 hover:border-slate-600'
                      }`}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quantity & CTA Actions */}
          <div className="pt-3 border-t border-slate-800 space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-slate-700 rounded-xl bg-dark-800 shadow-xs">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2.5 text-slate-300 hover:bg-dark-700 rounded-l-xl font-bold"
                >
                  -
                </button>
                <span className="px-3.5 py-2.5 text-xs font-bold text-white">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock || 10, quantity + 1))}
                  className="px-3 py-2.5 text-slate-300 hover:bg-dark-700 rounded-r-xl font-bold"
                >
                  +
                </button>
              </div>

              <Button
                variant="secondary"
                size="lg"
                className="flex-1"
                icon={ShoppingBag}
                onClick={handleAddToCart}
              >
                Add to Cart
              </Button>

              <button
                onClick={() => toggleWishlist(product)}
                className={`p-3.5 rounded-xl border transition-colors shadow-xs ${
                  inWishlist
                    ? 'bg-brand-600 border-brand-600 text-white shadow-glow-red'
                    : 'bg-dark-800 border-slate-700 text-slate-300 hover:bg-dark-700 hover:text-white'
                }`}
                title={inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
              >
                <Heart className={`w-5 h-5 ${inWishlist ? 'fill-white' : ''}`} />
              </button>
            </div>

            <Button
              variant="primary"
              size="lg"
              className="w-full shadow-glow-red"
              icon={Zap}
              onClick={handleBuyNow}
            >
              Instant Buy Now
            </Button>
          </div>

          {/* Delivery & Pin Code Checker */}
          <div className="p-4 rounded-2xl bg-dark-800 border border-slate-800 shadow-xs space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-white">
              <MapPin className="w-4 h-4 text-brand-500" />
              <span>Estimated Delivery & Courier Availability</span>
            </div>

            <form onSubmit={handleCheckDelivery} className="flex gap-2">
              <input
                type="text"
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
                placeholder="Enter pin code (e.g. 110001)"
                className="flex-1 px-3 py-2 bg-dark-900 border border-slate-700 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
              />
              <button
                type="submit"
                disabled={isCheckingPin}
                className="px-3.5 py-2 bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold rounded-xl transition-colors shadow-xs"
              >
                {isCheckingPin ? 'Checking...' : 'Check'}
              </button>
            </form>

            {deliveryResult && (
              <div className="text-xs text-emerald-300 bg-emerald-950/80 p-2.5 rounded-xl border border-emerald-800 flex items-center gap-2 mt-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Standard Delivery by <strong>{deliveryResult.date}</strong> (FREE above ₹750)</span>
              </div>
            )}
          </div>

          {/* Trust Guarantee Strip */}
          <div className="p-3 bg-dark-800 rounded-xl border border-slate-800 flex items-center gap-2.5 text-xs text-slate-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>100% Genuine Certified & Insured Delivery</span>
          </div>

        </div>

      </div>

      {/* ==================== TABS: FEATURES, SPECS, REVIEWS ==================== */}
      <div className="bg-dark-800 rounded-3xl border border-slate-800 p-6 sm:p-8 shadow-card space-y-6">
        
        {/* Tab Buttons */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3 overflow-x-auto">
          <button
            onClick={() => setActiveTab('features')}
            className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all ${
              activeTab === 'features'
                ? 'bg-brand-600 text-white shadow-glow-red'
                : 'text-slate-400 hover:text-white hover:bg-dark-700'
            }`}
          >
            Product Features & Highlights
          </button>
          <button
            onClick={() => setActiveTab('specs')}
            className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all ${
              activeTab === 'specs'
                ? 'bg-brand-600 text-white shadow-glow-red'
                : 'text-slate-400 hover:text-white hover:bg-dark-700'
            }`}
          >
            Full Specifications
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center gap-1.5 ${
              activeTab === 'reviews'
                ? 'bg-brand-600 text-white shadow-glow-red'
                : 'text-slate-400 hover:text-white hover:bg-dark-700'
            }`}
          >
            <span>Customer Reviews</span>
            <span className="text-[11px] bg-dark-900 text-slate-300 px-2 py-0.5 rounded-full border border-slate-700">
              {reviewsList.length}
            </span>
          </button>
        </div>

        {/* Tab 1: Features */}
        {activeTab === 'features' && (
          <div className="space-y-4 animate-fade-in">
            <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
              {product.description}
            </p>
            {product.features && (
              <div className="pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Key Highlights
                </h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-200">
                  {product.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Specifications */}
        {activeTab === 'specs' && (
          <div className="animate-fade-in max-w-2xl">
            {product.specifications ? (
              <div className="divide-y divide-slate-800 border border-slate-800 rounded-2xl overflow-hidden text-xs sm:text-sm">
                {Object.entries(product.specifications).map(([k, v], idx) => (
                  <div key={idx} className="grid grid-cols-3 p-3.5 bg-dark-800 odd:bg-dark-900/60">
                    <span className="font-bold text-slate-400">{k}</span>
                    <span className="col-span-2 text-white font-medium">{v}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500">Standard specifications apply.</p>
            )}
          </div>
        )}

        {/* Tab 3: Customer Reviews */}
        {activeTab === 'reviews' && (
          <div className="space-y-8 animate-fade-in">
            
            {/* Reviews Summary Header */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 bg-dark-900 rounded-2xl border border-slate-800">
              <div className="flex items-center gap-4">
                <div className="text-4xl font-black text-white">{product.rating}</div>
                <div>
                  <RatingStars rating={product.rating} size="md" />
                  <p className="text-xs text-slate-400 mt-1">
                    Based on {reviewsList.length || product.reviewsCount} verified purchases
                  </p>
                </div>
              </div>

              <Button
                variant="primary"
                size="sm"
                onClick={() => setShowReviewModal(true)}
              >
                Write a Verified Review
              </Button>
            </div>

            {/* Reviews List */}
            <div className="space-y-4">
              {reviewsList.map((r) => (
                <div key={r.id} className="p-4 rounded-2xl border border-slate-800 bg-dark-900 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white">{r.user}</span>
                      <span className="text-[10px] bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded font-bold border border-emerald-800">
                        Verified Purchase
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-500">{formatDate(r.date)}</span>
                  </div>
                  <RatingStars rating={r.rating} size="xs" />
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{r.comment}</p>
                </div>
              ))}
            </div>

          </div>
        )}

      </div>

      {/* ==================== RELATED PRODUCTS ==================== */}
      {relatedProducts.length > 0 && (
        <section className="space-y-6 pt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-black text-white">
              You May Also Like
            </h2>
            <Link
              to={`/products?category=${product.category}`}
              className="text-xs font-bold text-brand-400 hover:text-brand-300 hover:underline"
            >
              Explore {product.category.replace('-', ' ')} &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </section>
      )}

      {/* Size Guide Modal */}
      <Modal isOpen={showSizeGuide} onClose={() => setShowSizeGuide(false)} title="Size & Dimension Guide">
        <div className="space-y-4 text-xs text-slate-300">
          <p>Please refer to our standard measurements below to pick your ideal fit.</p>
          <div className="border border-slate-800 rounded-xl overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-dark-800 text-white font-bold">
                <tr>
                  <th className="p-2.5">Size</th>
                  <th className="p-2.5">Chest / Width</th>
                  <th className="p-2.5">Length</th>
                  <th className="p-2.5">Sleeve</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                <tr><td className="p-2.5 font-bold text-white">Small</td><td className="p-2.5">36-38 in</td><td className="p-2.5">27.5 in</td><td className="p-2.5">33.5 in</td></tr>
                <tr><td className="p-2.5 font-bold text-white">Medium</td><td className="p-2.5">39-41 in</td><td className="p-2.5">28.5 in</td><td className="p-2.5">34.5 in</td></tr>
                <tr><td className="p-2.5 font-bold text-white">Large</td><td className="p-2.5">42-44 in</td><td className="p-2.5">29.5 in</td><td className="p-2.5">35.5 in</td></tr>
                <tr><td className="p-2.5 font-bold text-white">X-Large</td><td className="p-2.5">45-47 in</td><td className="p-2.5">30.5 in</td><td className="p-2.5">36.5 in</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </Modal>

      {/* Write Review Modal */}
      <Modal isOpen={showReviewModal} onClose={() => setShowReviewModal(false)} title="Write a Product Review">
        <form onSubmit={handleAddReview} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">Your Rating</label>
            <RatingStars
              rating={newReview.rating}
              size="lg"
              interactive={true}
              onChange={(r) => setNewReview({ ...newReview, rating: r })}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">Your Name</label>
            <input
              type="text"
              value={newReview.name}
              onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
              placeholder="e.g. Riddhi Gupta"
              className="w-full px-3.5 py-2.5 bg-dark-900 border border-slate-700 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">Review Details</label>
            <textarea
              rows={4}
              value={newReview.comment}
              onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
              placeholder="Share what you loved about this product, quality, and sizing..."
              className="w-full px-3.5 py-2.5 bg-dark-900 border border-slate-700 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="secondary" size="sm" onClick={() => setShowReviewModal(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Submit Review
            </Button>
          </div>
        </form>
      </Modal>

    </div>
  );
};
