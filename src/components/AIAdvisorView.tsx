/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from "react";
import { Message } from "../types";
import { Send, Sparkles, HelpCircle, User, BrainCircuit, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../context/LanguageContext";

export default function AIAdvisorView() {
  const { t, language } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "bot",
      text: t("aiWelcome"),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Sync welcome message on language switch
  useEffect(() => {
    setMessages((prev) =>
      prev.map((m) =>
        m.id === "welcome" ? { ...m, text: t("aiWelcome") } : m
      )
    );
  }, [language, t]);

  const getQuickPrompts = () => {
    if (language === "ky") {
      return [
        "Кымыздын ден соолукка кандай пайдасы бар?",
        "Чын курут кантип жасалат?",
        "Каймак менен камыр азыктарынын рецепти барбы?",
        "Алайдын жайлоолору эмнеси менен өзгөчө?"
      ];
    }
    if (language === "ru") {
      return [
        "Каковы полезные свойства кумыса?",
        "Как готовится настоящий курут?",
        "Рецепты и сочетания с каймаком.",
        "Почему пастбища Алайкуу такие особенные?"
      ];
    }
    return [
      "What are the health benefits of Kymyz?",
      "How is authentic Kurut made?",
      "Suggest a pairing recipe with Kaimak cream.",
      "Why are Alay pastures so special?"
    ];
  };

  const quickPrompts = getQuickPrompts();

  // Auto scroll to chat bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setUserInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/gemini/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          messages: [...messages, userMsg],
          language: language
        })
      });

      if (!response.ok) {
        throw new Error("Failed to contact the heritage advisor.");
      }

      const data = await response.json();
      
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: data.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err: any) {
      console.error(err);
      const errText = language === "ky" 
        ? "Бийик тоолордо байланыш үзүлдү. Кийинчерээк кайра аракет кылып көрүңүз! Сураныч, GEMINI_API_KEY ачкычы туура коюлганын текшериңиз." 
        : language === "ru" 
          ? "Связь на высокогорных пастбищах прервалась. Пожалуйста, попробуйте позже! Убедитесь, что ваш ключ GEMINI_API_KEY настроен в панели Secrets." 
          : "I am experiencing some issues on the high pasture waves. Please check your network or try again soon! Remember, you can set your GEMINI_API_KEY in the AI Studio Secrets panel.";
      
      const botErrorMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: errText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, botErrorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: "welcome",
        sender: "bot",
        text: t("aiWelcome"),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <div className="px-6 md:px-16 max-w-7xl mx-auto py-8 space-y-12 min-h-[80vh] flex flex-col">
      {/* HEADER ROW */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-natural-sand pb-8">
        <div>
          <span className="text-xs font-bold text-natural-clay uppercase tracking-wider">
            {language === "ky" ? "ИИ-Мурас Кеңешчиси" : language === "ru" ? "ИИ-Советник Наследия" : "Heritage AI Assistant"}
          </span>
          <h1 className="font-serif text-3xl md:text-4xl text-natural-sage font-bold mt-1">
            {t("advisorTitle")}
          </h1>
          <p className="text-natural-text-muted text-sm mt-2 max-w-2xl">
            {t("advisorDesc")}
          </p>
        </div>

        <button
          onClick={clearChat}
          className="self-start md:self-auto flex items-center gap-1.5 border border-natural-sand hover:bg-black/5 text-natural-text-muted text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-lg transition-colors focus:outline-none cursor-pointer text-center"
        >
          <RotateCcw className="w-4 h-4" />
          {t("resetChat")}
        </button>
      </div>

      {/* CHAT AREA */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-grow">
        {/* Left Column: Chat Container */}
        <div className="lg:col-span-8 flex flex-col h-[550px] bg-white border border-natural-sand/60 rounded-2xl overflow-hidden shadow-sm relative">
          
          {/* Subtle Key Notice Info bar */}
          <div className="bg-natural-sage-light/40 px-4 py-2 border-b border-natural-sand/60 text-3xs md:text-2xs font-medium text-natural-sage flex items-center gap-2">
            <BrainCircuit className="w-4 h-4 shrink-0" />
            <span>{t("operationalNotice")}</span>
          </div>

          {/* Messages view */}
          <div className="flex-grow overflow-y-auto p-6 space-y-4">
            <AnimatePresence initial={false}>
              {messages.map((m) => {
                const isBot = m.sender === "bot";
                return (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={`flex ${isBot ? "justify-start" : "justify-end"}`}
                  >
                    <div className={`flex gap-3 max-w-[85%] md:max-w-[70%] ${isBot ? "" : "flex-row-reverse"}`}>
                      {/* Avatar */}
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border ${
                        isBot 
                          ? "bg-natural-sage/15 border-natural-sage/15 text-natural-sage" 
                          : "bg-natural-sand-light border border-natural-sand text-natural-text-muted"
                      }`}>
                        {isBot ? <BrainCircuit className="w-4.5 h-4.5" /> : <User className="w-4.5 h-4.5" />}
                      </div>

                      {/* Bubble */}
                      <div className={`p-4 rounded-2xl space-y-1 ${
                        isBot 
                          ? "bg-natural-sage-light/30 border border-natural-sand/60 text-natural-text" 
                          : "bg-natural-sage text-white font-medium"
                      }`}>
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">{m.text}</p>
                        <span className={`block text-3xs text-right opacity-60 ${
                          isBot ? "text-natural-text-muted" : "text-white"
                        }`}>{m.timestamp}</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {isLoading && (
              <div className="flex justify-start">
                <div className="flex gap-3 max-w-[70%]">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center bg-natural-sage/15 text-natural-sage border border-natural-sage/15 shrink-0">
                    <BrainCircuit className="w-4.5 h-4.5" />
                  </div>
                  <div className="bg-natural-sage-light/30 border border-natural-sand/60 p-4 rounded-2xl flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-natural-sage animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 rounded-full bg-natural-sage animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 rounded-full bg-natural-sage animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Chat entry form */}
          <form
            onSubmit={(e) => { e.preventDefault(); handleSendMessage(userInput); }}
            className="p-4 border-t border-natural-sand/60 bg-natural-bg flex gap-2"
          >
            <input
              type="text"
              id="ai-user-query-input"
              placeholder={t("chatPlaceholder")}
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="flex-grow bg-white border border-natural-sand rounded-full py-2.5 px-5 text-sm focus:outline-none focus:border-natural-sage text-natural-text placeholder-natural-text-muted/60 focus:ring-0"
              disabled={isLoading}
            />
            <button
              type="submit"
              id="ai-send-btn"
              disabled={!userInput.trim() || isLoading}
              className="bg-natural-sage hover:bg-natural-sage-hover disabled:opacity-40 text-white p-3 rounded-full transition-colors focus:outline-none flex items-center justify-center shrink-0 shadow-sm cursor-pointer"
              aria-label="Send message"
            >
              <Send className="w-4.5 h-4.5" />
            </button>
          </form>
        </div>

        {/* Right Column: Cultural Helpers & Starter Queries */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white border border-natural-sand/60 rounded-2xl p-6 space-y-4 shadow-sm">
            <h3 className="font-serif text-lg text-natural-sage font-bold flex items-center gap-1.5">
              <HelpCircle className="w-5 h-5 text-natural-clay" />
              {t("quickStarterTitle")}
            </h3>
            <p className="text-xs text-natural-text-muted leading-relaxed">
              {t("quickStarterDesc")}
            </p>

            <div className="space-y-2 pt-2">
              {quickPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  id={`ai-quick-prompt-${idx}`}
                  onClick={() => handleSendMessage(prompt)}
                  className="w-full text-left text-xs bg-natural-sage-light/30 hover:bg-natural-sage/10 hover:text-natural-sage text-natural-text p-3 rounded-xl border border-natural-sand/60 transition-colors font-medium focus:outline-none cursor-pointer"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-natural-sage-light/40 border border-natural-sand rounded-2xl p-6 space-y-4">
            <h3 className="font-serif text-base text-natural-sage font-bold flex items-center gap-1.5">
              <Sparkles className="w-5 h-5" />
              {t("pastureWellnessTitle")}
            </h3>
            <div className="space-y-3 text-xs text-natural-text-muted leading-relaxed">
              <div>
                <span className="font-bold text-natural-clay block">
                  {t("probioticBalanceTitle")}
                </span>
                <p className="mt-0.5">
                  {t("probioticBalanceDesc")}
                </p>
              </div>
              <div>
                <span className="font-bold text-natural-clay block">
                  {t("tradPairingTitle")}
                </span>
                <p className="mt-0.5">
                  {t("tradPairingDesc")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
