"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeHeroScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // 1. Scene Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 0, 6);

    const targetCameraX = { value: 0 };
    const targetCameraY = { value: 0 };

    // 2. High-End Renderer Setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    mount.appendChild(renderer.domElement);

    // 3. Cinematic Lighting (Brighter Red to reflect off the dark glass)
    const ambientLight = new THREE.AmbientLight(0x0a0000, 2.0);
    scene.add(ambientLight);

    const redLightPrimary = new THREE.PointLight(0xff0000, 80, 20);
    redLightPrimary.position.set(2, 2, 2);
    scene.add(redLightPrimary);

    const redLightDecomposition = new THREE.PointLight(0x880000, 80, 20);
    redLightDecomposition.position.set(-2, -2, 2);
    scene.add(redLightDecomposition);

    const redLightBacklight = new THREE.PointLight(0xaa0000, 60, 20);
    redLightBacklight.position.set(0, 3, -2);
    scene.add(redLightBacklight);

    // 4. Objects Array for Memory Management
    const objectsToDispose: any[] = [];

    // A. The Inner Energy Core (Blood Red Wireframe)
    const coreGeometry = new THREE.IcosahedronGeometry(0.5, 1);
    const coreMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0xdc2626, // Bright Red
      emissiveIntensity: 5.0,
      wireframe: true,
    });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    scene.add(core);
    objectsToDispose.push(coreGeometry, coreMaterial);

    // B. The Outer Glass Shell (Smoked Metallic Glass - The Game Changer)
    const glassGeometry = new THREE.TorusKnotGeometry(1, 0.35, 200, 32);
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x000000, // Deep black base
      metalness: 0.9, // Highly reflective like polished metal/glass
      roughness: 0.2, // Glossy but slightly diffused
      transparent: true,
      opacity: 0.5, // Let the inner red core shine through
      clearcoat: 1.0, // Extra shiny outer layer
      clearcoatRoughness: 0.1,
    });
    const glassShell = new THREE.Mesh(glassGeometry, glassMaterial);
    scene.add(glassShell);
    objectsToDispose.push(glassGeometry, glassMaterial);

    // C. Orbital Data Rings
    const ringGroup = new THREE.Group();
    const ringGeo = new THREE.TorusGeometry(2.2, 0.008, 16, 100);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0xcc0000,
      transparent: true,
      opacity: 0.8,
    });
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0x880000,
      transparent: true,
      opacity: 0.5,
    });

    const ring1 = new THREE.Mesh(ringGeo, ringMat1);
    ring1.rotation.x = Math.PI / 2;

    const ring2 = new THREE.Mesh(ringGeo, ringMat2);
    ring2.rotation.y = Math.PI / 3;
    ring2.rotation.x = Math.PI / 6;

    const ring3 = new THREE.Mesh(ringGeo, ringMat1);
    ring3.rotation.y = -Math.PI / 3;
    ring3.rotation.x = Math.PI / 6;

    ringGroup.add(ring1, ring2, ring3);
    scene.add(ringGroup);
    objectsToDispose.push(ringGeo, ringMat1, ringMat2);

    // D. Particle / Data Field
    const particlesCount = 800;
    const particlesGeo = new THREE.BufferGeometry();
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 15;
    }

    particlesGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(posArray, 3),
    );
    const particlesMat = new THREE.PointsMaterial({
      size: 0.02,
      color: 0xff3333, // Glowing red particles
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });

    const particleSystem = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particleSystem);
    objectsToDispose.push(particlesGeo, particlesMat);

    // 5. Animation & Interactions
    const clock = new THREE.Clock();
    let animationId = 0;

    const resize = () => {
      if (!mount) return;
      const width = mount.clientWidth;
      const height = mount.clientHeight;
      if (width === 0 || height === 0) return;

      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!mount) return;
      const rect = mount.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      targetCameraX.value = (x - 0.5) * 1.5;
      targetCameraY.value = (0.5 - y) * 1.5;
    };

    const handlePointerLeave = () => {
      targetCameraX.value = 0;
      targetCameraY.value = 0;
    };

    const animate = () => {
      const elapsed = clock.getElapsedTime();

      // Core rotation
      core.rotation.x = elapsed * 0.5;
      core.rotation.y = elapsed * 0.6;

      // Glass shell slow rotation and hover
      glassShell.rotation.x = elapsed * 0.15;
      glassShell.rotation.y = elapsed * 0.2;
      glassShell.position.y = Math.sin(elapsed * 2) * 0.1;

      // Ring group rotation
      ringGroup.rotation.z = elapsed * 0.1;
      ringGroup.rotation.y = elapsed * 0.05;

      // Particle subtle drifting
      particleSystem.rotation.y = elapsed * 0.02;
      particleSystem.position.y = Math.sin(elapsed * 0.5) * 0.2;

      // Moving lights for dynamic reflections on the dark glass
      redLightPrimary.position.x = Math.sin(elapsed * 0.5) * 4;
      redLightPrimary.position.z = Math.cos(elapsed * 0.5) * 4;
      redLightBacklight.position.y = 3 + Math.sin(elapsed * 0.8) * 0.5;

      // Smooth camera parallax
      camera.position.x += (targetCameraX.value - camera.position.x) * 0.05;
      camera.position.y += (targetCameraY.value - camera.position.y) * 0.05;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      animationId = window.requestAnimationFrame(animate);
    };

    // 6. Setup Listeners
    resize();
    window.addEventListener("resize", resize);
    mount.addEventListener("pointermove", handlePointerMove);
    mount.addEventListener("pointerleave", handlePointerLeave);
    animationId = window.requestAnimationFrame(animate);

    // 7. Robust Cleanup
    return () => {
      window.cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      mount.removeEventListener("pointermove", handlePointerMove);
      mount.removeEventListener("pointerleave", handlePointerLeave);

      objectsToDispose.forEach((item) => item.dispose());
      renderer.dispose();

      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="h-full w-full cursor-pointer"
      aria-label="Interactive 3D Crimson Core"
    />
  );
}
