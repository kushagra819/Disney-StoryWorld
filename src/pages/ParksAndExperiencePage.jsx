import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
    ArrowRight, Star, ChevronDown, Check,
    Wand2, Users, Rocket, Crown, Swords,
    Compass, Film, PartyPopper, RotateCcw
} from 'lucide-react';

/* ─── Local Data Structures ─── */
const PARKS = [
    {
        id: 'hollywood',
        name: 'Hollywood Studios',
        emoji: '🎬',
        accent: '#fbbf24',
        gradient: 'linear-gradient(135deg, #fbbf24 0%, #ef4444 100%)',
        tag: 'Cinematic',
    },
    {
        id: 'magic',
        name: 'Magic Kingdom',
        emoji: '🏰',
        accent: '#a78bfa',
        gradient: 'linear-gradient(135deg, #7c3aed 0%, #38bdf8 100%)',
        tag: 'Classic',
    },
    {
        id: 'epcot',
        name: 'Epcot',
        emoji: '🌍',
        accent: '#38bdf8',
        gradient: 'linear-gradient(135deg, #38bdf8 0%, #a78bfa 100%)',
        tag: 'Discovery',
    },
    {
        id: 'animal',
        name: 'Animal Kingdom',
        emoji: '🌳',
        accent: '#22c55e',
        gradient: 'linear-gradient(135deg, #22c55e 0%, #f59e0b 100%)',
        tag: 'Nature',
    },
];

const RIDES = [
    {
        title: 'Tower of Terror',
        emoji: '🕸️',
        accentColor: '#ef4444',
        desc: 'A spine-tingling drop into the haunted Hollywood Tower Hotel. Enter if you dare.',
    },
    {
        title: 'Star Tours',
        emoji: '🚀',
        accentColor: '#38bdf8',
        desc: 'Blast off on a hyper-speed galactic journey through a galaxy far, far away.',
    },
    {
        title: "Rock 'n' Roller Coaster",
        emoji: '🎸',
        accentColor: '#fbbf24',
        desc: "High-speed inversions synced to Aerosmith's greatest hits. Zero to 60 in 2.8 seconds.",
    },
];

const PLANNER_OPTIONS = {
    time: ['Morning', 'Afternoon', 'Night'],
    experience: ['Thrill', 'Family', 'Fantasy'],
    energy: ['Relaxed', 'Balanced', 'Adventurous'],
};

const PLANNER_RESULTS = {
    Morning: {
        Thrill: "Start with Tower of Terror before queues build. Grab a Mickey waffle on the way!",
        Family: "Catch the Disney Junior show, then a gentle ride on Toy Story Mania.",
        Fantasy: "Watch the park open ceremony, then explore the Sorcerer's hat plaza.",
    },
    Afternoon: {
        Thrill: "Rock 'n' Roller Coaster back-to-back, then Star Tours for the full rush.",
        Family: "Indiana Jones Stunt Show, followed by a cool-down at Jock Lindsey's.",
        Fantasy: "Wander Galaxy's Edge, take photos, and watch the grand stage show.",
    },
    Night: {
        Thrill: "Twilight Zone Tower of Terror at dusk — the view from the top is unmatched.",
        Family: "Fantasmic! at the waterfront amphitheatre — pure Disney storytelling magic.",
        Fantasy: "Stick around for the Wonderful World of Animation projection show.",
    },
};

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

/* ─── Sub-Components ─── */
function Sparkles({ count = 25 }) {
    return (
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
            {Array.from({ length: count }).map((_, i) => (
                <span
                    key={i}
                    style={{
                        position: 'absolute',
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        width: `${Math.random() * 3 + 1}px`,
                        height: `${Math.random() * 3 + 1}px`,
                        borderRadius: '50%',
                        background: 'white',
                        opacity: 0,
                        animation: `sparkle-pulse ${2 + Math.random() * 3}s ${Math.random() * 3}s infinite`,
                    }}
                />
            ))}
        </div>
    );
}

function MagicKingdomDetail() {
    const iframeRef = useRef(null);
    const inView = useInView(iframeRef, { once: true, margin: '-80px' });
    const [showIframe, setShowIframe] = useState(false);

    useEffect(() => {
        if (inView) setShowIframe(true);
    }, [inView]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            style={{ padding: '4rem 2rem', background: 'linear-gradient(180deg, #0a0118 0%, #1a0533 100%)' }}
        >
            <div style={{ maxWidth: 1200, margin: '0 auto' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'start' }}>
                    <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                        <p style={{ color: '#a78bfa', fontFamily: 'var(--font-script)', fontSize: '1.2rem', marginBottom: '0.5rem' }}>
                            Featured Park
                        </p>
                        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '1rem' }}>
                            Magic Kingdom
                        </h2>
                        <p style={{ color: 'rgba(248,248,255,0.7)', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                            The most-visited theme park on Earth, Magic Kingdom opened in 1971 as Walt Disney World's flagship experience.
                            Centred around the iconic Cinderella Castle, it is a living fairy tale spanning six enchanted lands.
                        </p>
                        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {[
                                'Home to Cinderella Castle — the enduring symbol of Disney magic worldwide',
                                'Six themed lands: Fantasyland, Tomorrowland, Adventureland and more',
                                'Nightly fireworks spectacular above the glittering castle spires',
                            ].map((point) => (
                                <li key={point} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                                    <Check size={16} color="#a78bfa" style={{ marginTop: 4, flexShrink: 0 }} />
                                    <span style={{ fontSize: '0.95rem', color: 'rgba(248,248,255,0.8)' }}>{point}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                        <p style={{
                            fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em',
                            textTransform: 'uppercase', color: '#a78bfa', marginBottom: '0.75rem'
                        }}>
                            ◈ Explore in 3D
                        </p>

                        <div
                            ref={iframeRef}
                            style={{
                                position: 'relative',
                                width: '100%',
                                aspectRatio: '16/9',
                                borderRadius: 'var(--radius-lg)',
                                overflow: 'hidden',
                                boxShadow: '0 0 0 1px rgba(167,139,250,0.3), 0 0 50px rgba(167,139,250,0.1)',
                            }}
                        >
                            {!showIframe ? (
                                <div style={{
                                    position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
                                    alignItems: 'center', justifyContent: 'center',
                                    background: 'linear-gradient(135deg, #7c3aed33, #a78bfa22)',
                                    backdropFilter: 'blur(20px)',
                                }}>
                                    <motion.div
                                        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 1, 0.5] }}
                                        transition={{ duration: 2.5, repeat: Infinity }}
                                        style={{ fontSize: '3rem', marginBottom: '1rem' }}
                                    >
                                        🏰
                                    </motion.div>
                                    <p style={{ fontFamily: 'var(--font-display)', fontSize: '1rem' }}>Loading 3D Experience…</p>
                                </div>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}
                                    style={{ position: 'absolute', inset: 0 }}
                                >
                                    <iframe
                                        title="Disney Cinderella Castle"
                                        frameBorder="0"
                                        allowFullScreen
                                        allow="autoplay; fullscreen; xr-spatial-tracking"
                                        src="https://sketchfab.com/models/24a4c7a325bc43b8ba3ce8a7e821dfea/embed?autostart=0&ui_theme=dark&preload=1"
                                        style={{ width: '100%', height: '100%', border: 'none' }}
                                    />
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}

function HollywoodDetail() {
    const iframeRef = useRef(null);
    const inView = useInView(iframeRef, { once: true, margin: '-80px' });
    const [showIframe, setShowIframe] = useState(false);

    useEffect(() => {
        if (inView) setShowIframe(true);
    }, [inView]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            style={{ padding: '4rem 2rem', background: 'linear-gradient(180deg, #0a0118 0%, #1a0533 100%)' }}
        >
            <div style={{ maxWidth: 1200, margin: '0 auto' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'start' }}>
                    <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                        <p style={{ color: 'var(--ds-enchanted-gold)', fontFamily: 'var(--font-script)', fontSize: '1.2rem', marginBottom: '0.5rem' }}>
                            Featured Park
                        </p>
                        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '1rem' }}>
                            Hollywood Studios
                        </h2>
                        <p style={{ color: 'rgba(248,248,255,0.7)', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                            A tribute to the golden age of cinema, Hollywood Studios invites guests into the heart of movie magic.
                            Born in 1989 as Disney-MGM Studios, it has evolved into a blockbuster destination where beloved films roar to life.
                        </p>
                        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {[
                                'Home to Galaxy\'s Edge — the most immersive Star Wars land ever built',
                                'Iconic Twilight Zone Tower of Terror with real randomized drop sequences',
                                'Live stunt shows and projection spectaculars every evening',
                            ].map((point) => (
                                <li key={point} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                                    <Check size={16} color="#fbbf24" style={{ marginTop: 4, flexShrink: 0 }} />
                                    <span style={{ fontSize: '0.95rem', color: 'rgba(248,248,255,0.8)' }}>{point}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                        <p style={{
                            fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em',
                            textTransform: 'uppercase', color: 'var(--ds-aurora-blue)', marginBottom: '0.75rem'
                        }}>
                            ◈ Explore in 3D
                        </p>

                        <div
                            ref={iframeRef}
                            style={{
                                position: 'relative',
                                width: '100%',
                                aspectRatio: '16/9',
                                borderRadius: 'var(--radius-lg)',
                                overflow: 'hidden',
                                boxShadow: '0 0 0 1px rgba(251,191,36,0.2), 0 0 40px rgba(251,191,36,0.08)',
                            }}
                        >
                            {!showIframe ? (
                                <div style={{
                                    position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
                                    alignItems: 'center', justifyContent: 'center',
                                    background: 'linear-gradient(135deg, #7c3aed33, #fbbf2433)',
                                    backdropFilter: 'blur(20px)',
                                }}>
                                    <motion.div
                                        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        style={{ fontSize: '3rem', marginBottom: '1rem' }}
                                    >
                                        🎬
                                    </motion.div>
                                    <p style={{ fontFamily: 'var(--font-display)', fontSize: '1rem' }}>Loading 3D Experience…</p>
                                </div>
                            ) : (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}
                                    style={{ position: 'absolute', inset: 0 }}
                                    className="sketchfab-embed-wrapper"
                                >
                                    <iframe
                                        title="Walt Disney Worlds Hollywood Studios Entrance"
                                        frameBorder="0"
                                        allowFullScreen
                                        allow="autoplay; fullscreen; xr-spatial-tracking"
                                        src="https://sketchfab.com/models/fd31d7c2bdb5407bbea14d70a26cec5a/embed?autostart=0&ui_theme=dark&preload=1"
                                        style={{ width: '100%', height: '100%', border: 'none' }}
                                    />
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}

/* ─── Main Integrated Page Component ─── */
export default function ParksAndExperiencePage() {
    // Experience Builder State
    const [currentStep, setCurrentStep] = useState(0);
    const [selections, setSelections] = useState({});
    const [showResult, setShowResult] = useState(false);
    const [confettiActive, setConfettiActive] = useState(false);

    // Park State
    const [selectedPark, setSelectedPark] = useState(null);
    const [plannerTime, setPlannerTime] = useState('Morning');
    const [plannerExp, setPlannerExp] = useState('Thrill');
    const [plannerEnergy, setPlannerEnergy] = useState('Balanced');

    const expRef = useRef(null);
    const gridRef = useRef(null);

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

    const resetExperience = () => {
        setCurrentStep(0);
        setSelections({});
        setShowResult(false);
    };

    const handleParkClick = (id) => {
        setSelectedPark(prev => (prev === id ? null : id));
        setTimeout(() => {
            document.getElementById('park-detail')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{ minHeight: '100vh', background: 'var(--ds-midnight)' }}
        >
            {/* ── Section A: Cinematic Intro ── */}
            <section style={{
                minHeight: '100vh', display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                position: 'relative', overflow: 'hidden',
                background: 'linear-gradient(180deg, #020024 0%, #0a0118 30%, #1a0533 70%, #2d1b69 100%)',
                paddingTop: 80,
            }}>
                <Sparkles count={35} />

                {/* Floating glow orbs */}
                <div style={{
                    position: 'absolute', top: '25%', left: '15%',
                    width: 300, height: 300, borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(124,58,237,0.12), transparent 70%)',
                    filter: 'blur(40px)', pointerEvents: 'none'
                }} />
                <div style={{
                    position: 'absolute', bottom: '20%', right: '10%',
                    width: 400, height: 400, borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(251,191,36,0.08), transparent 70%)',
                    filter: 'blur(60px)', pointerEvents: 'none'
                }} />

                <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '0 2rem', maxWidth: 800 }}>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        style={{ fontFamily: 'var(--font-script)', color: 'var(--ds-enchanted-gold)', fontSize: '1.4rem', marginBottom: '1rem' }}
                    >
                        Disney Parks & Experiences
                    </motion.p>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.15 }}
                        className="glow-gold"
                        style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: 'clamp(2.5rem, 7vw, 5.5rem)',
                            marginBottom: '1.5rem', lineHeight: 1.15,
                        }}
                    >
                        Where Magic<br />Comes to Life
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.3 }}
                        style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', color: 'rgba(248,248,255,0.65)', marginBottom: '2.5rem' }}
                    >
                        Step into unforgettable adventures across the world and build your perfect day.
                    </motion.p>

                    <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.45 }}
                        whileHover={{ scale: 1.07, y: -3 }}
                        whileTap={{ scale: 0.95 }}
                        className="btn-magic btn-magic--primary"
                        onClick={() => expRef.current?.scrollIntoView({ behavior: 'smooth' })}
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                    >
                        Start Your Journey <ArrowRight size={18} />
                    </motion.button>
                </div>

                {/* Scroll hint */}
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', opacity: 0.4 }}
                >
                    <ChevronDown size={24} color="white" />
                </motion.div>
            </section>

            {/* ── Section B: The Interactive Experience Builder ── */}
            <section ref={expRef} style={{ padding: '6rem 2rem', position: 'relative', overflow: 'hidden', background: '#0a0118' }}>
                <div style={{
                    position: 'absolute', inset: 0,
                    background: 'radial-gradient(ellipse at 30% 50%, rgba(168,85,247,0.08) 0%, transparent 60%)',
                    pointerEvents: 'none'
                }} />

                <div className="section__container" style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
                    <div className="section__header">
                        <p className="section__subtitle">Interactive Builder</p>
                        <h2 className="section__title">Build Your Magical Day</h2>
                        <p className="section__desc">Design your perfect Disney adventure in 3 easy steps before exploring the parks.</p>
                    </div>

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

                                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem' }}>
                                        <motion.button
                                            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                                            onClick={resetExperience}
                                            className="btn-magic btn-magic--ghost"
                                            style={{ display: 'inline-flex', gap: '0.5rem' }}
                                        >
                                            <RotateCcw size={16} /> Try Again
                                        </motion.button>
                                        <motion.button
                                            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                                            onClick={() => gridRef.current?.scrollIntoView({ behavior: 'smooth' })}
                                            className="btn-magic btn-magic--primary"
                                        >
                                            Explore Parks Below
                                        </motion.button>
                                    </div>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </section>

            {/* ── Section C: Park Explorer Grid ── */}
            <section ref={gridRef} style={{ padding: '6rem 2rem', background: 'var(--ds-midnight)', position: 'relative' }}>
                <div style={{ maxWidth: 1200, margin: '0 auto' }}>
                    <div className="section__header">
                        <p className="section__subtitle">Choose Your Adventure</p>
                        <h2 className="section__title">Explore the Parks</h2>
                        <p className="section__desc">Click a park to dive deeper into its magic.</p>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                        gap: '1.5rem',
                        marginTop: '3rem',
                    }}>
                        {PARKS.map((park, i) => {
                            const isActive = selectedPark === park.id;
                            return (
                                <motion.button
                                    key={park.id}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1, duration: 0.5 }}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.97 }}
                                    onClick={() => handleParkClick(park.id)}
                                    style={{
                                        padding: '2rem 1.5rem',
                                        borderRadius: 'var(--radius-lg)',
                                        background: isActive
                                            ? `linear-gradient(135deg, ${park.accent}22, ${park.accent}11)`
                                            : 'rgba(255,255,255,0.04)',
                                        backdropFilter: 'blur(20px)',
                                        border: `1px solid ${isActive ? park.accent : 'rgba(255,255,255,0.08)'}`,
                                        boxShadow: isActive ? `0 0 30px ${park.accent}33, inset 0 0 20px ${park.accent}08` : 'none',
                                        cursor: 'pointer',
                                        textAlign: 'left',
                                        transition: 'box-shadow 0.4s, border-color 0.4s, background 0.4s',
                                        position: 'relative',
                                        overflow: 'hidden',
                                    }}
                                >
                                    {/* Gradient top bar */}
                                    <div style={{
                                        position: 'absolute', top: 0, left: 0, right: 0, height: 3,
                                        background: park.gradient, opacity: isActive ? 1 : 0.4,
                                        transition: 'opacity 0.3s',
                                    }} />

                                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{park.emoji}</div>
                                    <span style={{
                                        display: 'inline-block', fontSize: '0.7rem', fontWeight: 700,
                                        letterSpacing: '0.12em', textTransform: 'uppercase',
                                        color: park.accent, marginBottom: '0.5rem',
                                    }}>
                                        {park.tag}
                                    </span>
                                    <h3 style={{
                                        fontFamily: 'var(--font-display)', fontSize: '1.4rem',
                                        color: 'var(--ds-ghost)', margin: 0,
                                    }}>
                                        {park.name}
                                    </h3>
                                    <p style={{ fontSize: '0.8rem', color: 'rgba(248,248,255,0.5)', marginTop: '0.4rem' }}>
                                        {isActive ? 'Viewing details ↓' : 'Click to explore'}
                                    </p>
                                </motion.button>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ── Section D: Park Detail Panel ── */}
            <div id="park-detail">
                <AnimatePresence mode="wait">
                    {selectedPark === 'hollywood' && (
                        <motion.div key="hollywood-detail">
                            <HollywoodDetail />

                            {/* Ride Highlights */}
                            <section style={{ padding: '5rem 2rem', background: 'var(--ds-deep-purple)' }}>
                                <div style={{ maxWidth: 1100, margin: '0 auto' }}>
                                    <div className="section__header">
                                        <p className="section__subtitle">Feel the Rush</p>
                                        <h2 className="section__title">Top Rides</h2>
                                    </div>

                                    <div style={{
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                                        gap: '1.5rem', marginTop: '3rem',
                                    }}>
                                        {RIDES.map((ride, i) => (
                                            <motion.div
                                                key={ride.title}
                                                initial={{ opacity: 0, y: 40 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true, margin: '-50px' }}
                                                transition={{ delay: i * 0.12, duration: 0.5 }}
                                                whileHover={{ y: -8 }}
                                                className="glass-strong"
                                                style={{
                                                    padding: '2rem', borderRadius: 'var(--radius-lg)',
                                                    textAlign: 'center',
                                                    border: `1px solid ${ride.accentColor}22`,
                                                    cursor: 'default',
                                                }}
                                            >
                                                <div style={{
                                                    fontSize: '3.5rem', marginBottom: '1rem',
                                                    filter: `drop-shadow(0 0 15px ${ride.accentColor})`
                                                }}>
                                                    {ride.emoji}
                                                </div>
                                                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', marginBottom: '0.75rem' }}>
                                                    {ride.title}
                                                </h3>
                                                <p style={{ fontSize: '0.9rem', color: 'rgba(248,248,255,0.65)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                                                    {ride.desc}
                                                </p>
                                                <button
                                                    className="btn-magic btn-magic--ghost"
                                                    style={{ fontSize: '0.8rem', padding: '0.5rem 1.25rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
                                                >
                                                    <Star size={13} /> Experience
                                                </button>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </section>

                            {/* Magical Day Planner */}
                            <section style={{ padding: '5rem 2rem', background: 'linear-gradient(180deg, #1a0533, #0a0118)' }}>
                                <div style={{ maxWidth: 700, margin: '0 auto' }}>
                                    <div className="section__header">
                                        <p className="section__subtitle">Your Perfect Day</p>
                                        <h2 className="section__title">Plan Your Visit</h2>
                                    </div>

                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.5rem', marginTop: '3rem' }}>
                                        {/* Time selector */}
                                        <div>
                                            <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.85rem', marginBottom: '0.75rem', color: 'var(--ds-enchanted-gold)' }}>
                                                🕐 Time of Visit
                                            </p>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                                {PLANNER_OPTIONS.time.map(opt => (
                                                    <button
                                                        key={opt}
                                                        onClick={() => setPlannerTime(opt)}
                                                        style={{
                                                            padding: '0.6rem 1rem', borderRadius: 'var(--radius-sm)', cursor: 'pointer',
                                                            background: plannerTime === opt ? 'rgba(251,191,36,0.15)' : 'rgba(255,255,255,0.04)',
                                                            border: `1px solid ${plannerTime === opt ? '#fbbf24' : 'rgba(255,255,255,0.1)'}`,
                                                            color: plannerTime === opt ? '#fbbf24' : 'rgba(248,248,255,0.7)',
                                                            fontFamily: 'var(--font-body)', fontSize: '0.9rem', textAlign: 'left',
                                                            transition: 'all 0.2s',
                                                        }}
                                                    >
                                                        {opt}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Experience selector */}
                                        <div>
                                            <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.85rem', marginBottom: '0.75rem', color: 'var(--ds-fairy-pink)' }}>
                                                🎭 Experience Type
                                            </p>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                                {PLANNER_OPTIONS.experience.map(opt => (
                                                    <button
                                                        key={opt}
                                                        onClick={() => setPlannerExp(opt)}
                                                        style={{
                                                            padding: '0.6rem 1rem', borderRadius: 'var(--radius-sm)', cursor: 'pointer',
                                                            background: plannerExp === opt ? 'rgba(244,114,182,0.15)' : 'rgba(255,255,255,0.04)',
                                                            border: `1px solid ${plannerExp === opt ? '#f472b6' : 'rgba(255,255,255,0.1)'}`,
                                                            color: plannerExp === opt ? '#f472b6' : 'rgba(248,248,255,0.7)',
                                                            fontFamily: 'var(--font-body)', fontSize: '0.9rem', textAlign: 'left',
                                                            transition: 'all 0.2s',
                                                        }}
                                                    >
                                                        {opt}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Energy selector */}
                                        <div>
                                            <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.85rem', marginBottom: '0.75rem', color: 'var(--ds-aurora-blue)' }}>
                                                ⚡ Energy Level
                                            </p>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                                {PLANNER_OPTIONS.energy.map(opt => (
                                                    <button
                                                        key={opt}
                                                        onClick={() => setPlannerEnergy(opt)}
                                                        style={{
                                                            padding: '0.6rem 1rem', borderRadius: 'var(--radius-sm)', cursor: 'pointer',
                                                            background: plannerEnergy === opt ? 'rgba(56,189,248,0.15)' : 'rgba(255,255,255,0.04)',
                                                            border: `1px solid ${plannerEnergy === opt ? '#38bdf8' : 'rgba(255,255,255,0.1)'}`,
                                                            color: plannerEnergy === opt ? '#38bdf8' : 'rgba(248,248,255,0.7)',
                                                            fontFamily: 'var(--font-body)', fontSize: '0.9rem', textAlign: 'left',
                                                            transition: 'all 0.2s',
                                                        }}
                                                    >
                                                        {opt}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Result card */}
                                    <motion.div
                                        key={`${plannerTime}-${plannerExp}-${plannerEnergy}`}
                                        initial={{ opacity: 0, scale: 0.96 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.4 }}
                                        className="glass-strong"
                                        style={{
                                            marginTop: '2.5rem', padding: '2rem',
                                            borderRadius: 'var(--radius-lg)',
                                            border: '1px solid rgba(251,191,36,0.2)',
                                            boxShadow: '0 0 40px rgba(251,191,36,0.06)',
                                        }}
                                    >
                                        <h3 className="glow-gold" style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', marginBottom: '1rem' }}>
                                            ✨ Your Ideal Hollywood Studios Adventure Includes…
                                        </h3>
                                        <p style={{ color: 'rgba(248,248,255,0.8)', lineHeight: 1.8 }}>
                                            {(PLANNER_RESULTS[plannerTime]?.[plannerExp]) || `A ${plannerEnergy.toLowerCase()} ${plannerTime.toLowerCase()} of ${plannerExp.toLowerCase()} experiences across Hollywood Studios.`}
                                        </p>
                                        <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                            {[plannerTime, plannerExp, plannerEnergy].map(tag => (
                                                <span key={tag} style={{
                                                    fontSize: '0.75rem', padding: '3px 10px', borderRadius: '20px',
                                                    background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.6)',
                                                    fontWeight: 600, letterSpacing: '0.04em'
                                                }}>
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </motion.div>
                                </div>
                            </section>
                        </motion.div>
                    )}

                    {/* Magic Kingdom */}
                    {selectedPark === 'magic' && (
                        <motion.div key="magic-detail">
                            <MagicKingdomDetail />
                        </motion.div>
                    )}

                    {/* Placeholder for Epcot & Animal Kingdom */}
                    {selectedPark && selectedPark !== 'hollywood' && selectedPark !== 'magic' && (
                        <motion.div
                            key="placeholder-detail"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                            style={{
                                textAlign: 'center', padding: '5rem 2rem',
                                background: 'linear-gradient(180deg, #0a0118, #1a0533)',
                            }}
                        >
                            <div style={{ fontSize: '5rem', marginBottom: '1.5rem' }}>
                                {PARKS.find(p => p.id === selectedPark)?.emoji}
                            </div>
                            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', marginBottom: '1rem' }}>
                                {PARKS.find(p => p.id === selectedPark)?.name}
                            </h2>
                            <p style={{ color: 'rgba(248,248,255,0.5)', fontSize: '1.1rem', maxWidth: 500, margin: '0 auto 2rem' }}>
                                Full immersive experience coming soon. Explore Hollywood Studios or Magic Kingdom above!
                            </p>
                            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                                <button className="btn-magic btn-magic--ghost" onClick={() => handleParkClick('hollywood')}>
                                    🎬 Hollywood Studios
                                </button>
                                <button className="btn-magic btn-magic--ghost" onClick={() => handleParkClick('magic')}>
                                    🏰 Magic Kingdom
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}
