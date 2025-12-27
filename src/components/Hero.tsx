import React, { useEffect, useRef } from 'react';
import { useInView, useScroll, useTransform, motion } from 'framer-motion';
import { useUI } from '../context/UIContext';
import { FiArrowRight, FiDownload, FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi';
import Button from './Button';
import ProfileSketch from './ProfileSketch';
import { WordRotate } from './WordRotate';

const Hero: React.FC = () => {
  const { setHeroInView } = useUI();
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5 });

  useEffect(() => {
    setHeroInView(isInView);
  }, [isInView, setHeroInView]);

  const { scrollY } = useScroll();

  // Scroll-driven animations for the name
  const scale = useTransform(scrollY, [0, 200], [1, 0.6]);
  const y = useTransform(scrollY, [0, 200], [0, 140]);
  const x = useTransform(scrollY, [0, 200], [0, -40]);

  // Opacity fade for other elements to clear clutter
  const fadeOpacity = useTransform(scrollY, [0, 50], [1, 0]);

  return (
    <section ref={ref} className="min-h-[90vh] w-full bg-background-primary flex items-center justify-center px-6 md:px-12 pt-32 pb-12 md:py-32 relative overflow-hidden transition-colors duration-300">
      {/* Background Gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/10 via-transparent to-teal-900/10 opacity-50" />
      </div>

      <div className="flex flex-col-reverse md:flex-row items-center justify-center gap-12 w-full max-w-7xl relative z-10">

        {/* LEFT COLUMN (Desktop) / BOTTOM (Mobile) - TEXT */}
        <div className="flex flex-col justify-center items-center md:items-start space-y-8 z-20 w-full md:w-1/2">

          {/* 1. ANIMATED NAME */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-text-primary relative text-center md:text-left">
            <motion.span style={{ opacity: fadeOpacity }} className="inline-block md:mr-4 block md:inline-block mb-2 md:mb-0">Hi, I'm</motion.span>
            <br className="hidden md:block" />
            <motion.span
              layoutId="brand-name"
              style={{ scale, x, y, originX: 0, originY: 0 }}
              className="inline-block animate-text-flow bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500 bg-clip-text text-transparent bg-[length:200%_auto]"
            >
              Abhijit Behera
            </motion.span>
          </h1>

          {/* 2. ROTATING TEXT */}
          <motion.div style={{ opacity: fadeOpacity }} className="text-text-secondary text-2xl md:text-4xl font-light leading-snug text-center md:text-left">
            <span>I build </span>
            <WordRotate words={["Scalable", "Modern", "Automated", "Secure"]} />
            <br />
            <span>digital solutions.</span>
          </motion.div>

          <motion.div style={{ opacity: fadeOpacity }} className="w-full flex flex-col items-center md:items-start">
            <p className="text-text-secondary max-w-lg mt-4 text-lg text-center md:text-left">
              Dynamics 365 CE Specialist crafting high-performance CRM architecture.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 pt-4 justify-center md:justify-start">
              <Button href="#projects" variant="primary" icon={<FiArrowRight />}>
                Explore Work
              </Button>
              <Button
                href="src/assets/Abhijit-Behera-CV.pdf"
                variant="secondary"
                icon={<FiDownload />}
              >
                Resume
              </Button>
            </div>

            {/* Socials */}
            <div className="flex gap-6 pt-4 text-slate-500 justify-center md:justify-start">
              <SocialLink href="https://github.com/Abhijit877" icon={<FiGithub />} />
              <SocialLink href="https://linkedin.com" icon={<FiLinkedin />} />
              <SocialLink href="https://twitter.com" icon={<FiTwitter />} />
            </div>
          </motion.div>
        </div>

        {/* RIGHT COLUMN (Desktop) / TOP (Mobile) - SKETCH */}
        <motion.div style={{ opacity: fadeOpacity }} className="w-full md:w-1/2 flex justify-center items-center">
          <div className="w-full max-w-[300px] md:max-w-md h-auto object-contain">
            <ProfileSketch />
          </div>
        </motion.div>
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
