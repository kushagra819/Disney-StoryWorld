import { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';

export const MagicalIntro = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Parallax Magic! Zooming the castle from 1x to ~20x as user scrolls the 300vh section
    const castleScale = useTransform(scrollYProgress, [0, 1], [1, 25]);
    const castleOpacity = useTransform(scrollYProgress, [0.8, 1], [1, 0]); // Fade out very late so they clip through

    // Fade the welcoming text early to focus purely on the castle approach
    const textOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
    const textY = useTransform(scrollYProgress, [0, 0.3], [0, -50]);

    // Starry background generator (Rendered once)
    const [stars, setStars] = useState<{ id: number, x: number, y: number, size: number, delay: number }[]>([]);

    useEffect(() => {
        const generatedStars = Array.from({ length: 100 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 2 + 1,
            delay: Math.random() * 3,
        }));
        setStars(generatedStars);
    }, []);

    return (
        <div ref={containerRef} className="relative h-[300vh] w-full bg-slate-950 overflow-clip">
            {/* Starry Night Canvas Background */}
            <div className="fixed inset-0 z-0 pointer-events-none bg-gradient-to-b from-[#020024] via-[#090979] to-[#00d4ff] opacity-80">
                {stars.map((star) => (
                    <div
                        key={star.id}
                        className="absolute bg-white rounded-full animate-pulse shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                        style={{
                            left: `${star.x}vw`,
                            top: `${star.y}vh`,
                            width: `${star.size}px`,
                            height: `${star.size}px`,
                            animationDelay: `${star.delay}s`,
                            animationDuration: `${Math.random() * 2 + 2}s`
                        }}
                    />
                ))}
            </div>

            {/* Sticky container holds the scaling castle */}
            <div className="sticky top-0 h-screen w-full flex align-center justify-center overflow-hidden z-10 pointer-events-none">

                {/* The scaling castle */}
                <motion.div
                    style={{ scale: castleScale, opacity: castleOpacity }}
                    className="absolute inset-0 flex items-center justify-center pointer-events-auto origin-center"
                >
                    <div className="relative text-[150px] md:text-[200px] text-blue-400 drop-shadow-[0_0_30px_rgba(59,130,246,0.9)] transition-colors duration-1000">
                        🏰
                        {/* Inner glow to make it pop even more as it scales */}
                        <div className="absolute inset-0 bg-blue-500 blur-[80px] opacity-20 scale-150 rounded-full" />
                    </div>
                </motion.div>

                {/* Hero text fading out */}
                <motion.div
                    style={{ opacity: textOpacity, y: textY }}
                    className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-20"
                >
                    <h1 className="text-5xl md:text-8xl font-black bg-clip-text text-transparent bg-gradient-to-b from-white to-blue-200 mb-8 drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)] text-center px-4 leading-tight tracking-tight">
                        Where Dreams <br /> Come True
                    </h1>

                    <div className="flex flex-col items-center gap-4">
                        <button className="pointer-events-auto px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 border border-white/30 backdrop-blur-md transition-all font-bold tracking-widest text-sm shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] uppercase">
                            Scroll to Enter
                        </button>
                        <div className="w-[1px] h-16 bg-gradient-to-b from-white to-transparent animate-bounce mt-4 opacity-50" />
                    </div>
                </motion.div>

            </div>
        </div>
    );
};
