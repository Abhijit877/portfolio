import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  FaDatabase, FaCloud, FaCode,
  FaCogs, FaPalette, FaJsSquare, FaHtml5, FaCss3,
  FaMicrosoft, FaTools, FaRobot
} from 'react-icons/fa';
import { SiSharp, SiDotnet, SiScrumalliance } from 'react-icons/si';

const Skills: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const skillCategories = [
    {
      title: 'CRM Technologies',
      skills: [
        { name: 'Dynamics 365 CE', icon: FaMicrosoft, level: 95 },
        { name: 'CRM SDK', icon: FaCogs, level: 90 },
        { name: 'PCF Controls', icon: FaTools, level: 85 },
      ]
    },
    {
      title: 'Power Platform',
      skills: [
        { name: 'Power Automate', icon: FaCloud, level: 90 },
        { name: 'Canvas Apps', icon: FaPalette, level: 85 },
        { name: 'Model-Driven Apps', icon: FaCode, level: 80 },
      ]
    },
    {
      title: 'Programming',
      skills: [
        { name: 'C#.NET', icon: SiSharp, level: 90 },
        { name: 'JavaScript', icon: FaJsSquare, level: 85 },
        { name: 'ASP.NET', icon: SiDotnet, level: 80 },
      ]
    },
    {
      title: 'Databases & Integration',
      skills: [
        { name: 'SQL Server', icon: FaDatabase, level: 85 },
        { name: 'Scribe Insight', icon: FaDatabase, level: 80 },
        { name: 'REST APIs', icon: FaCloud, level: 75 },
      ]
    },
    {
      title: 'Web Technologies',
      skills: [
        { name: 'HTML', icon: FaHtml5, level: 90 },
        { name: 'CSS', icon: FaCss3, level: 85 },
        { name: 'jQuery', icon: FaJsSquare, level: 80 },
      ]
    },
    {
      title: 'Methodologies',
      skills: [
        { name: 'Agile', icon: SiScrumalliance, level: 85 },
        { name: 'Scrum', icon: SiScrumalliance, level: 80 },
        { name: 'JIRA', icon: FaTools, level: 75 },
      ]
    }
  ];

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



      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ y: 50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-glow-white via-metallic-silver to-glow-white bg-clip-text text-transparent">
            Technical Skills
          </h2>
          <p className="text-xl text-metallic-silver max-w-3xl mx-auto leading-relaxed">
            Comprehensive expertise across CRM technologies, development frameworks, and enterprise solutions.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              className="glass-panel p-6 hover:scale-105 transition-transform duration-300"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + categoryIndex * 0.1 }}
              whileHover={{
                rotateY: 5,
                rotateX: 5,
                boxShadow: '0 25px 50px rgba(192, 192, 192, 0.15)'
              }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <h3 className="text-2xl font-semibold text-glow-white mb-6 text-center">
                {category.title}
              </h3>

              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    className="group relative"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.6 + categoryIndex * 0.1 + skillIndex * 0.1 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <skill.icon className="text-2xl text-metallic-silver group-hover:text-glow-white transition-colors duration-300" />
                        <span className="text-metallic-silver group-hover:text-glow-white transition-colors duration-300 font-medium">
                          {skill.name}
                        </span>
                      </div>
                      <span className="text-sm text-metallic-silver/60">{skill.level}%</span>
                    </div>

                    <div className="w-full bg-metallic-silver/20 rounded-full h-2 overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-metallic-silver to-glow-white rounded-full"
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${skill.level}%` } : {}}
                        transition={{ duration: 1.5, delay: 0.8 + categoryIndex * 0.1 + skillIndex * 0.1, ease: 'easeOut' }}
                      />
                    </div>

                    {/* Tooltip */}
                    <motion.div
                      className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-futuristic-black border border-metallic-silver/30 rounded-lg px-3 py-2 text-sm text-metallic-silver opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20"
                      initial={false}
                    >
                      {skill.name} - {skill.level}% Proficiency
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-futuristic-black"></div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Skill Spotlight */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <div className="glass-panel p-8 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-metallic-silver to-glow-white bg-clip-text text-transparent">
              Core Competencies
            </h3>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { icon: FaMicrosoft, title: 'CRM Expert', desc: 'Dynamics 365 CE' },
                { icon: FaCloud, title: 'Power Platform', desc: 'Automation & Apps' },
                { icon: FaCogs, title: 'Integration', desc: 'Enterprise Systems' },
                { icon: FaRobot, title: 'Innovation', desc: 'Custom Solutions' }
              ].map((competency, index) => (
                <motion.div
                  key={competency.title}
                  className="text-center hover:scale-110 transition-transform duration-300"
                  whileHover={{ y: -10 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 1.4 + index * 0.1 }}
                >
                  <competency.icon className="text-4xl text-metallic-silver mb-3 mx-auto" />
                  <h4 className="text-lg font-semibold text-glow-white mb-1">{competency.title}</h4>
                  <p className="text-sm text-metallic-silver/80">{competency.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Skills;
