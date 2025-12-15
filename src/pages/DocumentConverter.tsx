import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiDownload, FiCpu, FiUploadCloud, FiFile, FiCheckCircle, FiLoader } from 'react-icons/fi';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

const DocumentConverter: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'image' | 'html'>('image');
    const [isConverting, setIsConverting] = useState(false);
    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState<string>('');
    const [uploadedImage, setUploadedImage] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [htmlInput, setHtmlInput] = useState<string>('<h1>Hello World</h1>\n<p>This is a sample document.</p>');
    const htmlPreviewRef = useRef<HTMLDivElement>(null);

    const handleImageUpload = (file: File) => {
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setUploadedImage(event.target?.result as string);
                setStatus('Image loaded ready for conversion');
            };
            reader.readAsDataURL(file);
        }
    };

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) handleImageUpload(file);
    };

    const onDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const onDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const onDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files?.[0];
        if (file) handleImageUpload(file);
    };

    const convertImageToPDF = async () => {
        if (!uploadedImage) return;

        setIsConverting(true);
        setStatus('Reading image data...');
        setProgress(10);

        try {
            const img = new Image();
            img.src = uploadedImage;
            await new Promise((resolve) => { img.onload = resolve; });

            setStatus('Calculating dimensions...');
            setProgress(30);
            await new Promise(r => setTimeout(r, 500)); // Fake delay for UX

            const doc = new jsPDF();
            const imgProps = doc.getImageProperties(uploadedImage);
            const pdfWidth = doc.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

            setStatus('Generating pages...');
            setProgress(60);

            doc.addImage(uploadedImage, 'JPEG', 0, 0, pdfWidth, pdfHeight);

            setStatus('Finalizing PDF...');
            setProgress(90);
            await new Promise(r => setTimeout(r, 400));

            doc.save('converted-image.pdf');

            setStatus('Download ready!');
            setProgress(100);
        } catch (error) {
            console.error(error);
            setStatus('Error occurred');
        } finally {
            setTimeout(() => {
                setIsConverting(false);
                setProgress(0);
                setStatus('');
            }, 3000);
        }
    };

    const convertHtmlToPDF = async () => {
        if (!htmlPreviewRef.current) return;

        setIsConverting(true);
        setStatus('Parsing DOM structure...');
        setProgress(20);

        try {
            const canvas = await html2canvas(htmlPreviewRef.current, {
                scale: 2,
                logging: false,
                useCORS: true
            });

            setStatus('Rendering to canvas...');
            setProgress(50);

            const imgData = canvas.toDataURL('image/png');
            const doc = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = doc.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

            setStatus('Constructing PDF file...');
            setProgress(80);

            doc.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            doc.save('converted-document.pdf');

            setStatus('Download complete!');
            setProgress(100);
        } catch (error) {
            console.error(error);
            setStatus('Conversion failed');
        } finally {
            setTimeout(() => {
                setIsConverting(false);
                setProgress(0);
                setStatus('');
            }, 3000);
        }
    };

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 md:px-8 bg-background-primary transition-colors duration-300">
            <div className="container mx-auto max-w-5xl">
                <header className="mb-12 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-primary/10 text-accent-primary text-sm font-semibold mb-6 border border-accent-primary/20"
                    >
                        <FiCpu className="animate-pulse" /> Engineering Lab #2
                    </motion.div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-text-primary via-accent-primary to-text-secondary">
                        Universal Document Converter
                    </h1>
                    <p className="text-text-secondary max-w-2xl mx-auto text-lg leading-relaxed">
                        Professional-grade client-side processing engine. Convert raw binaries and HTML into standardized PDF formats securely in your browser.
                    </p>
                </header>

                <div className="bg-background-secondary/50 backdrop-blur-xl border border-line rounded-3xl overflow-hidden shadow-2xl relative">
                    {/* Tabs */}
                    <div className="flex border-b border-line bg-background-primary/30">
                        <button
                            onClick={() => setActiveTab('image')}
                            className={`flex-1 py-6 text-center font-semibold transition-all relative ${activeTab === 'image' ? 'text-accent-primary' : 'text-text-secondary hover:text-text-primary'}`}
                        >
                            Image to PDF
                            {activeTab === 'image' && (
                                <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 w-full h-1 bg-accent-primary" />
                            )}
                        </button>
                        <button
                            onClick={() => setActiveTab('html')}
                            className={`flex-1 py-6 text-center font-semibold transition-all relative ${activeTab === 'html' ? 'text-accent-primary' : 'text-text-secondary hover:text-text-primary'}`}
                        >
                            HTML to PDF
                            {activeTab === 'html' && (
                                <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 w-full h-1 bg-accent-primary" />
                            )}
                        </button>
                    </div>

                    <div className="p-8 md:p-12">
                        <AnimatePresence mode="wait">
                            {activeTab === 'image' ? (
                                <motion.div
                                    key="image"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.3 }}
                                    className="space-y-8"
                                >
                                    {!uploadedImage ? (
                                        <div
                                            onDragOver={onDragOver}
                                            onDragLeave={onDragLeave}
                                            onDrop={onDrop}
                                            className={`border-2 border-dashed rounded-2xl p-16 text-center transition-all duration-300 cursor-pointer group ${isDragging
                                                ? 'border-accent-primary bg-accent-primary/10 scale-[1.02]'
                                                : 'border-line hover:border-accent-secondary hover:bg-background-primary/50'
                                                }`}
                                        >
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={onFileChange}
                                                className="hidden"
                                                id="image-upload"
                                            />
                                            <label htmlFor="image-upload" className="cursor-pointer flex flex-col items-center gap-6 pointer-events-none">
                                                <div className={`p-6 rounded-full transition-colors duration-300 ${isDragging ? 'bg-accent-primary text-white' : 'bg-background-primary text-text-secondary group-hover:text-accent-secondary'}`}>
                                                    <FiUploadCloud className="text-5xl" />
                                                </div>
                                                <div className="space-y-2">
                                                    <p className="text-xl font-bold text-text-primary">
                                                        {isDragging ? 'Drop to Upload' : 'Click or Drag Image Here'}
                                                    </p>
                                                    <p className="text-sm text-text-secondary">
                                                        Supports High-Res JPEG, PNG, WEBP
                                                    </p>
                                                </div>
                                            </label>
                                        </div>
                                    ) : (
                                        <div className="grid md:grid-cols-2 gap-8 items-center bg-background-primary/50 p-6 rounded-2xl border border-line">
                                            <div className="relative group">
                                                <img src={uploadedImage} alt="Preview" className="w-full h-64 object-contain rounded-lg bg-black/5 dark:bg-white/5" />
                                                <button
                                                    onClick={() => setUploadedImage(null)}
                                                    className="absolute top-2 right-2 p-2 bg-red-500/90 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    ×
                                                </button>
                                            </div>

                                            <div className="space-y-6">
                                                <div className="space-y-2">
                                                    <h3 className="text-xl font-bold text-text-primary flex items-center gap-2">
                                                        <FiCheckCircle className="text-green-500" /> Ready to Convert
                                                    </h3>
                                                    <p className="text-text-secondary text-sm">
                                                        Image loaded into memory buffer. Click below to process.
                                                    </p>
                                                </div>

                                                <motion.button
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    onClick={convertImageToPDF}
                                                    disabled={isConverting}
                                                    className="w-full py-4 bg-accent-primary text-white rounded-xl font-bold hover:shadow-[0_0_20px_-5px_var(--accent-primary)] transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden relative"
                                                >
                                                    {isConverting ? (
                                                        <>Processing...</>
                                                    ) : (
                                                        <>
                                                            <FiDownload className="text-xl animate-bounce" />
                                                            Generate PDF Document
                                                        </>
                                                    )}
                                                </motion.button>
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="html"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="space-y-6"
                                >
                                    <div className="grid md:grid-cols-2 gap-6 h-[500px]">
                                        <div className="flex flex-col space-y-2">
                                            <label className="text-sm font-semibold text-text-secondary uppercase tracking-wider">HTML Input Scope</label>
                                            <textarea
                                                value={htmlInput}
                                                onChange={(e) => setHtmlInput(e.target.value)}
                                                className="flex-1 p-4 bg-background-primary border border-line rounded-xl font-mono text-sm leading-relaxed focus:border-accent-primary focus:ring-1 focus:ring-accent-primary focus:outline-none resize-none transition-all placeholder:text-text-secondary/30"
                                                placeholder="<div>Your HTML here...</div>"
                                            />
                                        </div>
                                        <div className="flex flex-col space-y-2">
                                            <label className="text-sm font-semibold text-text-secondary uppercase tracking-wider">DOM Preview Render</label>
                                            <div
                                                ref={htmlPreviewRef}
                                                className="flex-1 p-6 bg-white text-black rounded-xl overflow-auto border border-line prose prose-sm max-w-none shadow-inner"
                                                dangerouslySetInnerHTML={{ __html: htmlInput }}
                                            />
                                        </div>
                                    </div>
                                    <motion.button
                                        whileHover={{ scale: 1.01 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={convertHtmlToPDF}
                                        disabled={isConverting}
                                        className="w-full py-4 bg-gradient-to-r from-accent-primary to-accent-secondary text-white rounded-xl font-bold shadow-lg hover:shadow-accent-primary/25 hover:shadow-xl transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                                    >
                                        {isConverting ? <FiLoader className="animate-spin" /> : <FiFile />}
                                        {isConverting ? 'Canvas Engine Running...' : 'Render DOM to PDF'}
                                    </motion.button>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Progress Overlay */}
                        <AnimatePresence>
                            {isConverting && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 20 }}
                                    className="mt-8 bg-background-primary border border-line rounded-xl p-4 shadow-lg"
                                >
                                    <div className="flex justify-between items-center text-sm font-medium mb-2">
                                        <span className="text-accent-primary flex items-center gap-2">
                                            <FiLoader className="animate-spin" /> {status}
                                        </span>
                                        <span className="text-text-primary">{progress}%</span>
                                    </div>
                                    <div className="h-1.5 bg-background-secondary rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-accent-primary"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${progress}%` }}
                                            transition={{ type: "spring", stiffness: 100, damping: 20 }}
                                        />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DocumentConverter;
