import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
`

const fragmentShader = `
precision highp float;
varying vec2 vUv;
uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uMouse;

#define PI 3.14159265359

// Random functions
float hash(float n) { return fract(sin(n) * 43758.5453123); }
float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

// Noise
float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = rot * p * 2.0;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = vUv;
  vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
  vec2 p = (uv - 0.5) * aspect;
  
  float t = uTime * 0.15;
  
  // Perspective grid
  vec2 gridUV = p * 3.0;
  float gridLine = 0.0;
  float perspective = 1.0 / (1.0 + abs(p.y) * 2.0);
  
  // Horizontal grid lines with perspective
  float horizon = 0.3;
  float yWarped = sign(p.y + horizon) * log(abs(p.y + horizon) + 0.01) * 2.0;
  float gridY = abs(fract(yWarped * 4.0 + t * 0.5) - 0.5) * 2.0;
  gridLine += smoothstep(0.05, 0.0, gridY) * 0.15 * perspective;
  
  // Vertical grid lines
  float gridX = abs(fract(p.x * 6.0) - 0.5) * 2.0;
  gridLine += smoothstep(0.03, 0.0, gridX) * 0.12 * perspective;
  
  // Animated noise field
  vec2 noiseP = p * 1.5 + vec2(t * 0.3, t * 0.2);
  float n = fbm(noiseP);
  float n2 = fbm(noiseP + vec2(5.2, 1.3));
  
  // Stars / bright particles
  float stars = 0.0;
  for (int i = 0; i < 20; i++) {
    float fi = float(i);
    vec2 starPos = vec2(
      hash(fi * 1.23 + 0.5) - 0.5,
      hash(fi * 2.71 + 0.7) - 0.5
    ) * aspect * 2.0;
    starPos.x += sin(t * 0.1 + fi) * 0.1;
    starPos.y += cos(t * 0.15 + fi * 0.7) * 0.05;
    float starDist = length(p - starPos);
    float starSize = 0.003 + hash(fi * 3.14) * 0.008;
    float starBrightness = hash(fi * 5.55);
    float twinkle = sin(uTime * 2.0 + fi * 10.0) * 0.5 + 0.5;
    stars += smoothstep(starSize, 0.0, starDist) * starBrightness * twinkle * 0.8;
  }
  
  // Mouse influence - glow near cursor
  vec2 mouseWorld = (uMouse - 0.5) * aspect;
  float mouseDist = length(p - mouseWorld);
  float mouseGlow = smoothstep(0.8, 0.0, mouseDist) * 0.15;
  
  // Color palette
  vec3 cyan = vec3(0.0, 0.831, 1.0);
  vec3 violet = vec3(0.486, 0.227, 0.929);
  vec3 magenta = vec3(1.0, 0.2, 0.4);
  vec3 baseColor = vec3(0.02, 0.02, 0.03);
  
  // Grid color
  vec3 gridColor = mix(cyan, violet, n) * gridLine;
  
  // Stars color
  vec3 starColor = mix(cyan, magenta, n2) * stars;
  
  // Noise glow
  float noiseGlow = smoothstep(0.3, 0.7, n) * 0.08;
  vec3 glowColor = mix(violet, cyan, n2) * noiseGlow;
  
  // Combine
  vec3 color = baseColor + gridColor + starColor + glowColor;
  color += cyan * mouseGlow;
  
  // Vignette
  float vignette = 1.0 - smoothstep(0.4, 1.2, length(p));
  color *= vignette * 0.7 + 0.3;
  
  // Chromatic aberration at edges
  float chromaStrength = smoothstep(0.3, 1.0, length(p)) * 0.02;
  color.r += chromaStrength * sin(uv.x * 50.0 + t);
  color.b -= chromaStrength * cos(uv.y * 50.0 - t);
  
  // Subtle scanline
  float scanline = sin(uv.y * 400.0 + uTime * 10.0) * 0.02 + 0.98;
  color *= scanline;
  
  gl_FragColor = vec4(color, 1.0);
}
`

function ShaderPlane() {
  const materialRef = useRef<THREE.ShaderMaterial>(null)
  const mouseRef = useRef({ x: 0.5, y: 0.5 })

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    }),
    []
  )

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX / window.innerWidth
      mouseRef.current.y = 1.0 - e.clientY / window.innerHeight
    }
    const handleResize = () => {
      uniforms.uResolution.value.set(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
    }
  }, [uniforms])

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime
      materialRef.current.uniforms.uMouse.value.x +=
        (mouseRef.current.x - materialRef.current.uniforms.uMouse.value.x) * 0.05
      materialRef.current.uniforms.uMouse.value.y +=
        (mouseRef.current.y - materialRef.current.uniforms.uMouse.value.y) * 0.05
    }
  })

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthWrite={false}
      />
    </mesh>
  )
}

export default function ShaderBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 1], fov: 75 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: false }}
        style={{ background: '#050508' }}
      >
        <ShaderPlane />
      </Canvas>
    </div>
  )
}
