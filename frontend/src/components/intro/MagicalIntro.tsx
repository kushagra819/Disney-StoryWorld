import { useScroll, useTransform, motion } from 'framer-motion';

export const MagicalIntro = () => {
    const { scrollY } = useScroll();

    // Example transform: parallax scale from 1 to 20 over 300vh scroll
    // The actual scroll range needs to be calibrated (e.g., 0 to 2000px)
    const scale = useTransform(scrollY, [0, 1500], [1, 20]);
    const opacity = useTransform(scrollY, [0, 500], [1, 0]);

    return (
        <div className="relative h-[300vh] w-full bg-slate-950 overflow-hidden">
            {/* Starry Night Canvas Background (Person A to implement) */}
            <div className="fixed inset-0 z-0 pointer-events-none bg-gradient-to-b from-blue-950 to-black">
                {/* Insert Stars here */}
            </div>

            {/* Sticky container holds the scaling castle */}
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden z-10">

                {/* The scaling castle */}
                <motion.div
                    style={{ scale }}
                    className="relative text-blue-400 drop-shadow-[0_0_20px_rgba(59,130,246,0.8)]"
                >
                    {/* SVG or Emoji Castle */}
                    <span className="text-[150px]">🏰</span>
                </motion.div>

                {/* Hero text fading out */}
                <motion.div
                    style={{ opacity }}
                    className="absolute flex flex-col items-center justify-center pointer-events-none"
                >
                    <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-purple-400 mb-6 drop-shadow-lg">
                        Where Dreams Come True
                    </h1>
                    <button className="px-8 py-3 rounded-full bg-white/10 border border-white/20 backdrop-blur-md hover:bg-white/20 transition-all font-medium tracking-wider">
                        Enter the Magic
                    </button>
                </motion.div>

            </div>
        </div>
    );
};
