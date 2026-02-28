import { Canvas } from '@react-three/fiber';
import { motion, AnimatePresence } from 'framer-motion';
import { PortalParticles } from './PortalParticles';
import { useEffect, useState } from 'react';

interface PortalTransitionProps {
    isActive: boolean;
    color?: string;
    onComplete: () => void;
}

export const PortalTransition = ({ isActive, color = "#a855f7", onComplete }: PortalTransitionProps) => {
    const [showCanvas, setShowCanvas] = useState(false);

    useEffect(() => {
        if (isActive) {
            setShowCanvas(true);
            // Simulate the portal pulling the user in, then finish
            const timer = setTimeout(() => {
                onComplete();
                setTimeout(() => setShowCanvas(false), 1000); // Wait for fade out
            }, 2500);
            return () => clearTimeout(timer);
        }
    }, [isActive, onComplete]);

    return (
        <AnimatePresence>
            {isActive && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.5 }} // Zooms past the camera on exit
                    transition={{ duration: 1, ease: "easeInOut" }}
                    className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center bg-black/80 backdrop-blur-sm"
                >
                    {showCanvas && (
                        <div className="absolute inset-0 w-full h-full">
                            <Canvas camera={{ position: [0, 0, 1] }}>
                                <ambientLight intensity={0.5} />
                                <PortalParticles color={color} />
                            </Canvas>
                        </div>
                    )}

                    {/* Inner glowing ring for the portal edge */}
                    <motion.div
                        initial={{ width: 0, height: 0, opacity: 0 }}
                        animate={{ width: "100%", height: "100%", opacity: 1 }}
                        transition={{ duration: 2, ease: "easeIn" }}
                        className="absolute rounded-full border-[20px] border-transparent"
                        style={{ boxShadow: `inset 0 0 100px ${color}, 0 0 100px ${color}` }}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
};
