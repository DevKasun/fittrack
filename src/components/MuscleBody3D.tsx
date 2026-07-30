import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { muscleColors } from "../types";

type MuscleBody3DProps = {
  activeMuscles: string[];
};

type BodyPart = {
  id: string;
  muscle?: string;
  pos: [number, number, number];
  rot?: [number, number, number];
  geo: THREE.BufferGeometry;
  color?: string;
};

const SKIN = "#5a4a3a";
const DIM = 0.25;

function Part({
  part,
  active,
  pulse,
}: {
  part: BodyPart;
  active: boolean;
  pulse: boolean;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current && pulse && active) {
      const p = 0.15 * Math.sin(state.clock.elapsedTime * 3);
      ref.current.emissiveIntensity = 0.3 + p;
    }
  });

  const isMuscle = !!part.muscle;
  const baseColor = part.color ?? SKIN;
  const highlightColor = part.muscle ? muscleColors[part.muscle] ?? SKIN : SKIN;
  const color = active ? highlightColor : baseColor;
  const emissive = active ? highlightColor : "#000000";
  const opacity = isMuscle ? (active ? 1 : DIM) : 0.4;

  return (
    <mesh ref={ref} geometry={part.geo} position={part.pos} rotation={part.rot ?? [0, 0, 0]}>
      <meshStandardMaterial
        color={color}
        emissive={emissive}
        emissiveIntensity={active ? 0.4 : 0}
        roughness={0.5}
        metalness={0.05}
        transparent
        opacity={opacity}
        depthWrite={opacity > 0.5}
      />
    </mesh>
  );
}

function Body({ activeMuscles }: { activeMuscles: string[] }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_state, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.15;
  });

  const parts = useMemo(() => {
    const s = (r: number, sx: number, sy: number, sz: number) => {
      const g = new THREE.SphereGeometry(r, 20, 20);
      g.scale(sx || 1, sy || 1, sz || 1);
      return g;
    };
    const c = (rt: number, rb: number, h: number) =>
      new THREE.CylinderGeometry(rt, rb, h, 16);
    const b = (w: number, h: number, d: number) =>
      new THREE.BoxGeometry(w, h, d);

    const base: BodyPart[] = [
      { id: "head", pos: [0, 1.25, 0], geo: s(0.18, 1, 1, 0.85) },
      { id: "neck", pos: [0, 1.0, 0], geo: c(0.1, 0.12, 0.12) },
      { id: "torso", pos: [0, 0.55, 0], geo: b(0.48, 0.45, 0.26) },
      { id: "hip", pos: [0, 0.18, 0], geo: b(0.42, 0.18, 0.24) },
      { id: "l_arm", pos: [-0.33, 0.72, 0], rot: [0, 0, 0.25], geo: c(0.07, 0.06, 0.28) },
      { id: "r_arm", pos: [0.33, 0.72, 0], rot: [0, 0, -0.25], geo: c(0.07, 0.06, 0.28) },
      { id: "l_fore", pos: [-0.48, 0.46, 0], rot: [0, 0, 0.1], geo: c(0.055, 0.045, 0.26) },
      { id: "r_fore", pos: [0.48, 0.46, 0], rot: [0, 0, -0.1], geo: c(0.055, 0.045, 0.26) },
      { id: "l_hand", pos: [-0.56, 0.3, 0], geo: s(0.04) },
      { id: "r_hand", pos: [0.56, 0.3, 0], geo: s(0.04) },
      { id: "l_thigh", pos: [-0.12, -0.12, 0], geo: c(0.09, 0.07, 0.32) },
      { id: "r_thigh", pos: [0.12, -0.12, 0], geo: c(0.09, 0.07, 0.32) },
      { id: "l_shin", pos: [-0.12, -0.5, 0], geo: c(0.065, 0.05, 0.32) },
      { id: "r_shin", pos: [0.12, -0.5, 0], geo: c(0.065, 0.05, 0.32) },
      { id: "l_foot", pos: [-0.12, -0.75, 0.06], geo: b(0.08, 0.04, 0.14) },
      { id: "r_foot", pos: [0.12, -0.75, 0.06], geo: b(0.08, 0.04, 0.14) },
    ];

    const muscles: BodyPart[] = [
      { id: "chest", muscle: "chest", pos: [0, 0.6, 0.15], geo: s(0.15, 1.6, 1.1, 0.35), color: "#3a2a1a" },
      { id: "lats", muscle: "lats", pos: [0, 0.52, -0.14], geo: s(0.17, 1.7, 1.6, 0.45), color: "#3a2a1a" },
      { id: "lowerback", muscle: "lowerback", pos: [0, 0.28, -0.14], geo: b(0.34, 0.18, 0.07), color: "#3a2a1a" },
      { id: "traps", muscle: "traps", pos: [0, 0.85, -0.06], geo: s(0.11, 2, 0.8, 0.5), color: "#3a2a1a" },
      { id: "l_delt", muscle: "shoulders", pos: [-0.25, 0.82, 0], geo: s(0.08, 1, 1, 0.8), color: "#3a2a1a" },
      { id: "r_delt", muscle: "shoulders", pos: [0.25, 0.82, 0], geo: s(0.08, 1, 1, 0.8), color: "#3a2a1a" },
      { id: "l_biceps", muscle: "biceps", pos: [-0.33, 0.74, 0.03], rot: [0, 0, 0.25], geo: s(0.055, 1.2, 2.2, 1), color: "#3a2a1a" },
      { id: "r_biceps", muscle: "biceps", pos: [0.33, 0.74, 0.03], rot: [0, 0, -0.25], geo: s(0.055, 1.2, 2.2, 1), color: "#3a2a1a" },
      { id: "l_triceps", muscle: "triceps", pos: [-0.33, 0.72, -0.03], rot: [0, 0, 0.25], geo: s(0.055, 1.2, 2, 1), color: "#3a2a1a" },
      { id: "r_triceps", muscle: "triceps", pos: [0.33, 0.72, -0.03], rot: [0, 0, -0.25], geo: s(0.055, 1.2, 2, 1), color: "#3a2a1a" },
      { id: "l_forearm", muscle: "forearms", pos: [-0.48, 0.47, 0], rot: [0, 0, 0.1], geo: c(0.045, 0.035, 0.22), color: "#3a2a1a" },
      { id: "r_forearm", muscle: "forearms", pos: [0.48, 0.47, 0], rot: [0, 0, -0.1], geo: c(0.045, 0.035, 0.22), color: "#3a2a1a" },
      { id: "abs", muscle: "abs", pos: [0, 0.38, 0.135], geo: b(0.22, 0.2, 0.05), color: "#3a2a1a" },
      { id: "l_oblique", muscle: "obliques", pos: [-0.2, 0.38, 0.05], geo: b(0.05, 0.18, 0.09), color: "#3a2a1a" },
      { id: "r_oblique", muscle: "obliques", pos: [0.2, 0.38, 0.05], geo: b(0.05, 0.18, 0.09), color: "#3a2a1a" },
      { id: "l_quad", muscle: "quads", pos: [-0.12, -0.12, 0.055], geo: s(0.065, 1.5, 2.8, 1), color: "#3a2a1a" },
      { id: "r_quad", muscle: "quads", pos: [0.12, -0.12, 0.055], geo: s(0.065, 1.5, 2.8, 1), color: "#3a2a1a" },
      { id: "l_ham", muscle: "hamstrings", pos: [-0.12, -0.12, -0.055], geo: s(0.065, 1.5, 2.8, 1), color: "#3a2a1a" },
      { id: "r_ham", muscle: "hamstrings", pos: [0.12, -0.12, -0.055], geo: s(0.065, 1.5, 2.8, 1), color: "#3a2a1a" },
      { id: "glutes", muscle: "glutes", pos: [0, 0.04, -0.13], geo: s(0.12, 1.8, 0.7, 0.7), color: "#3a2a1a" },
      { id: "l_calf", muscle: "calves", pos: [-0.12, -0.5, -0.035], geo: s(0.05, 1.2, 2.2, 1), color: "#3a2a1a" },
      { id: "r_calf", muscle: "calves", pos: [0.12, -0.5, -0.035], geo: s(0.05, 1.2, 2.2, 1), color: "#3a2a1a" },
    ];

    return [...base, ...muscles];
  }, []);

  return (
    <group ref={groupRef}>
      {parts.map((part) => (
        <Part
          key={part.id}
          part={part}
          active={!!part.muscle && activeMuscles.includes(part.muscle)}
          pulse={!!part.muscle}
        />
      ))}
    </group>
  );
}

export function MuscleBody3D({ activeMuscles = [] }: MuscleBody3DProps) {
  return (
    <div className="w-full h-[400px] rounded-xl overflow-hidden bg-gradient-to-b from-gray-900 to-gray-950">
      <Canvas camera={{ position: [0, 0.15, 2.5], fov: 38 }} gl={{ antialias: true }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[6, 10, 6]} intensity={1.5} />
        <directionalLight position={[-4, 3, -3]} intensity={0.5} />
        <spotLight position={[0, 4, 3]} intensity={0.8} angle={0.3} penumbra={1} />
        <Body activeMuscles={activeMuscles} />
        <OrbitControls enablePan={false} enableZoom minDistance={1.5} maxDistance={4} />
      </Canvas>
    </div>
  );
}
