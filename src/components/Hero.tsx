import React from 'react';
import { PhoneCall, CalendarDays, ArrowRight, Star, Clock, MapPin, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Hero: React.FC = () => {
  const { t, setIsReservationOpen, setIsTrackingOpen } = useApp();

  return (
    <section className="relative overflow-hidden bg-stone-50 dark:bg-stone-950 pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-stone-200 dark:border-stone-800 transition-colors">
      {/* Background warm glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 dark:bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column (7 cols): Copy & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            {/* Location & Authentic Brand Kicker */}
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-700 dark:text-amber-400">
              <span className="flex items-center gap-1 bg-amber-100 dark:bg-amber-950/60 px-3 py-1 rounded-full border border-amber-300 dark:border-amber-800">
                <MapPin className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                <span>Usman Plaza, Sharaqpur Road, Lahore</span>
              </span>
              <span className="hidden sm:inline text-stone-400">·</span>
              <span className="hidden sm:inline text-stone-600 dark:text-stone-400 font-medium">
                Dine-in · Takeaway · Fast Delivery
              </span>
            </div>

            {/* Display Headline */}
            <h1 className="font-heading font-black text-3xl sm:text-5xl lg:text-6xl text-stone-950 dark:text-stone-50 tracking-tight leading-[1.08] text-balance">
              Dive into the <span className="text-amber-500">Flavour of Happiness</span> with TPC.
            </h1>

            {/* Subtext from real flyer */}
            <p className="text-base sm:text-lg text-stone-600 dark:text-stone-300 max-w-2xl leading-relaxed">
              Hand-tossed crusts, 100% mozzarella cheese, sizzling chicken steaks, loaded smash burgers, and oven-baked pastas. Crafted fresh with honest ingredients in a cozy, welcoming ambiance.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#menu"
                className="px-6 py-3.5 bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold rounded-xl shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 transition-all flex items-center gap-2 text-sm active:scale-95 whitespace-nowrap"
              >
                <span>{t.orderOnline} (100+ Items)</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={() => setIsReservationOpen(true)}
                className="px-6 py-3.5 bg-stone-900 hover:bg-stone-800 text-white dark:bg-stone-800 dark:hover:bg-stone-700 font-semibold rounded-xl transition-all flex items-center gap-2 text-sm border border-stone-800 dark:border-stone-700 active:scale-95 whitespace-nowrap"
              >
                <CalendarDays className="w-4 h-4 text-amber-400" />
                <span>{t.bookTable}</span>
              </button>

              <div className="flex items-center gap-2">
                <a
                  href="tel:03116678677"
                  className="px-4 py-3.5 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 hover:text-amber-600 dark:hover:text-amber-400 font-bold rounded-xl border border-stone-200 dark:border-stone-800 transition-all flex items-center gap-2 text-sm whitespace-nowrap font-mono"
                  title="Call Hotline 1"
                >
                  <PhoneCall className="w-4 h-4 text-emerald-500" />
                  <span>0311 66 786 77</span>
                </a>
                <a
                  href="tel:03266678677"
                  className="px-4 py-3.5 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 hover:text-amber-600 dark:hover:text-amber-400 font-bold rounded-xl border border-stone-200 dark:border-stone-800 transition-all flex items-center gap-2 text-sm whitespace-nowrap font-mono"
                  title="Call Hotline 2"
                >
                  <PhoneCall className="w-4 h-4 text-emerald-500" />
                  <span>0326 66 786 77</span>
                </a>
              </div>
            </div>

            {/* Quick Proof Metrics */}
            <div className="pt-4 flex items-center gap-6 text-xs text-stone-500 dark:text-stone-400 border-t border-stone-200 dark:border-stone-800">
              <div className="flex items-center gap-1.5">
                <div className="flex text-amber-400">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400" />
                </div>
                <span className="font-bold text-stone-900 dark:text-stone-100">4.9 / 5.0</span>
                <span>Google Reviews</span>
              </div>
              <span className="text-stone-300 dark:text-stone-700">·</span>
              <div className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-stone-400" />
                <span>Open 12:00 PM – 2:00 AM</span>
              </div>
            </div>
          </div>

          {/* Right Column (5 cols): Food Showcase Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-2xl group">
              <img
                src="/images/products/steak_burger_feast.jpg"
                alt="The Pizza & Co. Feast Table with Sizzling Steak and Gourmet Burgers"
                className="w-full h-96 sm:h-[420px] object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/20 to-transparent" />

              {/* Bottom Caption Overlay */}
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs uppercase tracking-wider font-extrabold text-amber-400">
                    TPC Signature Feast
                  </span>
                  <span className="text-xs bg-stone-900/80 backdrop-blur px-2.5 py-1 rounded-full text-stone-200 font-mono">
                    Authentic Photos
                  </span>
                </div>
                <p className="font-heading font-bold text-lg text-stone-100">
                  Sizzling Chicken Steak &amp; Crown Crust Pizza
                </p>
                <p className="text-xs text-stone-300 mt-0.5 line-clamp-1">
                  Served fresh daily at Usman Plaza, Sharaqpur Road, Lahore.
                </p>
              </div>

              {/* Top Floating Badge */}
              <div className="absolute top-4 left-4 bg-stone-950/85 backdrop-blur-md border border-stone-800 text-stone-100 px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-lg">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>100% Real Mozzarella &amp; Fresh Dough</span>
              </div>
            </div>

            {/* Secondary Floating Mini Card */}
            <div className="absolute -bottom-6 -left-6 hidden sm:flex items-center gap-3 bg-white dark:bg-stone-900 p-3 rounded-2xl shadow-xl border border-stone-200 dark:border-stone-800 max-w-xs">
              <img
                src="/images/products/tpc_box_pizza.jpg"
                alt="TPC Pizza Box"
                className="w-14 h-14 rounded-xl object-cover"
                referrerPolicy="no-referrer"
              />
              <div>
                <p className="text-xs font-bold text-stone-900 dark:text-stone-100">
                  Instant Live Tracking
                </p>
                <p className="text-[11px] text-stone-500 dark:text-stone-400">
                  Watch your order ride from kitchen to doorstep.
                </p>
                <button
                  onClick={() => setIsTrackingOpen(true)}
                  className="text-[11px] font-bold text-amber-600 dark:text-amber-400 hover:underline mt-0.5"
                >
                  Track Order #TPC-1042 →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Item Feature Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 pt-8 border-t border-stone-200 dark:border-stone-800">
          <div className="p-4 rounded-2xl bg-white dark:bg-stone-900/60 border border-stone-200/60 dark:border-stone-800/80">
            <span className="text-2xl mb-1 block">🍕</span>
            <p className="font-heading font-bold text-sm text-stone-900 dark:text-stone-100">100+ Menu Products</p>
            <p className="text-xs text-stone-500 dark:text-stone-400">Pizzas, burgers, steaks, wraps, fries &amp; shakes.</p>
          </div>
          <div className="p-4 rounded-2xl bg-white dark:bg-stone-900/60 border border-stone-200/60 dark:border-stone-800/80">
            <span className="text-2xl mb-1 block">🔥</span>
            <p className="font-heading font-bold text-sm text-stone-900 dark:text-stone-100">Stone Oven Baked</p>
            <p className="text-xs text-stone-500 dark:text-stone-400">Hand-tossed dough with bubbling golden crust.</p>
          </div>
          <div className="p-4 rounded-2xl bg-white dark:bg-stone-900/60 border border-stone-200/60 dark:border-stone-800/80">
            <span className="text-2xl mb-1 block">🛵</span>
            <p className="font-heading font-bold text-sm text-stone-900 dark:text-stone-100">Fast Lahore Delivery</p>
            <p className="text-xs text-stone-500 dark:text-stone-400">Sharaqpur Road, Parklane City &amp; surroundings.</p>
          </div>
          <div className="p-4 rounded-2xl bg-white dark:bg-stone-900/60 border border-stone-200/60 dark:border-stone-800/80">
            <span className="text-2xl mb-1 block">🍽️</span>
            <p className="font-heading font-bold text-sm text-stone-900 dark:text-stone-100">Family &amp; VIP Seating</p>
            <p className="text-xs text-stone-500 dark:text-stone-400">Cozy private booths and family hall dine-in.</p>
          </div>
        </div>
      </div>
    </section>
  );
};
