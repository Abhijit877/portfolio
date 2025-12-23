import React from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiMail } from 'react-icons/fi';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-background-secondary border-t border-line py-12 transition-colors duration-300">
            <div className="layout-container flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
                <div className="text-center md:text-left">
                    <h3 className="text-xl font-bold font-mono text-text-primary mb-2">&lt;Dev<span className="text-accent-primary">Folio</span> /&gt;</h3>
                    <p className="text-text-secondary text-sm">
                        Building digital experiences with passion and precision.
                    </p>
                </div>

                <div className="flex space-x-6">
                    <motion.a
                        href="https://github.com/Abhijit877"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ y: -5, scale: 1.1 }}
                        className="text-text-secondary hover:text-accent-primary transition-colors block"
                    >
                        <FiGithub size={24} />
                    </motion.a>
                    <motion.a
                        href="mailto:abhijitbehere877@gmail.com"
                        whileHover={{ y: -5, scale: 1.1 }}
                        className="text-text-secondary hover:text-accent-primary transition-colors block"
                    >
                        <FiMail size={24} />
                    </motion.a>
                </div>

                <div className="text-text-secondary text-sm">
                    &copy; {currentYear} All rights reserved.
                </div>
            </div>
            {/* Top Gradient Line */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-line to-transparent" />
        </footer>
    );
};

export default Footer;
