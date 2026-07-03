/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini client
let aiClient: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    console.warn("GEMINI_API_KEY is not configured or uses placeholder. Using custom simulated AI Advisor instead.");
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// Simulated backup responses to ensure the app works flawlessly if API key is missing
const FALLBACK_RESPONSES_EN = [
  {
    keywords: ["kymyz", "кымыз", "mare", "кобыла"],
    answer: "Kymyz (Кымыз) is the traditional sparkling beverage of the Kyrgyz steppe. It is made by fermenting fresh mare's milk inside a smoked leather vessel (Saba) using wild yeasts and lactic bacteria. It has a tangy, smoky, slightly effervescent taste and is packed with amino acids and probiotics!"
  },
  {
    keywords: ["kaimak", "каймак", "cream", "сливки"],
    answer: "Kaimak (Каймак) is our legendary 50% fat thick clotted cream. We simmer fresh morning cow's milk inside a cast-iron kazan over a low wood fire, then let it rest to skim off the thick, sweet top layers. It pairs perfectly with warm boorsoks!"
  },
  {
    keywords: ["kurut", "курут", "snack", "сухо"],
    answer: "Kurut (Курут) is the nomad's ultimate high-protein travel snack. Strained yogurt (Suzmo) is salted, rolled into white pearls, and sundried on yurt roofs. It is highly savory, sour, and rich in calcium, and can be preserved for years!"
  },
  {
    keywords: ["chalap", "чалап", "spring", "вода"],
    answer: "Chalap Byshma (Чалап Бышма) is a cooling summer refresher. It's made by diluting thick Suzmo yogurt with ice-cold mountain spring water and a pinch of salt. It's the ultimate natural sports drink for hydration!"
  },
  {
    keywords: ["recipe", "рецепт", "how to eat", "боорсок"],
    answer: "For a traditional Kyrgyz tea party (Dastorkhan), we recommend serving hot, freshly fried boorsoks dipped in thick Alayku Kaimak, accompanied by a cold bowl of Kymyz to balance the richness!"
  }
];

const FALLBACK_RESPONSES_KY = [
  {
    keywords: ["kymyz", "кымыз", "mare", "кобыла"],
    answer: "Кымыз — кыргыз элинин байыркы, дарылык касиетке бай улуттук суусундугу. Ал жайлоодогу жаңы саалып алынган бээнин сүтүнөн, ышталган тери коонодо (Саба) атайын ачыткы, сүт кычкыл бактериялары жана жапайы ачыткы козу карындары менен ачытылат. Ал сиңирүүгө, кан айланууга жана иммунитетке абдан пайдалуу!"
  },
  {
    keywords: ["kaimak", "каймак", "cream", "сливки"],
    answer: "Каймак — 50% майлуулуктагы коюу улуттук сүт азыгы. Биз таңкы таза уйдун сүтүн чоюн казанда жай отто кайнатып, тыныктырып, бетине калкыган калың майлуу катмарын сыйрып алабыз. Ал ысык боорсок менен сонун айкалышат!"
  },
  {
    keywords: ["kurut", "курут", "snack", "сухо"],
    answer: "Курут — көчмөндөрдүн эң сонун жогорку белоктуу тамагы. Сүзбөнү туздап, тегеректеп, боз үйлөрдүн чатырында кургатабыз. Ал көп жылдар бою сакталат жана кальцийге бай!"
  },
  {
    keywords: ["chalap", "чалап", "spring", "вода"],
    answer: "Чалап — жайкысын сергитүүчү суусундук. Сүзбөнү муздак булак суусу жана бир чымчым туз менен аралаштырып даярдайбыз. Бул суу балансын калыбына келтирүүчү эң сонун табигый суусундук!"
  },
  {
    keywords: ["recipe", "рецепт", "how to eat", "боорсок"],
    answer: "Салттуу дасторкондо ысык боорсокту коюу Алайкуу каймагына малып, кымыз менен чогуу ичүү сунушталат!"
  }
];

const FALLBACK_RESPONSES_RU = [
  {
    keywords: ["kymyz", "кымыз", "mare", "кобыла"],
    answer: "Кумыс (Кымыз) — традиционный бодрящий напиток кыргызских кочевников. Он готовится путем ферментации свежего кобыльего молока в копченом кожаном сосуде (Саба) с использованием диких дрожжей и молочнокислых бактерий. Обладает богатым пробиотическим и терапевтическим действием!"
  },
  {
    keywords: ["kaimak", "каймак", "cream", "сливки"],
    answer: "Каймак — наши легендарные густые сливки 50%-ной жирности. Мы томим свежее утреннее коровье молоко в чугунном казане на медленном огне, затем даем ему настояться и снимаем нежнейший верхний слой. Прекрасно сочетается с горячими боорсоками!"
  },
  {
    keywords: ["kurut", "курут", "snack", "сухо"],
    answer: "Курут — питательный дорожный снег кочевников с высоким содержанием белка. Отжатый творог (Сузмо) солят, скатывают в жемчужины и сушат на солнце. Он богат кальцием и может храниться годами!"
  },
  {
    keywords: ["chalap", "чалап", "spring", "вода"],
    answer: "Чалап — освежающий летний напиток. Его готовят путем разбавления густого сузмо ледяной родниковой водой с добавлением соли. Отлично восстанавливает солевой баланс!"
  },
  {
    keywords: ["recipe", "рецепт", "how to eat", "боорсок"],
    answer: "На традиционном кыргызском дастархане рекомендуется подавать горячие боорсоки с густым алайкууским каймаком и пиалой прохладного кумыса!"
  }
];

// Server-side Gemini API route
app.post("/api/gemini/chat", async (req, res) => {
  const { messages, language } = req.body;
  if (!messages || !Array.isArray(messages)) {
    res.status(400).json({ error: "Invalid messages array provided." });
    return;
  }

  const userQuery = messages[messages.length - 1]?.text || "";
  const ai = getAiClient();

  if (!ai) {
    // If the API key is missing, provide a smart simulated response based on the active language
    const currentLang = language || "en";
    let foundAnswer = "";
    let responsesList = FALLBACK_RESPONSES_EN;

    if (currentLang === "ky") {
      foundAnswer = "Алайкуу Organics сүт азыктары жана кыргыз элинин улуттук каада-салттары жөнүндө сураганыңыз үчүн рахмат! Мен сиздин жайлоо кеңешчиңиз болом. Менин толук ИИ-мүмкүнчүлүктөрүмдү иштетүү үчүн, AI Studio Secrets бөлүмүнөн `GEMINI_API_KEY` ачкычын киргизиңиз. Ал ортодо кымыз, каймак, курут же салттуу рецепттер жөнүндө каалаган сурооңузду бере аласыз!";
      responsesList = FALLBACK_RESPONSES_KY;
    } else if (currentLang === "ru") {
      foundAnswer = "Спасибо, что интересуетесь молочной продукцией Alayku Organics и кыргызскими национальными традициями! Я ваш консультант по наследию Джайлоо. Чтобы активировать весь мой ИИ-потенциал, пожалуйста, настройте ключ `GEMINI_API_KEY` в панели Secrets в AI Studio. А пока вы можете спросить меня о кумысе, каймаке, куруте или традиционных рецептах!";
      responsesList = FALLBACK_RESPONSES_RU;
    } else {
      foundAnswer = "Thank you for asking about Alayku Organics and Kyrgyz dairy traditions! I am the Jailoo Heritage Advisor. To activate my full Gemini intelligence, please configure your `GEMINI_API_KEY` in the AI Studio Secrets panel. Meanwhile, feel free to ask me about Kymyz, Kaimak, Kurut, Chalap, or traditional recipes!";
      responsesList = FALLBACK_RESPONSES_EN;
    }

    const queryLower = userQuery.toLowerCase();
    for (const item of responsesList) {
      if (item.keywords.some(kw => queryLower.includes(kw))) {
        if (currentLang === "ky") {
          foundAnswer = `${item.answer}\n\n*(Эскертүү: Толук Gemini режимине өтүү үчүн Secrets терезесинен GEMINI_API_KEY кошуңуз)*`;
        } else if (currentLang === "ru") {
          foundAnswer = `${item.answer}\n\n*(Примечание: Чтобы разблокировать живой диалог с Gemini, добавьте GEMINI_API_KEY в панели Secrets)*`;
        } else {
          foundAnswer = `${item.answer}\n\n*(Note: To unlock live Gemini dialogue, set your GEMINI_API_KEY in Settings > Secrets)*`;
        }
        break;
      }
    }

    setTimeout(() => {
      res.json({ text: foundAnswer });
    }, 600); // Small delay to simulate thinking
    return;
  }

  try {
    const formattedContents = messages.map((m) => ({
      role: m.sender === "user" ? "user" : "model",
      parts: [{ text: m.text }],
    }));

    const currentLang = language || "en";
    let systemInstruction = `You are the "Alayku Jailoo Heritage Advisor," a warm, hospitable, and highly knowledgeable cultural and dairy expert representing Alayku Organics.
Our brand produces authentic Kyrgyz national dairy drinks and products like Kymyz, Chalap Byshma, Mountain Sherbet, Artisanal Butter (82.5%), and Authentic Kaimak (50% clotted cream), collected from the high-altitude pastures of the Alay Valley (jailoo) in southern Kyrgyzstan.

Your goals:
1. Educate users with warm Kyrgyz hospitality (use terms like 'Aman syzby!' or 'Welcome to Alayku!').
2. Explain the rich heritage, nomadic culture, and preparation methods of Kymyz (fermented inside smoked leather saba), Kaimak (gently simmered in kazans), Kurut (salted and sundried yogurt pearls), and Chalap.
3. Suggest perfect pairings, healthy benefits (probiotics, immunity, vitamins), and answer recipes.
4. Keep answers relatively concise, authentic, and beautiful.`;

    if (currentLang === "ky") {
      systemInstruction += "\n\nCRITICAL: Respond to the user strictly in the Kyrgyz language (Кыргызча). Under no circumstances reply in English or Russian unless directly asked for a translation.";
    } else if (currentLang === "ru") {
      systemInstruction += "\n\nCRITICAL: Respond to the user strictly in the Russian language (Русский). Under no circumstances reply in English or Kyrgyz unless directly asked for a translation.";
    } else {
      systemInstruction += "\n\nCRITICAL: Respond to the user strictly in the English language.";
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: formattedContents,
      config: {
        systemInstruction: systemInstruction
      }
    });

    res.json({ text: response.text || "I'm here to guide you through our pasture traditions." });
  } catch (error: any) {
    console.error("Gemini API error:", error);
    res.status(500).json({ error: error.message || "Failed to generate AI response." });
  }
});

// Start the server or mount Vite middleware in development
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
