import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';
import { useCart } from './CartContext';

const WishlistContext = createContext(null);

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

// Initial default wishlist item
const INITIAL_WISHLIST = [
  {
    id: 'prod-2',
    name: 'Chronos Ultra GPS Smartwatch',
    slug: 'chronos-ultra-gps-smartwatch',
    category: 'electronics',
    brand: 'Aegis',
    price: 319.00,
    originalPrice: 399.00,
    discount: 20,
    rating: 4.7,
    reviewsCount: 184,
    inStock: true,
    stock: 15,
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [{ name: 'Titanium Gray', hex: '#475569' }],
    sizes: ['46mm'],
    shortDescription: 'Aerospace-grade titanium casing with dual-frequency GPS, AMOLED sapphire display, and 14-day battery.'
  }
];

export const WishlistProvider = ({ children }) => {
  const { success, info } = useToast();
  const { addToCart } = useCart();

  const [wishlistItems, setWishlistItems] = useState(() => {
    try {
      const local = localStorage.getItem('shopx_wishlist');
      return local ? JSON.parse(local) : INITIAL_WISHLIST;
    } catch {
      return INITIAL_WISHLIST;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('shopx_wishlist', JSON.stringify(wishlistItems));
    } catch (e) {
      console.error(e);
    }
  }, [wishlistItems]);

  const isInWishlist = (productId) => {
    return wishlistItems.some((item) => item.id === productId);
  };

  const toggleWishlist = (product) => {
    if (!product) return;

    setWishlistItems((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      if (exists) {
        info(`Removed "${product.name}" from your wishlist`);
        return prev.filter((item) => item.id !== product.id);
      } else {
        success(`Added "${product.name}" to your wishlist`);
        return [...prev, product];
      }
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlistItems((prev) => {
      const item = prev.find((i) => i.id === productId);
      if (item) {
        info(`Removed "${item.name}" from wishlist`);
      }
      return prev.filter((i) => i.id !== productId);
    });
  };

  const moveToCart = (product) => {
    addToCart(product, 1);
    removeFromWishlist(product.id);
  };

  const moveAllToCart = () => {
    if (wishlistItems.length === 0) return;
    wishlistItems.forEach((product) => {
      addToCart(product, 1);
    });
    setWishlistItems([]);
    success(`Moved ${wishlistItems.length} items to your shopping cart`);
  };

  const clearWishlist = () => {
    setWishlistItems([]);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        wishlistCount: wishlistItems.length,
        isInWishlist,
        toggleWishlist,
        removeFromWishlist,
        moveToCart,
        moveAllToCart,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
