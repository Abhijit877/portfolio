import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Float, Line, PerspectiveCamera, Stars, Trail, Sphere } from '@react-three/drei';
import * as THREE from 'three';
// import { EffectComposer, Bloom } from '@react-three/postprocessing'; // Disabling for stability check
import gsap from 'gsap';

// --- Configuration ---

const NEON_CYAN = '#00f3ff';
const NEON_PURPLE = '#bc13fe';
const NEON_GREEN = '#0aff0a';

// Tier Z-Positions (Depth)
const TIER_3_Z = 2;   // Client (Front)
const TIER_2_Z = 0;   // API (Middle)
const TIER_1_Z = -2;  // Data (Back)

// Tier Y-Positions (Vertical Separation)
const TIER_3_Y = 2.5;
const TIER_2_Y = 0;
const TIER_1_Y = -2.5;

type NodeData = {
    id: string;
    position: [number, number, number];
    tier: 1 | 2 | 3;
    label: string;
    type: 'client' | 'api' | 'data';
};

const NODES: NodeData[] = [
    // Tier 3: Client (Presentation)
    { id: 'client-1', position: [-2, TIER_3_Y, TIER_3_Z], tier: 3, label: 'Web Client', type: 'client' },
    { id: 'client-2', position: [2, TIER_3_Y, TIER_3_Z], tier: 3, label: 'Mobile App', type: 'client' },

    // Tier 2: Logic (API Gateway / Services)
    { id: 'api-gateway', position: [0, TIER_2_Y, TIER_2_Z], tier: 2, label: 'API Gateway', type: 'api' },

    // Tier 1: Data (Core)
    { id: 'db-primary', position: [-2.5, TIER_1_Y, TIER_1_Z], tier: 1, label: 'Primary DB', type: 'data' },
    { id: 'db-cache', position: [2.5, TIER_1_Y, TIER_1_Z], tier: 1, label: 'Redis Cache', type: 'data' },
];

const CONNECTIONS = [
    // Downstream (Requests)
    { from: 'client-1', to: 'api-gateway' },
    { from: 'client-2', to: 'api-gateway' },
    { from: 'api-gateway', to: 'db-primary' },
    { from: 'api-gateway', to: 'db-cache' },
];

// --- Components ---

// Safe "Fake Glow" component using additive blending
const GlowSphere = ({ size, color, opacity = 0.5 }: { size: number, color: string, opacity?: number }) => {
    return (
        <mesh>
            <sphereGeometry args={[size, 32, 32]} />
            <meshBasicMaterial
                color={color}
                transparent
                opacity={opacity}
                blending={THREE.AdditiveBlending}
                side={THREE.BackSide} // Render backface for depth or FrontSide? FrontSide is fine for glow.
                depthWrite={false} // Don't block other glows
            />
        </mesh>
    );
};

const SystemNode = ({ data }: { data: NodeData }) => {
    const meshRef = useRef<THREE.Mesh>(null!);

    const color = useMemo(() => {
        return data.type === 'client' ? '#3b82f6' : data.type === 'api' ? '#8b5cf6' : '#f97316';
    }, [data.type]);

    const Geometry = useMemo(() => {
        switch (data.type) {
            case 'client': return <sphereGeometry args={[0.5, 32, 32]} />;
            case 'api': return <octahedronGeometry args={[0.7]} />; // Increased size
            case 'data': return <cylinderGeometry args={[0.6, 0.6, 0.8, 8]} />;
        }
    }, [data.type]);

    useFrame((state, delta) => {
        if (meshRef.current) {
            // Ambient Motion
            meshRef.current.rotation.y += delta * (data.tier === 2 ? 0.5 : 0.2);
            meshRef.current.rotation.x += delta * 0.1;
        }
    });

    return (
        <group position={data.position}>
            <Float speed={2} rotationIntensity={0.2} floatIntensity={0.2}>
                <mesh ref={meshRef} name={`node-${data.id}`}>
                    {Geometry}
                    <meshStandardMaterial
                        color={color}
                        emissive={color}
                        emissiveIntensity={0.8}
                        roughness={0.2}
                        metalness={0.8}
                    />
                    {/* Add Glow */}
                    <GlowSphere size={data.type === 'api' ? 1.0 : 0.8} color={color} opacity={0.3} />
                </mesh>
                <Text
                    position={[0, -1.0, 0]}
                    fontSize={0.3}
                    color="white"
                    anchorX="center"
                    anchorY="middle"
                    outlineWidth={0.02}
                    outlineColor="black"
                >
                    {data.label}
                </Text>
            </Float>
        </group>
    );
};

const ConnectionLines = () => {
    return (
        <group>
            {CONNECTIONS.map((conn, i) => {
                const startNode = NODES.find(n => n.id === conn.from);
                const endNode = NODES.find(n => n.id === conn.to);
                if (!startNode || !endNode) return null;

                return (
                    <Line
                        key={i}
                        points={[startNode.position, endNode.position]}
                        color="#ffffff"
                        opacity={0.1}
                        transparent
                        lineWidth={1}
                    />
                );
            })}
        </group>
    );
};

// Simplified Particle that doesn't use complex GSAP in useEffect to avoid potential memory leaks/crashes
const TraceParticle = ({ path, color, delay, duration }: any) => {
    const meshRef = useRef<THREE.Mesh>(null!);
    const progress = useRef(0);
    const [active, setActive] = useState(false);

    // Simple time-based animation using useFrame
    useFrame((state, delta) => {
        if (!active) {
            // Check if it's time to start (simplest way: random or just cycle?)
            // We'll rely on parent to mount us or just run forever?
            // Actually, let's just run a local timer.
            return;
        }

        progress.current += delta / duration;

        if (progress.current >= 1) {
            progress.current = 1; // Clamp or reset
            // Optional: Make it disappear or loop
            // For now, let's just hold it at end or hide it
        }

        if (meshRef.current) {
            const start = new THREE.Vector3(...path[0]);
            const end = new THREE.Vector3(...path[1]);
            meshRef.current.position.lerpVectors(start, end, progress.current);
            meshRef.current.visible = progress.current < 1;
        }
    });

    useEffect(() => {
        const t = setTimeout(() => {
            setActive(true);
        }, delay * 1000);
        return () => clearTimeout(t);
    }, [delay]);

    return (
        <mesh ref={meshRef} position={path[0]} visible={false}>
            <sphereGeometry args={[0.15]} />
            <meshBasicMaterial color={color} toneMapped={false} />
            {/* Particle Glow */}
            <GlowSphere size={0.4} color={color} opacity={0.5} />
        </mesh>
    );
};


// --- Main Scene ---

const Scene = () => {
    // We will use a clearer cycle management
    const [cycleKey, setCycleKey] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCycleKey(c => c + 1);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    // Helper to get positions
    const getPos = (id: string) => {
        const n = NODES.find(n => n.id === id);
        return n ? n.position : [0, 0, 0];
    }

    // Flash Logic in one place
    const groupRef = useRef<THREE.Group>(null!);

    useFrame(({ clock }) => {
        const t = clock.getElapsedTime() % 5;

        if (groupRef.current) {
            const api = groupRef.current.getObjectByName('node-api-gateway') as THREE.Mesh;
            const db1 = groupRef.current.getObjectByName('node-db-primary') as THREE.Mesh;
            const db2 = groupRef.current.getObjectByName('node-db-cache') as THREE.Mesh;

            if (api && (api.material as THREE.MeshStandardMaterial)) {
                const m = api.material as THREE.MeshStandardMaterial;
                if ((t > 0.9 && t < 1.2) || (t > 2.5 && t < 2.8)) {
                    m.emissive.setHex(0xa855f7);
                    m.emissiveIntensity = 3;
                } else {
                    m.emissiveIntensity = THREE.MathUtils.lerp(m.emissiveIntensity, 0.5, 0.1);
                }
            }

            const flashDB = (mesh: THREE.Mesh) => {
                if (!mesh) return;
                const m = mesh.material as THREE.MeshStandardMaterial;
                if (t > 1.4 && t < 2.5) {
                    m.emissive.setHex(0xffffff);
                    m.emissiveIntensity = 2 + Math.sin(t * 20) * 1;
                } else {
                    m.emissive.setHex(0xf97316);
                    m.emissiveIntensity = THREE.MathUtils.lerp(m.emissiveIntensity, 0.5, 0.1);
                }
            };
            flashDB(db1);
            flashDB(db2);
        }
    });

    return (
        <group ref={groupRef}>
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={0.5} />

            {NODES.map(node => (
                <SystemNode key={node.id} data={node} />
            ))}

            <ConnectionLines />

            {/* Re-mounting particles on cycleKey change to reset them safely */}
            <group key={cycleKey}>
                <TraceParticle path={[getPos('client-1'), getPos('api-gateway')]} color={NEON_CYAN} delay={0} duration={1} />
                <TraceParticle path={[getPos('client-2'), getPos('api-gateway')]} color={NEON_CYAN} delay={0.2} duration={0.8} />

                <TraceParticle path={[getPos('api-gateway'), getPos('db-primary')]} color={NEON_CYAN} delay={1.0} duration={0.5} />
                <TraceParticle path={[getPos('api-gateway'), getPos('db-cache')]} color={NEON_CYAN} delay={1.0} duration={0.5} />

                <TraceParticle path={[getPos('db-primary'), getPos('api-gateway')]} color={NEON_PURPLE} delay={2.5} duration={0.5} />
                <TraceParticle path={[getPos('db-cache'), getPos('api-gateway')]} color={NEON_PURPLE} delay={2.5} duration={0.5} />

                <TraceParticle path={[getPos('api-gateway'), getPos('client-1')]} color={NEON_PURPLE} delay={3.0} duration={1} />
                <TraceParticle path={[getPos('api-gateway'), getPos('client-2')]} color={NEON_PURPLE} delay={3.0} duration={1} />
            </group>
        </group>
    );
};

const SystemVisualizer = () => {
    return (
        <div className="w-full h-full min-h-[600px] relative rounded-xl overflow-hidden cursor-move" style={{ background: '#050510' }}>
            {/* Labels (HTML Overlay for crisp text) */}
            <div className="absolute top-4 right-4 z-10 flex flex-col items-end space-y-2 pointer-events-none opacity-50">
                <div className="text-xs font-mono text-cyan-400">TIER 3: CLIENT</div>
                <div className="text-xs font-mono text-purple-400">TIER 2: API/LOGIC</div>
                <div className="text-xs font-mono text-orange-400">TIER 1: CORE DATA</div>
            </div>

            <div className="absolute bottom-4 left-4 z-10 pointer-events-none">
                <div className="flex items-center space-x-2">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    <span className="text-xs font-mono text-green-400/80">SYSTEM ONLINE</span>
                </div>
            </div>

            <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 14], fov: 45 }}>
                <React.Suspense fallback={null}>
                    <PerspectiveCamera makeDefault position={[0, 0, 14]} />
                    {/* Background handled by CSS */}

                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
                    <pointLight position={[-10, 5, -10]} intensity={2} color="#bc13fe" />

                    <Scene />
                </React.Suspense>
            </Canvas>
        </div>
    );
};

export default SystemVisualizer;
