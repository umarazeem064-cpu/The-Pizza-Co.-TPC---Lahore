/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MenuSection } from './components/MenuSection';
import { DealsSection } from './components/DealsSection';
import { LocationSection } from './components/LocationSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { ReservationSection } from './components/ReservationSection';
import { ProductModal } from './components/ProductModal';
import { UserProfileModal } from './components/UserProfileModal';
import { AdminDashboard } from './components/AdminDashboard';
import { FeedbackModal } from './components/FeedbackModal';
import { PrivacyPolicyModal } from './components/PrivacyPolicyModal';
import { NotificationToasts } from './components/NotificationToasts';
import { PhoneCall, Sparkles, MapPin } from 'lucide-react';

const MainLayout: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Professional initial brand splash transition
    const timer = setTimeout(() => {
      setLoading(false);
    }, 900);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 bg-stone-950 flex flex-col items-center justify-center text-center p-4">
        <div className="relative mb-6">
          <div className="w-20 h-20 rounded-3xl bg-amber-500 text-stone-950 flex items-center justify-center font-black text-4xl shadow-2xl animate-pulse">
            🍕
          </div>
          <div className="absolute -inset-2 rounded-3xl border border-amber-500/40 animate-ping opacity-30" />
        </div>
        <h1 className="font-heading font-black text-2xl sm:text-3xl text-stone-100 tracking-tight">
          THE PIZZA &amp; CO. (TPC)
        </h1>
        <p className="text-xs text-amber-400 font-semibold uppercase tracking-widest mt-1">
          Slice of Happiness · Sharaqpur Road, Lahore
        </p>
        <div className="w-48 h-1.5 bg-stone-800 rounded-full mt-6 overflow-hidden">
          <div className="h-full bg-amber-500 rounded-full animate-pulse w-3/4" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 selection:bg-amber-500 selection:text-stone-950 transition-colors">
      <Navbar />
      <main>
        <Hero />
        <DealsSection />
        <MenuSection />
        <LocationSection />
      </main>
      <Footer />

      {/* Floating Action Badge for Quick Lahore Order Hotline */}
      <aside aria-label="Direct Call Ordering" className="fixed bottom-6 left-6 z-40 hidden sm:block">
        <div className="bg-stone-900/95 dark:bg-stone-900/95 text-white p-3 rounded-2xl shadow-2xl border border-stone-700/80 backdrop-blur flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
            <PhoneCall className="w-4 h-4" />
          </div>
          <div className="text-left font-mono">
            <span className="text-[10px] text-stone-400 block font-sans font-semibold uppercase">
              Direct Order Hotlines (Lahore):
            </span>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 mt-0.5">
              <a href="tel:03116678677" className="hover:underline">
                0311 66 786 77
              </a>
              <span className="text-stone-600">·</span>
              <a href="tel:03266678677" className="hover:underline">
                0326 66 786 77
              </a>
            </div>
          </div>
        </div>
      </aside>

      {/* Modals & Overlays */}
      <CartDrawer />
      <CheckoutModal />
      <OrderTrackingModal />
      <ReservationSection />
      <ProductModal />
      <UserProfileModal />
      <AdminDashboard />
      <FeedbackModal />
      <PrivacyPolicyModal />
      <NotificationToasts />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
