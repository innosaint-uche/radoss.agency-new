"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FlywheelStep {
    id: string;
    label: string;
    fullLabel: string;
    color: string;
    accent: string;
    angle: number;
    desc: string;
    streams: { title: string; items: string[] };
    gates: string[];
    isCenter?: boolean;
}

const STEPS: FlywheelStep[] = [
    {
        id: 'M',
        label: 'MAP',
        fullLabel: 'Market Intelligence & Opportunity Design',
        color: '#4745D6',
        accent: '#fff',
        angle: -90,
        desc: 'We audit your market landscape, identify white-space, and define positioning that creates genuine competitive advantage over incumbents.',
        streams: {
            title: 'Work Streams',
            items: ['Competitive gap analysis', 'ICP definition & segmentation', 'Channel opportunity scoring', 'Brand positioning audit', 'Demand landscape mapping'],
        },
        gates: ['Validated positioning brief signed off', 'Target segments confirmed', 'Go/No-Go market readiness met'],
    },
    {
        id: 'C',
        label: 'CONNECT',
        fullLabel: 'Customer Insight & Journey Architecture',
        color: '#FFD903',
        accent: '#0a0a0a',
        angle: 0,
        desc: 'We design the full customer journey — from first touch to loyal advocate — mapping every micro-decision and emotional trigger that drives conversion.',
        streams: {
            title: 'Work Streams',
            items: ['Full-funnel journey mapping', 'Persona development', 'Touchpoint audit & gap analysis', 'Messaging architecture by stage', 'Content brief per channel'],
        },
        gates: ['Funnel hypothesis documented', 'Messaging hierarchy approved', 'Content blueprint greenlit'],
    },
    {
        id: 'I',
        label: 'IMPLEMENT',
        fullLabel: 'Agile Execution & Precision Activation',
        color: '#1E3A8A',
        accent: '#fff',
        angle: 90,
        desc: 'We ship fast and iterate faster — deploying campaigns, assets, and tech integrations in tight sprint cycles tied to agreed KPIs.',
        streams: {
            title: 'Work Streams',
            items: ['Sprint planning & backlog management', 'Multi-channel campaign activation', 'Creative production & A/B testing', 'Tech & MarTech integration', 'Real-time performance monitoring'],
        },
        gates: ['Launch readiness checklist cleared', 'KPI baseline established', 'Attribution tracking verified live'],
    },
    {
        id: 'A',
        label: 'ANALYSE',
        fullLabel: 'Data Telemetry & Optimisation Loops',
        color: '#111827',
        accent: '#FFD903',
        angle: 180,
        desc: 'We close the loop with rigorous measurement — translating raw data signals into strategic decisions that compound growth each cycle.',
        streams: {
            title: 'Work Streams',
            items: ['Unified analytics dashboard build', 'Multi-touch attribution modelling', 'Monthly performance insight reports', 'Hypothesis creation for next sprint', 'Budget reallocation recommendations'],
        },
        gates: ['Optimisation trigger threshold met', 'Insight report delivered', 'Next-cycle strategy updated'],
    },
];

const GROWTH_STEP: FlywheelStep = {
    id: '◎',
    label: 'GROWTH',
    fullLabel: 'The Radoss Growth Engine',
    color: '#FFD903',
    accent: '#0a0a0a',
    angle: 0,
    isCenter: true,
    desc: 'M-C-I-A is not a linear checklist — it is a compounding flywheel. Every completed cycle feeds richer data back into the next Map phase, creating an accelerating loop of market intelligence, sharper execution, and measurable business growth.',
    streams: {
        title: 'Compounding Effects',
        items: [
            'Each cycle raises baseline performance',
            'Intelligence compounds across sprints',
            'Attribution gets more precise over time',
            'Customer insights deepen with data volume',
            'Cost-per-outcome improves systematically',
        ],
    },
    gates: [
        'Monthly growth review completed',
        'Cycle-over-cycle uplift documented',
        'Strategic roadmap updated for next quarter',
    ],
};

const RADIUS = 33;
const CX = 50;
const CY = 50;

function toXY(angleDeg: number, r = RADIUS) {
    const rad = (angleDeg * Math.PI) / 180;
    return { x: CX + r * Math.cos(rad), y: CY + r * Math.sin(rad) };
}

function labelProps(angleDeg: number): { textAnchor: string; dx: number; dy: number } {
    if (angleDeg === -90) return { textAnchor: 'middle', dx: 0, dy: -11 };
    if (angleDeg === 90) return { textAnchor: 'middle', dx: 0, dy: 12 };
    if (angleDeg === 0) return { textAnchor: 'start', dx: 9, dy: 0.5 };
    if (angleDeg === 180) return { textAnchor: 'end', dx: -9, dy: 0.5 };
    return { textAnchor: 'middle', dx: 0, dy: -11 };
}

function DetailPanel({ step, onClose }: { step: FlywheelStep; onClose: () => void }) {
    return (
        <motion.div
            key={step.id}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '1rem',
                padding: '1.25rem 1.25rem 1rem',
                background: 'var(--flywheel-panel-bg, rgba(10,12,24,0.94))',
                backdropFilter: 'blur(22px)',
                WebkitBackdropFilter: 'blur(22px)',
                border: `1px solid ${step.color}44`,
                boxShadow: `0 0 0 1px ${step.color}18 inset, 0 8px 48px ${step.color}10`,
                zIndex: 10,
                display: 'flex',
                flexDirection: 'column',
                gap: '0.85rem',
                overflowY: 'auto',
            }}
        >
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                <span style={{
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    width: 34, height: 34, borderRadius: '50%', flexShrink: 0,
                    background: step.color, color: step.accent,
                    fontWeight: 800, fontSize: '0.85rem', fontFamily: 'Inter, sans-serif',
                }}>
                    {step.id}
                </span>
                <div style={{ flex: 1 }}>
                    <p style={{ margin: '0 0 0.2rem', maxWidth: 'none', fontSize: '0.58rem', textTransform: 'uppercase', letterSpacing: '0.14em', color: step.color, fontWeight: 700, lineHeight: 1 }}>
                        {step.isCenter ? 'The Engine' : 'Phase'}
                    </p>
                    <h4 style={{ margin: 0, fontSize: '0.86rem', fontWeight: 700, color: 'var(--text-primary, #fff)', lineHeight: 1.2, letterSpacing: '-0.01em', textTransform: 'none' }}>
                        {step.fullLabel}
                    </h4>
                </div>
                <button
                    onClick={(e) => { e.stopPropagation(); onClose(); }}
                    style={{
                        background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '50%', width: 26, height: 26, flexShrink: 0,
                        color: 'var(--text-secondary, rgba(255,255,255,0.45))',
                        cursor: 'pointer', fontSize: '1rem', lineHeight: 1,
                        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0,
                    }}
                    aria-label="Close"
                >×</button>
            </div>

            {/* Description */}
            <p style={{ margin: 0, maxWidth: 'none', fontSize: '0.78rem', lineHeight: 1.68, color: 'var(--text-secondary, rgba(255,255,255,0.62))' }}>
                {step.desc}
            </p>

            {/* Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }}>
                {/* Work Streams */}
                <div style={{
                    padding: '0.7rem 0.75rem',
                    borderRadius: '0.6rem',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.07)',
                }}>
                    <p style={{ margin: '0 0 0.5rem', maxWidth: 'none', fontSize: '0.58rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.35)', fontWeight: 600 }}>
                        {step.streams.title}
                    </p>
                    {step.streams.items.map((m, i) => (
                        <div key={i} style={{ display: 'flex', gap: '0.35rem', fontSize: '0.74rem', color: 'var(--text-primary, #e5e7eb)', lineHeight: 1.4, marginBottom: i < step.streams.items.length - 1 ? '0.38rem' : 0 }}>
                            <span style={{ color: step.color, flexShrink: 0, marginTop: '0.1rem' }}>▸</span>
                            {m}
                        </div>
                    ))}
                </div>

                {/* Decision Gates */}
                <div style={{
                    padding: '0.7rem 0.75rem',
                    borderRadius: '0.6rem',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.07)',
                }}>
                    <p style={{ margin: '0 0 0.5rem', maxWidth: 'none', fontSize: '0.58rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.35)', fontWeight: 600 }}>
                        {step.isCenter ? 'Growth Milestones' : 'Decision Gates'}
                    </p>
                    {step.gates.map((g, i) => (
                        <div key={i} style={{ display: 'flex', gap: '0.35rem', fontSize: '0.74rem', color: 'var(--text-primary, #e5e7eb)', lineHeight: 1.4, marginBottom: i < step.gates.length - 1 ? '0.38rem' : 0 }}>
                            <span style={{ color: '#22c55e', flexShrink: 0, marginTop: '0.1rem' }}>✓</span>
                            {g}
                        </div>
                    ))}
                </div>
            </div>

            {/* Cycle indicator for center panel */}
            {step.isCenter && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.1rem' }}>
                    {['M', 'C', 'I', 'A'].map((l, i) => (
                        <React.Fragment key={l}>
                            <span style={{
                                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                                width: 22, height: 22, borderRadius: '50%', fontSize: '0.6rem', fontWeight: 700,
                                background: STEPS[i].color, color: STEPS[i].accent, fontFamily: 'Inter, sans-serif',
                            }}>{l}</span>
                            {i < 3 && <span style={{ fontSize: '0.55rem', color: 'rgba(255,255,255,0.25)' }}>→</span>}
                        </React.Fragment>
                    ))}
                    <span style={{ fontSize: '0.55rem', color: 'rgba(255,255,255,0.25)' }}>↺</span>
                </div>
            )}
        </motion.div>
    );
}

export default function Flywheel() {
    const [active, setActive] = useState<FlywheelStep | null>(null);
    const [hovered, setHovered] = useState<string | null>(null);

    const toggleActive = (step: FlywheelStep) =>
        setActive(prev => prev?.id === step.id ? null : step);

    return (
        <div style={{ position: 'relative', width: '100%', maxWidth: 480, margin: '0 auto' }}>
            <svg
                viewBox="0 0 100 100"
                style={{ width: '100%', height: 'auto', overflow: 'visible', display: 'block' }}
            >
                {/* Outer ring */}
                <circle cx={CX} cy={CY} r={43} fill="none" stroke="var(--border-subtle, rgba(255,255,255,0.04))" strokeWidth={0.25} />

                {/* Rotating orbit */}
                <motion.circle
                    cx={CX} cy={CY} r={RADIUS}
                    fill="none" stroke="rgba(71,69,214,0.18)" strokeWidth={0.5} strokeDasharray="5 3"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
                    style={{ transformOrigin: `${CX}px ${CY}px` }}
                />

                {/* Connection lines */}
                {STEPS.map((step, i) => {
                    const next = STEPS[(i + 1) % STEPS.length];
                    const a = toXY(step.angle);
                    const b = toXY(next.angle);
                    return <line key={`l${i}`} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="rgba(255,255,255,0.05)" strokeWidth={0.25} />;
                })}

                {/* M-C-I-A Nodes */}
                {STEPS.map((step) => {
                    const { x, y } = toXY(step.angle);
                    const lp = labelProps(step.angle);
                    const isHov = hovered === step.id;
                    const isAct = active?.id === step.id;

                    return (
                        <motion.g
                            key={step.id}
                            style={{ cursor: 'pointer' }}
                            onClick={() => toggleActive(step)}
                            onMouseEnter={() => setHovered(step.id)}
                            onMouseLeave={() => setHovered(null)}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: STEPS.indexOf(step) * 0.12, type: 'spring', stiffness: 220 }}
                            whileHover={{ scale: 1.12 }}
                        >
                            {(isHov || isAct) && (
                                <motion.circle cx={x} cy={y} r={10} fill="none" stroke={step.color} strokeWidth={1.5}
                                    initial={{ opacity: 0 }} animate={{ opacity: 0.4 }} transition={{ duration: 0.2 }} />
                            )}
                            <motion.circle cx={x} cy={y} r={7} fill={step.color}
                                style={{ filter: 'drop-shadow(0 2px 5px rgba(0,0,0,0.4))' }}
                                animate={{ scale: isAct ? 1.18 : 1 }}
                                transition={{ type: 'spring', stiffness: 280 }}
                            />
                            <text x={x} y={y + 0.5} textAnchor="middle" dominantBaseline="middle" fill={step.accent}
                                style={{ fontSize: '4px', fontWeight: 700, fontFamily: 'Inter, sans-serif', pointerEvents: 'none' }}>
                                {step.id}
                            </text>
                            <text x={x + lp.dx} y={y + lp.dy}
                                textAnchor={lp.textAnchor as 'middle' | 'start' | 'end'} dominantBaseline="middle"
                                fill="var(--text-secondary, rgba(255,255,255,0.5))"
                                style={{ fontSize: '2.5px', fontFamily: 'Manrope, sans-serif', textTransform: 'uppercase', letterSpacing: '0.04em', pointerEvents: 'none' }}>
                                {step.label}
                            </text>
                        </motion.g>
                    );
                })}

                {/* Central Growth Core — interactive */}
                <motion.g
                    style={{ cursor: 'pointer' }}
                    onClick={() => toggleActive(GROWTH_STEP)}
                    onMouseEnter={() => setHovered('G')}
                    onMouseLeave={() => setHovered(null)}
                    whileHover={{ scale: 1.08 }}
                >
                    {/* Outer glow on hover */}
                    {(hovered === 'G' || active?.isCenter) && (
                        <motion.circle cx={CX} cy={CY} r={15} fill="none" stroke="#FFD903" strokeWidth={1}
                            initial={{ opacity: 0 }} animate={{ opacity: 0.25 }} transition={{ duration: 0.2 }} />
                    )}
                    <motion.circle cx={CX} cy={CY} r={10} fill="var(--brand-gold, #FFD903)"
                        style={{ filter: 'drop-shadow(0 0 8px rgba(255,217,3,0.3))' }}
                        animate={{ scale: active?.isCenter ? 1.15 : [0.94, 1.04, 0.94] }}
                        transition={active?.isCenter ? { type: 'spring', stiffness: 260 } : { duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    <text x={CX} y={CY - 1.2} textAnchor="middle" dominantBaseline="middle" fill="#0a0a0a"
                        style={{ fontSize: '2.5px', fontWeight: 800, fontFamily: 'Inter, sans-serif', letterSpacing: '0.05em', pointerEvents: 'none' }}>
                        GROWTH
                    </text>
                    <text x={CX} y={CY + 2.8} textAnchor="middle" dominantBaseline="middle" fill="rgba(0,0,0,0.4)"
                        style={{ fontSize: '1.6px', fontFamily: 'Manrope, sans-serif', letterSpacing: '0.06em', pointerEvents: 'none' }}>
                        ENGINE
                    </text>
                </motion.g>
            </svg>

            {/* Hint */}
            <AnimatePresence>
                {!active && (
                    <motion.p key="hint"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        transition={{ delay: 0.7 }}
                        style={{
                            textAlign: 'center', fontSize: '0.68rem', marginTop: '0.5rem',
                            color: 'var(--text-secondary, rgba(255,255,255,0.28))',
                            fontFamily: 'Manrope, sans-serif', letterSpacing: '0.05em',
                        }}
                    >
                        Tap a node or the centre to explore ↑
                    </motion.p>
                )}
            </AnimatePresence>

            {/* Overlay Panel */}
            <AnimatePresence>
                {active && <DetailPanel key={active.id} step={active} onClose={() => setActive(null)} />}
            </AnimatePresence>
        </div>
    );
}
