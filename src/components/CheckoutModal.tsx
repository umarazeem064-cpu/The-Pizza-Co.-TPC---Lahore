import React, { useState } from 'react';
import {
  X,
  CreditCard,
  Banknote,
  Smartphone,
  ShieldCheck,
  Lock,
  ArrowRight,
  CheckCircle2,
  MapPin,
  Phone,
  User,
} from 'lucide-react';
import { PaymentMethod } from '../types';
import { useApp } from '../context/AppContext';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartTotal,
    placeOrder,
    setIsTrackingOpen,
    userProfile,
    t,
  } = useApp();

  if (!isCheckoutOpen) return null;

  const [customerName, setCustomerName] = useState(userProfile.name);
  const [customerPhone, setCustomerPhone] = useState(userProfile.phone);
  const [customerAddress, setCustomerAddress] = useState(userProfile.address);
  const [customerCity, setCustomerCity] = useState(userProfile.city || 'Lahore');
  const [customerNotes, setCustomerNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cod');

  // Simulated gateway fields
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [walletPhone, setWalletPhone] = useState(userProfile.phone);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const deliveryFee = cartTotal >= 1500 ? 0 : 150;
  const grandTotal = cartTotal + deliveryFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !customerAddress) {
      alert('Please fill in your name, phone number, and delivery address.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const order = placeOrder({
        customerName,
        customerPhone,
        customerAddress,
        customerCity,
        customerNotes,
        paymentMethod,
      });

      setIsSubmitting(false);
      setIsCheckoutOpen(false);
      setIsTrackingOpen(true);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-stone-900 rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto border border-stone-200 dark:border-stone-800 shadow-2xl relative">
        {/* Modal Header */}
        <div className="p-6 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between sticky top-0 bg-white/95 dark:bg-stone-900/95 backdrop-blur z-10">
          <div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-500" />
              <h2 className="font-heading font-extrabold text-xl text-stone-900 dark:text-stone-100">
                {t.checkout} &amp; Secure Payment
              </h2>
            </div>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
              End-to-end encrypted 256-bit ordering for Lahore &amp; surroundings
            </p>
          </div>
          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-2 rounded-xl text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Section 1: Customer Contact & Delivery Info */}
          <div className="space-y-4">
            <h3 className="font-heading font-bold text-sm text-stone-900 dark:text-stone-100 uppercase tracking-wider flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-500" />
              <span>1. Delivery Details (Lahore Region)</span>
            </h3>

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
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Umar Azeem"
                    className="w-full pl-9 pr-3 py-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 dark:text-stone-300 block mb-1">
                  Phone Number (for rider updates) *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="0311 6678677"
                    className="w-full pl-9 pr-3 py-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-stone-700 dark:text-stone-300 block mb-1">
                  Complete Street / House / Plaza Address *
                </label>
                <input
                  type="text"
                  required
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  placeholder="House #, Street #, Parklane City / Sharaqpur Road"
                  className="w-full px-3 py-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 dark:text-stone-300 block mb-1">
                  City
                </label>
                <input
                  type="text"
                  readOnly
                  value="Lahore"
                  className="w-full px-3 py-2.5 bg-stone-100 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 rounded-xl text-xs font-bold text-stone-700 dark:text-stone-300 cursor-not-allowed"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-700 dark:text-stone-300 block mb-1">
                Rider Delivery Notes (Optional)
              </label>
              <input
                type="text"
                value={customerNotes}
                onChange={(e) => setCustomerNotes(e.target.value)}
                placeholder="e.g. Ring the bell, leave at guard room, call when nearby"
                className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          {/* Section 2: Payment Gateways */}
          <div className="space-y-4 pt-4 border-t border-stone-200 dark:border-stone-800">
            <h3 className="font-heading font-bold text-sm text-stone-900 dark:text-stone-100 uppercase tracking-wider flex items-center gap-2">
              <Lock className="w-4 h-4 text-emerald-500" />
              <span>2. Select Payment Gateway</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {/* Cash On Delivery */}
              <button
                type="button"
                onClick={() => setPaymentMethod('cod')}
                className={`p-3.5 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-2 ${
                  paymentMethod === 'cod'
                    ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/50 text-stone-950 dark:text-amber-300 shadow-sm'
                    : 'border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-800/40 text-stone-700 dark:text-stone-300 hover:border-amber-400'
                }`}
              >
                <Banknote className="w-5 h-5 text-emerald-600" />
                <span className="font-bold text-xs">Cash on Delivery</span>
                <span className="text-[10px] text-stone-500">Pay at Doorstep</span>
              </button>

              {/* Card */}
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-3.5 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-2 ${
                  paymentMethod === 'card'
                    ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/50 text-stone-950 dark:text-amber-300 shadow-sm'
                    : 'border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-800/40 text-stone-700 dark:text-stone-300 hover:border-amber-400'
                }`}
              >
                <CreditCard className="w-5 h-5 text-blue-600" />
                <span className="font-bold text-xs">Card Payment</span>
                <span className="text-[10px] text-stone-500">Visa / Mastercard</span>
              </button>

              {/* JazzCash */}
              <button
                type="button"
                onClick={() => setPaymentMethod('jazzcash')}
                className={`p-3.5 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-2 ${
                  paymentMethod === 'jazzcash'
                    ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/50 text-stone-950 dark:text-amber-300 shadow-sm'
                    : 'border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-800/40 text-stone-700 dark:text-stone-300 hover:border-amber-400'
                }`}
              >
                <Smartphone className="w-5 h-5 text-rose-600" />
                <span className="font-bold text-xs">JazzCash</span>
                <span className="text-[10px] text-stone-500">Mobile Wallet</span>
              </button>

              {/* EasyPaisa */}
              <button
                type="button"
                onClick={() => setPaymentMethod('easypaisa')}
                className={`p-3.5 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-2 ${
                  paymentMethod === 'easypaisa'
                    ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/50 text-stone-950 dark:text-amber-300 shadow-sm'
                    : 'border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-800/40 text-stone-700 dark:text-stone-300 hover:border-amber-400'
                }`}
              >
                <Smartphone className="w-5 h-5 text-emerald-600" />
                <span className="font-bold text-xs">EasyPaisa</span>
                <span className="text-[10px] text-stone-500">Mobile Wallet</span>
              </button>
            </div>

            {/* Dynamic Gateway Details */}
            {paymentMethod === 'card' && (
              <div className="p-4 bg-stone-50 dark:bg-stone-800/50 rounded-2xl border border-stone-200 dark:border-stone-700 space-y-3">
                <div className="flex items-center justify-between text-xs text-stone-500 font-semibold">
                  <span>Enter Card Details</span>
                  <span className="text-emerald-600 flex items-center gap-1 font-mono">
                    <ShieldCheck className="w-3.5 h-3.5" /> 3D Secure
                  </span>
                </div>
                <div>
                  <input
                    type="text"
                    required
                    maxLength={19}
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="Card Number (4000 1234 5678 9010)"
                    className="w-full px-3 py-2 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-xl text-xs font-mono"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    maxLength={5}
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(e.target.value)}
                    placeholder="MM/YY"
                    className="w-full px-3 py-2 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-xl text-xs font-mono text-center"
                  />
                  <input
                    type="password"
                    required
                    maxLength={4}
                    value={cardCvv}
                    onChange={(e) => setCardCvv(e.target.value)}
                    placeholder="CVV"
                    className="w-full px-3 py-2 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-xl text-xs font-mono text-center"
                  />
                </div>
              </div>
            )}

            {(paymentMethod === 'jazzcash' || paymentMethod === 'easypaisa') && (
              <div className="p-4 bg-stone-50 dark:bg-stone-800/50 rounded-2xl border border-stone-200 dark:border-stone-700 space-y-2">
                <label className="text-xs font-semibold text-stone-700 dark:text-stone-300 block">
                  {paymentMethod === 'jazzcash' ? 'JazzCash' : 'EasyPaisa'} Account Number
                </label>
                <input
                  type="tel"
                  required
                  value={walletPhone}
                  onChange={(e) => setWalletPhone(e.target.value)}
                  placeholder="03XXXXXXXXX"
                  className="w-full px-3 py-2 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-xl text-xs font-mono"
                />
                <p className="text-[11px] text-stone-500">
                  You will receive an automatic PIN prompt on your phone to authorize Rs.{' '}
                  {grandTotal.toLocaleString()}.
                </p>
              </div>
            )}

            {paymentMethod === 'cod' && (
              <div className="p-3 bg-amber-50 dark:bg-amber-950/30 rounded-xl border border-amber-200 dark:border-amber-800/40 text-xs text-amber-800 dark:text-amber-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-amber-600" />
                <span>
                  Please keep exact change of <strong>Rs. {grandTotal.toLocaleString()}</strong> ready for the rider upon delivery.
                </span>
              </div>
            )}
          </div>

          {/* Section 3: Order Summary & Place Order Button */}
          <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-800 space-y-2 text-xs">
            <div className="flex justify-between text-stone-600 dark:text-stone-400">
              <span>Items Total ({cart.length})</span>
              <span className="font-mono font-semibold text-stone-900 dark:text-stone-100">
                Rs. {cartTotal.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between text-stone-600 dark:text-stone-400">
              <span>Delivery Fee (Sharaqpur Road)</span>
              <span className="font-mono font-semibold text-stone-900 dark:text-stone-100">
                {deliveryFee === 0 ? <span className="text-emerald-500 font-bold">FREE</span> : `Rs. ${deliveryFee}`}
              </span>
            </div>
            <div className="pt-2 border-t border-stone-200 dark:border-stone-700 flex justify-between text-sm font-bold text-stone-950 dark:text-stone-50">
              <span>Grand Total</span>
              <span className="font-mono text-base text-amber-600 dark:text-amber-400 font-black">
                Rs. {grandTotal.toLocaleString()}
              </span>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-stone-950 font-black text-sm rounded-2xl shadow-xl shadow-amber-500/25 transition-all flex items-center justify-center gap-2 active:scale-95"
          >
            {isSubmitting ? (
              <span>Securing Transaction &amp; Dispatched...</span>
            ) : (
              <>
                <span>{t.placeOrder} (Rs. {grandTotal.toLocaleString()})</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
