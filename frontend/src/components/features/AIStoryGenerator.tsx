import { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { generateMagicalStory } from '../../utils/geminiApi';

const MOODS = ['Happy', 'Curious', 'Brave', 'Dreamy', 'Mischievous'];

export const AIStoryGenerator = () => {
    const { mood, setMood, kidMode, currentRealm } = useAppStore();
    const [story, setStory] = useState<string | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);

    const handleGenerateStory = async () => {
        if (!mood || !currentRealm) return;

        setIsGenerating(true);
        setStory(null);

        const result = await generateMagicalStory(mood, kidMode, currentRealm);

        // Send to Backend
        fetch('http://localhost:5000/api/story', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: 'demo_user', mood, generatedStory: result }),
        }).catch(err => console.error("Backend offline:", err));

        setStory(result);
        setIsGenerating(false);
    };

    if (!currentRealm) return null; // Only show inside a realm

    return (
        <div className="relative z-30 p-8 max-w-2xl mx-auto my-12 bg-slate-900/80 backdrop-blur-md rounded-3xl border border-purple-500/30">
            <h3 className={`text-center mb-6 text-purple-200 ${kidMode ? 'text-3xl' : 'text-2xl tracking-widest'}`}>
                {kidMode ? 'THE MAGIC STORYBOOK' : 'Chronicles of the Realm'}
            </h3>

            {/* Mood Selector (Person B Logic) */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
                {MOODS.map(m => (
                    <button
                        key={m}
                        onClick={() => setMood(m)}
                        className={`px-4 py-2 rounded-full border transition-all ${mood === m
                                ? 'bg-purple-600 border-purple-400 text-white hover:bg-purple-500'
                                : 'bg-slate-800 border-slate-600 text-slate-300 hover:border-purple-500'
                            }`}
                    >
                        {m}
                    </button>
                ))}
            </div>

            <div className="flex justify-center mb-8">
                <button
                    onClick={handleGenerateStory}
                    disabled={!mood || isGenerating}
                    className={`px-8 py-3 rounded-full font-bold transition-all ${!mood || isGenerating
                            ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                            : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:scale-105 shadow-[0_0_15px_rgba(168,85,247,0.5)]'
                        }`}
                >
                    {isGenerating ? 'Conjuring Magic...' : 'Create My Story ✨'}
                </button>
            </div>

            {/* Story Reveal Area - UI for Person A to animate with Typewriter effect */}
            {story && (
                <div className="p-6 rounded-2xl bg-black/40 border border-white/5 shadow-inner">
                    {/* Note for Person A: Turn this into a Framer Motion typewriter effect */}
                    <p className={`leading-relaxed text-slate-200 ${kidMode ? 'text-2xl' : 'text-lg italic font-serif'}`}>
                        {story}
                    </p>
                </div>
            )}
        </div>
    );
};
