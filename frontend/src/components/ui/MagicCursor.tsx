import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Sparkle Particle type
type Sparkle = {
    id: number;
    x: number;
    y: number;
    size: number;
};

export const MagicCursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
    const [sparkles, setSparkles] = useState<Sparkle[]>([]);

    useEffect(() => {
        let lastSparkleTime = 0;

        const updateMousePosition = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });

            // Generate a trail of sparkles if moving fast enough
            const now = Date.now();
            if (now - lastSparkleTime > 50) { // Limit sparkle spawn rate
                setSparkles(prev => [
                    ...prev.slice(-15), // Keep max 15 active sparkles
                    {
                        id: now,
                        x: e.clientX + (Math.random() * 20 - 10),
                        y: e.clientY + (Math.random() * 20 - 10),
                        size: Math.random() * 10 + 5
                    }
                ]);
                lastSparkleTime = now;
            }
        };

        window.addEventListener('mousemove', updateMousePosition);

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
        };
    }, []);

    return (
        <>
            <AnimatePresence>
                {sparkles.map((sparkle) => (
                    <motion.div
                        key={sparkle.id}
                        initial={{ opacity: 1, scale: 0, x: sparkle.x, y: sparkle.y }}
                        animate={{ opacity: 0, scale: 1.5, y: sparkle.y + 20 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="fixed pointer-events-none z-40 flex items-center justify-center text-yellow-200"
                        style={{
                            textShadow: '0 0 10px rgba(253, 224, 71, 0.8)',
                            fontSize: sparkle.size
                        }}
                    >
                        ✧
                    </motion.div>
                ))}
            </AnimatePresence>

            <motion.div
                className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-50 flex items-center justify-center"
                animate={{
                    x: mousePosition.x - 16,
                    y: mousePosition.y - 16,
                }}
                transition={{
                    type: "spring",
                    stiffness: 700,
                    damping: 25,
                    mass: 0.1
                }}
            >
                <span className="text-3xl drop-shadow-[0_0_15px_rgba(255,255,255,1)] origin-bottom-left -rotate-45 block">
                    🪄
                </span>
            </motion.div>
        </>
    );
};
