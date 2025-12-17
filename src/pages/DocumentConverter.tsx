import React, { useState, useEffect } from 'react';
import { FiUploadCloud, FiFileText, FiImage, FiCheck, FiCpu, FiActivity, FiLayers, FiAlertCircle } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import LabLayout from '../components/LabLayout';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

type ConversionType = 'image-to-pdf' | 'html-to-pdf';

/* ----------------------------------------------------------------------------------
 *  Mock Progress Simulator Hooks
 * ---------------------------------------------------------------------------------- */
function useConversionProgress(isConverting: boolean, onComplete: () => void) {
    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState('');

    useEffect(() => {
        if (!isConverting) {
            setProgress(0);
            setStatus('');
            return;
        }

        const stages = [
            { pct: 10, msg: "Initializing engine..." },
            { pct: 30, msg: "Parsing assets..." },
            { pct: 60, msg: "Rendering vector graphics..." },
            { pct: 85, msg: "Compressing output stream..." },
            { pct: 100, msg: "Finalizing document..." }
        ];

        let currentStage = 0;
        const interval = setInterval(() => {
            if (currentStage >= stages.length) {
                clearInterval(interval);
                onComplete();
                return;
            }

            const { pct, msg } = stages[currentStage];
            setProgress(pct);
            setStatus(msg);
            currentStage++;
        }, 600);

        return () => clearInterval(interval);
    }, [isConverting, onComplete]);

    return { progress, status };
}

const DocumentConverter: React.FC = () => {
    const [activeTab, setActiveTab] = useState<ConversionType>('image-to-pdf');
    const [dragActive, setDragActive] = useState(false);
    const [files, setFiles] = useState<File[]>([]);
    const [htmlInput, setHtmlInput] = useState('');
    const [isConverting, setIsConverting] = useState(false);
    const [convertedFileUrl, setConvertedFileUrl] = useState<string | null>(null);

    // --- Actions ---
    const { progress, status } = useConversionProgress(isConverting, () => {
        setIsConverting(false);
        // The actual conversion functions below handle the blob creation separately.
    });

    // --- Image Logic ---
    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const newFiles = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/'));
            setFiles(prev => [...prev, ...newFiles]);
            setConvertedFileUrl(null); // Reset result
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files).filter(f => f.type.startsWith('image/'));
            setFiles(prev => [...prev, ...newFiles]);
            setConvertedFileUrl(null);
        }
    };

    const removeFile = (idx: number) => {
        setFiles(prev => prev.filter((_, i) => i !== idx));
    };

    // --- Conversion Handlers (Reused Logic) ---
    const convertImageToPDF = () => {
        if (files.length === 0) return;
        setIsConverting(true);
        setConvertedFileUrl(null);

        // Defer actual heavy lifting to let UI show loading state
        setTimeout(() => {
            const doc = new jsPDF();
            let processed = 0;

            files.forEach((file, index) => {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const imgData = e.target?.result as string;
                    const imgProps = doc.getImageProperties(imgData);
                    const pdfWidth = doc.internal.pageSize.getWidth();
                    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

                    if (index > 0) doc.addPage();
                    doc.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);

                    processed++;
                    if (processed === files.length) {
                        const blob = doc.output('blob');
                        const url = URL.createObjectURL(blob);
                        setConvertedFileUrl(url); // Ready for download
                    }
                };
                reader.readAsDataURL(file);
            });
        }, 100);
    };

    const convertHTMLToPDF = () => {
        if (!htmlInput) return;
        setIsConverting(true);
        setConvertedFileUrl(null);

        setTimeout(() => {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = htmlInput;
            document.body.appendChild(tempDiv);
            tempDiv.style.padding = '20px';
            tempDiv.style.background = 'white';
            tempDiv.style.color = 'black';
            tempDiv.style.width = '800px';
            tempDiv.style.position = 'absolute';
            tempDiv.style.left = '-9999px';

            html2canvas(tempDiv).then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const doc = new jsPDF('p', 'mm', 'a4');
                const pdfWidth = doc.internal.pageSize.getWidth();
                const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

                doc.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
                const blob = doc.output('blob');
                const url = URL.createObjectURL(blob);
                setConvertedFileUrl(url);
                document.body.removeChild(tempDiv);
            });
        }, 100);
    };

    return (
        <LabLayout
            title="Doc Converter"
            description="Secure Client-Side Document Processing"
            actions={
                <div className="flex gap-2 bg-white/5 rounded-lg p-1 border border-white/10">
                    <button
                        onClick={() => setActiveTab('image-to-pdf')}
                        className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all flex items-center gap-2 ${activeTab === 'image-to-pdf' ? 'bg-indigo-500/20 text-indigo-300 shadow-sm' : 'text-gray-400 hover:text-white'}`}
                    >
                        <FiImage /> IMG to PDF
                    </button>
                    <button
                        onClick={() => setActiveTab('html-to-pdf')}
                        className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all flex items-center gap-2 ${activeTab === 'html-to-pdf' ? 'bg-indigo-500/20 text-indigo-300 shadow-sm' : 'text-gray-400 hover:text-white'}`}
                    >
                        <FiFileText /> HTML to PDF
                    </button>
                </div>
            }
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 lg:p-8 w-full max-w-7xl mx-auto"
        >
            {/* Input / Drop Zone - Left Side 8 Cols */}
            <div className="lg:col-span-8 flex flex-col h-full gap-6 order-2 lg:order-1">

                {/* Drag & Drop Area */}
                {activeTab === 'image-to-pdf' ? (
                    <div
                        className={`
                            min-h-[300px] flex-1 rounded-2xl border-2 border-dashed transition-all relative overflow-hidden group
                            ${dragActive
                                ? 'border-indigo-500 bg-indigo-500/10 scale-[1.01]'
                                : 'border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]'
                            }
                        `}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                    >
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleFileChange}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                        />

                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 transition-opacity">
                            <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 transition-transform duration-500 ${dragActive ? 'scale-110 bg-indigo-500/20' : 'bg-white/5'}`}>
                                <FiUploadCloud className={`w-8 h-8 ${dragActive ? 'text-indigo-400' : 'text-gray-400'}`} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">
                                {dragActive ? "Drop files now" : "Drop images here"}
                            </h3>
                            <p className="text-sm text-gray-500 max-w-xs text-center">
                                Support for JPG, PNG, WEBP. High-fidelity client-side rendering.
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="flex-1 flex flex-col rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden min-h-[400px]">
                        <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-white/[0.02]">
                            <span className="text-xs font-mono text-gray-500">SOURCE CODE</span>
                            <span className="text-xs font-mono text-gray-500">HTML5</span>
                        </div>
                        <textarea
                            value={htmlInput}
                            onChange={(e) => setHtmlInput(e.target.value)}
                            placeholder="<h1>Paste your raw HTML here...</h1>"
                            className="flex-1 w-full p-6 bg-transparent text-sm font-mono text-gray-300 focus:outline-none resize-none placeholder:text-gray-700"
                            spellCheck={false}
                        />
                    </div>
                )}

                {/* File Queue (Images only) */}
                {activeTab === 'image-to-pdf' && files.length > 0 && (
                    <div className="h-32 rounded-xl border border-white/5 bg-white/[0.01] p-4 flex gap-4 overflow-x-auto scrollbar-thin scrollbar-thumb-white/10">
                        {files.map((file, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="relative group shrink-0 w-24 h-24 rounded-lg overflow-hidden border border-white/10"
                            >
                                <img src={URL.createObjectURL(file)} alt="preview" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                                <button
                                    onClick={() => removeFile(idx)}
                                    className="absolute top-1 right-1 p-1 rounded-full bg-red-500/80 text-white opacity-0 group-hover:opacity-100 transition-opacity transform hover:scale-110"
                                >
                                    <FiAlertCircle size={12} />
                                </button>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>

            {/* Sidebar Controls - Right 4 cols */}
            <div className="lg:col-span-4 flex flex-col gap-6 order-1 lg:order-2">
                {/* Action Card */}
                <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-xl flex flex-col">
                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2 mb-6">
                        <FiActivity /> Status Monitor
                    </h3>

                    {/* Progress Bar */}
                    <div className="mb-8">
                        <div className="flex justify-between text-xs mb-2 font-mono">
                            <span className="text-gray-400">{status || 'IDLE'}</span>
                            <span className="text-indigo-400">{progress}%</span>
                        </div>
                        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]"
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                transition={{ ease: "easeOut" }}
                            />
                        </div>
                    </div>

                    {/* Primary Button */}
                    <button
                        onClick={activeTab === 'image-to-pdf' ? convertImageToPDF : convertHTMLToPDF}
                        disabled={isConverting || (activeTab === 'image-to-pdf' ? files.length === 0 : !htmlInput)}
                        className={`
                            py-4 px-6 rounded-xl font-bold flex items-center justify-center gap-3 transition-all
                            ${isConverting
                                ? 'bg-white/5 text-gray-500 cursor-not-allowed border border-white/5'
                                : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg hover:shadow-indigo-500/25 active:scale-95'
                            }
                        `}
                    >
                        {isConverting ? <FiCpu className="animate-spin" /> : <FiCpu />}
                        {isConverting ? 'PROCESSING...' : 'INITIALIZE CONVERSION'}
                    </button>

                    {/* Result Card (Appears after Conversion) */}
                    <AnimatePresence>
                        {convertedFileUrl && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-4 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center"
                            >
                                <div className="text-emerald-400 text-sm font-bold mb-3 flex items-center justify-center gap-2">
                                    <FiCheck /> READY FOR DEPLOYMENT
                                </div>
                                <a
                                    href={convertedFileUrl}
                                    download={`r4-dev-export-${Date.now()}.pdf`}
                                    className="block w-full py-2 bg-emerald-500 hover:bg-emerald-400 text-white rounded-lg font-bold text-sm shadow-lg transition-all"
                                >
                                    DOWNLOAD ARTIFACT
                                </a>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Tech Specs */}
                <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-xl flex-1 hidden lg:flex flex-col">
                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2 mb-4">
                        <FiLayers /> Stack Info
                    </h3>
                    <div className="space-y-3">
                        <div className="flex items-center gap-3 p-3 bg-white/[0.02] rounded-lg border border-white/5">
                            <div className="p-2 bg-orange-500/10 text-orange-400 rounded-md"><FiFileText /></div>
                            <div className="text-xs">
                                <div className="text-gray-300 font-bold">PDF Engine</div>
                                <div className="text-gray-600">Client-Side Generation</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-white/[0.02] rounded-lg border border-white/5">
                            <div className="p-2 bg-blue-500/10 text-blue-400 rounded-md"><FiImage /></div>
                            <div className="text-xs">
                                <div className="text-gray-300 font-bold">Image Processor</div>
                                <div className="text-gray-600">Lossless Compilation</div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 p-3 rounded-lg border border-yellow-500/20 bg-yellow-500/5 text-yellow-200/60 text-xs mt-auto">
                        <FiAlertCircle className="inline mr-1 -mt-0.5" />
                        Files are processed locally in your browser memory. No data is sent to external servers.
                    </div>
                </div>
            </div>
        </LabLayout>
    );
};

export default DocumentConverter;
