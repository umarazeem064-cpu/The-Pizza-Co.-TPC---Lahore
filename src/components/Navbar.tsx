import React, { useState } from 'react';
import {
  ShoppingBag,
  Moon,
  Sun,
  Globe,
  User,
  ShieldCheck,
  Bell,
  PhoneCall,
  Menu as MenuIcon,
  X,
  MapPin,
  CalendarDays,
  Compass,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Navbar: React.FC = () => {
  const {
    t,
    language,
    setLanguage,
    theme,
    toggleTheme,
    cartCount,
    setIsCartOpen,
    setIsProfileOpen,
    setIsAdminOpen,
    setIsReservationOpen,
    setIsTrackingOpen,
    unreadNotificationCount,
    notifications,
    markNotificationAsRead,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);

  return (
    <>
      {/* Top Announcements & Quick Order Helpline Bar */}
      <div className="bg-amber-500 dark:bg-amber-600 text-stone-950 px-4 py-1.5 text-xs font-semibold flex items-center justify-between transition-colors">
        <div className="flex items-center gap-2 truncate">
          <span className="bg-stone-950 text-amber-400 px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider">
            Lahore Branch
          </span>
          <span className="truncate">
            📍 Usman Plaza Main, Sharaqpur Road, Lahore · Fresh Pizzas & Burgers · Free Delivery on Rs. 1500+
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-3 shrink-0 font-mono">
          <a
            href="tel:03116678677"
            className="flex items-center gap-1 hover:underline transition-colors"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>0311 66 786 77</span>
          </a>
          <span className="text-stone-950/40">·</span>
          <a
            href="tel:03266678677"
            className="flex items-center gap-1 hover:underline transition-colors"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>0326 66 786 77</span>
          </a>
          <span className="text-stone-950/40">|</span>
          <button
            onClick={() => setIsAdminOpen(true)}
            className="flex items-center gap-1 hover:text-stone-800 transition-colors opacity-90 hover:opacity-100"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{t.admin}</span>
          </button>
        </div>
      </div>

      {/* Main Navbar */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md border-b border-stone-200 dark:border-stone-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
          {/* Zone 1: Single text element Brand wordmark */}
          <a href="#" className="flex items-center gap-3 shrink-0 group">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-stone-950 flex items-center justify-center font-extrabold text-xl shadow-sm group-hover:scale-105 transition-transform">
              🍕
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-extrabold text-xl tracking-tight text-stone-900 dark:text-stone-100 leading-none">
                {t.brandName}
              </span>
              <span className="text-[11px] font-medium text-stone-500 dark:text-stone-400 tracking-wider">
                TPC · {t.brandTagline}
              </span>
            </div>
          </a>

          {/* Zone 2: 4-5 concise single-line nav links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-semibold text-stone-600 dark:text-stone-300">
            <a
              href="#menu"
              className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors whitespace-nowrap shrink-0"
            >
              {t.menu}
            </a>
            <a
              href="#deals"
              className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors whitespace-nowrap shrink-0"
            >
              {t.deals}
            </a>
            <button
              onClick={() => setIsReservationOpen(true)}
              className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
            >
              <CalendarDays className="w-4 h-4 text-amber-500" />
              <span>{t.bookTable}</span>
            </button>
            <button
              onClick={() => setIsTrackingOpen(true)}
              className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
            >
              <Compass className="w-4 h-4 text-emerald-500" />
              <span>{t.trackOrder}</span>
            </button>
            <a
              href="#location"
              className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
            >
              <MapPin className="w-4 h-4 text-rose-500" />
              <span>{t.contact}</span>
            </a>
          </nav>

          {/* Zone 3: 1 primary action & utility controls */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Language Switch */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'ur' : 'en')}
              className="p-2 rounded-lg text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors flex items-center gap-1 text-xs font-bold"
              title="Switch Language"
            >
              <Globe className="w-4 h-4" />
              <span>{language === 'en' ? 'اردو' : 'EN'}</span>
            </button>

            {/* Dark / Light Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              title={theme === 'dark' ? t.lightTheme : t.darkTheme}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-stone-700" />
              )}
            </button>

            {/* Notification Bell with Badge */}
            <div className="relative">
              <button
                onClick={() => setShowNotificationDropdown(!showNotificationDropdown)}
                className="p-2 rounded-lg text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors relative"
                aria-label="Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadNotificationCount > 0 && (
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-rose-500 rounded-full" />
                )}
              </button>

              {/* Notification Popover */}
              {showNotificationDropdown && (
                <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-stone-900 rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-800 p-4 z-50 animate-in fade-in zoom-in-95">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-stone-100 dark:border-stone-800">
                    <span className="font-bold text-sm text-stone-900 dark:text-stone-100">
                      {t.notifications}
                    </span>
                    <span className="text-xs text-stone-500">
                      {unreadNotificationCount} unread
                    </span>
                  </div>
                  <div className="space-y-2.5 max-h-64 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <p className="text-xs text-stone-500 text-center py-4">No notifications yet.</p>
                    ) : (
                      notifications.slice(0, 5).map((n) => (
                        <div
                          key={n.id}
                          onClick={() => markNotificationAsRead(n.id)}
                          className={`p-2.5 rounded-xl text-xs cursor-pointer transition-colors ${
                            n.read
                              ? 'bg-stone-50 dark:bg-stone-800/40 text-stone-600 dark:text-stone-400'
                              : 'bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/40 text-stone-900 dark:text-stone-200 font-medium'
                          }`}
                        >
                          <div className="font-bold text-amber-700 dark:text-amber-400 mb-0.5">
                            {n.title}
                          </div>
                          <div>{n.message}</div>
                          <div className="text-[10px] text-stone-400 mt-1">{n.time}</div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* User Profile */}
            <button
              onClick={() => setIsProfileOpen(true)}
              className="p-2 rounded-lg text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              title="User Profile"
              aria-label="User Profile"
            >
              <User className="w-4 h-4" />
            </button>

            {/* Primary Action: Shopping Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold text-xs rounded-xl shadow-sm hover:shadow transition-all flex items-center gap-2 whitespace-nowrap shrink-0 active:scale-95"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{t.cart}</span>
              {cartCount > 0 && (
                <span className="bg-stone-950 text-amber-400 text-[11px] font-extrabold px-1.5 py-0.2 rounded-full min-w-5 text-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 px-6 py-4 space-y-3">
            <a
              href="#menu"
              onClick={() => setMobileMenuOpen(false)}
              className="block font-semibold text-stone-800 dark:text-stone-200 py-1.5"
            >
              {t.menu}
            </a>
            <a
              href="#deals"
              onClick={() => setMobileMenuOpen(false)}
              className="block font-semibold text-stone-800 dark:text-stone-200 py-1.5"
            >
              {t.deals}
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsReservationOpen(true);
              }}
              className="w-full text-left font-semibold text-stone-800 dark:text-stone-200 py-1.5 flex items-center gap-2"
            >
              <CalendarDays className="w-4 h-4 text-amber-500" />
              <span>{t.bookTable}</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsTrackingOpen(true);
              }}
              className="w-full text-left font-semibold text-stone-800 dark:text-stone-200 py-1.5 flex items-center gap-2"
            >
              <Compass className="w-4 h-4 text-emerald-500" />
              <span>{t.trackOrder}</span>
            </button>
            <a
              href="#location"
              onClick={() => setMobileMenuOpen(false)}
              className="block font-semibold text-stone-800 dark:text-stone-200 py-1.5"
            >
              {t.contact}
            </a>
            <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex flex-col gap-2 text-xs text-stone-500">
              <div className="flex items-center gap-3">
                <a href="tel:03116678677" className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 font-bold font-mono">
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>0311 66 786 77</span>
                </a>
                <span>·</span>
                <a href="tel:03266678677" className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 font-bold font-mono">
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>0326 66 786 77</span>
                </a>
              </div>
              <div className="flex items-center justify-between pt-1">
                <a
                  href="https://wa.me/923116678677"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-600 font-bold hover:underline"
                >
                  WhatsApp Order Support →
                </a>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsAdminOpen(true);
                  }}
                  className="text-stone-600 dark:text-stone-400 font-semibold"
                >
                  Admin Suite
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
