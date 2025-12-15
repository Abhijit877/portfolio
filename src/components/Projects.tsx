import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

const Projects: React.FC = () => {
  const { isRecruiterMode } = useRecruiter();
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="py-20 bg-background-primary transition-colors duration-300">
      <div className="container mx-auto px-6">

        {/* Header */}
        <div className="flex justify-between items-end mb-16">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Selected Works</h2>
            <p className="text-text-secondary max-w-xl text-lg">
              Delivering enterprise value through Dynamics 365 customizations and PCF component development.
            </p>
          </div>
          <a href="https://github.com/Abhijit877" target="_blank" rel="noopener noreferrer" className="hidden md:flex items-center text-accent-primary hover:text-accent-hover font-medium">
            <span>View Github</span>
            <FiExternalLink className="ml-2" />
          </a>
        </div>

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={isRecruiterMode ? {} : { opacity: 0, y: 20 }}
              whileInView={isRecruiterMode ? {} : { opacity: 1, y: 0 }}
              whileHover={isRecruiterMode ? {} : { y: -5, scale: 1.02 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group relative bg-background-secondary rounded-2xl overflow-hidden border border-line hover:border-accent-primary/50 transition-all duration-300 hover:shadow-2xl flex flex-col"
            >
              {/* Glass Header */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="p-8 flex flex-col flex-grow relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-accent-primary/10 text-accent-primary rounded-xl text-2xl group-hover:bg-accent-primary group-hover:text-white transition-colors duration-300">
                    {project.icon}
                  </div>
                  <div className="flex space-x-3 text-text-secondary">
                    <a href={project.github} className="hover:text-accent-primary transition-colors hover:scale-110 transform duration-200">
                      <FiGithub size={22} />
                    </a>
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-3 group-hover:text-accent-primary transition-colors">{project.name}</h3>

                <p className="text-text-secondary mb-6 text-sm flex-grow leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tech.map(t => (
                    <span key={t} className="px-3 py-1 bg-background-primary/50 backdrop-blur-sm text-text-secondary text-xs rounded-full border border-line/50 font-mono group-hover:border-accent-primary/30 transition-colors">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))
          }
        </div>

        <div className="mt-12 text-center md:hidden">
          <a href="https://github.com/Abhijit877" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-accent-primary hover:text-accent-hover font-medium">
            <span>View All Projects on Github</span>
            <FiExternalLink className="ml-2" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
