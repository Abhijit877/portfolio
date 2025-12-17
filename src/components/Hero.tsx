import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRecruiter } from '../context/RecruiterContext';
import { FiArrowRight, FiDownload, FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi';
import WebsiteShowcase from './WebsiteShowcase';
import FallingText from './FallingText';

import { HERO_SCROLL_THRESHOLD } from '../constants/scrollConfig';

const Hero: React.FC = () => {
  const { isRecruiterMode } = useRecruiter();
  const { scrollY } = useScroll();

  // Transforms for the "Scroll Story" - Clean handoff to navbar
  // Name fades out in place as navbar name fades in - seamless transition
  const titleScale = useTransform(scrollY, [0, HERO_SCROLL_THRESHOLD], [1, 0.85]);
  const titleY = useTransform(scrollY, [0, HERO_SCROLL_THRESHOLD], [0, -50]); // Subtle lift
  const titleX = useTransform(scrollY, [0, HERO_SCROLL_THRESHOLD], [0, 0]); // No horizontal move
  const titleOpacity = useTransform(scrollY, [HERO_SCROLL_THRESHOLD * 0.5, HERO_SCROLL_THRESHOLD * 0.8], [1, 0]); // Smooth fade
  const contentOpacity = useTransform(scrollY, [0, HERO_SCROLL_THRESHOLD / 2], [1, 0]); // Fade out other content faster



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
    <section className="relative h-[150vh]">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background removed for cleaner dark look */}

        <div className="container mx-auto px-6 z-10 relative grid md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.15,
                  delayChildren: 0.2
                }
              }
            }}
          >
            {/* Availability Badge */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: -50 },
                visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } }
              }}
              style={{ opacity: contentOpacity }}
              className="inline-flex items-center space-x-2 bg-accent-primary/10 border border-accent-primary/20 rounded-full px-4 py-1.5 mb-6"
            >
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <span className="text-sm font-medium text-accent-primary">Available for Hiring</span>
            </motion.div>


            {/* Greeting - drop in */}
            {/* Greeting - drop in */}
            <motion.div
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { duration: 0.1 } }
              }}
              style={{ opacity: contentOpacity }}
              className="text-5xl md:text-7xl font-bold mb-2 leading-tight tracking-tight"
            >
              <FallingText
                content="Hi, I'm"
                delay={0}
                className="flex flex-wrap"
                splitBy="char"
              />
            </motion.div>

            {/* Name - drop in wrapper (entrance) + inner scroll transform */}
            <motion.div
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { duration: 0.1 } }
              }}
            >
              <motion.h1
                className="text-5xl md:text-7xl font-bold mb-6 leading-tight tracking-tight origin-top-left"
                style={{
                  scale: titleScale,
                  y: titleY,
                  x: titleX,
                  opacity: titleOpacity
                }}
              >
                <FallingText
                  content="Abhijit Behera"
                  delay={0.5}
                  highlightWords={["Abhijit", "Behera"]}
                  className="flex flex-wrap"
                  splitBy="char"
                />
              </motion.h1>
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: -100 },
                visible: { opacity: 1, y: 0, transition: { ease: "easeOut", duration: 0.8 } }
              }}
              style={{ opacity: contentOpacity }}
              className="h-20 mb-8"
            >
              {isRecruiterMode ? (
                <div className="text-2xl text-text-secondary font-medium">
                  <FallingText
                    content="Dynamics 365 Technical Consultant"
                    delay={1.5}
                    className="flex flex-wrap"
                  />
                </div>
              ) : (
                <div className="text-2xl md:text-3xl text-text-secondary font-light relative h-10 w-full">
                  {/* For the cycling roles, we want the initial one to "fall in". 
                      Complex to mix falling text with cycling text. 
                      Strategy: Show FallingText for the FIRST role initially, then switch to cycling??
                      Or just let the container fade in for the cycling part?
                      User asked for "Expertise Title" to have the effect. 
                      Result: animating the first role as FallingText. 
                  */}
                  <AnimatePresence mode="wait">
                    {roleIndex === 0 ? (
                      <FallingText
                        key="role-falling"
                        content={roles[0]}
                        delay={1.5}
                        className="absolute top-0 left-0 flex flex-wrap"
                      />
                    ) : (
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
                    )}
                  </AnimatePresence>
                </div>
              )}
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { duration: 0.1 } }
              }}
              style={{ opacity: contentOpacity }}
              className="text-lg text-text-secondary mb-8 max-w-lg leading-relaxed"
            >
              <FallingText
                content="development, and Power Platform solutions. Transforming business requirements into scalable technical realities."
                delay={2.5}
                className="flex flex-wrap"
              />
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.2,
                    delayChildren: 3.5
                  }
                }
              }}
              initial="hidden"
              animate="visible"
              style={{ opacity: contentOpacity }}
              className="flex flex-wrap gap-4"
            >
              <motion.a
                href="#projects"
                variants={{
                  hidden: { opacity: 0, y: -50 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { type: "spring", stiffness: 100, damping: 12 }
                  }
                }}
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
                variants={{
                  hidden: { opacity: 0, y: -50 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { type: "spring", stiffness: 100, damping: 12 }
                  }
                }}
                whileHover={{ y: -5, backgroundColor: "var(--bg-secondary)" }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-background-tertiary text-text-primary rounded-lg font-medium border border-line flex items-center space-x-2 transition-all"
              >
                <FiDownload />
                <span>Resume</span>
              </motion.a>
            </motion.div>

            {!isRecruiterMode && (
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: -40 },
                  visible: { opacity: 1, y: 0, transition: { ease: "easeOut", duration: 0.8 } }
                }}
                style={{ opacity: contentOpacity }}
                className="mt-12 flex space-x-6"
              >
                <SocialLink href="https://github.com/Abhijit877" icon={<FiGithub />} />
                <SocialLink href="https://linkedin.com" icon={<FiLinkedin />} />
                <SocialLink href="https://twitter.com" icon={<FiTwitter />} />
              </motion.div>
            )}
          </motion.div>

          {/* Visual/Image Side - System Architecture Visualizer */}
          {/* Visual/Image Side - System Architecture Visualizer */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="hidden md:flex items-center justify-center w-full h-[600px] relative z-10"
          >
            <div className="w-full absolute inset-0 flex items-center justify-center p-4">
              <WebsiteShowcase />
            </div>
          </motion.div>
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
    className="p-3 bg-background-tertiary rounded-full text-text-secondary hover:text-accent-primary hover:bg-background-secondary transition-all hover:scale-110"
  >
    {icon}
  </a>
);

export default Hero;
