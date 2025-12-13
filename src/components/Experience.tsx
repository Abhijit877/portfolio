import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaBriefcase, FaCalendarAlt, FaMapMarkerAlt, FaChevronRight } from 'react-icons/fa';

interface ExperienceItem {
  id: string;
  title: string;
  company: string;
  duration: string;
  location: string;
  description: string[];
  technologies: string[];
  achievements: string[];
}

const Experience: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const experiences: ExperienceItem[] = [
    {
      id: 'senior-software-engineer',
      title: 'Senior Software Engineer',
      company: 'Microsoft (Dynamics 365 CE)',
      duration: '2022 - Present',
      location: 'Hyderabad, India',
      description: [
        'Led development of enterprise-grade CRM solutions using Dynamics 365 Customer Engagement',
        'Architected and implemented custom PCF controls for enhanced user experiences',
        'Mentored junior developers and conducted technical interviews'
      ],
      technologies: ['Dynamics 365 CE', 'PCF Controls', 'C#', '.NET', 'JavaScript', 'Azure'],
      achievements: [
        'Improved system performance by 40% through optimized data processing',
        'Successfully delivered 15+ major CRM implementations',
        'Received "Employee of the Quarter" award for outstanding contributions'
      ]
    },
    {
      id: 'software-engineer',
      title: 'Software Engineer',
      company: 'Tech Mahindra (Microsoft Partner)',
      duration: '2020 - 2022',
      location: 'Hyderabad, India',
      description: [
        'Developed and maintained CRM integrations using Microsoft Power Platform',
        'Implemented automated workflows using Power Automate and Logic Apps',
        'Collaborated with cross-functional teams for seamless project delivery'
      ],
      technologies: ['Power Automate', 'Power Apps', 'Dynamics 365', 'Azure Logic Apps', 'SQL Server'],
      achievements: [
        'Reduced manual processing time by 60% through automation',
        'Led migration of legacy CRM systems to Dynamics 365',
        'Contributed to 10+ successful client implementations'
      ]
    },
    {
      id: 'junior-developer',
      title: 'Junior Software Developer',
      company: 'Scribe Software (Now TIBCO)',
      duration: '2018 - 2020',
      location: 'Hyderabad, India',
      description: [
        'Developed data integration solutions using Scribe Insight platform',
        'Created custom connectors and workflows for enterprise data synchronization',
        'Participated in agile development processes and sprint planning'
      ],
      technologies: ['Scribe Insight', 'SQL Server', 'C#', '.NET', 'REST APIs'],
      achievements: [
        'Completed certification in Scribe platform development',
        'Successfully integrated 20+ enterprise systems',
        'Recognized for exceptional problem-solving skills'
      ]
    }
  ];

  const getTechColor = (tech: string) => {
    const colors: { [key: string]: string } = {
      'Dynamics 365 CE': 'bg-red-500/20 text-red-300 border-red-500/30',
      'PCF Controls': 'bg-purple-500/20 text-purple-300 border-purple-500/30',
      'C#': 'bg-purple-600/20 text-purple-400 border-purple-600/30',
      '.NET': 'bg-purple-500/20 text-purple-300 border-purple-500/30',
      'JavaScript': 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
      'Azure': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
      'Power Automate': 'bg-green-400/20 text-green-200 border-green-400/30',
      'Power Apps': 'bg-blue-400/20 text-blue-200 border-blue-400/30',
      'Azure Logic Apps': 'bg-green-500/20 text-green-300 border-green-500/30',
      'SQL Server': 'bg-blue-600/20 text-blue-400 border-blue-600/30',
      'Scribe Insight': 'bg-orange-500/20 text-orange-300 border-orange-500/30',
      'REST APIs': 'bg-gray-500/20 text-gray-300 border-gray-500/30'
    };
    return colors[tech] || 'bg-metallic-silver/20 text-metallic-silver border-metallic-silver/30';
  };

  return (
    <motion.section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center py-20 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 1 }}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-futuristic-black via-futuristic-dark to-futuristic-black" />
      <div className="absolute inset-0 bg-gradient-radial from-metallic-silver/5 via-transparent to-transparent" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ y: 50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-glow-white via-metallic-silver to-glow-white bg-clip-text text-transparent">
            Professional Experience
          </h2>
          <p className="text-xl text-metallic-silver max-w-3xl mx-auto leading-relaxed">
            A journey through enterprise software development, CRM solutions, and technological innovation.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-metallic-silver via-metallic-silver/50 to-transparent transform md:-translate-x-0.5" />

          {experiences.map((experience, index) => (
            <motion.div
              key={experience.id}
              className={`relative flex items-center mb-12 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 + index * 0.2 }}
            >
              {/* Timeline Dot */}
              <motion.div
                className="absolute left-8 md:left-1/2 w-4 h-4 bg-metallic-silver rounded-full border-4 border-futuristic-black transform md:-translate-x-2 z-10"
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.2 }}
              />

              {/* Content Card */}
              <motion.div
                className={`ml-16 md:ml-0 md:w-1/2 ${
                  index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'
                }`}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="glass-panel p-6 hover:scale-105 transition-transform duration-300">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-glow-white mb-1">
                        {experience.title}
                      </h3>
                      <div className="flex items-center gap-2 text-metallic-silver mb-2">
                        <FaBriefcase className="text-sm" />
                        <span className="font-semibold">{experience.company}</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-metallic-silver/70">
                        <div className="flex items-center gap-1">
                          <FaCalendarAlt className="text-xs" />
                          <span>{experience.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <FaMapMarkerAlt className="text-xs" />
                          <span>{experience.location}</span>
                        </div>
                      </div>
                    </div>
                    <FaChevronRight className="text-metallic-silver/50 text-xl" />
                  </div>

                  {/* Description */}
                  <div className="mb-4">
                    <h4 className="text-lg font-semibold text-metallic-silver mb-2">Key Responsibilities</h4>
                    <ul className="space-y-1">
                      {experience.description.map((item, i) => (
                        <li key={i} className="text-metallic-silver/80 text-sm flex items-start gap-2">
                          <span className="text-metallic-silver mt-1.5 text-xs">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div className="mb-4">
                    <h4 className="text-lg font-semibold text-metallic-silver mb-2">Technologies Used</h4>
                    <div className="flex flex-wrap gap-2">
                      {experience.technologies.map((tech) => (
                        <span
                          key={tech}
                          className={`px-3 py-1 text-xs rounded-full border transition-all duration-300 ${getTechColor(tech)}`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Achievements */}
                  <div>
                    <h4 className="text-lg font-semibold text-metallic-silver mb-2">Key Achievements</h4>
                    <ul className="space-y-1">
                      {experience.achievements.map((achievement, i) => (
                        <li key={i} className="text-metallic-silver/80 text-sm flex items-start gap-2">
                          <span className="text-glow-white mt-1.5 text-xs">★</span>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Summary Stats */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <div className="glass-panel p-8 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold mb-8 bg-gradient-to-r from-metallic-silver to-glow-white bg-clip-text text-transparent">
              Career Highlights
            </h3>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { number: '6+', label: 'Years Experience', icon: FaBriefcase },
                { number: '25+', label: 'Projects Delivered', icon: FaBriefcase },
                { number: '15+', label: 'CRM Implementations', icon: FaBriefcase },
                { number: '40%', label: 'Performance Improvement', icon: FaBriefcase }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center hover:scale-110 transition-transform duration-300"
                  whileHover={{ y: -5 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: 1.4 + index * 0.1 }}
                >
                  <stat.icon className="text-3xl text-metallic-silver mb-3 mx-auto" />
                  <div className="text-3xl font-bold text-glow-white mb-1">{stat.number}</div>
                  <div className="text-sm text-metallic-silver/80">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Experience;
