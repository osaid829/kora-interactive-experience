'use client';

import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function WaterRippleMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseRef.current.targetX = x;
      mouseRef.current.targetY = y;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uColorDeep: { value: new THREE.Color('#0D0C0B') },
      uColorShallow: { value: new THREE.Color('#211E1A') },
      uColorHighlight: { value: new THREE.Color('#C97A47') },
      uColorOchre: { value: new THREE.Color('#D4A359') },
    }),
    []
  );

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    const material = meshRef.current.material as THREE.ShaderMaterial;
    material.uniforms.uTime.value += delta * 0.8;

    // Smooth mouse interpolation
    mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
    mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;
    material.uniforms.uMouse.value.set(mouseRef.current.x, mouseRef.current.y);

    // Subtle breathing orientation
    meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.2) * 0.05;
  });

  const vertexShader = `
    varying vec2 vUv;
    varying float vElevation;
    uniform float uTime;
    uniform vec2 uMouse;

    void main() {
      vUv = uv;
      vec3 pos = position;

      // Base harmonic ripples (Singing bowl 432Hz standing waves)
      float distToCenter = length(pos.xy);
      float ripple1 = sin(distToCenter * 6.0 - uTime * 2.0) * 0.12;
      float ripple2 = cos(distToCenter * 12.0 - uTime * 1.5) * 0.06;

      // Interactive cursor ripples
      float distToMouse = length(pos.xy - vec3(uMouse * 2.0, 0.0).xy);
      float mouseWave = sin(distToMouse * 10.0 - uTime * 4.0) * exp(-distToMouse * 1.8) * 0.25;

      pos.z += ripple1 + ripple2 + mouseWave;
      vElevation = pos.z;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;

  const fragmentShader = `
    varying vec2 vUv;
    varying float vElevation;
    uniform vec3 uColorDeep;
    uniform vec3 uColorShallow;
    uniform vec3 uColorHighlight;
    uniform vec3 uColorOchre;

    void main() {
      // Color interpolation based on wave height
      float depthMix = smoothstep(-0.2, 0.2, vElevation);
      vec3 waterColor = mix(uColorDeep, uColorShallow, depthMix);

      // Specular highlight on crests (terracotta & golden ochre shimmer)
      float highlight = smoothstep(0.08, 0.22, vElevation);
      vec3 finalColor = mix(waterColor, uColorHighlight, highlight * 0.6);

      // Edge fade for seamless blending with dark basalt background
      float edgeDist = length(vUv - 0.5) * 2.0;
      float alpha = smoothstep(1.0, 0.2, edgeDist) * 0.85;

      gl_FragColor = vec4(finalColor, alpha);
    }
  `;

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 3, 0, 0]} position={[0, -0.2, 0]}>
      <planeGeometry args={[5, 5, 128, 128]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

export default function WaterScene() {
  return (
    <div className="w-full h-full min-h-[450px] relative pointer-events-auto">
      <Canvas
        camera={{ position: [0, 0, 3.2], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          powerPreference: 'high-performance',
          alpha: true,
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
      >
        <WaterRippleMesh />
      </Canvas>
    </div>
  );
}
