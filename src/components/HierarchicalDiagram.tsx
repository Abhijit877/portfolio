import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';

const HierarchicalDiagram: React.FC = () => {
    const svgRef = useRef<SVGSVGElement>(null);

    // Refs for animation targets
    const presentationGroup = useRef<SVGGElement>(null);
    const logicGroup = useRef<SVGGElement>(null);
    const dataGroup = useRef<SVGGElement>(null);
    const tracersRef = useRef<SVGGElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // 1. Gentle Pulse on Nodes (Ambient)
            const groups = [presentationGroup.current, logicGroup.current, dataGroup.current];
            groups.forEach((group) => {
                gsap.to(group, {
                    filter: "drop-shadow(0 0 15px rgba(34, 211, 238, 0.6))", // Cyan glow
                    duration: 2.5,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut"
                });
            });

            // 2. Tracer Animation (High Speed Data Flow)
            // Create tracers dynamically or animate existing ones along paths
            const tracers = gsap.utils.toArray('.tracer') as SVGElement[];

            tracers.forEach((tracer, i) => {
                // Staggered slightly for natural flow
                const tl = gsap.timeline({
                    repeat: -1,
                    delay: i * 0.4,
                    repeatDelay: 0.5,
                    defaults: { ease: "power1.inOut" } // Linear/Fast
                });

                // Specific paths for top-to-middle and middle-to-bottom
                // We will animate 'y' and 'x' or use motionPath if strictly needed, 
                // but for straight lines simple prop animation is performant.
                // Assuming tracers start at top nodes.

                // Path 1: Client -> API (Vertical + slight angle)
                // From Y=80 to Y=250

                // Step 1: Shoot down to middle
                tl.fromTo(tracer,
                    { attr: { cy: 80, opacity: 0 } },
                    { attr: { cy: 250, opacity: 1 }, duration: 0.4, ease: "power2.in" }
                )
                    // Fade out as it hits middle
                    .to(tracer, { attr: { opacity: 0 }, duration: 0.1 }, ">-0.1");

                // We can add a secondary tracer for the next leg (API -> Data)
                // Or reuse/sequence more complex paths. 
                // Let's make separate tracers for each leg to ensure continuous distinct flow.
            });

            // Connection Leg 1 Tracers (Top to Middle)
            const topTracers = gsap.utils.toArray('.tracer-top');
            topTracers.forEach((t: any) => {
                gsap.fromTo(t,
                    { drawSVG: "0% 0%", opacity: 0 }, // Using stroke-dash trick if drawSVG used, or just converting line to dash
                    {
                        // Manual dash offset implementation for "shooting" line effect
                        strokeDashoffset: -200,
                        duration: 0.8,
                        repeat: -1,
                        ease: "none",
                        repeatDelay: 1
                    }
                );
            });

        }, svgRef);

        return () => ctx.revert();
    }, []);

    // Inline styles for neon glow and aesthetics
    const primaryColor = "#22d3ee"; // Electric Cyan (Tailwind cyan-400)
    const secondaryColor = "#3b82f6"; // Blue
    const bgColor = "#0f172a"; // Dark Slate

    return (
        <div className="w-full h-full flex items-center justify-center p-4">
            <svg
                ref={svgRef}
                viewBox="0 0 600 600"
                className="w-full h-full max-w-[600px] max-h-[600px] overflow-visible"
                style={{ filter: "drop-shadow(0 0 10px rgba(34,211,238,0.2))" }}
            >
                <defs>
                    {/* Glow Filter */}
                    <filter id="neon-glow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>

                    {/* Gradient for Lines */}
                    <linearGradient id="line-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor={primaryColor} stopOpacity="0.1" />
                        <stop offset="50%" stopColor={primaryColor} stopOpacity="0.8" />
                        <stop offset="100%" stopColor={secondaryColor} stopOpacity="0.1" />
                    </linearGradient>

                    {/* Gradient for Tracer Tail */}
                    <linearGradient id="tracer-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor={primaryColor} stopOpacity="0" />
                        <stop offset="100%" stopColor="white" stopOpacity="1" />
                    </linearGradient>
                </defs>

                {/* --- TIER LABELS --- */}
                <g className="labels font-mono text-xs tracking-widest fill-gray-500 opacity-60 pointer-events-none">
                    <text x="50" y="50" textAnchor="start">PRESENTATION</text>
                    <text x="50" y="300" textAnchor="start">LOGIC / API</text>
                    <text x="50" y="550" textAnchor="start">DATA CORE</text>
                </g>

                {/* --- CONNECTING LINES (Static Background) --- */}
                <g className="connectors stroke-cyan-500/20 stroke-1">
                    {/* Top to Middle */}
                    <line x1="150" y1="90" x2="150" y2="280" />
                    <line x1="300" y1="90" x2="300" y2="280" />
                    <line x1="450" y1="90" x2="450" y2="280" />

                    {/* Diagonals for complexity */}
                    <line x1="150" y1="90" x2="300" y2="280" className="opacity-50" />
                    <line x1="450" y1="90" x2="300" y2="280" className="opacity-50" />

                    {/* Middle to Bottom */}
                    <line x1="150" y1="320" x2="150" y2="520" />
                    <line x1="300" y1="320" x2="300" y2="520" />
                    <line x1="450" y1="320" x2="450" y2="520" />

                    {/* Cross connections */}
                    <line x1="150" y1="320" x2="300" y2="520" className="opacity-30" />
                    <line x1="450" y1="320" x2="300" y2="520" className="opacity-30" />
                </g>

                {/* --- TRACERS (Animated) --- */}
                <g ref={tracersRef} className="tracers">
                    {/* 
               We use paths that exactly match the connector lines.
               The 'pathLength' attribute and 'stroke-dasharray' will be animated via GSAP.
               Actually, for simple "shooting" effect, we can just animate a small circle or a short line segment.
            */}

                    {/* Tracer Group 1: Top -> Middle */}
                    {[150, 300, 450].map((x, i) => (
                        <circle
                            key={`t1-${i}`}
                            cx={x}
                            cy="90"
                            r="3"
                            className="tracer fill-white"
                            style={{ filter: "url(#neon-glow)" }}
                        >
                            {/* Animate this circle moving down */}
                            <animate
                                attributeName="cy"
                                from="90"
                                to="280"
                                dur={`${1 + i * 0.2}s`}
                                repeatCount="indefinite"
                                begin={`${i * 0.3}s`}
                            />
                            <animate
                                attributeName="opacity"
                                values="0;1;1;0"
                                keyTimes="0;0.1;0.9;1"
                                dur={`${1 + i * 0.2}s`}
                                repeatCount="indefinite"
                                begin={`${i * 0.3}s`}
                            />
                        </circle>
                    ))}

                    {/* Tracer Group 2: Middle -> Bottom (Staggered) */}
                    {[150, 300, 450].map((x, i) => (
                        <circle
                            key={`t2-${i}`}
                            cx={x}
                            cy="320"
                            r="3"
                            className="tracer fill-cyan-300"
                            style={{ filter: "url(#neon-glow)" }}
                        >
                            <animate
                                attributeName="cy"
                                from="320"
                                to="520"
                                dur={`${1.2 + i * 0.2}s`}
                                repeatCount="indefinite"
                                begin={`${0.5 + i * 0.3}s`}
                            />
                            <animate
                                attributeName="opacity"
                                values="0;1;1;0"
                                keyTimes="0;0.1;0.9;1"
                                dur={`${1.2 + i * 0.2}s`}
                                repeatCount="indefinite"
                                begin={`${0.5 + i * 0.3}s`}
                            />
                        </circle>
                    ))}

                    {/* Diagonal Tracers (Optional for complexity) - Using GSAP for these if needed, but SMIL is native and smoothest for simple translation without main thread blocking if optimized. 
                However, User asked for GSAP. 
                Let's use GSAP in the useEffect for a specific "Bolt" effect that is more complex than simple translation.
            */}
                    <path
                        id="trace-path-1"
                        d="M150 90 L300 280"
                        fill="none"
                        stroke="url(#tracer-gradient)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        className="gsap-tracer opacity-0"
                    />
                    <path
                        id="trace-path-2"
                        d="M450 90 L300 280"
                        fill="none"
                        stroke="url(#tracer-gradient)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        className="gsap-tracer opacity-0"
                    />
                </g>

                {/* --- TIER 1: Presentation (Top) --- */}
                <g ref={presentationGroup} transform="translate(0, 50)">
                    <rect x="100" y="00" width="100" height="40" rx="4" fill="rgba(15, 23, 42, 0.9)" stroke={primaryColor} strokeWidth="1.5" />
                    <text x="150" y="25" textAnchor="middle" fill="white" className="text-[10px] font-bold">WEB APP</text>

                    <rect x="250" y="00" width="100" height="40" rx="4" fill="rgba(15, 23, 42, 0.9)" stroke={primaryColor} strokeWidth="1.5" />
                    <text x="300" y="25" textAnchor="middle" fill="white" className="text-[10px] font-bold">MOBILE</text>

                    <rect x="400" y="00" width="100" height="40" rx="4" fill="rgba(15, 23, 42, 0.9)" stroke={primaryColor} strokeWidth="1.5" />
                    <text x="450" y="25" textAnchor="middle" fill="white" className="text-[10px] font-bold">PORTAL</text>
                </g>

                {/* --- TIER 2: Logic (Middle) --- */}
                <g ref={logicGroup} transform="translate(0, 280)">
                    {/* Central Hub */}
                    <circle cx="300" cy="20" r="30" fill="rgba(15, 23, 42, 0.9)" stroke={secondaryColor} strokeWidth="2" />
                    <text x="300" y="24" textAnchor="middle" fill="white" className="text-[10px] font-bold">API</text>

                    {/* Satellite Nodes */}
                    <rect x="100" y="0" width="100" height="40" rx="4" fill="rgba(15, 23, 42, 0.9)" stroke={secondaryColor} strokeWidth="1.5" />
                    <text x="150" y="25" textAnchor="middle" fill="white" className="text-[10px] font-bold">FUNCTION</text>

                    <rect x="400" y="0" width="100" height="40" rx="4" fill="rgba(15, 23, 42, 0.9)" stroke={secondaryColor} strokeWidth="1.5" />
                    <text x="450" y="25" textAnchor="middle" fill="white" className="text-[10px] font-bold">PLUGIN</text>
                </g>

                {/* --- TIER 3: Data (Bottom) --- */}
                <g ref={dataGroup} transform="translate(0, 520)">
                    <ellipse cx="150" cy="20" rx="40" ry="20" fill="rgba(15, 23, 42, 0.9)" stroke={primaryColor} strokeWidth="1.5" />
                    <text x="150" y="24" textAnchor="middle" fill="white" className="text-[10px] font-bold">SQL</text>

                    <ellipse cx="300" cy="20" rx="40" ry="20" fill="rgba(15, 23, 42, 0.9)" stroke={primaryColor} strokeWidth="1.5" />
                    <text x="300" y="24" textAnchor="middle" fill="white" className="text-[10px] font-bold">DATAVERSE</text>

                    <ellipse cx="450" cy="20" rx="40" ry="20" fill="rgba(15, 23, 42, 0.9)" stroke={primaryColor} strokeWidth="1.5" />
                    <text x="450" y="24" textAnchor="middle" fill="white" className="text-[10px] font-bold">STORAGE</text>
                </g>

            </svg>
        </div>
    );
};

export default HierarchicalDiagram;
