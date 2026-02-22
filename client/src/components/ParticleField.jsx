import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Particles({ count = 2000 }) {
  const mesh = useRef();
  const light = useRef();

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50;
      scales[i] = Math.random();
    }
    return { positions, scales };
  }, [count]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    mesh.current.rotation.x = time * 0.02;
    mesh.current.rotation.y = time * 0.03;
    if (light.current) {
      light.current.position.x = Math.sin(time * 0.3) * 10;
      light.current.position.y = Math.cos(time * 0.2) * 10;
    }
  });

  return (
    <>
      <pointLight ref={light} distance={40} intensity={8} color="#c9a84c" />
      <points ref={mesh}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particles.positions.length / 3}
            array={particles.positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.05}
          color="#c9a84c"
          sizeAttenuation
          transparent
          opacity={0.6}
          depthWrite={false}
        />
      </points>
    </>
  );
}

export default function ParticleField({ className = '' }) {
  return (
    <div className={className} style={{
      position: 'absolute',
      inset: 0,
      zIndex: 0,
      opacity: 0.5,
    }}>
      <Canvas
        camera={{ position: [0, 0, 15], fov: 60 }}
        dpr={[1, 1.5]}
        style={{ background: 'transparent' }}
      >
        <Particles />
      </Canvas>
    </div>
  );
}
