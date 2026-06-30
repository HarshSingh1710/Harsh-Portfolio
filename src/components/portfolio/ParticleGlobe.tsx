import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useDeviceCapabilities } from "@/hooks/useDeviceCapabilities";


function fibSphere(n: number, r: number) {
  const pts = new Float32Array(n * 3);
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const rad = Math.sqrt(1 - y * y);
    const theta = golden * i;
    pts[i * 3] = Math.cos(theta) * rad * r;
    pts[i * 3 + 1] = y * r;
    pts[i * 3 + 2] = Math.sin(theta) * rad * r;
  }
  return pts;
}

function Globe({ particleCount, lineMax, withLines, rotateSpeed }: { particleCount: number; lineMax: number; withLines: boolean; rotateSpeed: number }) {
  const ref = useRef<THREE.Points>(null!);
  const lineRef = useRef<THREE.LineSegments>(null!);
  const groupRef = useRef<THREE.Group>(null!);
  const mouse = useRef({ x: 0, y: 0 });
  const positions = useMemo(() => fibSphere(particleCount, 2.2), [particleCount]);

  const lineGeo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    if (!withLines) return g;
    const verts: number[] = [];
    const arr = positions;
    const max = Math.min(arr.length / 3, lineMax);
    for (let i = 0; i < max; i++) {
      const ax = arr[i * 3], ay = arr[i * 3 + 1], az = arr[i * 3 + 2];
      for (let j = i + 1; j < max; j++) {
        const bx = arr[j * 3], by = arr[j * 3 + 1], bz = arr[j * 3 + 2];
        const dx = ax - bx, dy = ay - by, dz = az - bz;
        const d2 = dx * dx + dy * dy + dz * dz;
        if (d2 < 0.05) {
          verts.push(ax, ay, az, bx, by, bz);
        }
      }
    }
    g.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3));
    return g;
  }, [positions, withLines, lineMax]);


  useFrame((state, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * rotateSpeed;
    const tx = mouse.current.x * 0.35;
    const ty = mouse.current.y * 0.35;
    groupRef.current.rotation.x += (ty - groupRef.current.rotation.x) * 0.05;
    groupRef.current.position.x += (tx - groupRef.current.position.x) * 0.03;
    state.camera.position.z = 5 + Math.sin(state.clock.elapsedTime * 0.3) * 0.15;
  });


  return (
    <group
      ref={groupRef}
      onPointerMove={(e) => {
        mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouse.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
      }}
    >
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#c4b5fd"
          size={0.03}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
      {withLines && (
        <lineSegments ref={lineRef} geometry={lineGeo}>
          <lineBasicMaterial
            color="#8b5cf6"
            transparent
            opacity={0.22}
            blending={THREE.AdditiveBlending}
          />
        </lineSegments>
      )}
      <mesh>
        <sphereGeometry args={[2.18, 24, 24]} />
        <meshBasicMaterial color="#0a0a1f" transparent opacity={0.45} />
      </mesh>
    </group>
  );
}

export function ParticleGlobe({ className = "" }: { className?: string }) {
  const caps = useDeviceCapabilities();
  const particleCount = caps.reducedMotion ? 200 : caps.lowEnd ? 350 : 700;
  const lineMax = caps.lowEnd ? 0 : 400;
  const withLines = !caps.lowEnd && !caps.reducedMotion;
  const rotateSpeed = caps.reducedMotion ? 0 : 0.12;
  return (
    <div className={`pointer-events-auto ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 55 }}
        dpr={[1, caps.dprCap]}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
        performance={{ min: 0.5 }}
        frameloop={caps.reducedMotion ? "demand" : "always"}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[5, 5, 5]} intensity={1.2} color="#a78bfa" />
        <pointLight position={[-5, -3, 3]} intensity={0.8} color="#60a5fa" />
        <Globe particleCount={particleCount} lineMax={lineMax} withLines={withLines} rotateSpeed={rotateSpeed} />
      </Canvas>
    </div>
  );
}


