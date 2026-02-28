import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import './MagicalIntro.css';

export default function MagicalIntro() {
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const ctaRef = useRef(null);
    const descRef = useRef(null);
    const overlayRef = useRef(null);

    // GSAP entrance animation
    useEffect(() => {
        const tl = gsap.timeline({ delay: 0.3 });

        tl.fromTo(
            overlayRef.current,
            { opacity: 1 },
            { opacity: 0, duration: 1.5, ease: 'power2.out' }
        );

        tl.fromTo(
            subtitleRef.current,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' },
            '-=0.8'
        );

        tl.fromTo(
            titleRef.current,
            { y: 60, opacity: 0, letterSpacing: '0.4em' },
            { y: 0, opacity: 1, letterSpacing: '0.08em', duration: 1.2, ease: 'power2.out' },
            '-=0.5'
        );

        tl.fromTo(
            descRef.current,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' },
            '-=0.4'
        );

        tl.fromTo(
            ctaRef.current,
            { y: 20, opacity: 0, scale: 0.9 },
            { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.7)' },
            '-=0.3'
        );

        return () => tl.kill();
    }, []);

    return (
        <section className="magical-intro" id="magical-intro">
            {/* Loading overlay */}
            <div className="magical-intro__loading-overlay" ref={overlayRef} />

            {/* Background stars */}
            <div className="magical-intro__stars">
                {Array.from({ length: 60 }).map((_, i) => (
                    <div
                        key={i}
                        className="magical-intro__star"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 4}s`,
                            animationDuration: `${2 + Math.random() * 3}s`,
                            width: `${2 + Math.random() * 3}px`,
                            height: `${2 + Math.random() * 3}px`,
                        }}
                    />
                ))}
            </div>

            {/* Content */}
            <div className="magical-intro__content">
                <p className="magical-intro__tagline" ref={subtitleRef}>
                    Where Stories Come Alive
                </p>
                <h1 className="magical-intro__title" ref={titleRef}>
                    <span className="magical-intro__title-disney">Disney</span>
                    <span className="magical-intro__title-story">StoryWorld</span>
                </h1>
                <p className="magical-intro__description" ref={descRef}>
                    Step into an enchanted world of magic, wonder, and endless adventure.
                </p>
                <div className="magical-intro__cta-group" ref={ctaRef}>
                    <button
                        className="btn-magic btn-magic--primary magical-intro__cta"
                        onClick={() => {
                            const el = document.getElementById('castle');
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
            <div className="magical-intro__scroll-indicator">
                <div className="magical-intro__scroll-mouse">
                    <div className="magical-intro__scroll-wheel" />
                </div>
                <span className="magical-intro__scroll-text">Scroll Down</span>
            </div>
        </section>
    );
}
