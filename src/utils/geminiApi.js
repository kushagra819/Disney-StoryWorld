// Gemini API utility (placeholder)
// Will handle AI story generation requests

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';

export async function generateStory(prompt) {
    // TODO: Implement Gemini API call
    console.log('Generating story with prompt:', prompt);
    return { story: 'Once upon a time...' };
}
