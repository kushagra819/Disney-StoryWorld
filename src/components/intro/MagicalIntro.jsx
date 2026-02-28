import { useEffect, useRef, useState, Suspense } from 'react';
import { gsap } from 'gsap';
import CastleScene from './CastleScene';
import './MagicalIntro.css';

export default function MagicalIntro() {
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const ctaRef = useRef(null);
    const overlayRef = useRef(null);
    const scrollProgressRef = useRef(0);
    const [isLoaded, setIsLoaded] = useState(false);

    // Track scroll and compute progress (0 → 1) over the intro section height
    useEffect(() => {
        const handleScroll = () => {
            if (!sectionRef.current) return;
            const rect = sectionRef.current.getBoundingClientRect();
            const sectionHeight = sectionRef.current.offsetHeight;
            // Progress: 0 at top, 1 when fully scrolled past
            const rawProgress = -rect.top / sectionHeight;
            scrollProgressRef.current = Math.max(0, Math.min(rawProgress, 1));
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // GSAP entrance animation
    useEffect(() => {
        const tl = gsap.timeline({ delay: 0.5 });

        tl.fromTo(
            overlayRef.current,
            { opacity: 1 },
            { opacity: 0, duration: 2, ease: 'power2.out' }
        );

        tl.fromTo(
            titleRef.current,
            { y: 60, opacity: 0, letterSpacing: '0.4em' },
            { y: 0, opacity: 1, letterSpacing: '0.08em', duration: 1.4, ease: 'power2.out' },
            '-=1.2'
        );

        tl.fromTo(
            subtitleRef.current,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' },
            '-=0.6'
        );

        tl.fromTo(
            ctaRef.current,
            { y: 20, opacity: 0, scale: 0.9 },
            { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.7)' },
            '-=0.4'
        );

        tl.call(() => setIsLoaded(true));
        return () => tl.kill();
    }, []);

    return (
        <section
            className="magical-intro"
            ref={sectionRef}
            id="magical-intro"
            style={{ height: '300vh' }} /* Extended height for scroll room */
        >
            {/* Loading overlay */}
            <div className="magical-intro__loading-overlay" ref={overlayRef} />

            {/* Sticky container — stays on screen while user scrolls */}
            <div className="magical-intro__sticky">
                {/* 3D Castle Canvas */}
                <Suspense fallback={
                    <div className="magical-intro__loader">
                        <div className="magical-intro__loader-spinner" />
                        <p>Entering the Magic...</p>
                    </div>
                }>
                    <CastleScene scrollProgress={scrollProgressRef} />
                </Suspense>

                {/* UI Overlay on top of 3D scene */}
                <div className="magical-intro__content">
                    <p className="magical-intro__tagline script-text" ref={subtitleRef}>
                        Where Stories Come Alive
                    </p>
                    <h1 className="magical-intro__title" ref={titleRef}>
                        <span className="magical-intro__title-disney">Disney</span>
                        <span className="magical-intro__title-story">StoryWorld</span>
                    </h1>
                    <p className="magical-intro__description">
                        Scroll to approach the enchanted castle and unlock the magic within.
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
                    </div>
                </div>

                {/* Scroll hint */}
                {isLoaded && (
                    <div className="magical-intro__scroll-indicator">
                        <div className="magical-intro__scroll-mouse">
                            <div className="magical-intro__scroll-wheel" />
                        </div>
                        <span className="magical-intro__scroll-text">Scroll to Approach the Castle</span>
                    </div>
                )}
            </div>
        </section>
    );
}
