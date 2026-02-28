import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import './StoriesSection.css';

const STORIES = [
    {
        id: 'snow-white',
        title: 'Snow White',
        year: 1937,
        tag: 'Courage',
        gradient: 'linear-gradient(135deg, #7c3aed 0%, #1d4ed8 50%, #0d1b2a 100%)',
        emoji: '🍎',
        lines: [
            'In a kingdom shadowed by jealousy,',
            'a princess with a heart pure as snow',
            'found refuge among unlikely friends.',
            'Love proved stronger than any dark magic.',
        ],
    },
    {
        id: 'lion-king',
        title: 'The Lion King',
        year: 1994,
        tag: 'Adventure',
        gradient: 'linear-gradient(135deg, #f59e0b 0%, #ea580c 50%, #7c2d12 100%)',
        emoji: '🦁',
        lines: [
            'A young prince fled from destiny,',
            'lost himself beneath the stars,',
            'and learned that running from who you are',
            'only delays the king within.',
        ],
    },
    {
        id: 'frozen',
        title: 'Frozen',
        year: 2013,
        tag: 'Love',
        gradient: 'linear-gradient(135deg, #38bdf8 0%, #818cf8 50%, #1e1b4b 100%)',
        emoji: '❄️',
        lines: [
            'A queen locked away her greatest gift,',
            'afraid of the storm inside.',
            'But when love thawed the deepest winter,',
            'she learned to let it go.',
        ],
    },
    {
        id: 'moana',
        title: 'Moana',
        year: 2016,
        tag: 'Discovery',
        gradient: 'linear-gradient(135deg, #0d9488 0%, #0284c7 50%, #0c4a6e 100%)',
        emoji: '🌊',
        lines: [
            'The ocean called to her soul,',
            'a voice older than the tides.',
            'She sailed beyond the reef alone',
            'and found who she was meant to be.',
        ],
    },
];

/* Floating sparkle particles behind the storybook */
function StorySparkles({ cinematic }) {
    const sparkles = Array.from({ length: 40 }).map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: 2 + Math.random() * 4,
        delay: Math.random() * 5,
        duration: 3 + Math.random() * 4,
    }));

    return (
        <div className={`stories__sparkles ${cinematic ? 'stories__sparkles--cinematic' : ''}`}>
            {sparkles.map((s) => (
                <div
                    key={s.id}
                    className="stories__sparkle"
                    style={{
                        left: s.left,
                        top: s.top,
                        width: `${s.size}px`,
                        height: `${s.size}px`,
                        animationDelay: `${s.delay}s`,
                        animationDuration: `${s.duration}s`,
                    }}
                />
            ))}
        </div>
    );
}

/* Slide animation variants */
const slideVariants = {
    enter: (direction) => ({
        x: direction > 0 ? 300 : -300,
        opacity: 0,
        scale: 0.92,
    }),
    center: {
        x: 0,
        opacity: 1,
        scale: 1,
        transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
    },
    exit: (direction) => ({
        x: direction > 0 ? -300 : 300,
        opacity: 0,
        scale: 0.92,
        transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
    }),
};

export default function StoriesSection() {
    const [[current, direction], setCurrent] = useState([0, 0]);
    const [cinematic, setCinematic] = useState(false);

    const paginate = useCallback(
        (dir) => {
            setCurrent(([prev]) => {
                const next = (prev + dir + STORIES.length) % STORIES.length;
                return [next, dir];
            });
        },
        []
    );

    const story = STORIES[current];

    return (
        <section
            className={`stories-section section ${cinematic ? 'stories-section--cinematic' : ''}`}
            id="stories"
        >
            <StorySparkles cinematic={cinematic} />

            <div className="section__container">
                {/* Section header */}
                <motion.div
                    className="section__header"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <p className="section__subtitle">Open the Pages</p>
                    <h2 className="section__title">The Stories That Shaped Us</h2>
                </motion.div>

                {/* Storybook carousel */}
                <div className="stories__carousel">
                    {/* Left arrow */}
                    <button
                        className="stories__arrow stories__arrow--left"
                        onClick={() => paginate(-1)}
                        aria-label="Previous story"
                    >
                        <ChevronLeft size={28} />
                    </button>

                    {/* Story card */}
                    <div className="stories__card-wrapper">
                        <AnimatePresence mode="wait" custom={direction}>
                            <motion.div
                                key={story.id}
                                className={`stories__card ${cinematic ? 'stories__card--cinematic' : ''}`}
                                custom={direction}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                            >
                                {/* Hero illustration area */}
                                <div
                                    className="stories__card-hero"
                                    style={{ background: story.gradient }}
                                >
                                    <span className="stories__card-emoji">{story.emoji}</span>
                                </div>

                                {/* Story content */}
                                <div className="stories__card-content">
                                    <div className="stories__card-meta">
                                        <span className="stories__card-year">{story.year}</span>
                                        <span className="stories__card-tag">{story.tag}</span>
                                    </div>

                                    <h3 className="stories__card-title">{story.title}</h3>

                                    <div className="stories__card-lines">
                                        {story.lines.map((line, i) => (
                                            <motion.p
                                                key={i}
                                                className="stories__card-line"
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.2 + i * 0.12, duration: 0.4 }}
                                            >
                                                {line}
                                            </motion.p>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Right arrow */}
                    <button
                        className="stories__arrow stories__arrow--right"
                        onClick={() => paginate(1)}
                        aria-label="Next story"
                    >
                        <ChevronRight size={28} />
                    </button>
                </div>

                {/* Dots + Cinematic toggle */}
                <div className="stories__controls">
                    <div className="stories__dots">
                        {STORIES.map((s, i) => (
                            <button
                                key={s.id}
                                className={`stories__dot ${i === current ? 'stories__dot--active' : ''}`}
                                onClick={() => setCurrent([i, i > current ? 1 : -1])}
                                aria-label={`Go to ${s.title}`}
                            />
                        ))}
                    </div>

                    <button
                        className={`stories__cinematic-btn ${cinematic ? 'stories__cinematic-btn--active' : ''}`}
                        onClick={() => setCinematic(!cinematic)}
                    >
                        <Sparkles size={14} />
                        <span>Cinematic</span>
                    </button>
                </div>
            </div>
        </section>
    );
}
