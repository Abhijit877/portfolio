import React, { useEffect, useRef } from 'react';
import Matter from 'matter-js';

const GravityCanvas: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const engineRef = useRef<Matter.Engine | null>(null);
    const runnerRef = useRef<Matter.Runner | null>(null);

    useEffect(() => {
        if (!containerRef.current || !canvasRef.current) return;

        // --- 1. Setup Matter.js ---
        const Engine = Matter.Engine;
        const World = Matter.World;
        const Bodies = Matter.Bodies;
        const Mouse = Matter.Mouse;
        const MouseConstraint = Matter.MouseConstraint;
        const Runner = Matter.Runner;
        const Composite = Matter.Composite;

        // Create engine with zero gravity for "floating" effect, 
        // or very low gravity for "drifting"
        const engine = Engine.create();
        engine.world.gravity.y = 0; // Zero gravity
        engine.world.gravity.x = 0;
        engineRef.current = engine;

        const width = containerRef.current.clientWidth;
        const height = containerRef.current.clientHeight;

        // --- 2. Create Bodies (Skills) ---
        const wallOptions = {
            isStatic: true,
            render: { visible: false },
            restitution: 1.0,
            friction: 0
        };

        // Boundaries
        const walls = [
            Bodies.rectangle(width / 2, -50, width, 100, wallOptions), // Top
            Bodies.rectangle(width / 2, height + 50, width, 100, wallOptions), // Bottom
            Bodies.rectangle(width + 50, height / 2, 100, height, wallOptions), // Right
            Bodies.rectangle(-50, height / 2, 100, height, wallOptions), // Left
        ];

        // Tech "Icons" - Chamfered Rectangles
        const skills = [
            { label: 'React', color: '#61DAFB' },
            // { label: 'Next.js', color: '#ffffff' }, // White might blend on white text, but okay for glass
            { label: 'TS', color: '#3178C6' },
            { label: 'Node', color: '#339933' },
            { label: 'Azure', color: '#0078D4' },
            { label: 'Python', color: '#3776AB' },
            { label: 'AWS', color: '#FF9900' },
            { label: 'Docker', color: '#2496ED' },
        ];

        const bodies = skills.map((skill) => {
            const x = Math.random() * (width - 100) + 50;
            const y = Math.random() * (height - 100) + 50;
            // 80-100px

            return Bodies.circle(x, y, 45, { // Using circles for smoother "floating" feel, or chanfered rects
                frictionAir: 0.02,
                restitution: 0.8,
                label: skill.label, // Custom property to store label
                render: {
                    fillStyle: 'transparent', // We'll custom render
                    strokeStyle: skill.color,
                    lineWidth: 2
                },
                plugin: { // Store custom data here to be safe
                    color: skill.color,
                    text: skill.label
                }
            });
        });

        World.add(engine.world, [...walls, ...bodies]);

        // --- 3. Interaction ---
        const mouse = Mouse.create(canvasRef.current);
        const mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: { visible: false }
            }
        });

        World.add(engine.world, mouseConstraint);

        // Keep the mouse in sync with scrolling (optional, if fixed canvas)
        // mouseConstraint.mouse.element.removeEventListener("mousewheel", mouseConstraint.mouse.mousewheel);
        // mouseConstraint.mouse.element.removeEventListener("DOMMouseScroll", mouseConstraint.mouse.mousewheel);

        // --- 4. Custom Render Loop ---
        const runner = Runner.create();
        runnerRef.current = runner;

        // Start the physics engine
        Runner.run(runner, engine);

        const context = canvasRef.current.getContext('2d');
        let animationFrameId: number;

        const renderLoop = () => {
            if (!context || !canvasRef.current) return;

            const ctx = context;
            const w = canvasRef.current.width;
            const h = canvasRef.current.height;

            // Clear
            ctx.clearRect(0, 0, w, h);

            // Render Bodies
            const allBodies = Composite.allBodies(engine.world);

            allBodies.forEach(body => {
                if (body.isStatic) return; // Don't render walls

                const { x, y } = body.position;
                // const angle = body.angle; // Circles don't need angle rotation for visual unless we have an icon

                ctx.save();
                ctx.translate(x, y);
                // ctx.rotate(angle); // If using squares

                // Glassmorphism Style
                // Glow/Shadow
                ctx.shadowColor = body.plugin.color || '#fff';
                ctx.shadowBlur = 15;

                // Fill (Glass)
                ctx.beginPath();
                ctx.arc(0, 0, 45, 0, 2 * Math.PI);
                ctx.fillStyle = 'rgba(255, 255, 255, 0.05)'; // Very subtle fill
                ctx.fill();

                // Border
                ctx.strokeStyle = body.plugin.color || '#fff';
                ctx.lineWidth = 2;
                ctx.stroke();

                // Text
                ctx.shadowBlur = 0; // Reset shadow for clean text
                ctx.fillStyle = '#ffffff';
                ctx.font = 'bold 16px Inter, sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(body.plugin.text || '', 0, 0);

                ctx.restore();
            });

            // Mouse Interaction Visual (Optional: Cursor attraction ring)
            if (mouse.position.x !== 0 && mouse.position.y !== 0) {
                // Subtle highlight at mouse pos
            }

            animationFrameId = requestAnimationFrame(renderLoop);
        };

        renderLoop();

        // Handle Resize
        const handleResize = () => {
            if (!containerRef.current || !canvasRef.current) return;

            canvasRef.current.width = containerRef.current.clientWidth;
            canvasRef.current.height = containerRef.current.clientHeight;

            // Update walls
            const w = containerRef.current.clientWidth;
            const h = containerRef.current.clientHeight;

            Matter.Body.setPosition(walls[0], { x: w / 2, y: -50 });
            Matter.Body.setPosition(walls[1], { x: w / 2, y: h + 50 });
            Matter.Body.setPosition(walls[2], { x: w + 50, y: h / 2 });
            Matter.Body.setPosition(walls[3], { x: -50, y: h / 2 });
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Init size

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
            Runner.stop(runner);
            Engine.clear(engine);
        };
    }, []);

    return (
        <div ref={containerRef} className="w-full h-full relative min-h-[400px]">
            <canvas
                ref={canvasRef}
                className="absolute inset-0 cursor-grab active:cursor-grabbing"
            />
        </div>
    );
};

export default GravityCanvas;
