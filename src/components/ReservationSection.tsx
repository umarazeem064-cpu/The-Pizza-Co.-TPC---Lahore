import React, { useState } from 'react';
import {
  CalendarDays,
  Clock,
  Users,
  CheckCircle2,
  Sparkles,
  Phone,
  Mail,
  User,
  Heart,
  X,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Reservation } from '../types';

export const ReservationSection: React.FC = () => {
  const {
    createReservation,
    isReservationOpen,
    setIsReservationOpen,
    userProfile,
    t,
  } = useApp();

  const [guestName, setGuestName] = useState(userProfile.name);
  const [phone, setPhone] = useState(userProfile.phone);
  const [email, setEmail] = useState(userProfile.email);
  const [guestsCount, setGuestsCount] = useState(4);
  const [date, setDate] = useState('2026-11-15');
  const [timeSlot, setTimeSlot] = useState('08:00 PM');
  const [seatingArea, setSeatingArea] = useState<Reservation['seatingArea']>('family_hall');
  const [specialRequests, setSpecialRequests] = useState('');
  const [confirmedBooking, setConfirmedBooking] = useState<Reservation | null>(null);

  const timeSlots = [
    '01:00 PM',
    '02:30 PM',
    '05:00 PM',
    '07:00 PM',
    '08:00 PM',
    '09:30 PM',
    '10:30 PM',
    '11:45 PM',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName || !phone) return;

    const res = createReservation({
      guestName,
      phone,
      email,
      guestsCount,
      date,
      timeSlot,
      seatingArea,
      specialRequests,
    });

    setConfirmedBooking(res);
  };

  const handleReset = () => {
    setConfirmedBooking(null);
    setIsReservationOpen(false);
  };

  if (!isReservationOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-stone-900 rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto border border-stone-200 dark:border-stone-800 shadow-2xl relative">
        {/* Header */}
        <div className="p-6 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between sticky top-0 bg-white/95 dark:bg-stone-900/95 backdrop-blur z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <CalendarDays className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-heading font-extrabold text-xl text-stone-900 dark:text-stone-100">
                {t.reservationTitle}
              </h2>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Usman Plaza Main, Sharaqpur Road, Lahore
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsReservationOpen(false)}
            className="p-2 rounded-xl text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {confirmedBooking ? (
          /* Confirmation Voucher */
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 block mb-1">
                Booking Confirmed
              </span>
              <h3 className="font-heading font-black text-2xl text-stone-900 dark:text-stone-100">
                We are thrilled to host you!
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                A confirmation SMS will be sent to <strong>{confirmedBooking.phone}</strong>.
              </p>
            </div>

            {/* Voucher Card */}
            <div className="p-6 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 text-left max-w-md mx-auto space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-stone-200 dark:border-stone-700">
                <span className="text-xs font-semibold text-stone-500">Booking Code</span>
                <span className="font-mono font-black text-amber-600 dark:text-amber-400 text-base">
                  {confirmedBooking.bookingCode}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-stone-400 block">Guest Name</span>
                  <span className="font-bold text-stone-900 dark:text-stone-100">
                    {confirmedBooking.guestName}
                  </span>
                </div>
                <div>
                  <span className="text-stone-400 block">Party Size</span>
                  <span className="font-bold text-stone-900 dark:text-stone-100">
                    {confirmedBooking.guestsCount} Guests
                  </span>
                </div>
                <div>
                  <span className="text-stone-400 block">Date &amp; Time</span>
                  <span className="font-bold text-stone-900 dark:text-stone-100">
                    {confirmedBooking.date} at {confirmedBooking.timeSlot}
                  </span>
                </div>
                <div>
                  <span className="text-stone-400 block">Seating Area</span>
                  <span className="font-bold text-stone-900 dark:text-stone-100 capitalize">
                    {confirmedBooking.seatingArea.replace('_', ' ')}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold text-xs rounded-xl shadow-lg transition-all"
            >
              Done &amp; Return to Menu
            </button>
          </div>
        ) : (
          /* Reservation Form */
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <p className="text-xs text-stone-600 dark:text-stone-300">
              {t.reservationSubtitle}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-stone-700 dark:text-stone-300 block mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="e.g. Sheikh Zain"
                    className="w-full pl-9 pr-3 py-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 dark:text-stone-300 block mb-1">
                  Contact Phone *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0311 6678677"
                    className="w-full pl-9 pr-3 py-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>
            </div>

            {/* Date, Time, Guests */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-semibold text-stone-700 dark:text-stone-300 block mb-1">
                  Date
                </label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3 py-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs text-stone-900 dark:text-stone-100"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 dark:text-stone-300 block mb-1">
                  Number of Guests
                </label>
                <select
                  value={guestsCount}
                  onChange={(e) => setGuestsCount(Number(e.target.value))}
                  className="w-full px-3 py-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs text-stone-900 dark:text-stone-100"
                >
                  <option value={2}>2 Guests (Table for Two)</option>
                  <option value={4}>4 Guests (Family Table)</option>
                  <option value={6}>6 Guests (Large Table)</option>
                  <option value={8}>8 Guests (Feast Table)</option>
                  <option value={12}>12+ Guests (Party Hall)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 dark:text-stone-300 block mb-1">
                  Time Slot
                </label>
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full px-3 py-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs text-stone-900 dark:text-stone-100"
                >
                  {timeSlots.map((ts) => (
                    <option key={ts} value={ts}>
                      {ts}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Seating Preference */}
            <div>
              <label className="text-xs font-semibold text-stone-700 dark:text-stone-300 block mb-2">
                Seating Atmosphere
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { key: 'family_hall', label: t.familyHall, icon: '👨‍👩‍👧‍👦' },
                  { key: 'cozy_booth', label: t.cozyBooth, icon: '🛋️' },
                  { key: 'rooftop', label: t.rooftop, icon: '🌙' },
                  { key: 'executive_lounge', label: t.lounge, icon: '✨' },
                ].map((s) => {
                  const isSelected = seatingArea === s.key;
                  return (
                    <button
                      key={s.key}
                      type="button"
                      onClick={() => setSeatingArea(s.key as any)}
                      className={`p-3 rounded-2xl border text-center transition-all ${
                        isSelected
                          ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/50 text-stone-950 dark:text-amber-300 shadow-sm font-bold'
                          : 'border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-800/40 text-stone-700 dark:text-stone-300 hover:border-amber-400'
                      }`}
                    >
                      <span className="text-xl block mb-1">{s.icon}</span>
                      <span className="text-xs leading-tight block">{s.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Special Requests */}
            <div>
              <label className="text-xs font-semibold text-stone-700 dark:text-stone-300 block mb-1">
                {t.specialNotes}
              </label>
              <input
                type="text"
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                placeholder="e.g. Birthday celebration, anniversary cake arrangement, baby chair"
                className="w-full px-3 py-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-amber-500 hover:bg-amber-600 text-stone-950 font-black text-sm rounded-2xl shadow-xl shadow-amber-500/25 transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <CalendarDays className="w-4 h-4" />
              <span>{t.confirmBooking}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
