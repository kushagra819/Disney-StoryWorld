import { useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import { useAppStore } from '../../store/useAppStore';

export const RealmView = () => {
    const { currentRealm, setCurrentRealm, kidMode, incrementMagicMeter } = useAppStore();
    const containerRef = useRef<HTMLDivElement>(null);

    // Parallax scroll calculations
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
    const fgY = useTransform(scrollYProgress, [0, 1], [0, -300]);
    const mgY = useTransform(scrollYProgress, [0, 1], [0, -150]);
    const bgY = useTransform(scrollYProgress, [0, 1], [0, 0]); // Pure background barely moves

    if (!currentRealm) return null;

    // Define thematic content based on realm
    const realmData: Record<string, { title: string, bg: string, text: string }> = {
        'fantasy': { title: "The Enchanted Forest", bg: "from-pink-900 to-purple-900", text: "Fairies whisper secrets in the wind." },
        'ocean': { title: "Atlantica Deep", bg: "from-blue-900 to-teal-900", text: "The choral echoes of mermaids." },
        'space': { title: "Cosmic Frontier", bg: "from-indigo-900 to-black", text: "Where stars blink back at you." },
        'adventure': { title: "The Lost Temple", bg: "from-green-900 to-emerald-950", text: "Ancient stones hum with hidden power." }
    };

    const theme = realmData[currentRealm] || realmData['fantasy'];

    return (
        <div ref={containerRef} className="relative h-[250vh] w-full" style={{ scrollBehavior: 'smooth' }}>

            {/* Parallax Background Layer */}
            <motion.div
                style={{ y: bgY }}
                className={`fixed inset-0 z-0 bg-gradient-to-b ${theme.bg} opacity-50`}
            />

            {/* Sticky Header Return Button */}
            <div className="sticky top-0 w-full p-8 z-40 flex justify-between pointer-events-none">
                <button
                    onClick={() => setCurrentRealm(null)}
                    className="pointer-events-auto px-6 py-2 rounded-full border border-white/20 bg-black/40 backdrop-blur-md hover:bg-white/10 transition-colors text-sm font-bold uppercase tracking-widest"
                >
                    ← Return to Realms
                </button>
            </div>

            {/* Scene Content */}
            <div className="relative z-10 w-full h-full flex flex-col items-center">

                {/* Section 1: Title */}
                <motion.section
                    style={{ y: mgY }}
                    className="h-screen w-full flex flex-col items-center justify-center p-8 text-center"
                >
                    <h2 className={`font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400 drop-shadow-2xl ${kidMode ? 'text-6xl tracking-wide uppercase' : 'text-8xl tracking-tight'}`}>
                        {theme.title}
                    </h2>
                    <p className="mt-8 text-2xl text-purple-200 italic font-serif opacity-80">
                        {theme.text}
                    </p>
                </motion.section>

                {/* Section 2: Interactive Storytelling blocks */}
                <section className="h-[100vh] w-full flex items-center justify-center pointer-events-none">
                    <motion.div
                        style={{ y: fgY }}
                        className="pointer-events-auto max-w-lg p-12 rounded-3xl bg-slate-900/40 backdrop-blur-xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] transform hover:scale-105 transition-transform"
                    >
                        <h3 className="text-3xl font-bold mb-4 text-slate-100">Hidden Secrets</h3>
                        <p className="text-slate-300 leading-relaxed mb-8">
                            As you wander deeper into the realm, the air shimmers. Interactive elements in this world reward your curiosity.
                        </p>

                        {/* Hidden Sparkle / Easter Egg to trigger Magic Meter */}
                        <button
                            className="text-4xl hover:scale-125 hover:rotate-12 transition-all drop-shadow-[0_0_15px_rgba(255,255,255,0.8)] filter grayscale hover:grayscale-0 duration-500"
                            onClick={() => {
                                incrementMagicMeter(10);
                                // Burst effect on click
                                // Let MagicCursor handle the visual burst from generic clicks
                            }}
                        >
                            ✨
                        </button>
                        <span className="ml-4 text-sm text-slate-400 uppercase tracking-wider">Touch the sparkle</span>
                    </motion.div>
                </section>
            </div>
        </div>
    );
};
