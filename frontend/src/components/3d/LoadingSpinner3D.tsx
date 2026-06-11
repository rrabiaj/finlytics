"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, Torus, MeshDistortMaterial } from "@react-three/drei"
import * as THREE from "three"

function Spinner() {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    meshRef.current.rotation.x = t * 2
    meshRef.current.rotation.y = t * 1.5
  })

  return (
    <Torus ref={meshRef} args={[1, 0.2, 16, 100]}>
      <MeshDistortMaterial
        color="#3b82f6"
        speed={5}
        distort={0.3}
        radius={1}
      />
    </Torus>
  )
}

export default function LoadingSpinner3D() {
  return (
    <div className="w-16 h-16">
      <Canvas camera={{ position: [0, 0, 5], fov: 25 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Spinner />
      </Canvas>
    </div>
  )
}
