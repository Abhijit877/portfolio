import { motion } from "framer-motion";


const DecayText = ({ text = "Decay Text", className = "" }) => {
    return (
        <div className={`relative overflow-hidden ${className}`}>
            <motion.span
                initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="block"
            >
                {text}
            </motion.span>
        </div>
    );
};

export default DecayText;
