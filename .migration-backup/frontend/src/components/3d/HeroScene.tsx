"use client"

import { useRef, Suspense } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { 
  Float, 
  PerspectiveCamera, 
  Text, 
  MeshDistortMaterial, 
  Sphere,
  Stars,
  Environment,
  ContactShadows
} from "@react-three/drei"
import * as THREE from "three"

function FloatingShape() {
  const meshRef = useRef<THREE.Mesh>(null!)
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, Math.cos(t / 2) / 8 + 0.25, 0.1)
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, Math.sin(t / 4) / 4, 0.1)
    meshRef.current.rotation.z = THREE.MathUtils.lerp(meshRef.current.rotation.z, Math.sin(t / 4) / 4, 0.1)
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, Math.sin(t / 2) / 4, 0.1)
  })

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1, 15]} />
        <MeshDistortMaterial
          color="#3b82f6"
          speed={3}
          distort={0.4}
          radius={1}
        />
      </mesh>
    </Float>
  )
}

function FinancialParticles() {
  const pointsRef = useRef<THREE.Points>(null!)
  const count = 100
  const positions = useRef(new Float32Array(count * 3))

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    pointsRef.current.rotation.y = t * 0.05
  })

  return (
    <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
  )
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background to-muted/20">
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={45} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        <Suspense fallback={null}>
          <FloatingShape />
          <FinancialParticles />
          <Environment preset="city" />
          <ContactShadows 
            position={[0, -2, 0]} 
            opacity={0.4} 
            scale={10} 
            blur={2} 
            far={4.5} 
          />
        </Suspense>
      </Canvas>
    </div>
  )
}
