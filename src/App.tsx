/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HeritageView from "./components/HeritageView";
import ShopView from "./components/ShopView";
import MethodsView from "./components/MethodsView";
import AIAdvisorView from "./components/AIAdvisorView";
import ImpactView from "./components/ImpactView";
import CartDrawer from "./components/CartDrawer";
import FloatingChatBot from "./components/FloatingChatBot";
import RunningTicker from "./components/RunningTicker";
import { Product, CartItem } from "./types";
import { Check, Info, ShoppingBag, Sparkles, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "./context/LanguageContext";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("heritage");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { t } = useLanguage();
  
  // High-fidelity selected product routing
  const [selectedProductId, setSelectedProductId] = useState<string | undefined>(undefined);

  // Toast alert system
  const [toast, setToast] = useState<{ message: string; show: boolean }>({ message: "", show: false });

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("alayku_cart");
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch (e) {
      console.error("Failed to load cart", e);
    }
  }, []);

  // Save cart to localStorage
  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    try {
      localStorage.setItem("alayku_cart", JSON.stringify(newCart));
    } catch (e) {
      console.error("Failed to save cart", e);
    }
  };

  const handleAddToCart = (product: Product) => {
    const existingIndex = cart.findIndex((item) => item.product.id === product.id);
    let newCart = [...cart];

    if (existingIndex > -1) {
      newCart[existingIndex].quantity += 1;
    } else {
      newCart.push({ product, quantity: 1 });
    }

    saveCart(newCart);
    showToast(t("addedToBasket", { product: product.name }));
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    const updated = cart.map((item) => {
      if (item.product.id === productId) {
        const nextQty = item.quantity + delta;
        return { ...item, quantity: nextQty > 0 ? nextQty : 1 };
      }
      return item;
    });
    saveCart(updated);
  };

  const handleRemoveItem = (productId: string) => {
    const filtered = cart.filter((item) => item.product.id !== productId);
    saveCart(filtered);
    showToast(t("itemRemoved"));
  };

  const handleClearCart = () => {
    saveCart([]);
  };

  const showToast = (message: string) => {
    setToast({ message, show: true });
    setTimeout(() => {
      setToast({ message: "", show: false });
    }, 4000);
  };

  const handleSelectProduct = (productId: string) => {
    setSelectedProductId(productId);
    setActiveTab("products");
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Scroll to top on tab change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeTab]);

  return (
    <div className="min-h-screen flex flex-col bg-natural-bg text-natural-text font-sans antialiased selection:bg-natural-sage/20 selection:text-natural-sage">
      
      {/* HEADER COMPONENT */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={totalCartCount}
        toggleCart={() => setIsCartOpen(!isCartOpen)}
      />

      {/* RUNNING TICKER (MARQUEE) */}
      <RunningTicker />

      {/* MAIN SCREEN ROUTER */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
          >
            {activeTab === "heritage" && (
              <HeritageView 
                setActiveTab={setActiveTab} 
                onSelectProduct={handleSelectProduct}
              />
            )}
            {activeTab === "products" && (
              <ShopView
                onAddToCart={handleAddToCart}
                selectedProductId={selectedProductId}
                clearSelectedProductId={() => setSelectedProductId(undefined)}
              />
            )}
            {activeTab === "methods" && <MethodsView />}
            {activeTab === "advisor" && <AIAdvisorView />}
            {activeTab === "impact" && <ImpactView />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* FOOTER COMPONENT */}
      <Footer setActiveTab={setActiveTab} />

      {/* CART DRAWER SLIDE PANEL */}
      <AnimatePresence>
        {isCartOpen && (
          <CartDrawer
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            cartItems={cart}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onClearCart={handleClearCart}
          />
        )}
      </AnimatePresence>

      {/* FLOATING CHAT BOT ON THE RIGHT SIDE */}
      <FloatingChatBot />

      {/* PREMIUM FLOATING TOAST ALERTS */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 left-6 z-50 bg-white border border-natural-sand shadow-xl rounded-xl p-4 max-w-sm flex items-center gap-3"
          >
            <div className="w-8 h-8 rounded-full bg-natural-sage/10 flex items-center justify-center text-natural-sage shrink-0">
              <Check className="w-4.5 h-4.5" />
            </div>
            <div className="flex-grow">
              <p className="text-xs font-semibold text-natural-text">{toast.message}</p>
            </div>
            <button
              onClick={() => setToast({ message: "", show: false })}
              className="text-natural-text-muted hover:text-natural-text focus:outline-none"
              aria-label="Close alert"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
