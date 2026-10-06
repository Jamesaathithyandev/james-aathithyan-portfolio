"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

interface JamesModelProps {
  className?: string;
  scale?: number;
  onLoaded?: () => void;
  onProgress?: (percent: number) => void;
}

export default function JamesModel({
  className = "",
  scale = 1.95,
  onLoaded,
  onProgress,
}: JamesModelProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loadProgress, setLoadProgress] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  // Store callbacks in refs to prevent useEffect re-runs
  const onLoadedRef = useRef(onLoaded);
  const onProgressRef = useRef(onProgress);
  useEffect(() => {
    onLoadedRef.current = onLoaded;
    onProgressRef.current = onProgress;
  }, [onLoaded, onProgress]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Dimensions
    let width = container.clientWidth || 600;
    let height = container.clientHeight || 600;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 3.2);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    // Cap pixel ratio to 1.25 for crisp rendering while slashing GPU fragment shader load by ~60%
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.25));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    renderer.shadowMap.enabled = false;
    container.appendChild(renderer.domElement);

    // Studio Lighting setup for dramatic classical bust aesthetic
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    // Key Light (warm-white from upper front-left)
    const keyLight = new THREE.DirectionalLight(0xfff8f0, 2.8);
    keyLight.position.set(2.5, 3.5, 3.5);
    scene.add(keyLight);

    // Fill Light (soft cool from front-right)
    const fillLight = new THREE.DirectionalLight(0xd0e0ff, 1.4);
    fillLight.position.set(-2.5, 1.5, 2.5);
    scene.add(fillLight);

    // Rim / Hair Light (crisp backlight for edge definition)
    const rimLight = new THREE.DirectionalLight(0xffffff, 3.2);
    rimLight.position.set(0, 4.0, -3.0);
    scene.add(rimLight);

    // Subtle Eye & Face specular accent light
    const eyeLight = new THREE.PointLight(0xffffff, 1.5, 5);
    eyeLight.position.set(0, 0.5, 2.2);
    scene.add(eyeLight);

    // Model group for rotation and positioning
    const modelGroup = new THREE.Group();
    scene.add(modelGroup);

    // Mouse tracking state
    const targetRotation = { x: 0, y: 0 };
    let baseModelCenterY = 0;

    // Visibility observer to pause Three.js render loop when hero is off-screen (DRASTIC LAG REDUCTION)
    let isVisible = true;
    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.02 }
    );
    visibilityObserver.observe(container);

    // Load GLB Model
    const loader = new GLTFLoader();
    loader.load(
      "/3D-model/james3D.glb",
      (gltf) => {
        const model = gltf.scene;

        // Compute Bounding Box to center and scale perfectly
        const box = new THREE.Box3().setFromObject(model);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());

        // Create a centered pivot so the model rotates around its exact center of mass
        const pivot = new THREE.Group();
        model.position.x = -center.x;
        model.position.y = -center.y;
        model.position.z = -center.z;
        pivot.add(model);

        // Fix default orientation: turn model 90 degrees so the face looks directly at the user (+Z)
        pivot.rotation.y = -Math.PI / 2;

        // Auto-scale to fit hero viewport proportionally (refined size matching user request)
        const maxDimension = Math.max(size.x, size.y, size.z);
        const desiredScale = scale / maxDimension;
        modelGroup.scale.set(desiredScale, desiredScale, desiredScale);

        // Position model lower down so the FLORIA title behind is clearly visible
        modelGroup.position.set(0, -0.46, 0);
        baseModelCenterY = modelGroup.position.y;

        // Ensure proper material rendering and specular highlights
        model.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            mesh.castShadow = false;
            mesh.receiveShadow = false;
            if (mesh.material) {
              const mat = mesh.material as THREE.MeshStandardMaterial;
              mat.roughness = Math.max(mat.roughness ?? 0.5, 0.35);
              mat.metalness = Math.min(mat.metalness ?? 0.1, 0.2);
            }
          }
        });

        modelGroup.add(pivot);
        setIsLoaded(true);
        onLoadedRef.current?.();
      },
      (xhr) => {
        if (xhr.total > 0) {
          const percent = Math.min(Math.round((xhr.loaded / xhr.total) * 100), 100);
          setLoadProgress(percent);
          onProgressRef.current?.(percent);
        }
      },
      (error) => {
        console.error("Error loading 3D model:", error);
        setHasError(true);
        // Fallback: Notify preloader so the user is never permanently stuck
        onLoadedRef.current?.();
      }
    );

    // Global mouse move handler for head & eye tracking
    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) return;
      // Normalized mouse coordinates: -1 to 1 across the window
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = -(e.clientY / window.innerHeight) * 2 + 1;

      // Map to natural head turn angles (radians)
      // Horizontal yaw: up to ~28 degrees
      targetRotation.y = normX * 0.48;
      // Vertical pitch: up to ~18 degrees
      targetRotation.x = -normY * 0.32;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Handle Resize
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 600;
      const h = container.clientHeight || 600;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    // Animation & Render Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);

      // PERFORMANCE OPTIMIZATION: Skip render calculations completely when hero is scrolled off-screen
      if (!isVisible) return;

      const elapsedTime = clock.getElapsedTime();

      if (modelGroup) {
        // Smooth lerp easing for head and eye tracking
        const lerpSpeed = 0.065;
        modelGroup.rotation.y += (targetRotation.y - modelGroup.rotation.y) * lerpSpeed;
        modelGroup.rotation.x += (targetRotation.x - modelGroup.rotation.x) * lerpSpeed;

        // Subtle tilt/roll on Z axis for organic realistic head tilt
        const targetZ = -targetRotation.y * 0.08;
        modelGroup.rotation.z += (targetZ - modelGroup.rotation.z) * lerpSpeed;

        // Organic micro-breathing idle motion
        const breathOffsetY = Math.sin(elapsedTime * 1.4) * 0.015;
        modelGroup.position.y = baseModelCenterY + breathOffsetY;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      visibilityObserver.disconnect();
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative flex items-center justify-center select-none pointer-events-none ${className}`}
      aria-label="Interactive 3D Head Model"
    >
      {/* Loading indicator while 84MB GLB streams in (internal fallback) */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-30 pointer-events-none">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 border border-white/10 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span className="text-[11px] font-mono tracking-widest uppercase text-zinc-300">
              Loading 3D Entity {loadProgress > 0 ? `${loadProgress}%` : ""}
            </span>
          </div>
        </div>
      )}

      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center text-xs text-zinc-500 font-mono">
          Unable to load 3D model
        </div>
      )}
    </div>
  );
}
