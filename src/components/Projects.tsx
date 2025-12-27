import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import FallingText from './FallingText';
import { useRecruiter } from '../context/RecruiterContext';
import { FiGithub, FiExternalLink, FiCode, FiBox, FiArrowRight } from 'react-icons/fi';

const projects = [
  {
    id: 1,
    name: 'Sales Automation Platform',
    description: 'Full Sales module transformation (Lead to Invoice) for a Fortune 500 client. Implemented SAP/CPQ integrations, complex pricing logic, and 45% reduced quote cycle time via Power Automate.',
    tech: ['D365 CE', 'PCF', 'Power Automate', 'C# Plugin'],
    github: 'https://github.com/Abhijit877',
    demo: '#',
    icon: <FiBox />,
    bg: 'from-blue-500/20 to-transparent',
    color: 'text-blue-500'
  },
  {
    id: 2,
    name: 'PCF File Uploader',
    description: 'Drag-and-drop file uploader for D365. Supports multiple file types, progress tracking, and async upload to Notes/Attachments. Reduced upload time by 50%.',
    tech: ['TypeScript', 'React', 'PCF', 'Web API'],
    github: 'https://github.com/Abhijit877',
    demo: '#',
    icon: <FiCode />,
    bg: 'from-purple-500/20 to-transparent',
    color: 'text-purple-500'
  },
  {
    id: 3,
    name: 'Concrete Recyclers CRM',
    description: 'End-to-end CRM modernization. Automated lead qualification and task delegation. Enhanced sales pipeline visibility by 60% through custom dashboarding.',
    tech: ['D365 CE', 'JavaScript', 'Cloud Flows', 'Workflows'],
    github: 'https://github.com/Abhijit877',
    demo: '#',
    icon: <FiBox />,
    bg: 'from-orange-500/20 to-transparent',
    color: 'text-orange-500'
  },
  {
    id: 4,
    name: 'Enhanced Input Control',
    description: 'Configurable PCF input control for high-volume data entry. Features built-in validation, formatting, and reusability across forms.',
    tech: ['PCF', 'TypeScript', 'Fluent UI'],
    github: 'https://github.com/Abhijit877',
    demo: '#',
    icon: <FiCode />,
    bg: 'from-cyan-500/20 to-transparent',
    color: 'text-cyan-500'
  }
];

const caseStudySteps = [
  {
    id: 0,
    title: "The Problem",
    content: "Legacy CRM systems were causing a 45% delay in quote generation due to manual data entry and lack of CPQ integration. Sales reps spent more time on admin than selling.",
    image: "/hero-landscape.png"
  },
  {
    id: 1,
    title: "The Architecture",
    content: "Designed a clean architecture using Azure Logic Apps as the middleware BFF (Backend for Frontend). This decoupled the D365 UI from the SAP ERP, ensuring non-blocking operations.",
    image: "/hero-landscape.png"
  },
  {
    id: 2,
    title: "The Solution",
    content: "Implemented a custom PCF Grid for rapid product selection and a Power Automate flow for PDF generation. Reduced quote cycle time from 2 days to 2 hours.",
    image: "/hero-landscape.png"
  }
];

const ProjectCardHorizontal = ({ project, index }: { project: any, index: number }) => {
  return (
    <div className="relative w-[85vw] md:w-[60vw] h-[60vh] md:h-[70vh] flex-shrink-0 flex flex-col justify-between p-8 md:p-12 border-r border-line/10 group overflow-hidden bg-background-secondary dark:bg-background-primary/5 shadow-xl shadow-slate-200/50 dark:shadow-none transition-all duration-300 hover:border-accent-primary/50">
      {/* Ambient Background */}
      <div className={`absolute inset-0 bg-gradient-to-b ${project.bg} opacity-10 group-hover:opacity-20 transition-opacity duration-500`} />

      {/* Big Background Number */}
      <div className="absolute top-0 right-4 text-[20vw] md:text-[15vw] font-bold text-text-primary/5 leading-none select-none pointer-events-none">
        0{index + 1}
      </div>

      <div className="relative z-10 h-full flex flex-col">
        <div className="flex justify-between items-start mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-text-primary/5 border border-text-primary/10 text-3xl text-accent-primary backdrop-blur-md">
            {project.icon}
          </div>
          <div className="flex gap-4">
            <a href={project.github} target="_blank" rel="noreferrer" className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-text-secondary hover:text-accent-primary transition-colors">
              <FiGithub size={20} />
            </a>
            <a href={project.demo} className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-text-secondary hover:text-accent-primary transition-colors">
              <FiExternalLink size={20} />
            </a>
          </div>
        </div>

        <div className="mt-auto">
          <h3 className="text-3xl md:text-5xl font-bold mb-4 text-text-primary">{project.name}</h3>
          <p className={`text-sm font-bold uppercase tracking-wider mb-6 ${project.color}`}>Dynamics 365 / PCF</p>
          <p className="text-text-secondary text-lg leading-relaxed max-w-2xl mb-8">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.tech.map((t: string) => (
              <span key={t} className="px-3 py-1 bg-white/5 border border-white/10 rounded-md text-xs font-mono text-text-secondary">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const Projects: React.FC = () => {
  const { isRecruiterMode } = useRecruiter();
  const [activeStep, setActiveStep] = useState(0);

  // Ref for horizontal scroll section
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-75%"]);

  return (
    <section className="relative bg-background-primary transition-colors duration-300">
      <div className="container mx-auto px-6 py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.6 }}
          className="mb-24"
        >
          <div className="text-3xl md:text-5xl font-bold mb-4">
            <FallingText
              content="Selected Works"
              highlightWords={["Selected", "Works"]}
              splitBy="char"
              delay={0.2}
            />
          </div>
          <div className="text-text-secondary max-w-xl text-lg">
            <FallingText
              content="Delivering enterprise value through Dynamics 365 customizations and PCF component development."
              delay={0.6}
            />
          </div>
        </motion.div>

        {/* Featured Case Study: Scroll Story (Keep Vertical) */}
        {!isRecruiterMode && (
          <div className="mb-32">
            <h3 className="text-xs font-bold uppercase tracking-widest text-accent-primary mb-8 ml-2">Deep Dive Case Study</h3>
            <div className="flex flex-col md:flex-row gap-12">
              {/* Sticky Visual Side */}
              <div className="md:w-1/2 h-[50vh] md:h-screen sticky top-20 flex items-center justify-center p-8 bg-background-secondary rounded-3xl border border-line overflow-hidden">
                <div className="absolute inset-0 bg-grid-pattern opacity-10" />
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStep}
                    initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.9, rotate: 5 }}
                    transition={{ duration: 0.5 }}
                    className="w-full h-full flex items-center justify-center p-4"
                  >
                    <img
                      src={caseStudySteps[activeStep].image}
                      alt={caseStudySteps[activeStep].title}
                      className="w-full h-auto max-h-full object-cover rounded-xl shadow-2xl border border-line/10"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Scrolling Narrative Side */}
              <div className="md:w-1/2 py-20">
                {caseStudySteps.map((step, index) => (
                  <motion.div
                    key={step.id}
                    className="min-h-[80vh] flex flex-col justify-center p-8 border-l-2 border-line/30 pl-12"
                    onViewportEnter={() => setActiveStep(index)}
                    initial={{ opacity: 0.2 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ margin: "-20% 0px -20% 0px", amount: 0.5 }}
                  >
                    <span className="text-6xl font-black text-white/5 mb-4 block">0{index + 1}</span>
                    <h4 className="text-2xl font-bold mb-4 text-accent-primary">{step.title}</h4>
                    <p className="text-xl text-text-secondary leading-relaxed">{step.content}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* All Projects - Horizontal Scroll Section */}
      <div ref={scrollRef} className="relative h-[300vh] bg-background-secondary border-t border-line/50">
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <div className="absolute top-8 left-8 z-20 md:left-12">
            <h3 className="text-2xl font-bold text-text-primary flex items-center gap-3">
              <FiBox className="text-accent-primary" />
              All Projects <span className="px-2 py-0.5 rounded-full bg-accent-primary/20 text-accent-primary text-xs uppercase tracking-wider">Gallery</span>
            </h3>
          </div>

          <motion.div style={{ x }} className="flex gap-0 pl-12">
            {/* Intro Card */}
            <div className="w-[80vw] md:w-[30vw] h-[60vh] md:h-[70vh] flex-shrink-0 flex flex-col justify-center p-12 border-r border-line/10">
              <p className="text-accent-primary font-mono text-sm mb-4">ARCHIVE</p>
              <h3 className="text-5xl md:text-6xl font-bold mb-6 text-text-primary">Built to <br /> <span className="text-accent-primary">Scale</span></h3>
              <p className="text-xl text-text-secondary max-w-md">
                A showcase of technical implementations, open source contributions, and experimental interfaces.
              </p>
              <div className="mt-8 flex items-center gap-4 text-sm font-mono text-text-secondary">
                <FiArrowRight className="animate-pulse" />
                <span>Scroll Down to Navigate</span>
              </div>
            </div>

            {projects.map((project, i) => (
              <ProjectCardHorizontal key={i} project={project} index={i} />
            ))}

            {/* End Spacer */}
            <div className="w-[20vw] flex-shrink-0" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
