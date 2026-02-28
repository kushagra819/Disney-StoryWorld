import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import princessesImg from '../../assets/realms/princesses.png';
import starwarsImg from '../../assets/realms/starwars.png';
import pixarImg from '../../assets/realms/pixar.png';
import marvelImg from '../../assets/realms/marvel.png';
import './RealmSelection.css';

const REALMS = [
    {
        id: 'princesses',
        title: 'Princesses',
        subtitle: 'Enchanted Kingdoms',
        description: 'Step into fairytale worlds of courage, kindness, and magic.',
        image: princessesImg,
        gradient: 'linear-gradient(135deg, #ec4899, #a855f7)',
        accent: '#f472b6',
        tag: '✨ Classic',
    },
    {
        id: 'starwars',
        title: 'Star Wars',
        subtitle: 'A Galaxy Far Away',
        description: 'Master the Force and explore the farthest reaches of the galaxy.',
        image: starwarsImg,
        gradient: 'linear-gradient(135deg, #3b82f6, #1e3a5f)',
        accent: '#38bdf8',
        tag: '⚔️ Epic',
    },
    {
        id: 'pixar',
        title: 'Pixar',
        subtitle: 'Worlds of Wonder',
        description: 'Adventure awaits in vibrant worlds where imagination has no limits.',
        image: pixarImg,
        gradient: 'linear-gradient(135deg, #f59e0b, #ef4444)',
        accent: '#fbbf24',
        tag: '🎬 Animated',
    },
    {
        id: 'marvel',
        title: 'Marvel',
        subtitle: 'Heroic Universe',
        description: 'Assemble with legendary heroes and face the mightiest villains.',
        image: marvelImg,
        gradient: 'linear-gradient(135deg, #dc2626, #f59e0b)',
        accent: '#ef4444',
        tag: '🦸 Heroes',
    },
];

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.15,
        },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.92 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.6, ease: [0.34, 1.56, 0.64, 1] },
    },
};

function RealmCard({ realm, index }) {
    return (
        <motion.div
            className="realm-card"
            variants={cardVariants}
            whileHover={{
                scale: 1.05,
                y: -12,
                transition: { duration: 0.3, ease: [0.34, 1.56, 0.64, 1] },
            }}
            whileTap={{ scale: 0.97 }}
            style={{ '--accent': realm.accent }}
        >
            {/* Card image */}
            <div className="realm-card__image-wrapper">
                <img
                    src={realm.image}
                    alt={realm.title}
                    className="realm-card__image"
                    loading="lazy"
                />
                <div
                    className="realm-card__image-overlay"
                    style={{ background: realm.gradient, opacity: 0.3 }}
                />
                {/* Tag badge */}
                <span className="realm-card__tag">{realm.tag}</span>
            </div>

            {/* Card content */}
            <div className="realm-card__content">
                <h3 className="realm-card__title">{realm.title}</h3>
                <p className="realm-card__subtitle">{realm.subtitle}</p>
                <p className="realm-card__desc">{realm.description}</p>

                {/* Hover reveal button */}
                <div className="realm-card__action">
                    <span className="realm-card__explore">
                        Explore Realm →
                    </span>
                </div>
            </div>

            {/* Glow ring on hover */}
            <div
                className="realm-card__glow"
                style={{ background: `radial-gradient(circle, ${realm.accent}33, transparent 70%)` }}
            />
        </motion.div>
    );
}

export default function RealmSelection() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

    return (
        <section className="realm-selection section" id="realms" ref={sectionRef}>
            {/* Background decoration */}
            <div className="realm-selection__bg-glow" />

            <div className="section__container">
                {/* Section header */}
                <motion.div
                    className="section__header"
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                >
                    <p className="section__subtitle">Choose Your Destiny</p>
                    <h2 className="section__title">Explore the Realms</h2>
                    <p className="section__desc">
                        Journey into enchanted worlds where magic is real and every story awaits your discovery.
                    </p>
                </motion.div>

                {/* Realm cards grid */}
                <motion.div
                    className="realm-selection__grid"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                >
                    {REALMS.map((realm, i) => (
                        <RealmCard key={realm.id} realm={realm} index={i} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
