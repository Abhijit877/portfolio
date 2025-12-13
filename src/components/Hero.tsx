import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRecruiter } from '../context/RecruiterContext';
import { FiArrowRight, FiDownload, FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi';

const Hero: React.FC = () => {
  const { isRecruiterMode } = useRecruiter();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);

  // Effect for mouse parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };

    if (!isRecruiterMode) {
      window.addEventListener('mousemove', handleMouseMove);
    }
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isRecruiterMode]);

  // Typing effect content
  const roles = ["Dynamics 365 Architect", "Power Platform Expert", ".NET Developer"];
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    if (isRecruiterMode) return;
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isRecruiterMode]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Elements - Dissabled in Recruiter Mode */}
      {!isRecruiterMode && (
        <>
          <motion.div
            className="absolute top-0 left-0 w-full h-full z-0 opacity-30 dark:opacity-20"
            style={{
              backgroundImage: 'radial-gradient(circle at 50% 50%, var(--accent-primary) 0%, transparent 50%)',
              transform: `translate(${mousePosition.x * -20}px, ${mousePosition.y * -20}px)`,
            }}
          />
          <motion.div
            className="absolute top-1/4 right-1/4 w-64 h-64 bg-accent-secondary rounded-full blur-[100px] opacity-20"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </>
      )}

      <div className="container mx-auto px-6 z-10 relative grid md:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Availability Badge */}
          <div className="inline-flex items-center space-x-2 bg-accent-primary/10 border border-accent-primary/20 rounded-full px-4 py-1.5 mb-6">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className="text-sm font-medium text-accent-primary">Available for Hiring</span>
          </div>

          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight tracking-tight"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1, delayChildren: 0.2 }
              }
            }}
          >
            <motion.span variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="block">
              Hi, I'm
            </motion.span>
            <motion.span
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              className="text-transparent bg-clip-text bg-gradient-to-r from-accent-primary to-accent-secondary block"
            >
              Abhijit Behera
            </motion.span>
          </motion.h1>

          <div className="h-20 mb-8">
            {isRecruiterMode ? (
              <p className="text-2xl text-text-secondary font-medium">Dynamics 365 Technical Consultant</p>
            ) : (
              <div className="text-2xl md:text-3xl text-text-secondary font-light relative h-10 w-full">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={roleIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5 }}
                    className="absolute top-0 left-0"
                  >
                    I am a{' '}
                    <span className="text-text-primary font-medium">
                      {roles[roleIndex]}
                    </span>
                  </motion.div>
                </AnimatePresence>
              </div>
            )}
          </div>

          <p className="text-lg text-text-secondary mb-8 max-w-lg leading-relaxed">
            Specializing in end-to-end CRM implementations, Plugin development, and Power Platform solutions. Transforming business requirements into scalable technical realities.
          </p>

          <div className="flex flex-wrap gap-4">
            <motion.a
              href="#projects"
              whileHover={{ y: -5, boxShadow: "0 10px 30px -10px var(--accent-primary)" }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 bg-accent-primary text-white rounded-lg font-medium transition-all flex items-center space-x-2 group relative overflow-hidden"
            >
              <span className="relative z-10">View My Work</span>
              <FiArrowRight className="group-hover:translate-x-1 transition-transform relative z-10" />
            </motion.a>
            <motion.a
              href="/resume.pdf"
              target="_blank"
              whileHover={{ y: -5, backgroundColor: "var(--bg-secondary)" }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 bg-background-tertiary text-text-primary rounded-lg font-medium border border-line flex items-center space-x-2 transition-all"
            >
              <FiDownload />
              <span>Resume</span>
            </motion.a>
          </div>

          {!isRecruiterMode && (
            <div className="mt-12 flex space-x-6">
              <SocialLink href="https://github.com/Abhijit877" icon={<FiGithub />} />
              <SocialLink href="https://linkedin.com" icon={<FiLinkedin />} />
              <SocialLink href="https://twitter.com" icon={<FiTwitter />} />
            </div>
          )}
        </motion.div>

        {/* Visual/Image Side */}
        <motion.div
          style={{ y: y1 }}
          className="relative hidden md:flex items-center justify-center pointer-events-none"
        >
          {/* Abstract Tech Visual */}
          <div className="relative w-96 h-96">
            <div className="absolute inset-0 border-2 border-accent-primary/30 rounded-full animate-[spin_10s_linear_infinite]" />
            <div className="absolute inset-4 border-2 border-accent-secondary/30 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-64 h-64 bg-gradient-to-tr from-accent-primary/20 to-accent-secondary/20 rounded-full backdrop-blur-3xl" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      {!isRecruiterMode && (
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2 opacity-50"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-xs uppercase tracking-widest mb-2">Scroll</span>
          <div className="w-[1px] h-16 bg-gradient-to-b from-text-primary via-accent-primary to-transparent" />
        </motion.div>
      )}
    </section>
  );
};

const SocialLink = ({ href, icon }: { href: string; icon: React.ReactNode }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="p-3 bg-background-tertiary rounded-full text-text-secondary hover:text-accent-primary hover:bg-background-secondary transition-all hover:scale-110"
  >
    {icon}
  </a>
);

export default Hero;
