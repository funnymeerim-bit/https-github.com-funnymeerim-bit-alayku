/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Mail, Phone, MapPin, ArrowRight, Sparkles, Instagram } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export default function Footer({ setActiveTab }: FooterProps) {
  const [email, setEmail] = React.useState("");
  const [subscribed, setSubscribed] = React.useState(false);
  const { t, language } = useLanguage();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="w-full pt-16 pb-8 border-t border-natural-sand bg-natural-sand-light/40 mt-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-6 md:px-16 max-w-7xl mx-auto">
        <div className="space-y-4">
          <a 
            href="#" 
            className="font-serif text-2xl text-natural-sage font-bold tracking-tight block"
            onClick={(e) => { e.preventDefault(); setActiveTab("heritage"); }}
          >
            Алайкуу Organics
          </a>
          <p className="text-natural-text-muted text-sm leading-relaxed">
            {t("footerDesc")}
          </p>
          <div className="flex flex-col gap-2.5 pt-2">
            <div className="flex items-center gap-4">
              <a href="mailto:info@alaykuorganics.kg" className="text-natural-sage hover:scale-110 transition-transform flex items-center gap-1.5" title="Email Us">
                <Mail className="w-5 h-5" />
              </a>
              <a 
                href="https://www.instagram.com/alaiku.company" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-natural-sage hover:scale-115 transition-transform flex items-center gap-1.5 text-xs font-semibold"
                title="Instagram: alaiku.company"
              >
                <Instagram className="w-5 h-5" />
                <span className="text-natural-text-muted hover:text-natural-sage transition-colors">@alaiku.company</span>
              </a>
            </div>
            <span className="text-natural-text-muted text-sm flex items-center gap-1.5">
              <Phone className="w-4 h-4 text-natural-sage" /> +996 (312) 45-88-99
            </span>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-natural-text-muted mb-4">
            {language === "ky" ? "Тез шилтемелер" : language === "ru" ? "Быстрые ссылки" : "Quick Links"}
          </h4>
          <ul className="space-y-3 text-sm">
            <li>
              <button onClick={() => setActiveTab("heritage")} className="text-natural-text-muted hover:text-natural-sage transition-colors text-left cursor-pointer">
                {t("navHeritage")}
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab("products")} className="text-natural-text-muted hover:text-natural-sage transition-colors text-left cursor-pointer">
                {t("navProducts")}
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab("methods")} className="text-natural-text-muted hover:text-natural-sage transition-colors text-left cursor-pointer">
                {t("navMethods")}
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab("advisor")} className="text-natural-text-muted hover:text-natural-sage transition-colors text-left cursor-pointer">
                {t("navAdvisor")}
              </button>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-natural-text-muted mb-4">
            {language === "ky" ? "Байланышуу" : language === "ru" ? "Контакты" : "Contact Info"}
          </h4>
          <ul className="space-y-3 text-sm text-natural-text-muted">
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-natural-sage mt-0.5 shrink-0" />
              <span>
                32 Erkindik Boulevard,<br />
                Bishkek, Kyrgyz Republic
              </span>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-natural-sage mt-0.5 shrink-0" />
              <span>
                Алайкуу Valley Pastures,<br />
                Osh Region, Kyrgyzstan
              </span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-natural-text-muted mb-4">
            {language === "ky" ? "Жазылуу" : language === "ru" ? "Будьте в курсе" : "Stay Inspired"}
          </h4>
          <p className="text-xs text-natural-text-muted mb-4">
            {language === "ky" ? "Жайлоодогу акыркы жаңылыктарды алуу үчүн катталыңыз." : language === "ru" ? "Присоединяйтесь к сообществу, чтобы получать свежие новости с пастбищ." : "Join our community for fresh stories from the mountain pasture."}
          </p>
          
          {subscribed ? (
            <div className="bg-natural-sage/10 text-natural-sage p-3 rounded-lg text-xs font-medium flex items-center gap-2 animate-fade-in">
              <Sparkles className="w-4 h-4 shrink-0" />
              <span>{language === "ky" ? "Кош келиңиз! Катталганыңыз үчүн рахмат!" : language === "ru" ? "Кош келиңиз! Спасибо за подписку!" : "Kosh Keliniz! Thank you for subscribing!"}</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex border-b border-natural-sand py-2">
              <input 
                type="email" 
                placeholder={language === "ky" ? "Электрондук почта" : language === "ru" ? "Эл. почта" : "Email address"} 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-transparent border-none focus:outline-none text-sm w-full placeholder-natural-text-muted/60 text-natural-text pr-2 focus:ring-0"
                required
              />
              <button type="submit" className="text-natural-sage hover:translate-x-1 transition-transform focus:outline-none cursor-pointer">
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="px-6 md:px-16 max-w-7xl mx-auto mt-12 pt-8 border-t border-natural-sand/50 text-center">
        <p className="text-xs text-natural-text-muted/80">
          {t("footerCopyright")}
        </p>
      </div>
    </footer>
  );
}
