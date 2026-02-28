import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Stars, Float } from '@react-three/drei';
import * as THREE from 'three';
import './CastleScene.css';

/* ── Castle 3D Model ──────────────────────────────────── */
function CastleModel({ scrollProgress }) {
  const { scene } = useGLTF('/models/castle.glb');
  const ref = useRef();

  // Clone materials so we can tweak them
  useMemo(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene]);

  useFrame(() => {
    if (!ref.current) return;
    // Gentle auto-rotation when idle
    ref.current.rotation.y += 0.001;
  });

  return (
    <primitive
      ref={ref}
      object={scene}
      scale={1}
      position={[0, -2, 0]}
    />
  );
}

/* ── Floating sparkle particles ───────────────────────── */
function MagicParticles({ count = 200 }) {
  const ref = useRef();
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 60;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 60;
    }
    return pos;
  }, [count]);

  const colors = useMemo(() => {
    const cols = new Float32Array(count * 3);
    const palette = [
      [1, 0.75, 0.15],   // gold
      [0.65, 0.55, 0.98], // violet
      [0.96, 0.45, 0.71], // pink
      [1, 0.95, 0.78],    // stardust
    ];
    for (let i = 0; i < count; i++) {
      const c = palette[Math.floor(Math.random() * palette.length)];
      cols[i * 3] = c[0];
      cols[i * 3 + 1] = c[1];
      cols[i * 3 + 2] = c[2];
    }
    return cols;
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;
    const time = state.clock.elapsedTime;
    const posArray = ref.current.geometry.attributes.position.array;
    for (let i = 0; i < count; i++) {
      posArray[i * 3 + 1] += Math.sin(time + i) * 0.003;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

/* ── Camera controller (scroll-driven fly-in) ─────────── */
function ScrollCamera({ scrollProgress }) {
  const { camera } = useThree();

  useFrame(() => {
    // Camera starts far away (z=50) → flies to close (z=8)
    const startZ = 50;
    const endZ = 8;
    const startY = 12;
    const endY = 3;

    // Ease-out cubic for smooth deceleration
    const t = scrollProgress.current;
    const eased = 1 - Math.pow(1 - t, 3);

    camera.position.z = THREE.MathUtils.lerp(startZ, endZ, eased);
    camera.position.y = THREE.MathUtils.lerp(startY, endY, eased);

    // Slight horizontal sway for cinematic feel
    camera.position.x = Math.sin(eased * Math.PI * 0.3) * 2;

    // Always look at the castle center
    camera.lookAt(0, 1, 0);
  });

  return null;
}

/* ── Ground plane ──────────────────────────────────────── */
function Ground() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
      <planeGeometry args={[200, 200]} />
      <meshStandardMaterial
        color="#0a0118"
        roughness={0.9}
        metalness={0.1}
      />
    </mesh>
  );
}

/* ── Main Scene ────────────────────────────────────────── */
export default function CastleScene({ scrollProgress }) {
  return (
    <div className="castle-scene">
      <Canvas
        shadows
        camera={{ fov: 45, near: 0.1, far: 200, position: [0, 12, 50] }}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2,
        }}
      >
        {/* Sky / Background */}
        <color attach="background" args={['#020024']} />
        <fog attach="fog" args={['#0a0118', 20, 80]} />

        {/* Lighting */}
        <ambientLight intensity={0.3} color="#a78bfa" />
        <directionalLight
          position={[10, 20, 10]}
          intensity={1.5}
          color="#fbbf24"
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <pointLight position={[0, 8, 0]} intensity={2} color="#7c3aed" distance={30} />
        <pointLight position={[-5, 3, 5]} intensity={1} color="#f472b6" distance={20} />
        <pointLight position={[5, 3, -5]} intensity={1} color="#38bdf8" distance={20} />

        {/* Rim light from behind */}
        <directionalLight position={[0, 5, -15]} intensity={0.8} color="#7c3aed" />

        {/* Stars in the background */}
        <Stars
          radius={100}
          depth={60}
          count={3000}
          factor={4}
          saturation={0.5}
          fade
          speed={1}
        />

        {/* Castle model */}
        <Float speed={0.5} rotationIntensity={0.05} floatIntensity={0.3}>
          <CastleModel scrollProgress={scrollProgress} />
        </Float>

        {/* Magic particles */}
        <MagicParticles count={300} />

        {/* Ground */}
        <Ground />

        {/* Scroll-driven camera */}
        <ScrollCamera scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
}

// Preload the model
useGLTF.preload('/models/castle.glb');
