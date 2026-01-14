import { GoogleGenerativeAI } from "@google/generative-ai";

// No Vite, usamos import.meta.env para ler o arquivo .env.local
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(API_KEY);

export const getAIResponse = async (userMessage: string, history: any[]) => {
  try {
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      systemInstruction: "Você é o assistente da Nibuy, uma vitrine de afiliados. O Nibuy NÃO vende produtos diretamente. Se perguntarem sobre rastreio ou entrega, diga para verificarem no site onde compraram (Shopee, Amazon, etc). Use o laranja #ff5722."
    });

    const result = await model.generateContent(userMessage);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Erro no Gemini:", error);
    return "Tive um problema na conexão. Pode tentar de novo?";
  }
};