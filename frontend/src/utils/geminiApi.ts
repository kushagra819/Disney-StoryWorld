import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Gemini API
// WARN: In a real production app, never expose API keys in the frontend. 
// We are handling it here for hackathon speed, but Ideally Person B moves this to the backend.
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';
const genAI = new GoogleGenerativeAI(API_KEY);

export const generateMagicalStory = async (mood: string, kidMode: boolean, realm: string) => {
    if (!API_KEY) {
        return "The magic crystals are dim... (Please add VITE_GEMINI_API_KEY to your .env file).";
    }

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `
            You are a magical Disney storyteller. 
            Write a 3-sentence, enchanting and emotional short story.
            Theme/Realm: ${realm}
            User Mood: ${mood}
            Style: ${kidMode ? 'Very simple, bright, and easy for a 5-year-old child to read.' : 'Poetic, slightly mysterious, and emotionally resonant for an older audience.'}
            
            Focus on creating an atmospheric, immersive feeling. Do not start with "Once upon a time".
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error("Story generation failed:", error);
        return "A spell was interrupted! The magic faded before the story could be told.";
    }
}
