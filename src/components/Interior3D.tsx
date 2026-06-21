"use client";

import {
  Suspense,
  useRef,
  useEffect,
  useState,
  useCallback,
  forwardRef,
  useImperativeHandle,
  Component,
  type ReactNode,
} from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, ContactShadows, PerspectiveCamera } from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import * as THREE from "three";

const SCENE_BG = "#1f1209";

function WoodMat({
  color = "#8B6914",
  roughness = 0.6,
  metalness = 0.04,
}: {
  color?: string;
  roughness?: number;
  metalness?: number;
}) {
  return <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} />;
}

function BrassMat({ roughness = 0.25 }: { roughness?: number }) {
  return <meshStandardMaterial color="#c9a962" metalness={0.85} roughness={roughness} />;
}

function CabinetDoor({
  position,
  rotation = [0, 0, 0],
  size = [0.5, 0.7, 0.04],
  woodColor = "#a0784a",
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
  size?: [number, number, number];
  woodColor?: string;
}) {
  const [w, h, d] = size;
  const inset = 0.04;

  return (
    <group position={position} rotation={rotation}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={size} />
        <WoodMat color={woodColor} roughness={0.48} />
      </mesh>
      <mesh position={[0, 0, d / 2 + 0.001]} castShadow>
        <boxGeometry args={[w - inset * 2, h - inset * 2, 0.015]} />
        <WoodMat color={woodColor} roughness={0.58} />
      </mesh>
      <mesh
        position={[w / 2 - 0.05, 0, d / 2 + 0.02]}
        rotation={[Math.PI / 2, 0, 0]}
        castShadow
      >
        <cylinderGeometry args={[0.008, 0.008, 0.12, 12]} />
        <BrassMat />
      </mesh>
    </group>
  );
}

function PlywoodPanel({
  position,
  rotation = [0, 0, 0],
  size = [2, 0.05, 1.2],
  woodColor = "#8B6914",
  roughness,
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
  size?: [number, number, number];
  woodColor?: string;
  roughness?: number;
}) {
  return (
    <mesh position={position} rotation={rotation} castShadow receiveShadow>
      <boxGeometry args={size} />
      <WoodMat color={woodColor} roughness={roughness} />
    </mesh>
  );
}

function CeilingLight({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh castShadow>
        <cylinderGeometry args={[0.2, 0.24, 0.07, 24]} />
        <meshStandardMaterial color="#1f1208" metalness={0.7} roughness={0.28} />
      </mesh>
      <mesh position={[0, -0.045, 0]}>
        <sphereGeometry args={[0.13, 16, 16]} />
        <meshStandardMaterial
          color="#fff0d0"
          emissive="#ffb84d"
          emissiveIntensity={1.8}
          roughness={0.15}
        />
      </mesh>
      <pointLight color="#ffd4a0" intensity={12} distance={5.5} decay={2} />
    </group>
  );
}

function PlywoodRoom() {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <WoodMat color="#b8895a" roughness={0.72} metalness={0.08} />
      </mesh>

      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 4.35, 0]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <WoodMat color="#3d2817" roughness={0.82} />
      </mesh>

      <mesh position={[0, 2.2, -4]} receiveShadow>
        <planeGeometry args={[10, 4.4]} />
        <WoodMat color="#5a3820" roughness={0.7} />
      </mesh>
      <mesh position={[-4.5, 2.2, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[10, 4.4]} />
        <WoodMat color="#4a2e18" roughness={0.72} />
      </mesh>
      <mesh position={[4.5, 2.2, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[10, 4.4]} />
        <WoodMat color="#4a2e18" roughness={0.72} />
      </mesh>

      <group position={[-4.48, 2.4, -0.5]} rotation={[0, Math.PI / 2, 0]}>
        <mesh>
          <planeGeometry args={[2.4, 1.8]} />
          <meshStandardMaterial color="#2a1810" roughness={0.85} />
        </mesh>
        <mesh position={[0, 0, 0.01]}>
          <planeGeometry args={[2.1, 1.5]} />
          <meshStandardMaterial
            color="#fff8ee"
            emissive="#ffe8c0"
            emissiveIntensity={0.7}
            roughness={0.08}
          />
        </mesh>
        <PlywoodPanel position={[0, 0, -0.02]} size={[2.4, 1.8, 0.05]} woodColor="#3d2817" roughness={0.75} />
      </group>

      {[
        [0, 0.08, -3.95],
        [-4.42, 0.08, 0],
      ].map((pos, i) => (
        <PlywoodPanel
          key={`base-${i}`}
          position={pos as [number, number, number]}
          rotation={i === 1 ? [0, Math.PI / 2, 0] : undefined}
          size={[10, 0.16, 0.08]}
          woodColor="#3d2817"
          roughness={0.62}
        />
      ))}

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0.2, 0.012, 1.2]} receiveShadow>
        <planeGeometry args={[2.2, 1.4]} />
        <meshStandardMaterial color="#4a3020" roughness={0.92} />
      </mesh>

      <group position={[-2.2, 0, -3.2]}>
        {[
          [-0.9, 0.45, 0],
          [-0.3, 0.45, 0],
          [0.3, 0.45, 0],
          [0.9, 0.45, 0],
        ].map((pos, i) => (
          <CabinetDoor
            key={`lower-${i}`}
            position={pos as [number, number, number]}
            size={[0.55, 0.9, 0.55]}
            woodColor="#9a7348"
          />
        ))}
        <mesh position={[0, 0.93, 0.05]} castShadow receiveShadow>
          <boxGeometry args={[2.4, 0.06, 0.65]} />
          <meshStandardMaterial color="#1a1816" roughness={0.15} metalness={0.1} />
        </mesh>
        <PlywoodPanel position={[0, 1.35, -0.22]} size={[2.4, 0.7, 0.04]} woodColor="#c8956c" />
        {[
          [-0.75, 1.75, -0.1],
          [0, 1.75, -0.1],
          [0.75, 1.75, -0.1],
        ].map((pos, i) => (
          <CabinetDoor
            key={`upper-${i}`}
            position={pos as [number, number, number]}
            size={[0.65, 0.65, 0.35]}
            woodColor="#a0784a"
          />
        ))}
        <PlywoodPanel position={[1.15, 1.5, -0.05]} size={[0.04, 1.2, 0.4]} woodColor="#6b4423" />
        {[1.2, 1.55, 1.9].map((y) => (
          <PlywoodPanel key={y} position={[1.15, y, -0.05]} size={[0.35, 0.03, 0.38]} woodColor="#8B6914" />
        ))}
      </group>

      <group position={[2.4, 0, -2.8]}>
        <PlywoodPanel position={[0, 1.1, 0]} size={[2.4, 2.2, 0.6]} woodColor="#8B6914" />
        <PlywoodPanel position={[-1.15, 1.1, 0.02]} size={[0.06, 2.15, 0.55]} woodColor="#6b4423" />
        <PlywoodPanel position={[1.15, 1.1, 0.02]} size={[0.06, 2.15, 0.55]} woodColor="#6b4423" />
        <CabinetDoor position={[-0.55, 1.1, 0.32]} size={[1.05, 2.05, 0.05]} woodColor="#b8895a" />
        <mesh position={[0.55, 1.1, 0.32]} castShadow>
          <boxGeometry args={[1.05, 2.05, 0.05]} />
          <meshStandardMaterial color="#d4c4a8" roughness={0.2} metalness={0.35} />
        </mesh>
        {[0.6, 1.2, 1.8].map((y) => (
          <PlywoodPanel key={y} position={[0, y, 0.05]} size={[2.2, 0.03, 0.5]} woodColor="#9a7348" />
        ))}
      </group>

      <group position={[0.2, 0, 1.2]}>
        <mesh position={[0, 0.76, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.6, 0.05, 0.9]} />
          <WoodMat color="#c8956c" roughness={0.38} />
        </mesh>
        {[
          [-0.65, 0.38, -0.35],
          [0.65, 0.38, -0.35],
          [-0.65, 0.38, 0.35],
          [0.65, 0.38, 0.35],
        ].map((pos, i) => (
          <mesh key={i} position={pos as [number, number, number]} castShadow>
            <boxGeometry args={[0.08, 0.76, 0.08]} />
            <WoodMat color="#4a3018" roughness={0.45} />
          </mesh>
        ))}
      </group>

      <group position={[-1.5, 0, 1.8]} rotation={[0, 0.6, 0]}>
        <PlywoodPanel position={[0, 0.45, 0]} size={[0.5, 0.08, 0.5]} woodColor="#a0784a" />
        <PlywoodPanel position={[0, 0.75, -0.2]} size={[0.5, 0.55, 0.05]} woodColor="#9a7348" />
      </group>

      <group position={[1.8, 0, 2.2]} rotation={[0, -0.4, 0]}>
        <PlywoodPanel position={[0, 0.42, 0]} size={[0.45, 0.07, 0.45]} woodColor="#8B6914" />
        <PlywoodPanel position={[0, 0.68, -0.18]} size={[0.45, 0.5, 0.04]} woodColor="#9a7348" />
      </group>

      <PlywoodPanel position={[3.8, 1.4, -1]} rotation={[0, -Math.PI / 2, 0]} size={[2.5, 1.8, 0.06]} woodColor="#c8956c" />

      <ContactShadows position={[0, 0.01, 0]} opacity={0.55} scale={12} blur={2.5} far={5} color="#120a06" />
    </group>
  );
}

function SceneLighting() {
  return (
    <>
      <ambientLight intensity={0.35} color="#ffd8b0" />
      <hemisphereLight args={["#ffe8c8", "#120a06", 0.5]} />
      <directionalLight
        position={[6, 10, 4]}
        intensity={1.4}
        color="#fff0d8"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={24}
        shadow-camera-left={-8}
        shadow-camera-right={8}
        shadow-camera-top={8}
        shadow-camera-bottom={-8}
      />
      <directionalLight position={[-5, 4, -3]} intensity={0.35} color="#ffb870" />
      <pointLight position={[-4, 2.5, 1]} intensity={8} color="#ffc880" distance={9} decay={2} />
      <pointLight position={[3, 1.5, 2]} intensity={4} color="#ffdba0" distance={7} decay={2} />
    </>
  );
}

function CeilingLights() {
  return (
    <>
      <CeilingLight position={[-1.5, 3.85, -1]} />
      <CeilingLight position={[1.5, 3.85, 0.5]} />
      <CeilingLight position={[0, 3.85, -2.5]} />
    </>
  );
}

function SceneBackground() {
  const { scene } = useThree();
  useEffect(() => {
    scene.background = new THREE.Color(SCENE_BG);
  }, [scene]);
  return null;
}

const INITIAL_CAMERA = {
  position: [5.2, 2.75, 6.4] as [number, number, number],
  target: [0, 1.15, -0.6] as [number, number, number],
};

function Scene({
  controlsRef,
  autoRotate,
  onUserInteract,
}: {
  controlsRef: React.RefObject<OrbitControlsImpl | null>;
  autoRotate: boolean;
  onUserInteract: () => void;
}) {
  return (
    <>
      <SceneBackground />
      <PerspectiveCamera makeDefault position={INITIAL_CAMERA.position} fov={36} near={0.1} far={50} />
      <OrbitControls
        ref={controlsRef}
        enableDamping
        dampingFactor={0.05}
        minDistance={3.5}
        maxDistance={10.5}
        minPolarAngle={0.3}
        maxPolarAngle={Math.PI / 2.02}
        target={INITIAL_CAMERA.target}
        enablePan={false}
        rotateSpeed={0.65}
        zoomSpeed={0.85}
        autoRotate={autoRotate}
        autoRotateSpeed={0.35}
        onStart={onUserInteract}
      />
      <SceneLighting />
      <CeilingLights />
      <PlywoodRoom />
    </>
  );
}

class CanvasErrorBoundary extends Component<
  { fallback: ReactNode; children: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

function useWebGLAvailable() {
  const [available, setAvailable] = useState<boolean | null>(null);

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl2") ?? canvas.getContext("webgl");
      setAvailable(!!gl);
    } catch {
      setAvailable(false);
    }
  }, []);

  return available;
}

export type Interior3DHandle = {
  resetView: () => void;
};

type Interior3DProps = {
  className?: string;
  showOverlay?: boolean;
  resetTrigger?: number;
  fallbackImage?: string;
  fallbackAlt?: string;
};

function StaticFallback({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-wood-deep">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-wood-deep/85 via-wood-deep/20 to-transparent" />
      <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8">
        <p className="text-[10px] uppercase tracking-[0.4em] text-wood-gold/90">Interior Preview</p>
        <p className="font-display mt-1 text-lg text-wood-cream md:text-xl">Plywood Interior Showcase</p>
      </div>
    </div>
  );
}

const Interior3D = forwardRef<Interior3DHandle, Interior3DProps>(function Interior3D(
  {
    className = "",
    showOverlay = true,
    resetTrigger = 0,
    fallbackImage = "/images/gallery/interior-kitchen.jpg",
    fallbackAlt = "Premium plywood kitchen interior",
  },
  ref
) {
  const controlsRef = useRef<OrbitControlsImpl | null>(null);
  const [autoRotate, setAutoRotate] = useState(true);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const webglAvailable = useWebGLAvailable();

  const resetView = useCallback(() => {
    const controls = controlsRef.current;
    if (!controls) return;
    controls.target.set(...INITIAL_CAMERA.target);
    controls.object.position.set(...INITIAL_CAMERA.position);
    controls.update();
    setAutoRotate(true);
  }, []);

  useImperativeHandle(ref, () => ({ resetView }), [resetView]);

  useEffect(() => {
    if (resetTrigger > 0) resetView();
  }, [resetTrigger, resetView]);

  const handleUserInteract = useCallback(() => {
    setAutoRotate(false);
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => setAutoRotate(true), 8000);
  }, []);

  useEffect(() => {
    return () => {
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    };
  }, []);

  const fallback = <StaticFallback src={fallbackImage} alt={fallbackAlt} />;

  if (webglAvailable === false) {
    return <div className={`relative h-full w-full overflow-hidden ${className}`}>{fallback}</div>;
  }

  if (webglAvailable === null) {
    return (
      <div className={`relative flex h-full w-full items-center justify-center bg-wood-deep ${className}`}>
        <div className="h-10 w-10 animate-spin rounded-full border border-wood-gold/30 border-t-wood-gold" />
      </div>
    );
  }

  return (
    <div className={`relative h-full w-full overflow-hidden ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-wood-deep via-[#1f1209] to-wood-dark" />
      <CanvasErrorBoundary fallback={fallback}>
        <Canvas
          shadows
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
          className="relative z-10 touch-none"
          style={{ background: SCENE_BG }}
          onCreated={({ gl }) => {
            gl.setClearColor(SCENE_BG);
          }}
        >
          <Suspense fallback={null}>
            <Scene
              controlsRef={controlsRef}
              autoRotate={autoRotate}
              onUserInteract={handleUserInteract}
            />
          </Suspense>
        </Canvas>
      </CanvasErrorBoundary>
      {showOverlay && (
        <>
          <div className="pointer-events-none absolute inset-0 z-[15] border border-wood-gold/15" />
          <div className="pointer-events-none absolute inset-3 z-[15] border border-wood-gold/10 md:inset-4" />
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-20 h-36 bg-gradient-to-t from-wood-deep/95 via-wood-deep/40 to-transparent" />
          <div className="pointer-events-none absolute bottom-6 left-6 z-20 md:bottom-8 md:left-8">
            <p className="text-[10px] uppercase tracking-[0.4em] text-wood-gold/90">
              Drag · Scroll to Explore
            </p>
            <p className="font-display mt-1 text-lg text-wood-cream md:text-xl">
              Plywood Interior Showcase
            </p>
          </div>
          <div className="absolute right-4 top-4 z-20 flex flex-col gap-2 md:right-6 md:top-6">
            <button
              type="button"
              onClick={resetView}
              className="border border-wood-gold/30 bg-wood-deep/70 px-3 py-2 text-[9px] uppercase tracking-[0.3em] text-wood-cream/80 backdrop-blur-sm transition-colors hover:border-wood-gold/60 hover:text-wood-gold"
              aria-label="Reset 3D view"
            >
              Reset View
            </button>
          </div>
        </>
      )}
    </div>
  );
});

export default Interior3D;
