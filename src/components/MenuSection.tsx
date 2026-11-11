import React, { useState, useMemo } from 'react';
import {
  Search,
  Flame,
  Star,
  Plus,
  Zap,
  Check,
  Clock,
  Sparkles,
} from 'lucide-react';
import { Product, ProductCategory, ProductVariant } from '../types';
import { useApp } from '../context/AppContext';

export const MenuSection: React.FC = () => {
  const {
    products,
    t,
    language,
    addToCart,
    setSelectedProduct,
    setIsCheckoutOpen,
  } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSpicyOnly, setFilterSpicyOnly] = useState(false);
  const [filterPopularOnly, setFilterPopularOnly] = useState(false);

  const categories: { key: ProductCategory; label: string; icon: string }[] = [
    { key: 'all', label: t.allCategories, icon: '🍽️' },
    { key: 'deal', label: t.valueDeals, icon: '🎁' },
    { key: 'pizza', label: t.pizzas, icon: '🍕' },
    { key: 'burger', label: t.burgers, icon: '🍔' },
    { key: 'steak', label: t.steaks, icon: '🥩' },
    { key: 'sandwich', label: t.sandwiches, icon: '🥪' },
    { key: 'pasta', label: t.pastas, icon: '🍝' },
    { key: 'wrap', label: t.wraps, icon: '🌯' },
    { key: 'chicken', label: t.chicken, icon: '🍗' },
    { key: 'starter', label: t.starters, icon: '🥟' },
    { key: 'fries', label: t.fries, icon: '🍟' },
    { key: 'continental', label: t.continental, icon: '🍳' },
    { key: 'beverage', label: t.beverages, icon: '🥤' },
    { key: 'sauce', label: t.sauces, icon: '🥣' },
    { key: 'kids', label: t.kids, icon: '🎈' },
  ];

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category match
      if (selectedCategory !== 'all' && p.category !== selectedCategory) {
        return false;
      }
      // Search match
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(query);
        const matchesUrdu = p.nameUrdu.includes(query);
        const matchesDesc = p.description.toLowerCase().includes(query);
        const matchesSub = p.subCategory?.toLowerCase().includes(query);
        if (!matchesName && !matchesUrdu && !matchesDesc && !matchesSub) {
          return false;
        }
      }
      // Filters
      if (filterSpicyOnly && !p.isSpicy) return false;
      if (filterPopularOnly && !p.isPopular) return false;

      return true;
    });
  }, [products, selectedCategory, searchQuery, filterSpicyOnly, filterPopularOnly]);

  const handleBuyNow = (e: React.MouseEvent, product: Product, defaultVariant?: ProductVariant) => {
    e.stopPropagation();
    addToCart(product, defaultVariant, 1);
    setIsCheckoutOpen(true);
  };

  const handleAddToCart = (e: React.MouseEvent, product: Product, defaultVariant?: ProductVariant) => {
    e.stopPropagation();
    addToCart(product, defaultVariant, 1);
  };

  return (
    <section id="menu" className="py-16 bg-white dark:bg-stone-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest mb-1.5">
              <span>Freshly Prepared Daily</span>
              <span>·</span>
              <span>100+ Menu Items</span>
            </div>
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-stone-900 dark:text-stone-100 tracking-tight">
              {t.menu} &amp; Signature Flavours
            </h2>
            <p className="text-stone-500 dark:text-stone-400 text-sm mt-1 max-w-xl">
              From our famous Crown Crust and Cheesy Stuffed pizzas to juicy lava burgers and sizzling steaks. Every product photo is authentic.
            </p>
          </div>

          {/* Search bar */}
          <div className="w-full md:w-80 relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full pl-10 pr-4 py-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-sm text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-600"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Category Horizontal Filter Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none mb-6">
          {categories.map((c) => {
            const isActive = selectedCategory === c.key;
            return (
              <button
                key={c.key}
                onClick={() => setSelectedCategory(c.key)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap shrink-0 transition-all active:scale-95 ${
                  isActive
                    ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-500/20'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
                }`}
              >
                <span>{c.icon}</span>
                <span>{c.label}</span>
              </button>
            );
          })}
        </div>

        {/* Secondary Filter Flags */}
        <div className="flex items-center justify-between text-xs text-stone-500 mb-8 border-b border-stone-100 dark:border-stone-800 pb-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFilterPopularOnly(!filterPopularOnly)}
              className={`px-3 py-1 rounded-lg border text-xs font-medium transition-colors ${
                filterPopularOnly
                  ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-400 font-bold'
                  : 'border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800'
              }`}
            >
              ⭐ Best Sellers Only
            </button>
            <button
              onClick={() => setFilterSpicyOnly(!filterSpicyOnly)}
              className={`px-3 py-1 rounded-lg border text-xs font-medium transition-colors ${
                filterSpicyOnly
                  ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-700 text-rose-700 dark:text-rose-400 font-bold'
                  : 'border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800'
              }`}
            >
              🌶️ Spicy Only
            </button>
          </div>
          <span className="font-mono tabular-nums">
            Showing {filteredProducts.length} of {products.length} Products
          </span>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-stone-50 dark:bg-stone-800/40 rounded-3xl border border-stone-200 dark:border-stone-800">
            <p className="text-4xl mb-3">🔍</p>
            <h3 className="font-heading font-bold text-lg text-stone-900 dark:text-stone-100">
              No products found
            </h3>
            <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">
              Try adjusting your search query or removing filters.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
                setFilterSpicyOnly(false);
                setFilterPopularOnly(false);
              }}
              className="mt-4 px-4 py-2 bg-amber-500 text-stone-950 rounded-xl text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const defaultVariant = product.variants ? product.variants[0] : undefined;
              const displayPrice = defaultVariant ? defaultVariant.price : product.price;

              return (
                <div
                  key={product.id}
                  onClick={() => setSelectedProduct(product)}
                  className="group bg-white dark:bg-stone-900/90 rounded-2xl overflow-hidden border border-stone-200/80 dark:border-stone-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between"
                >
                  {/* Top Image Container */}
                  <div className="relative aspect-[4/3] bg-stone-100 dark:bg-stone-800 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      onError={(e) => {
                        // Fallback to special swirl image if specific file fails
                        (e.target as HTMLImageElement).src = '/images/products/special_pizza_swirl.jpg';
                      }}
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                    {/* Badges */}
                    <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start">
                      {product.isSignature && (
                        <span className="bg-amber-500 text-stone-950 text-[10px] font-extrabold px-2 py-0.5 rounded shadow-sm flex items-center gap-1">
                          <Sparkles className="w-2.5 h-2.5" />
                          <span>SIGNATURE</span>
                        </span>
                      )}
                      {product.isPopular && (
                        <span className="bg-stone-900/90 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur">
                          BEST SELLER
                        </span>
                      )}
                    </div>

                    {product.isSpicy && (
                      <span className="absolute top-2.5 right-2.5 bg-rose-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm flex items-center gap-0.5">
                        <Flame className="w-2.5 h-2.5" />
                        <span>SPICY</span>
                      </span>
                    )}

                    {/* Prep time badge */}
                    <div className="absolute bottom-2 left-2.5 text-[10px] text-white/90 bg-stone-950/70 backdrop-blur px-2 py-0.5 rounded font-medium flex items-center gap-1">
                      <Clock className="w-2.5 h-2.5 text-amber-400" />
                      <span>{product.prepTime}</span>
                    </div>

                    {/* Rating */}
                    <div className="absolute bottom-2 right-2.5 text-[10px] text-amber-400 bg-stone-950/70 backdrop-blur px-2 py-0.5 rounded font-bold flex items-center gap-1">
                      <Star className="w-2.5 h-2.5 fill-amber-400" />
                      <span>{product.rating}</span>
                    </div>
                  </div>

                  {/* Content Container */}
                  <div className="p-4 flex flex-col flex-1 justify-between">
                    <div>
                      {/* Subcategory */}
                      {product.subCategory && (
                        <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider block mb-1">
                          {product.subCategory}
                        </span>
                      )}

                      {/* Title */}
                      <h3 className="font-heading font-bold text-base text-stone-900 dark:text-stone-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors leading-snug">
                        {language === 'ur' ? product.nameUrdu : product.name}
                      </h3>

                      {/* Description */}
                      <p className="text-xs text-stone-500 dark:text-stone-400 line-clamp-2 mt-1.5 leading-relaxed">
                        {language === 'ur' ? product.descriptionUrdu : product.description}
                      </p>
                    </div>

                    {/* Price & Actions Row */}
                    <div className="pt-4 mt-3 border-t border-stone-100 dark:border-stone-800">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <span className="text-[11px] text-stone-400 block font-medium">
                            {product.variants ? 'Starting from' : 'Price'}
                          </span>
                          <span className="text-base font-extrabold text-stone-900 dark:text-stone-100 font-mono tabular-nums">
                            Rs. {displayPrice.toLocaleString()}
                          </span>
                        </div>

                        {product.variants && (
                          <span className="text-[11px] text-amber-600 dark:text-amber-400 font-semibold bg-amber-50 dark:bg-amber-950/50 px-2 py-0.5 rounded border border-amber-200 dark:border-amber-800/60">
                            {product.variants.length} Sizes
                          </span>
                        )}
                      </div>

                      {/* Dual Action Buttons: Add to Cart & Buy Now */}
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={(e) => handleAddToCart(e, product, defaultVariant)}
                          className="w-full py-2 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1 active:scale-95"
                          title="Add to Cart"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>{t.addToCart}</span>
                        </button>

                        <button
                          type="button"
                          onClick={(e) => handleBuyNow(e, product, defaultVariant)}
                          className="w-full py-2 bg-amber-500 hover:bg-amber-600 text-stone-950 text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1 active:scale-95 shadow-sm"
                          title="Direct Fast Checkout"
                        >
                          <Zap className="w-3.5 h-3.5 fill-stone-950" />
                          <span>{t.buyNow}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
