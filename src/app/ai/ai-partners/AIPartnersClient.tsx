'use client';

import { useEffect, useRef } from 'react';

/* ============================================================
   Radoss AI Partners — single-page client component
   Ported 1:1 from the Claude Design Studio bundle.
   Reuses globals.css tokens; styles in ./ai-partners.css
   ============================================================ */

function AIOrbit() {
    return (
        <div className="ai-orbit" aria-hidden="true">
            <div className="ai-orbit__ring" />
            <div className="ai-orbit__ring r2" />
            <div className="ai-orbit__ring r3" />
            <div className="ai-orbit__ring r4" />
            <div className="ai-orbit__core">
                <div className="ai-orbit__core-inner" />
            </div>
            <div className="ai-orbit__sat s1" />
            <div className="ai-orbit__sat s2" />
            <div className="ai-orbit__sat s3" />
            <span className="ai-orbit__label tl">01 · Assessment</span>
            <span className="ai-orbit__label tr">02 · Implementation</span>
            <span className="ai-orbit__label bl">03 · Training</span>
            <span className="ai-orbit__label br">60 days</span>
        </div>
    );
}

function AIHero() {
    return (
        <section className="ai-hero" aria-label="Hero">
            <div className="container">
                <div className="ai-hero__inner">
                    <div className="hero-content">
                        <div className="ai-hero__stat reveal">
                            <span className="dot" /> Now booking · Q3 2026 engagements
                        </div>
                        <h1 className="reveal" data-delay="1">
                            <span className="grey">The AI execution gap is real<span className="text-punctuation">.</span></span>
                            <span className="we-close">We close it<span className="text-punctuation">.</span></span>
                        </h1>
                        <p className="ai-hero__lede reveal" data-delay="2">
                            Enterprise AI investment is at an all-time high, but most of it stalls between strategy and
                            execution. Pilots run in isolation. Operating models stay theoretical. Teams get trained on
                            concepts they cannot apply to the work in front of them.
                        </p>
                        <p className="ai-hero__lede reveal" data-delay="3">
                            <strong>By day 60</strong>, you have real AI in production and a team equipped to keep
                            building on it. Every iteration compounds on the last<span className="text-punctuation">.</span>
                        </p>
                        <div className="ai-hero__actions reveal" data-delay="4">
                            <a className="btn btn-primary" href="#contact">Book a kickoff →</a>
                            <a className="btn btn-secondary" href="#process">See the process</a>
                        </div>
                    </div>
                    <div className="hero-visual reveal" data-delay="2">
                        <AIOrbit />
                    </div>
                </div>
            </div>
        </section>
    );
}

function StatStrip() {
    const stats = [
        { val: '60', label: 'Days to AI in production' },
        { val: '5', label: 'Domains assessed in week one' },
        { val: '1:1', label: 'Forward Deployed Engineer ratio' },
        { val: '100%', label: 'Customised, never templated' },
    ];
    return (
        <section className="stat-strip" aria-label="Engagement stats">
            <div className="container">
                <div className="stat-grid">
                    {stats.map((s, i) => (
                        <div key={s.label} className="reveal" data-delay={i + 1}>
                            <div className="val">
                                {s.val}<span className="punct">.</span>
                            </div>
                            <div className="lbl">{s.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function GapSection() {
    return (
        <section className="gap-section" aria-label="The execution gap">
            <div className="container">
                <div className="gap-grid">
                    <div className="reveal">
                        <h4 className="kicker" style={{ marginBottom: '1.25rem' }}>The Gap</h4>
                        <h2>
                            Strategy decks don&apos;t ship<span className="text-punctuation">.</span><br />
                            <strong>Operating models do<span className="text-punctuation">.</span></strong>
                        </h2>
                    </div>
                    <div className="body reveal" data-delay="1">
                        <p>
                            The companies pulling ahead on AI aren&apos;t the ones with the best decks — they&apos;re
                            the ones who closed the distance between intent and the actual work. Workflows, governance,
                            tech, roles, and skills moved together, not in five separate streams that never quite meet.
                        </p>
                        <p>
                            Radoss AI Partners is the team that closes that distance with you. Forward Deployed
                            Engineers, AI Product Leaders, and our integrated strategy practice — one pod, two months,
                            one operating model in production<span className="text-punctuation">.</span>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

type Step = {
    num: string;
    title: string;
    body: string;
    outcome: string;
    deliverables: string[];
};

function ProcessSection() {
    const steps: Step[] = [
        {
            num: '01',
            title: 'AI Assessment',
            body: 'We identify where AI can have the highest-leverage business impact across five key domains rarely mapped together: Workflows, Governance, Tech and Data, Operating Model, and People and Skills.',
            outcome:
                'You walk away with a comprehensive report, and a prioritised roadmap including the first AI deployments your team will put into production, backed by clear ROI projections.',
            deliverables: [
                'Cross-domain opportunity map',
                'Prioritised AI deployment roadmap',
                'ROI projections & success metrics',
                'Upskilling plan by role',
            ],
        },
        {
            num: '02',
            title: 'AI Implementation',
            body: 'We take the AI operating model design from the assessment and our Forward Deployed Engineers build it alongside your team, inside your existing context.',
            outcome:
                'Every engagement is built to work within your stack, governance posture, and risk appetite — not against them.',
            deliverables: [
                'Governance framework (legal-approved)',
                'Core agents in production',
                'Workflow redesign around AI',
                'Integration, LLM selection & security',
                'Capacity recovery tracking',
            ],
        },
        {
            num: '03',
            title: 'AI Training',
            body: 'AI training runs in parallel with implementation, both informed by the same assessment, so your team builds the skills to harness the new operating model — not generic concepts.',
            outcome: 'Sessions are led by our AI Product Leaders in customised programs.',
            deliverables: [
                'AI strategy for leaders',
                'Agent development workshops',
                'Prompt engineering by role',
                'AI evaluation & quality control',
            ],
        },
    ];
    return (
        <section className="process-section" id="process" aria-label="Our process">
            <div className="container">
                <div className="section-header reveal">
                    <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 300, fontSize: 'clamp(2rem, 3.6vw, 2.75rem)', lineHeight: 1.1, letterSpacing: '-0.02em', maxWidth: '20ch' }}>
                        Three stages<span className="text-punctuation">.</span><br />
                        <strong>One operating model in production<span className="text-punctuation">.</span></strong>
                    </h2>
                    <a href="#timeline">See the 60-day plan →</a>
                </div>
                <div className="process-grid">
                    {steps.map((s, i) => (
                        <article key={s.num} className="process-card reveal" data-delay={i + 1}>
                            <div className="num">
                                {s.num}<span className="punct">.</span>
                            </div>
                            <h3>{s.title}</h3>
                            <p className="body-copy">{s.body}</p>
                            <p className="outcome">{s.outcome}</p>
                            <ul className="deliv">
                                {s.deliverables.map((d) => (
                                    <li key={d}>{d}</li>
                                ))}
                            </ul>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}

function DomainsSection() {
    const domains = [
        { n: '01', t: 'Workflows', d: 'The day-to-day rituals AI can absorb, augment, or accelerate.' },
        { n: '02', t: 'Governance', d: 'Policies and controls your legal team can approve and your board can sign off.' },
        { n: '03', t: 'Tech & Data', d: 'Integration surface, LLM selection, evaluation harness, and security posture.' },
        { n: '04', t: 'Operating Model', d: 'How decision rights, ownership, and roles re-form around AI capability.' },
        { n: '05', t: 'People & Skills', d: 'Who needs to learn what, and how, to keep building once we hand off.' },
    ];
    return (
        <section className="domains-section" id="why" aria-label="The five domains we map">
            <div className="container">
                <div className="section-header reveal">
                    <h2>
                        Five domains, rarely mapped together<span className="text-punctuation">.</span><br />
                        <strong>We map them in week one<span className="text-punctuation">.</span></strong>
                    </h2>
                    <a href="#process">Why this matters →</a>
                </div>
                <div className="domains-grid reveal" data-delay="1">
                    {domains.map((dom) => (
                        <div key={dom.n} className="domain">
                            <span className="n">{dom.n}</span>
                            <div className="t">{dom.t}</div>
                            <div className="d">{dom.d}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

type Chip = string | { t: string; g?: boolean };

function TimelineSection() {
    const cols: { week: string; phase: string; chips: Chip[] }[] = [
        {
            week: 'Week 1–2',
            phase: 'AI Assessment',
            chips: ['Workflow mapping', 'Governance audit', 'Tech & data review', 'Skills inventory'],
        },
        {
            week: 'Week 3–6',
            phase: 'Implementation · Quick wins',
            chips: [
                { t: 'First agents shipped', g: true },
                'Workflow integration',
                'LLM & data wiring',
                'Governance framework approved',
                'Capacity tracking live',
            ],
        },
        {
            week: 'Week 7–8',
            phase: 'Operating model & handoff',
            chips: [
                { t: 'Operating model in production', g: true },
                'Capacity recovery measurement',
                'Team enablement complete',
            ],
        },
    ];
    return (
        <section className="timeline-section" id="timeline" aria-label="60-day plan">
            <div className="container">
                <div className="section-header reveal">
                    <h2>
                        What the first 60 days<br />look like<span className="text-punctuation">.</span>
                    </h2>
                    <a href="#contact">Book a kickoff →</a>
                </div>
                <div className="timeline reveal" data-delay="1">
                    <div className="timeline__rail" />
                    <div className="timeline__progress" />
                    <div className="timeline__cols">
                        {cols.map((c) => (
                            <div className="timeline__col" key={c.week}>
                                <span className="timeline__week">{c.week}</span>
                                <div className="timeline__phase">{c.phase}</div>
                                <div className="timeline__chips">
                                    {c.chips.map((chip, j) => {
                                        const text = typeof chip === 'string' ? chip : chip.t;
                                        const gold = typeof chip === 'object' && chip.g;
                                        return (
                                            <span key={j} className={'timeline__chip' + (gold ? ' gold' : '')}>
                                                {text}
                                            </span>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

function FinalCTA() {
    return (
        <section className="ai-final-cta" id="contact" aria-label="Contact">
            <div className="container">
                <div className="inner">
                    <div className="reveal">
                        <h4 className="kicker" style={{ marginBottom: '1.5rem' }}>Get Started</h4>
                        <h2>
                            Accelerate your path to{' '}
                            <span className="ai-native">AI-native<span className="text-punctuation">.</span></span>
                        </h2>
                        <p>
                            We meet you where you are, and get you where you should be. Tell us about your
                            highest-leverage workflow and we&apos;ll come back with a two-page proposal inside a week
                            <span className="text-punctuation">.</span>
                        </p>
                    </div>
                    <div className="cta-actions reveal" data-delay="1">
                        <a
                            className="btn btn-primary"
                            href="mailto:ai@radoss.agency?subject=Radoss%20AI%20Partners%20enquiry"
                            style={{ padding: '1.1rem 2rem', fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}
                        >
                            Contact Us →
                        </a>
                        <a
                            className="btn btn-secondary"
                            href="#process"
                            style={{ padding: '1.1rem 2rem', fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}
                        >
                            See our process
                        </a>
                        <div className="cta-meta">
                            <a href="mailto:ai@radoss.agency">ai@radoss.agency</a>
                            <a href="tel:+2347033827657">+234 703 382 7657</a>
                            <span className="small">Lagos · Nigeria · Global</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

/* IntersectionObserver-driven reveal — pure CSS would need scroll-triggered animations */
function useRevealOnScroll() {
    const rootRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        const root = rootRef.current;
        if (!root) return;
        const items = root.querySelectorAll<HTMLElement>('.reveal');
        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) {
                        e.target.classList.add('in');
                        io.unobserve(e.target);
                    }
                });
            },
            { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
        );
        items.forEach((el) => io.observe(el));
        return () => io.disconnect();
    }, []);
    return rootRef;
}

export default function AIPartnersClient() {
    const ref = useRevealOnScroll();
    return (
        <div ref={ref}>
            <AIHero />
            <StatStrip />
            <GapSection />
            <ProcessSection />
            <DomainsSection />
            <TimelineSection />
            <FinalCTA />
        </div>
    );
}
