import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRecruiter } from '../context/RecruiterContext';
import { useUI } from '../context/UIContext';
import { FiArrowRight, FiDownload, FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi';
import Button from './Button';
import ProfileSketch from './ProfileSketch';
import ScrambleText from './ScrambleText';

const Hero: React.FC = () => {
  const { isRecruiterMode } = useRecruiter();
  const { setHeroInView } = useUI();
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5 });

  useEffect(() => {
    setHeroInView(isInView);
  }, [isInView, setHeroInView]);

  // Roles for scrambling (Restored)
  const roles = ["Dynamics 365 Architect", "Power Platform Expert", ".NET Developer", "Creative Coder"];
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    if (isRecruiterMode) return;
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isRecruiterMode]);

  return (
    <section ref={ref} className="min-h-screen w-full bg-[#050505] flex items-center justify-center px-6 py-20 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/10 via-transparent to-teal-900/10 opacity-50" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-7xl items-center relative z-10">

        {/* LEFT COLUMN - TEXT */}
        <div className="flex flex-col items-start space-y-6 z-20 order-2 md:order-1">
          {/* Availability Badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 backdrop-blur-md mb-2"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
            </span>
            <span className="text-xs font-semibold tracking-wide text-slate-300 uppercase">Available for Hire</span>
          </motion.div>

          {/* Restored Name Animation */}
          <div className="space-y-2">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-slate-400 font-medium ml-1"
            >
              Hi, I'm
            </motion.p>

            <div className="h-[60px] md:h-[90px] w-full relative">
              <motion.h1
                layoutId="brand-name"
                className="text-5xl md:text-8xl font-bold tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-cyan-400"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                Abhijit Behera
              </motion.h1>
            </div>

            {/* Scramble Text Role */}
            <div className="text-xl md:text-3xl font-mono text-slate-300">
              <span className="text-slate-500 mr-2">&gt;</span>
              <span className="mr-2">Building</span>
              <span className="text-accent-primary font-bold">
                <ScrambleText
                  text={roles[roleIndex]}
                  scrambleSpeed={30}
                  scrambleDuration={600}
                  className="inline-block min-w-[200px]"
                />
              </span>
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-base md:text-lg text-slate-400 max-w-lg leading-relaxed"
          >
            A Senior Frontend Engineer crafting award-winning digital experiences.
            Blending creative coding with robust enterprise architecture.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap gap-4 pt-4"
          >
            <Button href="#projects" variant="primary" icon={<FiArrowRight />}>
              Explore Work
            </Button>
            <a
              href="/resume.pdf"
              className="px-6 py-3 rounded-full border border-slate-700 text-slate-300 font-medium hover:bg-white/5 hover:border-accent-primary transition-all flex items-center gap-2 group"
            >
              <FiDownload className="group-hover:-translate-y-0.5 transition-transform" />
              <span>Resume</span>
            </a>
          </motion.div>

          {/* Socials */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex gap-6 pt-4 text-slate-500"
          >
            <SocialLink href="https://github.com/Abhijit877" icon={<FiGithub />} />
            <SocialLink href="https://linkedin.com" icon={<FiLinkedin />} />
            <SocialLink href="https://twitter.com" icon={<FiTwitter />} />
          </motion.div>
        </div>

        {/* RIGHT COLUMN - ANIMATED SKETCH */}
        <div className="relative w-full flex justify-center items-center order-1 md:order-2">
          <ProfileSketch />
        </div>

      </div>
    </section>
  );
};

const SocialLink = ({ href, icon }: { href: string; icon: React.ReactNode }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="hover:text-accent-primary transform hover:scale-110 transition-all duration-200"
  >
    {icon}
  </a>
);

export default Hero;
