/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { CartItem } from "../types";
import { X, Trash2, Plus, Minus, Check, MapPin, Phone, User, ShoppingBag, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import { useLanguage } from "../context/LanguageContext";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}: CartDrawerProps) {
  const { t, language, getProducts } = useLanguage();
  const localizedProducts = getProducts();

  // Checkout form states
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
  
  // Checkout flow state
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderCode, setOrderCode] = useState("");

  // Map each cartItem to the currently localized version of the product to ensure correct language name/volume/details
  const localizedCartItems = cartItems.map(item => {
    const freshProduct = localizedProducts.find(p => p.id === item.product.id);
    return {
      ...item,
      product: freshProduct || item.product
    };
  });

  const subtotal = localizedCartItems.reduce((acc, item) => acc + item.product.priceKGS * item.quantity, 0);
  const shippingFee = subtotal > 1500 || subtotal === 0 ? 0 : 150;
  const total = subtotal + shippingFee;

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim() || !address.trim()) return;

    // Simulate order placement
    const code = "AL-" + Math.floor(100000 + Math.random() * 900000);
    setOrderCode(code);
    setIsCheckingOut(true);

    setTimeout(() => {
      setIsCheckingOut(false);
      setOrderConfirmed(true);
      onClearCart();
    }, 1500);
  };

  const resetFlow = () => {
    setFullName("");
    setPhone("");
    setAddress("");
    setPaymentMethod("Cash on Delivery");
    setOrderConfirmed(false);
    setOrderCode("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity" onClick={onClose} />

      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md bg-natural-bg border-l border-natural-sand flex flex-col shadow-2xl relative">
          
          {/* Header Panel */}
          <div className="px-6 py-5 border-b border-natural-sand flex justify-between items-center bg-white">
            <h2 className="font-serif text-lg font-bold text-natural-sage flex items-center gap-2">
              <ShoppingBag className="w-5 h-5" />
              {t("basketTitle")}
            </h2>
            <button
              onClick={onClose}
              className="p-1 text-natural-text-muted hover:text-natural-sage transition-colors focus:outline-none cursor-pointer"
              aria-label="Close basket"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Cart Content or Confirmation */}
          {orderConfirmed ? (
            <div className="flex-grow p-6 flex flex-col justify-center items-center text-center space-y-6 bg-white">
              <div className="w-16 h-16 rounded-full bg-natural-sage/15 border border-natural-sage/20 flex items-center justify-center text-natural-sage animate-bounce">
                <Check className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h3 className="font-serif text-2xl text-natural-sage font-bold">{t("orderConfirmed")}</h3>
                <span className="inline-block bg-natural-sand text-natural-sage text-xs font-mono font-bold px-3 py-1 rounded-full">
                  {t("orderCodeLabel")} {orderCode}
                </span>
                <p className="text-sm text-natural-text-muted leading-relaxed max-w-xs mx-auto">
                  {t("orderSuccessText")}
                </p>
              </div>

              {paymentMethod === "MBank Transfer" && (
                <div className="bg-natural-sage-light/40 border border-natural-sand p-4 rounded-xl text-left w-full text-xs space-y-2">
                  <span className="font-bold text-natural-clay uppercase tracking-wider block">{t("mBankTitle")}</span>
                  <p className="text-natural-text-muted">
                    {t("mBankDesc", { total: total, code: orderCode })}
                  </p>
                </div>
              )}

              <button
                id="confirmed-close-btn"
                onClick={resetFlow}
                className="w-full bg-natural-sage hover:bg-natural-sage-hover text-white py-3.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer text-center"
              >
                {t("continueExploring")}
              </button>
            </div>
          ) : localizedCartItems.length === 0 ? (
            <div className="flex-grow p-6 flex flex-col justify-center items-center text-center space-y-4">
              <ShoppingBag className="w-16 h-16 text-natural-sage/30" />
              <div>
                <h3 className="text-base font-bold text-natural-sage">{t("basketEmpty")}</h3>
                <p className="text-xs text-natural-text-muted mt-1 max-w-xs">
                  {t("basketEmptyDesc")}
                </p>
              </div>
              <button
                onClick={onClose}
                className="bg-natural-sage text-white px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-natural-sage-hover cursor-pointer text-center"
              >
                {t("browseShop")}
              </button>
            </div>
          ) : (
            <div className="flex-grow flex flex-col overflow-y-auto">
              
              {/* Basket list items */}
              <div className="flex-grow p-6 space-y-4">
                {localizedCartItems.map((item) => (
                  <div
                    key={item.product.id}
                    id={`cart-item-${item.product.id}`}
                    className="flex gap-4 p-3 bg-white border border-natural-sand rounded-xl"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded-lg bg-natural-sand-light shrink-0"
                    />
                    <div className="flex-grow space-y-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-sm font-bold text-natural-text leading-tight line-clamp-1">{item.product.name}</h4>
                          <span className="text-3xs text-natural-text-muted">{item.product.volume}</span>
                        </div>
                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="text-natural-text-muted/60 hover:text-red-500 transition-colors cursor-pointer"
                          aria-label={`Remove ${item.product.name}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex justify-between items-center pt-1.5">
                        <div className="flex items-center border border-natural-sand rounded-lg overflow-hidden bg-natural-bg">
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, -1)}
                            className="px-2 py-1 text-natural-text-muted hover:bg-black/5 cursor-pointer"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-3 text-xs font-bold text-natural-text">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, 1)}
                            className="px-2 py-1 text-natural-text-muted hover:bg-black/5 cursor-pointer"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="text-sm font-bold text-natural-sage">{item.product.priceKGS * item.quantity} KGS</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary & Checkout Form Container */}
              <div className="border-t border-natural-sand bg-white p-6 space-y-6">
                
                {/* Cost Calculations */}
                <div className="space-y-2 text-sm text-natural-text-muted">
                  <div className="flex justify-between">
                    <span>{t("subtotal")}</span>
                    <span className="font-semibold text-natural-text">{subtotal} KGS</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t("courier")}</span>
                    <span className="font-semibold text-natural-text">
                      {shippingFee === 0 ? t("courierFree") : `${shippingFee} KGS`}
                    </span>
                  </div>
                  {shippingFee > 0 && (
                    <p className="text-3xs text-natural-sage font-semibold">
                      {t("addMoreForFree", { amount: 1500 - subtotal })}
                    </p>
                  )}
                  <div className="flex justify-between text-base font-bold text-natural-sage border-t border-natural-sand/60 pt-2.5">
                    <span>{t("totalAmount")}</span>
                    <div className="text-right">
                      <span>{total} KGS</span>
                      <span className="block text-3xs font-normal text-natural-text-muted uppercase tracking-wider">~${(total / 87.5).toFixed(2)} USD</span>
                    </div>
                  </div>
                </div>

                {/* Simulated Checkout fields */}
                <form onSubmit={handleCheckoutSubmit} className="space-y-3 pt-2">
                  <span className="text-2xs font-bold text-natural-clay uppercase tracking-wider block">{t("deliveryFormTitle")}</span>
                  
                  {/* Name field */}
                  <div className="relative">
                    <input
                      type="text"
                      placeholder={t("fullNamePlaceholder")}
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-natural-sage-light/30 border border-natural-sand rounded-lg py-2 pl-9 pr-4 text-xs focus:outline-none focus:border-natural-sage text-natural-text"
                      required
                    />
                    <User className="absolute left-3 top-2.5 w-4 h-4 text-natural-text-muted/60" />
                  </div>

                  {/* Phone field */}
                  <div className="relative">
                    <input
                      type="tel"
                      placeholder={t("phonePlaceholder")}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-natural-sage-light/30 border border-natural-sand rounded-lg py-2 pl-9 pr-4 text-xs focus:outline-none focus:border-natural-sage text-natural-text"
                      required
                    />
                    <Phone className="absolute left-3 top-2.5 w-4 h-4 text-natural-text-muted/60" />
                  </div>

                  {/* Delivery Address */}
                  <div className="relative">
                    <input
                      type="text"
                      placeholder={t("addressPlaceholder")}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full bg-natural-sage-light/30 border border-natural-sand rounded-lg py-2 pl-9 pr-4 text-xs focus:outline-none focus:border-natural-sage text-natural-text"
                      required
                    />
                    <MapPin className="absolute left-3 top-2.5 w-4 h-4 text-natural-text-muted/60" />
                  </div>

                  {/* Payment Method Tabs */}
                  <div className="space-y-1.5 pt-1">
                    <span className="text-3xs font-bold uppercase text-natural-text-muted tracking-wider block">{t("paymentMethodTitle")}</span>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("Cash on Delivery")}
                        className={`py-2 px-3 rounded-lg text-3xs font-bold border transition-colors cursor-pointer text-center ${
                          paymentMethod === "Cash on Delivery"
                            ? "bg-natural-sage text-white border-natural-sage"
                            : "bg-natural-sage-light/40 text-natural-text-muted border-natural-sand"
                        }`}
                      >
                        {t("cashOnDelivery")}
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("MBank Transfer")}
                        className={`py-2 px-3 rounded-lg text-3xs font-bold border transition-colors cursor-pointer text-center ${
                          paymentMethod === "MBank Transfer"
                            ? "bg-natural-sage text-white border-natural-sage"
                            : "bg-natural-sage-light/40 text-natural-text-muted border-natural-sand"
                        }`}
                      >
                        {t("mBankTransfer")}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    id="submit-order-btn"
                    disabled={isCheckingOut}
                    className="w-full bg-natural-sage hover:bg-natural-sage-hover text-white py-3.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors shadow-md mt-4 flex items-center justify-center gap-2 cursor-pointer text-center"
                  >
                    {isCheckingOut ? (
                      <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        {t("submitOrder")}
                      </>
                    )}
                  </button>
                </form>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
