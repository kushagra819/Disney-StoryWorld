import { useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Stars } from '@react-three/drei';
import * as THREE from 'three';
import './CastleScene.css';

/* ── Castle 3D Model (auto-scaled, centered, front-facing) ── */
function CastleModel() {
  const { scene } = useGLTF('/models/castle.glb');

  useMemo(() => {
    // Reset any prior transforms
    scene.rotation.set(0, 0, 0);
    scene.scale.set(1, 1, 1);
    scene.position.set(0, 0, 0);

    // Compute bounding box
    const box = new THREE.Box3().setFromObject(scene);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);

    console.log('Castle bounds:', {
      size: { x: size.x.toFixed(2), y: size.y.toFixed(2), z: size.z.toFixed(2) },
      center: { x: center.x.toFixed(2), y: center.y.toFixed(2), z: center.z.toFixed(2) },
    });

    // Scale to ~12 units tall
    const maxDim = Math.max(size.x, size.y, size.z);
    const scaleFactor = 12 / maxDim;
    scene.scale.setScalar(scaleFactor);

    // Center horizontally, place bottom at y=0
    scene.position.set(
      -center.x * scaleFactor,
      -box.min.y * scaleFactor,
      -center.z * scaleFactor
    );

    // Rotate so the front gate faces the camera (+Z direction)
    // Most Sketchfab models have front at -Z, so rotate 180° around Y
    scene.rotation.y = Math.PI;

    // Configure materials
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        if (child.material) {
          child.material.side = THREE.FrontSide;
        }
      }
    });
  }, [scene]);

  return <primitive object={scene} />;
}

/* ── Floating sparkle particles ───────────────────────── */
function MagicParticles({ count = 200 }) {
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 50;
      pos[i * 3 + 1] = Math.random() * 25;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 50;
    }
    return pos;
  }, [count]);

  const colors = useMemo(() => {
    const cols = new Float32Array(count * 3);
    const palette = [
      [1, 0.75, 0.15],
      [0.65, 0.55, 0.98],
      [0.96, 0.45, 0.71],
      [1, 0.95, 0.78],
    ];
    for (let i = 0; i < count; i++) {
      const c = palette[Math.floor(Math.random() * palette.length)];
      cols[i * 3] = c[0];
      cols[i * 3 + 1] = c[1];
      cols[i * 3 + 2] = c[2];
    }
    return cols;
  }, [count]);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.18}
        vertexColors
        transparent
        opacity={0.7}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

/* ── Scroll-driven camera fly-in ───────────────────────── */
function ScrollCamera({ scrollProgress }) {
  const { camera } = useThree();

  useFrame(() => {
    const t = scrollProgress.current;
    const eased = 1 - Math.pow(1 - t, 3);

    // Camera flies from far (z=35) to close (z=8), slightly above
    const z = THREE.MathUtils.lerp(35, 8, eased);
    const y = THREE.MathUtils.lerp(8, 4, eased);
    const x = Math.sin(eased * Math.PI * 0.2) * 1.5;

    camera.position.set(x, y, z);
    camera.lookAt(0, 4, 0);
  });

  return null;
}

/* ── Ground plane ──────────────────────────────────────── */
function Ground() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]} receiveShadow>
      <circleGeometry args={[80, 64]} />
      <meshStandardMaterial color="#0a0118" roughness={0.95} metalness={0.05} />
    </mesh>
  );
}

/* ── Main Scene ────────────────────────────────────────── */
export default function CastleScene({ scrollProgress }) {
  return (
    <div className="castle-scene">
      <Canvas
        shadows
        camera={{ fov: 50, near: 0.1, far: 500, position: [0, 8, 35] }}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.6,
        }}
      >
        <color attach="background" args={['#030030']} />
        <fog attach="fog" args={['#030030', 50, 150]} />

        {/* Lighting setup */}
        <ambientLight intensity={0.8} color="#c4b5fd" />
        <hemisphereLight args={['#87CEEB', '#0a0118', 0.6]} />

        {/* Key light — warm from above-front */}
        <directionalLight
          position={[10, 20, 15]}
          intensity={2.5}
          color="#fbbf24"
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />

        {/* Front fill — white */}
        <directionalLight position={[0, 10, 30]} intensity={2} color="#ffffff" />

        {/* Colored accents */}
        <pointLight position={[0, 12, 0]} intensity={4} color="#7c3aed" distance={50} />
        <pointLight position={[-8, 5, 8]} intensity={2} color="#f472b6" distance={40} />
        <pointLight position={[8, 5, -8]} intensity={2} color="#38bdf8" distance={40} />

        {/* Back rim */}
        <directionalLight position={[0, 8, -20]} intensity={1} color="#a78bfa" />

        {/* Stars */}
        <Stars radius={120} depth={80} count={4000} factor={5} saturation={0.6} fade speed={0.8} />

        {/* Castle — static, front-facing */}
        <CastleModel />

        {/* Particles */}
        <MagicParticles count={250} />

        {/* Ground */}
        <Ground />

        {/* Camera */}
        <ScrollCamera scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
}

useGLTF.preload('/models/castle.glb');
