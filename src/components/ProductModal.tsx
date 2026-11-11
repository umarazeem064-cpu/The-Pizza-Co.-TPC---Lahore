import React, { useState } from 'react';
import { X, Star, Clock, Flame, Plus, Minus, Zap, ShoppingBag } from 'lucide-react';
import { Product, ProductVariant } from '../types';
import { useApp } from '../context/AppContext';

export const ProductModal: React.FC = () => {
  const {
    selectedProduct,
    setSelectedProduct,
    addToCart,
    setIsCheckoutOpen,
    language,
    t,
  } = useApp();

  if (!selectedProduct) return null;

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(
    selectedProduct.variants ? selectedProduct.variants[0] : undefined
  );
  const [quantity, setQuantity] = useState(1);
  const [customNotes, setCustomNotes] = useState('');
  const [extraCheese, setExtraCheese] = useState(false);
  const [extraDip, setExtraDip] = useState(false);

  const basePrice = selectedVariant ? selectedVariant.price : selectedProduct.price;
  const addonsTotal = (extraCheese ? 99 : 0) + (extraDip ? 79 : 0);
  const totalItemPrice = (basePrice + addonsTotal) * quantity;

  const handleClose = () => {
    setSelectedProduct(null);
  };

  const handleAddToCart = () => {
    let finalNotes = customNotes;
    if (extraCheese) finalNotes += ' [Extra Cheese Slice +Rs.99]';
    if (extraDip) finalNotes += ' [Extra TPC Dip Sauce +Rs.79]';

    addToCart(selectedProduct, selectedVariant, quantity, finalNotes);
    handleClose();
  };

  const handleBuyNow = () => {
    handleAddToCart();
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-stone-900 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-stone-200 dark:border-stone-800 shadow-2xl relative">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-stone-950/60 hover:bg-stone-950 text-white transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Image Header */}
        <div className="relative aspect-[16/9] w-full bg-stone-950">
          <img
            src={selectedProduct.image}
            alt={selectedProduct.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-6 right-6 text-white">
            {selectedProduct.subCategory && (
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block mb-1">
                {selectedProduct.subCategory}
              </span>
            )}
            <h2 className="font-heading font-black text-2xl sm:text-3xl text-white">
              {language === 'ur' ? selectedProduct.nameUrdu : selectedProduct.name}
            </h2>
          </div>
        </div>

        {/* Details & Customizations */}
        <div className="p-6 space-y-6">
          {/* Metadata badges */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-stone-500 dark:text-stone-400">
            <span className="flex items-center gap-1 font-bold text-amber-500">
              <Star className="w-4 h-4 fill-amber-500" />
              <span>{selectedProduct.rating} / 5.0 (Google Rating)</span>
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4 text-stone-400" />
              <span>Prep Time: {selectedProduct.prepTime}</span>
            </span>
            {selectedProduct.isSpicy && (
              <>
                <span>·</span>
                <span className="flex items-center gap-1 text-rose-500 font-bold">
                  <Flame className="w-4 h-4" />
                  <span>Spicy Recipe</span>
                </span>
              </>
            )}
          </div>

          {/* Description */}
          <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
            {language === 'ur' ? selectedProduct.descriptionUrdu : selectedProduct.description}
          </p>

          {/* Variants Selector (e.g. Sizes) */}
          {selectedProduct.variants && (
            <div className="space-y-2 pt-2 border-t border-stone-100 dark:border-stone-800">
              <label className="text-xs font-bold text-stone-900 dark:text-stone-100 uppercase tracking-wider block">
                Choose Size / Serving
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {selectedProduct.variants.map((v) => {
                  const isSelected = selectedVariant?.name === v.name;
                  return (
                    <button
                      key={v.name}
                      type="button"
                      onClick={() => setSelectedVariant(v)}
                      className={`p-3 rounded-2xl border text-left transition-all ${
                        isSelected
                          ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/50 text-stone-950 dark:text-amber-300 shadow-sm'
                          : 'border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-800/40 text-stone-700 dark:text-stone-300 hover:border-amber-400'
                      }`}
                    >
                      <span className="block font-bold text-xs">{v.name}</span>
                      <span className="block font-mono text-xs font-semibold text-amber-600 dark:text-amber-400 mt-0.5">
                        Rs. {v.price.toLocaleString()}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Recommended Add-ons */}
          <div className="space-y-2 pt-2 border-t border-stone-100 dark:border-stone-800">
            <label className="text-xs font-bold text-stone-900 dark:text-stone-100 uppercase tracking-wider block">
              Optional Add-ons
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <label
                className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-colors ${
                  extraCheese
                    ? 'border-amber-500 bg-amber-50/50 dark:bg-amber-950/30'
                    : 'border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-800/40'
                }`}
              >
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={extraCheese}
                    onChange={(e) => setExtraCheese(e.target.checked)}
                    className="accent-amber-500 w-4 h-4 rounded"
                  />
                  <span className="text-xs font-semibold text-stone-800 dark:text-stone-200">
                    Extra Cheese Slice
                  </span>
                </div>
                <span className="text-xs font-bold text-stone-600 dark:text-stone-400 font-mono">
                  +Rs. 99
                </span>
              </label>

              <label
                className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-colors ${
                  extraDip
                    ? 'border-amber-500 bg-amber-50/50 dark:bg-amber-950/30'
                    : 'border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-800/40'
                }`}
              >
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={extraDip}
                    onChange={(e) => setExtraDip(e.target.checked)}
                    className="accent-amber-500 w-4 h-4 rounded"
                  />
                  <span className="text-xs font-semibold text-stone-800 dark:text-stone-200">
                    TPC Secret Dip Sauce
                  </span>
                </div>
                <span className="text-xs font-bold text-stone-600 dark:text-stone-400 font-mono">
                  +Rs. 79
                </span>
              </label>
            </div>
          </div>

          {/* Special Instructions */}
          <div className="space-y-1 pt-2 border-t border-stone-100 dark:border-stone-800">
            <label className="text-xs font-bold text-stone-900 dark:text-stone-100 uppercase tracking-wider block">
              Special Kitchen Instructions
            </label>
            <input
              type="text"
              value={customNotes}
              onChange={(e) => setCustomNotes(e.target.value)}
              placeholder="e.g. well done crust, extra sauce, less spicy, no onions"
              className="w-full px-4 py-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          {/* Quantity & Summary Footer */}
          <div className="pt-4 border-t border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Quantity Stepper */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-stone-500">Qty:</span>
              <div className="flex items-center bg-stone-100 dark:bg-stone-800 rounded-xl p-1">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-lg bg-white dark:bg-stone-700 flex items-center justify-center text-stone-800 dark:text-stone-200 hover:bg-stone-200 transition-colors"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-10 text-center font-bold text-sm font-mono text-stone-900 dark:text-stone-100">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 rounded-lg bg-white dark:bg-stone-700 flex items-center justify-center text-stone-800 dark:text-stone-200 hover:bg-stone-200 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="ml-2 font-mono text-lg font-black text-stone-900 dark:text-stone-100">
                Rs. {totalItemPrice.toLocaleString()}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={handleAddToCart}
                className="flex-1 sm:flex-none px-5 py-3 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-900 dark:text-stone-100 font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{t.addToCart}</span>
              </button>

              <button
                type="button"
                onClick={handleBuyNow}
                className="flex-1 sm:flex-none px-6 py-3 bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold text-xs rounded-xl shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-1.5 active:scale-95"
              >
                <Zap className="w-4 h-4 fill-stone-950" />
                <span>{t.buyNow}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
