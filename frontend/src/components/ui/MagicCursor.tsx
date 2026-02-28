import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const MagicCursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const updateMousePosition = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', updateMousePosition);

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
        };
    }, []);

    return (
        <motion.div
            className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-50 flex items-center justify-center"
            animate={{
                x: mousePosition.x - 16,
                y: mousePosition.y - 16,
            }}
            transition={{
                type: "spring",
                stiffness: 500,
                damping: 28,
                mass: 0.5
            }}
        >
            {/* Fairy wand or sparkle icon */}
            <span className="text-2xl drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">🪄</span>

            {/* Person A can add a trail of sparkles here */}
        </motion.div>
    );
};
