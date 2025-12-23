import React, { useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';
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

  return (
    <section ref={ref} className="min-h-screen w-full bg-background-primary flex items-center justify-center px-6 py-20 relative overflow-hidden transition-colors duration-300">
      {/* Background Gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/10 via-transparent to-teal-900/10 opacity-50" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-7xl items-center relative z-10">

        {/* LEFT COLUMN - TEXT */}
        <div className="flex flex-col justify-center items-start space-y-6 z-20 order-2 md:order-1 h-full">

          {/* 1. ANIMATED NAME (Liquid Gradient Flow) */}
          <h1 className="text-5xl md:text-8xl font-bold tracking-tighter text-text-primary">
            Hi, I'm <br />
            <span className="animate-text-flow bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500 bg-clip-text text-transparent bg-[length:200%_auto]">
              Abhijit Behera
            </span>
          </h1>

          {/* 2. ROTATING TEXT (Blur & Vanish Effect) */}
          <div className="text-text-secondary text-2xl md:text-4xl font-light leading-snug">
            <span>I build </span>
            {/* The dynamic component */}
            <WordRotate words={["Scalable", "Modern", "Automated", "Secure"]} />
            <br />
            <span>digital solutions.</span>
          </div>

          <p className="text-text-secondary max-w-lg mt-4 text-lg">
            Dynamics 365 CE Specialist crafting high-performance CRM architecture.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 pt-4">
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
          </div>

          {/* Socials */}
          <div className="flex gap-6 pt-4 text-slate-500">
            <SocialLink href="https://github.com/Abhijit877" icon={<FiGithub />} />
            <SocialLink href="https://linkedin.com" icon={<FiLinkedin />} />
            <SocialLink href="https://twitter.com" icon={<FiTwitter />} />
          </div>
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
