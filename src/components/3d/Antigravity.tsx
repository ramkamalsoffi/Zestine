/* eslint-disable react/no-unknown-property */
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useMemo, useRef, useEffect } from 'react';
import * as THREE from 'three';

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────
export type ParticleShape = 'capsule' | 'sphere' | 'box' | 'tetrahedron';

export interface AntigravityProps {
    count?: number;
    magnetRadius?: number;
    ringRadius?: number;
    waveSpeed?: number;
    waveAmplitude?: number;
    particleSize?: number;
    lerpSpeed?: number;
    color?: string;
    color2?: string; // ← Second color for dual-color mode
    autoAnimate?: boolean;
    particleVariance?: number;
    rotationSpeed?: number;
    depthFactor?: number;
    pulseSpeed?: number;
    particleShape?: ParticleShape;
    fieldStrength?: number;
}

interface Particle {
    t: number;
    factor: number;
    speed: number;
    xFactor: number;
    yFactor: number;
    zFactor: number;
    mx: number;
    my: number;
    mz: number;
    cx: number;
    cy: number;
    cz: number;
    vx: number;
    vy: number;
    vz: number;
    randomRadiusOffset: number;
}

// ─────────────────────────────────────────────
// Shared tick logic for a batch of particles
// ─────────────────────────────────────────────
function tickParticles(
    particles: Particle[],
    mesh: THREE.InstancedMesh,
    dummy: THREE.Object3D,
    targetX: number,
    targetY: number,
    globalRotation: number,
    opts: Required<Pick<AntigravityProps,
        'magnetRadius' | 'ringRadius' | 'waveSpeed' | 'waveAmplitude' |
        'lerpSpeed' | 'depthFactor' | 'fieldStrength' | 'pulseSpeed' |
        'particleVariance' | 'particleSize'>>
) {
    const { magnetRadius, ringRadius, waveSpeed, waveAmplitude,
        lerpSpeed, depthFactor, fieldStrength, pulseSpeed, particleVariance, particleSize } = opts;

    particles.forEach((particle, i) => {
        let { t, speed, mx, my, mz, cz, randomRadiusOffset } = particle;
        t = particle.t += speed / 2;

        const projectionFactor = 1 - cz / 50;
        const projectedX = targetX * projectionFactor;
        const projectedY = targetY * projectionFactor;

        const dx = mx - projectedX;
        const dy = my - projectedY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        let targetPos = { x: mx, y: my, z: mz * depthFactor };

        if (dist < magnetRadius) {
            const angle = Math.atan2(dy, dx) + globalRotation;
            const wave = Math.sin(t * waveSpeed + angle) * (0.5 * waveAmplitude);
            const deviation = randomRadiusOffset * (5 / (fieldStrength + 0.1));
            const currentRingRadius = ringRadius + wave + deviation;
            targetPos = {
                x: projectedX + currentRingRadius * Math.cos(angle),
                y: projectedY + currentRingRadius * Math.sin(angle),
                z: mz * depthFactor + Math.sin(t) * waveAmplitude * depthFactor,
            };
        }

        particle.cx += (targetPos.x - particle.cx) * lerpSpeed;
        particle.cy += (targetPos.y - particle.cy) * lerpSpeed;
        particle.cz += (targetPos.z - particle.cz) * lerpSpeed;

        dummy.position.set(particle.cx, particle.cy, particle.cz);
        dummy.lookAt(projectedX, projectedY, particle.cz);
        dummy.rotateX(Math.PI / 2);

        const distToMouse = Math.sqrt(
            Math.pow(particle.cx - projectedX, 2) + Math.pow(particle.cy - projectedY, 2)
        );
        const distFromRing = Math.abs(distToMouse - ringRadius);
        // Maintain a minimum scale of 0.35 so particles are visible everywhere (not dull)
        // and increase the falloff distance so the transition is smoother
        const scaleFactor = Math.max(0.35, Math.min(1, 1 - distFromRing / 30));
        const finalScale = scaleFactor * (0.8 + Math.sin(t * pulseSpeed) * 0.2 * particleVariance) * particleSize;

        dummy.scale.set(finalScale, finalScale, finalScale);
        dummy.updateMatrix();
        mesh.setMatrixAt(i, dummy.matrix);
    });

    mesh.instanceMatrix.needsUpdate = true;
}

// ─────────────────────────────────────────────
// Inner particle scene
// ─────────────────────────────────────────────
function AntigravityInner({
    count = 300,
    magnetRadius = 10,
    ringRadius = 10,
    waveSpeed = 0.4,
    waveAmplitude = 1,
    particleSize = 2,
    lerpSpeed = 0.1,
    color = '#ef4444',
    color2,
    autoAnimate = false,
    particleVariance = 1,
    rotationSpeed = 0,
    depthFactor = 1,
    pulseSpeed = 3,
    particleShape = 'capsule',
    fieldStrength = 10,
}: AntigravityProps) {
    const meshARef = useRef<THREE.InstancedMesh>(null); // First color
    const meshBRef = useRef<THREE.InstancedMesh>(null); // Second color
    const { viewport } = useThree();
    const dummy = useMemo(() => new THREE.Object3D(), []);

    const lastMousePos = useRef({ x: 0, y: 0 });
    const lastMouseMoveTime = useRef(0);
    const virtualMouse = useRef({ x: 0, y: 0 });
    const globalPointer = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Normalize to -1 to +1 standard WebGL coordinates
            globalPointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
            globalPointer.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Split particles into two halves if dual-color, else all in one group
    const { particlesA, particlesB } = useMemo(() => {
        const build = (): Particle[] => {
            const temp: Particle[] = [];
            const width = viewport.width || 100;
            const height = viewport.height || 100;
            const n = color2 ? Math.ceil(count / 2) : count;
            for (let i = 0; i < n; i++) {
                const x = (Math.random() - 0.5) * width;
                const y = (Math.random() - 0.5) * height;
                const z = (Math.random() - 0.5) * 20;
                temp.push({
                    t: Math.random() * 100,
                    factor: 20 + Math.random() * 100,
                    speed: 0.01 + Math.random() / 200,
                    xFactor: -50 + Math.random() * 100,
                    yFactor: -50 + Math.random() * 100,
                    zFactor: -50 + Math.random() * 100,
                    mx: x, my: y, mz: z,
                    cx: x, cy: y, cz: z,
                    vx: 0, vy: 0, vz: 0,
                    randomRadiusOffset: (Math.random() - 0.5) * 2,
                });
            }
            return temp;
        };
        return { particlesA: build(), particlesB: color2 ? build() : [] };
    }, [count, color2, viewport.width, viewport.height]);

    const tickOpts = { magnetRadius, ringRadius, waveSpeed, waveAmplitude, lerpSpeed, depthFactor, fieldStrength, pulseSpeed, particleVariance, particleSize };

    useFrame((state) => {
        const { viewport: v } = state;
        const m = globalPointer.current;

        const mouseDist = Math.sqrt(
            Math.pow(m.x - lastMousePos.current.x, 2) +
            Math.pow(m.y - lastMousePos.current.y, 2)
        );
        if (mouseDist > 0.001) {
            lastMouseMoveTime.current = Date.now();
            lastMousePos.current = { x: m.x, y: m.y };
        }

        let destX = (m.x * v.width) / 2;
        let destY = (m.y * v.height) / 2;

        if (autoAnimate && Date.now() - lastMouseMoveTime.current > 2000) {
            const time = state.clock.getElapsedTime();
            destX = Math.sin(time * 0.5) * (v.width / 4);
            destY = Math.cos(time * 0.5 * 2) * (v.height / 4);
        }

        // Increased from 0.12 to 0.85 to almost eliminate the lag while keeping it slightly smooth
        const smoothFactor = 0.85;
        virtualMouse.current.x += (destX - virtualMouse.current.x) * smoothFactor;
        virtualMouse.current.y += (destY - virtualMouse.current.y) * smoothFactor;

        const targetX = virtualMouse.current.x;
        const targetY = virtualMouse.current.y;
        const globalRotation = state.clock.getElapsedTime() * rotationSpeed;

        if (meshARef.current) tickParticles(particlesA, meshARef.current, dummy, targetX, targetY, globalRotation, tickOpts);
        if (meshBRef.current && color2) tickParticles(particlesB, meshBRef.current, dummy, targetX, targetY, globalRotation, tickOpts);
    });

    const geom = (
        <>
            {particleShape === 'capsule' && <capsuleGeometry args={[0.1, 0.4, 4, 8]} />}
            {particleShape === 'sphere' && <sphereGeometry args={[0.2, 16, 16]} />}
            {particleShape === 'box' && <boxGeometry args={[0.3, 0.3, 0.3]} />}
            {particleShape === 'tetrahedron' && <tetrahedronGeometry args={[0.3]} />}
        </>
    );

    return (
        <>
            {/* First color mesh */}
            <instancedMesh ref={meshARef} args={[undefined, undefined, particlesA.length]}>
                {geom}
                <meshBasicMaterial color={color} />
            </instancedMesh>

            {/* Second color mesh — only rendered if color2 is provided */}
            {color2 && (
                <instancedMesh ref={meshBRef} args={[undefined, undefined, particlesB.length]}>
                    {geom}
                    <meshBasicMaterial color={color2} />
                </instancedMesh>
            )}
        </>
    );
}

// ─────────────────────────────────────────────
// Default export: Canvas wrapper
// ─────────────────────────────────────────────
export default function Antigravity(props: AntigravityProps) {
    return (
        <Canvas
            camera={{ position: [0, 0, 50], fov: 35 }}
            style={{ width: '100%', height: '100%' }}
            gl={{ antialias: true, alpha: true }}
            dpr={[1, 1.5]}
        >
            <AntigravityInner {...props} />
        </Canvas>
    );
}
