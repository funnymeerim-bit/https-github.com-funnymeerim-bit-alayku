/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { ShoppingBag, Menu, X, Sparkles, Map, BookOpen, Leaf, Globe } from "lucide-react";
import { useLanguage, Language } from "../context/LanguageContext";

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  cartCount: number;
  toggleCart: () => void;
}

export default function Header({ activeTab, setActiveTab, cartCount, toggleCart }: HeaderProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const { language, setLanguage, t } = useLanguage();

  const navItems = [
    { id: "heritage", label: t("navHeritage"), icon: Leaf },
    { id: "products", label: t("navProducts"), icon: ShoppingBag },
    { id: "methods", label: t("navMethods"), icon: BookOpen },
    { id: "advisor", label: t("navAdvisor"), icon: Sparkles },
    { id: "impact", label: t("navImpact"), icon: Map },
  ];

  return (
    <nav className="w-full sticky top-0 z-50 bg-natural-bg/95 backdrop-blur-md border-b border-natural-sand/60 transition-all duration-300">
      <div className="flex justify-between items-center px-6 md:px-16 py-4 max-w-7xl mx-auto">
        <a 
          href="#" 
          id="logo-brand"
          className="font-serif text-2xl text-natural-sage font-bold tracking-tight shrink-0"
          onClick={(e) => { e.preventDefault(); setActiveTab("heritage"); }}
        >
          Алайкуу Organics
        </a>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1.5 py-1 px-1 text-sm font-medium transition-all relative ${
                  isActive 
                    ? "text-natural-sage font-bold border-b-2 border-natural-sage" 
                    : "text-natural-text-muted hover:text-natural-sage"
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Language Selection & Shopping Cart & Mobile Menu Controls */}
        <div className="flex items-center gap-3 md:gap-4">
          {/* Language Switcher */}
          <div className="flex items-center bg-natural-sage-light/30 border border-natural-sand/80 rounded-lg p-0.5 text-3xs md:text-2xs font-bold shadow-xs">
            <button
              onClick={() => setLanguage("ky")}
              className={`px-2 py-1 rounded-md transition-all ${
                language === "ky"
                  ? "bg-natural-sage text-white shadow-xs"
                  : "text-natural-text-muted hover:text-natural-sage"
              }`}
            >
              КЫ
            </button>
            <button
              onClick={() => setLanguage("ru")}
              className={`px-2 py-1 rounded-md transition-all ${
                language === "ru"
                  ? "bg-natural-sage text-white shadow-xs"
                  : "text-natural-text-muted hover:text-natural-sage"
              }`}
            >
              РУ
            </button>
            <button
              onClick={() => setLanguage("en")}
              className={`px-2 py-1 rounded-md transition-all ${
                language === "en"
                  ? "bg-natural-sage text-white shadow-xs"
                  : "text-natural-text-muted hover:text-natural-sage"
              }`}
            >
              EN
            </button>
          </div>

          <button 
            id="cart-toggle-btn"
            onClick={toggleCart}
            className="relative p-2 text-natural-text-muted hover:text-natural-sage transition-colors focus:outline-none"
            aria-label="Shopping Cart"
          >
            <ShoppingBag className="w-6 h-6" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-natural-clay text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-bounce">
                {cartCount}
              </span>
            )}
          </button>

          <button
            id="shop-now-cta"
            onClick={() => setActiveTab("products")}
            className="hidden sm:inline-block bg-natural-sage text-white px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-natural-sage-hover transition-all active:scale-95 shadow-sm cursor-pointer"
          >
            {t("shopNow")}
          </button>

          <button
            id="mobile-menu-toggle"
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-natural-text-muted hover:text-natural-sage"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="lg:hidden bg-natural-bg border-t border-natural-sand/60 py-4 px-6 space-y-3 absolute top-full left-0 w-full shadow-lg transition-transform">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`mobile-nav-${item.id}`}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsOpen(false);
                }}
                className={`flex items-center gap-3 w-full py-2.5 px-3 rounded-lg text-left text-sm font-medium transition-colors ${
                  isActive 
                    ? "bg-natural-sage/10 text-natural-sage font-bold" 
                    : "text-natural-text-muted hover:bg-black/5"
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </button>
            );
          })}
          <button
            id="mobile-shop-now-cta"
            onClick={() => {
              setActiveTab("products");
              setIsOpen(false);
            }}
            className="w-full bg-natural-sage text-white py-3 rounded-lg text-sm font-bold uppercase tracking-wider text-center block"
          >
            {t("shopNow")}
          </button>
        </div>
      )}
    </nav>
  );
}
