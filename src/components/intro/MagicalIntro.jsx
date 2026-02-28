import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import heroBg from '../../assets/hero-castle-bg.png';
import './MagicalIntro.css';

// Generate random sparkle particles
const generateParticles = (count) => {
    return Array.from({ length: count }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: Math.random() * 4 + 1,
        delay: Math.random() * 6,
        duration: Math.random() * 3 + 2,
    }));
};

// Generate stars
const generateStars = (count) => {
    return Array.from({ length: count }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 70}%`,
        size: Math.random() * 3 + 0.5,
        delay: Math.random() * 5,
        duration: Math.random() * 4 + 2,
        opacity: Math.random() * 0.7 + 0.3,
    }));
};

const particles = generateParticles(30);
const stars = generateStars(80);

export default function MagicalIntro() {
    const sectionRef = useRef(null);
    const castleRef = useRef(null);
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const ctaRef = useRef(null);
    const overlayRef = useRef(null);
    const [scrollY, setScrollY] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);

    // Parallax scroll handler
    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // GSAP entrance animation timeline
    useEffect(() => {
        const tl = gsap.timeline({ delay: 0.3 });

        // Fade in the background
        tl.fromTo(
            overlayRef.current,
            { opacity: 1 },
            { opacity: 0, duration: 2, ease: 'power2.out' }
        );

        // Castle rises up
        tl.fromTo(
            castleRef.current,
            { y: 80, opacity: 0, scale: 0.9, filter: 'blur(10px)' },
            { y: 0, opacity: 1, scale: 1, filter: 'blur(0px)', duration: 2, ease: 'power3.out' },
            '-=1.5'
        );

        // Title fades in with letter spacing animation
        tl.fromTo(
            titleRef.current,
            { y: 50, opacity: 0, letterSpacing: '0.3em' },
            { y: 0, opacity: 1, letterSpacing: '0.08em', duration: 1.2, ease: 'power2.out' },
            '-=1'
        );

        // Subtitle
        tl.fromTo(
            subtitleRef.current,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' },
            '-=0.6'
        );

        // CTA button
        tl.fromTo(
            ctaRef.current,
            { y: 20, opacity: 0, scale: 0.9 },
            { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.7)' },
            '-=0.4'
        );

        tl.call(() => setIsLoaded(true));

        return () => tl.kill();
    }, []);

    // Parallax calculations
    const castleParallaxY = scrollY * 0.3;
    const starsParallaxY = scrollY * 0.15;
    const titleParallaxY = scrollY * 0.5;
    const overlayOpacity = Math.min(scrollY / 600, 0.7);

    return (
        <section className="magical-intro" ref={sectionRef} id="magical-intro">
            {/* Loading overlay */}
            <div className="magical-intro__loading-overlay" ref={overlayRef} />

            {/* Night sky background with parallax */}
            <div
                className="magical-intro__sky"
                style={{ transform: `translateY(${starsParallaxY}px)` }}
            >
                {/* Static stars */}
                {stars.map((star) => (
                    <div
                        key={`star-${star.id}`}
                        className="magical-intro__star"
                        style={{
                            left: star.left,
                            top: star.top,
                            width: `${star.size}px`,
                            height: `${star.size}px`,
                            animationDelay: `${star.delay}s`,
                            animationDuration: `${star.duration}s`,
                            opacity: star.opacity,
                        }}
                    />
                ))}

                {/* Shooting stars */}
                <div className="magical-intro__shooting-star magical-intro__shooting-star--1" />
                <div className="magical-intro__shooting-star magical-intro__shooting-star--2" />
                <div className="magical-intro__shooting-star magical-intro__shooting-star--3" />
            </div>

            {/* Aurora / Nebula glow */}
            <div className="magical-intro__aurora" />

            {/* Hero background image */}
            <div
                className="magical-intro__bg-image"
                style={{
                    backgroundImage: `url(${heroBg})`,
                    transform: `translateY(${castleParallaxY * 0.5}px) scale(1.1)`,
                }}
            />

            {/* Castle silhouette with parallax */}
            <div
                className="magical-intro__castle-wrapper"
                ref={castleRef}
                style={{ transform: `translateY(${castleParallaxY}px)` }}
            >
                <img
                    src="/castle-silhouette.svg"
                    alt="Disney Castle"
                    className="magical-intro__castle"
                />
                {/* Castle glow */}
                <div className="magical-intro__castle-glow" />
            </div>

            {/* Floating sparkle particles */}
            <div className="magical-intro__particles">
                {particles.map((p) => (
                    <div
                        key={`particle-${p.id}`}
                        className="magical-intro__particle"
                        style={{
                            left: p.left,
                            top: p.top,
                            width: `${p.size}px`,
                            height: `${p.size}px`,
                            animationDelay: `${p.delay}s`,
                            animationDuration: `${p.duration + 3}s`,
                        }}
                    />
                ))}
            </div>

            {/* Main content */}
            <div
                className="magical-intro__content"
                style={{ transform: `translateY(${titleParallaxY}px)` }}
            >
                <p className="magical-intro__tagline script-text" ref={subtitleRef}>
                    Where Stories Come Alive
                </p>
                <h1 className="magical-intro__title" ref={titleRef}>
                    <span className="magical-intro__title-disney">Disney</span>
                    <span className="magical-intro__title-story">StoryWorld</span>
                </h1>
                <p className="magical-intro__description">
                    Step into a universe of wonder. Explore enchanted realms, meet beloved
                    characters, and discover the magic that has captivated hearts for a century.
                </p>
                <div className="magical-intro__cta-group" ref={ctaRef}>
                    <button
                        className="btn-magic btn-magic--primary magical-intro__cta"
                        onClick={() => {
                            const el = document.getElementById('realms');
                            if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }}
                    >
                        <span className="magical-intro__cta-sparkle">✦</span>
                        Enter the Magic
                        <span className="magical-intro__cta-sparkle">✦</span>
                    </button>
                    <button className="btn-magic btn-magic--ghost magical-intro__cta-secondary">
                        Watch Trailer
                    </button>
                </div>
            </div>

            {/* Scroll indicator */}
            {isLoaded && (
                <div className="magical-intro__scroll-indicator">
                    <div className="magical-intro__scroll-mouse">
                        <div className="magical-intro__scroll-wheel" />
                    </div>
                    <span className="magical-intro__scroll-text">Scroll to Explore</span>
                </div>
            )}

            {/* Bottom gradient overlay for section transition */}
            <div
                className="magical-intro__bottom-fade"
                style={{ opacity: 1 - overlayOpacity }}
            />
        </section>
    );
}
