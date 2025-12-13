import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { FaCode, FaProjectDiagram, FaTools, FaAward, FaRocket, FaBrain } from 'react-icons/fa';

const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [statsAnimated, setStatsAnimated] = useState(false);

  const stats = [
    { number: 3, suffix: '+', label: 'Years Experience', icon: FaCode },
    { number: 50, suffix: '+', label: 'Projects Completed', icon: FaProjectDiagram },
    { number: 10, suffix: '+', label: 'Technologies Mastered', icon: FaTools },
  ];

  const achievements = [
    { title: 'Dynamics 365 CE Expert', desc: '3+ years in CRM implementations', icon: FaAward },
    { title: 'Power Platform Specialist', desc: 'Advanced PCF controls & flows', icon: FaRocket },
    { title: 'Integration Maestro', desc: 'CRM-SAP & CPQ integrations', icon: FaBrain },
  ];

  const techBadges = [
    'Dynamics 365 CE', 'Power Platform', 'C#.NET', 'JavaScript', 'PCF Controls',
    'Power Automate', 'SQL Server', 'Scribe Insight', 'ASP.NET', 'REST APIs'
  ];

  useEffect(() => {
    if (isInView && !statsAnimated) {
      const tl = gsap.timeline();
      stats.forEach((_, index) => {
        tl.to(`.stat-${index} .stat-number`, {
          innerText: stats[index].number,
          duration: 2,
          ease: 'power2.out',
          snap: { innerText: 1 }
        }, 0);
      });
      setStatsAnimated(true);
    }
  }, [isInView, statsAnimated]);

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

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-metallic-silver/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ y: 50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-glow-white via-metallic-silver to-glow-white bg-clip-text text-transparent">
            About Abhijit Behera
          </h2>
          <p className="text-xl text-metallic-silver max-w-3xl mx-auto leading-relaxed">
            Dynamics 365 CE Technical Consultant with 3+ years of experience in end-to-end implementation of Microsoft Dynamics CRM projects.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Profile Image */}
          <motion.div
            className="relative"
            initial={{ x: -50, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative w-80 h-80 mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-metallic-silver/20 to-glow-white/20 rounded-full blur-xl" />
              <div className="relative w-full h-full bg-gradient-to-br from-futuristic-dark to-futuristic-black rounded-full border border-metallic-silver/30 flex items-center justify-center">
                <div className="text-8xl text-metallic-silver">👨‍💻</div>
              </div>
              {/* Rotating border */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-metallic-silver/50"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              />
            </div>
          </motion.div>

          {/* About Content */}
          <motion.div
            className="space-y-6"
            initial={{ x: 50, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="glass-panel p-6">
              <p className="text-metallic-silver leading-relaxed mb-4">
                Skilled in customizing and configuring Dynamics 365, developing plugins and workflow components, and integrating CRM with enterprise systems.
                Strong experience with Power Platform, PCF controls, data migration, and Agile collaboration with cross-functional teams.
              </p>
              <p className="text-metallic-silver/80 leading-relaxed">
                My journey in tech has been driven by curiosity and the desire to push the boundaries of what's possible through innovative CRM solutions.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          className="grid md:grid-cols-3 gap-8 mb-16"
          initial={{ y: 50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className={`stat-${index} glass-panel p-6 text-center hover:scale-105 transition-transform duration-300`}
              whileHover={{ y: -10 }}
            >
              <stat.icon className="text-3xl text-metallic-silver mb-4 mx-auto" />
              <div className="text-4xl font-bold text-glow-white mb-2">
                <span className="stat-number">0</span>{stat.suffix}
              </div>
              <div className="text-metallic-silver">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Achievements */}
        <motion.div
          className="mb-16"
          initial={{ y: 50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <h3 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-metallic-silver to-glow-white bg-clip-text text-transparent">
            Key Achievements
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                className="glass-panel p-6 text-center hover:scale-105 transition-all duration-300"
                whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(192, 192, 192, 0.1)' }}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
              >
                <achievement.icon className="text-4xl text-metallic-silver mb-4 mx-auto" />
                <h4 className="text-xl font-semibold text-glow-white mb-2">{achievement.title}</h4>
                <p className="text-metallic-silver/80">{achievement.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Tech Badges */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <h3 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-metallic-silver to-glow-white bg-clip-text text-transparent">
            Technical Expertise
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {techBadges.map((tech, index) => (
              <motion.span
                key={tech}
                className="px-4 py-2 bg-metallic-silver/10 border border-metallic-silver/30 rounded-full text-metallic-silver hover:bg-metallic-silver/20 transition-colors duration-300 cursor-default"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 1.4 + index * 0.05 }}
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default About;
