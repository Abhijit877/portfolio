import React from 'react';
import { motion } from 'framer-motion';
import { useRecruiter } from '../context/RecruiterContext';
import { FiGithub, FiExternalLink, FiCode, FiBox } from 'react-icons/fi';

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

const Projects: React.FC = () => {
  const { isRecruiterMode } = useRecruiter();

  return (
    <section className="py-20 bg-background-primary transition-colors duration-300">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
            <p className="text-text-secondary max-w-xl">
              Delivering enterprise value through Dynamics 365 customizations and PCF component development.
            </p>
          </div>
          <a href="https://github.com/Abhijit877" target="_blank" rel="noopener noreferrer" className="hidden md:flex items-center text-accent-primary hover:text-accent-hover font-medium">
            <span>View Github</span>
            <FiExternalLink className="ml-2" />
          </a>
        </div>

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
