import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiSend, FiCheckCircle } from 'react-icons/fi';
import Tilt from 'react-parallax-tilt';

const Contact: React.FC = () => {
  const [intent, setIntent] = useState<'hiring' | 'freelance' | 'collab' | null>(null);
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');

  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end end"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const borderRadius = useTransform(scrollYProgress, [0, 1], ["100px", "0px"]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    // Simulate API call
    setTimeout(() => {
      setFormState('success');
    }, 1500);
  };

  return (
    <div className="bg-background-secondary py-10 relative">
      <motion.section
        ref={sectionRef}
        style={{ scale, borderRadius }}
        className="py-20 bg-accent-primary/5 relative overflow-hidden min-h-screen flex items-center justify-center origin-bottom"
      >
        {/* Morphing Background */}
        <motion.div
          className="absolute inset-0 bg-background-primary z-0"
          style={{ borderRadius }}
        />

        <div className="container mx-auto px-6 max-w-4xl relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Let's Work Together</h2>
            <p className="text-text-secondary">
              I'm currently available for freelance projects and open to full-time opportunities.
            </p>
          </div>

          {/* Intent Selection */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} scale={1.02} className="h-full">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIntent('hiring')}
                className={`w-full h-full p-6 rounded-xl border transition-all text-left ${intent === 'hiring' ? 'bg-accent-primary text-white border-accent-primary shadow-lg shadow-accent-primary/20' : 'bg-background-secondary text-text-secondary border-line hover:border-accent-primary/50'}`}
              >
                <h3 className="font-bold mb-1">Recruiter / Hiring</h3>
                <p className="text-xs opacity-80">I want to hire you full-time.</p>
              </motion.button>
            </Tilt>
            <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} scale={1.02} className="h-full">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIntent('freelance')}
                className={`w-full h-full p-6 rounded-xl border transition-all text-left ${intent === 'freelance' ? 'bg-accent-primary text-white border-accent-primary shadow-lg shadow-accent-primary/20' : 'bg-background-secondary text-text-secondary border-line hover:border-accent-primary/50'}`}
              >
                <h3 className="font-bold mb-1">Freelance / Contract</h3>
                <p className="text-xs opacity-80">I have a project for you.</p>
              </motion.button>
            </Tilt>
            <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} scale={1.02} className="h-full">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIntent('collab')}
                className={`w-full h-full p-6 rounded-xl border transition-all text-left ${intent === 'collab' ? 'bg-accent-primary text-white border-accent-primary shadow-lg shadow-accent-primary/20' : 'bg-background-secondary text-text-secondary border-line hover:border-accent-primary/50'}`}
              >
                <h3 className="font-bold mb-1">Collaboration</h3>
                <p className="text-xs opacity-80">I want to build something fun.</p>
              </motion.button>
            </Tilt>
          </div>

          {/* Contact Form */}
          <div className="bg-background-secondary/50 backdrop-blur-lg p-8 rounded-2xl border border-line shadow-2xl">
            {formState === 'success' ? (
              <div className="text-center py-12">
                <FiCheckCircle className="mx-auto text-green-500 text-6xl mb-4" />
                <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                <p className="text-text-secondary">I'll get back to you within 24 hours.</p>
                <button onClick={() => setFormState('idle')} className="mt-6 text-accent-primary hover:underline">Send another</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">Name</label>
                  <input type="text" required className="w-full px-4 py-3 bg-background-primary border border-line rounded-lg focus:ring-2 focus:ring-accent-primary focus:border-transparent outline-none transition-all" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">Email</label>
                  <input type="email" required className="w-full px-4 py-3 bg-background-primary border border-line rounded-lg focus:ring-2 focus:ring-accent-primary focus:border-transparent outline-none transition-all" placeholder="john@example.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">Message</label>
                  <textarea required rows={4} className="w-full px-4 py-3 bg-background-primary border border-line rounded-lg focus:ring-2 focus:ring-accent-primary focus:border-transparent outline-none transition-all" placeholder={intent === 'hiring' ? "Hi, we'd like to interview you for..." : "How can I help you?"}></textarea>
                </div>

                <button
                  type="submit"
                  disabled={formState === 'submitting'}
                  className="w-full py-4 bg-accent-primary text-white font-bold rounded-lg hover:bg-accent-hover transition-all flex items-center justify-center space-x-2"
                >
                  {formState === 'submitting' ? (
                    <span>Sending...</span>
                  ) : (
                    <>
                      <FiSend />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Contact;


