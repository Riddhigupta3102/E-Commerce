import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Initial default user: Riddhi Gupta
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
  ],
  orders: [
    {
      id: 'SX-89241',
      date: '2026-08-28T14:32:00Z',
      status: 'Delivered', // 'Processing', 'Shipped', 'Delivered', 'Cancelled'
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
  ]
};

export const AuthProvider = ({ children }) => {
  const { success, info } = useToast();
  const [user, setUser] = useState(() => {
    try {
      const local = localStorage.getItem('shopx_auth_user');
      return local ? JSON.parse(local) : DEMO_USER;
    } catch {
      return DEMO_USER;
    }
  });

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('shopx_auth_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('shopx_auth_user');
      }
    } catch (e) {
      console.error(e);
    }
  }, [user]);

  const login = async (email, password) => {
    if (!email || !password) throw new Error('Please fill in all fields');
    
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok && data.user) {
        setUser(data.user);
        success(`Welcome back, ${data.user.name}!`);
        return data.user;
      }
    } catch {
      // fallback
    }

    const loggedUser = {
      ...DEMO_USER,
      email: email.trim(),
      name: email.includes('riddhi') ? 'Riddhi Gupta' : email.split('@')[0].replace('.', ' ').replace(/\b\w/g, l => l.toUpperCase())
    };
    setUser(loggedUser);
    success(`Welcome back, ${loggedUser.name}!`);
    return loggedUser;
  };

  const register = async (name, email, password) => {
    if (!name || !email || !password) throw new Error('Please fill in all required fields');

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      const data = await res.json();
      if (res.ok && data.user) {
        setUser(data.user);
        success(`Welcome to ShopX, ${name}! Your account has been created.`);
        return data.user;
      }
    } catch {
      // fallback
    }

    const newUser = {
      id: 'usr-' + Math.floor(Math.random() * 90000 + 10000),
      name: name.trim(),
      email: email.trim(),
      phone: '',
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
      role: 'Member',
      memberSince: new Date().toISOString().split('T')[0],
      addresses: [],
      orders: []
    };
    setUser(newUser);
    success(`Welcome to ShopX, ${name}! Your account has been created.`);
    return newUser;
  };

  const loginDemo = (type = 'user') => {
    if (type === 'admin') {
      const admin = {
        ...DEMO_USER,
        name: 'Riddhi Gupta (Admin)',
        email: 'riddhi.admin@shopx.store',
        role: 'Store Executive'
      };
      setUser(admin);
      success('Logged in as Store Executive (Riddhi Gupta)');
    } else {
      setUser(DEMO_USER);
      success('Logged in as VIP Customer (Riddhi Gupta)');
    }
  };

  const logout = () => {
    setUser(null);
    info('You have been logged out.');
  };

  const updateProfile = (updates) => {
    setUser((prev) => {
      if (!prev) return null;
      const updated = { ...prev, ...updates };
      success('Profile updated successfully');
      return updated;
    });
  };

  const addAddress = (address) => {
    setUser((prev) => {
      if (!prev) return null;
      const newAddress = {
        id: 'addr-' + Date.now(),
        isDefault: prev.addresses.length === 0 || address.isDefault,
        ...address
      };

      let updatedAddresses = [...prev.addresses];
      if (newAddress.isDefault) {
        updatedAddresses = updatedAddresses.map(a => ({ ...a, isDefault: false }));
      }
      updatedAddresses.push(newAddress);
      success('Address saved successfully');
      return { ...prev, addresses: updatedAddresses };
    });
  };

  const updateAddress = (addressId, updatedData) => {
    setUser((prev) => {
      if (!prev) return null;
      let updatedAddresses = prev.addresses.map((addr) => {
        if (addr.id === addressId) {
          return { ...addr, ...updatedData };
        }
        if (updatedData.isDefault) {
          return { ...addr, isDefault: false };
        }
        return addr;
      });
      success('Address updated');
      return { ...prev, addresses: updatedAddresses };
    });
  };

  const deleteAddress = (addressId) => {
    setUser((prev) => {
      if (!prev) return null;
      const updatedAddresses = prev.addresses.filter(a => a.id !== addressId);
      info('Address removed');
      return { ...prev, addresses: updatedAddresses };
    });
  };

  const setDefaultAddress = (addressId) => {
    setUser((prev) => {
      if (!prev) return null;
      const updated = prev.addresses.map(a => ({
        ...a,
        isDefault: a.id === addressId
      }));
      success('Default address updated');
      return { ...prev, addresses: updated };
    });
  };

  const addOrder = (orderData) => {
    const newOrder = {
      id: 'SX-' + Math.floor(Math.random() * 90000 + 10000),
      date: new Date().toISOString(),
      status: 'Processing',
      ...orderData
    };

    setUser((prev) => {
      if (!prev) {
        return {
          ...DEMO_USER,
          orders: [newOrder]
        };
      }
      return {
        ...prev,
        orders: [newOrder, ...prev.orders]
      };
    });

    return newOrder;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        loginDemo,
        logout,
        updateProfile,
        addAddress,
        updateAddress,
        deleteAddress,
        setDefaultAddress,
        addOrder
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
