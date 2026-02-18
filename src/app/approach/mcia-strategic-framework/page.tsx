import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.css';
import SchemaMarkup from '@/components/SchemaMarkup';
import { Reveal } from '@/components/Reveal';

export const metadata: Metadata = {
    title: 'M-C-I-A Strategic Framework | Map, Connect, Implement, Analyse',
    description:
        'Explore the M-C-I-A strategic framework for complex growth and transformation work: map market reality, connect to customer behavior, implement with precision, and analyse to compound performance.',
    keywords: [
        'M-C-I-A strategic framework',
        'strategic problem solving framework',
        'go-to-market strategy framework',
        'business transformation framework',
        'product strategy framework',
        'customer journey strategy',
        'execution operating model',
        'strategy flywheel',
        'Uchenna Innocent strategy',
    ],
    alternates: {
        canonical: 'https://radoss.agency/approach/mcia-strategic-framework',
    },
    openGraph: {
        title: 'M-C-I-A Strategic Framework | Radoss Agency',
        description:
            'A strategic flywheel for leaders: Map, Connect, Implement, Analyse. Built for better decisions, faster execution, and compounding growth outcomes.',
        url: 'https://radoss.agency/approach/mcia-strategic-framework',
        siteName: 'Radoss Agency',
        locale: 'en_NG',
        type: 'website',
    },
};

type Phase = {
    id: string;
    phase: string;
    title: string;
    subtitle: string;
    strategicQuestions: string[];
    methods: string[];
    outputs: string[];
    decisionGates: string[];
    failureModes: string[];
    summary: string;
};

const quickLinks = [
    { href: '#mcia-glance', label: 'At a Glance' },
    { href: '#mcia-flywheel', label: 'Flywheel' },
    { href: '#phase-map', label: 'Map' },
    { href: '#phase-connect', label: 'Connect' },
    { href: '#phase-implement', label: 'Implement' },
    { href: '#phase-analyse', label: 'Analyse' },
    { href: '#mcia-faq', label: 'FAQ' },
];

const bentoCards = [
    {
        title: 'Map',
        body: 'Map defines strategic reality by sizing opportunities, exposing constraints, and clarifying where to focus first.',
        callout: 'Decision Quality',
        tone: 'blue',
    },
    {
        title: 'Connect',
        body: 'Connect aligns proposition, journey, and trust signals with human behavior across acquisition, conversion, and retention.',
        callout: 'Customer-Market Relevance',
        tone: 'gold',
    },
    {
        title: 'Implement',
        body: 'Implement turns strategy into coordinated delivery by aligning teams, budgets, systems, and governance cadence.',
        callout: 'Execution Precision',
        tone: 'sand',
    },
    {
        title: 'Analyse',
        body: 'Analyse converts performance into strategic intelligence so the next cycle starts with stronger evidence and higher confidence.',
        callout: 'Compounding Performance',
        tone: 'blue',
    },
    {
        title: 'Risk Reduction',
        body: 'Each phase includes explicit decision gates to reduce assumption-led planning and execution waste.',
        callout: 'Guardrail System',
        tone: 'neutral',
    },
    {
        title: 'Cross-Functional Alignment',
        body: 'Marketing, product, operations, and leadership work against one strategic map and one shared outcome narrative.',
        callout: 'Single Source of Strategic Truth',
        tone: 'neutral',
    },
    {
        title: 'Clarity and Discoverability',
        body: 'The framework is written for executive clarity and consistent language across channels, so the story stays coherent from strategy to execution.',
        callout: 'Clarity by Design',
        tone: 'neutral',
    },
    {
        title: 'Start Here',
        body: 'If priorities are unclear, start in Map. If execution is stalled, start in Implement. If growth is flat, start in Analyse.',
        callout: 'Scenario-Led Entry',
        tone: 'neutral',
    },
];

const phases: Phase[] = [
    {
        id: 'phase-map',
        phase: 'Phase 1',
        title: 'Map the Market',
        subtitle: 'Diagnose the playing field before committing resources.',
        strategicQuestions: [
            'What market realities are shaping demand, margin pressure, and competitive behavior today?',
            'Where are the highest-value opportunities and most material risks over the next 6 to 18 months?',
            'What should be prioritized immediately, sequenced later, or explicitly deprioritized?',
        ],
        methods: [
            'PESTEL and structural category diagnostics to reveal macro and policy dynamics.',
            'Competitive intensity and whitespace mapping to isolate differentiable strategic territories.',
            'TAM/SAM/serviceable-opportunity sizing with practical confidence assumptions.',
            'Risk register creation across compliance, capability, data quality, and timeline exposure.',
        ],
        outputs: [
            'A decision-grade market map with priority territories and threat vectors.',
            'A strategic thesis outlining priority bets, guardrails, and sequencing logic.',
            'A go-to-market hypothesis stack connected to measurable outcomes.',
            'A KPI architecture linking business goals to operational leading indicators.',
        ],
        decisionGates: [
            'Priority bets are evidence-backed and owner-assigned.',
            'Risk categories have mitigation owners and escalation triggers.',
            'Success criteria are defined before execution planning begins.',
            'Leadership alignment is explicit on what will not be pursued now.',
        ],
        failureModes: [
            'Analysis remains descriptive without forcing strategic choices.',
            'Internal opinion outranks external evidence in prioritization.',
            'Risk is listed but not operationalized into action paths.',
        ],
        summary:
            'Map is the diagnostic core of M-C-I-A. It creates strategic clarity, prioritization logic, and controlled risk before spend-heavy execution.',
    },
    {
        id: 'phase-connect',
        phase: 'Phase 2',
        title: 'Connect with the Consumer',
        subtitle: 'Translate strategic intent into customer relevance and trust.',
        strategicQuestions: [
            'Which customer jobs, anxieties, and desired outcomes should shape proposition design?',
            'Where does friction break momentum across discovery, conversion, onboarding, and retention?',
            'What value exchange and message architecture improve intent-to-action movement?',
        ],
        methods: [
            'Persona calibration using jobs-to-be-done interviews and behavior-based segmentation.',
            'End-to-end journey diagnostics that capture functional and emotional friction points.',
            'Content and communication architecture mapped to intent stage and trust requirements.',
            'Consent, data value exchange, and service blueprinting for sustainable lifecycle relationships.',
        ],
        outputs: [
            'Audience blueprints with trigger, barrier, and value signal mapping.',
            'Journey intervention matrix ranked by expected impact and effort.',
            'Value proposition experiments by segment and context.',
            'Retention and CLTV improvement targets linked to lifecycle touchpoints.',
        ],
        decisionGates: [
            'Priority segments are behavior-defined, not only demographic-defined.',
            'Value proposition language is testable and differentiated.',
            'Journey friction priorities are connected to concrete KPI movement.',
            'Lifecycle communications align with consent expectations and brand trust.',
        ],
        failureModes: [
            'Messaging over-indexes features while under-serving outcomes customers seek.',
            'Journey work ends at conversion and ignores post-purchase adoption.',
            'Personalization is attempted without clear value exchange and governance.',
        ],
        summary:
            'Connect is the relevance engine of M-C-I-A. It aligns strategy with how real customers decide, adopt, and stay.',
    },
    {
        id: 'phase-implement',
        phase: 'Phase 3',
        title: 'Implement with Impact',
        subtitle: 'Build coordinated execution systems that convert intent into outcomes.',
        strategicQuestions: [
            'What must ship first to create meaningful strategic momentum within one quarter?',
            'How do teams coordinate delivery without slowing decision speed?',
            'Which capabilities are required now, and which can be phased responsibly?',
        ],
        methods: [
            'Quarterly roadmap design with OKRs and explicit ownership by function.',
            'Experiment backlog tied to release planning and measurable learning goals.',
            'MarTech, data, creative, and channel orchestration aligned to outcome metrics.',
            'Governance rituals for dependency control, risk review, and escalation decisions.',
        ],
        outputs: [
            'Execution roadmap with value milestones and review checkpoints.',
            'Performance dashboard connecting activity to strategic KPIs.',
            'Resource and budget map tied to priority bets.',
            'Operational playbook defining cadence, accountability, and quality standards.',
        ],
        decisionGates: [
            'Instrumentation and attribution readiness exist before launch.',
            'Cross-functional dependencies are visible with owners and fallbacks.',
            'Roadmap scope matches realistic capacity and priority logic.',
            'Decision rights are clear across strategy, product, marketing, and analytics.',
        ],
        failureModes: [
            'Execution speed is prioritized while measurement remains underdeveloped.',
            'Multiple teams execute in parallel with no shared cadence.',
            'Scope expands without trade-off discipline, reducing impact density.',
        ],
        summary:
            'Implement is the operational backbone of M-C-I-A. It ensures strategy is executed with precision, accountability, and measurable progress.',
    },
    {
        id: 'phase-analyse',
        phase: 'Phase 4',
        title: 'Analyse, Adapt and Amplify',
        subtitle: 'Turn performance signals into strategic intelligence and scale decisions.',
        strategicQuestions: [
            'Which interventions drove meaningful outcomes, and under what operating conditions?',
            'What underperformed due to proposition, channel, audience, or experience mismatch?',
            'What should be scaled, re-sequenced, redesigned, or stopped immediately?',
        ],
        methods: [
            'Scorecards combining lagging outcomes with leading operational indicators.',
            'Attribution and media-mix diagnostics matched to channel and data maturity.',
            'Continuous experimentation on offers, journeys, creative, and messaging.',
            'Decision reviews that convert findings into budget and priority shifts.',
        ],
        outputs: [
            'Insight report with evidence rating, strategic implications, and confidence level.',
            'Iteration agenda for the next cycle with ranked opportunity actions.',
            'Budget reallocation narrative tied to measured effectiveness.',
            'Board-ready transformation story connecting initiatives to business movement.',
        ],
        decisionGates: [
            'Performance interpretation includes context and causality, not only reporting.',
            'Learning is converted into reusable strategic and operating playbooks.',
            'Resource shifts are evidence-backed and time-bounded.',
            'Insights are fed directly into the next Map phase for compounding advantage.',
        ],
        failureModes: [
            'Teams report performance but do not isolate root causes.',
            'Wins are celebrated but not codified into repeatable systems.',
            'Low-yield initiatives continue due to sunk-cost bias.',
        ],
        summary:
            'Analyse is the compounding layer of M-C-I-A. It transforms data into better strategic judgment, faster iteration, and stronger allocation quality.',
    },
];

const roleLenses = [
    {
        role: 'Marketing Leaders',
        points: [
            'Map clarifies category economics, channel saturation, and budget efficiency context.',
            'Connect improves value communication by intent stage and lifecycle state.',
            'Implement aligns creative, media, CRM, and analytics into one execution cadence.',
            'Analyse drives channel reallocation and scalable growth playbooks.',
        ],
    },
    {
        role: 'Product Teams',
        points: [
            'Map prioritizes product opportunities by demand signal and competitive gap.',
            'Connect surfaces adoption friction and jobs-to-be-done realities.',
            'Implement coordinates roadmap execution with measurable activation goals.',
            'Analyse informs feature iteration and retention strategy using behavioral evidence.',
        ],
    },
    {
        role: 'Business Transformation Programs',
        points: [
            'Map audits internal capability, process constraints, and governance gaps.',
            'Connect aligns employee and stakeholder value exchange for adoption.',
            'Implement orchestrates phased rollout with risk-controlled delivery.',
            'Analyse quantifies operational impact and strengthens board-level visibility.',
        ],
    },
    {
        role: 'Founder and Executive Offices',
        points: [
            'Map improves strategic capital allocation and priority focus under uncertainty.',
            'Connect ensures propositions stay relevant to market reality and trust signals.',
            'Implement creates accountability architecture across teams and timelines.',
            'Analyse improves forecast confidence through disciplined learning loops.',
        ],
    },
];

const scenarios = [
    {
        challenge: 'Rising CAC and slowing acquisition efficiency',
        start: 'Start in Map, then Connect',
        action:
            'Reassess market-channel economics, refine segment proposition, then run focused implementation tests and analyse contribution quality.',
    },
    {
        challenge: 'High traffic but weak conversion momentum',
        start: 'Start in Connect',
        action:
            'Diagnose journey friction and message-intent mismatch, implement conversion architecture fixes, then analyse step-level movement.',
    },
    {
        challenge: 'Strong acquisition with poor retention',
        start: 'Start in Connect and Analyse',
        action:
            'Investigate onboarding and lifecycle relevance, implement retention interventions, then measure cohort-level impact over time.',
    },
    {
        challenge: 'Execution drag across product, marketing, and operations',
        start: 'Start in Implement',
        action:
            'Reset ownership model, decision cadence, and dependency visibility; analyse throughput and quality indicators for continuous correction.',
    },
];

const caseSnapshots = [
    {
        title: 'SaaS Opportunity Prioritization',
        detail:
            'The team used Map to identify a regulatory-safe vertical with faster adoption readiness. Connect reframed positioning around confidence and implementation speed. Implement narrowed roadmap scope to one high-value onboarding experience. Analyse validated the strongest conversion drivers and informed the next expansion phase.',
        impact: 'Impact Focus: Better prioritization quality, stronger conversion relevance, cleaner execution scope.',
    },
    {
        title: 'D2C Lifecycle Reset',
        detail:
            'Connect uncovered a post-purchase trust gap affecting repeat behavior. Implement introduced lifecycle messaging tied to usage outcomes rather than promotions. Analyse isolated the communication sequence with strongest retention response and informed broader lifecycle redesign.',
        impact: 'Impact Focus: Improved retention mechanics, reduced lifecycle friction, higher CLTV orientation.',
    },
    {
        title: 'Transformation Delivery Stabilization',
        detail:
            'Map surfaced process bottlenecks and ownership ambiguity in a multi-team transformation program. Implement introduced phased governance with explicit decision thresholds. Analyse connected operational improvements to strategic outcomes, improving leadership confidence in the program roadmap.',
        impact: 'Impact Focus: Lower delivery variance, higher accountability, stronger strategic visibility.',
    },
];

const faqs = [
    {
        q: 'What is the M-C-I-A framework?',
        a: 'M-C-I-A is a strategic flywheel composed of four linked phases: Map, Connect, Implement, and Analyse. It helps organizations reduce decision risk, improve execution quality, and build compounding performance over repeated cycles.',
    },
    {
        q: 'How is M-C-I-A different from a traditional strategy process?',
        a: 'Traditional strategy is often linear and presentation-heavy. M-C-I-A is cyclical and operational. It links diagnosis, relevance, execution, and learning so strategy continuously improves through evidence rather than assumptions.',
    },
    {
        q: 'Who should use M-C-I-A?',
        a: 'M-C-I-A is designed for leadership teams, growth teams, product teams, and business transformation programs that need a clear operating model for complex decisions and coordinated delivery.',
    },
    {
        q: 'Is M-C-I-A only for marketing?',
        a: 'No. It works across marketing, product, operations, and transformation. The framework is built to unify cross-functional strategic work, not isolate one department.',
    },
    {
        q: 'How long does one M-C-I-A cycle take?',
        a: 'Cycle duration depends on problem complexity and capability maturity. Many teams run focused 8 to 12 week cycles with quarterly strategic recalibration and monthly decision reviews.',
    },
    {
        q: 'What are the deliverables from Map?',
        a: 'Map usually delivers a market thesis, opportunity priorities, risk register, and measurement architecture. These outputs define where to focus and what success should look like.',
    },
    {
        q: 'What are the deliverables from Connect?',
        a: 'Connect produces audience blueprints, journey diagnostics, value proposition tests, and lifecycle communication architecture that align strategy with customer behavior.',
    },
    {
        q: 'What are the deliverables from Implement?',
        a: 'Implement delivers a roadmap, ownership model, execution dashboard, and governance cadence that convert strategy into accountable delivery.',
    },
    {
        q: 'What are the deliverables from Analyse?',
        a: 'Analyse delivers insight reports, iteration agenda, budget reallocation logic, and strategic recommendations for the next cycle.',
    },
    {
        q: 'How does M-C-I-A reduce strategic risk?',
        a: 'Every phase includes decision gates and guardrails. This forces evidence-based choices before resource commitment and limits expensive execution drift.',
    },
    {
        q: 'How does M-C-I-A improve ROI?',
        a: 'M-C-I-A improves ROI by increasing allocation quality, reducing low-yield activity, and accelerating iteration around the interventions that measurably work.',
    },
    {
        q: 'How does M-C-I-A support knowledge graph and AI visibility?',
        a: 'The framework uses consistent entities, semantic structure, and schema markup that help search engines and AI systems connect topics, people, and organizational authority with higher confidence.',
    },
    {
        q: 'How does Uchenna Innocent apply M-C-I-A in client work?',
        a: 'Uchenna applies M-C-I-A as a practical operating model: diagnose strategic reality, align customer relevance, orchestrate execution, and compound learning for sustained growth outcomes.',
    },
];

const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': 'https://radoss.agency/approach/mcia-strategic-framework#faq',
    mainEntity: faqs.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: {
            '@type': 'Answer',
            text: item.a,
        },
    })),
};

const strategyFrameworkSchema = {
    '@context': 'https://schema.org',
    '@graph': [
        {
            '@type': 'WebPage',
            '@id': 'https://radoss.agency/approach/mcia-strategic-framework#webpage',
            url: 'https://radoss.agency/approach/mcia-strategic-framework',
            name: 'M-C-I-A Strategic Framework',
            description:
                'A strategic flywheel for complex growth and transformation: Map, Connect, Implement, Analyse.',
            isPartOf: {
                '@id': 'https://radoss.agency/#website',
            },
            about: [
                { '@id': 'https://radoss.agency/#mcia-framework' },
                { '@id': 'https://radoss.agency/#uchenna-innocent' },
                { '@id': 'https://radoss.agency/#organization' },
            ],
            breadcrumb: {
                '@id': 'https://radoss.agency/approach/mcia-strategic-framework#breadcrumbs',
            },
        },
        {
            '@type': 'DefinedTermSet',
            '@id': 'https://radoss.agency/#mcia-framework',
            name: 'M-C-I-A Framework',
            description: 'Map, Connect, Implement, Analyse strategic operating model.',
            hasDefinedTerm: [
                { '@type': 'DefinedTerm', 'name': 'Map' },
                { '@type': 'DefinedTerm', 'name': 'Connect' },
                { '@type': 'DefinedTerm', 'name': 'Implement' },
                { '@type': 'DefinedTerm', 'name': 'Analyse' },
            ],
        },
        {
            '@type': 'BreadcrumbList',
            '@id': 'https://radoss.agency/approach/mcia-strategic-framework#breadcrumbs',
            itemListElement: [
                {
                    '@type': 'ListItem',
                    position: 1,
                    name: 'Home',
                    item: 'https://radoss.agency/',
                },
                {
                    '@type': 'ListItem',
                    position: 2,
                    name: 'Approach',
                    item: 'https://radoss.agency/approach',
                },
                {
                    '@type': 'ListItem',
                    position: 3,
                    name: 'M-C-I-A Strategic Framework',
                    item: 'https://radoss.agency/approach/mcia-strategic-framework',
                },
            ],
        },
    ],
};

export default function MciaStrategicFrameworkPage() {
    return (
        <main className={styles.main}>
            <SchemaMarkup data={strategyFrameworkSchema} />
            <SchemaMarkup data={faqSchema} />

            <section className={styles.hero}>
                <div className="container">
                    <Reveal>
                        <p className={styles.eyebrow}>Strategic Framework</p>
                    </Reveal>
                    <Reveal delay={0.08}>
                        <h1 className={styles.title}>The M-C-I-A Strategic Framework</h1>
                    </Reveal>
                    <Reveal delay={0.16}>
                        <p className={styles.subtitle}>
                            M-C-I-A is our strategy operating system for complex growth decisions and business
                            transformation. It links market intelligence, customer relevance, execution precision,
                            and performance analytics into one continuous flywheel that compounds decision quality.
                        </p>
                    </Reveal>
                    <Reveal delay={0.24}>
                        <p className={styles.subtitleSecondary}>
                            This framework is built for leaders who need clarity under uncertainty, coordinated
                            cross-functional execution, and measurable progress that scales with every cycle.
                        </p>
                    </Reveal>
                    <Reveal delay={0.32}>
                        <div className={styles.heroActions}>
                            <Link href="/contact" className="btn btn-primary">
                                Book Strategy Session
                            </Link>
                            <Link href="#mcia-glance" className="btn">
                                Explore Framework
                            </Link>
                        </div>
                    </Reveal>
                </div>
            </section>

            <section className={styles.quickNavWrap}>
                <div className="container">
                    <div className={styles.quickNav}>
                        {quickLinks.map((item) => (
                            <a key={item.href} href={item.href} className={styles.quickNavLink}>
                                {item.label}
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            <section id="mcia-glance" className={styles.sectionAnchor}>
                <div className="container">
                    <Reveal>
                        <div className={styles.sectionHeader}>
                            <p className={styles.sectionEyebrow}>Framework Snapshot</p>
                            <h2>M-C-I-A at a Glance</h2>
                            <p>
                                A practical strategic flywheel where each phase answers a distinct class of questions,
                                produces clear outputs, and supplies the next phase with higher-quality inputs.
                            </p>
                        </div>
                    </Reveal>
                    <div className={styles.bentoGrid}>
                        {bentoCards.map((card, index) => (
                            <Reveal key={card.title} delay={index * 0.05} width="100%">
                                <article className={`${styles.bentoCard} ${styles[card.tone]}`}>
                                    <h3>{card.title}</h3>
                                    <p>{card.body}</p>
                                    <span className={styles.cardCallout}>{card.callout}</span>
                                </article>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            <section id="mcia-flywheel" className={styles.sectionAnchor}>
                <div className="container">
                    <Reveal>
                        <div className={styles.flywheelBox}>
                            <p className={styles.sectionEyebrow}>Compounding Loop</p>
                            <h2>The M-C-I-A Flywheel</h2>
                            <p>
                                M-C-I-A is not a linear checklist. Analyse feeds the next Map phase with validated
                                learning, which sharpens strategy, accelerates execution confidence, and improves
                                capital allocation quality over time.
                            </p>
                            <div className={styles.flywheelSteps}>
                                <span>Map</span>
                                <span>Connect</span>
                                <span>Implement</span>
                                <span>Analyse</span>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>

            {phases.map((phase) => (
                <section key={phase.id} id={phase.id} className={styles.sectionAnchor}>
                    <div className="container">
                        <Reveal>
                            <div className={styles.phaseHeader}>
                                <p className={styles.phaseTag}>{phase.phase}</p>
                                <h2>{phase.title}</h2>
                                <p>{phase.subtitle}</p>
                            </div>
                        </Reveal>
                        <div className={styles.phaseGrid}>
                            <article className={styles.phaseCard}>
                                <h3>Strategic Questions</h3>
                                <ul>
                                    {phase.strategicQuestions.map((item) => (
                                        <li key={item}>{item}</li>
                                    ))}
                                </ul>
                            </article>
                            <article className={styles.phaseCard}>
                                <h3>Methods</h3>
                                <ul>
                                    {phase.methods.map((item) => (
                                        <li key={item}>{item}</li>
                                    ))}
                                </ul>
                            </article>
                            <article className={styles.phaseCard}>
                                <h3>Outputs</h3>
                                <ul>
                                    {phase.outputs.map((item) => (
                                        <li key={item}>{item}</li>
                                    ))}
                                </ul>
                            </article>
                            <article className={styles.phaseCard}>
                                <h3>Decision Gates</h3>
                                <ul>
                                    {phase.decisionGates.map((item) => (
                                        <li key={item}>{item}</li>
                                    ))}
                                </ul>
                            </article>
                            <article className={styles.phaseCard}>
                                <h3>Failure Modes to Prevent</h3>
                                <ul>
                                    {phase.failureModes.map((item) => (
                                        <li key={item}>{item}</li>
                                    ))}
                                </ul>
                            </article>
                            <article className={`${styles.phaseCard} ${styles.phaseSummary}`}>
                                <h3>{phase.title} Summary</h3>
                                <p>{phase.summary}</p>
                            </article>
                        </div>
                    </div>
                </section>
            ))}

            <section id="mcia-lenses" className={styles.sectionAnchor}>
                <div className="container">
                    <Reveal>
                        <div className={styles.sectionHeader}>
                            <p className={styles.sectionEyebrow}>Role Lenses</p>
                            <h2>M-C-I-A Through Strategic Domains</h2>
                            <p>
                                Same framework, different operational lens. This allows marketing, product,
                                transformation, and executive teams to work from a unified strategy language while
                                solving domain-specific problems.
                            </p>
                        </div>
                    </Reveal>
                    <div className={styles.lensGrid}>
                        {roleLenses.map((lens, index) => (
                            <Reveal key={lens.role} delay={index * 0.06} width="100%">
                                <article className={styles.lensCard}>
                                    <h3>{lens.role}</h3>
                                    <ul>
                                        {lens.points.map((point) => (
                                            <li key={point}>{point}</li>
                                        ))}
                                    </ul>
                                </article>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            <section id="mcia-scenarios" className={styles.sectionAnchor}>
                <div className="container">
                    <Reveal>
                        <div className={styles.sectionHeader}>
                            <p className={styles.sectionEyebrow}>Problem-Oriented Entry</p>
                            <h2>Where to Start Based on Your Situation</h2>
                            <p>
                                M-C-I-A can start from different entry points depending on your current challenge,
                                then loops into the full cycle for compounding gains.
                            </p>
                        </div>
                    </Reveal>
                    <div className={styles.scenarioGrid}>
                        {scenarios.map((scenario, index) => (
                            <Reveal key={scenario.challenge} delay={index * 0.06} width="100%">
                                <article className={styles.scenarioCard}>
                                    <h3>{scenario.challenge}</h3>
                                    <p className={styles.scenarioStart}>{scenario.start}</p>
                                    <p>{scenario.action}</p>
                                </article>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            <section id="mcia-cases" className={styles.sectionAnchor}>
                <div className="container">
                    <Reveal>
                        <div className={styles.sectionHeader}>
                            <p className={styles.sectionEyebrow}>Case Perspective</p>
                            <h2>Case Snapshots by Phase</h2>
                            <p>
                                These snapshots show how M-C-I-A works as an integrated sequence in real strategic
                                contexts, from diagnosis to validated adaptation.
                            </p>
                        </div>
                    </Reveal>
                    <div className={styles.caseGrid}>
                        {caseSnapshots.map((item, index) => (
                            <Reveal key={item.title} delay={index * 0.08} width="100%">
                                <article className={styles.caseCard}>
                                    <h3>{item.title}</h3>
                                    <p>{item.detail}</p>
                                    <p className={styles.caseImpact}>{item.impact}</p>
                                </article>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            <section id="mcia-faq" className={styles.sectionAnchor}>
                <div className="container">
                    <Reveal>
                        <div className={styles.sectionHeader}>
                            <p className={styles.sectionEyebrow}>Key Questions</p>
                            <h2>Frequently Asked Questions</h2>
                            <p>
                                Clear answers for leaders evaluating fit. Each response starts with direct clarity,
                                then adds the deeper context teams need to execute well.
                            </p>
                        </div>
                    </Reveal>
                    <div className={styles.faqList}>
                        {faqs.map((item, index) => (
                            <Reveal key={item.q} delay={index * 0.03} width="100%">
                                <details className={styles.faqItem}>
                                    <summary>{item.q}</summary>
                                    <p>{item.a}</p>
                                </details>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            <section id="mcia-entity" className={styles.sectionAnchor}>
                <div className="container">
                    <Reveal>
                        <article className={styles.entityCard}>
                            <div className={styles.entityMedia}>
                                <span className={styles.entityBadge}>Framework Steward</span>
                                <Image
                                    src="https://res.cloudinary.com/innosaint/image/upload/v1759535536/Uchenna-Innocent_headshot_nzenth.jpg"
                                    alt="Uchenna Innocent"
                                    width={720}
                                    height={900}
                                    sizes="(max-width: 900px) 100vw, 33vw"
                                    unoptimized
                                    className={styles.entityPhoto}
                                />
                            </div>
                            <div className={styles.entityMeta}>
                                <h2>Built and Led by Uchenna Innocent</h2>
                                <p>
                                    M-C-I-A is not a slide deck. It is a practical operating system for strategy work that
                                    has to survive real constraints: market volatility, team capacity, tooling gaps, and
                                    accountability pressure.
                                </p>
                                <p>
                                    Uchenna uses M-C-I-A to create decision clarity, design an execution system your teams
                                    can run, and build measurable learning loops that compound performance over time.
                                </p>
                                <div className={styles.proofRow} aria-label="Expertise highlights">
                                    <span className={styles.proofChip}>Digital Transformation</span>
                                    <span className={styles.proofChip}>Growth Strategy</span>
                                    <span className={styles.proofChip}>MarTech Architecture</span>
                                    <span className={styles.proofChip}>Execution Operating Model</span>
                                    <span className={styles.proofChip}>Measurement + Learning Loops</span>
                                </div>
                                <div className={styles.entityActions}>
                                    <Link href="/work" className="btn">
                                        See Outcomes
                                    </Link>
                                    <Link href="/contact" className="btn btn-primary">
                                        Start a Sprint
                                    </Link>
                                </div>
                            </div>
                        </article>
                    </Reveal>
                </div>
            </section>

            <section className={styles.ctaWrap}>
                <div className="container">
                    <Reveal>
                        <div className={styles.ctaCard}>
                            <h2>Start Your M-C-I-A Strategy Sprint</h2>
                            <p>
                                If growth is slowing, execution is fragmented, or strategic confidence is low, start
                                with a focused MCIA diagnostic sprint to identify the highest-value priorities and
                                define the implementation path.
                            </p>
                            <div className={styles.heroActions}>
                                <Link href="/contact" className="btn btn-primary">
                                    Schedule Diagnostic
                                </Link>
                                <Link href="/approach" className="btn">
                                    Return to Approach
                                </Link>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>
        </main>
    );
}
