import React from 'react';
import { motion } from 'framer-motion';
import { useRecruiter } from '../context/RecruiterContext';
import { FiCpu, FiLayout, FiUsers, FiTarget } from 'react-icons/fi';
import Tilt from 'react-parallax-tilt';
import FallingText from './FallingText';

const principles = [
  {
    icon: <FiCpu />,
    title: 'Performance First',
    description: 'I believe speed is a feature. I optimize for Core Web Vitals, use efficient algorithms, and minimize bundle sizes.'
  },
  {
    icon: <FiLayout />,
    title: 'Clean Architecture',
    description: 'Maintainable code over clever code. I strictly follow SOLID principles, component modularity, and atomic design.'
  },
  {
    icon: <FiUsers />,
    title: 'Human-Centered',
    description: 'Accessibility (a11y) is not an afterthought. I build inclusive interfaces that work for everyone, everywhere.'
  },
  {
    icon: <FiTarget />,
    title: 'Business Impact',
    description: 'Code must solve problems. I bridge the gap between engineering complexity and business goals.'
  }
];

const About: React.FC = () => {
  const { isRecruiterMode } = useRecruiter();

  return (
    <section className="py-20 bg-background-secondary text-text-primary">
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

        {/* Story / Text */}
        <div>
          <h2 className="text-3xl font-bold mb-6">
            <FallingText content="How I Build Software" delay={0.2} splitBy="char" />
          </h2>
          <p className="text-text-secondary mb-6 leading-relaxed">
            <FallingText
              content="Beyond just writing code, I engineer solutions. My approach to frontend development is grounded in computer science fundamentals and modern design patterns."
              delay={0.4}
            />
          </p>
          <p className="text-text-secondary mb-8 leading-relaxed">
            I don't just "make it work"—I make it scalable, maintainable, and delightful to use. Whether it's a complex dashboard or a landing page, I bring the same level of engineering rigor.
          </p>

          {!isRecruiterMode && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {principles.map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-4 bg-background-primary rounded-lg border border-line hover:border-accent-primary/50 transition-colors"
                >
                  <div className="text-accent-primary mb-2 text-xl">{p.icon}</div>
                  <h3 className="font-bold text-sm mb-1">{p.title}</h3>
                  <p className="text-xs text-text-secondary">{p.description}</p>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Visual (Abstract or Profile) */}
        <div className="relative flex justify-center perspective-1000">
          <div className="absolute w-64 h-64 md:w-80 md:h-80 bg-gradient-to-tr from-accent-primary to-accent-secondary rounded-2xl rotate-3 opacity-20 inset-0 blur-xl animate-pulse" />
          <Tilt
            tiltMaxAngleX={10}
            tiltMaxAngleY={10}
            perspective={1000}
            scale={1.05}
            transitionSpeed={1000}
            className="relative w-full max-w-sm"
          >
            <div className="bg-background-primary border border-line rounded-2xl p-6 shadow-2xl relative overflow-hidden group">
              {/* Shine Effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="flex items-center space-x-2 mb-4 border-b border-line pb-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <code className="text-sm font-mono text-text-secondary block">
                <span className="text-accent-secondary">class</span> <span className="text-accent-primary">Engineer</span> <span className="text-text-primary">{'{'}</span><br />
                &nbsp;&nbsp;<span className="text-accent-secondary">constructor</span>() {'{'}<br />
                &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-accent-primary">this</span>.passion = <span className="text-green-400">"Building"</span>;<br />
                &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-accent-primary">this</span>.stack = [<span className="text-green-400">"React"</span>, <span className="text-green-400">"TS"</span>];<br />
                &nbsp;&nbsp;{'}'}<br />
                <br />
                &nbsp;&nbsp;<span className="text-accent-secondary">solve</span>(problem) {'{'}<br />
                &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-accent-secondary">return</span> new <span className="text-accent-primary">Solution</span>(problem);<br />
                &nbsp;&nbsp;{'}'}<br />
                {'}'}
              </code>
            </div>
          </Tilt>
        </div>

      </div>
    </section>
  );
};

export default About;
