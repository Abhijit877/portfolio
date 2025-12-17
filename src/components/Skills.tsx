import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import FallingText from './FallingText';
import { useRecruiter } from '../context/RecruiterContext';
import {
  SiDotnet,
  SiSharp,
  SiJavascript,
  SiGit,
  SiJira,
  SiReact,
  SiTypescript
} from 'react-icons/si';
import { BsMicrosoft } from 'react-icons/bs';
import { DiMsqlServer } from 'react-icons/di';
import { VscAzure, VscAzureDevops } from 'react-icons/vsc';

const skillGroups = {
  backend: [
    { name: 'Dynamics 365 CE', icon: <BsMicrosoft />, level: 'Expert' },
    { name: 'C# .NET', icon: <SiSharp />, level: 'Expert' },
    { name: 'Power Automate', icon: <VscAzure />, level: 'Expert' },
    { name: 'SQL Server', icon: <DiMsqlServer />, level: 'Intermediate' },
    { name: 'REST APIs', icon: <SiDotnet />, level: 'Advanced' }
  ],
  frontend: [
    { name: 'PCF Controls', icon: <SiJavascript />, level: 'Advanced' },
    { name: 'TypeScript', icon: <SiTypescript />, level: 'Advanced' },
    { name: 'React', icon: <SiReact />, level: 'Advanced' },
    { name: 'JavaScript/jQuery', icon: <SiJavascript />, level: 'Advanced' }
  ],
  tools: [
    { name: 'Azure DevOps', icon: <VscAzureDevops />, level: 'DevOps' },
    { name: 'Git', icon: <SiGit />, level: 'Intermediate' },
    { name: 'JIRA', icon: <SiJira />, level: 'Intermediate' }
  ]
};

const ParallaxRow = ({ title, skills, velocity }: { title: string, skills: any[], velocity: number }) => {
  const rowRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ["start end", "end start"]
  });

  // Parallax logic: Elements move at different speeds relative to scroll
  // "Horizon line" = center of screen.
  // If velocity is high, it moves faster than scroll (pseudo depth).

  // Simple transform: y position based on scroll progress
  const y = useTransform(scrollYProgress, [0, 1], [-100 * velocity, 100 * velocity]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  return (
    <motion.div
      ref={rowRef}
      style={{ y, opacity, scale }}
      className="mb-12 relative"
    >
      <h3 className="text-xl font-bold text-accent-primary mb-6 text-center tracking-widest uppercase opacity-70">{title}</h3>
      <div className="flex flex-wrap justify-center gap-6">
        {skills.map((skill) => (
          <div key={skill.name} className="flex flex-col items-center justify-center w-32 h-32 bg-background-primary/50 backdrop-blur-md border border-line/50 rounded-2xl hover:border-accent-primary transition-all hover:scale-110 hover:bg-background-secondary shadow-lg">
            <div className="text-4xl text-text-secondary mb-2">{skill.icon}</div>
            <span className="text-xs font-bold text-text-primary text-center px-2">{skill.name}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

const Skills: React.FC = () => {
  const { isRecruiterMode } = useRecruiter();

  return (
    <section className="py-20 bg-background-secondary relative overflow-hidden min-h-screen flex items-center">
      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-20 text-center">
          <h2 className="text-4xl font-bold mb-4">
             <FallingText 
               content="Technical Landscape" 
               highlightWords={["Technical", "Landscape"]}
               splitBy="char"
               delay={0.2}
               className="justify-center"
             />
          </h2>
          <div className="text-text-secondary max-w-2xl mx-auto">
            <FallingText 
              content="A comprehensive view of my specialized stack."
              delay={0.6}
              className="justify-center"
            />
          </div>
        </div>

        {isRecruiterMode ? (
          <div className="space-y-8">
            {Object.entries(skillGroups).map(([key, group]) => (
              <div key={key}>
                <h3 className="text-lg font-bold capitalize mb-4 text-accent-primary">{key}</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {group.map(skill => (
                    <div key={skill.name} className="flex items-center space-x-3 p-4 bg-background-primary border border-line rounded-lg">
                      <span className="text-xl">{skill.icon}</span>
                      <div>
                        <div className="font-bold text-sm">{skill.name}</div>
                        <div className="text-xs text-text-secondary">{skill.level}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="perspective-1000 py-20">
            {/* 
                Deep depth: Backend (Core) 
                Mid: Frontend 
                Close: Tools 
             */}
            <ParallaxRow title="Core Architecture & Backend" skills={skillGroups.backend} velocity={1} />
            <ParallaxRow title="Frontend & Interface" skills={skillGroups.frontend} velocity={-0.5} />
            <ParallaxRow title="DevOps & Tooling" skills={skillGroups.tools} velocity={1.5} />
          </div>
        )}
      </div>

      {/* Background Decor */}
      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent-primary/50 to-transparent blur-sm" />
    </section>
  );
};

export default Skills;
