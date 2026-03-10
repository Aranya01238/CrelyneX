"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeHeroScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(52, 1, 0.1, 100);
    camera.position.set(0, 0, 5.5);
    const targetCameraX = { value: 0 };
    const targetCameraY = { value: 0 };

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    const ambient = new THREE.AmbientLight(0x8ea2ff, 0.45);
    scene.add(ambient);

    const keyLight = new THREE.PointLight(0x00c4cc, 2.2, 25);
    keyLight.position.set(2.8, 1.6, 2.6);
    scene.add(keyLight);

    const fillLight = new THREE.PointLight(0x8b4dff, 1.5, 25);
    fillLight.position.set(-2.8, -1.2, 2.3);
    scene.add(fillLight);

    const coreGeometry = new THREE.TorusKnotGeometry(1, 0.26, 220, 32);
    const coreMaterial = new THREE.MeshStandardMaterial({
      color: 0x0ec5cb,
      roughness: 0.28,
      metalness: 0.72,
      emissive: 0x192454,
      emissiveIntensity: 0.4,
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    scene.add(coreMesh);

    const ringGeometry = new THREE.TorusGeometry(1.9, 0.03, 16, 120);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0x8b4dff,
      transparent: true,
      opacity: 0.65,
    });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.rotation.x = 1.08;
    ring.rotation.y = 0.25;
    scene.add(ring);

    const auraGeometry = new THREE.SphereGeometry(1.65, 42, 42);
    const auraMaterial = new THREE.MeshBasicMaterial({
      color: 0x00c4cc,
      transparent: true,
      opacity: 0.08,
    });
    const aura = new THREE.Mesh(auraGeometry, auraMaterial);
    scene.add(aura);

    const starsCount = 900;
    const starsGeometry = new THREE.BufferGeometry();
    const starsPositions = new Float32Array(starsCount * 3);

    for (let i = 0; i < starsCount; i++) {
      const i3 = i * 3;
      const radius = 8 + Math.random() * 10;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      starsPositions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      starsPositions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      starsPositions[i3 + 2] = radius * Math.cos(phi);
    }

    starsGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(starsPositions, 3),
    );
    const starsMaterial = new THREE.PointsMaterial({
      color: 0xcfd9ff,
      size: 0.03,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true,
    });
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);

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
      targetCameraX.value = (x - 0.5) * 0.75;
      targetCameraY.value = (0.5 - y) * 0.55;
    };

    const handlePointerLeave = () => {
      targetCameraX.value = 0;
      targetCameraY.value = 0;
    };

    const animate = () => {
      const elapsed = clock.getElapsedTime();

      coreMesh.rotation.x = elapsed * 0.38;
      coreMesh.rotation.y = elapsed * 0.55;
      coreMesh.position.y = Math.sin(elapsed * 1.1) * 0.07;
      ring.rotation.z = elapsed * 0.2;
      ring.rotation.x = 1.08 + Math.sin(elapsed * 0.9) * 0.05;
      aura.scale.setScalar(1 + Math.sin(elapsed * 1.7) * 0.04);
      stars.rotation.y = elapsed * 0.035;

      keyLight.position.x = Math.sin(elapsed * 1.15) * 3.2;
      keyLight.position.z = 2.2 + Math.cos(elapsed * 1.15) * 0.9;

      fillLight.position.y = Math.cos(elapsed * 1.3) * 1.4;
      fillLight.position.x = -2.8 + Math.sin(elapsed * 0.9) * 0.8;

      camera.position.x += (targetCameraX.value - camera.position.x) * 0.045;
      camera.position.y += (targetCameraY.value - camera.position.y) * 0.045;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      animationId = window.requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener("resize", resize);
    mount.addEventListener("pointermove", handlePointerMove);
    mount.addEventListener("pointerleave", handlePointerLeave);
    animationId = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      mount.removeEventListener("pointermove", handlePointerMove);
      mount.removeEventListener("pointerleave", handlePointerLeave);

      coreGeometry.dispose();
      coreMaterial.dispose();
      ringGeometry.dispose();
      ringMaterial.dispose();
      auraGeometry.dispose();
      auraMaterial.dispose();
      starsGeometry.dispose();
      starsMaterial.dispose();
      renderer.dispose();

      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="h-full w-full"
      aria-label="Interactive hero scene"
    />
  );
}
