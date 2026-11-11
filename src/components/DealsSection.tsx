import React from 'react';
import { Gift, Zap, Plus, ArrowRight, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const DealsSection: React.FC = () => {
  const { products, addToCart, setIsCheckoutOpen, setSelectedProduct, t } = useApp();

  const deals = products.filter((p) => p.category === 'deal');

  const handleQuickOrder = (deal: (typeof deals)[0]) => {
    addToCart(deal, undefined, 1);
    setIsCheckoutOpen(true);
  };

  return (
    <section id="deals" className="py-16 bg-stone-100/60 dark:bg-stone-950/60 border-t border-stone-200 dark:border-stone-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest mb-1.5">
              <Gift className="w-4 h-4" />
              <span>Unbeatable Lahore Combos</span>
            </div>
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-stone-900 dark:text-stone-100 tracking-tight">
              {t.valueDeals}
            </h2>
            <p className="text-stone-500 dark:text-stone-400 text-sm mt-1 max-w-xl">
              Family Feasts, Mega Treats, and Student Combos designed to give you maximum value and authentic TPC flavors.
            </p>
          </div>

          <a
            href="#menu"
            className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1"
          >
            <span>View All Individual Items</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Deals Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {deals.slice(0, 6).map((deal) => (
            <div
              key={deal.id}
              onClick={() => setSelectedProduct(deal)}
              className="group bg-white dark:bg-stone-900 rounded-3xl overflow-hidden border border-stone-200 dark:border-stone-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-stone-950">
                <img
                  src={deal.image}
                  alt={deal.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />

                <div className="absolute top-3 left-3 bg-amber-500 text-stone-950 text-xs font-black px-2.5 py-1 rounded-lg shadow-md flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  <span>SPECIAL COMBO</span>
                </div>

                <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between text-white">
                  <div>
                    <span className="text-[10px] text-amber-300 font-bold uppercase tracking-wider block">
                      Limited Time Value
                    </span>
                    <h3 className="font-heading font-black text-lg text-white">
                      {deal.name}
                    </h3>
                  </div>
                  <div className="font-mono text-xl font-black text-amber-400">
                    Rs. {deal.price.toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="p-5 flex flex-col flex-1 justify-between space-y-4">
                <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                  {deal.description}
                </p>

                <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(deal, undefined, 1);
                    }}
                    className="flex-1 py-2.5 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Deal</span>
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleQuickOrder(deal);
                    }}
                    className="flex-1 py-2.5 bg-amber-500 hover:bg-amber-600 text-stone-950 font-black text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-1 active:scale-95"
                  >
                    <Zap className="w-3.5 h-3.5 fill-stone-950" />
                    <span>Buy Now</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
