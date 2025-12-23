import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Shield, Cpu, TrendingUp,
    Download, CheckCircle, Terminal,
    Activity, Layers, Zap
} from 'lucide-react';
import { BootSequence } from '../components/BootSequence';

// --- Data ---
const PROFILE = {
    name: "ABHIJIT BEHERA",
    role: "DYNAMICS 365 CE CONSULTANT",
    summary: "Dynamics 365 CE Consultant with 3+ years of experience delivering end-to-end CRM implementations. Expert in Plugin Development, PCF Controls, and Power Platform automation."
};

const METRICS = [
    { label: "EXPERIENCE", value: "3+ YEARS", icon: Shield, sub: "ACTIVE DUTY" },
    { label: "EFFICIENCY", value: "30% UP", icon: Zap, sub: "PCF UI OPTIMIZATION" },
    { label: "VELOCITY", value: "40% FASTER", icon: Activity, sub: "APPROVAL CYCLES" },
    { label: "VISIBILITY", value: "+60%", icon: TrendingUp, sub: "SALES AUTOMATION" },
];

const HISTORY = [
    {
        role: "Associate DCRM Engineer",
        company: "RSHANU Technologies",
        period: "JAN 2025 - PRESENT",
        highlight: "Architected end-to-end D365 customizations and real-time SAP/CPQ integrations."
    },
    {
        role: "Junior D365 Consultant",
        company: "Dolf Technologies",
        period: "OCT 2022 - DEC 2024",
        highlight: "Reduced data inconsistencies by 35% during legacy migration; Optimized JS web resources."
    }
];

const TECH_STACK = {
    core: ["Dynamics 365 CE", "C#.NET", "JavaScript", "Power Automate"],
    advanced: ["PCF Controls (React/TS)", "Azure DevOps", "REST APIs"]
};

// --- Components ---




const Header = () => (
    <header className="fixed top-0 inset-x-0 h-20 bg-[#030014]/80 backdrop-blur-md border-b border-white/10 z-40 flex items-center justify-between px-6 md:px-12">
        <div className="flex items-center gap-3 text-cyan-400">
            <Terminal size={20} />
            <div className="font-mono text-sm tracking-wider">
                <span className="text-white font-bold opacity-80">CLASSIFIED DOSSIER</span>
                <span className="text-white/20 mx-2">//</span>
                <span className="text-cyan-400">{PROFILE.name}</span>
            </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-mono text-emerald-400 tracking-widest">SECURE_LINK_ESTABLISHED</span>
        </div>
    </header>
);

const MetricCard = ({ item, index }: { item: any, index: number }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 + (index * 0.1) }}
        className="group relative bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-xl hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-all duration-300"
    >
        <div className="flex justify-between items-start mb-4">
            <item.icon className="text-white/40 group-hover:text-cyan-400 transition-colors" size={24} />
            <span className="text-[10px] font-mono text-white/40 border border-white/10 px-2 py-0.5 rounded group-hover:text-cyan-400 group-hover:border-cyan-400/30 transition-colors">
                {item.sub}
            </span>
        </div>
        <div className="text-3xl font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors tracking-tight">
            {item.value}
        </div>
        <div className="text-xs font-mono text-white/50 group-hover:text-white/80 transition-colors">
            {item.label}
        </div>
    </motion.div>
);

const TimelineNode = ({ job, index }: { job: any, index: number }) => (
    <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6 + (index * 0.2) }}
        className="relative pl-8 pb-12 last:pb-0 group"
    >
        {/* Glow Line & Dot */}
        <div className="absolute left-[7px] top-0 bottom-0 w-[2px] bg-white/10 group-hover:bg-cyan-500/50 transition-colors">
            <div className="absolute top-2 -left-[5px] w-3 h-3 rounded-full bg-[#030014] border-2 border-white/30 group-hover:border-cyan-400 group-hover:shadow-[0_0_10px_rgba(34,211,238,0.8)] transition-all" />
        </div>

        <div className="bg-white/5 border border-white/10 p-5 rounded-lg group-hover:border-cyan-400/30 transition-all">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                <h4 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">{job.role}</h4>
                <span className="text-xs font-mono text-cyan-400/80 bg-cyan-950/30 px-2 py-1 rounded border border-cyan-500/20">
                    {job.period}
                </span>
            </div>
            <div className="text-sm font-mono text-white/50 mb-3">{job.company}</div>
            <p className="text-sm text-gray-400 leading-relaxed border-l-2 border-white/10 pl-4 group-hover:border-cyan-400/50 transition-colors">
                {job.highlight}
            </p>
        </div>
    </motion.div>
);

const TechBadge = ({ label, delay }: { label: string, delay: number }) => (
    <motion.span
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay }}
        className="px-3 py-1.5 bg-white/5 border border-white/10 rounded text-xs font-mono text-gray-300 hover:border-violet-500 hover:text-violet-300 hover:bg-violet-900/20 transition-all cursor-crosshair"
    >
        {label}
    </motion.span>
);

const RecruiterMode = () => {
    const [booted, setBooted] = useState(false);
    const [downloading, setDownloading] = useState(false);

    const handleDownload = () => {
        setDownloading(true);
        setTimeout(() => {
            // Simulated download
            const link = document.createElement('a');
            link.href = '/resume.pdf';
            link.download = 'Abhijit_Behera_Resume.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            setDownloading(false);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-[#030014] text-white overflow-x-hidden selection:bg-cyan-500/30 selection:text-cyan-100">
            <AnimatePresence>
                {!booted && <BootSequence onComplete={() => setBooted(true)} />}
            </AnimatePresence>

            {booted && (
                <>
                    <Header />

                    <main className="pt-32 px-6 md:px-12 max-w-7xl mx-auto pb-24">

                        {/* Summary Section */}
                        <motion.section
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            className="mb-16 max-w-4xl"
                        >
                            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-r from-white via-cyan-100 to-gray-500 bg-clip-text text-transparent">
                                {PROFILE.role}
                            </h1>
                            <p className="text-lg text-gray-400 leading-relaxed max-w-2xl border-l-[3px] border-cyan-500/50 pl-6">
                                {PROFILE.summary}
                            </p>
                        </motion.section>

                        {/* Metrics Grid */}
                        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
                            {METRICS.map((m, i) => <MetricCard key={i} item={m} index={i} />)}
                        </section>

                        {/* Split Content: Timeline & Stack */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24">

                            {/* History (Left) */}
                            <div className="lg:col-span-7">
                                <h3 className="text-xl font-mono text-cyan-400 mb-8 flex items-center gap-3">
                                    <Layers size={20} /> MISSION_TIMELINE
                                </h3>
                                <div>
                                    {HISTORY.map((job, i) => <TimelineNode key={i} job={job} index={i} />)}
                                </div>
                            </div>

                            {/* Tech Stack (Right) */}
                            <div className="lg:col-span-5">
                                <h3 className="text-xl font-mono text-violet-400 mb-8 flex items-center gap-3">
                                    <Cpu size={20} /> TECH_MATRIX
                                </h3>

                                <div className="space-y-8">
                                    <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
                                        <h4 className="text-sm font-mono text-gray-500 mb-4 uppercase tracking-widest">Core Capabilities</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {TECH_STACK.core.map((t, i) => <TechBadge key={t} label={t} delay={0.8 + (i * 0.05)} />)}
                                        </div>
                                    </div>

                                    <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
                                        <h4 className="text-sm font-mono text-gray-500 mb-4 uppercase tracking-widest">Advanced Systems</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {TECH_STACK.advanced.map((t, i) => <TechBadge key={t} label={t} delay={1.0 + (i * 0.05)} />)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer / Extraction */}
                        <footer className="flex justify-center">
                            <motion.button
                                onClick={handleDownload}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className={`relative group w-full max-w-md h-20 bg-white/5 border border-white/20 rounded-full flex items-center justify-center overflow-hidden transition-all ${downloading ? 'border-emerald-500/50' : 'hover:border-cyan-400/50'}`}
                            >
                                {/* Fill Progress */}
                                {downloading && (
                                    <motion.div
                                        layoutId="fill"
                                        className="absolute inset-0 bg-white/10 origin-left"
                                        initial={{ width: 0 }}
                                        animate={{ width: "100%" }}
                                        transition={{ duration: 1.5 }}
                                    />
                                )}

                                <div className="relative z-10 flex items-center gap-3">
                                    {downloading ? (
                                        <>
                                            <CheckCircle className="text-emerald-400 animate-pulse" />
                                            <span className="font-mono text-emerald-400 font-bold tracking-widest">EXTRACTION_COMPLETE</span>
                                        </>
                                    ) : (
                                        <>
                                            <Download className="text-cyan-400 group-hover:animate-bounce" />
                                            <span className="font-mono text-white font-bold tracking-widest group-hover:text-cyan-100">EXTRACT_PERSONNEL_FILE.PDF</span>
                                        </>
                                    )}
                                </div>

                                {/* Hover Glow */}
                                <div className="absolute inset-0 bg-cyan-400/5 opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
                            </motion.button>
                        </footer>

                    </main>
                </>
            )}
        </div>
    );
};

export default RecruiterMode;
