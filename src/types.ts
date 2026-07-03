/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  category: "Drinks" | "Creams & Butter" | "Cheeses & Snacks" | "Desserts & Sherbets";
  priceKGS: number;
  priceUSD: number;
  image: string;
  badge?: string;
  volume: string;
  ingredients: string[];
  nutritionalInfo: {
    calories: number;
    fat: string;
    protein: string;
    carbs: string;
  };
  benefits: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface TraditionalMethod {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  steps: { title: string; desc: string }[];
}

export interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: string;
}

export interface PastureDetail {
  id: string;
  name: string;
  altitude: string;
  description: string;
  botany: string[];
  heritage: string;
}
