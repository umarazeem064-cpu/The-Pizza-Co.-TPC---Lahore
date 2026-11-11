import React from 'react';
import {
  MapPin,
  PhoneCall,
  Clock,
  Car,
  Utensils,
  Wifi,
  Star,
  ExternalLink,
  MessageSquarePlus,
  Compass,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const LocationSection: React.FC = () => {
  const { reviews, setIsFeedbackOpen, setIsReservationOpen, t } = useApp();

  return (
    <section id="location" className="py-16 bg-stone-50 dark:bg-stone-950 transition-colors border-t border-stone-200 dark:border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Top: Location & Maps Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Info Card (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest block mb-1">
                Visit Our Lahore Restaurant
              </span>
              <h2 className="font-heading font-black text-3xl text-stone-900 dark:text-stone-100 tracking-tight">
                Location &amp; Direct Support
              </h2>
              <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">
                Located conveniently on Main Sharaqpur Road near Parklane City. Ample parking and air-conditioned family hall.
              </p>
            </div>

            {/* Address & Contact Cards */}
            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 flex items-start gap-3 shadow-sm">
                <MapPin className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-heading font-bold text-xs uppercase text-stone-400">
                    Restaurant Address
                  </h4>
                  <p className="text-sm font-semibold text-stone-900 dark:text-stone-100 mt-0.5">
                    Usman Plaza Main, Sharaqpur Road, Near Parklane City, Lahore
                  </p>
                  <a
                    href="https://maps.app.goo.gl/AWzU6FMrUybEFwhg6"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline mt-1"
                  >
                    <span>Open in Google Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 flex items-start gap-3 shadow-sm">
                <PhoneCall className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-heading font-bold text-xs uppercase text-stone-400">
                    Order Hotlines &amp; Direct Support
                  </h4>
                  <div className="flex flex-wrap items-center gap-3 mt-1">
                    <a
                      href="tel:03116678677"
                      className="text-sm font-bold text-stone-900 dark:text-stone-100 hover:text-amber-600 dark:hover:text-amber-400 transition-colors font-mono"
                    >
                      0311 66 786 77
                    </a>
                    <span className="text-stone-300 dark:text-stone-700">·</span>
                    <a
                      href="tel:03266678677"
                      className="text-sm font-bold text-stone-900 dark:text-stone-100 hover:text-amber-600 dark:hover:text-amber-400 transition-colors font-mono"
                    >
                      0326 66 786 77
                    </a>
                  </div>
                  <p className="text-[11px] text-stone-500 mt-0.5">
                    Tap to call directly for instant takeaway or delivery orders
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 flex items-start gap-3 shadow-sm">
                <Clock className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-heading font-bold text-xs uppercase text-stone-400">
                    Operating Hours
                  </h4>
                  <p className="text-sm font-semibold text-stone-900 dark:text-stone-100 mt-0.5">
                    12:00 PM – 02:00 AM (Monday to Sunday)
                  </p>
                  <p className="text-[11px] text-stone-500 mt-0.5">
                    Kitchen serves hot pizzas &amp; midnight steaks all 7 days
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Amenities */}
            <div className="flex items-center gap-4 text-xs text-stone-500 dark:text-stone-400 pt-1">
              <span className="flex items-center gap-1.5">
                <Car className="w-4 h-4 text-amber-500" /> Free Parking
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5">
                <Utensils className="w-4 h-4 text-amber-500" /> Family Dine-in
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5">
                <Wifi className="w-4 h-4 text-amber-500" /> Free Wi-Fi
              </span>
            </div>
          </div>

          {/* Interactive Google Maps Frame (7 cols) */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl overflow-hidden border border-stone-200 dark:border-stone-800 shadow-xl bg-white dark:bg-stone-900 h-96 sm:h-[420px] relative">
              <iframe
                title="The Pizza & Co. Lahore Google Map Location"
                src="https://maps.google.com/maps?q=Usman%20Plaza%20Main%20Sharaqpur%20Road%20Lahore&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full filter contrast-105"
              />

              {/* Map Floating Card */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md p-4 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500 text-stone-950 font-bold flex items-center justify-center text-lg shrink-0">
                    🍕
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-sm text-stone-900 dark:text-stone-100">
                      The Pizza &amp; Co. (TPC)
                    </h4>
                    <p className="text-xs text-stone-500 dark:text-stone-400">
                      Sharaqpur Road, Near Parklane City, Lahore
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href="https://maps.app.goo.gl/AWzU6FMrUybEFwhg6"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 bg-stone-900 dark:bg-stone-800 hover:bg-stone-800 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors whitespace-nowrap"
                  >
                    <span>Get Directions</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <button
                    onClick={() => setIsReservationOpen(true)}
                    className="px-3.5 py-2 bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold text-xs rounded-xl transition-all whitespace-nowrap"
                  >
                    Book Table
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Reviews & Feedback Section */}
        <div className="pt-8 border-t border-stone-200 dark:border-stone-800">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest block mb-1">
                Authentic Google Maps Feedback
              </span>
              <h3 className="font-heading font-black text-2xl sm:text-3xl text-stone-900 dark:text-stone-100">
                {t.customerReviews}
              </h3>
              <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">
                Real dining and delivery feedback from Lahore residents and pizza lovers.
              </p>
            </div>

            <button
              onClick={() => setIsFeedbackOpen(true)}
              className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold text-xs rounded-xl shadow transition-all flex items-center gap-2 self-start sm:self-auto active:scale-95"
            >
              <MessageSquarePlus className="w-4 h-4" />
              <span>Leave Your Review</span>
            </button>
          </div>

          {/* Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex text-amber-400">
                      {Array.from({ length: rev.rating }).map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-[10px] text-stone-400 font-mono">{rev.date}</span>
                  </div>

                  <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed italic">
                    "{rev.comment}"
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-stone-100 dark:border-stone-800/60 flex items-center justify-between">
                  <div>
                    <span className="font-heading font-bold text-xs text-stone-900 dark:text-stone-100 block">
                      {rev.author}
                    </span>
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                      <Star className="w-2.5 h-2.5 fill-emerald-500 text-emerald-500" />
                      <span>{rev.source}</span>
                    </span>
                  </div>
                  <div className="w-7 h-7 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 font-bold text-xs flex items-center justify-center">
                    {rev.author.charAt(0)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
