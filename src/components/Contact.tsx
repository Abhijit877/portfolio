import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiSend, FiCheckCircle, FiMail, FiLinkedin, FiTwitter, FiGithub } from 'react-icons/fi';
import FallingText from './FallingText';

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
    <div className="bg-background-secondary relative z-10" id="contact">
      <motion.section
        ref={sectionRef}
        style={{ scale, borderRadius }}
        className="py-20 lg:py-32 bg-background-primary relative overflow-hidden min-h-screen flex items-center justify-center origin-bottom"
      >
         {/* Decorative Gradients */}
         <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-accent-primary/5 rounded-full blur-[100px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-500/5 rounded-full blur-[100px]" />
         </div>

        <div className="container mx-auto px-6 relative z-10">
            <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
                
                {/* Left Side: Visuals & Connect */}
                <div className="lg:w-5/12 flex flex-col justify-center">
                     <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                     >
                        <h2 className="text-5xl md:text-7xl font-bold mb-8">
                            <FallingText
                                content="Let's build something future-proof."
                                highlightWords={["future-proof."]}
                                splitBy="word"
                                delay={0.2}
                            />
                        </h2>
                        
                        <p className="text-xl text-text-secondary mb-12 leading-relaxed">
                            Whether you have a game-changing idea or need a technical partner to scale your vision, I'm ready to chat.
                        </p>

                        <div className="flex gap-6 mb-12">
                             {[
                                 { icon: <FiMail />, link: "mailto:hello@example.com" },
                                 { icon: <FiGithub />, link: "https://github.com/Abhijit877" },
                                 { icon: <FiLinkedin />, link: "#" },
                                 { icon: <FiTwitter />, link: "#" },
                             ].map((social, i) => (
                                 <a 
                                    key={i} 
                                    href={social.link} 
                                    target="_blank"
                                    rel="noreferrer"
                                    className="p-4 bg-background-secondary border border-line rounded-full text-2xl text-text-secondary hover:text-white hover:bg-accent-primary hover:border-accent-primary transition-all duration-300 hover:scale-110"
                                >
                                     {social.icon}
                                 </a>
                             ))}
                        </div>

                        {/* Animated Holographic Orb Placeholder */}
                        <div className="relative w-full h-[60px] md:h-[100px] overflow-hidden rounded-full bg-background-secondary border border-line flex items-center justify-center group cursor-pointer hover:border-accent-primary/50 transition-colors">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent-primary/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                            <span className="font-mono text-sm text-accent-primary tracking-widest uppercase">Available for New Projects</span>
                        </div>
                     </motion.div>
                </div>

                {/* Right Side: Interactive Form */}
                <div className="lg:w-7/12">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                         className="bg-background-secondary/30 backdrop-blur-xl p-8 md:p-12 rounded-3xl border border-line/50 shadow-2xl relative"
                    >
                         {formState === 'success' ? (
                            <div className="text-center py-24">
                                <motion.div 
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500 text-5xl"
                                >
                                <FiCheckCircle />
                                </motion.div>
                                <h3 className="text-3xl font-bold mb-4">Message Sent!</h3>
                                <p className="text-text-secondary">I'll get back to you within 24 hours.</p>
                                <button onClick={() => setFormState('idle')} className="mt-8 text-accent-primary hover:underline">Send another</button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div>
                                    <label className="text-sm font-bold uppercase tracking-widest text-text-secondary mb-4 block">I'm interested in...</label>
                                    <div className="flex flex-wrap gap-3">
                                        {['Hiring', 'Freelance', 'Collaboration', 'Just saying hi'].map((option) => (
                                            <button
                                                key={option}
                                                type="button"
                                                onClick={() => setIntent(option.toLowerCase() as any)}
                                                className={`px-6 py-3 rounded-full border text-sm font-medium transition-all ${
                                                    intent === option.toLowerCase() 
                                                    ? 'bg-accent-primary text-white border-accent-primary shadow-lg shadow-accent-primary/25' 
                                                    : 'bg-background-primary text-text-secondary border-line hover:border-accent-primary/30'
                                                }`}
                                            >
                                                {option}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="group">
                                        <label className="block text-xs font-bold uppercase text-text-secondary mb-2 ml-1 group-focus-within:text-accent-primary transition-colors">Your Name</label>
                                        <input type="text" required className="w-full px-6 py-4 bg-background-primary/50 border border-line rounded-xl focus:ring-2 focus:ring-accent-primary/50 focus:border-accent-primary text-lg outline-none transition-all placeholder:text-white/20" placeholder="John Doe" />
                                    </div>
                                    <div className="group">
                                        <label className="block text-xs font-bold uppercase text-text-secondary mb-2 ml-1 group-focus-within:text-accent-primary transition-colors">Your Email</label>
                                        <input type="email" required className="w-full px-6 py-4 bg-background-primary/50 border border-line rounded-xl focus:ring-2 focus:ring-accent-primary/50 focus:border-accent-primary text-lg outline-none transition-all placeholder:text-white/20" placeholder="john@example.com" />
                                    </div>
                                </div>

                                <div className="group">
                                    <label className="block text-xs font-bold uppercase text-text-secondary mb-2 ml-1 group-focus-within:text-accent-primary transition-colors">Your Message</label>
                                    <textarea required rows={4} className="w-full px-6 py-4 bg-background-primary/50 border border-line rounded-xl focus:ring-2 focus:ring-accent-primary/50 focus:border-accent-primary text-lg outline-none transition-all placeholder:text-white/20 resize-none" placeholder="Tell me about your project..."></textarea>
                                </div>

                                <button
                                    type="submit"
                                    disabled={formState === 'submitting'}
                                    className="w-full py-5 bg-gradient-to-r from-accent-primary to-accent-hover text-white font-bold text-lg rounded-xl hover:shadow-lg hover:shadow-accent-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center space-x-3"
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
                    </motion.div>
                </div>
            </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Contact;
