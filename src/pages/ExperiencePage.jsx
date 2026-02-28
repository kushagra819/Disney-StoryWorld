import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Wand2, Users, Rocket, Crown, Swords, Compass, Film, PartyPopper, ArrowRight, RotateCcw } from 'lucide-react';

const STEPS = [
    {
        title: 'Choose Your World',
        subtitle: 'Where will your adventure begin?',
        options: [
            { id: 'fantasy', label: 'Fantasy', emoji: '🏰', color: '#a855f7', icon: Crown },
            { id: 'adventure', label: 'Adventure', emoji: '🗺️', color: '#22c55e', icon: Compass },
            { id: 'space', label: 'Space', emoji: '🚀', color: '#3b82f6', icon: Rocket },
            { id: 'ocean', label: 'Ocean', emoji: '🌊', color: '#06b6d4', icon: Wand2 },
        ]
    },
    {
        title: 'Choose Your Character',
        subtitle: 'Who will you become?',
        options: [
            { id: 'hero', label: 'Hero', emoji: '🦸', color: '#ef4444', icon: Swords },
            { id: 'princess', label: 'Princess', emoji: '👑', color: '#ec4899', icon: Crown },
            { id: 'explorer', label: 'Explorer', emoji: '🧭', color: '#f59e0b', icon: Compass },
            { id: 'villain', label: 'Villain', emoji: '🦹', color: '#8b5cf6', icon: Users },
        ]
    },
    {
        title: 'Choose Your Activity',
        subtitle: 'What will you do first?',
        options: [
            { id: 'ride', label: 'Ride', emoji: '🎢', color: '#f43f5e', icon: Rocket },
            { id: 'movie', label: 'Movie Night', emoji: '🎬', color: '#6366f1', icon: Film },
            { id: 'quest', label: 'Quest', emoji: '⚔️', color: '#14b8a6', icon: Swords },
            { id: 'festival', label: 'Festival', emoji: '🎪', color: '#f97316', icon: PartyPopper },
        ]
    }
];

const RESULT_TEXTS = {
    fantasy: 'the Enchanted Kingdom',
    adventure: 'the Wild Frontier',
    space: 'the Cosmic Station',
    ocean: 'the Coral Palace',
    hero: 'a brave Hero',
    princess: 'a graceful Princess',
    explorer: 'a daring Explorer',
    villain: 'a mysterious Villain',
    ride: 'an epic ride through the stars',
    movie: 'a private premiere under the moonlight',
    quest: 'a legendary quest for hidden treasure',
    festival: 'the Grand Festival of Lights',
};

export default function ExperiencePage() {
    const [currentStep, setCurrentStep] = useState(0);
    const [selections, setSelections] = useState({});
    const [showResult, setShowResult] = useState(false);
    const [confettiActive, setConfettiActive] = useState(false);

    const handleSelect = (stepIdx, optionId) => {
        const newSelections = { ...selections, [stepIdx]: optionId };
        setSelections(newSelections);

        if (stepIdx < STEPS.length - 1) {
            setTimeout(() => setCurrentStep(stepIdx + 1), 400);
        } else {
            setTimeout(() => {
                setShowResult(true);
                setConfettiActive(true);
                setTimeout(() => setConfettiActive(false), 3000);
            }, 400);
        }
    };

    const reset = () => {
        setCurrentStep(0);
        setSelections({});
        setShowResult(false);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{ minHeight: '100vh', paddingTop: '100px', position: 'relative', overflow: 'hidden' }}
        >
            <div style={{
                position: 'absolute', inset: 0,
                background: 'radial-gradient(ellipse at 30% 50%, rgba(168,85,247,0.08) 0%, transparent 60%)',
                pointerEvents: 'none'
            }} />

            <div className="section__container" style={{ padding: '0 2rem', maxWidth: '800px', margin: '0 auto' }}>
                <div className="section__header">
                    <p className="section__subtitle">Interactive Builder</p>
                    <h2 className="section__title">Build Your Magical Day</h2>
                    <p className="section__desc">Design your perfect Disney adventure in 3 easy steps.</p>
                </div>

                {/* Progress Bar */}
                {!showResult && (
                    <div style={{
                        display: 'flex', gap: '0.5rem', marginBottom: '3rem',
                        maxWidth: '400px', margin: '0 auto 3rem'
                    }}>
                        {STEPS.map((_, i) => (
                            <div key={i} style={{
                                flex: 1, height: '4px', borderRadius: '2px',
                                background: i <= currentStep ? 'var(--grad-aurora)' : 'rgba(255,255,255,0.1)',
                                transition: 'background 0.5s',
                                boxShadow: i <= currentStep ? '0 0 10px rgba(124,58,237,0.5)' : 'none'
                            }} />
                        ))}
                    </div>
                )}

                <AnimatePresence mode="wait">
                    {!showResult ? (
                        <motion.div
                            key={currentStep}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.4 }}
                        >
                            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                                <h3 style={{
                                    fontFamily: 'var(--font-display)', fontSize: '1.8rem',
                                    marginBottom: '0.5rem'
                                }}>
                                    {STEPS[currentStep].title}
                                </h3>
                                <p style={{ color: 'rgba(248,248,255,0.6)' }}>
                                    {STEPS[currentStep].subtitle}
                                </p>
                            </div>

                            <div style={{
                                display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)',
                                gap: '1.5rem'
                            }}>
                                {STEPS[currentStep].options.map((opt) => {
                                    const Icon = opt.icon;
                                    const isSelected = selections[currentStep] === opt.id;
                                    return (
                                        <motion.button
                                            key={opt.id}
                                            whileHover={{ scale: 1.05, y: -5 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => handleSelect(currentStep, opt.id)}
                                            className="glass"
                                            style={{
                                                padding: '2rem', textAlign: 'center',
                                                borderRadius: 'var(--radius-lg)', cursor: 'pointer',
                                                border: isSelected ? `2px solid ${opt.color}` : '1px solid rgba(255,255,255,0.08)',
                                                boxShadow: isSelected ? `0 0 30px ${opt.color}44` : 'none',
                                                transition: 'all 0.3s'
                                            }}
                                        >
                                            <div style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>{opt.emoji}</div>
                                            <div style={{
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                gap: '0.5rem'
                                            }}>
                                                <Icon size={16} color={opt.color} />
                                                <span style={{
                                                    fontFamily: 'var(--font-display)',
                                                    fontSize: '1.1rem', fontWeight: 600
                                                }}>
                                                    {opt.label}
                                                </span>
                                            </div>
                                        </motion.button>
                                    );
                                })}
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="result"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
                            style={{ textAlign: 'center' }}
                        >
                            {/* Confetti */}
                            {confettiActive && (
                                <div style={{
                                    position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 100
                                }}>
                                    {Array.from({ length: 50 }).map((_, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{
                                                x: '50vw', y: '30vh', scale: 0,
                                                rotate: Math.random() * 360
                                            }}
                                            animate={{
                                                x: `${Math.random() * 100}vw`,
                                                y: `${Math.random() * 100}vh`,
                                                scale: [0, 1.5, 0], rotate: Math.random() * 720,
                                                opacity: [1, 1, 0]
                                            }}
                                            transition={{ duration: 2 + Math.random() * 2, ease: 'easeOut' }}
                                            style={{
                                                position: 'absolute', width: '10px', height: '10px',
                                                borderRadius: Math.random() > 0.5 ? '50%' : '2px',
                                                background: ['#fbbf24', '#f472b6', '#38bdf8', '#a855f7', '#22c55e', '#ef4444'][i % 6]
                                            }}
                                        />
                                    ))}
                                </div>
                            )}

                            <motion.div
                                className="glass-strong"
                                style={{
                                    padding: '3rem', borderRadius: 'var(--radius-lg)',
                                    maxWidth: '600px', margin: '0 auto',
                                    border: '1px solid rgba(251,191,36,0.3)',
                                    boxShadow: '0 0 60px rgba(251,191,36,0.1)'
                                }}
                            >
                                <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>✨🏰✨</div>
                                <h3 className="glow-gold" style={{
                                    fontFamily: 'var(--font-display)', fontSize: '2rem',
                                    marginBottom: '1.5rem'
                                }}>
                                    Your Magical Day Plan
                                </h3>
                                <p style={{
                                    fontSize: '1.15rem', lineHeight: 2,
                                    color: 'rgba(248,248,255,0.85)'
                                }}>
                                    You will journey to <strong style={{ color: 'var(--ds-enchanted-gold)' }}>
                                        {RESULT_TEXTS[selections[0]] || 'a magical realm'}
                                    </strong> as <strong style={{ color: 'var(--ds-fairy-pink)' }}>
                                        {RESULT_TEXTS[selections[1]] || 'a mystery character'}
                                    </strong> and enjoy <strong style={{ color: 'var(--ds-aurora-blue)' }}>
                                        {RESULT_TEXTS[selections[2]] || 'an amazing experience'}
                                    </strong>.
                                </p>

                                <motion.button
                                    whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                                    onClick={reset}
                                    className="btn-magic btn-magic--ghost"
                                    style={{ marginTop: '2rem', display: 'inline-flex', gap: '0.5rem' }}
                                >
                                    <RotateCcw size={16} /> Try Again
                                </motion.button>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}
