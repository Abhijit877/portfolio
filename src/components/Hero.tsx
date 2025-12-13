import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import * as THREE from 'three';

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -100]);
  const y2 = useTransform(scrollY, [0, 300], [0, -50]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.8]);

  useEffect(() => {
    // Mouse tracking for interactive effects
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // GSAP animations on mount
    const tl = gsap.timeline();
    tl.fromTo(titleRef.current,
      { opacity: 0, y: 100, rotateX: -90 },
      { opacity: 1, y: 0, rotateX: 0, duration: 1.2, ease: 'power3.out' }
    )
    .fromTo(subtitleRef.current,
      { opacity: 0, y: 50, scale: 0.8 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'back.out(1.7)' },
      '-=0.7'
    )
    .fromTo(buttonRef.current,
      { opacity: 0, y: 30, scale: 0.5 },
      { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'elastic.out(1, 0.5)' },
      '-=0.5'
    );

    // Three.js 3D background
    if (canvasRef.current) {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true });

      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.position.z = 5;

      // Create floating geometric shapes
      const geometry1 = new THREE.IcosahedronGeometry(0.5);
      const geometry2 = new THREE.OctahedronGeometry(0.3);
      const geometry3 = new THREE.TetrahedronGeometry(0.4);

      const material = new THREE.MeshBasicMaterial({
        color: 0xc0c0c0,
        wireframe: true,
        transparent: true,
        opacity: 0.1
      });

      const mesh1 = new THREE.Mesh(geometry1, material);
      const mesh2 = new THREE.Mesh(geometry2, material);
      const mesh3 = new THREE.Mesh(geometry3, material);

      mesh1.position.set(-2, 1, -2);
      mesh2.position.set(2, -1, -3);
      mesh3.position.set(0, 2, -1);

      scene.add(mesh1, mesh2, mesh3);

      const animate = () => {
        requestAnimationFrame(animate);

        mesh1.rotation.x += 0.005;
        mesh1.rotation.y += 0.01;
        mesh2.rotation.x += 0.008;
        mesh2.rotation.y += 0.006;
        mesh3.rotation.x += 0.003;
        mesh3.rotation.y += 0.009;

        // Interactive rotation based on mouse
        mesh1.rotation.x += mousePosition.y * 0.01;
        mesh1.rotation.y += mousePosition.x * 0.01;
        mesh2.rotation.x += mousePosition.x * 0.008;
        mesh2.rotation.y += mousePosition.y * 0.008;
        mesh3.rotation.x += mousePosition.y * 0.005;
        mesh3.rotation.y += mousePosition.x * 0.005;

        renderer.render(scene, camera);
      };

      animate();

      const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('mousemove', handleMouseMove);
        renderer.dispose();
      };
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mousePosition]);

  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    projectsSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-futuristic-black via-futuristic-dark to-futuristic-black"
      style={{ opacity }}
    >
      {/* 3D Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 1 }}
      />

      {/* Animated Background Gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-radial from-metallic-silver/10 via-transparent to-transparent"
        animate={{
          background: [
            'radial-gradient(circle at 20% 50%, rgba(192, 192, 192, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 20%, rgba(192, 192, 192, 0.15) 0%, transparent 50%)',
            'radial-gradient(circle at 40% 80%, rgba(192, 192, 192, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 50%, rgba(192, 192, 192, 0.1) 0%, transparent 50%)',
          ]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        style={{ zIndex: 2 }}
      />

      {/* Floating Particles */}
      <div className="absolute inset-0" style={{ zIndex: 3 }}>
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-metallic-silver/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 50 - 25, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <motion.div
        className="relative z-10 text-center max-w-4xl mx-auto px-6"
        style={{ y: y1 }}
      >
        <motion.h1
          ref={titleRef}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 bg-gradient-to-r from-glow-white via-metallic-silver to-glow-white bg-clip-text text-transparent animate-glow-pulse"
          style={{
            textShadow: '0 0 40px rgba(192, 192, 192, 0.5)',
            transform: `perspective(1000px) rotateX(${mousePosition.y * 5}deg) rotateY(${mousePosition.x * 5}deg)`,
          }}
        >
          <span className="inline-block hover:scale-110 transition-transform duration-300">S</span>
          <span className="inline-block hover:scale-110 transition-transform duration-300">a</span>
          <span className="inline-block hover:scale-110 transition-transform duration-300">r</span>
          <span className="inline-block hover:scale-110 transition-transform duration-300">t</span>
          <span className="inline-block hover:scale-110 transition-transform duration-300">h</span>
          <span className="inline-block hover:scale-110 transition-transform duration-300">a</span>
          <span className="inline-block hover:scale-110 transition-transform duration-300">k</span>
        </motion.h1>

        <motion.p
          ref={subtitleRef}
          className="text-xl md:text-2xl text-metallic-silver mb-12 font-light"
          style={{ y: y2 }}
        >
          Futuristic Developer | AI Enthusiast | Innovator
        </motion.p>

        <motion.button
          ref={buttonRef}
          onClick={scrollToProjects}
          className="group relative px-8 py-4 bg-gradient-to-r from-metallic-silver to-glow-white text-futuristic-black font-semibold rounded-full shadow-glow hover:shadow-glow-strong transition-all duration-300 overflow-hidden"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="relative z-10">Explore My Work</span>
          <motion.span
            className="inline-block ml-2"
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            →
          </motion.span>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-glow-white to-metallic-silver opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={false}
          />
        </motion.button>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-metallic-silver rounded-full flex justify-center">
          <motion.div
            className="w-1 h-3 bg-metallic-silver rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </motion.section>
  );
};

export default Hero;
