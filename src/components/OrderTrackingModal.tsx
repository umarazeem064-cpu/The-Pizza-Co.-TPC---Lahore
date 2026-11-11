import React, { useState } from 'react';
import {
  X,
  Compass,
  CheckCircle2,
  Clock,
  Phone,
  MapPin,
  Search,
  Bike,
  Sparkles,
  ChefHat,
  Flame,
  PackageCheck,
  ShieldCheck,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { OrderStatus } from '../types';

export const OrderTrackingModal: React.FC = () => {
  const {
    isTrackingOpen,
    setIsTrackingOpen,
    activeOrder,
    trackOrderById,
    t,
  } = useApp();

  const [searchId, setSearchId] = useState('');
  const [searchError, setSearchError] = useState('');

  if (!isTrackingOpen) return null;

  const order = activeOrder;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchId.trim()) return;
    const found = trackOrderById(searchId);
    if (!found) {
      setSearchError('Order not found. Try "TPC-1042"');
    } else {
      setSearchError('');
    }
  };

  // Steps definition
  const steps: { key: OrderStatus; label: string; icon: React.ReactNode; time: string }[] = [
    {
      key: 'confirmed',
      label: 'Order Confirmed',
      icon: <CheckCircle2 className="w-4 h-4 text-emerald-500" />,
      time: '12:40 PM',
    },
    {
      key: 'kitchen_preparing',
      label: 'Chef Preparing Ingredients',
      icon: <ChefHat className="w-4 h-4 text-amber-500" />,
      time: '12:43 PM',
    },
    {
      key: 'baking',
      label: 'Baking in Stone Oven',
      icon: <Flame className="w-4 h-4 text-rose-500" />,
      time: '12:51 PM',
    },
    {
      key: 'packing',
      label: 'Quality Check & Packing',
      icon: <PackageCheck className="w-4 h-4 text-blue-500" />,
      time: '01:00 PM',
    },
    {
      key: 'out_for_delivery',
      label: 'Rider on the Way (Live GPS)',
      icon: <Bike className="w-4 h-4 text-emerald-500 animate-bounce" />,
      time: '01:08 PM',
    },
    {
      key: 'delivered',
      label: 'Delivered at Doorstep',
      icon: <Sparkles className="w-4 h-4 text-amber-500" />,
      time: 'Estimated 01:20 PM',
    },
  ];

  const getStepProgressIndex = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return 0;
      case 'confirmed':
        return 1;
      case 'kitchen_preparing':
        return 2;
      case 'baking':
        return 3;
      case 'packing':
        return 4;
      case 'out_for_delivery':
        return 5;
      case 'delivered':
        return 6;
      default:
        return 1;
    }
  };

  const currentIndex = order ? getStepProgressIndex(order.status) : 1;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-stone-900 rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto border border-stone-200 dark:border-stone-800 shadow-2xl relative">
        {/* Header */}
        <div className="p-6 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between sticky top-0 bg-white/95 dark:bg-stone-900/95 backdrop-blur z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
              <Compass className="w-5 h-5 animate-spin" style={{ animationDuration: '8s' }} />
            </div>
            <div>
              <h2 className="font-heading font-extrabold text-lg sm:text-xl text-stone-900 dark:text-stone-100">
                {t.liveOrderTracking}
              </h2>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Real-time kitchen progress &amp; rider GPS coordinates
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsTrackingOpen(false)}
            className="p-2 rounded-xl text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Track Another Order Search */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                placeholder="Track by Order # (e.g. TPC-1042) or Phone"
                className="w-full pl-9 pr-3 py-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 bg-stone-900 dark:bg-stone-800 hover:bg-stone-800 text-white font-bold text-xs rounded-xl"
            >
              {t.trackButton}
            </button>
          </form>
          {searchError && <p className="text-xs text-rose-500 font-semibold">{searchError}</p>}

          {order ? (
            <>
              {/* Top Order Card */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-200/60 dark:border-amber-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-heading font-black text-xl text-stone-950 dark:text-stone-50">
                      Order #{order.orderNumber}
                    </span>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-400">
                      LIVE ACTIVE
                    </span>
                  </div>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                    Placed for: <strong>{order.customerName}</strong> ({order.customerPhone})
                  </p>
                  <p className="text-xs text-stone-500 dark:text-stone-400">
                    📍 {order.customerAddress}, {order.customerCity}
                  </p>
                </div>

                <div className="text-right sm:border-l sm:pl-6 border-stone-200 dark:border-stone-700">
                  <span className="text-[11px] text-stone-400 uppercase font-bold block">
                    Estimated Arrival
                  </span>
                  <span className="font-mono text-2xl font-black text-amber-600 dark:text-amber-400 block">
                    12 - 18 MINS
                  </span>
                  <span className="text-[11px] text-stone-500">
                    Total: Rs. {order.total.toLocaleString()} ·{' '}
                    {order.paymentMethod === 'cod' ? 'COD' : 'Prepaid'}
                  </span>
                </div>
              </div>

              {/* Simulated Live Route Map Viewport */}
              <div className="relative rounded-2xl overflow-hidden border border-stone-200 dark:border-stone-800 bg-stone-950 h-56 sm:h-64 shadow-inner">
                {/* Stylized Lahore Map Grid Canvas */}
                <svg
                  className="w-full h-full opacity-40"
                  xmlns="http://www.w3.org/2000/svg"
                  width="100%"
                  height="100%"
                >
                  <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#525252" strokeWidth="0.8" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                  {/* Sharaqpur Road Main Highway Arterial */}
                  <path
                    d="M 50 180 Q 250 120 450 150 T 800 100"
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="8"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 50 180 Q 250 120 450 150 T 800 100"
                    fill="none"
                    stroke="#fbbf24"
                    strokeWidth="3"
                    strokeDasharray="8 8"
                  />
                </svg>

                {/* Location Marker 1: TPC Branch */}
                <div className="absolute left-10 sm:left-16 top-1/2 -translate-y-1/2 flex flex-col items-center">
                  <div className="w-10 h-10 rounded-2xl bg-amber-500 text-stone-950 flex items-center justify-center font-bold text-lg shadow-lg border-2 border-white">
                    🍕
                  </div>
                  <div className="mt-1 bg-stone-900/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow whitespace-nowrap">
                    TPC Kitchen (Usman Plaza)
                  </div>
                </div>

                {/* Location Marker 2: Delivery Rider (Animated pulse) */}
                <div className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center animate-pulse">
                  <div className="w-11 h-11 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-xl border-2 border-white">
                    <Bike className="w-6 h-6 animate-bounce" />
                  </div>
                  <div className="mt-1 bg-emerald-950/90 border border-emerald-500/40 text-emerald-300 text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full shadow whitespace-nowrap">
                    Rider: {order.rider?.name || 'Usman'} · Moving (32 km/h)
                  </div>
                </div>

                {/* Location Marker 3: Customer Location */}
                <div className="absolute right-8 sm:right-16 top-1/2 -translate-y-1/2 flex flex-col items-center">
                  <div className="w-9 h-9 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-lg border-2 border-white">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="mt-1 bg-stone-900/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow whitespace-nowrap">
                    Your Address ({order.customerCity})
                  </div>
                </div>

                {/* Live GPS Telemetry Badge */}
                <div className="absolute top-3 left-3 bg-stone-950/80 backdrop-blur text-stone-200 text-[10px] font-mono px-3 py-1 rounded-lg border border-stone-800 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span>GPS Tracking Active · Sharaqpur Rd Corridor</span>
                </div>
              </div>

              {/* Rider Details Card */}
              {order.rider && (
                <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-amber-500 text-stone-950 font-black text-lg flex items-center justify-center shadow-md">
                      {order.rider.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-sm text-stone-900 dark:text-stone-100">
                        {order.rider.name} (Assigned Rider)
                      </h4>
                      <p className="text-xs text-stone-500 dark:text-stone-400">
                        Vehicle: {order.rider.vehicle}
                      </p>
                      <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                        Location: {order.rider.currentLocation}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <a
                      href={`tel:${order.rider.phone}`}
                      className="flex-1 sm:flex-none px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Call Rider</span>
                    </a>
                    <a
                      href="https://wa.me/923116678677"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 sm:flex-none px-4 py-2.5 bg-stone-900 dark:bg-stone-700 text-white font-bold text-xs rounded-xl hover:bg-stone-800 transition-colors flex items-center justify-center gap-1.5"
                    >
                      <span>Help / WhatsApp</span>
                    </a>
                  </div>
                </div>
              )}

              {/* Step Progression Timeline */}
              <div className="space-y-4 pt-2">
                <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-stone-500">
                  Kitchen &amp; Transit Log
                </h4>
                <div className="space-y-3">
                  {steps.map((step, idx) => {
                    const isDone = idx < currentIndex;
                    const isCurrent = idx === currentIndex - 1;
                    return (
                      <div
                        key={step.key}
                        className={`flex items-center justify-between p-3 rounded-xl transition-colors ${
                          isCurrent
                            ? 'bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800'
                            : isDone
                            ? 'bg-stone-50 dark:bg-stone-800/40 opacity-80'
                            : 'opacity-40'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-1 rounded-lg bg-white dark:bg-stone-800 shadow-sm">
                            {step.icon}
                          </div>
                          <div>
                            <p
                              className={`text-xs ${
                                isCurrent
                                  ? 'font-extrabold text-amber-900 dark:text-amber-200'
                                  : 'font-semibold text-stone-800 dark:text-stone-300'
                              }`}
                            >
                              {step.label}
                            </p>
                          </div>
                        </div>
                        <span className="font-mono text-[11px] text-stone-400">{step.time}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          ) : (
            <p className="text-center py-10 text-xs text-stone-500">
              No active orders to track. Place an order or enter an order number above!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
