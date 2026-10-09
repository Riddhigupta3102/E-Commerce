import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';
import { COUPONS } from '../data/coupons';

const CartContext = createContext(null);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// Default sample initial cart item for rich preview
const INITIAL_CART = [
  {
    cartId: 'prod-1-Midnight Black-Standard Over-Ear',
    productId: 'prod-1',
    name: 'Apex Pro ANC Wireless Headphones',
    slug: 'apex-pro-anc-wireless-headphones',
    price: 249.99,
    originalPrice: 329.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80',
    color: 'Midnight Black',
    size: 'Standard Over-Ear',
    quantity: 1,
    stock: 28
  }
];

export const CartProvider = ({ children }) => {
  const { success, warning, info } = useToast();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  const [cartItems, setCartItems] = useState(() => {
    try {
      const local = localStorage.getItem('shopx_cart');
      return local ? JSON.parse(local) : INITIAL_CART;
    } catch {
      return INITIAL_CART;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('shopx_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  const addToCart = (product, quantity = 1, selectedColor = null, selectedSize = null) => {
    const color = selectedColor || (product.colors && product.colors[0]?.name) || 'Default';
    const size = selectedSize || (product.sizes && product.sizes[0]) || 'Standard';
    const cartId = `${product.id}-${color}-${size}`;

    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.cartId === cartId);

      if (existingIndex > -1) {
        const updated = [...prevItems];
        const newQty = updated[existingIndex].quantity + quantity;
        
        if (newQty > product.stock) {
          warning(`Only ${product.stock} units available in stock`);
          updated[existingIndex].quantity = product.stock;
        } else {
          updated[existingIndex].quantity = newQty;
          success(`Updated quantity for ${product.name}`);
        }
        return updated;
      } else {
        const newItem = {
          cartId,
          productId: product.id,
          name: product.name,
          slug: product.slug,
          price: product.price,
          originalPrice: product.originalPrice,
          image: product.images ? product.images[0] : '',
          color,
          size,
          quantity: Math.min(quantity, product.stock || 99),
          stock: product.stock || 50,
        };
        success(`Added "${product.name}" to cart`);
        return [...prevItems, newItem];
      }
    });
  };

  const updateQuantity = (cartId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(cartId);
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.cartId === cartId) {
          if (newQuantity > item.stock) {
            warning(`Maximum available stock is ${item.stock}`);
            return { ...item, quantity: item.stock };
          }
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const removeFromCart = (cartId) => {
    setCartItems((prevItems) => {
      const item = prevItems.find((i) => i.cartId === cartId);
      if (item) {
        info(`Removed "${item.name}" from cart`);
      }
      return prevItems.filter((i) => i.cartId !== cartId);
    });
  };

  const clearCart = () => {
    setCartItems([]);
    setAppliedCoupon(null);
  };

  const applyCoupon = async (couponCode) => {
    if (!couponCode || !couponCode.trim()) {
      warning('Please enter a coupon code');
      return false;
    }

    const cleanCode = couponCode.trim().toUpperCase();
    const currentSubtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    try {
      const res = await fetch('/api/coupons/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: cleanCode, subtotal: currentSubtotal })
      });
      const data = await res.json();

      if (res.ok && data.valid) {
        setAppliedCoupon(data.coupon);
        success(data.message || `Coupon "${cleanCode}" applied successfully!`);
        return true;
      } else {
        warning(data.message || `Coupon code "${cleanCode}" is invalid`);
        return false;
      }
    } catch {
      // Offline fallback
      const found = COUPONS.find((c) => c.code === cleanCode);
      if (!found) {
        warning(`Coupon code "${cleanCode}" is invalid`);
        return false;
      }
      if (found.minSpend && currentSubtotal < found.minSpend) {
        warning(`Coupon "${cleanCode}" requires minimum order of ₹${found.minSpend}`);
        return false;
      }
      setAppliedCoupon(found);
      success(`Coupon "${cleanCode}" applied successfully!`);
      return true;
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    info('Coupon removed');
  };

  // Calculations
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Free shipping threshold ($75.00)
  const FREE_SHIPPING_THRESHOLD = 75.0;
  const rawDelivery = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : 9.99;
  const delivery = appliedCoupon?.type === 'shipping' ? 0 : rawDelivery;

  let discount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.type === 'percentage') {
      discount = (subtotal * appliedCoupon.value) / 100;
    } else if (appliedCoupon.type === 'fixed') {
      discount = Math.min(subtotal, appliedCoupon.value);
    }
  }

  const tax = subtotal > 0 ? (subtotal - discount) * 0.06 : 0; // 6% estimated tax
  const total = Math.max(0, subtotal - discount + delivery + tax);

  const freeShippingRemaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        itemCount,
        subtotal,
        discount,
        delivery,
        tax,
        total,
        FREE_SHIPPING_THRESHOLD,
        freeShippingRemaining,
        freeShippingProgress,
        appliedCoupon,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        applyCoupon,
        removeCoupon,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
