/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Sparkles, Trophy, BookOpen, RotateCcw, Flame } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../context/LanguageContext";

export default function MethodsView() {
  const { t, language, getMethods } = useLanguage();
  const [activeMethodIdx, setActiveMethodIdx] = useState<number>(0);
  const [activeStepIdx, setActiveStepIdx] = useState<number>(0);

  // Churning simulation game state
  const [churnCount, setChurnCount] = useState<number>(0);
  const [churnPower, setChurnPower] = useState<number>(0);
  const [didCompleteChurn, setDidCompleteChurn] = useState<boolean>(false);

  const traditionalMethods = getMethods();
  const activeMethod = traditionalMethods[activeMethodIdx];

  const handleChurnClick = () => {
    if (didCompleteChurn) return;
    const nextCount = churnCount + 1;
    setChurnCount(nextCount);
    setChurnPower(Math.min(100, churnPower + 12));

    if (nextCount >= 20) {
      setDidCompleteChurn(true);
    }
  };

  // Slowly drain churning power over time
  React.useEffect(() => {
    const interval = setInterval(() => {
      setChurnPower((p) => Math.max(0, p - 3));
    }, 200);
    return () => clearInterval(interval);
  }, []);

  const resetChurnGame = () => {
    setChurnCount(0);
    setChurnPower(0);
    setDidCompleteChurn(false);
  };

  return (
    <div className="px-6 md:px-16 max-w-7xl mx-auto py-8 space-y-12 min-h-screen">
      {/* HEADER SECTION */}
      <div className="border-b border-natural-sand pb-8">
        <span className="text-xs font-bold text-natural-clay uppercase tracking-wider">
          {language === "ky" ? "Байыркы Көчмөн Ыкмалары" : language === "ru" ? "Древние методы кочевников" : "Ancient Heritage Methods"}
        </span>
        <h1 className="font-serif text-3xl md:text-4xl text-natural-sage font-bold mt-1">
          {t("methodsTitle")}
        </h1>
        <p className="text-natural-text-muted text-sm mt-2 max-w-2xl">
          {t("methodsSubtitle")}
        </p>
      </div>

      {/* INTERACTIVE CONTROLS */}
      <div className="flex gap-4 border-b border-natural-sand pb-4 overflow-x-auto">
        {traditionalMethods.map((method, idx) => (
          <button
            key={method.id}
            id={`method-tab-${method.id}`}
            onClick={() => {
               setActiveMethodIdx(idx);
               setActiveStepIdx(0);
            }}
            className={`px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shrink-0 ${
              activeMethodIdx === idx
                ? "bg-natural-sage text-white shadow-md"
                : "bg-natural-sage-light/30 text-natural-text-muted hover:bg-natural-sage-light"
            }`}
          >
            {method.title}
          </button>
        ))}
      </div>

      {/* METHOD DETAILS EXPLORER */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Image & steps details */}
        <div className="lg:col-span-5 space-y-6">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl bg-natural-sand-light">
            <img
              src={activeMethod.image}
              alt={activeMethod.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-6">
              <div>
                <span className="text-2xs text-white font-bold uppercase tracking-widest bg-natural-sage px-2.5 py-1 rounded-full">
                  {activeMethod.subtitle}
                </span>
                <h3 className="font-serif text-xl text-white font-bold mt-2">
                  {activeMethod.steps[activeStepIdx]?.title}
                </h3>
              </div>
            </div>
          </div>

          <div className="bg-natural-sage-light/40 border border-natural-sand rounded-2xl p-6">
            <h4 className="text-xs font-bold text-natural-clay uppercase tracking-wider mb-2">
              {t("stepDetail")}
            </h4>
            <p className="text-sm text-natural-text-muted leading-relaxed">
              {activeMethod.steps[activeStepIdx]?.desc}
            </p>
          </div>
        </div>

        {/* Right Column: Steps Timeline */}
        <div className="lg:col-span-7 space-y-6">
          <h3 className="font-serif text-2xl text-natural-sage font-bold">
            {t("prepSequence")}
          </h3>
          <div className="relative border-l-2 border-natural-sage/20 ml-4 space-y-8 py-2">
            {activeMethod.steps.map((step, idx) => {
              const isActive = activeStepIdx === idx;
              return (
                <div
                  key={idx}
                  id={`method-step-${idx}`}
                  onClick={() => setActiveStepIdx(idx)}
                  className={`relative pl-8 cursor-pointer transition-all ${
                    isActive ? "translate-x-1" : "hover:translate-x-0.5"
                  }`}
                >
                  {/* Step Indicator Dot */}
                  <span
                    className={`absolute left-[-9px] top-1 w-4 h-4 rounded-full border-2 transition-all ${
                      isActive
                        ? "bg-natural-sage border-natural-sage scale-125"
                        : "bg-natural-bg border-natural-sage/40"
                    }`}
                  />
                  <h4
                    className={`text-sm font-bold uppercase tracking-wider transition-colors ${
                      isActive ? "text-natural-sage font-extrabold" : "text-natural-text-muted"
                    }`}
                  >
                    {language === "ky" ? "Баскыч" : language === "ru" ? "Этап" : "Stage"} {idx + 1}: {step.title}
                  </h4>
                  <p className="text-xs text-natural-text-muted mt-1 line-clamp-2">
                    {step.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* CHURNING INTERACTIVE MINIGAME */}
          {activeMethodIdx === 0 && (
            <div className="bg-natural-sage-light/30 rounded-2xl border border-natural-sand/60 p-6 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-xs font-bold text-natural-sage uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" />
                    {t("churnGameTitle")}
                  </h4>
                  <p className="text-xs text-natural-text-muted mt-1">
                    {t("churnGameDesc")}
                  </p>
                </div>
                {churnCount > 0 && (
                  <button
                    onClick={resetChurnGame}
                    className="text-natural-text-muted hover:text-natural-sage transition-colors p-1 cursor-pointer"
                    aria-label="Reset simulation"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Progress bars */}
              <div className="space-y-2">
                <div className="flex justify-between text-2xs font-bold text-natural-text-muted">
                  <span>{t("churnCount")}: {churnCount}/20</span>
                  <span>{t("aeration")}</span>
                </div>
                <div className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-6 bg-black/10 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-natural-sage h-full transition-all duration-300"
                      style={{ width: `${(churnCount / 20) * 100}%` }}
                    />
                  </div>
                  <div className="col-span-6 bg-black/10 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-natural-clay h-full transition-all duration-200"
                      style={{ width: `${churnPower}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                {didCompleteChurn ? (
                  <div className="bg-natural-sage/10 text-natural-sage border border-natural-sage/20 rounded-xl p-4 flex items-center gap-3 w-full animate-fade-in">
                    <Trophy className="w-8 h-8 shrink-0 text-natural-clay" />
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider">{t("gameCompleteTitle")}</div>
                      <div className="text-2xs opacity-80">{t("gameCompleteDesc")}</div>
                    </div>
                  </div>
                ) : (
                  <button
                    id="churn-plunger-btn"
                    onClick={handleChurnClick}
                    className="flex-grow bg-natural-sage hover:bg-natural-sage-hover text-white font-bold text-xs uppercase tracking-wider py-3.5 px-6 rounded-xl transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 cursor-pointer text-center"
                  >
                    <BookOpen className="w-4.5 h-4.5 rotate-90" />
                    {t("thrustBtn")}
                  </button>
                )}
              </div>
            </div>
          )}

          {/* KAIMAK HEATING INTERACTIVE */}
          {activeMethodIdx === 1 && (
            <div className="bg-natural-sage-light/30 rounded-2xl border border-natural-sand/60 p-6 space-y-4">
              <div>
                <h4 className="text-xs font-bold text-natural-sage uppercase tracking-wider flex items-center gap-1.5">
                  <Flame className="w-4 h-4" />
                  {t("kazanGameTitle")}
                </h4>
                <p className="text-xs text-natural-text-muted mt-1">
                  {t("kazanGameDesc")}
                </p>
              </div>

              <div className="flex flex-col items-center p-4 bg-white rounded-xl border border-natural-sand/60 space-y-3">
                <span className="text-3xs font-bold uppercase tracking-wider text-natural-text-muted">
                  {t("kazanTemp")}
                </span>
                
                {/* Dial indicator bar */}
                <div className="w-full relative h-6 bg-gradient-to-r from-blue-400 via-green-500 to-red-500 rounded-full overflow-hidden">
                  <div className="absolute top-0 bottom-0 w-1.5 bg-black border border-white" style={{ left: '46%' }} />
                </div>
                
                <span className="text-2xs font-bold text-natural-sage bg-natural-sage/10 px-3 py-1 rounded-full text-center">
                  {t("kazanPerfect")}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
