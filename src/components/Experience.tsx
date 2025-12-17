import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRecruiter } from '../context/RecruiterContext';
import FallingText from './FallingText';

const experience = [
  {
    id: 1,
    role: "Associate DCRM Engineer",
    company: "RSHANU Technologies Pvt Ltd",
    period: "01/2025 – Present",
    description: "Designing end-to-end D365 CE customizations and Power Automate flows. Developed PCF controls for rich UI and implemented real-time SAP/CPQ integrations. Reduced approval cycle time by 40%."
  },
  {
    id: 2,
    role: "Junior D365 CE Technical Consultant",
    company: "Dolf Technologies",
    period: "10/2022 – 12/2024",
    description: "Enhancing CRM automation via Plugins and Custom Workflows. Integrated D365 with LOB apps using REST/Scribe. Improved automation efficiency by 40% and reduced data inconsistencies by 35%."
  }
];

const Experience: React.FC = () => {
  const { isRecruiterMode } = useRecruiter();

  return (
    <section className="py-20 bg-background-primary overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="mb-12 text-center md:text-left">
          <div className="text-3xl font-bold">
            <FallingText
              content="Work Experience"
              highlightWords={["Work", "Experience"]}
              splitBy="char"
              delay={0.2}
            />
          </div>
        </div>

        <div className="relative border-l-2 border-line ml-4 md:ml-12 space-y-12">
          {experience.map((job, index) => (
            <ExperienceCard key={job.id} job={job} index={index} isRecruiterMode={isRecruiterMode} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ExperienceCard = ({ job, index, isRecruiterMode }: { job: any, index: number, isRecruiterMode: boolean }) => {
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
      initial={isRecruiterMode ? {} : { opacity: 0, x: -50 }}
      whileInView={isRecruiterMode ? {} : { opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="relative pl-8 md:pl-12 group"
    >
      {/* Timeline Dot with Glow */}
      <div className="absolute top-0 left-[-9px] w-4 h-4 rounded-full bg-accent-primary border-4 border-background-primary shadow-[0_0_0_4px_var(--bg-secondary)] group-hover:shadow-[0_0_15px_var(--accent-primary)] transition-shadow duration-300" />

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
        <h3 className="text-xl font-bold text-text-primary group-hover:text-accent-primary transition-colors">{job.role}</h3>
        <span className="text-sm font-mono text-accent-primary bg-accent-primary/10 px-3 py-1 rounded-full w-fit mt-2 sm:mt-0 border border-transparent group-hover:border-accent-primary/20 transition-colors">
          {job.period}
        </span>
      </div>

      <h4 className="text-lg font-medium text-text-secondary mb-4">{job.company}</h4>

      <div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative text-text-secondary leading-relaxed max-w-2xl bg-background-secondary p-6 rounded-lg border border-line overflow-hidden transition-colors"
      >
        {/* Spotlight Effect */}
        <div
          className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
          style={{
            opacity,
            background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, rgba(var(--accent-primary-rgb), 0.1), transparent 40%)`,
          }}
        />
        {job.description}
      </div>
    </motion.div>
  );
};

export default Experience;
