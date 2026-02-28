import { useEffect, useRef, useCallback } from 'react';
import './MagicCursor.css';

const TRAIL_LENGTH = 20;
const SPARKLE_COLORS = [
    '#fbbf24', // gold
    '#a78bfa', // violet
    '#f472b6', // pink
    '#38bdf8', // blue
    '#fef3c7', // stardust
    '#ffffff', // white
];

function randomColor() {
    return SPARKLE_COLORS[Math.floor(Math.random() * SPARKLE_COLORS.length)];
}

function randomSize() {
    return Math.random() * 6 + 2; // 2-8px
}

export default function MagicCursor() {
    const canvasRef = useRef(null);
    const mouseRef = useRef({ x: -100, y: -100 });
    const particlesRef = useRef([]);
    const animFrameRef = useRef(null);
    const lastSpawnRef = useRef(0);

    // Create a sparkle particle
    const createParticle = useCallback((x, y) => {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 1.5 + 0.3;
        return {
            x,
            y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed - 0.5, // drift upward
            size: randomSize(),
            color: randomColor(),
            alpha: 1,
            decay: Math.random() * 0.025 + 0.015, // how fast it fades
            rotation: Math.random() * 360,
            rotSpeed: (Math.random() - 0.5) * 6,
            shape: Math.random() > 0.5 ? 'star' : 'circle', // mix shapes
        };
    }, []);

    // Draw a 4-point star
    const drawStar = useCallback((ctx, x, y, size, rotation) => {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate((rotation * Math.PI) / 180);
        const outer = size;
        const inner = size * 0.4;
        ctx.beginPath();
        for (let i = 0; i < 4; i++) {
            const angle = (i * Math.PI) / 2;
            ctx.lineTo(Math.cos(angle) * outer, Math.sin(angle) * outer);
            const midAngle = angle + Math.PI / 4;
            ctx.lineTo(Math.cos(midAngle) * inner, Math.sin(midAngle) * inner);
        }
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');

        // Resize canvas to window
        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        // Track mouse
        const onMouseMove = (e) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };
        window.addEventListener('mousemove', onMouseMove);

        // Animation loop
        const animate = (timestamp) => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Spawn new particles (throttled)
            if (timestamp - lastSpawnRef.current > 16) {
                // ~60fps spawn rate
                const { x, y } = mouseRef.current;
                if (x > 0 && y > 0) {
                    // Spawn 2-3 particles per frame
                    const count = Math.floor(Math.random() * 2) + 2;
                    for (let i = 0; i < count; i++) {
                        particlesRef.current.push(
                            createParticle(
                                x + (Math.random() - 0.5) * 12,
                                y + (Math.random() - 0.5) * 12
                            )
                        );
                    }
                }
                lastSpawnRef.current = timestamp;
            }

            // Cap particle count
            if (particlesRef.current.length > 150) {
                particlesRef.current = particlesRef.current.slice(-150);
            }

            // Update & draw particles
            particlesRef.current = particlesRef.current.filter((p) => {
                p.x += p.vx;
                p.y += p.vy;
                p.vy += 0.02; // gentle gravity
                p.alpha -= p.decay;
                p.rotation += p.rotSpeed;
                p.size *= 0.995; // shrink slightly

                if (p.alpha <= 0) return false;

                ctx.globalAlpha = p.alpha;

                if (p.shape === 'star') {
                    ctx.fillStyle = p.color;
                    drawStar(ctx, p.x, p.y, p.size, p.rotation);
                } else {
                    // Glowing circle
                    const gradient = ctx.createRadialGradient(
                        p.x, p.y, 0,
                        p.x, p.y, p.size
                    );
                    gradient.addColorStop(0, p.color);
                    gradient.addColorStop(0.4, p.color);
                    gradient.addColorStop(1, 'transparent');
                    ctx.fillStyle = gradient;
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                    ctx.fill();
                }

                return true;
            });

            ctx.globalAlpha = 1;

            // Draw the cursor "wand tip" glow
            const { x, y } = mouseRef.current;
            if (x > 0 && y > 0) {
                // Outer glow
                const outerGlow = ctx.createRadialGradient(x, y, 0, x, y, 20);
                outerGlow.addColorStop(0, 'rgba(251, 191, 36, 0.3)');
                outerGlow.addColorStop(0.5, 'rgba(167, 139, 250, 0.1)');
                outerGlow.addColorStop(1, 'transparent');
                ctx.fillStyle = outerGlow;
                ctx.beginPath();
                ctx.arc(x, y, 20, 0, Math.PI * 2);
                ctx.fill();

                // Inner bright point
                const innerGlow = ctx.createRadialGradient(x, y, 0, x, y, 4);
                innerGlow.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
                innerGlow.addColorStop(1, 'rgba(251, 191, 36, 0.4)');
                ctx.fillStyle = innerGlow;
                ctx.beginPath();
                ctx.arc(x, y, 4, 0, Math.PI * 2);
                ctx.fill();
            }

            animFrameRef.current = requestAnimationFrame(animate);
        };

        animFrameRef.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', onMouseMove);
            if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
        };
    }, [createParticle, drawStar]);

    return (
        <canvas
            ref={canvasRef}
            className="magic-cursor-canvas"
            aria-hidden="true"
        />
    );
}
