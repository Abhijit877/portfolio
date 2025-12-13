import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaCode, FaStar, FaEye } from 'react-icons/fa';
import reposData from '../repos.json';

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubUrl: string;
  liveUrl?: string;
  featured: boolean;
  category: string;
}

const Projects: React.FC = () => {
  const repos = reposData.filter(repo => !repo.fork && repo.description); // Filter out forks and repos without descriptions
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Featured projects with custom data
  const featuredProjects: Project[] = [
    {
      id: 'portfolio-redesign',
      title: 'Portfolio Redesign',
      description: 'A futuristic, interactive portfolio website built with React, TypeScript, and modern animations. Features glass-morphism design, 3D hover effects, and smooth scroll animations.',
      image: '/api/placeholder/600/400',
      technologies: ['React', 'TypeScript', 'Framer Motion', 'Tailwind CSS', 'Three.js'],
      githubUrl: 'https://github.com/Abhijit877/portfolio-redesign',
      liveUrl: 'https://abhijit877.github.io',
      featured: true,
      category: 'Web Development'
    },
    {
      id: 'crm-integration',
      title: 'CRM Integration Suite',
      description: 'Enterprise-grade CRM integration solutions using Dynamics 365, Power Platform, and custom APIs. Includes data synchronization, workflow automation, and reporting dashboards.',
      image: '/api/placeholder/600/400',
      technologies: ['Dynamics 365', 'Power Automate', 'C#', '.NET', 'REST APIs'],
      githubUrl: 'https://github.com/Abhijit877/crm-integration',
      featured: true,
      category: 'Enterprise Software'
    }
  ];

  const getTechColor = (tech: string) => {
    const colors: { [key: string]: string } = {
      'React': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
      'TypeScript': 'bg-blue-600/20 text-blue-400 border-blue-600/30',
      'JavaScript': 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
      'Python': 'bg-green-500/20 text-green-300 border-green-500/30',
      'C#': 'bg-purple-500/20 text-purple-300 border-purple-500/30',
      '.NET': 'bg-purple-600/20 text-purple-400 border-purple-600/30',
      'HTML': 'bg-orange-500/20 text-orange-300 border-orange-500/30',
      'CSS': 'bg-blue-400/20 text-blue-200 border-blue-400/30',
      'Node.js': 'bg-green-600/20 text-green-400 border-green-600/30',
      'Dynamics 365': 'bg-red-500/20 text-red-300 border-red-500/30',
      'Power Automate': 'bg-green-400/20 text-green-200 border-green-400/30',
      'REST APIs': 'bg-gray-500/20 text-gray-300 border-gray-500/30',
      'Tailwind CSS': 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
      'Framer Motion': 'bg-pink-500/20 text-pink-300 border-pink-500/30',
      'Three.js': 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30'
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

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ y: 50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-glow-white via-metallic-silver to-glow-white bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <p className="text-xl text-metallic-silver max-w-3xl mx-auto leading-relaxed">
            Showcasing innovative solutions and technical expertise across various domains.
          </p>
        </motion.div>

        {/* Featured Projects Spotlight */}
        <div className="mb-20">
          <motion.h3
            className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-metallic-silver to-glow-white bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Project Spotlight
          </motion.h3>
          <div className="grid lg:grid-cols-2 gap-8">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                className="glass-panel p-8 hover:scale-105 transition-transform duration-300 group"
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.2 }}
                whileHover={{
                  rotateY: 5,
                  rotateX: 5,
                  boxShadow: '0 25px 50px rgba(192, 192, 192, 0.15)'
                }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="relative mb-6 overflow-hidden rounded-lg bg-gradient-to-br from-metallic-silver/10 to-transparent p-8">
                  <div className="flex items-center justify-center h-48">
                    <FaCode className="text-6xl text-metallic-silver/60 group-hover:text-metallic-silver transition-colors duration-300" />
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-metallic-silver/20 text-metallic-silver text-sm rounded-full border border-metallic-silver/30">
                      {project.category}
                    </span>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-glow-white mb-3 group-hover:text-metallic-silver transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-metallic-silver/80 mb-6 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className={`px-3 py-1 text-sm rounded-full border transition-all duration-300 ${getTechColor(tech)}`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  <a
                    href={project.githubUrl}
                    className="flex items-center gap-2 px-4 py-2 bg-metallic-silver/20 hover:bg-metallic-silver/30 text-metallic-silver rounded-lg transition-all duration-300 border border-metallic-silver/30 hover:border-metallic-silver/50"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaGithub className="text-lg" />
                    Code
                  </a>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-metallic-silver to-glow-white text-futuristic-black rounded-lg transition-all duration-300 hover:scale-105"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaExternalLinkAlt className="text-lg" />
                      Live Demo
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* GitHub Repositories */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          <h3 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-metallic-silver to-glow-white bg-clip-text text-transparent">
            Open Source Contributions
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {repos.slice(0, 6).map((repo, index) => (
              <motion.div
                key={repo.name}
                className="glass-panel p-6 hover:scale-105 transition-all duration-300 group"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <FaGithub className="text-2xl text-metallic-silver/60 group-hover:text-metallic-silver transition-colors duration-300" />
                  <div className="flex items-center gap-3 text-sm text-metallic-silver/60">
                    {repo.stargazers_count > 0 && (
                      <div className="flex items-center gap-1">
                        <FaStar className="text-yellow-400" />
                        <span>{repo.stargazers_count}</span>
                      </div>
                    )}
                    {repo.watchers_count > 0 && (
                      <div className="flex items-center gap-1">
                        <FaEye />
                        <span>{repo.watchers_count}</span>
                      </div>
                    )}
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-glow-white mb-2 group-hover:text-metallic-silver transition-colors duration-300">
                  {repo.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </h3>
                <p className="text-metallic-silver/80 text-sm mb-4 leading-relaxed line-clamp-3">
                  {repo.description || 'No description available'}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {repo.language && (
                    <span className={`px-2 py-1 text-xs rounded-full border ${getTechColor(repo.language)}`}>
                      {repo.language}
                    </span>
                  )}
                  {repo.topics?.slice(0, 2).map((topic) => (
                    <span
                      key={topic}
                      className="px-2 py-1 text-xs rounded-full bg-metallic-silver/10 text-metallic-silver/70 border border-metallic-silver/20"
                    >
                      {topic}
                    </span>
                  ))}
                </div>

                <a
                  href={repo.html_url}
                  className="inline-flex items-center gap-2 text-metallic-silver hover:text-glow-white transition-colors duration-300 text-sm font-medium"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Repository →
                </a>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Projects;
