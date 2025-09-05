'use client';
import { Canvas } from '@react-three/fiber';
import { Stage, OrbitControls, Html, useGLTF, Text } from '@react-three/drei';
import { Suspense, useState } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';

interface ModelProps {
  modelPath: string;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  onClick?: () => void;
}

function LoadingFallback() {
  return (
    <Html center>
      <div className="flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600"></div>
        <span className="ml-4 text-white text-lg">Loading 3D Model...</span>
      </div>
    </Html>
  );
}

function TankModel({ modelPath, position = [0, 0, 0], rotation = [0, 0, 0], scale = 1, onClick }: ModelProps) {
  const { scene } = useGLTF(modelPath);
  const [hovered, setHovered] = useState(false);

  // Clone the scene to avoid conflicts if the same model is used multiple times
  const clonedScene = scene.clone();
  
  // Apply materials and lighting enhancements
  clonedScene.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.castShadow = true;
      child.receiveShadow = true;
      if (child.material) {
        child.material.metalness = 0.7;
        child.material.roughness = 0.3;
      }
    }
  });

  return (
    <primitive
      object={clonedScene}
      position={position}
      rotation={rotation}
      scale={hovered ? scale * 1.05 : scale}
      onClick={onClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    />
  );
}

interface EquipmentInfo {
  name: string;
  nameZh: string;
  category: string;
  specifications: {
    length?: string;
    width?: string;
    height?: string;
    weight?: string;
    maxSpeed?: string;
    range?: string;
    armament?: string;
  };
  description: string;
}

interface Model3DProps {
  modelPath: string;
  equipmentInfo: EquipmentInfo;
  className?: string;
}

export default function Model3D({ modelPath, equipmentInfo, className = "" }: Model3DProps) {
  const [showInfo, setShowInfo] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);

  const handleModelClick = () => {
    setShowInfo(!showInfo);
  };

  return (
    <div className={`relative w-full h-full ${className}`}>
      {/* 3D Canvas */}
      <Canvas
        dpr={[1, 2]}
        camera={{ fov: 45, position: [5, 2, 5] }}
        shadows
        className="bg-gradient-to-b from-gray-900 to-black"
      >
        <Suspense fallback={<LoadingFallback />}>
          {/* Lighting */}
          <ambientLight intensity={0.4} />
          <directionalLight
            position={[10, 10, 5]}
            intensity={1}
            castShadow
            shadow-mapSize={[2048, 2048]}
          />
          <spotLight
            position={[-10, 15, 10]}
            angle={0.3}
            penumbra={1}
            intensity={0.5}
            castShadow
          />

          {/* Stage for better lighting and shadows */}
          <Stage environment="city" intensity={0.6}>
            <TankModel
              modelPath={modelPath}
              onClick={handleModelClick}
            />
          </Stage>

          {/* Camera Controls */}
          <OrbitControls
            autoRotate={autoRotate}
            autoRotateSpeed={1}
            enableZoom={true}
            enablePan={true}
            minDistance={3}
            maxDistance={20}
            minPolarAngle={0}
            maxPolarAngle={Math.PI / 2}
          />

          {/* 3D Text Labels */}
          <Text
            position={[0, 3, 0]}
            fontSize={0.5}
            color="white"
            anchorX="center"
            anchorY="middle"
            font="/fonts/roboto-bold.woff"
          >
            {equipmentInfo.name}
          </Text>
        </Suspense>
      </Canvas>

      {/* Control Panel */}
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <button
          onClick={() => setAutoRotate(!autoRotate)}
          className="px-4 py-2 bg-black/60 backdrop-blur-sm text-white rounded-lg hover:bg-black/80 transition-all"
        >
          {autoRotate ? '⏸️ Pause' : '▶️ Rotate'}
        </button>
        <button
          onClick={handleModelClick}
          className="px-4 py-2 bg-red-600/80 backdrop-blur-sm text-white rounded-lg hover:bg-red-600 transition-all"
        >
          ℹ️ Info
        </button>
      </div>

      {/* Information Panel */}
      {showInfo && (
        <motion.div
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '100%' }}
          className="absolute top-0 right-0 w-80 h-full bg-black/90 backdrop-blur-md text-white p-6 overflow-y-auto"
        >
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-2xl font-bold mb-2">{equipmentInfo.name}</h3>
              <p className="text-lg text-red-400 mb-1">{equipmentInfo.nameZh}</p>
              <span className="inline-block px-3 py-1 bg-red-600 rounded-full text-sm">
                {equipmentInfo.category}
              </span>
            </div>
            <button
              onClick={() => setShowInfo(false)}
              className="text-2xl hover:text-red-400 transition-colors"
            >
              ×
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="text-lg font-semibold mb-2 text-red-400">Specifications</h4>
              <div className="space-y-2 text-sm">
                {equipmentInfo.specifications.length && (
                  <div className="flex justify-between">
                    <span className="text-gray-300">Length:</span>
                    <span>{equipmentInfo.specifications.length}</span>
                  </div>
                )}
                {equipmentInfo.specifications.width && (
                  <div className="flex justify-between">
                    <span className="text-gray-300">Width:</span>
                    <span>{equipmentInfo.specifications.width}</span>
                  </div>
                )}
                {equipmentInfo.specifications.height && (
                  <div className="flex justify-between">
                    <span className="text-gray-300">Height:</span>
                    <span>{equipmentInfo.specifications.height}</span>
                  </div>
                )}
                {equipmentInfo.specifications.weight && (
                  <div className="flex justify-between">
                    <span className="text-gray-300">Weight:</span>
                    <span>{equipmentInfo.specifications.weight}</span>
                  </div>
                )}
                {equipmentInfo.specifications.maxSpeed && (
                  <div className="flex justify-between">
                    <span className="text-gray-300">Max Speed:</span>
                    <span>{equipmentInfo.specifications.maxSpeed}</span>
                  </div>
                )}
                {equipmentInfo.specifications.range && (
                  <div className="flex justify-between">
                    <span className="text-gray-300">Range:</span>
                    <span>{equipmentInfo.specifications.range}</span>
                  </div>
                )}
                {equipmentInfo.specifications.armament && (
                  <div className="flex justify-between">
                    <span className="text-gray-300">Armament:</span>
                    <span>{equipmentInfo.specifications.armament}</span>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-2 text-red-400">Description</h4>
              <p className="text-sm text-gray-300 leading-relaxed">
                {equipmentInfo.description}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-700">
              <p className="text-xs text-gray-400 text-center">
                Click and drag to rotate • Scroll to zoom • Double-click to reset
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Loading Overlay */}
      <Suspense fallback={
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600 mx-auto mb-4"></div>
            <p className="text-white text-lg">Loading 3D Model...</p>
            <p className="text-gray-400 text-sm">This may take a few moments</p>
          </div>
        </div>
      } />
    </div>
  );
}

// Preload common models
useGLTF.preload('/models/tank.glb');
useGLTF.preload('/models/aircraft.glb');
useGLTF.preload('/models/missile.glb');
