import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const PARTICLE_COUNT = 100

function Particles() {
  const pointsRef = useRef<THREE.Points>(null)
  const linesRef = useRef<THREE.LineSegments>(null)
  const mouseRef = useRef({ x: 0, y: 0 })

  const { positions, velocities, colors } = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3)
    const vel = new Float32Array(PARTICLE_COUNT * 3)
    const col = new Float32Array(PARTICLE_COUNT * 3)
    const palette = [
      new THREE.Color(0x00d4ff),
      new THREE.Color(0xffffff),
      new THREE.Color(0xff3366),
    ]
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10
      vel[i * 3] = (Math.random() - 0.5) * 0.005
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.005
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.002
      const c = palette[Math.floor(Math.random() * palette.length)]
      col[i * 3] = c.r
      col[i * 3 + 1] = c.g
      col[i * 3 + 2] = c.b
    }
    return { positions: pos, velocities: vel, colors: col }
  }, [])

  const linePositions = useMemo(() => new Float32Array(PARTICLE_COUNT * PARTICLE_COUNT * 6), [])
  const lineColors = useMemo(() => new Float32Array(PARTICLE_COUNT * PARTICLE_COUNT * 6), [])

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    return geo
  }, [positions, colors])

  const lineGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3))
    geo.setAttribute('color', new THREE.BufferAttribute(lineColors, 3))
    return geo
  }, [linePositions, lineColors])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useFrame(() => {
    if (!pointsRef.current) return
    const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute
    const posArray = posAttr.array as Float32Array

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const idx = i * 3
      posArray[idx] += velocities[idx]
      posArray[idx + 1] += velocities[idx + 1]
      posArray[idx + 2] += velocities[idx + 2]

      const dx = posArray[idx] - mouseRef.current.x * 10
      const dy = posArray[idx + 1] - mouseRef.current.y * 10
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < 3 && dist > 0.001) {
        const force = ((3 - dist) / dist) * 0.02
        posArray[idx] += dx * force
        posArray[idx + 1] += dy * force
      }

      if (posArray[idx] > 10) posArray[idx] = -10
      if (posArray[idx] < -10) posArray[idx] = 10
      if (posArray[idx + 1] > 10) posArray[idx + 1] = -10
      if (posArray[idx + 1] < -10) posArray[idx + 1] = 10
    }
    posAttr.needsUpdate = true

    if (linesRef.current) {
      const lPos = linesRef.current.geometry.attributes.position.array as Float32Array
      const lCol = linesRef.current.geometry.attributes.color.array as Float32Array
      let lineIdx = 0
      const cyan = new THREE.Color(0x00d4ff)
      const maxDist = 7.5

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        for (let j = i + 1; j < PARTICLE_COUNT; j++) {
          const dxi = posArray[i * 3] - posArray[j * 3]
          const dyi = posArray[i * 3 + 1] - posArray[j * 3 + 1]
          const dzi = posArray[i * 3 + 2] - posArray[j * 3 + 2]
          const dist = Math.sqrt(dxi * dxi + dyi * dyi + dzi * dzi)

          if (dist < maxDist) {
            const opacity = 1 - dist / maxDist
            lPos[lineIdx * 6] = posArray[i * 3]
            lPos[lineIdx * 6 + 1] = posArray[i * 3 + 1]
            lPos[lineIdx * 6 + 2] = posArray[i * 3 + 2]
            lPos[lineIdx * 6 + 3] = posArray[j * 3]
            lPos[lineIdx * 6 + 4] = posArray[j * 3 + 1]
            lPos[lineIdx * 6 + 5] = posArray[j * 3 + 2]
            lCol[lineIdx * 6] = cyan.r * opacity * 0.6
            lCol[lineIdx * 6 + 1] = cyan.g * opacity * 0.6
            lCol[lineIdx * 6 + 2] = cyan.b * opacity * 0.6
            lCol[lineIdx * 6 + 3] = cyan.r * opacity * 0.6
            lCol[lineIdx * 6 + 4] = cyan.g * opacity * 0.6
            lCol[lineIdx * 6 + 5] = cyan.b * opacity * 0.6
            lineIdx++
          }
        }
      }
      for (let i = lineIdx; i < PARTICLE_COUNT * PARTICLE_COUNT; i++) {
        lPos[i * 6] = 0
        lPos[i * 6 + 1] = 0
        lPos[i * 6 + 2] = 0
        lPos[i * 6 + 3] = 0
        lPos[i * 6 + 4] = 0
        lPos[i * 6 + 5] = 0
      }
      linesRef.current.geometry.attributes.position.needsUpdate = true
      linesRef.current.geometry.attributes.color.needsUpdate = true
    }
  })

  return (
    <>
      <points ref={pointsRef} geometry={geometry}>
        <pointsMaterial size={0.08} vertexColors transparent opacity={0.8} sizeAttenuation />
      </points>
      <lineSegments ref={linesRef} geometry={lineGeometry}>
        <lineBasicMaterial vertexColors transparent opacity={0.3} />
      </lineSegments>
    </>
  )
}

export default function ParticleField() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 8], fov: 75 }} dpr={[1, 2]} gl={{ antialias: false, alpha: true }}>
        <Particles />
      </Canvas>
    </div>
  )
}
