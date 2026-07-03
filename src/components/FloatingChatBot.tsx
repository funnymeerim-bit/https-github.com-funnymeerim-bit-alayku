/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import { Message } from "../types";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, X, Send, BrainCircuit, Sparkles, RotateCcw, Instagram } from "lucide-react";

export default function FloatingChatBot() {
  const { t, language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasNewMessageBadge, setHasNewMessageBadge] = useState(true);

  const chatEndRef = useRef<HTMLDivElement>(null);

  const getGreeting = () => {
    if (language === "ky") {
      return "Амансызбы! Мен Алайкуу Жайлоо Мурас Кеңешчиси болом. Кымыз, Каймак же Курут боюнча сурооңуз барбы? Сизге жардам берүүгө кубанычтамын!";
    }
    if (language === "ru") {
      return "Амансызбы! Я ваш консультант по наследию Джайлоо Алайкуу. Задайте любой вопрос о кумысе, каймаке или куруте! Буду рад помочь!";
    }
    return "Aman syzby! I am your Alayku Jailoo Heritage Advisor. How can I help you discover our organic dairy history, health benefits, and recipes today?";
  };

  // Initialize and update welcome message based on language
  useEffect(() => {
    setMessages([
      {
        id: "floating-welcome",
        sender: "bot",
        text: getGreeting(),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  }, [language]);

  // Scroll to bottom
  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading, isOpen]);

  // Remove badge on open
  useEffect(() => {
    if (isOpen) {
      setHasNewMessageBadge(false);
    }
  }, [isOpen]);

  const getQuickPrompts = () => {
    if (language === "ky") {
      return [
        "Кымыздын пайдасы",
        "Курут жасалышы",
        "Каймак рецептери"
      ];
    }
    if (language === "ru") {
      return [
        "Польза кумыса",
        "Как делать курут",
        "Рецепты с каймаком"
      ];
    }
    return [
      "Kymyz benefits",
      "Kurut recipe",
      "Kaimak pairings"
    ];
  };

  const getQuickPromptFullText = (prompt: string) => {
    if (language === "ky") {
      if (prompt.includes("пайдасы")) return "Кымыздын ден соолукка кандай пайдасы бар?";
      if (prompt.includes("жасалышы")) return "Чын курут кантип жасалат?";
      return "Каймак менен камыр азыктарынын рецепти барбы?";
    }
    if (language === "ru") {
      if (prompt.includes("кумыса")) return "Каковы полезные свойства кумыса?";
      if (prompt.includes("курут")) return "Как готовится настоящий курут?";
      return "Рецепты и сочетания с каймаком.";
    }
    if (prompt.includes("benefits")) return "What are the health benefits of Kymyz?";
    if (prompt.includes("recipe")) return "How is authentic Kurut made?";
    return "Suggest a pairing recipe with Kaimak cream.";
  };

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
        ? "Бийик тоолордо байланыш үзүлдү. Кийинчерээк кайра аракет кылып көрүңүз!" 
        : language === "ru" 
          ? "Связь на высокогорных пастбищах прервалась. Пожалуйста, попробуйте позже!" 
          : "I am experiencing some issues on the high pasture waves. Please check your network or try again soon!";
      
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

  const clearChat = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMessages([
      {
        id: "floating-welcome",
        sender: "bot",
        text: getGreeting(),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const activeLabel = () => {
    if (language === "ky") return "Алайкуу ИИ";
    if (language === "ru") return "ИИ-Консультант";
    return "Jailoo AI";
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* FLOATING CHAT CARD */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.92 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="w-[calc(100vw-32px)] sm:w-96 h-[500px] bg-white rounded-2xl border border-natural-sand shadow-2xl overflow-hidden flex flex-col mb-4 origin-bottom-right"
          >
            {/* CARD HEADER */}
            <div className="bg-natural-sage px-4 py-3.5 flex items-center justify-between text-white shadow-xs">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                    <BrainCircuit className="w-5 h-5 text-natural-sand-light" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 border-2 border-natural-sage rounded-full animate-pulse" />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-bold leading-tight">
                    {language === "ky" ? "Жайлоо Кеңешчиси" : language === "ru" ? "Советник Джайлоо" : "Jailoo Advisor"}
                  </h4>
                  <p className="text-[10px] text-white/80 font-medium tracking-wide flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5 text-natural-sand-light animate-pulse" />
                    {language === "ky" ? "Жайлоодо • Түз байланыш" : language === "ru" ? "На джайлоо • Онлайн" : "On Pastures • Online"}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-1.5">
                <button
                  onClick={clearChat}
                  title={language === "ky" ? "Тазалоо" : language === "ru" ? "Очистить" : "Reset Chat"}
                  className="p-1.5 hover:bg-white/10 rounded-lg transition-colors focus:outline-none cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 hover:bg-white/10 rounded-lg transition-colors focus:outline-none cursor-pointer"
                >
                  <X className="w-4.5 h-4.5" />
                </button>
              </div>
            </div>

            {/* MESSAGES VIEW */}
            <div className="flex-grow p-4 overflow-y-auto space-y-4 bg-natural-bg/50 scrollbar-thin">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex gap-2.5 max-w-[85%] ${
                    m.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                  }`}
                >
                  <div
                    className={`p-3 rounded-2xl text-xs leading-relaxed shadow-xs ${
                      m.sender === "user"
                        ? "bg-natural-sage text-white rounded-tr-none"
                        : "bg-white text-natural-text border border-natural-sand/50 rounded-tl-none"
                    }`}
                  >
                    {m.text}
                    <span
                      className={`block text-[9px] mt-1.5 text-right font-mono ${
                        m.sender === "user" ? "text-white/60" : "text-natural-text-muted"
                      }`}
                    >
                      {m.timestamp}
                    </span>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-2.5 mr-auto max-w-[80%]">
                  <div className="bg-white text-natural-text border border-natural-sand/50 p-3 rounded-2xl rounded-tl-none shadow-xs text-xs flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-natural-sage rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 bg-natural-sage rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 bg-natural-sage rounded-full animate-bounce" />
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* QUICK SUGGESTIONS ROW */}
            <div className="px-4 pt-2 pb-1 bg-white border-t border-natural-sand/40 flex flex-wrap gap-1.5">
              {getQuickPrompts().map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(getQuickPromptFullText(p))}
                  disabled={isLoading}
                  className="bg-natural-sage-light/30 hover:bg-natural-sage-light/60 border border-natural-sand text-natural-sage text-[10px] font-semibold px-2.5 py-1 rounded-full transition-colors cursor-pointer disabled:opacity-50 text-center"
                >
                  {p}
                </button>
              ))}
            </div>

            {/* MESSAGE INPUT FORM */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(userInput);
              }}
              className="p-3 bg-white border-t border-natural-sand/60 flex gap-2 items-center"
            >
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder={t("chatPlaceholder")}
                className="flex-grow bg-natural-bg border border-natural-sand rounded-full py-2 px-4 text-xs focus:outline-none focus:border-natural-sage text-natural-text placeholder-natural-text-muted/60"
              />
              <button
                type="submit"
                disabled={!userInput.trim() || isLoading}
                className="w-8 h-8 shrink-0 bg-natural-sage hover:bg-natural-sage-hover text-white rounded-full flex items-center justify-center transition-colors disabled:opacity-40 cursor-pointer text-center"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* INSTAGRAM FLOATING BUTTON */}
      <div className="relative group flex items-center gap-2.5 mb-3">
        <span className="hidden md:inline-block bg-white text-[#E1306C] text-[10px] font-bold tracking-wider uppercase px-3 py-1.5 rounded-full border border-natural-sand shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
          @alaiku.company
        </span>
        <a
          href="https://www.instagram.com/alaiku.company"
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] hover:scale-110 flex items-center justify-center text-white shadow-xl transition-all duration-300 cursor-pointer"
          aria-label="Instagram alaiku.company"
        >
          <Instagram className="w-5.5 h-5.5" />
        </a>
      </div>

      {/* CHAT TOGGLE BUBBLE */}
      <div className="relative group flex items-center gap-2.5">
        {/* Subtle Label on hover or initial state */}
        <span className="hidden md:inline-block bg-white text-natural-sage text-[10px] font-bold tracking-wider uppercase px-3 py-1.5 rounded-full border border-natural-sand shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
          {activeLabel()}
        </span>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-14 h-14 rounded-full flex items-center justify-center text-white shadow-xl transition-all duration-300 cursor-pointer ${
            isOpen ? "bg-natural-clay rotate-90" : "bg-natural-sage hover:bg-natural-sage-hover hover:scale-105"
          }`}
          aria-label="Open AI Heritage Advisor"
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <div className="relative">
              <MessageSquare className="w-6 h-6" />
              {hasNewMessageBadge && (
                <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-natural-clay border-2 border-white rounded-full flex items-center justify-center animate-pulse" />
              )}
            </div>
          )}
        </button>
      </div>
    </div>
  );
}
