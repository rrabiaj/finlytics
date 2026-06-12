"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, Sphere, MeshDistortMaterial } from "@react-three/drei"
import * as THREE from "three"

function Grid() {
  const meshRef = useRef<THREE.GridHelper>(null!)
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    meshRef.current.rotation.x = Math.PI / 2 + Math.sin(t / 10) * 0.1
    meshRef.current.rotation.z = t * 0.05
  })

  return (
    <gridHelper ref={meshRef} args={[20, 20, "#3b82f6", "#1e293b"]} position={[0, -2, 0]} opacity={0.2} transparent />
  )
}

function FloatingShapes() {
  return (
    <>
      <Float speed={5} rotationIntensity={2} floatIntensity={2}>
        <mesh position={[5, 2, -5]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#3b82f6" wireframe opacity={0.1} transparent />
        </mesh>
      </Float>
      <Float speed={4} rotationIntensity={1} floatIntensity={3}>
        <mesh position={[-5, -2, -8]}>
          <icosahedronGeometry args={[2, 1]} />
          <meshStandardMaterial color="#60a5fa" wireframe opacity={0.1} transparent />
        </mesh>
      </Float>
    </>
  )
}

export default function DashboardBackground() {
  return (
    <div className="fixed inset-0 -z-20 pointer-events-none opacity-40">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <Grid />
        <FloatingShapes />
      </Canvas>
    </div>
  )
}
