import React, { useState, useRef, useMemo } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaEnvelope, FaLinkedin, FaGithub, FaMapMarkerAlt, FaPhone, FaPaperPlane, FaCheck } from 'react-icons/fa';

type ParticlePosition = {
  left: string;
  top: string;
  duration: number;
  delay: number;
};

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const contactInfo = {
    email: 'abhijitbehera1995@gmail.com',
    phone: '+91 9876543210',
    location: 'Hyderabad, India',
    linkedin: 'https://linkedin.com/in/abhijit-behera',
    github: 'https://github.com/Abhijit877'
  };

  const particlePositions = useMemo(() => {
    return [
      { left: '10%', top: '20%', duration: 4, delay: 0 },
      { left: '85%', top: '15%', duration: 3.5, delay: 0.5 },
      { left: '25%', top: '70%', duration: 5, delay: 1 },
      { left: '70%', top: '80%', duration: 4.2, delay: 1.5 },
      { left: '45%', top: '35%', duration: 3.8, delay: 2 },
      { left: '90%', top: '50%', duration: 4.5, delay: 0.3 },
      { left: '15%', top: '85%', duration: 3.9, delay: 1.2 },
      { left: '60%', top: '10%', duration: 4.1, delay: 0.8 },
      { left: '30%', top: '60%', duration: 4.8, delay: 1.8 },
      { left: '75%', top: '25%', duration: 3.6, delay: 0.6 },
      { left: '5%', top: '45%', duration: 4.3, delay: 1.4 },
      { left: '50%', top: '90%', duration: 3.7, delay: 2.1 },
      { left: '80%', top: '65%', duration: 4.6, delay: 0.9 },
      { left: '20%', top: '5%', duration: 4.4, delay: 1.6 },
      { left: '55%', top: '75%', duration: 3.5, delay: 0.2 },
    ];
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', message: '' });

    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
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

      {/* Animated Background Particles */}
      <div className="absolute inset-0">
        {particlePositions.map((pos: ParticlePosition, i: number) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-metallic-silver/10 rounded-full"
            style={{
              left: pos.left,
              top: pos.top,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: pos.duration,
              repeat: Infinity,
              delay: pos.delay,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ y: 50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-glow-white via-metallic-silver to-glow-white bg-clip-text text-transparent">
            Get In Touch
          </h2>
          <p className="text-xl text-metallic-silver max-w-3xl mx-auto leading-relaxed">
            Ready to collaborate on innovative CRM solutions and enterprise software projects? Let's connect and build something amazing together.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="glass-panel p-8 h-full">
              <h3 className="text-3xl font-bold mb-8 bg-gradient-to-r from-metallic-silver to-glow-white bg-clip-text text-transparent">
                Let's Connect
              </h3>

              <div className="space-y-6 mb-8">
                <motion.div
                  className="flex items-center gap-4 p-4 rounded-lg bg-metallic-silver/5 border border-metallic-silver/10 hover:border-metallic-silver/30 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="w-12 h-12 rounded-full bg-metallic-silver/20 flex items-center justify-center">
                    <FaEnvelope className="text-metallic-silver text-xl" />
                  </div>
                  <div>
                    <p className="text-metallic-silver/70 text-sm">Email</p>
                    <a
                      href={`mailto:${contactInfo.email}`}
                      className="text-glow-white hover:text-metallic-silver transition-colors duration-300"
                    >
                      {contactInfo.email}
                    </a>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-center gap-4 p-4 rounded-lg bg-metallic-silver/5 border border-metallic-silver/10 hover:border-metallic-silver/30 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="w-12 h-12 rounded-full bg-metallic-silver/20 flex items-center justify-center">
                    <FaPhone className="text-metallic-silver text-xl" />
                  </div>
                  <div>
                    <p className="text-metallic-silver/70 text-sm">Phone</p>
                    <a
                      href={`tel:${contactInfo.phone}`}
                      className="text-glow-white hover:text-metallic-silver transition-colors duration-300"
                    >
                      {contactInfo.phone}
                    </a>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-center gap-4 p-4 rounded-lg bg-metallic-silver/5 border border-metallic-silver/10 hover:border-metallic-silver/30 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="w-12 h-12 rounded-full bg-metallic-silver/20 flex items-center justify-center">
                    <FaMapMarkerAlt className="text-metallic-silver text-xl" />
                  </div>
                  <div>
                    <p className="text-metallic-silver/70 text-sm">Location</p>
                    <p className="text-glow-white">{contactInfo.location}</p>
                  </div>
                </motion.div>
              </div>

              <div className="flex gap-4">
                <motion.a
                  href={contactInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-metallic-silver/20 flex items-center justify-center text-metallic-silver hover:bg-metallic-silver hover:text-futuristic-black transition-all duration-300"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaLinkedin className="text-xl" />
                </motion.a>
                <motion.a
                  href={contactInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-metallic-silver/20 flex items-center justify-center text-metallic-silver hover:bg-metallic-silver hover:text-futuristic-black transition-all duration-300"
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaGithub className="text-xl" />
                </motion.a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="glass-panel p-8">
              <h3 className="text-3xl font-bold mb-8 bg-gradient-to-r from-metallic-silver to-glow-white bg-clip-text text-transparent">
                Send a Message
              </h3>

              {isSubmitted ? (
                <motion.div
                  className="text-center py-12"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div
                    className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, ease: 'easeInOut' }}
                  >
                    <FaCheck className="text-green-400 text-2xl" />
                  </motion.div>
                  <h4 className="text-2xl font-bold text-glow-white mb-2">Message Sent!</h4>
                  <p className="text-metallic-silver">Thank you for reaching out. I'll get back to you soon!</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.8 }}
                  >
                    <label className="block text-metallic-silver text-sm font-medium mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-futuristic-black/50 border border-metallic-silver/30 rounded-lg text-glow-white placeholder-metallic-silver/50 focus:outline-none focus:border-metallic-silver focus:ring-1 focus:ring-metallic-silver/50 transition-all duration-300"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.9 }}
                  >
                    <label className="block text-metallic-silver text-sm font-medium mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="BEHERA.RAKA@gmail.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-futuristic-black/50 border border-metallic-silver/30 rounded-lg text-glow-white placeholder-metallic-silver/50 focus:outline-none focus:border-metallic-silver focus:ring-1 focus:ring-metallic-silver/50 transition-all duration-300"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 1.0 }}
                  >
                    <label className="block text-metallic-silver text-sm font-medium mb-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      placeholder="Tell me about your project or just say hello..."
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 bg-futuristic-black/50 border border-metallic-silver/30 rounded-lg text-glow-white placeholder-metallic-silver/50 focus:outline-none focus:border-metallic-silver focus:ring-1 focus:ring-metallic-silver/50 transition-all duration-300 resize-none"
                    />
                  </motion.div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 bg-gradient-to-r from-metallic-silver to-glow-white text-futuristic-black font-semibold rounded-lg shadow-glow hover:shadow-glow-strong transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 1.1 }}
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="w-5 h-5 border-2 border-futuristic-black/30 border-t-futuristic-black rounded-full"
                        />
                        Sending...
                      </>
                    ) : (
                      <>
                        <FaPaperPlane />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default Contact;
