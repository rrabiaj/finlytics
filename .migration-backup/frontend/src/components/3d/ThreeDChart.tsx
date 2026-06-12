"use client"

import { useRef, Suspense } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { 
  Box, 
  PerspectiveCamera, 
  Environment,
  ContactShadows,
  OrbitControls,
  Text,
  Float
} from "@react-three/drei"
import * as THREE from "three"

const data = [
  { label: "Jun", value: 82, color: "#3b82f6" },
  { label: "Jul", value: 88, color: "#60a5fa" },
  { label: "Aug", value: 95, color: "#93c5fd" },
  { label: "Sep", value: 102, color: "#2563eb" },
  { label: "Oct", value: 110, color: "#1d4ed8" },
  { label: "Nov", value: 105, color: "#1e40af" },
  { label: "Dec", value: 125, color: "#1e3a8a" },
]

function Bar({ position, height, color, label }: { position: [number, number, number], height: number, color: string, label: string }) {
  const meshRef = useRef<THREE.Mesh>(null!)
  const scaledHeight = height / 50

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    // Subtle breathing effect
    meshRef.current.scale.y = THREE.MathUtils.lerp(meshRef.current.scale.y, 1, 0.1)
  })

  return (
    <group position={position}>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <Box 
          ref={meshRef} 
          args={[0.8, scaledHeight, 0.8]} 
          position={[0, scaledHeight / 2, 0]}
        >
          <meshStandardMaterial color={color} metalness={0.5} roughness={0.2} />
        </Box>
        <Text
          position={[0, scaledHeight + 0.5, 0]}
          fontSize={0.3}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {`$${height}k`}
        </Text>
      </Float>
      <Text
        position={[0, -0.5, 0]}
        fontSize={0.25}
        color="#94a3b8"
        anchorX="center"
        anchorY="middle"
        rotation={[-Math.PI / 4, 0, 0]}
      >
        {label}
      </Text>
    </group>
  )
}

export default function ThreeDChart() {
  return (
    <div className="w-full h-full relative min-h-[400px]">
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[8, 5, 8]} fov={35} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        <Suspense fallback={null}>
          <group position={[-3, 0, 0]}>
            {data.map((item, i) => (
              <Bar 
                key={i} 
                position={[i * 1.2, 0, 0]} 
                height={item.value} 
                color={item.color} 
                label={item.label}
              />
            ))}
          </group>
          <Environment preset="city" />
          <ContactShadows 
            position={[0, -0.1, 0]} 
            opacity={0.4} 
            scale={15} 
            blur={2} 
            far={4.5} 
          />
        </Suspense>
        <OrbitControls 
          enableZoom={false} 
          minPolarAngle={Math.PI / 4} 
          maxPolarAngle={Math.PI / 2.1}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  )
}
