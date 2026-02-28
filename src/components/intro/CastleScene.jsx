import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Stars } from '@react-three/drei';
import * as THREE from 'three';
import './CastleScene.css';

/* ── Castle 3D Model (auto-scaled & centered) ──────────── */
function CastleModel() {
  const { scene } = useGLTF('/models/castle.glb');
  const ref = useRef();

  // Auto-scale and center the model based on its bounding box
  useMemo(() => {
    // Compute bounding box of the entire scene
    const box = new THREE.Box3().setFromObject(scene);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);

    // Log for debugging
    console.log('Castle model bounds:', { size, center, min: box.min, max: box.max });

    // Determine how big we want the castle — target ~15 units tall
    const maxDim = Math.max(size.x, size.y, size.z);
    const targetSize = 15;
    const scaleFactor = targetSize / maxDim;

    // Apply scale to the scene
    scene.scale.setScalar(scaleFactor);

    // Re-center: shift so the bottom sits at y=0 and x/z at origin
    scene.position.set(
      -center.x * scaleFactor,
      -box.min.y * scaleFactor,
      -center.z * scaleFactor
    );

    // Enable shadows on all meshes
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        // Ensure materials are visible
        if (child.material) {
          child.material.side = THREE.DoubleSide;
        }
      }
    });
  }, [scene]);

  return <primitive object={scene} />;
}

/* ── Floating sparkle particles ───────────────────────── */
function MagicParticles({ count = 200 }) {
  const ref = useRef();
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 50;
      pos[i * 3 + 1] = Math.random() * 30;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 50;
    }
    return pos;
  }, [count]);

  const colors = useMemo(() => {
    const cols = new Float32Array(count * 3);
    const palette = [
      [1, 0.75, 0.15],    // gold
      [0.65, 0.55, 0.98],  // violet
      [0.96, 0.45, 0.71],  // pink
      [1, 0.95, 0.78],     // stardust
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
      posArray[i * 3 + 1] += Math.sin(time * 0.5 + i) * 0.005;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.2}
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

/* ── Scroll-driven camera fly-in ───────────────────────── */
function ScrollCamera({ scrollProgress }) {
  const { camera } = useThree();

  useFrame(() => {
    // Camera: far (z=40, y=10) → close (z=6, y=3)
    const t = scrollProgress.current;
    const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic

    const z = THREE.MathUtils.lerp(40, 6, eased);
    const y = THREE.MathUtils.lerp(10, 4, eased);
    const x = Math.sin(eased * Math.PI * 0.25) * 2;

    camera.position.set(x, y, z);
    camera.lookAt(0, 5, 0);
  });

  return null;
}

/* ── Ground ────────────────────────────────────────────── */
function Ground() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]} receiveShadow>
      <circleGeometry args={[80, 64]} />
      <meshStandardMaterial color="#0a0118" roughness={0.95} metalness={0.05} />
    </mesh>
  );
}

/* ── Main scene ────────────────────────────────────────── */
export default function CastleScene({ scrollProgress }) {
  return (
    <div className="castle-scene">
      <Canvas
        shadows
        camera={{ fov: 50, near: 0.1, far: 500, position: [0, 10, 40] }}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.8,
        }}
      >
        {/* Background color */}
        <color attach="background" args={['#030030']} />
        <fog attach="fog" args={['#030030', 50, 150]} />

        {/* Ambient fill */}
        <ambientLight intensity={1} color="#c4b5fd" />

        {/* Key light — warm sunlight from upper front-right */}
        <directionalLight
          position={[15, 25, 20]}
          intensity={3}
          color="#fbbf24"
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />

        {/* Front fill — white light so we can see the model */}
        <directionalLight position={[0, 15, 35]} intensity={2} color="#ffffff" />

        {/* Colored accent lights */}
        <pointLight position={[0, 15, 0]} intensity={5} color="#7c3aed" distance={60} />
        <pointLight position={[-10, 8, 10]} intensity={3} color="#f472b6" distance={50} />
        <pointLight position={[10, 8, -10]} intensity={3} color="#38bdf8" distance={50} />

        {/* Back rim light */}
        <directionalLight position={[0, 10, -25]} intensity={1.5} color="#a78bfa" />

        {/* Hemisphere light for overall fill */}
        <hemisphereLight args={['#7c3aed', '#0a0118', 0.8]} />

        {/* Stars */}
        <Stars radius={120} depth={80} count={4000} factor={5} saturation={0.6} fade speed={0.8} />

        {/* Castle */}
        <CastleModel />

        {/* Particles */}
        <MagicParticles count={300} />

        {/* Ground */}
        <Ground />

        {/* Camera controller */}
        <ScrollCamera scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
}

useGLTF.preload('/models/castle.glb');
