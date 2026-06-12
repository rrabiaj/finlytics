"use client"

import { useRef, Suspense, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { 
  Sphere, 
  PerspectiveCamera, 
  Environment,
  ContactShadows,
  OrbitControls,
  Float
} from "@react-three/drei"
import * as THREE from "three"

function Globe() {
  const globeRef = useRef<THREE.Mesh>(null!)
  
  // Create pins/points on the globe
  const pins = useMemo(() => {
    const p = []
    for (let i = 0; i < 20; i++) {
      const phi = Math.acos(-1 + (2 * i) / 20)
      const theta = Math.sqrt(20 * Math.PI) * phi
      
      const x = Math.cos(theta) * Math.sin(phi)
      const y = Math.sin(theta) * Math.sin(phi)
      const z = Math.cos(phi)
      
      p.push(new THREE.Vector3(x, y, z).multiplyScalar(1.02))
    }
    return p
  }, [])

  useFrame((state) => {
    globeRef.current.rotation.y += 0.005
  })

  return (
    <group ref={globeRef}>
      <Sphere args={[1, 64, 64]}>
        <meshStandardMaterial 
          color="#1e293b" 
          wireframe 
          transparent 
          opacity={0.3} 
        />
      </Sphere>
      <Sphere args={[0.98, 64, 64]}>
        <meshStandardMaterial 
          color="#0f172a" 
          metalness={0.8} 
          roughness={0.2} 
        />
      </Sphere>
      
      {pins.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.02, 16, 16]} />
          <meshBasicMaterial color="#3b82f6" />
          <pointLight intensity={0.1} color="#3b82f6" />
        </mesh>
      ))}
    </group>
  )
}

export default function GlobeViz() {
  return (
    <div className="w-full h-full min-h-[300px] relative">
      <Canvas dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 3]} fov={45} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        
        <Suspense fallback={null}>
          <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <Globe />
          </Float>
          <Environment preset="city" />
        </Suspense>
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  )
}
