"use client";

import { useEffect, useRef } from "react";
import {
  AdditiveBlending, BufferGeometry, Color, Float32BufferAttribute, MathUtils, NormalBlending, PerspectiveCamera,
  Points, Scene, ShaderMaterial, Vector2, WebGLRenderer,
} from "three";

const vertexShader = /* glsl */ `
  attribute vec3 aPhoto;
  attribute float aOpacity;
  attribute float aSeed;
  attribute vec3 aScatter;
  uniform float uTime;
  uniform float uMotion;
  uniform float uPixelRatio;
  uniform float uScatter;
  uniform float uPortraitScale;
  uniform vec2 uPortraitOffset;
  uniform vec3 uColor;
  varying vec3 vColor;
  varying float vOpacity;

  void main() {
    vec3 home = position;
    float phase = aSeed * 6.283185;
    float driftTime = uTime * (0.9 + aSeed * 0.65);
    float driftAmount = (0.008 + aSeed * 0.018) * uMotion;
    home += vec3(
      sin(driftTime + phase) + 0.35 * sin(driftTime * 0.63 + phase * 2.7),
      cos(driftTime * 0.83 + phase * 1.9) + 0.35 * sin(driftTime * 1.21 + phase),
      sin(driftTime * 0.72 + phase * 0.8) * 0.5
    ) * driftAmount;
    home *= uPortraitScale;
    home.xy += uPortraitOffset;
    home.y -= 0.14 * uPortraitScale;
    float scatter = smoothstep(aSeed * 0.08, 0.72 + aSeed * 0.25, uScatter);
    vec3 cloud = aScatter;
    cloud.xy += vec2(sin(phase + uTime * 0.12), cos(phase + uTime * 0.09)) * 0.12 * uMotion;
    home = mix(home, cloud, scatter);
    home.xy += vec2(sin(phase + scatter * 4.0), cos(phase + scatter * 3.0)) * sin(scatter * 3.141593) * 0.7;
    vec4 viewPosition = modelViewMatrix * vec4(home, 1.0);
    gl_Position = projectionMatrix * viewPosition;
    gl_PointSize = mix(2.8 + aSeed * aSeed * 3.2, 4.0 + pow(aSeed, 7.0) * 15.0, scatter) * uPixelRatio * (5.5 / -viewPosition.z);
    float brightness = sqrt(dot(aPhoto, vec3(0.2126, 0.7152, 0.0722)));
    vColor = uColor;
    float bottomFade = smoothstep(-1.44, -1.12, position.y);
    vOpacity = mix(aOpacity * (0.6 + brightness * 0.65) * bottomFade * 3.5, 2.0 + aSeed * 2.0, scatter);
  }
`;

const backgroundVertexShader = /* glsl */ `
  attribute float aSeed;
  uniform float uTime;
  uniform float uMotion;
  uniform float uPixelRatio;
  uniform vec3 uColor;
  varying vec3 vColor;
  varying float vOpacity;
  void main() {
    vec3 home = position;
    home.xy += vec2(sin(uTime * 0.06 + aSeed * 6.28), cos(uTime * 0.05 + aSeed * 9.0)) * 0.12 * uMotion;
    vec4 viewPosition = modelViewMatrix * vec4(home, 1.0);
    gl_Position = projectionMatrix * viewPosition;
    gl_PointSize = (2.0 + pow(aSeed, 9.0) * 19.0) * uPixelRatio * (5.5 / -viewPosition.z);
    vColor = uColor;
    vOpacity = 0.6 + aSeed * 1.4;
  }
`;

const fragmentShader = /* glsl */ `
  varying vec3 vColor;
  varying float vOpacity;
  void main() {
    float radius = length(gl_PointCoord - vec2(0.5));
    if (radius > 0.5) discard;
    // The example's soft point sprite, recolored blue.
    float alpha = clamp(0.05 / max(radius, 0.015) - 0.1, 0.0, 1.0) * vOpacity;
    gl_FragColor = vec4(vColor, alpha);
    #include <colorspace_fragment>
  }
`;

export default function HeroParticles() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    const region = host?.closest<HTMLElement>(".home-particle-region");
    const hero = region?.querySelector<HTMLElement>(".hero");
    if (!host || !region || !hero) return;
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = matchMedia("(hover: hover) and (pointer: fine)");
    const controller = new AbortController();
    let disposed = false;
    let disposeScene: (() => void) | undefined;

    async function initialize() {
      const response = await fetch("/images/portrait-particles.bin", { signal: controller.signal });
      if (!response.ok) throw new Error("Portrait data unavailable");
      const buffer = await response.arrayBuffer();
      if (disposed) return;
      const header = new DataView(buffer);
      if (buffer.byteLength < 8 || header.getUint32(0, true) !== 0x31305054) throw new Error("Invalid portrait data");
      const count = header.getUint32(4, true);
      if (count === 0 || buffer.byteLength !== 8 + count * 32) throw new Error("Invalid portrait length");
      const data = new Float32Array(buffer, 8);
      const positions = new Float32Array(count * 3);
      const colors = new Float32Array(count * 3);
      const opacities = new Float32Array(count);
      const seeds = new Float32Array(count);
      const scatter = new Float32Array(count * 3);
      let randomState = 6;
      const random = () => ((randomState = Math.imul(randomState, 1664525) + 1013904223 >>> 0) / 4294967296);
      const color = new Color();
      for (let i = 0; i < count; i++) {
        positions.set(data.subarray(i * 8, i * 8 + 3), i * 3);
        color.setRGB(data[i * 8 + 3], data[i * 8 + 4], data[i * 8 + 5]).convertSRGBToLinear();
        colors.set([color.r, color.g, color.b], i * 3);
        opacities[i] = data[i * 8 + 6];
        seeds[i] = data[i * 8 + 7];
        // Challenge 006 uses random points in a 30-unit volume.
        scatter.set([(random() - 0.5) * 30, (random() - 0.5) * 30, random() * -24], i * 3);
      }

      const canvas = document.createElement("canvas");
      // A failed context leaves the server-rendered static portrait in place.
      const renderer = new WebGLRenderer({ canvas, alpha: true, antialias: false, powerPreference: "low-power" });
      const geometry = new BufferGeometry();
      geometry.setAttribute("position", new Float32BufferAttribute(positions, 3));
      geometry.setAttribute("aPhoto", new Float32BufferAttribute(colors, 3));
      geometry.setAttribute("aOpacity", new Float32BufferAttribute(opacities, 1));
      geometry.setAttribute("aSeed", new Float32BufferAttribute(seeds, 1));
      geometry.setAttribute("aScatter", new Float32BufferAttribute(scatter, 3));
      const uniforms = {
        uTime: { value: 0 }, uMotion: { value: motion.matches ? 0 : 1 },
        uPixelRatio: { value: 1 }, uScatter: { value: 0 },
        uPortraitScale: { value: 1 }, uPortraitOffset: { value: new Vector2() },
        uColor: { value: new Color("#1856b2") },
      };
      const material = new ShaderMaterial({ uniforms, vertexShader, fragmentShader, transparent: true, depthWrite: false, blending: AdditiveBlending });
      const points = new Points(geometry, material);
      points.frustumCulled = false;
      const backgroundGeometry = new BufferGeometry();
      backgroundGeometry.setAttribute("position", new Float32BufferAttribute(scatter, 3));
      backgroundGeometry.setAttribute("aSeed", new Float32BufferAttribute(seeds, 1));
      const backgroundMaterial = new ShaderMaterial({ uniforms, vertexShader: backgroundVertexShader, fragmentShader, transparent: true, depthWrite: false, blending: AdditiveBlending });
      const background = new Points(backgroundGeometry, backgroundMaterial);
      background.frustumCulled = false;
      const scene = new Scene();
      scene.add(background);
      scene.add(points);
      const camera = new PerspectiveCamera(36, 1, 0.1, 30);
      camera.position.z = 5.5;

      let frame = 0;
      let inView = true;
      let elapsed = 0;
      let previous = 0;
      let failed = false;
      const targetTilt = new Vector2();
      let targetScatter = 0;
      let shownProgress = -1;
      let targetOpacity = 1;
      let fieldOpacity = 1;

      function draw(now: number) {
        frame = 0;
        if (disposed || failed || !inView || document.hidden) return;
        const delta = previous ? Math.min((now - previous) / 1000, 0.05) : 0;
        previous = now;
        if (!motion.matches) elapsed += delta;
        uniforms.uTime.value = elapsed;
        uniforms.uMotion.value = motion.matches ? 0 : 1;
        uniforms.uScatter.value = motion.matches ? targetScatter : MathUtils.damp(uniforms.uScatter.value, targetScatter, 8, delta);
        fieldOpacity = motion.matches ? targetOpacity : MathUtils.damp(fieldOpacity, targetOpacity, 8, delta);
        host!.style.opacity = String(fieldOpacity);
        if (Math.abs(shownProgress - uniforms.uScatter.value) > 0.0005) {
          shownProgress = uniforms.uScatter.value;
          hero!.style.setProperty("--hero-progress", String(shownProgress));
        }
        points.rotation.y = MathUtils.damp(points.rotation.y, motion.matches ? 0 : targetTilt.x * 0.09 + Math.sin(elapsed * 0.23) * 0.025, 4, delta);
        points.rotation.x = MathUtils.damp(points.rotation.x, motion.matches ? 0 : targetTilt.y * 0.055, 4, delta);
        renderer.render(scene, camera);
        if (!failed && host!.dataset.ready !== "true") host!.dataset.ready = "true";
        if (!motion.matches && !failed) frame = requestAnimationFrame(draw);
      }

      function schedule() {
        if (!frame && !disposed && !failed && inView && !document.hidden) {
          previous = 0;
          frame = requestAnimationFrame(draw);
        }
      }
      function pause() {
        cancelAnimationFrame(frame);
        frame = 0;
        previous = 0;
      }
      function resize() {
        const { width, height } = host!.getBoundingClientRect();
        const mobile = width < 768;
        const ratio = Math.min(devicePixelRatio, mobile ? 1.5 : 1.75);
        renderer.setPixelRatio(ratio);
        renderer.setSize(width, height, false);
        camera.aspect = width / Math.max(height, 1);
        camera.updateProjectionMatrix();
        const viewWidth = 2 * Math.tan(Math.PI / 10) * camera.position.z * camera.aspect;
        uniforms.uPortraitScale.value = mobile ? 0.72 : Math.min(1, viewWidth / 4);
        uniforms.uPortraitOffset.value.set(mobile ? 0 : viewWidth * 0.245, mobile ? -0.5 : 0);
        uniforms.uPixelRatio.value = ratio;
        geometry.setDrawRange(0, mobile ? Math.min(count, 11000) : count);
        backgroundGeometry.setDrawRange(0, Math.min(count, mobile ? 2400 : 7000));
        scroll();
        schedule();
      }
      function scroll() {
        const bounds = hero!.getBoundingClientRect();
        const distance = Math.max(1, hero!.offsetHeight - host!.clientHeight);
        // Reduced motion changes directly to a still field as the hero leaves.
        targetScatter = motion.matches ? (bounds.bottom < host!.clientHeight * 0.5 ? 1 : 0) : MathUtils.clamp(-bounds.top / distance, 0, 1);
        const contentProgress = MathUtils.clamp((-bounds.top - distance) / host!.clientHeight, 0, 1);
        targetOpacity = MathUtils.lerp(1, 0.32, contentProgress);
        schedule();
      }
      function move(event: PointerEvent) {
        if (motion.matches || event.pointerType !== "mouse" || !finePointer.matches) return;
        const bounds = host!.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width * 2 - 1;
        const y = -(event.clientY - bounds.top) / bounds.height * 2 + 1;
        targetTilt.set(x, y);
        schedule();
      }
      function leave() {
        targetTilt.set(0, 0);
      }
      function visibility() {
        if (document.hidden) { leave(); pause(); } else schedule();
      }
      function motionChange() {
        leave();
        pause();
        scroll();
        schedule();
      }
      function themeChange() {
        const blending = document.documentElement.dataset.theme === "dark" ? AdditiveBlending : NormalBlending;
        material.blending = blending;
        backgroundMaterial.blending = blending;
        schedule();
      }
      function contextLost(event: Event) {
        event.preventDefault();
        failed = true;
        pause();
        delete host!.dataset.ready;
      }
      renderer.debug.onShaderError = () => {
        failed = true;
        pause();
        delete host!.dataset.ready;
      };
      const resizeObserver = new ResizeObserver(resize);
      const intersectionObserver = new IntersectionObserver(([entry]) => {
        inView = entry.isIntersecting;
        if (inView) schedule(); else { leave(); pause(); }
      });
      const themeObserver = new MutationObserver(themeChange);
      disposeScene = () => {
        pause();
        resizeObserver.disconnect();
        intersectionObserver.disconnect();
        themeObserver.disconnect();
        motion.removeEventListener("change", motionChange);
        document.removeEventListener("visibilitychange", visibility);
        window.removeEventListener("scroll", scroll);
        region!.removeEventListener("pointermove", move);
        region!.removeEventListener("pointerleave", leave);
        canvas.removeEventListener("webglcontextlost", contextLost);
        geometry.dispose();
        material.dispose();
        backgroundGeometry.dispose();
        backgroundMaterial.dispose();
        renderer.dispose();
        renderer.forceContextLoss();
        canvas.remove();
        delete host!.dataset.ready;
        hero!.style.removeProperty("--hero-progress");
      };
      host!.append(canvas);
      region!.addEventListener("pointermove", move);
      region!.addEventListener("pointerleave", leave);
      canvas.addEventListener("webglcontextlost", contextLost);
      motion.addEventListener("change", motionChange);
      document.addEventListener("visibilitychange", visibility);
      window.addEventListener("scroll", scroll, { passive: true });
      resizeObserver.observe(host!);
      intersectionObserver.observe(host!);
      themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
      themeChange();
      resize();
      uniforms.uScatter.value = targetScatter;
      fieldOpacity = targetOpacity;
    }

    void initialize().catch(() => {
      disposeScene?.();
      // Keep the static portrait visible when data or WebGL is unavailable.
    });
    return () => {
      disposed = true;
      controller.abort();
      disposeScene?.();
    };
  }, []);

  return <div className="hero-particle-canvas" ref={hostRef} aria-hidden="true" />;
}
