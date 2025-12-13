import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRecruiter } from '../context/RecruiterContext';
import {
  SiDotnet,
  SiSharp,
  SiJavascript,
  SiGit,
  SiJira
} from 'react-icons/si';
import { BsMicrosoft } from 'react-icons/bs';
import { DiMsqlServer } from 'react-icons/di';
import { VscAzure, VscAzureDevops } from 'react-icons/vsc';

// Using generic Microsoft icon for D365/Power Platform where specific icons are missing in standard sets
const skills = [
  { name: 'Dynamics 365 CE', icon: <BsMicrosoft />, level: 'Expert', category: 'CRM' },
  { name: 'C# .NET', icon: <SiSharp />, level: 'Expert', category: 'Backend' },
  { name: 'Power Automate', icon: <VscAzure />, level: 'Expert', category: 'Power Platform' },
  { name: 'PCF Controls', icon: <SiJavascript />, level: 'Advanced', category: 'Development' },
  { name: 'JavaScript/jQuery', icon: <SiJavascript />, level: 'Advanced', category: 'Frontend' },
  { name: 'SQL Server', icon: <DiMsqlServer />, level: 'Intermediate', category: 'Database' },
  { name: 'Azure DevOps', icon: <VscAzureDevops />, level: 'DevOps', category: 'Tools' },
  { name: 'REST APIs', icon: <SiDotnet />, level: 'Advanced', category: 'Integration' },
  { name: 'Git', icon: <SiGit />, level: 'Intermediate', category: 'Tools' },
  { name: 'JIRA', icon: <SiJira />, level: 'Intermediate', category: 'Project Mgmt' },
];

const Skills: React.FC = () => {
  const { isRecruiterMode } = useRecruiter();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-20 bg-background-secondary relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Technical Expertise</h2>
          <p className="text-text-secondary max-w-2xl">
            specialized in Dynamics 365 CE, Power Platform, and .NET ecosystem customization and integration.
          </p>
        </div>

        {isRecruiterMode ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {skills.map((skill) => (
              <div key={skill.name} className="flex items-center space-x-3 p-4 bg-background-primary border border-line rounded-lg">
                <span className="text-accent-primary text-xl">{skill.icon}</span>
                <div>
                  <h3 className="font-medium text-text-primary">{skill.name}</h3>
                  <span className="text-xs text-text-secondary">{skill.level}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-5 gap-6"
          >
            {skills.map((skill) => (
              <SkillCard key={skill.name} skill={skill} variants={item} />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

const SkillCard = ({ skill, variants }: { skill: any, variants: any }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!e.currentTarget) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <motion.div
      variants={variants}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative p-6 bg-background-primary rounded-xl border border-line overflow-hidden group hover:border-accent-primary/50 transition-colors duration-300 flex flex-col items-center justify-center text-center space-y-4"
    >
      {/* Spotlight Effect */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(var(--accent-primary-rgb), 0.1), transparent 40%)`,
        }}
      />
      <div className="relative z-10 p-4 rounded-full bg-background-secondary text-4xl text-text-secondary group-hover:text-accent-primary transition-colors group-hover:scale-110 duration-300">
        {skill.icon}
      </div>
      <div className="relative z-10">
        <h3 className="font-bold text-text-primary">{skill.name}</h3>
        <p className="text-xs text-text-secondary mt-1">{skill.level}</p>
      </div>
    </motion.div>
  );
};

export default Skills;
