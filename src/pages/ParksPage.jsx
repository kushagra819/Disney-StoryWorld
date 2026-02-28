import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ArrowRight, Star, ChevronDown, Check } from 'lucide-react';

/* ─── Data ───────────────────────────────────────────────────── */
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

/* ─── Floating sparkle bg (pure CSS-animated) ───────────────── */
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

/* ─── Section 3: Hollywood Detail ───────────────────────────── */
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
                {/* Grid: description left | 3D right */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'start' }}>
                    {/* Left */}
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

                    {/* Right — 3D embed */}
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

                        <p style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)', textAlign: 'center' }}>
                            3D model by{' '}
                            <a
                                href="https://sketchfab.com/waltsdigitalworld"
                                target="_blank"
                                rel="nofollow noreferrer"
                                style={{ color: '#1CAAD9', fontWeight: 700 }}
                            >
                                Walt's Digital World
                            </a>{' '}
                            on Sketchfab
                        </p>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}

/* ─── Epcot Detail ───────────────────────────── */
function EpcotDetail() {
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
                        <p style={{ color: '#38bdf8', fontFamily: 'var(--font-script)', fontSize: '1.2rem', marginBottom: '0.5rem' }}>
                            Featured Park
                        </p>
                        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '1rem' }}>
                            Epcot
                        </h2>
                        <p style={{ color: 'rgba(248,248,255,0.7)', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                            A celebration of human achievement, international culture, and technological innovation. Epcot allows guests to travel the world and explore the wonders of the future all in one place.
                        </p>
                        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {[
                                'Iconic Spaceship Earth geosphere serving as the park\'s centerpiece',
                                'World Showcase featuring pavilions from 11 different countries',
                                'Thrilling new experiences like Guardians of the Galaxy: Cosmic Rewind',
                            ].map((point) => (
                                <li key={point} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                                    <Check size={16} color="#38bdf8" style={{ marginTop: 4, flexShrink: 0 }} />
                                    <span style={{ fontSize: '0.95rem', color: 'rgba(248,248,255,0.8)' }}>{point}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                        <p style={{
                            fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em',
                            textTransform: 'uppercase', color: '#38bdf8', marginBottom: '0.75rem'
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
                                boxShadow: '0 0 0 1px rgba(56,189,248,0.2), 0 0 40px rgba(56,189,248,0.08)',
                            }}
                        >
                            {!showIframe ? (
                                <div style={{
                                    position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
                                    alignItems: 'center', justifyContent: 'center',
                                    background: 'linear-gradient(135deg, #0284c733, #38bdf833)',
                                    backdropFilter: 'blur(20px)',
                                }}>
                                    <motion.div
                                        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        style={{ fontSize: '3rem', marginBottom: '1rem' }}
                                    >
                                        🌍
                                    </motion.div>
                                    <p style={{ fontFamily: 'var(--font-display)', fontSize: '1rem' }}>Loading 3D Experience…</p>
                                </div>
                            ) : (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}
                                    style={{ position: 'absolute', inset: 0 }}
                                    className="sketchfab-embed-wrapper"
                                >
                                    <iframe
                                        title="Epcot Futureworld - Disney World Theme Park - VR"
                                        frameBorder="0"
                                        allowFullScreen
                                        allow="autoplay; fullscreen; xr-spatial-tracking"
                                        src="https://sketchfab.com/models/39025bfd4c6e48daaa3c3544473870b4/embed?autostart=0&ui_theme=dark&preload=1"
                                        style={{ width: '100%', height: '100%', border: 'none' }}
                                    />
                                </motion.div>
                            )}
                        </div>
                        <p style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)', textAlign: 'center' }}>
                            <a href="https://sketchfab.com/3d-models/epcot-futureworld-disney-world-theme-park-vr-39025bfd4c6e48daaa3c3544473870b4" target="_blank" rel="nofollow noreferrer" style={{ color: '#1CAAD9', fontWeight: 700 }}> Epcot Futureworld </a> by <a href="https://sketchfab.com/LoneDeveloper" target="_blank" rel="nofollow noreferrer" style={{ color: '#1CAAD9', fontWeight: 700 }}> LoneDeveloper </a> on Sketchfab
                        </p>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}


/* ─── Animal Kingdom Detail ───────────────────────────── */
function AnimalKingdomDetail() {
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
                        <p style={{ color: '#22c55e', fontFamily: 'var(--font-script)', fontSize: '1.2rem', marginBottom: '0.5rem' }}>
                            Featured Park
                        </p>
                        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '1rem' }}>
                            Animal Kingdom
                        </h2>
                        <p style={{ color: 'rgba(248,248,255,0.7)', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                            Encounter exotic animals and exciting adventures at Disney's Animal Kingdom park, one of the largest animal theme parks in the world.
                        </p>
                        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {[
                                'Awe-inspiring Tree of Life towering 145 feet over the park',
                                'Expedition Everest: An exhilarating high-speed train ride through the Himalayas',
                                'Kilimanjaro Safaris: An open-air vehicle tour through a lush African savanna',
                            ].map((point) => (
                                <li key={point} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                                    <Check size={16} color="#22c55e" style={{ marginTop: 4, flexShrink: 0 }} />
                                    <span style={{ fontSize: '0.95rem', color: 'rgba(248,248,255,0.8)' }}>{point}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                        <p style={{
                            fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em',
                            textTransform: 'uppercase', color: '#22c55e', marginBottom: '0.75rem'
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
                                boxShadow: '0 0 0 1px rgba(34,197,94,0.2), 0 0 40px rgba(34,197,94,0.08)',
                            }}
                        >
                            {!showIframe ? (
                                <div style={{
                                    position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
                                    alignItems: 'center', justifyContent: 'center',
                                    background: 'linear-gradient(135deg, #15803d33, #22c55e33)',
                                    backdropFilter: 'blur(20px)',
                                }}>
                                    <motion.div
                                        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        style={{ fontSize: '3rem', marginBottom: '1rem' }}
                                    >
                                        🌳
                                    </motion.div>
                                    <p style={{ fontFamily: 'var(--font-display)', fontSize: '1rem' }}>Loading 3D Experience…</p>
                                </div>
                            ) : (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}
                                    style={{ position: 'absolute', inset: 0 }}
                                    className="sketchfab-embed-wrapper"
                                >
                                    <iframe
                                        title="Singapore Zoo"
                                        frameBorder="0"
                                        allowFullScreen
                                        allow="autoplay; fullscreen; xr-spatial-tracking"
                                        src="https://sketchfab.com/models/7cf34b58d72d4c8db4eb3abf39aa3d60/embed?autostart=0&ui_theme=dark&preload=1"
                                        style={{ width: '100%', height: '100%', border: 'none' }}
                                    />
                                </motion.div>
                            )}
                        </div>
                        <p style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)', textAlign: 'center' }}>
                            <a href="https://sketchfab.com/3d-models/singapore-zoo-7cf34b58d72d4c8db4eb3abf39aa3d60" target="_blank" rel="nofollow noreferrer" style={{ color: '#1CAAD9', fontWeight: 700 }}> Singapore Zoo </a> by <a href="https://sketchfab.com/patrick.young" target="_blank" rel="nofollow noreferrer" style={{ color: '#1CAAD9', fontWeight: 700 }}> patrick.young </a> on Sketchfab
                        </p>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}
/* ─── Main Page ──────────────────────────────────────────────── */
export default function ParksPage() {
    const [selectedPark, setSelectedPark] = useState(null);
    const [plannerTime, setPlannerTime] = useState('Morning');
    const [plannerExp, setPlannerExp] = useState('Thrill');
    const [plannerEnergy, setPlannerEnergy] = useState('Balanced');
    const gridRef = useRef(null);

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
            {/* ── Section 1: Cinematic Intro ── */}
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
                        Disney Parks
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
                        Step into unforgettable adventures across the world.
                    </motion.p>

                    <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.45 }}
                        whileHover={{ scale: 1.07, y: -3 }}
                        whileTap={{ scale: 0.95 }}
                        className="btn-magic btn-magic--primary"
                        onClick={() => gridRef.current?.scrollIntoView({ behavior: 'smooth' })}
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                    >
                        Explore The Parks <ArrowRight size={18} />
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

            {/* ── Section 2: Park Grid ── */}
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

            {/* ── Section 3&4&5: Detail Panel (Hollywood only is fully built) ── */}
            <div id="park-detail">
                <AnimatePresence mode="wait">
                    {selectedPark === 'hollywood' && (
                        <motion.div key="hollywood-detail">
                            <HollywoodDetail />
                        </motion.div>
                    )}
                    {selectedPark === 'magic' && (
                        <motion.div key="magic-detail">
                            <MagicKingdomDetail />
                        </motion.div>
                    )}

                    {selectedPark === 'epcot' && (
                        <motion.div key="epcot-detail">
                            <EpcotDetail />
                        </motion.div>
                    )}

                    {selectedPark === 'animal' && (
                        <motion.div key="animal-detail">
                            <AnimalKingdomDetail />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* ── Shared Content: Ride Highlights & Planner ── */}
                <AnimatePresence>
                    {selectedPark && (
                        <motion.div
                            key="shared-sections"
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 40 }}
                            transition={{ duration: 0.6 }}
                            style={{ position: 'relative', zIndex: 10 }}
                        >
                            {/* ── Section 4: Ride Highlights ── */}
                            <section style={{ padding: '5rem 2rem', background: 'var(--ds-deep-purple)' }}>
                                <div style={{ maxWidth: 1100, margin: '0 auto' }}>
                                    <div className="section__header">
                                        <p className="section__subtitle">Feel the Rush</p>
                                        <h2 className="section__title">Top Experiences</h2>
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

                            {/* ── Section 5: Magical Day Planner ── */}
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
                                        key={`${selectedPark}-${plannerTime}-${plannerExp}-${plannerEnergy}`}
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
                                            ✨ Your Ideal {PARKS.find(p => p.id === selectedPark)?.name} Adventure Includes…
                                        </h3>
                                        <p style={{ color: 'rgba(248,248,255,0.8)', lineHeight: 1.8 }}>
                                            {selectedPark === 'hollywood'
                                                ? (PLANNER_RESULTS[plannerTime]?.[plannerExp] || `A ${plannerEnergy.toLowerCase()} ${plannerTime.toLowerCase()} of ${plannerExp.toLowerCase()} experiences across ${PARKS.find(p => p.id === selectedPark)?.name}.`)
                                                : `A ${plannerEnergy.toLowerCase()} ${plannerTime.toLowerCase()} of ${plannerExp.toLowerCase()} experiences across ${PARKS.find(p => p.id === selectedPark)?.name}.`
                                            }
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
                </AnimatePresence>
            </div>
        </motion.div>
    );
}
