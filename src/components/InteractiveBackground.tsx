"use client";

import { useEffect, useRef } from 'react';

// Move Particle class outside
class Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    width: number;
    height: number;
    mouseDistance: number;
    type: number; // 0 for primary, 1 for secondary

    constructor(width: number, height: number, mouseDistance: number) {
        this.width = width;
        this.height = height;
        this.mouseDistance = mouseDistance;
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 1;
        // 80% Primary (Gold in dark), 20% Secondary (Blue in dark)
        this.type = Math.random() > 0.8 ? 1 : 0;
    }

    update(mouse: { x: number, y: number }) {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > this.width) this.vx *= -1;
        if (this.y < 0 || this.y > this.height) this.vy *= -1;

        // Mouse Repel/Attract
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.mouseDistance) {
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const force = (this.mouseDistance - distance) / this.mouseDistance;
            const directionX = forceDirectionX * force * 0.05; // Gentle push
            const directionY = forceDirectionY * force * 0.05;
            this.vx -= directionX;
            this.vy -= directionY;
        }
    }

    draw(ctx: CanvasRenderingContext2D, colorPrimary: string, colorSecondary: string) {
        ctx.fillStyle = this.type === 0 ? colorPrimary : colorSecondary;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

export default function InteractiveBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        let particles: Particle[] = [];
        const particleCount = 60;
        const connectionDistance = 150;
        const mouseDistance = 200;

        // Colors
        let primaryColor = 'rgba(255, 217, 3, 0.4)';
        let secondaryColor = 'rgba(71, 69, 214, 0.5)';
        let lineRgb = '255, 217, 3'; // Line color usually follows primary

        const mouse = { x: 0, y: 0 };

        // Function to update color from CSS variable
        const updateColors = () => {
            const style = getComputedStyle(document.documentElement);
            const p1 = style.getPropertyValue('--particle-primary').trim();
            const p2 = style.getPropertyValue('--particle-secondary').trim();

            if (p1) {
                primaryColor = `rgba(${p1}, 0.5)`;
                lineRgb = p1;
            }
            if (p2) {
                secondaryColor = `rgba(${p2}, 0.5)`;
            }
        };

        const init = () => {
            updateColors();
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle(width, height, mouseDistance));
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            particles.forEach((p, index) => {
                p.update(mouse);
                p.draw(ctx, primaryColor, secondaryColor);

                // Connect particles
                for (let j = index; j < particles.length; j++) {
                    const dx = particles[j].x - p.x;
                    const dy = particles[j].y - p.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < connectionDistance) {
                        ctx.beginPath();
                        // Lines follow the primary color usually, or could blend. Keeping it simple: Primary
                        ctx.strokeStyle = `rgba(${lineRgb}, ${0.15 - distance / connectionDistance})`;
                        ctx.lineWidth = 1;
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            });

            requestAnimationFrame(animate);
        };

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            init();
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouse.x = e.x;
            mouse.y = e.y;
        };

        // Observer for theme changes
        const observer = new MutationObserver(() => {
            updateColors();
        });

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['data-theme', 'class', 'style']
        });

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);

        init();
        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            observer.disconnect();
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                zIndex: -1,
                pointerEvents: 'none',
                opacity: 0.6
            }}
        />
    );
}
