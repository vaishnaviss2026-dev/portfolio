import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const LightPillar = ({
    topColor = "#ff273c",
    bottomColor = "#000000",
    intensity = 1,
    rotationSpeed = 0.3,
    glowAmount = 0.002,
    pillarWidth = 8.2,
    pillarHeight = 0.4,
    noiseIntensity = 0.5,
    pillarRotation = 25,
    interactive = false,
    mixBlendMode = "screen",
    quality = "high"
}) => {
    const containerRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current) return;
        
        const container = containerRef.current;
        const width = container.clientWidth;
        const height = container.clientHeight;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        camera.position.z = 10;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: quality === 'high' });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        // Adjust dimensions based on props to approximate the desired look
        const geometry = new THREE.CylinderGeometry(pillarWidth * 0.1, pillarWidth * 0.15, pillarHeight * 40, 32, 1, true);
        
        const uniforms = {
            topColor: { value: new THREE.Color(topColor) },
            bottomColor: { value: new THREE.Color(bottomColor) },
            time: { value: 0 },
            intensity: { value: intensity },
            glowAmount: { value: glowAmount },
            noiseIntensity: { value: noiseIntensity }
        };

        const material = new THREE.ShaderMaterial({
            uniforms: uniforms,
            vertexShader: `
                varying vec2 vUv;
                void main() {
                    vUv = uv;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform vec3 topColor;
                uniform vec3 bottomColor;
                uniform float time;
                uniform float intensity;
                uniform float noiseIntensity;
                varying vec2 vUv;

                float rand(vec2 co) {
                    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
                }

                void main() {
                    vec3 color = mix(bottomColor, topColor, vUv.y);
                    
                    float noise = (rand(vUv * 10.0 + time) - 0.5) * noiseIntensity * 0.2;
                    color += noise;
                    
                    float edge = smoothstep(0.0, 0.2, vUv.x) * smoothstep(1.0, 0.8, vUv.x);
                    float alpha = edge * intensity * (0.2 + 0.8 * vUv.y);

                    gl_FragColor = vec4(color, alpha);
                }
            `,
            transparent: true,
            blending: mixBlendMode === 'screen' ? THREE.AdditiveBlending : THREE.NormalBlending,
            depthWrite: false,
            side: THREE.DoubleSide
        });

        const pillar = new THREE.Mesh(geometry, material);
        pillar.rotation.z = (pillarRotation * Math.PI) / 180;
        scene.add(pillar);

        let animationFrameId;
        let time = 0;

        const render = () => {
            time += 0.02;
            uniforms.time.value = time;
            pillar.rotation.y -= rotationSpeed * 0.05;
            renderer.render(scene, camera);
            animationFrameId = requestAnimationFrame(render);
        };
        render();

        const handleResize = () => {
            if (!container) return;
            const newWidth = container.clientWidth;
            const newHeight = container.clientHeight;
            camera.aspect = newWidth / newHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(newWidth, newHeight);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
            if (container && container.contains(renderer.domElement)) {
                container.removeChild(renderer.domElement);
            }
            geometry.dispose();
            material.dispose();
            renderer.dispose();
        };
    }, [topColor, bottomColor, intensity, rotationSpeed, glowAmount, pillarWidth, pillarHeight, noiseIntensity, pillarRotation, quality, mixBlendMode]);

    return (
        <div 
            ref={containerRef} 
            style={{ 
                width: '100%', 
                height: '100%', 
                mixBlendMode: mixBlendMode,
                pointerEvents: interactive ? 'auto' : 'none'
            }} 
        />
    );
};

export default LightPillar;
