import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import FallingText from './FallingText';
import { useRecruiter } from '../context/RecruiterContext';
import { FiGithub, FiExternalLink, FiCode, FiBox, FiLayers, FiDatabase, FiServer } from 'react-icons/fi';

const projects = [
  {
    id: 1,
    name: 'Sales Automation Platform',
    description: 'Full Sales module transformation (Lead to Invoice). Implemented SAP/CPQ integrations, complex pricing logic, and 45% reduced quote cycle time via Power Automate.',
    tech: ['D365 CE', 'PCF', 'Power Automate', 'C# Plugin'],
    github: 'https://github.com/Abhijit877',
    demo: '#',
    icon: <FiBox />
  },
  {
    id: 2,
    name: 'PCF File Uploader',
    description: 'Drag-and-drop file uploader for D365. Supports multiple file types, progress tracking, and async upload to Notes/Attachments. Reduced upload time by 50%.',
    tech: ['TypeScript', 'React', 'PCF', 'Web API'],
    github: 'https://github.com/Abhijit877',
    demo: '#',
    icon: <FiCode />
  },
  {
    id: 3,
    name: 'Concrete Recyclers CRM',
    description: 'End-to-end CRM modernization. Automated lead qualification and task delegation. Enhanced sales pipeline visibility by 60% through custom dashboarding.',
    tech: ['D365 CE', 'JavaScript', 'Cloud Flows', 'Workflows'],
    github: 'https://github.com/Abhijit877',
    demo: '#',
    icon: <FiBox />
  },
  {
    id: 4,
    name: 'Enhanced Input Control',
    description: 'Configurable PCF input control for high-volume data entry. Features built-in validation, formatting, and reusability across forms.',
    tech: ['PCF', 'TypeScript', 'Fluent UI'],
    github: 'https://github.com/Abhijit877',
    demo: '#',
    icon: <FiCode />
  }
];

const caseStudySteps = [
  {
    id: 0,
    title: "The Problem",
    content: "Legacy CRM systems were causing a 45% delay in quote generation due to manual data entry and lack of CPQ integration. Sales reps spent more time on admin than selling.",
    icon: <FiServer className="text-6xl text-red-500" />,
    highlight: "Manual Entry & Latency"
  },
  {
    id: 1,
    title: "The Architecture",
    content: "Designed a clean architecture using Azure Logic Apps as the middleware BFF (Backend for Frontend). This decoupled the D365 UI from the SAP ERP, ensuring non-blocking operations.",
    icon: <FiLayers className="text-6xl text-blue-500" />,
    highlight: "Azure Middleware & decoupling"
  },
  {
    id: 2,
    title: "The Solution",
    content: "Implemented a custom PCF Grid for rapid product selection and a Power Automate flow for PDF generation. Reduced quote cycle time from 2 days to 2 hours.",
    icon: <FiDatabase className="text-6xl text-green-500" />,
    highlight: "PCF & Automation"
  }
];

const ProjectCard = ({ project, index, range, targetScale, progress }: any) => {
  return (
    <div className="h-screen flex items-center justify-center sticky top-0">
      <motion.div
        className="relative w-full max-w-4xl h-[500px] bg-background-secondary rounded-3xl border border-line overflow-hidden shadow-2xl origin-top"
        style={{
          top: `calc(10vh + ${index * 25}px)`,
          scale: targetScale,
        }}
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

        <div className="flex flex-col md:flex-row h-full">
          {/* Project Info */}
          <div className="p-10 md:w-1/2 flex flex-col relative z-10">
            <div className="flex justify-between items-start mb-8">
              <div className="p-4 bg-accent-primary/10 text-accent-primary rounded-2xl text-3xl">
                {project.icon}
              </div>
            </div>

            <h3 className="text-3xl font-bold mb-4 text-text-primary">{project.name}</h3>

            <p className="text-text-secondary mb-8 text-lg leading-relaxed">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mt-auto mb-8">
              {project.tech.map((t: string) => (
                <span key={t} className="px-4 py-2 bg-background-primary/50 backdrop-blur-sm text-text-secondary text-sm rounded-full border border-line/50 font-mono">
                  {t}
                </span>
              ))}
            </div>

            <div className="flex space-x-6 text-text-secondary mt-auto">
              <a href={project.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-accent-primary transition-colors text-sm font-medium uppercase tracking-wider">
                <FiGithub size={20} />
                <span>Source Code</span>
              </a>
              <a href={project.demo} className="flex items-center gap-2 hover:text-accent-primary transition-colors text-sm font-medium uppercase tracking-wider">
                <FiExternalLink size={20} />
                <span>Live Demo</span>
              </a>
            </div>
          </div>

          {/* Project Image / Visual Placeholder */}
          <div className="md:w-1/2 bg-background-primary/50 relative overflow-hidden group">
            <div className="absolute inset-0 bg-grid-pattern opacity-20" />
            <div className="absolute inset-0 flex items-center justify-center text-9xl text-accent-primary/5 font-black select-none transition-transform duration-700 group-hover:scale-110">
              {index + 1}
            </div>
            {/* Decorative Elements */}
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-accent-primary/20 rounded-full blur-3xl group-hover:bg-accent-primary/30 transition-all duration-500" />
          </div>
        </div>
      </motion.div>
    </div>
  )
}

const Projects: React.FC = () => {
  const { isRecruiterMode } = useRecruiter();
  const [activeStep, setActiveStep] = useState(0);
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end']
  })

  return (
    <section ref={container} className="relative bg-background-primary transition-colors duration-300">
      <div className="container mx-auto px-6 py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.6 }}
          className="flex justify-between items-end mb-24"
        >
          <div>
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
          </div>
        </motion.div>

        {/* Featured Case Study: Scroll Story */}
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
                    className="flex flex-col items-center text-center space-y-6"
                  >
                    {caseStudySteps[activeStep].icon}
                    <h4 className="text-3xl font-bold text-text-primary">{caseStudySteps[activeStep].highlight}</h4>
                    <div className="w-20 h-1 bg-accent-primary rounded-full" />
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

        <div className="mt-32 mb-20 text-center">
          <h3 className="text-xs font-bold uppercase tracking-widest text-accent-primary mb-12">All Projects</h3>
        </div>

        <div className="relative flex flex-col gap-12 w-full">
          {
            projects.map((project, i) => {
              const targetScale = 1 - ((projects.length - i) * 0.05);
              return <ProjectCard key={i} index={i} project={project} range={[i * .25, 1]} targetScale={targetScale} progress={scrollYProgress} />
            })
          }
        </div>
      </div>
    </section>
  );
};

export default Projects;
