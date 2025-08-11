import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';

const ThreeBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none -z-10">
      <Canvas camera={{ position: [0, 0, 6], fov: 60 }}>
        <Suspense fallback={null}>
          <Stars radius={80} depth={40} count={2000} factor={3.5} saturation={0} fade speed={0.5} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default ThreeBackground;


