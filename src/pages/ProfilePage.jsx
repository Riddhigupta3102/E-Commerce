import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ProfileOverview } from '../components/profile/ProfileOverview';
import { OrderHistoryCard } from '../components/profile/OrderHistoryCard';
import { AddressCard } from '../components/profile/AddressCard';
import { OrderDetailsModal } from '../components/profile/OrderDetailsModal';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { Button } from '../components/common/Button';
import { EmptyState } from '../components/common/EmptyState';
import {
  User,
  Package,
  MapPin,
  Heart,
  LogOut,
  Plus,
  Shield,
  ShoppingBag
} from 'lucide-react';

export const ProfilePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'profile');
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
    setSearchParams({ tab: tabName });
  };

  if (!user) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: 'Account Dashboard' }]} />

      {/* Profile Header */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-20 h-20 rounded-2xl object-cover ring-4 ring-white/10 shadow-lg"
            />
            <div className="space-y-1">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <h1 className="text-2xl font-black text-white">{user.name}</h1>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-brand-500/20 text-brand-300 border border-brand-500/30">
                  {user.role}
                </span>
              </div>
              <p className="text-xs text-slate-300">{user.email}</p>
              <p className="text-[11px] text-slate-400">Member since {user.memberSince || '2024'}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={logout}
              className="px-4 py-2 bg-white/10 hover:bg-rose-600 text-white text-xs font-bold rounded-xl border border-white/15 backdrop-blur-sm transition-colors flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Dashboard Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Nav Menu */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200/80 p-3 shadow-card space-y-1">
          <button
            onClick={() => handleTabChange('profile')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all text-left ${
              activeTab === 'profile'
                ? 'bg-brand-600 text-white shadow-sm'
                : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <User className="w-4 h-4 shrink-0" />
            <span>Profile Overview</span>
          </button>

          <button
            onClick={() => handleTabChange('orders')}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition-all text-left ${
              activeTab === 'orders'
                ? 'bg-brand-600 text-white shadow-sm'
                : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <Package className="w-4 h-4 shrink-0" />
              <span>My Orders</span>
            </div>
            <span className={`text-[10px] px-2 py-0.5 rounded-full ${
              activeTab === 'orders' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
            }`}>
              {user.orders?.length || 0}
            </span>
          </button>

          <button
            onClick={() => handleTabChange('addresses')}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition-all text-left ${
              activeTab === 'addresses'
                ? 'bg-brand-600 text-white shadow-sm'
                : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4 shrink-0" />
              <span>Saved Addresses</span>
            </div>
            <span className={`text-[10px] px-2 py-0.5 rounded-full ${
              activeTab === 'addresses' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
            }`}>
              {user.addresses?.length || 0}
            </span>
          </button>

          <Link
            to="/wishlist"
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all"
          >
            <Heart className="w-4 h-4 text-rose-500" />
            <span>My Wishlist</span>
          </Link>
        </div>

        {/* Right Active Tab Content */}
        <div className="lg:col-span-9 space-y-6">
          
          {/* Tab 1: Profile Overview */}
          {activeTab === 'profile' && <ProfileOverview />}

          {/* Tab 2: Orders */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <h3 className="text-base font-bold text-slate-900">
                  Order History ({user.orders?.length || 0})
                </h3>
              </div>

              {user.orders && user.orders.length > 0 ? (
                user.orders.map((order) => (
                  <OrderHistoryCard
                    key={order.id}
                    order={order}
                    onViewDetails={setSelectedOrder}
                  />
                ))
              ) : (
                <EmptyState
                  icon={Package}
                  title="No orders placed yet"
                  description="When you purchase items on ShopX, your order tracking, invoices, and delivery timeline will show up here."
                  actionLabel="Start Shopping"
                  actionTo="/products"
                />
              )}
            </div>
          )}

          {/* Tab 3: Saved Addresses */}
          {activeTab === 'addresses' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <h3 className="text-base font-bold text-slate-900">
                  Saved Shipping Addresses ({user.addresses?.length || 0})
                </h3>
              </div>

              {user.addresses && user.addresses.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {user.addresses.map((addr) => (
                    <AddressCard key={addr.id} address={addr} />
                  ))}
                </div>
              ) : (
                <EmptyState
                  icon={MapPin}
                  title="No saved addresses"
                  description="You have not saved any addresses yet. Add one during checkout or in your profile."
                />
              )}
            </div>
          )}

        </div>

      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          isOpen={!!selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}

    </div>
  );
};
