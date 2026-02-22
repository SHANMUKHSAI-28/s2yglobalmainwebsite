import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

function Orb({ color = '#c9a84c', speed = 0.5 }) {
  const mesh = useRef();
  useFrame((state) => {
    const t = state.clock.getElapsedTime() * speed;
    mesh.current.position.y = Math.sin(t) * 0.3;
    mesh.current.scale.setScalar(1 + Math.sin(t * 1.5) * 0.05);
  });

  return (
    <mesh ref={mesh}>
      <sphereGeometry args={[1.5, 64, 64]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.3}
        roughness={0.2}
        metalness={0.8}
        transparent
        opacity={0.15}
      />
    </mesh>
  );
}

export default function GlowOrb({ color, speed, style = {} }) {
  return (
    <div style={{
      width: '400px',
      height: '400px',
      position: 'absolute',
      pointerEvents: 'none',
      ...style,
    }}>
      <Canvas camera={{ position: [0, 0, 5] }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={1} />
        <Orb color={color} speed={speed} />
      </Canvas>
    </div>
  );
}
