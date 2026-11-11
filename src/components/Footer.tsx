import React from 'react';
import { PhoneCall, MapPin, Clock, ShieldCheck, Heart, Sparkles, ExternalLink } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Footer: React.FC = () => {
  const {
    t,
    setIsPrivacyOpen,
    setIsAdminOpen,
    setIsReservationOpen,
    setIsTrackingOpen,
    setIsFeedbackOpen,
  } = useApp();

  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-stone-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Info (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-stone-950 flex items-center justify-center font-extrabold text-xl">
                🍕
              </div>
              <div>
                <span className="font-heading font-black text-xl text-white tracking-tight block">
                  {t.brandName} (TPC)
                </span>
                <span className="text-xs text-amber-400 font-medium">
                  Slice of Happiness · Lahore
                </span>
              </div>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              "By the grace of Allah, may this journey continue to grow and inspire." Fresh stone oven pizzas, sizzling chicken steaks, smash burgers, and loaded fries delivered across Sharaqpur Road and Parklane City.
            </p>

            <div className="pt-2">
              <span className="text-xs uppercase font-bold text-stone-400 block mb-1">
                Direct Call Order Hotlines:
              </span>
              <div className="flex flex-wrap items-center gap-3 font-mono font-bold text-sm text-amber-400">
                <a href="tel:03116678677" className="hover:underline flex items-center gap-1">
                  <PhoneCall className="w-3.5 h-3.5" /> 0311 66 786 77
                </a>
                <span>·</span>
                <a href="tel:03266678677" className="hover:underline flex items-center gap-1">
                  <PhoneCall className="w-3.5 h-3.5" /> 0326 66 786 77
                </a>
              </div>
            </div>
          </div>

          {/* Quick Nav */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-white">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#menu" className="hover:text-amber-400 transition-colors">
                  100+ Menu Items
                </a>
              </li>
              <li>
                <a href="#deals" className="hover:text-amber-400 transition-colors">
                  TPC Super Value Deals
                </a>
              </li>
              <li>
                <button
                  onClick={() => setIsReservationOpen(true)}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Table Reservations
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsTrackingOpen(true)}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Live Order Tracker (GPS)
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsFeedbackOpen(true)}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Customer Reviews &amp; Feedback
                </button>
              </li>
            </ul>
          </div>

          {/* Location & Timings */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-white">
              Restaurant Timings
            </h4>
            <div className="space-y-2 text-xs text-stone-400">
              <p className="flex items-center gap-1.5 text-stone-300">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>12:00 PM – 02:00 AM Daily</span>
              </p>
              <p className="text-[11px]">
                Usman Plaza Main, Sharaqpur Road, Near Parklane City, Lahore
              </p>
              <a
                href="https://maps.app.goo.gl/AWzU6FMrUybEFwhg6"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] text-amber-400 hover:underline pt-1"
              >
                <span>View Google Maps Pin</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>
          </div>

          {/* Security & Admin */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-white">
              Security &amp; Portals
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  onClick={() => setIsPrivacyOpen(true)}
                  className="hover:text-amber-400 transition-colors text-left flex items-center gap-1.5"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Privacy Policy &amp; Security</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsAdminOpen(true)}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Admin &amp; Inventory Suite
                </button>
              </li>
              <li>
                <span className="text-[11px] text-stone-500 block">
                  Encrypted 256-bit checkout with COD, JazzCash, EasyPaisa, &amp; Cards.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} The Pizza &amp; Co. (TPC Lahore). All rights reserved.</p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsPrivacyOpen(true)}
              className="hover:text-stone-300 transition-colors"
            >
              Privacy Protocols
            </button>
            <span>·</span>
            <button
              onClick={() => setIsAdminOpen(true)}
              className="hover:text-stone-300 transition-colors"
            >
              Kitchen Portal
            </button>
            <span>·</span>
            <a
              href="https://maps.app.goo.gl/AWzU6FMrUybEFwhg6"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-stone-300 transition-colors"
            >
              Google Maps Listing
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
