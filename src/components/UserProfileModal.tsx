import React, { useState } from 'react';
import {
  X,
  User,
  Phone,
  Mail,
  MapPin,
  Clock,
  RotateCcw,
  Receipt,
  CheckCircle2,
  Bookmark,
  ShieldCheck,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const UserProfileModal: React.FC = () => {
  const {
    isProfileOpen,
    setIsProfileOpen,
    userProfile,
    updateUserProfile,
    orders,
    addToCart,
    setIsCartOpen,
    setIsTrackingOpen,
  } = useApp();

  const [name, setName] = useState(userProfile.name);
  const [phone, setPhone] = useState(userProfile.phone);
  const [email, setEmail] = useState(userProfile.email);
  const [address, setAddress] = useState(userProfile.address);
  const [activeTab, setActiveTab] = useState<'profile' | 'history'>('profile');
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isProfileOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({ name, phone, email, address });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleReorder = (order: (typeof orders)[0]) => {
    order.items.forEach((item) => {
      addToCart(item.product, item.selectedVariant, item.quantity, item.customNotes);
    });
    setIsProfileOpen(false);
    setIsCartOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-stone-900 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-stone-200 dark:border-stone-800 shadow-2xl relative">
        {/* Header */}
        <div className="p-6 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between sticky top-0 bg-white/95 dark:bg-stone-900/95 backdrop-blur z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-heading font-extrabold text-xl text-stone-900 dark:text-stone-100">
                Customer Account &amp; Past Orders
              </h2>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Manage your profile and track order history
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsProfileOpen(false)}
            className="p-2 rounded-xl text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="px-6 pt-3 border-b border-stone-200 dark:border-stone-800 flex gap-4 text-xs font-bold">
          <button
            onClick={() => setActiveTab('profile')}
            className={`pb-2.5 border-b-2 transition-colors ${
              activeTab === 'profile'
                ? 'border-amber-500 text-amber-600 dark:text-amber-400'
                : 'border-transparent text-stone-400 hover:text-stone-600'
            }`}
          >
            Profile Information
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`pb-2.5 border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'history'
                ? 'border-amber-500 text-amber-600 dark:text-amber-400'
                : 'border-transparent text-stone-400 hover:text-stone-600'
            }`}
          >
            <span>Order History Tracker</span>
            <span className="font-mono text-[10px] px-1.5 rounded-full bg-stone-200 dark:bg-stone-800">
              {orders.length}
            </span>
          </button>
        </div>

        <div className="p-6">
          {activeTab === 'profile' ? (
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-stone-700 dark:text-stone-300 block mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs text-stone-900 dark:text-stone-100"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-700 dark:text-stone-300 block mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs text-stone-900 dark:text-stone-100"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 dark:text-stone-300 block mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs text-stone-900 dark:text-stone-100"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 dark:text-stone-300 block mb-1">
                  Primary Delivery Address (Lahore)
                </label>
                <textarea
                  rows={2}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs text-stone-900 dark:text-stone-100"
                />
              </div>

              {/* Saved Addresses shortcuts */}
              <div className="pt-2">
                <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block mb-2">
                  Saved Lahore Addresses
                </span>
                <div className="space-y-2">
                  {userProfile.savedAddresses.map((sa, i) => (
                    <div
                      key={i}
                      className="p-3 bg-stone-50 dark:bg-stone-800/40 rounded-xl border border-stone-200 dark:border-stone-800 flex items-center justify-between text-xs"
                    >
                      <div>
                        <span className="font-bold text-stone-800 dark:text-stone-200 block">
                          {sa.label}
                        </span>
                        <span className="text-stone-500 text-[11px]">{sa.address}</span>
                      </div>
                      <Bookmark className="w-4 h-4 text-amber-500" />
                    </div>
                  ))}
                </div>
              </div>

              {savedSuccess && (
                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 rounded-xl text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Profile updated successfully!</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold text-xs rounded-xl shadow transition-all"
              >
                Save Profile Details
              </button>
            </form>
          ) : (
            /* Order History List */
            <div className="space-y-4">
              {orders.length === 0 ? (
                <p className="text-center py-10 text-xs text-stone-500">No past orders found.</p>
              ) : (
                orders.map((ord) => (
                  <div
                    key={ord.id}
                    className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-800 space-y-3"
                  >
                    <div className="flex items-center justify-between pb-2 border-b border-stone-200 dark:border-stone-700">
                      <div>
                        <span className="font-heading font-black text-sm text-stone-900 dark:text-stone-100">
                          Order #{ord.orderNumber}
                        </span>
                        <span className="text-[11px] text-stone-400 block">
                          {new Date(ord.createdAt).toLocaleDateString()} at{' '}
                          {new Date(ord.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="font-mono font-bold text-amber-600 dark:text-amber-400 text-sm block">
                          Rs. {ord.total.toLocaleString()}
                        </span>
                        <span className="text-[10px] uppercase font-bold text-emerald-600">
                          {ord.status.replace(/_/g, ' ')}
                        </span>
                      </div>
                    </div>

                    <div className="text-xs space-y-1 text-stone-600 dark:text-stone-300">
                      {ord.items.map((it, idx) => (
                        <div key={idx} className="flex justify-between">
                          <span>
                            {it.quantity}x {it.product.name} {it.selectedVariant ? `(${it.selectedVariant.name})` : ''}
                          </span>
                          <span className="font-mono">Rs. {it.unitPrice * it.quantity}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-stone-200 dark:border-stone-700">
                      <button
                        onClick={() => {
                          setIsProfileOpen(false);
                          setIsTrackingOpen(true);
                        }}
                        className="text-xs font-bold text-amber-600 hover:underline"
                      >
                        Track Status →
                      </button>

                      <button
                        onClick={() => handleReorder(ord)}
                        className="px-3 py-1.5 bg-stone-900 dark:bg-stone-700 text-white hover:bg-stone-800 text-xs font-bold rounded-lg flex items-center gap-1.5 transition-colors"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Reorder Same Meal</span>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
