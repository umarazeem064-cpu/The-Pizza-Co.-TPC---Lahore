import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateCartQuantity,
    cartTotal,
    clearCart,
    setIsCheckoutOpen,
    t,
  } = useApp();

  const [promoCode, setPromoCode] = useState('');
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoMessage, setPromoMessage] = useState('');

  if (!isCartOpen) return null;

  const deliveryFee = cartTotal >= 1500 || promoDiscount > 0 ? 0 : 150;
  const grandTotal = Math.max(0, cartTotal + deliveryFee - promoDiscount);

  const applyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoCode.trim().toUpperCase();
    if (code === 'TPC10' || code === 'LAHORE10') {
      const discount = Math.round(cartTotal * 0.1);
      setPromoDiscount(discount);
      setPromoApplied(true);
      setPromoMessage(`Coupon "${code}" applied! 10% Off (Rs. ${discount})`);
    } else if (code === 'FREEDEL') {
      setPromoDiscount(150);
      setPromoApplied(true);
      setPromoMessage('Coupon "FREEDEL" applied: Free Delivery!');
    } else {
      setPromoApplied(false);
      setPromoMessage('Invalid coupon code. Try "TPC10" or "FREEDEL"');
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-950/70 backdrop-blur-sm transition-opacity">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-stone-900 shadow-2xl flex flex-col border-l border-stone-200 dark:border-stone-800 transition-colors">
          {/* Drawer Header */}
          <div className="p-5 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-amber-500" />
              <h2 className="font-heading font-extrabold text-lg text-stone-900 dark:text-stone-100">
                {t.cart} ({cart.length} {cart.length === 1 ? 'Item' : 'Items'})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-xl text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-24 space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-3xl">
                  🛒
                </div>
                <div>
                  <h3 className="font-heading font-bold text-base text-stone-900 dark:text-stone-100">
                    Your cart is empty
                  </h3>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 max-w-xs mx-auto">
                    Explore our 100+ pizzas, burgers, sizzling steaks, and appetizers to get started!
                  </p>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold text-xs rounded-xl transition-all"
                >
                  Browse Menu Now
                </button>
              </div>
            ) : (
              <>
                {/* Free delivery tracker */}
                <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/40 text-xs">
                  <div className="flex items-center justify-between font-bold text-amber-800 dark:text-amber-300 mb-1">
                    <span>
                      {cartTotal >= 1500
                        ? '🎉 Free Lahore Delivery Unlocked!'
                        : `Add Rs. ${(1500 - cartTotal).toLocaleString()} more for Free Delivery`}
                    </span>
                    <span className="font-mono">
                      {Math.min(100, Math.round((cartTotal / 1500) * 100))}%
                    </span>
                  </div>
                  <div className="w-full bg-amber-200/60 dark:bg-amber-900/60 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-amber-500 h-full rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(100, (cartTotal / 1500) * 100)}%` }}
                    />
                  </div>
                </div>

                {/* Items */}
                <div className="space-y-3">
                  {cart.map((item) => (
                    <div
                      key={item.cartId}
                      className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200/80 dark:border-stone-800 flex gap-3 items-center"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-16 rounded-xl object-cover shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-1">
                          <h4 className="font-heading font-bold text-xs text-stone-900 dark:text-stone-100 truncate">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.cartId)}
                            className="text-stone-400 hover:text-rose-500 p-1"
                            title="Remove"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {item.selectedVariant && (
                          <span className="text-[11px] text-amber-600 dark:text-amber-400 font-semibold block">
                            Size: {item.selectedVariant.name}
                          </span>
                        )}

                        {item.customNotes && (
                          <span className="text-[10px] text-stone-500 dark:text-stone-400 line-clamp-1 italic">
                            {item.customNotes}
                          </span>
                        )}

                        <div className="flex items-center justify-between mt-2">
                          <span className="font-mono text-xs font-bold text-stone-900 dark:text-stone-100">
                            Rs. {(item.unitPrice * item.quantity).toLocaleString()}
                          </span>

                          <div className="flex items-center bg-white dark:bg-stone-700 rounded-lg p-0.5 border border-stone-200 dark:border-stone-600">
                            <button
                              onClick={() => updateCartQuantity(item.cartId, item.quantity - 1)}
                              className="w-6 h-6 flex items-center justify-center text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-600 rounded"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-7 text-center font-mono font-bold text-xs">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateCartQuantity(item.cartId, item.quantity + 1)}
                              className="w-6 h-6 flex items-center justify-center text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-600 rounded"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Promo Code Form */}
                <form onSubmit={applyPromo} className="pt-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Promo Code (e.g. TPC10)"
                      className="flex-1 px-3 py-2 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs text-stone-900 dark:text-stone-100 uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-stone-900 dark:bg-stone-800 text-white font-bold text-xs rounded-xl hover:bg-stone-800 transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                  {promoMessage && (
                    <p
                      className={`text-[11px] mt-1.5 font-medium ${
                        promoApplied ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-500'
                      }`}
                    >
                      {promoMessage}
                    </p>
                  )}
                </form>
              </>
            )}
          </div>

          {/* Drawer Footer with Totals & Checkout */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/60 space-y-3">
              <div className="space-y-1.5 text-xs text-stone-600 dark:text-stone-400">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono font-semibold text-stone-900 dark:text-stone-100">
                    Rs. {cartTotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Charges</span>
                  <span className="font-mono font-semibold text-stone-900 dark:text-stone-100">
                    {deliveryFee === 0 ? (
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">FREE</span>
                    ) : (
                      `Rs. ${deliveryFee}`
                    )}
                  </span>
                </div>
                {promoDiscount > 0 && (
                  <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
                    <span>Discount</span>
                    <span className="font-mono font-semibold">- Rs. {promoDiscount}</span>
                  </div>
                )}
                <div className="pt-2 border-t border-stone-200 dark:border-stone-700 flex justify-between text-sm font-bold text-stone-950 dark:text-stone-50">
                  <span>Total Amount</span>
                  <span className="font-mono text-base text-amber-600 dark:text-amber-400 font-black">
                    Rs. {grandTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              <button
                onClick={handleProceedToCheckout}
                className="w-full py-3.5 bg-amber-500 hover:bg-amber-600 text-stone-950 font-extrabold text-sm rounded-xl shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <span>{t.checkout} (Rs. {grandTotal.toLocaleString()})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
