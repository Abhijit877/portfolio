import React, { useEffect, useRef, useState } from 'react';
import { useInView, useScroll, useTransform, motion } from 'framer-motion';
import { useUI } from '../context/UIContext';
import { FiMessageCircle, FiDownload } from 'react-icons/fi';
import Button from './Button';
import ProfileSketch from './ProfileSketch';
import { WordRotate } from './WordRotate';
import MagneticButton from './MagneticButton';

const Hero: React.FC = () => {
  const { setHeroInView } = useUI();
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5 });
  const [showName, setShowName] = useState(false);

  useEffect(() => {
    setHeroInView(isInView);
  }, [isInView, setHeroInView]);

  // Trigger name animation after a brief delay
  useEffect(() => {
    const timer = setTimeout(() => setShowName(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const { scrollY } = useScroll();

  // Scroll-driven animations - subtle fade only for scroll indicator
  const scrollIndicatorOpacity = useTransform(scrollY, [0, 100], [1, 0]);

  return (
    <section
      ref={ref}
      className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-background-primary transition-colors duration-300"
    >
      {/* Subtle Background - Minimal for clean aesthetic */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 noise-texture opacity-20" />
      </div>

      {/* Main Content Container - Centered Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center w-full max-w-7xl px-6 md:px-12 py-20 relative z-10">

        {/* LEFT COLUMN - TEXT */}
        <div className="flex flex-col justify-center items-center lg:items-start space-y-6 z-20 order-2 lg:order-1">

          {/* 1. ANIMATED NAME - Orange to Purple Gradient */}
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-center lg:text-left leading-[1.1]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: showName ? 1 : 0, y: showName ? 0 : 20 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 bg-clip-text text-transparent">
              Hi, I'm Abhijit Behera
            </span>
          </motion.h1>

          {/* 2. ROTATING TEXT - alaadev style fade effect */}
          <motion.div
            className="text-text-secondary text-xl sm:text-2xl md:text-3xl font-light leading-snug text-center lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <span>I build </span>
            <WordRotate words={["Scalable", "Modern", "Automated", "Secure"]} />
            <br />
            <span>digital solutions.</span>
          </motion.div>

          {/* 3. DESCRIPTION with Blue Accent Line */}
          <motion.div
            className="w-full flex flex-col items-center lg:items-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <p className="accent-line-left text-text-secondary max-w-lg text-base md:text-lg leading-relaxed text-center lg:text-left">
              Dynamics 365 CE Specialist crafting high-performance CRM architecture.
            </p>

            {/* CTA Buttons - Resume / Let's Talk with 32px top margin */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start mt-8">
              <MagneticButton strength={0.3}>
                <Button
                  href="/Abhijit-Behera-CV.pdf"
                  variant="primary"
                  icon={<FiDownload />}
                >
                  Resume
                </Button>
              </MagneticButton>
              <MagneticButton strength={0.3}>
                <Button
                  href="#contact"
                  variant="secondary"
                  icon={<FiMessageCircle />}
                >
                  Let's Talk
                </Button>
              </MagneticButton>
            </div>
          </motion.div>
        </div>

        {/* RIGHT COLUMN - SVG Profile Sketch */}
        <motion.div
          className="flex justify-center items-center order-1 lg:order-2"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className="w-full max-w-[400px] md:max-w-[500px] lg:max-w-[550px] xl:max-w-[600px] aspect-square flex items-center justify-center">
            <ProfileSketch />
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        style={{ opacity: scrollIndicatorOpacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-secondary"
      >
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border-2 border-line flex justify-center pt-1"
        >
          <motion.div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
        </motion.div>
      </motion.div>

      {/* Gradient Mask - Dissolves into next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent, var(--bg-primary))'
        }}
      />
    </section>
  );
};

export default Hero;
