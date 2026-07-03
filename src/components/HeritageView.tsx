/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Leaf, Award, Compass, Sparkles, CheckCircle2, ShieldCheck, FileText, Printer, X, ExternalLink } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

interface HeritageViewProps {
  setActiveTab: (tab: string) => void;
  onSelectProduct: (productId: string) => void;
}

export default function HeritageView({ setActiveTab, onSelectProduct }: HeritageViewProps) {
  const { t, language } = useLanguage();
  const [selectedCert, setSelectedCert] = useState<any | null>(null);
  const [printFeedback, setPrintFeedback] = useState<string | null>(null);

  const certificatesData = [
    {
      id: "haccp",
      title: language === "ky" ? "HACCP & ISO 22000:2018" : language === "ru" ? "HACCP и ISO 22000:2018" : "HACCP & ISO 22000:2018",
      subtitle: language === "ky" ? "Эл аралык Коопсуздук Тандоосу" : language === "ru" ? "Международный стандарт безопасности" : "International Food Safety Standard",
      description: language === "ky" 
        ? "Сүттү биринчи чогултуудан тартып даяр азыкты таңгактоого чейинки бардык өндүрүш этаптарынын санитардык-гигиеналык коопсуздугун кепилдейт."
        : language === "ru" 
          ? "Критический аудит гарантирует абсолютную санитарную безопасность от сбора сырья на пастбищах до герметичной упаковки продукции."
          : "Certifies premium hygienic control and rigorous safety hazard prevention from pastoral milking through fully automated sealing lines.",
      certNo: "KG.HACCP.2024.089",
      issuer: language === "ky" ? "Кыргыз Республикасынын Стандартташтыруу жана Метрология Борбору" : language === "ru" ? "Центр стандартизации и метрологии КР" : "Center for Standardization and Metrology of the Kyrgyz Republic",
      issueDate: "12.04.2024",
      expiryDate: "11.04.2027",
      scope: language === "ky" ? "Сүт жана кымыз азыктарын кайра иштетүү жана таңгактоо" : language === "ru" ? "Переработка и упаковка цельномолочной и кисломолочной продукции" : "Processing and packaging of natural whole milk and traditional wellness dairy products",
      status: language === "ky" ? "АКТИВДҮҮ" : language === "ru" ? "ДЕЙСТВИТЕЛЕН" : "ACTIVE"
    },
    {
      id: "halal",
      title: language === "ky" ? "Халал Сапат Сертификаты" : language === "ru" ? "Халяль Сертификат Качества" : "Halal Quality Certification",
      subtitle: language === "ky" ? "Салттуу тазалык жана адалдык" : language === "ru" ? "Стандарты чистоты и экологичности" : "Nomadic Purity & Organic Fit",
      description: language === "ky"
        ? "Биздин өндүрүштүн толугу менен табигый, уулуу заттарсыз жана адал салттарга ылайык таза шарттарда даярдалышын ырастайт."
        : language === "ru"
          ? "Подтверждает соответствие стандартам Халяль, чистоту процессов, отсутствие вредных консервантов и химических примесей."
          : "Certifies strict adherence to Halal food standards, confirming additive-free raw milk processing and organic manufacturing methods.",
      certNo: "KG.HL.2024.1102",
      issuer: language === "ky" ? "Кыргызстан Мусулмандарынын Дин Башкармалыгынын Халал Бөлүмү" : language === "ru" ? "Отдел Халяль Духовного управления мусульман Кыргызстана" : "Halal Committee of the Spiritual Administration of Muslims of Kyrgyzstan",
      issueDate: "18.01.2024",
      expiryDate: "17.01.2027",
      scope: language === "ky" ? "Бардык сүт, май жана улуттук суусундуктардын түрлөрү" : language === "ru" ? "Широкий спектр молочных изделий, включая каймак, курут и национальные напитки" : "All liquid and solid dairy lines including Kaimak cream, Kurut pearls, and traditional drinks",
      status: language === "ky" ? "АКТИВДҮҮ" : language === "ru" ? "ДЕЙСТВИТЕЛЕН" : "ACTIVE"
    },
    {
      id: "bio-kg",
      title: language === "ky" ? "Органикалык Паспорт (Bio-KG)" : language === "ru" ? "Органик-Паспорт (Bio-KG)" : "Bio-KG Eco-Organic Passport",
      subtitle: language === "ky" ? "100% Экологиялык Таза Жайлоо" : language === "ru" ? "100% Экологическая чистота пастбищ" : "100% Pure Alpine Pasture Feed",
      description: language === "ky"
        ? "Алайкуунун бийик тоолуу өрөөндөрүндө (2500м+ бийиктикте) эч кандай пестицидсиз өскөн дикий дары чөптөр менен багылган малдын сүтүн тастыктайт."
        : language === "ru"
          ? "Подтверждает сбор сырья в высокогорной Алайской зоне (2500м+), где скот питается исключительно дикорастущими лекарственными травами."
          : "Documents that raw materials are harvested exclusively from high-altitude zones (above 2,500m) with chemical-free wild mountain pasture grass feed.",
      certNo: "KG.BIO.2025.441",
      issuer: language === "ky" ? "«Bio-KG» Органикалык Айыл Чарба Федерациясы" : language === "ru" ? "Федерация органического движения «Bio-KG»" : "Federation of Organic Agriculture Movement 'Bio-KG'",
      issueDate: "05.05.2025",
      expiryDate: "04.05.2028",
      scope: language === "ky" ? "Кымыз, курут, каймак жана сары май" : language === "ru" ? "Натуральный кумыс, традиционный курут, каймак и топленое масло сары май" : "Kymyz drinks, Kurut pearls, clotted Kaimak, and Sary-Mai ghee butter",
      status: language === "ky" ? "АКТИВДҮҮ" : language === "ru" ? "ДЕЙСТВИТЕЛЕН" : "ACTIVE"
    },
    {
      id: "eac",
      title: language === "ky" ? "ЕАЭБ EAC Шайкештик Декларациясы" : language === "ru" ? "Декларация ЕАЭС (EAC)" : "Eurasian Union EAC Compliance",
      subtitle: language === "ky" ? "Бажы Биримдигинин Сапат Белгиси" : language === "ru" ? "Декларация Соответствия Таможенного Союза" : "Eurasian Economic Union Safety Mark",
      description: language === "ky"
        ? "Биздин өнүмдөрдүн коопсуздугу Бажы биримдигинин техникалык регламенттерине (ТР ТС) толугу менен шайкеш экенин ырастайт."
        : language === "ru"
          ? "Официальное государственное подтверждение полного соответствия жестким техническим регламентам Таможенного Союза."
          : "Official state verification demonstrating complete safety conformity with complex Eurasian customs regulations, granting export rights.",
      certNo: "RU.KG-EAC.A-55912",
      issuer: language === "ky" ? "Кыргыз Республикасынын Сыноо жана Сертификациялоо Мамлекеттик Борбору" : language === "ru" ? "Государственный центр испытаний и сертификации при Министерстве экономики КР" : "State Center for Testing and Certification of the Kyrgyz Republic",
      issueDate: "10.02.2024",
      expiryDate: "09.02.2029",
      scope: language === "ky" ? "Сүт азыктарынын жана улуттук алкоголсуз суусундуктардын экспорту" : language === "ru" ? "Экспорт молочной продукции и национальных оздоровительных напитков" : "Export-grade dairy foods and soft traditional nomadic wellness beverages",
      status: language === "ky" ? "АКТИВДҮҮ" : language === "ru" ? "ДЕЙСТВИТЕЛЕН" : "ACTIVE"
    }
  ];

  const triggerPrintSimulation = (certTitle: string) => {
    setPrintFeedback(language === "ky" ? "Сертификат басып чыгарууга даярдалды!" : language === "ru" ? "Сертификат подготовлен к печати!" : "Certificate prepared for high-quality printing!");
    setTimeout(() => {
      setPrintFeedback(null);
    }, 3500);
  };

  return (
    <div className="space-y-20 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[650px] lg:h-[800px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            className="w-full h-full object-cover" 
            alt="Kyrgyz highland alpine pastures with grazing cattle and white felt yurts under golden light"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDPyPLQ4z7RAx-yeurVRN7cgVjRPaO4GgcTSlcfc9hsmVc16sAGQdGGZuJuOhqx2l2k643hgZpUAezum3xCyrGKspoQ-3b3_lbd-jW6lXJ_xg-xsLu7dnjmmRuux17Dzvm7E30cmdfSvrjNhZL0x7YexAlaXRYinBkVzA8PAbx_3drEs93f6NFNul9c-AdTu3INaje-UvJjWAC4F7SqC1ocFT3kHZRqJp8qAPx1z5_Yma4amV7OeLKUq5m-xcuNHw09ve-jrZ1nrtX5"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-natural-bg/95 via-natural-bg/50 to-transparent"></div>
        </div>

        <div className="relative z-10 px-6 md:px-16 max-w-7xl mx-auto w-full">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <span className="inline-block px-4 py-1.5 bg-natural-sage/15 text-natural-sage rounded-full text-xs font-bold uppercase tracking-wider mb-6">
              Since 2014
            </span>
            <h1 className="font-serif text-4xl md:text-6xl text-natural-sage mb-6 leading-tight font-bold">
              {language === "ky" ? "Тамырыбыз Салтта," : language === "ru" ? "Уходя корнями в традиции," : "Rooted in Tradition,"}<br />
              {t("heroSubtitle")}
            </h1>
            <p className="text-natural-text-muted text-base md:text-lg mb-8 max-w-lg leading-relaxed">
              {t("heroText")}
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                id="hero-explore-btn"
                onClick={() => setActiveTab("methods")}
                className="bg-natural-sage text-white px-8 py-3.5 rounded-lg text-sm font-semibold hover:bg-natural-sage-hover hover:shadow-lg transition-all active:scale-95 cursor-pointer"
              >
                {t("exploreHeritageBtn")}
              </button>
              <button 
                id="hero-shop-btn"
                onClick={() => setActiveTab("products")}
                className="bg-white/80 backdrop-blur-md text-natural-sage border border-natural-sand px-8 py-3.5 rounded-lg text-sm font-semibold hover:bg-white transition-all active:scale-95 cursor-pointer"
              >
                {language === "ky" ? "Дүкөндү көрүү" : language === "ru" ? "Каталог" : "Browse Shop"}
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. BENTO STYLE ORIGIN STORY */}
      <section className="px-6 md:px-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            <span className="text-xs font-bold text-natural-clay uppercase tracking-wider">
              {language === "ky" ? "Эркин Табият" : language === "ru" ? "Первозданная Дикая Природа" : "Unfettered Wilderness"}
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-natural-sage font-bold">
              {language === "ky" ? "Биздин мурасыбыз жайлоодон башталат" : language === "ru" ? "Наше наследие началось в высокогорьях" : "Our Heritage Began in the Highlands"}
            </h2>
            <p className="text-natural-text-muted text-sm md:text-base leading-relaxed">
              {language === "ky" ? "Биздин компания 2014-жылы негизделген. Ошондон бери биз Алай өрөөнүнүн таза жайлоолорунан чогултулган органикалык сүттөн кыргыздын салттуу сүт азыктарын жана ден соолукка пайдалуу суусундуктарын өзгөчө сүйүү менен даярдап келебиз." : language === "ru" ? "Наша компания была основана в 2014 году. С тех пор мы с глубокой преданностью производим традиционные национальные молочные деликатесы и оздоровительные напитки, используя чистое органическое молоко, собранное на нетронутых пастбищах Алайской долины." : "Our company was founded in 2014. Since then, we have been producing traditional national dairy delicacies and wellness drinks with deep devotion, utilizing pure organic milk collected from the pristine pastures of the Alay Valley. These extreme high-altitude alpine zones yield a botanically unique meadow grass flora, endowing our dairy with its unparalleled creaminess and curative profile."}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              <div className="p-6 bg-natural-sage-light/30 rounded-xl border border-natural-sand hover:shadow-md transition-shadow">
                <Leaf className="text-natural-sage w-8 h-8 mb-3" />
                <h4 className="text-xs font-bold text-natural-sage uppercase tracking-wider mb-1">
                  {language === "ky" ? "Биринчи кезекте тазалык" : language === "ru" ? "Чистота прежде всего" : "Purity First"}
                </h4>
                <p className="text-xs text-natural-text-muted leading-relaxed">
                  {language === "ky" ? "Түштүк малчыларынан түз чогултулган 100% таза жайлоо сүтү." : language === "ru" ? "100% натуральное молоко травяного откорма напрямую от семей чабанов." : "100% natural grass-fed pasture milk sourced directly from southern herdsmen families."}
                </p>
              </div>

              <div className="p-6 bg-natural-sage-light/30 rounded-xl border border-natural-sand hover:shadow-md transition-shadow">
                <Award className="text-natural-sage w-8 h-8 mb-3" />
                <h4 className="text-xs font-bold text-natural-sage uppercase tracking-wider mb-1">
                  {language === "ky" ? "Муундан муунга" : language === "ru" ? "Проверено временем" : "Time-Honored"}
                </h4>
                <p className="text-xs text-natural-text-muted leading-relaxed">
                  {language === "ky" ? "Көптөгөн муундар бою сакталган улуттук ачытуу жана казанга кайнатуу ыкмалары." : language === "ru" ? "Аутентичные кочевые технологии ферментации и медленного томления в казанах." : "Authentic nomadic fermentation and Kazan-simmering techniques preserved across generations."}
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="aspect-[4/5] w-full max-w-sm md:max-w-md rounded-2xl overflow-hidden shadow-xl rotate-2 hover:rotate-0 transition-transform duration-500 z-10 bg-natural-sand-light">
              <img 
                className="w-full h-full object-cover" 
                alt="Kyrgyz woman in authentic dress carefully pouring fresh milk into a traditional ceramic vessel"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAM6ZwjpStjvcwk9E0wc-c8LesQ_8heSHorkdm969KREBZErFGN29fe5khSCH6Th5ZtdHCkbcHWRc6Y11IIhWefGBMDDIyH7CmV4F52P7eo-96G9TBJVLvUPeCj918HN_u-CzMQ92qlAJMFXk1pmYgv2zL2aQNsiFtLr_gXrwRt4iXBBdvXi5soArOslnJGMAA5S6nhpiGoywkzVhlDRrvFJjTGKqzXZyitv29DDn0n4IRt8CdmSx_6Lvv9qt06zNu3BTif43_xFGWy"
              />
            </div>
            {/* Organic pulse background shape */}
            <div className="absolute -bottom-6 -left-6 w-48 h-48 rounded-[60%_40%_30%_70%_/_60%_30%_70%_40%] bg-natural-sage/10 -z-0 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* 3. TRADITIONAL PRODUCTS SHOWCASE */}
      <section className="bg-natural-sand-light/30 py-16 border-y border-natural-sand">
        <div className="px-6 md:px-16 max-w-7xl mx-auto text-center mb-12">
          <span className="text-xs font-bold text-natural-clay uppercase tracking-wider">{t("essenceTitle")}</span>
          <h2 className="font-serif text-3xl md:text-4xl text-natural-sage mt-2 mb-4 font-bold">{t("essenceSubtitle")}</h2>
          <p className="text-natural-text-muted text-sm md:text-base max-w-2xl mx-auto">
            {t("essenceDesc")}
          </p>
        </div>

        <div className="px-6 md:px-16 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Product 1: Kymyz */}
          <div 
            className="group cursor-pointer bg-white p-4 rounded-2xl border border-natural-sand/60 hover:shadow-xl transition-all duration-300"
            onClick={() => onSelectProduct("kymyz")}
          >
            <div className="relative aspect-[3/4] rounded-xl overflow-hidden mb-5 bg-natural-sand-light">
              <img 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                alt="Kyrgyz Kymyz in traditional glass bottle"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBgVNIXrQz585xfAsASXNftQr8aqYvGhQn-Fr08wX8JdBWgrOF3SdM9T9FHMzCEwPvzClCSy_1xoi0iMm7o7OxMpjiLLK76UUcafX4W1cXR3uNdIXd7e3ZYTcN4GYULphNQOH23yz9ZBTVmnlG47VtA0IoBPqm3VZVqQvXTVcOaZe3VzPvUiXFyiWvBB9WiqRwH2On1w1xMQL65IkhzF80zNuCaXjpdNdmsuAY0dmTiFSa7VMIJEvz8JZwTGtERQWsP0KVFKnbbWKIE"
              />
              <div className="absolute bottom-3 left-3">
                <span className="bg-natural-clay text-white px-3 py-1 rounded-full text-2xs font-bold tracking-wider uppercase shadow-xs">
                  {t("badgeSignature")}
                </span>
              </div>
            </div>
            <h3 className="font-serif text-lg md:text-xl text-natural-text font-bold mb-2 group-hover:text-natural-clay transition-colors flex items-center justify-between">
              <span>{language === "ky" ? "Кымыз" : language === "ru" ? "Кумыс" : "Kymyz"}</span>
              <span className="text-xs text-natural-sage font-sans font-bold">350 KGS</span>
            </h3>
            <p className="text-xs md:text-sm text-natural-text-muted leading-relaxed">
              {language === "ky" ? "Алайкуунун бийик жайлоолорунан алынган, пробиотиктерге бай, ышталган салттуу кымыз." : language === "ru" ? "Традиционный ферментированный кобылий кумыс с высокогорных жайлоо Алайкуу, богатый полезными пробиотиками." : "Traditional fermented mare's milk from high Алайкуу jailoos, rich in probiotics, sparkling bubbles, and smoke-cured heritage."}
            </p>
          </div>

          {/* Product 2: Chalap Byshma */}
          <div 
            className="group cursor-pointer bg-white p-4 rounded-2xl border border-natural-sand/60 hover:shadow-xl transition-all duration-300"
            onClick={() => onSelectProduct("chalap-byshma")}
          >
            <div className="relative aspect-[3/4] rounded-xl overflow-hidden mb-5 bg-natural-sand-light">
              <img 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                alt="Liquid Kurut and Chalap Byshma in stone bowls"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCb9QejoPP7ouvvr-IxGR4mw6-DwWkCzOLjLoGdpzO-XCowe4FuKx5tKjkDM1_ihHaNJol_ZMH63L6q_Pj4ObyLGGJQMXNpdMdFdgT6XZfQtvcuLsISqZK6MIMzb3B_OikZsabQp1KDXxJZGG0SslxRRy0Ey0NVH3-GI-JNP4YEU0PGWGoCvHIoBEWu1PAjr7DzzSS6q44Zdsp18skMoIHTJAgfCwpRihJR4sPbJjXyddugK_2tYVr6iR-mRjrAAbbtipynKHgn_Sjc"
              />
              <div className="absolute bottom-3 left-3">
                <span className="bg-natural-sage text-white px-3 py-1 rounded-full text-2xs font-bold tracking-wider uppercase shadow-xs">
                  {t("badgeTraditional")}
                </span>
              </div>
            </div>
            <h3 className="font-serif text-lg md:text-xl text-natural-text font-bold mb-2 group-hover:text-natural-clay transition-colors flex items-center justify-between">
              <span>{language === "ky" ? "Чалап" : language === "ru" ? "Чалап" : "Chalap Byshma"}</span>
              <span className="text-xs text-natural-sage font-sans font-bold">180 KGS</span>
            </h3>
            <p className="text-xs md:text-sm text-natural-text-muted leading-relaxed">
              {language === "ky" ? "Мөңгү суусу кошулуп жасалган, чаңкоону басуучу жана организмге күч берүүчү улуттук суусундук." : language === "ru" ? "Глубоко освежающий горный напиток, приготовленный на ледниковой воде, который быстро восстанавливает электролиты." : "A deeply refreshing, tangy mountain drink that restores electrolytes and refreshes the mind, prepared with glacier water."}
            </p>
          </div>

          {/* Product 3: Mountain Sherbet */}
          <div 
            className="group cursor-pointer bg-white p-4 rounded-2xl border border-natural-sand/60 hover:shadow-xl transition-all duration-300"
            onClick={() => onSelectProduct("mountain-sherbet")}
          >
            <div className="relative aspect-[3/4] rounded-xl overflow-hidden mb-5 bg-natural-sand-light">
              <img 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                alt="Sherbet from mountain berries"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBTCsFhEOBUe2H783eeDb-xcweufN17I1L0t4eki8f5G3lU2hpUE6Ln8FvRneGaEYHuEHJBgDTU3P0sRNIL9G9qQadPZvH8wVLXyS51phguG_T1LxR2e5QAQYMV57Yy3nleAa0ERhp4WQxRHhq5cXjScL-2hDoagb-CkavFkiGo0vtzCRpYlzbMnGJIFPyu9lLskPsRi7uZp6sckiRg4mvh6xLjBCYemx4YWGSF1PqRWrDJaLGvc6X2EkCCmoX9PZj62xsXvDqbRLBs"
              />
              <div className="absolute bottom-3 left-3">
                <span className="bg-natural-clay/80 text-white px-3 py-1 rounded-full text-2xs font-bold tracking-wider uppercase shadow-xs">
                  {t("badgeSeasonal")}
                </span>
              </div>
            </div>
            <h3 className="font-serif text-lg md:text-xl text-natural-text font-bold mb-2 group-hover:text-natural-clay transition-colors flex items-center justify-between">
              <span>{language === "ky" ? "Тоо шербети" : language === "ru" ? "Горный Шербет" : "Mountain Sherbet"}</span>
              <span className="text-xs text-natural-sage font-sans font-bold">260 KGS</span>
            </h3>
            <p className="text-xs md:text-sm text-natural-text-muted leading-relaxed">
              {language === "ky" ? "Жапайы малина жана карагаттан даярдалган, Ош тоолорунун серүүндүгүн алып келүүчү улуттук сироп." : language === "ru" ? "Натуральный сироп из лесной малины и смородины, привозящий прохладу лесов Оша прямо к вашему столу." : "A vibrantly sweet-sour natural wild raspberry and currant syrup that brings the cool berry forests of Osh straight to your glass."}
            </p>
          </div>
        </div>
      </section>

      {/* 4. MISSION & QUALITY GRID */}
      <section className="px-6 md:px-16 max-w-7xl mx-auto">
        <div className="bg-natural-sage-light/40 rounded-[2rem] p-8 md:p-16 relative overflow-hidden border border-natural-sand">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-xs font-bold text-natural-clay uppercase tracking-wider">
                {language === "ky" ? "Кынтыксыз тазалык" : language === "ru" ? "Бескомпромиссная чистота" : "Uncompromising Purity"}
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-natural-sage font-bold">{t("aboutFounderTitle")}</h2>
              <blockquote className="border-l-4 border-natural-clay pl-6 mb-6 italic text-lg text-natural-text-muted font-serif">
                "{t("aboutFounderQuote")}"
              </blockquote>
              <p className="text-natural-text-muted text-sm md:text-base leading-relaxed">
                {t("aboutFounderDesc")}
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 text-sm font-semibold text-natural-text">
                  <CheckCircle2 className="text-natural-sage w-5 h-5 shrink-0" />
                  <span>{language === "ky" ? "Европалык сапат стандарттары (82.5% майлуулуктагы май)" : language === "ru" ? "Европейские стандарты качества (82.5% жирности масла)" : "European Quality Standards (82.5% Butterfat)"}</span>
                </div>
                <div className="flex items-center gap-3 text-sm font-semibold text-natural-text">
                  <CheckCircle2 className="text-natural-sage w-5 h-5 shrink-0" />
                  <span>{language === "ky" ? "Чыныгы Каймак (50% майлуулукта)" : language === "ru" ? "Настоящий Каймак (50% жирности)" : "Authentic Kaimak (50% Fat Content)"}</span>
                </div>
                <div className="flex items-center gap-3 text-sm font-semibold text-natural-text">
                  <CheckCircle2 className="text-natural-sage w-5 h-5 shrink-0" />
                  <span>{language === "ky" ? "Колдон жасалган улуттук сырлар жана жаңы йогурттор" : language === "ru" ? "Ремесленные кочевые сыры и свежие йогурты" : "Artisanal Nomadic Cheeses & Fresh Yogurts"}</span>
                </div>
              </div>
            </div>

            {/* 2x2 Image Bento Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="pt-12 space-y-4">
                <img 
                  className="rounded-2xl w-full h-48 md:h-64 object-cover shadow-md hover:scale-102 transition-transform" 
                  alt="Organic butter block with melting texture on wood and mint accents"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBnxpAxCIyDLE5rz6frBpwu_H_JVkD48xmiEUA0ZytkskdBX9eJF2d0tFE6GjcB0KYsvRgprgiV6AWq74XyBwkjrxsLT1r-JMU-jXIP8A6KLSK7wI_f-RZ4SNgU2i22HFPV189eIwh4z9mPHQs7PFbzdkpxF5zQqAR-cfhmeImSLrCn1YOLIxoBKIxeEQEEVyEBfHeFoo5Ojf_OmNWldUzPsdEOYnUFlVSZAB-nnTjUiHDbTUbCyvJKaAYXszs2vaMMwLzm81aV3ZSV"
                />
                <img 
                  className="rounded-2xl w-full h-36 md:h-48 object-cover shadow-md hover:scale-102 transition-transform" 
                  alt="Kyrgyz Kaimak clotted cream dripping slowly from a wooden spoon"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDCX8X1dbwpsdI5PbBPGirTyUHuhbcAfA4tQw4Dm8UjO8XHKy3zyOM_5HEEP_CeqjG8WGkSYcpmVFq-ibO2gUEcTUVXbmTc-MXT_9i8mpvVtf2TYiGw3JVnG34i2tu8zFfXQ7Qkicldyk7w7htNInzfu2Kp8BTbaYKJTpD7-6mslzLIIzzR1sW0ZjA_zK5K3vQj-aQ-bMMvo1KX_DIU6yINKNwVhVGMRCRhkDaTBK_ciO-wTOlDBxBii1zPAtVjpTQRHm5_UX1-20t6"
                />
              </div>
              <div className="space-y-4">
                <img 
                  className="rounded-2xl w-full h-36 md:h-48 object-cover shadow-md hover:scale-102 transition-transform" 
                  alt="Nomadic Kurut pearls, cheese, and farm produce on table"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC1Lq_pwWD6OAoIaJFTpBQCSNC4LI6x4AQPRgp-zCDlFzvEdNJRGgu9TmHGHDiLZskKza_TFNBJBuk8mBVzJWVzw1ctoNk3svPcf5_ECoPmbe7ewp8jwfpO8miVC5fuzVpDwLbS-fa7gUT_oBGrt3V7Pk8vSf_Omh2q4zaBzzx5h9s-z3p0RxSmailNgmTxa24U27YoOeH1ivd748G6lq3H7RrYXVtJOgUe_KukBva9Fc2olWWNFfqN4Jsj5eQD56s2qGEk2RaBq5ts"
                />
                <img 
                  className="rounded-2xl w-full h-48 md:h-64 object-cover shadow-md hover:scale-102 transition-transform" 
                  alt="Modern clean dairy production facility with view of green hills outside"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAWRF4tHF3Ej6TPpugLe272pzC7YPusgsa4JlOePuF24MRlQhaNJgF_XkozwTMF8yBTYEzYdrQ4oGMlNU7o0uEsgeVFF01vW3WbCAJnIzesnyQmcNz4o-RrZ_ZGoW_9uJfafuUt8O99BQ_BxlUUlyNJCSyEg-M7ChQaLcquoBAxwyjazZqsRo02M2V5tOqbJgDf8JCBjpYYdTl-37_Tx_dyLZzbBBw3kUvnxI0NAF04O7pG8c-T6hWnzyjjVUbsVf62ZDfoRQnVb_3v"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CERTIFICATES & LICENSES SECTION */}
      <section id="certificates-section" className="px-6 md:px-16 max-w-7xl mx-auto scroll-mt-20">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold text-natural-clay uppercase tracking-wider block mb-3">
            {language === "ky" ? "Кепилденген Сапат" : language === "ru" ? "Гарантия Качества" : "Guaranteed Quality"}
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-natural-sage font-bold mb-4">
            {language === "ky" ? "Сертификаттар жана Лицензиялар" : language === "ru" ? "Сертификаты и Лицензии" : "Certificates & Licenses"}
          </h2>
          <p className="text-natural-text-muted text-sm md:text-base leading-relaxed">
            {language === "ky" 
              ? "Алайкуу Мурас азыктарынын тазалыгы, органикалык касиеттери жана коопсуздугу улуттук жана эл аралык сапат стандарттары менен тастыкталган."
              : language === "ru" 
                ? "Высокое качество, экологичность пастбищ и безопасность продукции Алайкуу Мурас подтверждены официальными государственными и международными сертификатами."
                : "The premium quality, environmental safety of high pastures, and organic properties of Alayku Muras are verified by recognized state and international certifications."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {certificatesData.map((cert) => (
            <motion.div
              key={cert.id}
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="bg-white rounded-2xl border border-natural-sand/60 p-6 flex flex-col justify-between shadow-xs hover:shadow-lg transition-all duration-300 relative overflow-hidden group cursor-pointer"
              onClick={() => setSelectedCert(cert)}
            >
              {/* Decorative Background Icon */}
              <div className="absolute -right-3 -top-3 w-20 h-20 text-natural-sage/5 group-hover:scale-110 group-hover:text-natural-sage/10 transition-all duration-500">
                <FileText className="w-full h-full" />
              </div>

              <div>
                <div className="w-12 h-12 rounded-xl bg-natural-sage-light/45 flex items-center justify-center text-natural-sage mb-5 group-hover:bg-natural-sage group-hover:text-white transition-all duration-300">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-lg text-natural-text font-bold mb-2 group-hover:text-natural-sage transition-colors">
                  {cert.title}
                </h3>
                <p className="text-xs text-natural-clay font-semibold tracking-wide uppercase mb-3">
                  {cert.subtitle}
                </p>
                <p className="text-xs text-natural-text-muted line-clamp-3 leading-relaxed mb-6">
                  {cert.description}
                </p>
              </div>

              <div className="pt-2 border-t border-natural-sand/40 flex items-center justify-between text-xs font-semibold text-natural-sage group-hover:text-natural-sage-hover transition-colors">
                <span>{language === "ky" ? "Көрүп чыгуу" : language === "ru" ? "Просмотреть" : "View Certificate"}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* CERTIFICATE DETAIL MODAL DISPLAY */}
        <AnimatePresence>
          {selectedCert && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Dark backdrop overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedCert(null)}
                className="absolute inset-0 bg-black/55 backdrop-blur-xs"
              />

              {/* Certificate Canvas Replica */}
              <motion.div
                initial={{ opacity: 0, scale: 0.93, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.93, y: 15 }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
                className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl relative z-10 border border-natural-sand"
              >
                {/* Modal close header */}
                <div className="bg-natural-bg border-b border-natural-sand/50 px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-natural-sage">
                    <ShieldCheck className="w-5 h-5" />
                    <span className="text-xs font-bold uppercase tracking-wider">
                      {language === "ky" ? "Тастыкталган Сапат Кепилдиги" : language === "ru" ? "Официальный Документ Качества" : "Official Quality Seal"}
                    </span>
                  </div>
                  <button
                    onClick={() => setSelectedCert(null)}
                    className="p-1.5 hover:bg-natural-sand-light rounded-lg transition-colors cursor-pointer text-natural-text-muted hover:text-natural-text"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Print confirmation alert banner inside modal */}
                {printFeedback && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-emerald-50 text-emerald-800 text-xs px-6 py-2.5 font-semibold text-center border-b border-emerald-100 flex items-center justify-center gap-2"
                  >
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                    {printFeedback}
                  </motion.div>
                )}

                {/* The "Golden Frame" Certificate sheet */}
                <div className="p-8 md:p-12 bg-radial from-amber-50/20 via-white to-amber-50/5 relative overflow-hidden">
                  
                  {/* Decorative vintage borders */}
                  <div className="absolute inset-4 border-2 border-amber-950/10 rounded-xl pointer-events-none" />
                  <div className="absolute inset-5 border border-amber-950/5 rounded-lg pointer-events-none" />

                  {/* Corner Ornaments */}
                  <div className="absolute top-6 left-6 w-4 h-4 border-t-2 border-l-2 border-amber-950/25 pointer-events-none" />
                  <div className="absolute top-6 right-6 w-4 h-4 border-t-2 border-r-2 border-amber-950/25 pointer-events-none" />
                  <div className="absolute bottom-6 left-6 w-4 h-4 border-b-2 border-l-2 border-amber-950/25 pointer-events-none" />
                  <div className="absolute bottom-6 right-6 w-4 h-4 border-b-2 border-r-2 border-amber-950/25 pointer-events-none" />

                  {/* Certificate replica body content */}
                  <div className="text-center relative z-10 space-y-6">
                    <div className="mx-auto w-16 h-16 rounded-full bg-amber-500/10 border-2 border-amber-500/25 flex items-center justify-center text-amber-600 mb-2">
                      <Award className="w-8 h-8" />
                    </div>

                    <div>
                      <span className="text-[10px] md:text-xs font-serif italic text-amber-800 font-semibold uppercase tracking-widest block mb-1">
                        {language === "ky" ? "Шайкештик жана Сертификаттоо Декларациясы" : language === "ru" ? "Декларация Соответствия и Сертификации" : "Declaration of Conformity & Certification"}
                      </span>
                      <h3 className="font-serif text-2xl md:text-3xl text-amber-950 font-bold leading-tight">
                        {selectedCert.title}
                      </h3>
                      <p className="text-xs text-natural-clay font-semibold tracking-wider uppercase mt-1">
                        {selectedCert.subtitle}
                      </p>
                    </div>

                    <div className="max-w-md mx-auto text-xs md:text-sm text-amber-950/80 leading-relaxed font-serif italic px-4">
                      "{selectedCert.description}"
                    </div>

                    <div className="border-t border-b border-amber-950/10 py-5 my-6 text-left space-y-3.5 max-w-lg mx-auto">
                      <div className="grid grid-cols-3 gap-2 text-3xs md:text-2xs font-semibold uppercase text-amber-950/70">
                        <span>{language === "ky" ? "Каттоо №:" : language === "ru" ? "Регистрационный №:" : "Reg Number:"}</span>
                        <span className="col-span-2 font-mono text-natural-text text-xs md:text-sm font-bold bg-amber-500/5 px-2 py-0.5 rounded border border-amber-500/10 w-fit">{selectedCert.certNo}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-3xs md:text-2xs font-semibold uppercase text-amber-950/70">
                        <span>{language === "ky" ? "Берген орган:" : language === "ru" ? "Кем выдан:" : "Issued By:"}</span>
                        <span className="col-span-2 text-natural-text font-serif text-xs leading-snug">{selectedCert.issuer}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-3xs md:text-2xs font-semibold uppercase text-amber-950/70">
                        <span>{language === "ky" ? "Багыты:" : language === "ru" ? "Сфера действия:" : "Scope:"}</span>
                        <span className="col-span-2 text-natural-text text-xs leading-snug">{selectedCert.scope}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-3xs md:text-2xs font-semibold uppercase text-amber-950/70">
                        <span>{language === "ky" ? "Мөөнөттөрү:" : language === "ru" ? "Сроки действия:" : "Validity period:"}</span>
                        <span className="col-span-2 text-natural-text text-xs font-medium">
                          {selectedCert.issueDate} &mdash; {selectedCert.expiryDate}
                        </span>
                      </div>
                    </div>

                    {/* Bottom stamps & status representation */}
                    <div className="flex items-center justify-around pt-2">
                      <div className="text-left">
                        <span className="block text-[8px] uppercase tracking-wider text-amber-950/50">{language === "ky" ? "Статусу" : language === "ru" ? "Статус" : "Status"}</span>
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full mt-1">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                          {selectedCert.status}
                        </span>
                      </div>

                      {/* Wax Stamp Graphic Replica */}
                      <div className="relative w-16 h-16 flex items-center justify-center">
                        <div className="absolute inset-0 rounded-full border-4 border-dashed border-amber-600/30 animate-spin-slow" />
                        <div className="w-13 h-13 rounded-full bg-amber-600/15 border-2 border-amber-600/40 flex items-center justify-center rotate-12">
                          <span className="text-[8px] font-bold text-amber-800 text-center uppercase tracking-tighter leading-3">
                            ALAIKU<br />APPROVED
                          </span>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Print/Download actions footer bar */}
                <div className="bg-natural-bg border-t border-natural-sand/50 px-6 py-4 flex flex-col sm:flex-row gap-3 items-center justify-between">
                  <span className="text-3xs text-natural-text-muted uppercase tracking-wider">
                    {language === "ky" ? "Алайкуу Органикс ЖЧК • Бардык укуктар корголгон" : language === "ru" ? "ОсОО Алайкуу Органикс • Все права защищены" : "Alayku Organics LLC • All rights certified"}
                  </span>
                  
                  <div className="flex gap-2 w-full sm:w-auto">
                    <button
                      onClick={() => triggerPrintSimulation(selectedCert.title)}
                      className="flex-grow sm:flex-grow-0 bg-natural-sage hover:bg-natural-sage-hover text-white text-xs font-semibold px-4 py-2.5 rounded-lg flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer shadow-xs"
                    >
                      <Printer className="w-4 h-4" />
                      {language === "ky" ? "Басып чыгаруу" : language === "ru" ? "Распечатать" : "Print Document"}
                    </button>
                    <button
                      onClick={() => setSelectedCert(null)}
                      className="flex-grow sm:flex-grow-0 border border-natural-sand hover:bg-natural-sand-light text-natural-text text-xs font-semibold px-4 py-2.5 rounded-lg flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer"
                    >
                      {language === "ky" ? "Жабуу" : language === "ru" ? "Закрыть" : "Close"}
                    </button>
                  </div>
                </div>

              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </section>

      {/* 5. CTA EXPERIENCE THE LEGACY */}
      <section className="py-12 text-center px-6 md:px-16 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="font-serif text-3xl md:text-5xl text-natural-sage mb-6 font-bold leading-tight">
            {language === "ky" ? "Кылымдык Мурас Даамы" : language === "ru" ? "Прикоснитесь к Наследию" : "Experience the Legacy"}
          </h2>
          <p className="text-natural-text-muted text-base md:text-lg mb-10 max-w-2xl mx-auto">
            {language === "ky" ? "Бийик тоолуу органикалык жайлоолорубуздан сиздин дасторконуңузга чейин ар бир тамчы жана ар бир тиштеген азык улуттук баалуулуктарды, ден соолукту жана өзгөчө сапатты чагылдырат." : language === "ru" ? "От наших высокогорных органических пастбищ до вашего стола — каждая капля и каждый кусочек несут глубокую историю кочевого наследия, жизненной силы и бескомпромиссного качества." : "From our high-altitude organic pastures to your table, every drop and every bite tells a deep story of nomadic heritage, life-giving health, and uncompromising quality."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              id="cta-collection-btn"
              onClick={() => setActiveTab("products")}
              className="bg-natural-sage text-white px-10 py-4 rounded-lg font-semibold hover:bg-natural-sage-hover hover:translate-y-[-2px] transition-all duration-300 shadow-md active:scale-95 cursor-pointer"
            >
              {language === "ky" ? "Толук коллекцияны көрүү" : language === "ru" ? "Весь ассортимент" : "Browse Full Collection"}
            </button>
            <button 
              id="cta-farm-btn"
              onClick={() => setActiveTab("impact")}
              className="border border-natural-sage text-natural-sage px-10 py-4 rounded-lg font-semibold hover:bg-natural-sage/5 transition-all active:scale-95 cursor-pointer"
            >
              {t("navImpact")}
            </button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

