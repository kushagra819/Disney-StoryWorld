import { useRef, useEffect, Suspense } from 'react';
import CastleScene from './CastleScene';
import './CastleTile.css';

export default function CastleTile() {
    const sectionRef = useRef(null);
    const scrollProgressRef = useRef(0);

    // Track scroll progress for this section
    useEffect(() => {
        const handleScroll = () => {
            if (!sectionRef.current) return;
            const rect = sectionRef.current.getBoundingClientRect();
            const windowH = window.innerHeight;
            // Progress: 0 when section enters viewport, 1 when it leaves
            const rawProgress = (windowH - rect.top) / (windowH + rect.height);
            scrollProgressRef.current = Math.max(0, Math.min(rawProgress, 1));
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section className="castle-tile" id="castle" ref={sectionRef}>
            <Suspense fallback={
                <div className="castle-tile__loader">
                    <div className="castle-tile__spinner" />
                    <p>Entering the Magic...</p>
                </div>
            }>
                <CastleScene scrollProgress={scrollProgressRef} />
            </Suspense>

            {/* Overlay text */}
            <div className="castle-tile__overlay">
                <p className="castle-tile__text">Scroll to approach the enchanted castle</p>
            </div>
        </section>
    );
}
