import React from 'react';
import { motion } from 'framer-motion';
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

// Marquee animation styles
const marqueeStyles = `
@keyframes marquee {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-50%);
  }
}

@keyframes marquee-reverse {
  0% {
    transform: translateX(-50%);
  }
  100% {
    transform: translateX(0%);
  }
}

.animate-marquee {
  animation: marquee 30s linear infinite;
}

.animate-marquee-reverse {
  animation: marquee-reverse 30s linear infinite;
}

.marquee-container:hover .animate-marquee,
.marquee-container:hover .animate-marquee-reverse {
  animation-play-state: paused;
}
`;

// All skills in a flat array for the marquee
const allSkills = [
  { name: 'Dynamics 365 CE', icon: <BsMicrosoft />, color: '#00A4EF' },
  { name: 'C# .NET', icon: <SiSharp />, color: '#512BD4' },
  { name: 'Power Automate', icon: <VscAzure />, color: '#0066FF' },
  { name: 'SQL Server', icon: <DiMsqlServer />, color: '#CC2927' },
  { name: 'REST APIs', icon: <SiDotnet />, color: '#512BD4' },
  { name: 'PCF Controls', icon: <SiJavascript />, color: '#F7DF1E' },
  { name: 'TypeScript', icon: <SiTypescript />, color: '#3178C6' },
  { name: 'React', icon: <SiReact />, color: '#61DAFB' },
  { name: 'JavaScript', icon: <SiJavascript />, color: '#F7DF1E' },
  { name: 'Azure DevOps', icon: <VscAzureDevops />, color: '#0078D7' },
  { name: 'Git', icon: <SiGit />, color: '#F05032' },
  { name: 'JIRA', icon: <SiJira />, color: '#0052CC' },
];

// Single skill item for marquee
const SkillItem = ({ skill }: { skill: typeof allSkills[0] }) => (
  <div className="flex items-center gap-3 px-6 py-3 mx-3 bg-background-secondary/80 backdrop-blur-sm border border-line rounded-full hover:border-accent-primary/50 hover:bg-background-secondary transition-all duration-300 cursor-default group whitespace-nowrap">
    <span
      className="text-2xl transition-transform duration-300 group-hover:scale-110"
      style={{ color: skill.color }}
    >
      {skill.icon}
    </span>
    <span className="text-sm font-medium text-text-primary">{skill.name}</span>
  </div>
);

// Infinite scrolling marquee row
const MarqueeRow = ({ skills, reverse = false, speed = 30 }: { skills: typeof allSkills, reverse?: boolean, speed?: number }) => {
  // Double the skills array for seamless loop
  const doubledSkills = [...skills, ...skills];

  return (
    <div className="marquee-container overflow-hidden py-2">
      <div
        className={`flex ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}
        style={{ animationDuration: `${speed}s` }}
      >
        {doubledSkills.map((skill, index) => (
          <SkillItem key={`${skill.name}-${index}`} skill={skill} />
        ))}
      </div>
    </div>
  );
};

const Skills: React.FC = () => {
  const { isRecruiterMode } = useRecruiter();

  // Split skills for two rows
  const firstRowSkills = allSkills.slice(0, 6);
  const secondRowSkills = allSkills.slice(6);

  return (
    <section
      className="py-20 md:py-32 relative overflow-hidden"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      {/* Inject marquee styles */}
      <style>{marqueeStyles}</style>

      <div className="layout-container relative z-10">
        <div className="scannable-section text-center mb-16">
          <h2 className="spacing-generous">
            <FallingText
              content="Technical Landscape"
              highlightWords={["Technical", "Landscape"]}
              splitBy="char"
              delay={0.2}
              className="justify-center"
            />
          </h2>
          <div className="text-text-secondary max-w-2xl mx-auto text-lg md:text-xl">
            <FallingText
              content="A comprehensive view of my specialized stack."
              delay={0.6}
              className="justify-center"
            />
          </div>
        </div>

        {isRecruiterMode ? (
          // Compact grid view for recruiter mode
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {allSkills.map(skill => (
              <motion.div
                key={skill.name}
                className="flex items-center gap-3 p-4 bg-background-secondary border border-line rounded-xl hover:border-accent-primary/50 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
              >
                <span className="text-xl" style={{ color: skill.color }}>{skill.icon}</span>
                <span className="text-sm font-medium text-text-primary">{skill.name}</span>
              </motion.div>
            ))}
          </div>
        ) : (
          // Infinite scrolling marquee
          <div className="space-y-4 -mx-6 md:-mx-12">
            {/* First row - normal direction */}
            <MarqueeRow skills={firstRowSkills} speed={25} />

            {/* Second row - reverse direction */}
            <MarqueeRow skills={secondRowSkills} reverse speed={30} />
          </div>
        )}
      </div>

      {/* Subtle gradient edges to fade marquee */}
      <div className="absolute left-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-r from-[var(--bg-primary)] to-transparent pointer-events-none z-20" />
      <div className="absolute right-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-l from-[var(--bg-primary)] to-transparent pointer-events-none z-20" />
    </section>
  );
};

export default Skills;
