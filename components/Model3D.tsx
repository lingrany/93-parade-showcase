'use client';
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Stage, OrbitControls, useGLTF, Html } from '@react-three/drei';
import { motion } from 'framer-motion';

interface Model3DProps {
  modelPath: string;
  title: string;
  description?: string;
  className?: string;
}

function ModelComponent({ modelPath }: { modelPath: string }) {
  const { scene } = useGLTF(modelPath);
  
  if (!scene) {
    return (
      <Html center>
        <div className="text-white text-center p-4 bg-black/50 rounded-lg">
          <div className="text-4xl mb-2">🚀</div>
          <div>3D Model Loading...</div>
        </div>
      </Html>
    );
  }
  
  return <primitive object={scene} scale={1} />;
}

function LoadingFallback() {
  return (
    <Html center>
      <div className="text-white text-center p-4 bg-black/50 rounded-lg">
        <div className="w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
        <div>Loading 3D Model...</div>
      </div>
    </Html>
  );
}

export default function Model3D({ modelPath, title, description, className = "" }: Model3DProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className={`relative ${className}`}
    >
      <div className="aspect-square bg-gradient-to-br from-gray-900 to-black rounded-xl overflow-hidden border border-red-500/20">
        <Canvas
          dpr={[1, 2]}
          camera={{ fov: 45, position: [0, 0, 5] }}
          className="w-full h-full"
        >
          <Suspense fallback={<LoadingFallback />}>
            <Stage environment="city" intensity={0.6} adjustCamera={1.2}>
              <ModelComponent modelPath={modelPath} />
            </Stage>
            <OrbitControls
              autoRotate
              autoRotateSpeed={2}
              enableZoom={true}
              enablePan={false}
              maxPolarAngle={Math.PI / 2}
              minPolarAngle={Math.PI / 4}
            />
          </Suspense>
        </Canvas>
        
        {/* 控制提示 */}
        <div className="absolute bottom-4 left-4 text-white/70 text-sm">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <span>Drag to rotate</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <span>Scroll to zoom</span>
          </div>
        </div>
      </div>
      
      {/* 模型信息 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        className="mt-4 text-center"
      >
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        {description && (
          <p className="text-gray-300 text-sm">{description}</p>
        )}
      </motion.div>
    </motion.div>
  );
}

// 预加载模型
useGLTF.preload('/models/df-21d.glb');
useGLTF.preload('/models/j-15.glb');
useGLTF.preload('/models/type-99a2.glb');