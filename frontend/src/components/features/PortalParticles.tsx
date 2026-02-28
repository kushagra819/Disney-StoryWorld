import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
// @ts-ignore
import * as random from 'maath/random/dist/maath-random.esm';
import * as THREE from 'three';

export const PortalParticles = ({ color }: { color: string }) => {
    const ref = useRef<THREE.Points>(null);
    const sphere = random.inSphere(new Float32Array(5000), { radius: 1.5 });

    useFrame((_state, delta) => {
        if (ref.current) {
            // Swirl effect
            ref.current.rotation.x -= delta / 10;
            ref.current.rotation.y -= delta / 15;

            // Pull particles inward to create a vortex
            const positions = ref.current.geometry.attributes.position.array as Float32Array;
            for (let i = 0; i < positions.length; i += 3) {
                const x = positions[i];
                const y = positions[i + 1];
                const z = positions[i + 2];

                // Towards center
                positions[i] -= x * delta * 0.5;
                positions[i + 1] -= y * delta * 0.5;
                positions[i + 2] -= z * delta * 0.5;

                // Reset particle if it gets too close to center
                const distance = Math.sqrt(x * x + y * y + z * z);
                if (distance < 0.1) {
                    const newPos = random.inSphere(new Float32Array(3), { radius: 1.5 });
                    positions[i] = newPos[0];
                    positions[i + 1] = newPos[1];
                    positions[i + 2] = newPos[2];
                }
            }
            ref.current.geometry.attributes.position.needsUpdate = true;
        }
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
                <PointMaterial transparent color={color} size={0.015} sizeAttenuation={true} depthWrite={false} />
            </Points>
        </group>
    );
};
