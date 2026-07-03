/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { Sparkles, Star, Heart, Flame, ShieldCheck, PhoneCall, Instagram } from "lucide-react";

export default function RunningTicker() {
  const { language, t } = useLanguage();

  // Bullet items for different languages to display in the marquee
  const getTickerItems = () => {
    if (language === "ky") {
      return [
        { text: "Алайкуу Organics — 100% Таза Табигый Органикалык Сүт Азыктары!", icon: Sparkles, color: "text-amber-300" },
        { text: "Бишкек жана Ош шаарларында 1500 сомдон жогору заказ кылганда курьердик жеткирүү акысыз!", icon: ShieldCheck, color: "text-emerald-300" },
        { text: "Биздин Instagram баракчабызга катталыңыз: @alaiku.company", icon: Instagram, color: "text-pink-300" },
        { text: "Ышталган тери Сабада ачытылган нукура бээнин Кымызы!", icon: Flame, color: "text-amber-400" },
        { text: "Дарылык касиети бар курут жана 50% майлуулуктагы коюу каймак!", icon: Heart, color: "text-red-300" },
        { text: "ИИ-Кеңешчибизден суроолоруңузду оң жактагы чат аркылуу сураңыз!", icon: Star, color: "text-sky-300" },
      ];
    }
    if (language === "ru") {
      return [
        { text: "Алайкуу Organics — 100% Чистая Натуральная Молочная Продукция!", icon: Sparkles, color: "text-amber-300" },
        { text: "Бесплатная курьерская доставка в Бишкек и Ош при заказе от 1500 сомов!", icon: ShieldCheck, color: "text-emerald-300" },
        { text: "Подписывайтесь на наш Instagram: @alaiku.company !", icon: Instagram, color: "text-pink-300" },
        { text: "Настоящий кобылий кумыс, созревший в дымных кожаных сосудах Саба!", icon: Flame, color: "text-amber-400" },
        { text: "Целебный традиционный курут и густые сливки каймак 50% жирности!", icon: Heart, color: "text-red-300" },
        { text: "Задайте вопрос нашему умному ИИ-консультанту в чате справа!", icon: Star, color: "text-sky-300" },
      ];
    }
    return [
      { text: "Alayku Organics — 100% Pure, Organic High-Altitude Dairy Mastery!", icon: Sparkles, color: "text-amber-300" },
      { text: "Free Courier Delivery in Bishkek & Osh for orders over 1,500 KGS!", icon: ShieldCheck, color: "text-emerald-300" },
      { text: "Join our community on Instagram: @alaiku.company !", icon: Instagram, color: "text-pink-300" },
      { text: "Authentic wood-smoked Kymyz fermented in leather Saba vessels!", icon: Flame, color: "text-amber-400" },
      { text: "Therapeutic Kurut pearls & rich 50% clotted Kaimak cream!", icon: Heart, color: "text-red-300" },
      { text: "Consult our real-time Jailoo AI Heritage Advisor on the bottom right!", icon: Star, color: "text-sky-300" },
    ];
  };

  const items = getTickerItems();

  // Combine items to repeat so the ticker can loop seamlessly without jump cuts
  const doubleItems = [...items, ...items, ...items];

  return (
    <div className="w-full bg-natural-clay text-white py-2 px-4 border-b border-white/10 overflow-hidden relative select-none">
      <div className="flex w-max whitespace-nowrap animate-marquee">
        {doubleItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="inline-flex items-center gap-2 px-8 text-xs md:text-sm font-bold uppercase tracking-widest text-white/95 transition-opacity"
            >
              <Icon className={`w-4 h-4 shrink-0 ${item.color}`} />
              <span>{item.text}</span>
            </div>
          );
        })}
      </div>
      
      {/* Decorative gradient shadows on the sides to enhance depth */}
      <div className="absolute top-0 left-0 w-8 h-full bg-gradient-to-r from-natural-clay to-transparent pointer-events-none" />
      <div className="absolute top-0 right-0 w-8 h-full bg-gradient-to-l from-natural-clay to-transparent pointer-events-none" />
    </div>
  );
}
