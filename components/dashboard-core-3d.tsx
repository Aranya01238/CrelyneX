"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function DashboardCore3D() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // SCENE SETUP
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // LIGHTING
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xa855f7, 20, 10);
    pointLight.position.set(2, 2, 2);
    scene.add(pointLight);

    // CORE GEOMETRY (Low-poly faceted crystalline core)
    const geometry = new THREE.IcosahedronGeometry(1.5, 0);
    const material = new THREE.MeshPhysicalMaterial({
      color: 0x18181b, // Zinc-900
      emissive: 0xa855f7, // Purple-500
      emissiveIntensity: 0.5,
      metalness: 0.9,
      roughness: 0.1,
      wireframe: false,
    });
    
    const core = new THREE.Mesh(geometry, material);
    scene.add(core);

    // WIREFRAME OVERLAY
    const wireframeGeo = new THREE.IcosahedronGeometry(1.55, 0);
    const wireframeMat = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      wireframe: true,
      transparent: true,
      opacity: 0.2,
    });
    const wireframe = new THREE.Mesh(wireframeGeo, wireframeMat);
    scene.add(wireframe);

    // FLOATING PARTICLES
    const particlesCount = 50;
    const particlesGeo = new THREE.BufferGeometry();
    const posArray = new Float32Array(particlesCount * 3);
    for(let i=0; i<particlesCount*3; i++) {
        posArray[i] = (Math.random() - 0.5) * 8;
    }
    particlesGeo.setAttribute("position", new THREE.BufferAttribute(posArray, 3));
    const particlesMat = new THREE.PointsMaterial({
        size: 0.05,
        color: 0xa855f7,
        transparent: true,
        opacity: 0.5,
    });
    const particleSystem = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particleSystem);

    const clock = new THREE.Clock();
    let animationId: number;

    const resize = () => {
      const width = mount.clientWidth;
      const height = mount.clientHeight;
      if (width === 0 || height === 0) return;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    const animate = () => {
      const elapsed = clock.getElapsedTime();

      core.rotation.x = elapsed * 0.15;
      core.rotation.y = elapsed * 0.2;
      wireframe.rotation.x = -elapsed * 0.1;
      wireframe.rotation.y = -elapsed * 0.15;

      // Breathing effect
      const scale = 1 + Math.sin(elapsed * 2) * 0.05;
      core.scale.set(scale, scale, scale);
      wireframe.scale.set(scale, scale, scale);

      particleSystem.rotation.y = elapsed * 0.05;

      renderer.render(scene, camera);
      animationId = window.requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener("resize", resize);
    animate();

    return () => {
      window.cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      geometry.dispose();
      material.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div ref={mountRef} className="w-full h-full min-h-[300px] flex items-center justify-center pointer-events-none select-none opacity-80" />
  );
}
