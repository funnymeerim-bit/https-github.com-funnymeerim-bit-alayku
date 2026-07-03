import { Product, TraditionalMethod, PastureDetail } from "./types";

export const PRODUCTS: Product[] = [
  {
    id: "kymyz",
    name: "Kymyz (Кымыз)",
    description: "Traditional fermented mare's milk from the high Алайкуу jailoos, rich in probiotics.",
    longDescription: "Kymyz is the crown jewel of Kyrgyz hospitality. Collected at dawn from mares grazing in high-altitude pastures above 3,000 meters, it is fermented inside traditional smoked horsehide bags (Saba). This process creates a uniquely effervescent, slightly sour, and intensely refreshing beverage loaded with active cultures, vitamins, and minerals.",
    category: "Drinks",
    priceKGS: 350,
    priceUSD: 4.00,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBgVNIXrQz585xfAsASXNftQr8aqYvGhQn-Fr08wX8JdBWgrOF3SdM9T9FHMzCEwPvzClCSy_1xoi0iMm7o7OxMpjiLLK76UUcafX4W1cXR3uNdIXd7e3ZYTcN4GYULphNQOH23yz9ZBTVmnlG47VtA0IoBPqm3VZVqQvXTVcOaZe3VzPvUiXFyiWvBB9WiqRwH2On1w1xMQL65IkhzF80zNuCaXjpdNdmsuAY0dmTiFSa7VMIJEvz8JZwTGtERQWsP0KVFKnbbWKIE",
    badge: "Signature",
    volume: "1 Liter",
    ingredients: ["100% Organic Mare's Milk", "Natural Wild Ferments"],
    nutritionalInfo: {
      calories: 48,
      fat: "1.9g",
      protein: "2.1g",
      carbs: "5.2g"
    },
    benefits: [
      "Rich in probiotics that aid digestion",
      "Immune-boosting properties with vitamin C",
      "Naturally low-lactose due to extended fermentation",
      "Increases energy and cleanses the body"
    ]
  },
  {
    id: "chalap-byshma",
    name: "Chalap Byshma (Чалап Бышма)",
    description: "A refreshing, tangy traditional drink perfect for revitalization and cooling down.",
    longDescription: "Chalap Byshma is a refreshing national elixir made of premium thick yogurt (Suzmo) diluted with pristine mountain spring water and seasoned with a touch of alpine salt. Highly valued by shepherds for its cooling properties under the blazing sun, it restores electrolytes, boosts metabolism, and cleanses the gut.",
    category: "Drinks",
    priceKGS: 180,
    priceUSD: 2.10,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCb9QejoPP7ouvvr-IxGR4mw6-DwWkCzOLjLoGdpzO-XCowe4FuKx5tKjkDM1_ihHaNJol_ZMH63L6q_Pj4ObyLGGJQMXNpdMdFdgT6XZfQtvcuLsISqZK6MIMzb3B_OikZsabQp1KDXxJZGG0SslxRRy0Ey0NVH3-GI-JNP4YEU0PGWGoCvHIoBEWu1PAjr7DzzSS6q44Zdsp18skMoIHTJAgfCwpRihJR4sPbJjXyddugK_2tYVr6iR-mRjrAAbbtipynKHgn_Sjc",
    badge: "Traditional",
    volume: "1 Liter",
    ingredients: ["Sour Cow's Milk (Suzmo)", "Glacial Spring Water", "Iodized Salt"],
    nutritionalInfo: {
      calories: 32,
      fat: "1.2g",
      protein: "1.8g",
      carbs: "3.5g"
    },
    benefits: [
      "Excellent electrolyte replacer",
      "Fights summer dehydration",
      "Supports gut microbiota",
      "Very low calorie, high satisfaction"
    ]
  },
  {
    id: "mountain-sherbet",
    name: "Mountain Sherbet (Тоо Шербети)",
    description: "Refreshing drinks made from natural berries and fruits, capturing the taste of the mountains.",
    longDescription: "Our Mountain Sherbet is crafted from wild raspberries, black currants, and sea buckthorn hand-harvested by local communities in the Alay gorge. Simmered lightly in mountain spring water with organic beet sugar, it yields a bright, sweet-tart taste capturing the sheer essence of alpine forests.",
    category: "Desserts & Sherbets",
    priceKGS: 260,
    priceUSD: 3.00,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBTCsFhEOBUe2H783eeDb-xcweufN17I1L0t4eki8f5G3lU2hpUE6Ln8FvRneGaEYHuEHJBgDTU3P0sRNIL9G9qQadPZvH8wVLXyS51phguG_T1LxR2e5QAQYMV57Yy3nleAa0ERhp4WQxRHhq5cXjScL-2hDoagb-CkavFkiGo0vtzCRpYlzbMnGJIFPyu9lLskPsRi7uZp6sckiRg4mvh6xLjBCYemx4YWGSF1PqRWrDJaLGvc6X2EkCCmoX9PZj62xsXvDqbRLBs",
    badge: "Seasonal",
    volume: "500 ml",
    ingredients: ["Wild Mountain Raspberries", "Black Currants", "Spring Water", "Organic Cane Sugar"],
    nutritionalInfo: {
      calories: 62,
      fat: "0.1g",
      protein: "0.4g",
      carbs: "14.8g"
    },
    benefits: [
      "Extremely rich in Vitamin C and flavonoids",
      "Natural antioxidant support",
      "No artificial preservatives or colorings",
      "Refreshing sweet-sour flavor profile"
    ]
  },
  {
    id: "premium-butter",
    name: "Artisanal Butter 82.5% (Май)",
    description: "Rich, premium golden butter with a sweet aroma, made in accordance with European standards.",
    longDescription: "This dense, golden-hued butter is made from fresh mountain cream using slow churning methods. With a high fat content of 82.5%, it offers an incredibly rich texture, high heat tolerance, and a sweet, grass-fed dairy aroma that elevates baking and cooking alike.",
    category: "Creams & Butter",
    priceKGS: 680,
    priceUSD: 7.90,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBnxpAxCIyDLE5rz6frBpwu_H_JVkD48xmiEUA0ZytkskdBX9eJF2d0tFE6GjcB0KYsvRgprgiV6AWq74XyBwkjrxsLT1r-JMU-jXIP8A6KLSK7wI_f-RZ4SNgU2i22HFPV189eIwh4z9mPHQs7PFbzdkpxF5zQqAR-cfhmeImSLrCn1YOLIxoBKIxeEQEEVyEBfHeFoo5Ojf_OmNWldUzPsdEOYnUFlVSZAB-nnTjUiHDbTUbCyvJKaAYXszs2vaMMwLzm81aV3ZSV",
    badge: "Pure Gold",
    volume: "400g block",
    ingredients: ["Pasteurized Sweet Alpine Cream (Cow's Milk)"],
    nutritionalInfo: {
      calories: 742,
      fat: "82.5g",
      protein: "0.7g",
      carbs: "0.8g"
    },
    benefits: [
      "100% grass-fed cream source",
      "Rich in fat-soluble vitamins A, D, E, K",
      "No added vegetable oils or emulsifiers",
      "Pure, velvety melt with sweet finish"
    ]
  },
  {
    id: "traditional-kaimak",
    name: "Authentic Kaimak 50% (Каймак)",
    description: "Thick, decadent traditional Kyrgyz clotted cream, perfect with hot boorsoks.",
    longDescription: "Kaimak is the soul of a traditional Kyrgyz breakfast. Our Kaimak contains 50% butterfat and is produced by gently heating fresh highland milk and skimming off the cooling cream layers. It is rich, thick, slightly sweet, and traditionally enjoyed with freshly fried boorsoks (dough pockets) or warm bread.",
    category: "Creams & Butter",
    priceKGS: 420,
    priceUSD: 4.90,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDCX8X1dbwpsdI5PbBPGirTyUHuhbcAfA4tQw4Dm8UjO8XHKy3zyOM_5HEEP_CeqjG8WGkSYcpmVFq-ibO2gUEcTUVXbmTc-MXT_9i8mpvVtf2TYiGw3JVnG34i2tu8zFfXQ7Qkicldyk7w7htNInzfu2Kp8BTbaYKJTpD7-6mslzLIIzzR1sW0ZjA_zK5K3vQj-aQ-bMMvo1KX_DIU6yINKNwVhVGMRCRhkDaTBK_ciO-wTOlDBxBii1zPAtVjpTQRHm5_UX1-20t6",
    badge: "Best Seller",
    volume: "350g tub",
    ingredients: ["Highland Whole Cow's Milk Cream"],
    nutritionalInfo: {
      calories: 462,
      fat: "50.0g",
      protein: "2.2g",
      carbs: "3.4g"
    },
    benefits: [
      "Made purely of thick pasture-raised cream",
      "No chemical thickeners or starches",
      "Tastes outstanding with traditional baked goods",
      "High density, extremely satisfying texture"
    ]
  },
  {
    id: "kurut-pearls",
    name: "Kurut Pearls (Курут)",
    description: "Sundried, salted yogurt pearls. The ultimate nomadic high-protein hiking snack.",
    longDescription: "Kurut is the ancient, highly durable food of nomad hunters. Made by straining yogurt (Suzmo), rolling it into small balls, and drying them in the clean mountain wind and sun. The result is a hard, salty, savory dairy pearl that never spoils, providing high protein and calcium on long journeys.",
    category: "Cheeses & Snacks",
    priceKGS: 220,
    priceUSD: 2.50,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC1Lq_pwWD6OAoIaJFTpBQCSNC4LI6x4AQPRgp-zCDlFzvEdNJRGgu9TmHGHDiLZskKza_TFNBJBuk8mBVzJWVzw1ctoNk3svPcf5_ECoPmbe7ewp8jwfpO8miVC5fuzVpDwLbS-fa7gUT_oBGrt3V7Pk8vSf_Omh2q4zaBzzx5h9s-z3p0RxSmailNgmTxa24U27YoOeH1ivd748G6lq3H7RrYXVtJOgUe_KukBva9Fc2olWWNFfqN4Jsj5eQD56s2qGEk2RaBq5ts",
    badge: "Nomadic Spirit",
    volume: "250g bag",
    ingredients: ["Strained Cow's Milk Yogurt", "Natural Rock Salt"],
    nutritionalInfo: {
      calories: 280,
      fat: "14.2g",
      protein: "26.5g",
      carbs: "12.0g"
    },
    benefits: [
      "Ultra-high biological value protein source",
      "Practically indestructible shelf life without refrigeration",
      "Provides rapid salt-electrolyte replacement",
      "Authentic sour and deeply savory flavor"
    ]
  }
];

export const TRADITIONAL_METHODS: TraditionalMethod[] = [
  {
    id: "kymyz-churning",
    title: "The Art of Kymyz Fermentation",
    subtitle: "Sacred Mare's Milk Churning",
    description: "Kymyz is not just a drink; it is an heritage artifact. Its fermentation requires specific conditions and daily care.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAM6ZwjpStjvcwk9E0wc-c8LesQ_8heSHorkdm969KREBZErFGN29fe5khSCH6Th5ZtdHCkbcHWRc6Y11IIhWefGBMDDIyH7CmV4F52P7eo-96G9TBJVLvUPeCj918HN_u-CzMQ92qlAJMFXk1pmYgv2zL2aQNsiFtLr_gXrwRt4iXBBdvXi5soArOslnJGMAA5S6nhpiGoywkzVhlDRrvFJjTGKqzXZyitv29DDn0n4IRt8CdmSx_6Lvv9qt06zNu3BTif43_xFGWy",
    steps: [
      {
        title: "High-Altitude Milking",
        desc: "Mare milking occurs up to 5 times a day on the jailoos. Only foals are allowed to initiate milk let-down to guarantee milk purity."
      },
      {
        title: "Smoked Vessel (Saba)",
        desc: "The horsehide Saba vessel is cured and smoked with wild mountain shrubs (Tбылгы) to impart a subtle pine-and-smoke aroma."
      },
      {
        title: "Bishkek Churning",
        desc: "The milk must be churned up to 5,000 times using a wooden plunger called a 'Bishkek' to oxygenate the ferments evenly."
      },
      {
        title: "Controlled Aging",
        desc: "The mixture ages in cool yurt conditions, turning natural milk sugars into complex healthy organic acids and light natural sparkling bubbles."
      }
    ]
  },
  {
    id: "kaimak-clotting",
    title: "Crafting Kyrgyz Kaimak",
    subtitle: "Slow Heating & Natural Rising",
    description: "Kaimak is the gold of dairy, embodying rich pasture flavors through slow heat extraction.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDCX8X1dbwpsdI5PbBPGirTyUHuhbcAfA4tQw4Dm8UjO8XHKy3zyOM_5HEEP_CeqjG8WGkSYcpmVFq-ibO2gUEcTUVXbmTc-MXT_9i8mpvVtf2TYiGw3JVnG34i2tu8zFfXQ7Qkicldyk7w7htNInzfu2Kp8BTbaYKJTpD7-6mslzLIIzzR1sW0ZjA_zK5K3vQj-aQ-bMMvo1KX_DIU6yINKNwVhVGMRCRhkDaTBK_ciO-wTOlDBxBii1zPAtVjpTQRHm5_UX1-20t6",
    steps: [
      {
        title: "Fresh Milk Gathering",
        desc: "Morning whole milk from cows grazing on Alay wildflowers is brought to the kazan immediately while still warm."
      },
      {
        title: "Gentle Kazan Heating",
        desc: "The milk is slowly simmered inside cast iron kazans over wood fires. It must never boil vigorously, only gently steam."
      },
      {
        title: "Resting Period",
        desc: "After reaching temperature, the kazan is moved to a cooler place, allowing the fatty lipids to float and form a dense crust."
      },
      {
        title: "Skimming & Whipping",
        desc: "The thick top layer is meticulously skimmed with a slotted spoon, creating a luscious cream containing 50% fat."
      }
    ]
  }
];

export const PASTURE_DETAILS: PastureDetail[] = [
  {
    id: "alay",
    name: "Alay Valley Jailoos (Алай өрөөнү)",
    altitude: "3,000m - 3,600m above sea level",
    description: "Nestled between the Pamir and Alay mountain ranges, the Alay valley enjoys crystal-pure air, rich glacial water, and untouched soil that yields a stunning variety of grass flora.",
    botany: [
      "Alpine Fescue (Festuca)",
      "Wild Chives & Mountain Leek",
      "Eurasian Dandelion",
      "Siberian Meadowgrass",
      "Pamir Edelweiss"
    ],
    heritage: "For millennia, nomadic Kyrgyz tribes have driven their herds to these highlands during spring and summer to graze, a sacred rotation cycle that guarantees top-tier milk flavor and vitality."
  }
];
