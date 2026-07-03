/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Product } from "../types";
import { Search, ShoppingCart, Info, CheckCircle, Scale, Eye, X, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../context/LanguageContext";

interface ShopViewProps {
  onAddToCart: (product: Product) => void;
  selectedProductId?: string;
  clearSelectedProductId?: () => void;
}

export default function ShopView({ onAddToCart, selectedProductId, clearSelectedProductId }: ShopViewProps) {
  const { t, language, getProducts } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>(" border border-natural-sand");
  const [activeDetailProduct, setActiveDetailProduct] = useState<Product | null>(null);

  const products = getProducts();

  // Handle automatic product modal popup if selected via home page
  React.useEffect(() => {
    if (selectedProductId) {
      const prod = products.find((p) => p.id === selectedProductId);
      if (prod) {
        setActiveDetailProduct(prod);
      }
      if (clearSelectedProductId) {
        clearSelectedProductId();
      }
    }
  }, [selectedProductId, clearSelectedProductId, products]);

  React.useEffect(() => {
    setSearchQuery("");
  }, []);

  const categories = [
    { id: "All", label: t("categoryAll") },
    { id: "Drinks", label: t("categoryDrinks") },
    { id: "Creams & Butter", label: t("categoryCreams") },
    { id: "Cheeses & Snacks", label: t("categoryCheeses") },
    { id: "Desserts & Sherbets", label: t("categoryDesserts") }
  ];

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    const matchesSearch = 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.ingredients.some(i => i.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const getBadgeTranslation = (badge: string) => {
    if (badge === "Signature") return t("badgeSignature");
    if (badge === "Traditional") return t("badgeTraditional");
    if (badge === "Seasonal") return t("badgeSeasonal");
    if (badge === "Pure Gold") return t("badgePureGold");
    if (badge === "Best Seller") return t("badgeBestSeller");
    if (badge === "Nomadic Spirit") return t("badgeNomadic");
    return badge;
  };

  const getCategoryLabel = (catId: string) => {
    const found = categories.find(c => c.id === catId);
    return found ? found.label : catId;
  };

  return (
    <div className="px-6 md:px-16 max-w-7xl mx-auto py-8 space-y-12 min-h-screen">
      {/* HEADER & FILTERS */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-natural-sand pb-8">
        <div>
          <span className="text-xs font-bold text-natural-clay uppercase tracking-wider">
            Алайкуу Organics Store
          </span>
          <h1 className="font-serif text-3xl md:text-4xl text-natural-sage font-bold mt-1">
            {t("shopTitle")}
          </h1>
          <p className="text-natural-text-muted text-sm mt-2 max-w-xl">
            {t("shopSubtitle")}
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-80">
          <input
            type="text"
            id="product-search-input"
            placeholder={language === "ky" ? "Издөө..." : language === "ru" ? "Поиск..." : "Search products or ingredients..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-natural-sage-light/40 border border-natural-sand rounded-full py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-natural-sage text-natural-text placeholder-natural-text-muted/60"
          />
          <Search className="absolute left-3.5 top-3 w-4.5 h-4.5 text-natural-text-muted" />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            id={`cat-tab-${cat.id.replace(/\s+/g, "-").toLowerCase()}`}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 shrink-0 cursor-pointer ${
              selectedCategory === cat.id
                ? "bg-natural-sage text-white shadow-md"
                : "bg-natural-sage-light/60 text-natural-text-muted hover:bg-natural-sage-light"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* PRODUCTS GRID */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 bg-natural-sage-light/20 rounded-2xl border border-dashed border-natural-sand">
          <HelpCircle className="w-12 h-12 text-natural-sage/60 mx-auto mb-4 animate-bounce" />
          <h3 className="text-lg font-bold text-natural-sage">
            {language === "ky" ? "Азыктар табылган жок" : language === "ru" ? "Продукты не найдены" : "No products found"}
          </h3>
          <p className="text-natural-text-muted text-sm mt-2">
            {language === "ky" ? "Издөө суроосун өзгөртүп көрүңүз." : language === "ru" ? "Попробуйте изменить параметры поиска." : "Try adjusting your filters or search query."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              id={`product-card-${product.id}`}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-2xl border border-natural-sand/60 hover:shadow-xl transition-all duration-300 flex flex-col h-full overflow-hidden group"
            >
              {/* Product Image Panel */}
              <div className="relative aspect-[4/3] bg-natural-sand-light overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {product.badge && (
                  <span className="absolute top-3 left-3 bg-natural-clay text-white text-3xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-full shadow-sm">
                    {getBadgeTranslation(product.badge)}
                  </span>
                )}
                <span className="absolute top-3 right-3 bg-black/50 backdrop-blur-md text-white text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
                  <Scale className="w-3.5 h-3.5" />
                  {product.volume}
                </span>
              </div>

              {/* Product Details Block */}
              <div className="p-6 flex flex-col flex-grow space-y-4">
                <div className="flex justify-between items-start gap-2">
                  <h3 className="font-serif text-lg md:text-xl text-natural-sage font-bold group-hover:text-natural-clay transition-colors leading-tight">
                    {product.name}
                  </h3>
                  <div className="text-right shrink-0">
                    <div className="font-bold text-natural-sage text-lg">{product.priceKGS} KGS</div>
                    <div className="text-3xs text-natural-text-muted uppercase font-bold tracking-wider">~${product.priceUSD.toFixed(2)}</div>
                  </div>
                </div>

                <p className="text-natural-text-muted text-xs md:text-sm line-clamp-3 leading-relaxed flex-grow">
                  {product.description}
                </p>

                {/* Grid of Micro Nutrition tags */}
                <div className="grid grid-cols-4 gap-1 text-center bg-natural-sage-light/40 rounded-lg p-2 text-2xs font-bold text-natural-text-muted">
                  <div>
                    <div className="text-natural-sage">{product.nutritionalInfo.calories}</div>
                    <div className="text-3xs opacity-80">{t("calories").substring(0, 4)}</div>
                  </div>
                  <div>
                    <div className="text-natural-sage">{product.nutritionalInfo.fat}</div>
                    <div className="text-3xs opacity-80">{t("fat").substring(0, 4)}</div>
                  </div>
                  <div>
                    <div className="text-natural-sage">{product.nutritionalInfo.protein}</div>
                    <div className="text-3xs opacity-80">{t("protein").substring(0, 4)}</div>
                  </div>
                  <div>
                    <div className="text-natural-sage">{product.nutritionalInfo.carbs}</div>
                    <div className="text-3xs opacity-80">{t("carbs").substring(0, 4)}</div>
                  </div>
                </div>

                {/* Card Action Controls */}
                <div className="flex gap-2 pt-2">
                  <button
                    id={`btn-detail-${product.id}`}
                    onClick={() => setActiveDetailProduct(product)}
                    className="flex items-center justify-center gap-1.5 border border-natural-sand hover:bg-natural-sage/5 text-natural-sage py-2 px-3.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer text-center"
                  >
                    <Eye className="w-4 h-4" />
                    {language === "ky" ? "Көрүү" : language === "ru" ? "Детали" : "Details"}
                  </button>
                  <button
                    id={`btn-add-${product.id}`}
                    onClick={() => onAddToCart(product)}
                    className="flex-grow flex items-center justify-center gap-2 bg-natural-sage hover:bg-natural-sage-hover text-white py-2 px-4 rounded-lg text-xs font-bold uppercase tracking-wider transition-all shadow-sm active:scale-95 cursor-pointer text-center"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    {t("addToBasket")}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* DETAIL MODAL OVERLAY */}
      <AnimatePresence>
        {activeDetailProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-natural-bg border border-natural-sand rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Modal Image Header */}
              <div className="relative h-60 md:h-72 bg-natural-sand-light">
                <img
                  src={activeDetailProduct.image}
                  alt={activeDetailProduct.name}
                  className="w-full h-full object-cover"
                />
                <button
                  id="close-modal-btn"
                  onClick={() => setActiveDetailProduct(null)}
                  className="absolute top-4 right-4 bg-black/60 text-white hover:bg-black p-2 rounded-full transition-colors focus:outline-none cursor-pointer"
                  aria-label="Close details"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="absolute bottom-4 left-4 bg-natural-sage text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg">
                  {getCategoryLabel(activeDetailProduct.category)}
                </div>
              </div>

              {/* Modal Details Content */}
              <div className="p-6 md:p-8 space-y-6">
                <div>
                  <h2 className="font-serif text-2xl md:text-3xl text-natural-sage font-bold leading-tight">
                    {activeDetailProduct.name}
                  </h2>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-lg font-bold text-natural-sage">{activeDetailProduct.priceKGS} KGS</span>
                    <span className="text-natural-text-muted text-sm">/ {activeDetailProduct.volume}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-natural-text-muted border-b border-natural-sand/60 pb-1">
                    {t("heritageLabel")}
                  </h4>
                  <p className="text-sm text-natural-text-muted leading-relaxed">
                    {activeDetailProduct.longDescription}
                  </p>
                </div>

                {/* Ingredients list */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-natural-text-muted border-b border-natural-sand/60 pb-1">
                      {t("ingredientsLabel")}
                    </h4>
                    <ul className="space-y-1.5 pt-1">
                      {activeDetailProduct.ingredients.map((ing, i) => (
                        <li key={i} className="text-sm text-natural-text flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-natural-sage shrink-0" />
                          <span>{ing}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Detailed Nutritional list */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-natural-text-muted border-b border-natural-sand/60 pb-1">
                      {t("nutritionLabel")}
                    </h4>
                    <div className="grid grid-cols-2 gap-4 pt-1">
                      <div className="bg-natural-sage-light/30 p-2.5 rounded-lg text-center">
                        <div className="text-xs text-natural-text-muted font-semibold">{t("calories")}</div>
                        <div className="text-base font-bold text-natural-sage">{activeDetailProduct.nutritionalInfo.calories} kcal</div>
                      </div>
                      <div className="bg-natural-sage-light/30 p-2.5 rounded-lg text-center">
                        <div className="text-xs text-natural-text-muted font-semibold">{t("fat")}</div>
                        <div className="text-base font-bold text-natural-sage">{activeDetailProduct.nutritionalInfo.fat}</div>
                      </div>
                      <div className="bg-natural-sage-light/30 p-2.5 rounded-lg text-center">
                        <div className="text-xs text-natural-text-muted font-semibold">{t("protein")}</div>
                        <div className="text-base font-bold text-natural-sage">{activeDetailProduct.nutritionalInfo.protein}</div>
                      </div>
                      <div className="bg-natural-sage-light/30 p-2.5 rounded-lg text-center">
                        <div className="text-xs text-natural-text-muted font-semibold">{t("carbs")}</div>
                        <div className="text-base font-bold text-natural-sage">{activeDetailProduct.nutritionalInfo.carbs}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Cultural and Health Benefits list */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-natural-text-muted border-b border-natural-sand/60 pb-1">
                    {t("benefitsLabel")}
                  </h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-1">
                    {activeDetailProduct.benefits.map((benefit, idx) => (
                      <li key={idx} className="text-xs text-natural-text-muted flex items-start gap-2 leading-relaxed">
                        <CheckCircle className="w-3.5 h-3.5 text-natural-sage shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Add to Cart in Modal Footer */}
                <div className="flex gap-4 pt-4 border-t border-natural-sand/60">
                  <button
                    onClick={() => setActiveDetailProduct(null)}
                    className="flex-grow md:flex-grow-0 border border-natural-sand hover:bg-black/5 text-natural-text-muted py-3 px-6 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer text-center"
                  >
                    {language === "ky" ? "Жабуу" : language === "ru" ? "Закрыть" : "Close"}
                  </button>
                  <button
                    id="modal-add-to-cart-btn"
                    onClick={() => {
                      onAddToCart(activeDetailProduct);
                      setActiveDetailProduct(null);
                    }}
                    className="flex-grow bg-natural-sage hover:bg-natural-sage-hover text-white py-3 px-8 rounded-lg text-xs font-bold uppercase tracking-wider transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 cursor-pointer text-center"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    {t("addToBasket")} • {activeDetailProduct.priceKGS} KGS
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

