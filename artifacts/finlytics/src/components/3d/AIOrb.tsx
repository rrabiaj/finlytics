"use client"

import { useRef, Suspense } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { 
  Float, 
  Sphere, 
  MeshDistortMaterial, 
  MeshWobbleMaterial,
  Environment,
  ContactShadows,
  OrbitControls
} from "@react-three/drei"
import * as THREE from "three"

function AnimatedOrb({ isThinking = false }: { isThinking?: boolean }) {
  const orbRef = useRef<THREE.Mesh>(null!)
  const ringRef = useRef<THREE.Mesh>(null!)
  const outerRingRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    
    // Orb animation
    orbRef.current.rotation.z = t * 0.2
    
    // Rings animation
    ringRef.current.rotation.x = t * 0.5
    ringRef.current.rotation.y = t * 0.2
    
    outerRingRef.current.rotation.x = -t * 0.3
    outerRingRef.current.rotation.y = -t * 0.4
    
    if (isThinking) {
      const scale = 1 + Math.sin(t * 10) * 0.05
      orbRef.current.scale.set(scale, scale, scale)
    } else {
      orbRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1)
    }
  })

  return (
    <group>
      {/* Central Orb */}
      <Sphere ref={orbRef} args={[1, 64, 64]}>
        <MeshDistortMaterial
          color="#3b82f6"
          speed={isThinking ? 5 : 2}
          distort={0.4}
          radius={1}
          emissive="#1e40af"
          emissiveIntensity={0.5}
        />
      </Sphere>

      {/* Inner Ring */}
      <mesh ref={ringRef}>
        <torusGeometry args={[1.5, 0.02, 16, 100]} />
        <meshStandardMaterial color="#60a5fa" emissive="#60a5fa" emissiveIntensity={2} />
      </mesh>

      {/* Outer Ring */}
      <mesh ref={outerRingRef}>
        <torusGeometry args={[1.8, 0.01, 16, 100]} />
        <meshStandardMaterial color="#93c5fd" transparent opacity={0.5} />
      </mesh>

      {/* Glow effect particles could go here */}
    </group>
  )
}

export default function AIOrb({ isThinking = false }: { isThinking?: boolean }) {
  return (
    <div className="w-full h-[400px] relative">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        
        <Suspense fallback={null}>
          <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <AnimatedOrb isThinking={isThinking} />
          </Float>
          <Environment preset="city" />
          <ContactShadows 
            position={[0, -2.5, 0]} 
            opacity={0.4} 
            scale={10} 
            blur={2.5} 
            far={4.5} 
          />
        </Suspense>
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  )
}
