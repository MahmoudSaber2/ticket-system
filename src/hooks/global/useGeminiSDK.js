// Import lib
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = "AIzaSyCrGPauJKLnpdTp5Cxr0IoBd1CIiwANo90";
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
};

export const useGeminiSDK = () => {
    const chatSession = model.startChat({
        generationConfig,
        history: [],
    });

    const run = async (input) => {
        const result = await chatSession.sendMessage(`Translate this text to English: ${input}`);
        
        return result.response.text();
    };

    return { run };
};
