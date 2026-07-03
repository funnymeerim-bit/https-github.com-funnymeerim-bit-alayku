/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Compass, Users, Sprout, Waves, Trees } from "lucide-react";
import { motion } from "motion/react";
import { useLanguage } from "../context/LanguageContext";

export default function ImpactView() {
  const { t, language, getPastures } = useLanguage();
  const pastures = getPastures();
  const detail = pastures[0];

  return (
    <div className="px-6 md:px-16 max-w-7xl mx-auto py-8 space-y-16 min-h-screen">
      {/* HEADER ROW */}
      <div className="border-b border-natural-sand pb-8">
        <span className="text-xs font-bold text-natural-clay uppercase tracking-wider">
          {language === "ky" ? "Туруктуу Өнүктүрүү Миссиябыз" : language === "ru" ? "Наша устойчивая миссия" : "Our Sustainable Mission"}
        </span>
        <h1 className="font-serif text-3xl md:text-4xl text-natural-sage font-bold mt-1">
          {t("impactTitle")}
        </h1>
        <p className="text-natural-text-muted text-sm mt-2 max-w-2xl">
          {t("impactDesc")}
        </p>
      </div>

      {/* TOP GRID: KEY METRICS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-6 bg-natural-sage-light/30 rounded-2xl border border-natural-sand/60 space-y-3">
          <Compass className="w-10 h-10 text-natural-sage" />
          <h3 className="font-serif text-lg font-bold text-natural-sage">{t("altitudeTitle")}</h3>
          <p className="text-xs text-natural-text-muted leading-relaxed">
            {t("altitudeDesc")}
          </p>
        </div>

        <div className="p-6 bg-natural-sage-light/30 rounded-2xl border border-natural-sand/60 space-y-3">
          <Users className="w-10 h-10 text-natural-sage" />
          <h3 className="font-serif text-lg font-bold text-natural-sage">{t("herdersTitle")}</h3>
          <p className="text-xs text-natural-text-muted leading-relaxed">
            {t("herdersDesc")}
          </p>
        </div>

        <div className="p-6 bg-natural-sage-light/30 rounded-2xl border border-natural-sand/60 space-y-3">
          <Sprout className="w-10 h-10 text-natural-sage" />
          <h3 className="font-serif text-lg font-bold text-natural-sage">{t("botanyTitle")}</h3>
          <p className="text-xs text-natural-text-muted leading-relaxed">
            {t("botanyDesc")}
          </p>
        </div>
      </div>

      {/* DETAILED STORY BOARD */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left column: image cards */}
        <div className="lg:col-span-5 relative">
          <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl bg-natural-sand-light">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDPyPLQ4z7RAx-yeurVRN7cgVjRPaO4GgcTSlcfc9hsmVc16sAGQdGGZuJuOhqx2l2k643hgZpUAezum3xCyrGKspoQ-3b3_lbd-jW6lXJ_xg-xsLu7dnjmmRuux17Dzvm7E30cmdfSvrjNhZL0x7YexAlaXRYinBkVzA8PAbx_3drEs93f6NFNul9c-AdTu3INaje-UvJjWAC4F7SqC1ocFT3kHZRqJp8qAPx1z5_Yma4amV7OeLKUq5m-xcuNHw09ve-jrZ1nrtX5"
              alt="Pristine Alay jailoo green pastures"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -top-6 -right-6 bg-natural-sage text-white p-4 rounded-xl shadow-lg font-serif text-center shrink-0">
            <span className="block text-2xl font-bold">100%</span>
            <span className="text-3xs uppercase font-bold tracking-widest">
              {language === "ky" ? "Табигый Жайлоо" : language === "ru" ? "Чистое Жайлоо" : "Organic Pasture"}
            </span>
          </div>
        </div>

        {/* Right column: detailed description */}
        <div className="lg:col-span-7 space-y-6">
          <span className="text-xs font-bold text-natural-clay uppercase tracking-wider">
            {t("grazingCycles")}
          </span>
          <h2 className="font-serif text-2xl md:text-3xl text-natural-sage font-bold">{detail?.name}</h2>
          <p className="text-sm text-natural-text-muted leading-relaxed">
            {detail?.description}
          </p>
          
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-natural-text border-b border-natural-sand/60 pb-1">
              {t("botanyHeader")}
            </h4>
            <div className="flex flex-wrap gap-2 pt-1">
              {detail?.botany.map((plant, idx) => (
                <span
                  key={idx}
                  className="bg-natural-sage/10 text-natural-sage text-2xs font-semibold px-3.5 py-1.5 rounded-full"
                >
                  🌱 {plant}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-natural-text">
              {t("nomadicHeritage")}
            </h4>
            <p className="text-xs text-natural-text-muted leading-relaxed">
              {detail?.heritage}
            </p>
          </div>
        </div>
      </div>

      {/* FOOTER HIGHLIGHT BOARD */}
      <div className="bg-natural-sage-light/40 border border-natural-sand rounded-[2rem] p-8 md:p-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h3 className="font-serif text-xl md:text-2xl text-natural-sage font-bold">
              {t("glacialWaterTitle")}
            </h3>
            <p className="text-xs md:text-sm text-natural-text-muted leading-relaxed">
              {t("glacialWaterDesc")}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded-xl border border-natural-sand/60 text-center">
              <Waves className="w-8 h-8 text-natural-sage mx-auto mb-2" />
              <div className="text-xs font-bold text-natural-sage">{t("glacialSprings")}</div>
              <div className="text-3xs text-natural-text-muted mt-1">{t("glacialSpringsDesc")}</div>
            </div>
            <div className="p-4 bg-white rounded-xl border border-natural-sand/60 text-center">
              <Trees className="w-8 h-8 text-natural-sage mx-auto mb-2" />
              <div className="text-xs font-bold text-natural-sage">{t("untouchedSoil")}</div>
              <div className="text-3xs text-natural-text-muted mt-1">{t("untouchedSoilDesc")}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
