import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, TraditionalMethod, PastureDetail } from "../types";
import { PRODUCTS, TRADITIONAL_METHODS, PASTURE_DETAILS } from "../data";

export type Language = "en" | "ru" | "ky";

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, replacements?: Record<string, string | number>) => string;
  getProducts: () => Product[];
  getMethods: () => TraditionalMethod[];
  getPastures: () => PastureDetail[];
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

// UI Translations
const UI_TRANSLATIONS: Record<Language, Record<string, string>> = {
  en: {
    // Header
    navHeritage: "Our Heritage",
    navProducts: "Products & Shop",
    navMethods: "Traditional Methods",
    navAdvisor: "AI Advisor",
    navImpact: "Our Pastures & Impact",
    cartLabel: "Cart",
    freeCourierBar: "Free Courier Delivery in Bishkek & Osh for Orders Over 1,500 KGS!",
    shopNow: "Shop Now",

    // HeritageView
    heroSubtitle: "Pure by Nature.",
    heroText: "Founded in the heart of the south, Алайкуу Organics brings the ancient wisdom of traditional Kyrgyz dairy from untouched high-altitude pastures to the modern table.",
    exploreHeritageBtn: "Explore Nomadic Lore",
    quickOrderBtn: "Quick Order",
    pastureTitle: "The High Pastures of Alayku",
    pastureHeading: "Pure Glacial Water & Wild Herbs",
    pastureDesc: "Our herds graze at 3,000+ meters above sea level where glaciers feed the springs and the soil remains untouched by chemicals. This creates an incredibly nutrient-rich, therapeutic milk.",
    viewPastureEcoBtn: "View Pasture Eco-Metrics",
    essenceTitle: "The Essence of Алайкуу",
    essenceSubtitle: "Our Pride & Heritage Range",
    essenceDesc: "Today, we are honored to deliver traditional liquid, solid, and whipped organic masterpieces directly to your home: Kurut pearls, Chalap, fresh Butter, and the legendary, fizzy Kymyz from our pristine jailoos.",
    aboutFounderTitle: "Preserving Dairy Wisdom",
    aboutFounderSubtitle: "The Heritage Oath",
    aboutFounderQuote: "Everything we create must be natural and delicious.",
    aboutFounderDesc: "Following this absolute directive, Алайкуу Organics produces top-grade premium butter with 82.5% fat content adhering to rigorous European quality parameters. We also cook the richest traditional \"Kaimak\" (50% clotted cream), thick wild-fermented yogurts, and authentic semi-hard nomadic cheeses from raw pastures.",
    whyChooseTitle: "Why Nomads Chose Alayku",
    whyChooseText: "Centuries of breeding have optimized Kyrgyz dairy for recovery, metabolic balance, and gut health.",
    learnFermentationBtn: "Learn Fermentation Process",
    activeProbioticsTitle: "Active Probiotics",
    activeProbioticsDesc: "Contains unique wild strains of Lactobacillus bulgaricus and yeast beneficial for digestion.",
    smokySabaTitle: "Wood-Smoked Saba",
    smokySabaDesc: "Smoked horsehide aging imparts deep rich natural antioxidants and therapeutic properties.",
    heritageLabel: "Heritage Story",

    // ShopView
    shopTitle: "Organic Alpine Shop",
    shopSubtitle: "Sustainably gathered milk processed through pristine, traditional fermentation and churning. Check ingredients and nutritional values.",
    categoryAll: "All Products",
    categoryDrinks: "Drinks",
    categoryCreams: "Creams & Butter",
    categoryCheeses: "Cheeses & Snacks",
    categoryDesserts: "Desserts & Sherbets",
    addToBasket: "Add to Basket",
    benefitsLabel: "Health & Probiotic Benefits",
    ingredientsLabel: "Ingredients",
    nutritionLabel: "Nutritional Value per 100g",
    calories: "Calories",
    fat: "Fat",
    protein: "Protein",
    carbs: "Carbohydrates",
    backToShop: "← Back to Shop",
    badgeSignature: "Signature",
    badgeTraditional: "Traditional",
    badgeSeasonal: "Seasonal",
    badgePureGold: "Pure Gold",
    badgeBestSeller: "Best Seller",
    badgeNomadic: "Nomadic Spirit",

    // MethodsView
    methodsTitle: "Nomadic Fermentation & Simmering",
    methodsSubtitle: "Kyrgyz dairy preparation methods are living museum relics. We preserve authentic, wood-smoked leather aging (Saba) and cast-iron kazan slow clotting to maintain medicinal values.",
    prepSequence: "Preparation Sequence",
    stepDetail: "Step Detail",
    churnGameTitle: "Interactive: Saba Churning Simulator",
    churnGameDesc: "Kyrgyz Kymyz requires at least 5,000 plunger thrusts to oxygenate properly. Try churning 20 times!",
    churnCount: "CHURN COUNT",
    aeration: "AERATION PRESSURE",
    gameCompleteTitle: "Aeronautic Balance Complete!",
    gameCompleteDesc: "You aerated the mare's milk flawlessly. It is ready for smoke aging in the leather Saba!",
    thrustBtn: "Thrust Plunger (Bishkek)",
    kazanGameTitle: "Interactive Kazan Heat Regulation",
    kazanGameDesc: "Kaimak cream requires slow heat. If the Kazan gets too hot, the fat separates. Keep it in the green zone!",
    kazanTemp: "Kazan Simmer Temperature",
    kazanPerfect: "Perfect Simmer State (78°C) • Lipids Floating Successfully",

    // AIAdvisorView
    advisorTitle: "Jailoo Heritage Advisor",
    advisorDesc: "Explore organic Kyrgyz dairy preparation methods, recipe pairings, active probiotic benefits, or nomadic lore. Powered server-side by Gemini.",
    resetChat: "Reset Chat",
    operationalNotice: "AI advisor is fully operational. Ask about health benefits, recipes, or pasture botany!",
    chatPlaceholder: "Ask about Kymyz fermentation, Kaimak recipes, health properties...",
    quickStarterTitle: "Quick Starter Questions",
    quickStarterDesc: "Tap any topic to consult the Jailoo Heritage Advisor instantly:",
    pastureWellnessTitle: "Pasture Wellness Guidelines",
    probioticBalanceTitle: "🌟 The Probiotic Balance",
    probioticBalanceDesc: "Fermented mare's milk provides natural active elements that aid micro-circulation and immune stability.",
    tradPairingTitle: "🥣 Traditional Pairing",
    tradPairingDesc: "Dip hot boorsok breads into thick 50% fat Kaimak clotted cream during cold winter nights for cellular heating.",
    aiWelcome: "Aman syzby! Welcome to Алайкуу Organics. I am your Jailoo Heritage Advisor, here to share the history, medicinal benefits, and culinary traditions of organic Kyrgyz dairy. Ask me anything about Kymyz, Kaimak, Kurut, or our high pastures!",

    // ImpactView
    impactTitle: "High pastures of the Alay valley",
    impactDesc: "At Алайкуу Organics, we believe that pure flavor is a direct function of pristine land and happy herder communities. Learn about our highland ecosystem.",
    altitudeTitle: "3,200m+ Altitude",
    altitudeDesc: "Our grazing herds migrate up to alpine pastures located between 3,000 and 3,600 meters above sea level, where oxygen levels are thin and flora is robust.",
    herdersTitle: "150+ Herder Families",
    herdersDesc: "We operate on a fair-trade, direct partnership model. We support over 150 local nomadic families by providing stable, high-value wholesale income.",
    botanyTitle: "Botanical Richness",
    botanyDesc: "The Alay mountains harbor more than 40 endemic grass herbs, including wild chives, mountain mint, and edelweiss, flavoring the milk naturally.",
    grazingCycles: "Natural Grazing Cycles",
    botanyHeader: "High-Altitude Botanical Diversity",
    nomadicHeritage: "Nomadic Heritage & Cycle",
    glacialWaterTitle: "Glacial Water & Pure Sourcing",
    glacialWaterDesc: "Our dairy animals drink raw, unpolluted water flowing straight from the high-altitude Pamir glaciers. This pristine water contains rich minerals that strengthen the cows' and mares' digestion, yielding milk packed with immunoglobulin proteins and natural active ferments.",
    glacialSprings: "Glacial Springs",
    glacialSpringsDesc: "Direct from Pamir icecaps",
    untouchedSoil: "Untouched Soil",
    untouchedSoilDesc: "Zero pesticides or chemical fertilizers",

    // CartDrawer
    basketTitle: "Your Basket",
    orderConfirmed: "Order Confirmed!",
    orderCodeLabel: "CODE:",
    orderSuccessText: "Kosh Keliniz! Your order of Алайкуу Organics has been logged. Our Bishkek/Osh courier will contact you soon for lightning delivery.",
    mBankTitle: "M-Bank Payment Instruction",
    mBankDesc: "Please transfer the total of {total} KGS to MBank phone number: +996 (770) 55-66-77 (Алайкуу Organics LLC). Mention code {code} in comment.",
    continueExploring: "Continue Exploring",
    basketEmpty: "Your basket is empty",
    basketEmptyDesc: "Fill it with sparkling Kymyz, rich clotted Kaimak, or traditional Kurut snacks from the high-altitude pastures!",
    browseShop: "Browse Shop",
    subtotal: "Subtotal",
    courier: "Courier Delivery",
    courierFree: "FREE",
    addMoreForFree: "Add {amount} KGS more for free courier delivery!",
    totalAmount: "Total Amount",
    deliveryFormTitle: "Bishkek / Osh Delivery Form",
    fullNamePlaceholder: "Your Full Name",
    phonePlaceholder: "Phone Number (e.g. +996...)",
    addressPlaceholder: "Delivery Address",
    paymentMethodTitle: "Payment Method",
    cashOnDelivery: "Cash on Delivery",
    mBankTransfer: "MBank Transfer",
    submitOrder: "Submit Order via Courier",
    checkingOut: "Checking out...",
    addedToBasket: "{product} added to your basket!",
    itemRemoved: "Item removed from basket.",

    // Footer
    footerDesc: "Preserving the traditional dairy heritage of the South since 2014. Committed to purity, nomadic wisdom, and natural highland quality.",
    footerPastures: "Алайкуу Valley Pastures,<br />Osh Region, Kyrgyzstan",
    footerCopyright: "© 2026 Алайкуу Organics. Traditional Kyrgyz Dairy Heritage since 2014. All rights reserved."
  },
  ru: {
    // Header
    navHeritage: "Наследие",
    navProducts: "Каталог и Магазин",
    navMethods: "Древние методы",
    navAdvisor: "AI-Консультант",
    navImpact: "Наши пастбища и влияние",
    cartLabel: "Корзина",
    freeCourierBar: "Бесплатная курьерская доставка по Бишкеку и Ошу при заказе свыше 1500 сом!",
    shopNow: "В магазин",

    // HeritageView
    heroSubtitle: "Чистота от Природы.",
    heroText: "Основанная в самом сердце юга, Алайкуу Organics переносит древнюю мудрость традиционных кыргызских молочных продуктов с девственных высокогорных пастбищ на современный стол.",
    exploreHeritageBtn: "Исследовать традиции кочевников",
    quickOrderBtn: "Быстрый заказ",
    pastureTitle: "Высокогорные пастбища Алайкуу",
    pastureHeading: "Чистая ледниковая вода и дикие травы",
    pastureDesc: "Наши стада пасутся на высоте более 3000 метров над уровнем моря, где ледники питают родники, а почва остается нетронутой химикатами. Это создает невероятно богатое питательными веществами лечебное молоко.",
    viewPastureEcoBtn: "Посмотреть эко-метрики пастбищ",
    essenceTitle: "Суть Алайкуу",
    essenceSubtitle: "Наша гордость и традиционный ассортимент",
    essenceDesc: "Сегодня мы рады доставить традиционные жидкие, твердые и взбитые органические шедевры прямо в ваш дом: курут, чалап, свежее масло и легендарный, шипучий кумыс с наших первозданных джайлоо.",
    aboutFounderTitle: "Сохраняя молочную мудрость",
    aboutFounderSubtitle: "Клятва наследия",
    aboutFounderQuote: "Всё, что мы создаем, должно быть натуральным и вкусным.",
    aboutFounderDesc: "Следуя этой абсолютной директиве, Алайкуу Organics производит первоклассное сливочное масло премиум-класса с жирностью 82,5% в соответствии со строгими европейскими параметрами качества. Мы также готовим традиционный густой «Каймак» (50% жирности), густые йогурты дикого брожения и настоящие полутвердые кочевые сыры с экологически чистых пастбищ.",
    whyChooseTitle: "Почему кочевники выбирали Алайкуу",
    whyChooseText: "Века селекции оптимизировали кыргызские молочные продукты для восстановления сил, метаболического баланса и здоровья кишечника.",
    learnFermentationBtn: "Изучить процесс ферментации",
    activeProbioticsTitle: "Активные пробиотики",
    activeProbioticsDesc: "Содержит уникальные дикие штаммы болгарской палочки и дрожжей, полезных для пищеварения.",
    smokySabaTitle: "Копченый кожаный Саба",
    smokySabaDesc: "Выдержка в копченой конской шкуре придает глубокие целебные свойства и насыщает антиоксидантами.",
    heritageLabel: "История наследия",

    // ShopView
    shopTitle: "Органический альпийский магазин",
    shopSubtitle: "Экологически чистое молоко, обработанное путем традиционной ферментации и сбивания. Проверьте ингредиенты и питательную ценность.",
    categoryAll: "Все продукты",
    categoryDrinks: "Напитки",
    categoryCreams: "Сливки и Масло",
    categoryCheeses: "Сыры и Снеки",
    categoryDesserts: "Десерты и Шербеты",
    addToBasket: "В корзину",
    benefitsLabel: "Польза для здоровья и пробиотики",
    ingredientsLabel: "Ингредиенты",
    nutritionLabel: "Пищевая ценность на 100 г",
    calories: "Калории",
    fat: "Жиры",
    protein: "Белки",
    carbs: "Углеводы",
    backToShop: "← Назад в магазин",
    badgeSignature: "Фирменный",
    badgeTraditional: "Традиционный",
    badgeSeasonal: "Сезонный",
    badgePureGold: "Чистое золото",
    badgeBestSeller: "Хит продаж",
    badgeNomadic: "Дух кочевников",

    // MethodsView
    methodsTitle: "Кочевая ферментация и томление",
    methodsSubtitle: "Кыргызские методы приготовления молочных продуктов — живые музейные экспонаты. Мы сохраняем аутентичную выдержку в кожаных сосудах (Саба) и медленное томление в казанах.",
    prepSequence: "Последовательность приготовления",
    stepDetail: "Детали шага",
    churnGameTitle: "Интерактив: Симулятор сбивания в Саба",
    churnGameDesc: "Кыргызскому кумысу требуется не менее 5000 взмахов мутовкой для насыщения кислородом. Попробуйте взбить 20 раз!",
    churnCount: "КОЛИЧЕСТВО ВЗБИВАНИЙ",
    aeration: "ДАВЛЕНИЕ АЭРАЦИИ",
    gameCompleteTitle: "Аэрация завершена успешно!",
    gameCompleteDesc: "Вы безупречно насытили кобылье молоко кислородом. Оно готово к копчению в кожаном саба!",
    thrustBtn: "Взмах мутовкой (Бишкек)",
    kazanGameTitle: "Интерактивная регулировка тепла в казане",
    kazanGameDesc: "Каймаку требуется медленный огонь. Если казан перегреется, жир отслоится. Держите в зеленой зоне!",
    kazanTemp: "Температура томления в казане",
    kazanPerfect: "Идеальное томление (78°C) • Липиды поднимаются успешно",

    // AIAdvisorView
    advisorTitle: "Консультант по наследию Джайлоо",
    advisorDesc: "Изучите методы приготовления, сочетания рецептов, пользу пробиотиков или кочевые предания. На базе Gemini.",
    resetChat: "Очистить чат",
    operationalNotice: "ИИ-консультант полностью готов. Спросите о пользе для здоровья, рецептах или ботанике пастбищ!",
    chatPlaceholder: "Спросите о ферментации кумыса, рецептах с каймаком, полезных свойствах...",
    quickStarterTitle: "Быстрые вопросы для начала",
    quickStarterDesc: "Нажмите на любую тему, чтобы мгновенно проконсультироваться с экспертом:",
    pastureWellnessTitle: "Рекомендации по здоровью пастбищ",
    probioticBalanceTitle: "🌟 Пробиотический баланс",
    probioticBalanceDesc: "Ферментированное кобылье молоко содержит активные элементы, улучшающие микроциркуляцию и иммунитет.",
    tradPairingTitle: "🥣 Традиционное сочетание",
    tradPairingDesc: "Макайте горячие боорсоки в густой 50% каймак в холодные зимние вечера для согревания организма.",
    aiWelcome: "Аман сызбы! Добро пожаловать в Алайкуу Organics. Я ваш консультант по наследию джайлоо, готовый рассказать об истории, целебных свойствах и кулинарных традициях кыргызских молочных продуктов. Спросите меня о кумысе, каймаке, куруте или пастбищах!",

    // ImpactView
    impactTitle: "Высокогорные пастбища Алайской долины",
    impactDesc: "В Алайкуу Organics мы верим, что чистый вкус — это результат чистой земли и процветания общин чабанов. Узнайте больше о нашей высокогорной экосистеме.",
    altitudeTitle: "Высота более 3200 м",
    altitudeDesc: "Наши стада мигрируют на альпийские пастбища на высоте от 3000 до 3600 метров над уровнем моря, где содержание кислорода низкое, а флора выносливая.",
    herdersTitle: "Более 150 семей чабанов",
    herdersDesc: "Мы работаем на принципах справедливой торговли, поддерживая более 150 местных кочевых семей стабильным и высоким доходом.",
    botanyTitle: "Ботаническое богатство",
    botanyDesc: "Горы Алая содержат более 40 эндемичных трав, включая дикий лук, горную мяту и эдельвейс, которые естественным образом насыщают молоко.",
    grazingCycles: "Естественные циклы выпаса",
    botanyHeader: "Высокогорное ботаническое разнообразие",
    nomadicHeritage: "Кочевое наследие и цикл выпаса",
    glacialWaterTitle: "Ледниковая вода и чистый источник",
    glacialWaterDesc: "Наш скот пьет чистую ледниковую воду, текущую прямо с Памира. Эта вода богата минералами, что улучшает пищеварение скота и дает молоко, богатое белками и активными ферментами.",
    glacialSprings: "Ледниковые родники",
    glacialSpringsDesc: "Прямо с ледяных шапок Памира",
    untouchedSoil: "Девственная почва",
    untouchedSoilDesc: "Без пестицидов и химических удобрений",

    // CartDrawer
    basketTitle: "Ваша корзина",
    orderConfirmed: "Заказ подтвержден!",
    orderCodeLabel: "КОД:",
    orderSuccessText: "Кош келиңиз! Ваш заказ в Алайкуу Organics зарегистрирован. Наш курьер свяжется с вами в ближайшее время.",
    mBankTitle: "Инструкция по оплате через M-Bank",
    mBankDesc: "Пожалуйста, переведите сумму {total} сом на номер MBank: +996 (770) 55-66-77 (ОсОО Алайкуу Organics). Укажите код {code} в комментарии.",
    continueExploring: "Продолжить покупки",
    basketEmpty: "Ваша корзина пуста",
    basketEmptyDesc: "Наполните её игристым кумысом, густым каймаком или традиционным курутом с высокогорных пастбищ!",
    browseShop: "Перейти в магазин",
    subtotal: "Подытог",
    courier: "Курьерская доставка",
    courierFree: "БЕСПЛАТНО",
    addMoreForFree: "Добавьте еще {amount} сом для бесплатной доставки!",
    totalAmount: "Итоговая сумма",
    deliveryFormTitle: "Форма доставки по Бишкеку и Ошу",
    fullNamePlaceholder: "Ваше полное имя",
    phonePlaceholder: "Номер телефона (например, +996...)",
    addressPlaceholder: "Адрес доставки",
    paymentMethodTitle: "Способ оплаты",
    cashOnDelivery: "Наличными при получении",
    mBankTransfer: "Перевод на MBank",
    submitOrder: "Оформить курьерский заказ",
    checkingOut: "Оформление...",
    addedToBasket: "{product} добавлен в вашу корзину!",
    itemRemoved: "Товар удален из корзины.",

    // Footer
    footerDesc: "Сохраняя традиционное молочное наследие Юга с 2014 года. Мы стремимся к чистоте, кочевой мудрости и высокому качеству.",
    footerPastures: "Пастбища долины Алайкуу,<br />Ошская область, Кыргызстан",
    footerCopyright: "© 2026 Алайкуу Organics. Традиционное молочное наследие Кыргызстана с 2014 года. Все права защищены."
  },
  ky: {
    // Header
    navHeritage: "Биздин мурас",
    navProducts: "Азыктар жана Дүкөн",
    navMethods: "Байыркы ыкмалар",
    navAdvisor: "AI-Кеңешчи",
    navImpact: "Жайлоолорубуз жана Таасир",
    cartLabel: "Себет",
    freeCourierBar: "Бишкек жана Ош шаарларында 1500 сомдон жогору заказ кылганда курьердик жеткирүү акысыз!",
    shopNow: "Сатып алуу",

    // HeritageView
    heroSubtitle: "Тазалыгы Табияттан.",
    heroText: "Түштүктүн чок ортосунда негизделген Алайкуу Organics кыргыздын салттуу сүт азыктарынын байыркы сырларын кол тийбеген бийик тоолуу жайлоолордон заманбап дасторконго тартуулайт.",
    exploreHeritageBtn: "Көчмөн тарыхын изилдөө",
    quickOrderBtn: "Тез заказ берүү",
    pastureTitle: "Алайкуунун бийик жайлоолору",
    pastureHeading: "Таза мөңгү суусу жана жапайы чөптөр",
    pastureDesc: "Биздин мал мөңгү суулары булактарды азыктандырган жана топурагы химикаттардан таза, деңиз деңгээлинен 3000 метрден ашык бийиктикте оттойт. Бул аш болумдуу заттарга бай, дарылык касиетке ээ сүттү пайда кылат.",
    viewPastureEcoBtn: "Жайлоо эко-метрикасын көрүү",
    essenceTitle: "Алайкуунун маңызы",
    essenceSubtitle: "Биздин сыймыгыбыз жана мурас азыктарыбыз",
    essenceDesc: "Бүгүн биз салттуу суюк, катуу жана камтылган органикалык шедеврлерди түздөн-түз үйүңүзгө жеткирүү сыймыгына ээбиз: курут, чалап, жаңы сары май жана биздин таза жайлоолорубуздан алынган легендарлуу, газдалган кымыз.",
    aboutFounderTitle: "Сүт даярдоонун баалуу сырларын сактоо",
    aboutFounderSubtitle: "Мурас анты",
    aboutFounderQuote: "Биз жасаган бардык нерсе таза жана даамдуу болушу керек.",
    aboutFounderDesc: "Ушул негизги багытты карманып, Алайкуу Organics европалык сапат стандарттарына жооп берген 82,5% майлуулуктагы жогорку сорттогу май өндүрөт. Биз ошондой эле салттуу эң бай «Каймак» (50% каймак), калың ачытылган йогурттарды жана табигый жайыттардан алынган чыныгы жарым катуу сырларды даярдайбыз.",
    whyChooseTitle: "Эмне үчүн көчмөндөр Алайкууну тандашкан",
    whyChooseText: "Көптөгөн кылымдар бою кыргыздын сүт азыктары организмди калыбына келтирүү, зат алмашуу жана ичеги-карындын саламаттыгы үчүн ылайыкташкан.",
    learnFermentationBtn: "Ачытуу процессин үйрөнүү",
    activeProbioticsTitle: "Активдүү пробиотиктер",
    activeProbioticsDesc: "Тамак сиңирүүгө пайдалуу болгон Lactobacillus bulgaricus жана ачыткылардын уникалдуу жапайы штаммдарын камтыйт.",
    smokySabaTitle: "Ышталган тери Саба",
    smokySabaDesc: "Ышталган тери сабада сактоо терең дарылык касиеттерди берип, антиоксиданттар менен байытат.",
    heritageLabel: "Мурас баяны",

    // ShopView
    shopTitle: "Органикалык тоо дүкөнү",
    shopSubtitle: "Салттуу ачытуу жана сүт чабуу жолу менен иштетилген экологиялык таза сүт азыктары. Курамын жана аш болумдуулугун караңыз.",
    categoryAll: "Бардык азыктар",
    categoryDrinks: "Суусундуктар",
    categoryCreams: "Каймак жана Май",
    categoryCheeses: "Сырлар жана Куруттар",
    categoryDesserts: "Таттуулар жана Шербеттер",
    addToBasket: "Себетке кошуу",
    benefitsLabel: "Ден соолукка жана тамак сиңирүүгө пайдасы",
    ingredientsLabel: "Курамы",
    nutritionLabel: "100 граммдагы аш болумдуулугу",
    calories: "Калориясы",
    fat: "Майлуулугу",
    protein: "Белоктор",
    carbs: "Углеводдор",
    backToShop: "← Кайра дүкөнгө",
    badgeSignature: "Өзгөчө",
    badgeTraditional: "Салттуу",
    badgeSeasonal: "Сезондук",
    badgePureGold: "Таза алтын",
    badgeBestSeller: "Эң көп сатылган",
    badgeNomadic: "Көчмөн духу",

    // MethodsView
    methodsTitle: "Көчмөн ачытуу жана кайнатуу ыкмалары",
    methodsSubtitle: "Кыргыздын сүт азыктарын даярдоо ыкмалары - тирүү музейдик мурас. Биз дарылык касиеттерин сактоо үчүн тери идиште (Саба) сактоо жана казанда жай кайнатуу ыкмаларын колдонобуз.",
    prepSequence: "Даярдоо ырааттуулугу",
    stepDetail: "Кадам маалыматы",
    churnGameTitle: "Интерактив: Сабада кымыз бышуу симулятору",
    churnGameDesc: "Кыргыз кымызы толук ачышы үчүн кеминде 5000 жолу бышылышы керек. 20 жолу бышып көрүңүз!",
    churnCount: "БЫШУУ САНЫ",
    aeration: "КЫЧКЫЛТЕК МӨӨНӨТҮ",
    gameCompleteTitle: "Кычкылтек менен каныгуу аяктады!",
    gameCompleteDesc: "Сиз бээнин сүтүн кычкылтек менен эң сонун каныктырдыңыз. Ал тери сабада ышталып бышылууга даяр!",
    thrustBtn: "Бышкек менен бышуу",
    kazanGameTitle: "Казандагы температураны жөндөө",
    kazanGameDesc: "Каймакка жай от керек. Эгер казан өтө ысып кетсе, майы бөлүнүп кетет. Жашыл тилкеде кармаңыз!",
    kazanTemp: "Казандагы кайноо температурасы",
    kazanPerfect: "Эң сонун кайноо абалы (78°C) • Май катмары ийгиликтүү көтөрүлүүдө",

    // AIAdvisorView
    advisorTitle: "Жайлоо мурасынын кеңешчиси",
    advisorDesc: "Кыргыздын салттуу сүт азыктарын даярдоо ыкмаларын, алардын курамын, пайдалуу касиеттерин жана көчмөн тарыхын билип алыңыз. Gemini аркылуу иштейт.",
    resetChat: "Чатты тазалоо",
    operationalNotice: "ИИ-кеңешчи толук иштеп жатат. Ден соолукка пайдасы, рецепттер же жайлоо чөптөрү тууралуу сураңыз!",
    chatPlaceholder: "Кымыздын ачышы, каймак рецепттери, пайдалуу касиеттери жөнүндө сураңыз...",
    quickStarterTitle: "Тез баштоо суроолору",
    quickStarterDesc: "Кеңешчиден дароо суроо үчүн каалаган теманы тандаңыз:",
    pastureWellnessTitle: "Жайлоо ден соолук сунуштары",
    probioticBalanceTitle: "🌟 Пробиотиктик баланс",
    probioticBalanceDesc: "Ачытылган бээнин сүтү кан айланууну жана иммундук системаны чыңдоочу табигый активдүү элементтерди камтыйт.",
    tradPairingTitle: "🥣 Салттуу айкалыш",
    tradPairingDesc: "Суук кыш күндөрү денени жылытуу үчүн ысык боорсокторду 50% майлуулуктагы коюу каймакка малып жеңиз.",
    aiWelcome: "Аман сызбы! Алайкуу Organics дүйнөсүнө кош келиңиз. Мен сиздин жайлоо мурасы боюнча кеңешчиңиз болом, кыргыздын салттуу сүт азыктарынын тарыхы, дарылык касиеттери жана маданияты тууралуу маалымат берем. Мага кымыз, каймак, курут же жайлоолорубуз жөнүндө каалаган сурооңузду бериңиз!",

    // ImpactView
    impactTitle: "Алай өрөөнүнүн бийик жайлоолору",
    impactDesc: "Алайкуу Organics компаниясында биз таза даам - бул таза жердин жана бактылуу чабандардын эмгегинин натыйжасы деп ишенебиз. Биздин бийик тоолуу экосистема жөнүндө билип алыңыз.",
    altitudeTitle: "3200м+ Бийиктик",
    altitudeDesc: "Биздин мал деңиз деңгээлинен 3000-3600 метр бийиктиктеги жайлоолордо оттойт, андагы кычкылтек аз, бирок чөптөр абдан күчтүү болот.",
    herdersTitle: "150+ Чабан үй-бүлөлөрү",
    herdersDesc: "Биз адилет соода принциптеринде иштеп, 150дөн ашык жергиликтүү үй-бүлөнү туруктуу киреше менен камсыздайбыз.",
    botanyTitle: "Ботаникалык байлык",
    botanyDesc: "Алай тоолорунда 40тан ашык эндемикалык чөптөр өсөт, анын ичинде жапайы пияз, тоо жалбызы жана эдельвейс бар.",
    grazingCycles: "Жайыттардын табигый циклдери",
    botanyHeader: "Бийик тоолуу ботаникалык ар түрдүүлүк",
    nomadicHeritage: "Көчмөн мурасы жана жайыт айлануусу",
    glacialWaterTitle: "Мөңгү суусу жана таза булак",
    glacialWaterDesc: "Биздин мал Памир мөңгүлөрүнөн аккан таза мөңгү суусун ичет. Бул суу минералдарга бай келип, малдын сиңирүүсүн жакшыртат жана активдүү ферменттерге бай сүт берет.",
    glacialSprings: "Мөңгү булактары",
    glacialSpringsDesc: "Памир мөңгүлөрүнөн түз келет",
    untouchedSoil: "Таза топурак",
    untouchedSoilDesc: "Пестициддер жана химиялык жер семирткичтер такыр колдонулбайт",

    // CartDrawer
    basketTitle: "Сиздин себетиңиз",
    orderConfirmed: "Заказ кабыл алынды!",
    orderCodeLabel: "КОД:",
    orderSuccessText: "Кош келиңиз! Сиздин Алайкуу Organics дүкөнүндөгү заказыңыз катталды. Биздин курьер Бишкек/Ош шаарларында тез арада сиз менен байланышат.",
    mBankTitle: "M-Bank аркылуу төлөө нускамасы",
    mBankDesc: "Сураныч, жалпы сумма болгон {total} сомду MBank номерине которуңуз: +996 (770) 55-66-77 (Алайкуу Organics LLC). Комментарийге {code} кодун жазыңыз.",
    continueExploring: "Кайра дүкөнгө баруу",
    basketEmpty: "Себетиңиз бош",
    basketEmptyDesc: "Себетиңизди бийик жайлоолорубуздан алынган жагымдуу кымыз, коюу каймак же даамдуу курут менен толтуруңуз!",
    browseShop: "Дүкөндү көрүү",
    subtotal: "Азыктардын баасы",
    courier: "Курьердик жеткирүү",
    courierFree: "АКЫСЫЗ",
    addMoreForFree: "Акысыз жеткирүү үчүн дагы {amount} сомдук азык кошуңуз!",
    totalAmount: "Жалпы сумма",
    deliveryFormTitle: "Бишкек / Ош жеткирүү баракчасы",
    fullNamePlaceholder: "Толук аты-жөнүңүз",
    phonePlaceholder: "Телефон номери (+996...)",
    addressPlaceholder: "Жеткирүү дареги",
    paymentMethodTitle: "Төлөө ыкмасы",
    cashOnDelivery: "Кабыл алууда накталай төлөө",
    mBankTransfer: "MBank которуусу",
    submitOrder: "Курьердик заказды жөнөтүү",
    checkingOut: "Заказ жөнөтүлүүдө...",
    addedToBasket: "{product} себетиңизге кошулду!",
    itemRemoved: "Азык себеттен өчүрүлдү.",

    // Footer
    footerDesc: "Түштүктүн салттуу сүт азыктарынын мурасын 2014-жылдан бери сактап келебиз. Тазалыкка, көчмөн акылмандыгына жана жогорку сапатка умтулабыз.",
    footerPastures: "Алайкуу өрөөнүнүн жайлоолору,<br />Ош облусу, Кыргызстан",
    footerCopyright: "© 2026 Алайкуу Organics. Салттуу кыргыз сүт азыктарынын мурасы, 2014-жылдан бери. Бардык укуктар корголгон."
  }
};

// Data Localization Helpers
const DYNAMIC_LOCALIZATION: Record<Language, {
  products: Record<string, Partial<Product>>;
  methods: Record<string, Partial<TraditionalMethod>>;
  pasture: Record<string, Partial<PastureDetail>>;
}> = {
  en: {
    products: {}, // Defaults are English
    methods: {},
    pasture: {}
  },
  ru: {
    products: {
      kymyz: {
        name: "Кумыс (Кымыз)",
        description: "Традиционное кобылье молоко с высокогорных пастбищ Алайкуу, богатое пробиотиками.",
        longDescription: "Кумыс — венец кыргызского гостеприимства. Молоко собирается на рассвете с кобылиц, пасущихся на высоте более 3000 метров, и сбраживается в традиционных кожаных сосудах (Саба), окуренных дикими травами. Этот процесс создает освежающий газированный кисловатый напиток, богатый витаминами и минералами.",
        volume: "1 литр",
        ingredients: ["100% органическое кобылье молоко", "Натуральные дикие закваски"],
        benefits: [
          "Богат пробиотиками для улучшения пищеварения",
          "Укрепляет иммунитет благодаря витамину C",
          "Низкое содержание лактозы из-за длительной ферментации",
          "Повышает энергию и очищает организм"
        ]
      },
      "chalap-byshma": {
        name: "Чалап Бышма (Чалап Бышма)",
        description: "Освежающий национальный кисломолочный напиток для быстрого восстановления сил.",
        longDescription: "Чалап Бышма — традиционный эликсир из густого йогурта (Сузмо), разбавленного чистейшей ледниковой водой с добавлением щепотки гималайской соли. Отлично восстанавливает электролитный баланс, борется с жаждой и поддерживает микрофлору желудка.",
        volume: "1 литр",
        ingredients: ["Коровье молоко (Сузмо)", "Ледниковая родниковая вода", "Йодированная соль"],
        benefits: [
          "Идеально восстанавливает баланс электролитов",
          "Эффективно борется с обезвоживанием",
          "Поддерживает микрофлору кишечника",
          "Низкокалорийный и питательный напиток"
        ]
      },
      "mountain-sherbet": {
        name: "Тоо Шербети (Горный Шербет)",
        description: "Освежающий напиток из натуральных диких ягод, вобравший вкус горного воздуха.",
        longDescription: "Наш горный шербет варится из дикой малины, черной смородины и облепихи, бережно собранных местными жителями Алайского ущелья. Напиток обладает ярким кисло-сладким вкусом лесных ягод.",
        volume: "500 мл",
        ingredients: ["Дикая малина", "Черная смородина", "Родниковая вода", "Органический тростниковый сахар"],
        benefits: [
          "Чрезвычайно богат витамином C и антиоксидантами",
          "Натуральная поддержка иммунной системы",
          "Без консервантов и искусственных красителей",
          "Превосходный ягодный освежающий вкус"
        ]
      },
      "premium-butter": {
        name: "Традиционное масло 82.5% (Сары Май)",
        description: "Густое сливочное золотистое масло с нежным сладковатым ароматом пастбищных сливок.",
        longDescription: "Золотистое сливочное масло взбивается из свежих горных сливок методом медленного сбивания. Обладая высокой жирностью 82,5%, оно идеально подходит для выпечки, каш и традиционного кыргызского чаепития.",
        volume: "Блок 400г",
        ingredients: ["Пастеризованные сладкие альпийские сливки"],
        benefits: [
          "100% травяной откорм животных",
          "Богато витаминами A, D, E, K",
          "Без растительных жиров и консервантов",
          "Нежный сливочный вкус с бархатным послевкусием"
        ]
      },
      "traditional-kaimak": {
        name: "Настоящий Каймак 50% (Каймак)",
        description: "Густые, нежнейшие традиционные топленые сливки, идеально подходящие к боорсокам.",
        longDescription: "Каймак — душа кыргызского завтрака. Наш каймак содержит 50% жирности и готовится методом томления парного молока в чугунных казанах с последующим снятием верхнего густого слоя сливок. Лучше всего подавать с горячими хрустящими боорсоками.",
        volume: "Баночка 350г",
        ingredients: ["Свежие высокогорные коровьи сливки"],
        benefits: [
          "Приготовлен только из натуральных сливок",
          "Без загустителей и крахмала",
          "Идеален с традиционной горячей выпечкой",
          "Высокая питательность и нежная текстура"
        ]
      },
      "kurut-pearls": {
        name: "Курут (Курут)",
        description: "Высушенные на солнце соленые шарики. Энергетический перекус кочевников.",
        longDescription: "Курут — древняя пища воинов и пастухов. Изготавливается из процеженного сузьме, скатывается в шарики и высушивается на горном ветру и солнце. Это соленый, концентрированный деликатес с огромным запасом кальция и белка.",
        volume: "Пакетик 250г",
        ingredients: ["Обезжиренное коровье сузьме", "Каменная соль"],
        benefits: [
          "Высокая питательность и содержание белка",
          "Долгий срок хранения без холодильника",
          "Восстанавливает баланс солей в организме",
          "Обладает пикантным соленым вкусом"
        ]
      }
    },
    methods: {
      "kymyz-churning": {
        title: "Искусство ферментации кумыса",
        subtitle: "Священное сбивание кобыльего молока",
        description: "Кумыс — это не просто напиток, это объект культурного наследия. Его брожение требует особых условий и ежедневного ухода.",
        steps: [
          {
            title: "Высокогорная дойка",
            desc: "Дойка кобылиц происходит до 5 раз в день на джайлоо. Жеребенка подпускают только для начала дойки, что гарантирует чистоту процесса."
          },
          {
            title: "Копченый Саба",
            desc: "Кожаный сосуд (Саба) окуривается дикими горными кустарниками (Тбылгы) для придания напитку хвойно-копченого аромата."
          },
          {
            title: "Сбивание мутовкой (Бишкек)",
            desc: "Смесь взбивают специальной деревянной мутовкой (Бишкек) до 5000 раз для равномерного распределения закваски."
          },
          {
            title: "Контролируемое созревание",
            desc: "Напиток созревает в прохладной юрте, превращая молочные сахара в полезные органические кислоты и пузырьки."
          }
        ]
      },
      "kaimak-clotting": {
        title: "Приготовление кыргызского каймака",
        subtitle: "Медленное томление и отстаивание",
        description: "Каймак — золото кыргызской кухни, воплощающее богатые ароматы альпийских пастбищ.",
        steps: [
          {
            title: "Сбор свежего молока",
            desc: "Утреннее молоко от коров, пасущихся на душистых травах Алая, доставляется к казану теплым."
          },
          {
            title: "Томление в казане",
            desc: "Молоко медленно томится в чугунных казанах на дровах. Оно не должно бурно кипеть, только нежно дымиться."
          },
          {
            title: "Период отстаивания",
            desc: "После нагрева казан переносят в прохладное место, давая молочным жирам подняться и образовать плотную корку."
          },
          {
            title: "Снятие каймака",
            desc: "Плотный верхний слой бережно снимается специальной ложкой, образуя сливки жирностью 50%."
          }
        ]
      }
    },
    pasture: {
      alay: {
        name: "Джайлоо Алайской долины (Алай өрөөнү)",
        altitude: "3000м - 3600м над уровнем моря",
        description: "Алайская долина, расположенная между Памирским и Алайским хребтами, славится кристально чистым воздухом, ледниковой водой и нетронутой почвой с богатой альпийской флорой.",
        botany: [
          "Альпийская овсяница",
          "Дикий лук и горный чеснок",
          "Эндемичный одуванчик",
          "Сибирский мятлик",
          "Памирский эдельвейс"
        ],
        heritage: "Тысячелетиями кыргызские кочевники пригоняли свои стада на эти высокогорья весной и летом — этот сакральный цикл выпаса гарантирует непревзойденный вкус молока."
      }
    }
  },
  ky: {
    products: {
      kymyz: {
        name: "Кымыз (Кымыз)",
        description: "Алайкуунун бийик жайлоолорунан чогултулган, пайдалуу пробиотиктерге бай салттуу кымыз.",
        longDescription: "Кымыз — кыргыз меймандостугунун туу чокусу. Деңиз деңгээлинен 3000 метрден ашык бийиктиктеги жайлоолордо оттогон бээлерден таң заарда саалып, арча жанабылгы менен ышталган булгаары сабада ачытылат. Бул процесс кымызга өзгөчө даам, жагымдуу жыт жана көптөгөн активдүү витаминдерди берет.",
        volume: "1 литр",
        ingredients: ["100% таза бээ сүтү", "Табигый жапайы ачыткылар"],
        benefits: [
          "Тамак сиңирүүгө пайдалуу пробиотиктерге бай",
          "С витамини менен иммунитетти бекемдейт",
          "Узак ачытылгандыктан лактозасы өтө аз",
          "Күч-кубат берип, организмди тазалайт"
        ]
      },
      "chalap-byshma": {
        name: "Чалап Бышма (Чалап Бышма)",
        description: "Адамды сергитип, чаңкоону басуучу жана организмге кубат берүүчү салттуу суусундук.",
        longDescription: "Чалап Бышма — Алайдын тоо булактарынан алынган таза суу менен суюлтулуп, бир аз туз кошулган таза сүзмөдөн (коюу айран) жасалган улуттук суусундук. Чабандардын сүйүктүү суусундугу организмдин суу балансын калыбына келтирип, зат алмашууну жакшыртат.",
        volume: "1 литр",
        ingredients: ["Табигый сүзмө (уй сүтү)", "Мөңгү булак суусу", "Туз"],
        benefits: [
          "Электролиттик балансты калыбына келтирет",
          "Чаңкоону абдан жакшы басат",
          "Ичеги-карын микрофлорасын колдойт",
          "Өтө жеңил жана пайдалуу суусундук"
        ]
      },
      "mountain-sherbet": {
        name: "Тоо Шербети (Тоо Шербети)",
        description: "Тоонун жапайы жемиштеринен жана булак суусунан даярдалган табигый шире.",
        longDescription: "Тоо шербети Алай капчыгайындагы токойлордон кол менен терилген жапайы малина, карагат жана чычырканактан жасалат. Таза булак суусунда кайнатылып, тоонун эң сонун мөмө даамын дасторконго тартуулайт.",
        volume: "500 мл",
        ingredients: ["Жапайы тоо малинасы", "Кара карагат", "Тоо суусу", "Органикалык кант"],
        benefits: [
          "С витаминине жана антиоксиданттарга өтө бай",
          "Иммунитетти табигый түрдө көтөрөт",
          "Жасалма боёктор жана консерванттар кошулбайт",
          "Жагымдуу таттуу-кычкыл даамга ээ"
        ]
      },
      "premium-butter": {
        name: "Салттуу сары май 82.5% (Сары Май)",
        description: "Алайдын таза сүтүнөн даярдалган, европалык стандарттарга жооп берген нукура сары май.",
        longDescription: "Бул нукура сары май тоонун таза каймагынан салттуу ыкма менен чабылып даярдалат. 82,5% жогорку майлуулугу менен өзгөчө жытка жана даамга ээ, нан жана боорсок менен жегенге эң сонун.",
        volume: "Блок 400г",
        ingredients: ["Пастеризацияланган таза тоо каймагы"],
        benefits: [
          "100% жайлоо чөбүн жеген малдын сүтүнөн",
          "A, D, E, K витаминдерине бай",
          "Эч кандай өсүмдүк майлары кошулбайт",
          "Таттуу жана назик даамга ээ"
        ]
      },
      "traditional-kaimak": {
        name: "Нукура каймак 50% (Каймак)",
        description: "Ысык боорсок менен жегенге ылайыкталган, тоонун коюу жана назик каймагы.",
        longDescription: "Каймак — кыргыз дасторконунун көркү. Биздин каймак 50% майлуулукта болуп, уйдун жылуу сүтүн казанда жай ысытып, үстүндөгү коюу катмарын калпып алуу менен жасалат. Ал ысык боорсок же токоч менен өзгөчө даамдуу.",
        volume: "350г идиште",
        ingredients: ["Жогорку тоолуу уйдун таза каймагы"],
        benefits: [
          "Табигый каймактан гана даярдалат",
          "Крахмал же жасалма коюуланткычтар кошулбайт",
          "Ысык боорсок жана нан менен абдан даамдуу",
          "Өзгөчө сиңимдүү жана аш болумдуу"
        ]
      },
      "kurut-pearls": {
        name: "Курут (Курут)",
        description: "Күндө кургатылган, туздуу курут. Көчмөндөрдүн кубат берүүчү салттуу азыгы.",
        longDescription: "Курут — көчмөндөрдүн эң байыркы жана бузулбас азыгы. Коюу сүзмөнү тоголоктоп, тоонун шамалына жана күнүнө кургатуу менен жасалат. Курут кальцийге жана белокко өтө бай, жол жүргөндө чаңкоону басып, күч берет.",
        volume: "250г баштыкта",
        ingredients: ["Майсыздандырылган уй сүзмөсү", "Табигый туз"],
        benefits: [
          "Протеиндин жана кальцийдин жогорку булагы",
          "Муздаткычсыз эле узак убакытка сакталат",
          "Организмдин туз балансын калыбына келтирет",
          "Өзгөчө жагымдуу туздуу даамга ээ"
        ]
      }
    },
    methods: {
      "kymyz-churning": {
        title: "Кымыз ачытуу өнөрү",
        subtitle: "Бээ сүтүн сабада бышуу ырасымы",
        description: "Кымыз — жөн гана суусундук эмес, ал улуттук мурас. Аны даярдоо өзгөчө камкордукту талап кылат.",
        steps: [
          {
            title: "Бийик жайлоодо саалуу",
            desc: "Бээлер жайлоодо күнүнө 5 жолуга чейин сааларат. Сүттүн тазалыгын сактоо үчүн алгач кулун ийгизилет."
          },
          {
            title: "Ышталган Саба",
            desc: "Булгаары саба кымызга өзгөчө токой жытын берүү үчүн тоо чөптөрү (тыбылгы) менен жакшылап ышталат."
          },
          {
            title: "Бышкек менен бышуу",
            desc: "Кымыз ачыткысы жакшы аралашуусу үчүн жыгач бышкек менен 5000 жолуга чейин бышылет."
          },
          {
            title: "Жай ачытуу",
            desc: "Кымыз боз үйдүн салкын шарттарында сакталып, сүттөгү табигый кант пайдалуу кислотага жана газдарга айланат."
          }
        ]
      },
      "kaimak-clotting": {
        title: "Кыргыз каймагын даярдоо",
        subtitle: "Казанда жай кайнатуу жана тундуруу",
        description: "Каймак — жайлоодогу гүлдөрдүн ширесин өзүнө сиңирген, сүттүн эң таза жана баалуу бөлүгү.",
        steps: [
          {
            title: "Жылуу сүттү чогултуу",
            desc: "Алайдын жапжашыл гүлдөрүн оттогон уйлардын таңкы жылуу сүтү дароо казанга куюлат."
          },
          {
            title: "Казанда жай ысытуу",
            desc: "Сүт чоюн казанда оттун табы менен жай ысытылат. Ал катуу кайнабастан, булап гана турушу керек."
          },
          {
            title: "Тундуруп коюу",
            desc: "Казанды оттон алып салкын жерге коёт, бул маалда сүттүн майлуулугу өйдө калкып, калың катмар түзөт."
          },
          {
            title: "Каймакты калпып алуу",
            desc: "Каймактын калың катмары атайын калпыгыч менен кылдат калпып алынып, 50% майлуулуктагы каймак даяр болот."
          }
        ]
      }
    },
    pasture: {
      alay: {
        name: "Алай өрөөнүнүн жайлоолору (Алай өрөөнү)",
        altitude: "деңиз деңгээлинен 3000м - 3600м бийиктикте",
        description: "Памир-Алай тоо кыркаларынын ортосунда жайгашкан Алай өрөөнү таза абасы, тунук мөңгү суулары жана жапайы тоо чөптөрү менен айырмаланат.",
        botany: [
          "Альпий сойку чөбү",
          "Жапайы пияз жана тоо сарымсагы",
          "Каакым",
          "Салкын булак мятлиги",
          "Памир эдельвейси"
        ],
        heritage: "Кылымдар бою кыргыз көчмөндөрү малын жаз-жай айларында ушул бийик жайлоолорго айдашкан, бул салттуу цикл сүттүн даамын жана дарылык касиетин арттырат."
      }
    }
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem("alayku_lang");
      if (saved === "en" || saved === "ru" || saved === "ky") {
        return saved;
      }
    } catch (_) {}
    return "ky"; // Default to Kyrgyz (or 'en'/'ru' per request, 'ky' is natural given 'название компании Алайкуу organics')
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("alayku_lang", lang);
    } catch (_) {}
  };

  // Translation function helper
  const t = (key: string, replacements?: Record<string, string | number>): string => {
    const dict = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.en;
    let text = dict[key] || UI_TRANSLATIONS.en[key] || key;

    if (replacements) {
      Object.entries(replacements).forEach(([k, v]) => {
        text = text.replace(`{${k}}`, String(v));
      });
    }
    return text;
  };

  // Get localized lists
  const getProducts = (): Product[] => {
    const local = DYNAMIC_LOCALIZATION[language]?.products || {};
    return PRODUCTS.map(p => {
      const translation = local[p.id];
      if (!translation) return p;
      return {
        ...p,
        ...translation,
        nutritionalInfo: p.nutritionalInfo // Keep numeric metrics intact
      };
    });
  };

  const getMethods = (): TraditionalMethod[] => {
    const local = DYNAMIC_LOCALIZATION[language]?.methods || {};
    return TRADITIONAL_METHODS.map(m => {
      const translation = local[m.id];
      if (!translation) return m;
      return {
        ...m,
        title: translation.title || m.title,
        subtitle: translation.subtitle || m.subtitle,
        description: translation.description || m.description,
        steps: m.steps.map((step, idx) => {
          const transStep = translation.steps?.[idx];
          return {
            title: transStep?.title || step.title,
            desc: transStep?.desc || step.desc
          };
        })
      };
    });
  };

  const getPastures = (): PastureDetail[] => {
    const local = DYNAMIC_LOCALIZATION[language]?.pasture || {};
    return PASTURE_DETAILS.map(p => {
      const translation = local[p.id];
      if (!translation) return p;
      return {
        ...p,
        name: translation.name || p.name,
        altitude: translation.altitude || p.altitude,
        description: translation.description || p.description,
        botany: translation.botany || p.botany,
        heritage: translation.heritage || p.heritage
      };
    });
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, getProducts, getMethods, getPastures }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
