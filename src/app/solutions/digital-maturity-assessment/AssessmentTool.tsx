"use client";

import { useState } from 'react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import styles from './page.module.css';
import { SolutionCTA } from '../../../components/SolutionCTA';

// Types
type Question = {
    dimension: string;
    text: string;
    options: { text: string; score: number; level: string }[];
};

type Result = {
    dimensionResults: Record<string, { score: number; level: string }>;
    overallMaturityLevel: string;
    overallMaturityScore: number;
};

type LeadFormData = {
    name: string;
    company: string;
    email: string;
};

type Recommendation = {
    headline: string;
    details: string;
    personalizedFor?: string;
};

type RecommendationLevel = {
    _default?: Recommendation[];
    [key: string]: Recommendation[] | undefined;
};

type RecommendationDimension = {
    [level: string]: RecommendationLevel;
};

type RecommendationsData = {
    [dimension: string]: RecommendationDimension;
};

// Data (Sourced from user input)
const questions: Question[] = [
    { dimension: "Customer", text: "How does your organization understand and engage with customer needs and feedback?", options: [{ text: "Customer interactions are ad-hoc; feedback is rarely collected or acted upon.", score: 1, level: "Initial" }, { text: "Some customer feedback is collected (e.g., surveys), but it's not systematically used to improve experiences.", score: 2, level: "Managed" }, { text: "We have defined processes for collecting customer feedback across multiple channels and use it to inform some decisions.", score: 3, level: "Defined" }, { text: "Customer data and feedback are systematically analyzed to understand behavior and improve experiences; personalization is being trialed.", score: 4, level: "Quantitatively Managed" }, { text: "We proactively anticipate customer needs using advanced analytics and AI, delivering highly personalized and predictive experiences across all touchpoints.", score: 5, level: "Optimizing" }] },
    { dimension: "Customer", text: "How consistent and integrated is the customer experience across different channels (e.g., website, mobile app, social media, physical stores)?", options: [{ text: "Channels operate in silos with inconsistent information and experience.", score: 1, level: "Initial" }, { text: "Basic information is consistent across some channels, but the experience is still fragmented.", score: 2, level: "Managed" }, { text: "Key customer channels are connected, offering a relatively consistent experience and information flow.", score: 3, level: "Defined" }, { text: "Customers experience a seamless and consistent journey across most digital and physical channels, with integrated data.", score: 4, level: "Quantitatively Managed" }, { text: "We offer a fully unified, omnichannel experience where customers can switch channels effortlessly with complete context preservation and proactive support.", score: 5, level: "Optimizing" }] },
    { dimension: "Customer", text: "To what extent does your organization use customer data to personalize products, services, or communications?", options: [{ text: "Customer data is not used for personalization; all offerings are generic.", score: 1, level: "Initial" }, { text: "Minimal personalization based on basic segmentation (e.g., demographics) is attempted occasionally.", score: 2, level: "Managed" }, { text: "Personalization is applied to some customer communications or website content based on past interactions or stated preferences.", score: 3, level: "Defined" }, { text: "We systematically use customer data for targeted marketing, product recommendations, and personalized service interactions.", score: 4, level: "Quantitatively Managed" }, { text: "Hyper-personalization is driven by real-time data and AI, dynamically tailoring every aspect of the customer journey and offerings.", score: 5, level: "Optimizing" }] },
    { dimension: "Strategy", text: "To what extent is a digital vision defined and integrated into the overall business strategy?", options: [{ text: "No clear digital vision exists, or it's entirely separate from the business strategy.", score: 1, level: "Initial" }, { text: "A basic digital vision is discussed, but it's not formally documented or consistently aligned with business goals.", score: 2, level: "Managed" }, { text: "A formal digital strategy is in place, aligned with overall business objectives, and communicated within the organization.", score: 3, level: "Defined" }, { text: "Our digital strategy is a core component of the business strategy, driving key initiatives and resource allocation, with clear KPIs to measure success.", score: 4, level: "Quantitatively Managed" }, { text: "Digital is at the heart of our business strategy, constantly evolving to drive innovation, new business models, and sustained competitive advantage.", score: 5, level: "Optimizing" }] },
    { dimension: "Strategy", text: "How does your organization approach digital innovation and adapt to market changes?", options: [{ text: "We are reactive to market changes and rarely explore new digital opportunities.", score: 1, level: "Initial" }, { text: "Some experimentation with digital tools or initiatives occurs, often in isolated projects.", score: 2, level: "Managed" }, { text: "We have dedicated processes for exploring and testing new digital innovations, with some successful pilots.", score: 3, level: "Defined" }, { text: "A culture of continuous innovation is fostered, with resources allocated for R&D and scaling successful digital initiatives. We monitor market trends systematically.", score: 4, level: "Quantitatively Managed" }, { text: "We are leaders in digital innovation, shaping market trends, rapidly adopting disruptive technologies, and fostering an agile, experimental culture across the organization.", score: 5, level: "Optimizing" }] },
    { dimension: "Strategy", text: "How is funding allocated for digital initiatives, and how is their ROI measured?", options: [{ text: "Funding for digital is ad-hoc, minimal, and ROI is not tracked.", score: 1, level: "Initial" }, { text: "Digital initiatives are funded on a case-by-case basis with limited budgets; ROI measurement is informal or absent.", score: 2, level: "Managed" }, { text: "There is a defined budget for digital projects, and basic ROI metrics (e.g., cost savings, website traffic) are tracked for some.", score: 3, level: "Defined" }, { text: "Strategic funding is allocated to a portfolio of digital initiatives, with clear business cases and comprehensive ROI analysis (including intangible benefits).", score: 4, level: "Quantitatively Managed" }, { text: "Investment in digital is continuous and agile, driven by strategic priorities and value realization, with sophisticated models for measuring short-term and long-term ROI.", score: 5, level: "Optimizing" }] },
    { dimension: "Technology", text: "How would you describe your organization's technology infrastructure and its ability to support digital initiatives?", options: [{ text: "Our technology is outdated, fragmented, and hinders digital progress.", score: 1, level: "Initial" }, { text: "We have some modern technology components, but integration is a challenge, and legacy systems still dominate.", score: 2, level: "Managed" }, { text: "Our core technology infrastructure is largely modernized and supports current digital needs, though scalability can be an issue.", score: 3, level: "Defined" }, { text: "We have a scalable, flexible, and secure technology platform (e.g., cloud-based) that enables rapid development and deployment of digital solutions. Data is well-managed.", score: 4, level: "Quantitatively Managed" }, { text: "Our technology architecture is cutting-edge, highly agile, and AI-driven, enabling us to pioneer new digital capabilities and business models with speed and resilience.", score: 5, level: "Optimizing" }] },
    { dimension: "Technology", text: "How effectively does your organization utilize data analytics and business intelligence?", options: [{ text: "Data is siloed and rarely used for decision-making; reporting is manual and basic.", score: 1, level: "Initial" }, { text: "Basic reporting tools are used in some departments, but data quality and accessibility are limited.", score: 2, level: "Managed" }, { text: "We have established data governance and use BI tools for regular reporting and some descriptive analytics across the organization.", score: 3, level: "Defined" }, { text: "Advanced analytics and data visualization are used to generate insights, predict trends, and inform strategic decisions. Data is a key asset.", score: 4, level: "Quantitatively Managed" }, { text: "AI and machine learning are extensively used for predictive and prescriptive analytics, driving automated decision-making and continuous optimization across all business functions.", score: 5, level: "Optimizing" }] },
    { dimension: "Technology", text: "What is your organization's approach to cybersecurity and data privacy?", options: [{ text: "Cybersecurity and data privacy are largely overlooked or addressed only when issues arise.", score: 1, level: "Initial" }, { text: "Basic security measures (e.g., antivirus, firewalls) are in place, with some awareness of data privacy regulations.", score: 2, level: "Managed" }, { text: "A formal cybersecurity policy and data privacy program are implemented, with regular employee training and compliance checks.", score: 3, level: "Defined" }, { text: "Proactive cybersecurity measures, including threat intelligence and incident response plans, are in place. Data privacy is embedded in system design (Privacy by Design).", score: 4, level: "Quantitatively Managed" }, { text: "We employ advanced, AI-driven cybersecurity defenses and a comprehensive, adaptive data governance framework, ensuring trust and resilience as a top priority.", score: 5, level: "Optimizing" }] },
    { dimension: "Operations", text: "How digitized and automated are your core operational processes?", options: [{ text: "Most processes are manual, paper-based, and inefficient.", score: 1, level: "Initial" }, { text: "Some key processes have basic digitization (e.g., spreadsheets, simple software), but many manual steps remain.", score: 2, level: "Managed" }, { text: "Core operational processes are largely digitized, with some automation implemented to improve efficiency.", score: 3, level: "Defined" }, { text: "End-to-end operational processes are highly digitized and automated, leveraging integrated systems and data for real-time monitoring and control.", score: 4, level: "Quantitatively Managed" }, { text: "Our operations are fully intelligent and adaptive, leveraging AI, IoT, and advanced automation for self-optimization, predictive maintenance, and superior efficiency.", score: 5, level: "Optimizing" }] },
    { dimension: "Operations", text: "How agile and responsive are your operations to changing business needs or market demands?", options: [{ text: "Operations are rigid and slow to adapt to any changes.", score: 1, level: "Initial" }, { text: "We can make operational adjustments, but it's a slow and resource-intensive process.", score: 2, level: "Managed" }, { text: "Operations are designed to be reasonably flexible, allowing for planned adjustments to meet evolving demands.", score: 3, level: "Defined" }, { text: "Our operations are highly agile, capable of rapid reconfiguration and scaling based on real-time data and predictive insights.", score: 4, level: "Quantitatively Managed" }, { text: "We have a dynamic and resilient operational model that can autonomously adapt to disruptions and seize new opportunities with exceptional speed and efficiency.", score: 5, level: "Optimizing" }] },
    { dimension: "Operations", text: "How effectively does your organization collaborate internally (across departments) and externally (with partners/suppliers) using digital tools?", options: [{ text: "Collaboration is primarily face-to-face or via email, with limited use of shared digital tools.", score: 1, level: "Initial" }, { text: "Some digital collaboration tools (e.g., shared drives, basic project management software) are used within individual teams or for specific projects.", score: 2, level: "Managed" }, { text: "Standardized digital collaboration platforms are adopted across the organization, improving internal communication and information sharing.", score: 3, level: "Defined" }, { text: "Integrated digital platforms facilitate seamless collaboration both internally and with key external partners, improving efficiency and transparency.", score: 4, level: "Quantitatively Managed" }, { text: "We operate within a fully connected digital ecosystem, enabling real-time, dynamic collaboration with a wide network of internal and external stakeholders.", score: 5, level: "Optimizing" }] },
    { dimension: "Organisation & Culture", text: "How developed are the digital skills and capabilities within your workforce?", options: [{ text: "Digital skills are scarce, and there's little focus on digital training or talent development.", score: 1, level: "Initial" }, { text: "Basic digital literacy exists, but specialized digital skills are limited to a few individuals or departments.", score: 2, level: "Managed" }, { text: "We have a program for developing digital skills, and key roles possess necessary digital competencies.", score: 3, level: "Defined" }, { text: "Digital skills are widespread, with ongoing training and development programs. We actively recruit and retain digital talent.", score: 4, level: "Quantitatively Managed" }, { text: "Our workforce is highly digitally fluent, with a culture of continuous learning and adaptation. We are a magnet for top digital talent and foster cross-functional digital expertise.", score: 5, level: "Optimizing" }] },
    { dimension: "Organisation & Culture", text: "How does your organizational culture support digital transformation and change?", options: [{ text: "There is significant resistance to change, and a risk-averse culture that hinders digital adoption.", score: 1, level: "Initial" }, { text: "Digital initiatives face some cultural barriers; change is managed on a project-by-project basis.", score: 2, level: "Managed" }, { text: "Leadership actively promotes a digital-first mindset, and there are formal change management processes to support digital transformation.", score: 3, level: "Defined" }, { text: "Our culture embraces change, collaboration, and data-driven decision-making. Employees are empowered to experiment and innovate digitally.", score: 4, level: "Quantitatively Managed" }, { text: "We have a deeply embedded agile, innovative, and customer-centric culture where digital is second nature. Continuous improvement and learning are core values.", score: 5, level: "Optimizing" }] },
    { dimension: "Organisation & Culture", text: "How is leadership driving and championing the digital transformation agenda?", options: [{ text: "Leadership shows little interest or involvement in digital transformation.", score: 1, level: "Initial" }, { text: "Some leaders support digital initiatives, but there is no unified vision or strong top-down drive.", score: 2, level: "Managed" }, { text: "Leadership has articulated a clear vision for digital transformation and actively communicates its importance.", score: 3, level: "Defined" }, { text: "Leaders consistently champion digital transformation, allocate resources, remove roadblocks, and lead by example in adopting digital practices.", score: 4, level: "Quantitatively Managed" }, { text: "Digital transformation is a core leadership competency; leaders inspire innovation, foster a digital-native mindset throughout the organization, and continuously adapt the strategy.", score: 5, level: "Optimizing" }] }
];

const maturityLevels: Record<number, string> = { 1: "Initial", 2: "Managed", 3: "Defined", 4: "Quantitatively Managed", 5: "Optimizing" };

const maturityDescriptions: Record<string, string> = {
    "Initial": "Processes are unpredictable, poorly controlled, and reactive. Digital efforts are sporadic, if any, and there's a general lack of awareness or strategy regarding digital transformation. Challenges are often met with traditional, non-digital solutions.",
    "Managed": "Processes are characterized for projects and often reactive. Some digital initiatives may exist in pockets, but they are not integrated or standardized across the organization. There's a growing awareness of digital, but efforts are siloed and lack a cohesive strategy.",
    "Defined": "Processes are characterized for the organization and proactive. A formal digital strategy is in place and communicated. Core processes are increasingly digitized, and there's a conscious effort to build digital capabilities and a digital-aware culture.",
    "Quantitatively Managed": "Processes are measured and controlled using data. Digital initiatives are strategically managed and aligned with business objectives. Data analytics drive decision-making, and there's a focus on optimizing digital performance and customer experiences.",
    "Optimizing": "Focus on process improvement and optimization. Digital is ingrained in the organization's DNA, driving continuous innovation, agility, and new value creation. The organization is a leader in leveraging digital technologies and adapting to market changes proactively."
};

const dimensionsOrder = ["Customer", "Strategy", "Technology", "Operations", "Organisation & Culture"];

const recommendations: RecommendationsData = {
    "Customer": { "Initial": { _default: [{ headline: "Map Basic Customer Journey", details: "Begin by outlining the fundamental steps a customer takes when interacting with your business. This helps identify key touchpoints where digital improvements can be made, even simple ones like ensuring contact information is easily found online." }, { headline: "Implement Simple Feedback Collection", details: "Start collecting customer feedback through straightforward methods like a basic online survey after a purchase or interaction, or a suggestion box. The goal is to begin listening, even if the analysis is manual at first." }], Retail: [{ headline: "Retail: Improve In-Store Basics", details: "For retail businesses, consider how basic digital tools can enhance the physical store experience.", personalizedFor: "Retail" }], Small: [{ headline: "Small Businesses: Leverage Free Tools", details: "For small businesses with limited budgets, utilize free or low-cost tools like Google My Business.", personalizedFor: "Small Business" }] }, "Managed": { _default: [{ headline: "Centralize Customer Data", details: "Move towards a centralized system, even a simple CRM or a well-organized spreadsheet, to store and manage customer information." }, { headline: "Analyze Existing Feedback", details: "Review any customer feedback you've collected to identify common pain points." }], B2C: [{ headline: "B2C: Explore Email Marketing", details: "For B2C businesses, consider using basic email marketing tools.", personalizedFor: "B2C Business" }] }, "Defined": { _default: [{ headline: "Implement a Comprehensive CRM", details: "Invest in and implement a Customer Relationship Management (CRM) system." }, { headline: "Develop Customer Personas", details: "Create detailed customer personas representing your different customer segments." }], Healthcare: [{ headline: "Healthcare: Ensure Compliance", details: "For healthcare organizations, ensure all patient data collection is compliant.", personalizedFor: "Healthcare" }], Finance: [{ headline: "Finance: Secure Customer Portals", details: "For financial institutions, focus on providing secure and user-friendly online portals.", personalizedFor: "Finance" }] }, "Quantitatively Managed": { _default: [{ headline: "Utilize Advanced Analytics for Personalization", details: "Leverage customer data and advanced analytics for personalization." }, { headline: "Implement A/B Testing", details: "Systematically use A/B testing for different customer experiences." }], Large: [{ headline: "Large Enterprises: Invest in a CDP", details: "For large enterprises, consider investing in a Customer Data Platform (CDP).", personalizedFor: "Large Enterprise" }] }, "Optimizing": { _default: [{ headline: "Invest in AI for Predictive Personalization", details: "Employ AI and machine learning tools for advanced predictive analytics." }, { headline: "Foster Customer Co-Creation", details: "Create platforms and processes that involve customers in co-creation." }] } },
    "Strategy": { "Initial": { _default: [{ headline: "Initiate Leadership Discussions", details: "Start conversations among the leadership team about digital trends." }] }, "Managed": { _default: [{ headline: "Formally Document a Basic Digital Vision", details: "Translate discussions into a documented basic digital vision." }] }, "Defined": { _default: [{ headline: "Develop a Comprehensive Digital Roadmap", details: "Create a formal digital transformation roadmap with clear objectives." }], Manufacturing: [{ headline: "Manufacturing: Align with Industry 4.0", details: "For manufacturing, align digital strategy with Industry 4.0 concepts.", personalizedFor: "Manufacturing" }] }, "Quantitatively Managed": { _default: [{ headline: "Establish a Digital Innovation Fund & Process", details: "Create a dedicated fund for digital innovations." }] }, "Optimizing": { _default: [{ headline: "Embed Digital into All Strategic Planning", details: "Ensure digital thinking is integral to all strategic planning." }] } },
    "Technology": { "Initial": { _default: [{ headline: "Audit Existing Tech Infrastructure", details: "Conduct a thorough inventory of your current technology." }], Small: [{ headline: "Small Businesses: Cost-Effective Cloud", details: "Prioritize cost-effective cloud solutions.", personalizedFor: "Small Business" }] }, "Managed": { _default: [{ headline: "Plan Modernization of Legacy Systems", details: "Develop a phased plan to modernize legacy systems." }] }, "Defined": { _default: [{ headline: "Migrate Key Apps to the Cloud", details: "Strategically migrate key applications to the cloud." }], Finance: [{ headline: "Finance: Regulatory Tech Compliance", details: "Ensure tech choices comply with financial regulations.", personalizedFor: "Finance" }] }, "Quantitatively Managed": { _default: [{ headline: "Adopt an API-First Approach", details: "Design systems with an API-first approach for seamless integration." }] }, "Optimizing": { _default: [{ headline: "Build a Modular, Microservices Architecture", details: "Transition towards a modular, microservices-based architecture." }] } },
    "Operations": { "Initial": { _default: [{ headline: "Identify & Map Inefficient Manual Processes", details: "Begin by identifying inefficient manual processes." }] }, "Managed": { _default: [{ headline: "Invest in Departmental Software Solutions", details: "Implement software to digitize core functions within departments." }] }, "Defined": { _default: [{ headline: "Implement Integrated Enterprise Systems", details: "Consider integrated systems like ERP or SCM." }], B2B: [{ headline: "B2B: Digital Tools for Supply Chain & Partners", details: "Explore digital tools for supply chain and partner collaboration.", personalizedFor: "B2B Business" }] }, "Quantitatively Managed": { _default: [{ headline: "Implement End-to-End Process Automation", details: "Move towards end-to-end automation of key operational processes." }] }, "Optimizing": { _default: [{ headline: "Create 'Digital Twins' of Operations", details: "Consider 'digital twins' for complex operations." }] } },
    "Organisation & Culture": { "Initial": { _default: [{ headline: "Raise Digital Awareness", details: "Start by raising awareness about the importance of digital change." }] }, "Managed": { _default: [{ headline: "Develop a Formal Digital Skills Plan", details: "Create a formal plan for digital skills development." }] }, "Defined": { _default: [{ headline: "Dedicate Budget for Digital Upskilling", details: "Establish a dedicated budget for digital training." }], Medium: [{ headline: "Medium Businesses: Form a Digital Team", details: "Consider a dedicated digital team or steering committee.", personalizedFor: "Medium Business" }] }, "Quantitatively Managed": { _default: [{ headline: "Create Digital Career Paths & Retain Talent", details: "Develop clear career paths for digital roles." }] }, "Optimizing": { _default: [{ headline: "Cultivate Deep Digital Fluency & Learning Culture", details: "Foster a deeply embedded culture of continuous learning." }] } }
};

export default function DigitalMaturityAssessment() {
    // State
    const [started, setStarted] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<(number | null)[]>(new Array(questions.length).fill(null));
    const [showResults, setShowResults] = useState(false);
    const [businessProfile, setBusinessProfile] = useState({ industry: "", scale: "", type: "" });
    const [results, setResults] = useState<Result | null>(null);
    const [leadForm, setLeadForm] = useState<LeadFormData>({ name: "", company: "", email: "" });
    const [leadCaptureOpen, setLeadCaptureOpen] = useState(false);
    const [leadCaptured, setLeadCaptured] = useState(false);
    const [leadSubmitting, setLeadSubmitting] = useState(false);
    const [leadError, setLeadError] = useState("");
    const [leadNotice, setLeadNotice] = useState("");

    // Handlers
    const handleStart = () => {
        if (!businessProfile.industry || !businessProfile.scale || !businessProfile.type) {
            alert("Please fill in all business profile fields to start.");
            return;
        }
        setStarted(true);
    };

    const handleOptionSelect = (score: number) => {
        const newAnswers = [...answers];
        newAnswers[currentQuestionIndex] = score;
        setAnswers(newAnswers);

        // Auto-advance
        if (currentQuestionIndex < questions.length - 1) {
            setTimeout(() => {
                setCurrentQuestionIndex(prev => prev + 1);
            }, 300);
        }
    };

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        } else {
            calculateResults();
        }
    };

    const handlePrev = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prev => prev - 1);
        }
    };

    const calculateResults = () => {
        const dimensionScores: Record<string, number> = {};
        const dimensionCounts: Record<string, number> = {};

        questions.forEach((q, index) => {
            if (answers[index] !== null) {
                dimensionScores[q.dimension] = (dimensionScores[q.dimension] || 0) + (answers[index] as number);
                dimensionCounts[q.dimension] = (dimensionCounts[q.dimension] || 0) + 1;
            }
        });

        const dimensionResults: Record<string, { score: number; level: string }> = {};
        let totalOverallScore = 0;
        let totalDimensions = 0;

        for (const dim in dimensionScores) {
            const averageScore = Math.round(dimensionScores[dim] / dimensionCounts[dim]);
            dimensionResults[dim] = { score: averageScore, level: maturityLevels[averageScore] || "Unknown" };
            totalOverallScore += averageScore;
            totalDimensions++;
        }

        const overallMaturityScore = totalDimensions > 0 ? Math.round(totalOverallScore / totalDimensions) : 1;
        const overallMaturityLevel = maturityLevels[overallMaturityScore] || "Unknown";

        setResults({ dimensionResults, overallMaturityLevel, overallMaturityScore });
        setShowResults(true);
    };

    const getPersonalizedRecommendations = (dimension: string, level: string): Recommendation[] => {
        const combinedRecs: Recommendation[] = [];
        const dimensionRecs = recommendations[dimension]?.[level];
        if (!dimensionRecs) return [{ headline: "General Advice", details: "No specific recommendations available. Focus on foundational digital practices." }];

        if (dimensionRecs._default) {
            combinedRecs.push(...dimensionRecs._default);
        }

        Object.keys(dimensionRecs).forEach(key => {
            if (key !== '_default') {
                if (businessProfile.industry.toLowerCase().includes(key.toLowerCase()) ||
                    businessProfile.scale.toLowerCase().includes(key.toLowerCase()) ||
                    businessProfile.type.toLowerCase().includes(key.toLowerCase())) {
                    combinedRecs.push(...dimensionRecs[key]);
                }
            }
        });

        // Deduplicate
        const uniqueRecs: Recommendation[] = [];
        const seenHeadlines = new Set();
        for (const rec of combinedRecs) {
            if (!seenHeadlines.has(rec.headline)) {
                uniqueRecs.push(rec);
                seenHeadlines.add(rec.headline);
            }
        }
        return uniqueRecs.length > 0 ? uniqueRecs : [{ headline: "General Advice", details: "Focus on foundational digital practices." }];
    };

    const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

    const handleDownloadRequest = () => {
        setLeadError("");
        if (leadCaptured) {
            generatePdf();
            return;
        }
        setLeadCaptureOpen(true);
    };

    const submitLeadAndDownload = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!results) return;

        const trimmedName = leadForm.name.trim();
        const trimmedCompany = leadForm.company.trim();
        const trimmedEmail = leadForm.email.trim().toLowerCase();

        if (!trimmedName || !trimmedCompany || !trimmedEmail) {
            setLeadError("Name, company, and email are required.");
            return;
        }
        if (!isValidEmail(trimmedEmail)) {
            setLeadError("Enter a valid work email address.");
            return;
        }

        setLeadSubmitting(true);
        setLeadError("");
        setLeadNotice("");

        try {
            const response = await fetch('/api/digital-maturity/lead', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    lead: {
                        name: trimmedName,
                        company: trimmedCompany,
                        email: trimmedEmail,
                    },
                    businessProfile,
                    results,
                }),
            });

            const data = await response.json();

            if (!response.ok || !data?.success) {
                throw new Error(data?.message || 'Could not submit lead details.');
            }

            setLeadCaptured(true);
            setLeadCaptureOpen(false);
            if (data?.syncStatus === 'full') {
                setLeadNotice('Lead captured. Your PDF download is starting.');
            } else if (data?.syncStatus === 'partial') {
                setLeadNotice('Details submitted with partial sync. Your PDF download is starting.');
            } else {
                setLeadNotice('Details submitted, but integrations are not fully configured. Your PDF download is starting.');
            }
            generatePdf();
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Failed to submit lead details.';
            setLeadError(message);
            setLeadNotice('PDF download started, but lead sync failed. Please re-submit your details so we can follow up.');
            generatePdf();
        } finally {
            setLeadSubmitting(false);
        }
    };

    const generatePdf = () => {
        if (!results) return;
        const doc = new jsPDF({ orientation: 'p', unit: 'mm', format: 'a4' });
        const { dimensionResults, overallMaturityLevel, overallMaturityScore } = results;
        const pageHeight = doc.internal.pageSize.getHeight();
        const pageWidth = doc.internal.pageSize.getWidth();
        const margin = 15;
        const asAnyDoc = doc as jsPDF & { lastAutoTable?: { finalY: number } };
        const gold: [number, number, number] = [255, 217, 3];
        const blue: [number, number, number] = [71, 69, 214];
        const slate: [number, number, number] = [2, 4, 8];
        const white: [number, number, number] = [255, 255, 255];
        const muted: [number, number, number] = [130, 138, 150];
        const aboutRadoss =
            'Radoss Agency is an integrated transformation partner connecting business strategy, marketing execution, and technology systems to unlock measurable growth.';
        let yPos = margin;

        const drawRadossWordmark = (
            x: number,
            y: number,
            fontSize: number,
            align: 'left' | 'center' = 'left',
        ) => {
            const word = 'Radoss';
            const dot = '.';
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(fontSize);
            const wordWidth = doc.getTextWidth(word);
            const dotWidth = doc.getTextWidth(dot);
            const fullWidth = wordWidth + dotWidth;
            const startX = align === 'center' ? x - (fullWidth / 2) : x;

            doc.setTextColor(white[0], white[1], white[2]);
            doc.text(word, startX, y);
            doc.setTextColor(gold[0], gold[1], gold[2]);
            doc.text(dot, startX + wordWidth, y);

            return fullWidth;
        };

        const addText = (
            text: string,
            x: number,
            y: number,
            options?: {
                fontSize?: number;
                fontStyle?: 'normal' | 'bold' | 'italic' | 'bolditalic';
                color?: [number, number, number];
                maxWidth?: number;
                align?: 'left' | 'center' | 'right';
            }
        ) => {
            const fontSize = options?.fontSize ?? 10;
            const fontStyle = options?.fontStyle ?? 'normal';
            const color = options?.color ?? [0, 0, 0];
            const maxWidth = options?.maxWidth ?? (pageWidth - margin * 2);

            doc.setFontSize(fontSize);
            doc.setFont('helvetica', fontStyle);
            doc.setTextColor(color[0], color[1], color[2]);

            const lines = doc.splitTextToSize(text, maxWidth);
            doc.text(lines, x, y, { align: options?.align ?? 'left' });
            return y + (lines.length * (fontSize * 0.352778) * 1.2);
        };

        const addHeader = () => {
            doc.setFillColor(slate[0], slate[1], slate[2]);
            doc.rect(0, 0, pageWidth, 22, 'F');
            drawRadossWordmark(margin, 13, 14, 'left');
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(9);
            doc.setTextColor(white[0], white[1], white[2]);
            doc.text('Digital Maturity Assessment Report', pageWidth - margin, 13, { align: 'right' });
            doc.setDrawColor(gold[0], gold[1], gold[2]);
            doc.line(margin, 24, pageWidth - margin, 24);
        };

        const addFooter = (pageNum: number, totalPages: number) => {
            doc.setFontSize(8);
            doc.setTextColor(muted[0], muted[1], muted[2]);
            doc.text('Radoss Agency | Connecting Dots & Crafting Growth', margin, pageHeight - 8);
            doc.text(`Page ${pageNum} of ${totalPages}`, pageWidth - margin, pageHeight - 8, { align: 'right' });
        };

        // Cover
        doc.setFillColor(slate[0], slate[1], slate[2]);
        doc.rect(0, 0, pageWidth, pageHeight, 'F');
        const goldStars: Array<[number, number]> = [[18, 18], [36, 42], [24, 74], [56, 28], [170, 22], [190, 48], [166, 66], [182, 92], [28, 190], [42, 222], [172, 206], [188, 236]];
        const blueStars: Array<[number, number]> = [[22, 34], [50, 56], [160, 38], [176, 58], [34, 208], [158, 222]];
        doc.setFillColor(gold[0], gold[1], gold[2]);
        goldStars.forEach(([x, y], i) => {
            doc.circle(x, y, i % 3 === 0 ? 0.6 : 0.42, 'F');
        });
        doc.setFillColor(blue[0], blue[1], blue[2]);
        blueStars.forEach(([x, y]) => {
            doc.circle(x, y, 0.35, 'F');
        });
        drawRadossWordmark(pageWidth / 2, 80, 28, 'center');
        yPos = addText('Digital Maturity Assessment Report', pageWidth / 2, 104, {
            fontSize: 22,
            fontStyle: 'bold',
            color: gold,
            align: 'center'
        });
        yPos = addText(`Prepared for: ${businessProfile.industry}`, pageWidth / 2, yPos + 8, {
            fontSize: 13,
            color: white,
            align: 'center'
        });
        yPos = addText(`Business Type: ${businessProfile.type} | Scale: ${businessProfile.scale}`, pageWidth / 2, yPos + 6, {
            fontSize: 11,
            color: muted,
            align: 'center'
        });
        addText(`Assessment Date: ${new Date().toLocaleDateString()}`, pageWidth / 2, yPos + 6, {
            fontSize: 10,
            color: muted,
            align: 'center'
        });

        // Executive summary
        doc.addPage();
        addHeader();
        yPos = 34;
        yPos = addText('Executive Summary', margin, yPos, { fontSize: 18, fontStyle: 'bold' });
        yPos += 4;
        yPos = addText(`Overall Maturity Level: ${overallMaturityLevel} (Score ${overallMaturityScore}/5)`, margin, yPos, {
            fontSize: 13,
            fontStyle: 'bold',
            color: blue
        });
        yPos = addText(maturityDescriptions[overallMaturityLevel], margin, yPos + 2, { fontSize: 10 });
        yPos += 8;
        yPos = addText('Key Findings by Dimension', margin, yPos, { fontSize: 13, fontStyle: 'bold' });

        const summaryRows: string[][] = [];
        dimensionsOrder.forEach((dim) => {
            if (dimensionResults[dim]) {
                summaryRows.push([dim, dimensionResults[dim].level]);
            }
        });

        autoTable(doc, {
            startY: yPos + 2,
            head: [['Dimension', 'Maturity Level']],
            body: summaryRows,
            theme: 'grid',
            headStyles: { fillColor: blue, textColor: [255, 255, 255] },
            styles: { fontSize: 9, cellPadding: 2.5 },
            alternateRowStyles: { fillColor: [248, 249, 252] },
        });
        yPos = (asAnyDoc.lastAutoTable?.finalY ?? yPos) + 8;

        yPos = addText('About Radoss.', margin, yPos, {
            fontSize: 12,
            fontStyle: 'bold',
            color: gold,
        });
        yPos = addText(aboutRadoss, margin, yPos + 1, {
            fontSize: 9.5,
            color: muted,
        });
        yPos += 6;

        addText('This report prioritizes practical next steps tied to your business context and maturity stage.', margin, yPos, {
            fontSize: 10,
            color: muted
        });

        // Detailed recommendations
        doc.addPage();
        addHeader();
        yPos = 34;
        yPos = addText('Detailed Recommendations by Dimension', margin, yPos, { fontSize: 18, fontStyle: 'bold' });
        yPos += 5;

        dimensionsOrder.forEach((dim) => {
            if (!dimensionResults[dim]) return;
            const result = dimensionResults[dim];
            const recs = getPersonalizedRecommendations(dim, result.level);
            const recRows = recs.map((rec) => {
                const headline = rec.personalizedFor ? `${rec.headline} (Tailored for ${rec.personalizedFor})` : rec.headline;
                return [headline, rec.details];
            });

            const estimatedHeight = 30 + recRows.length * 13;
            if (yPos + estimatedHeight > pageHeight - margin - 12) {
                doc.addPage();
                addHeader();
                yPos = 34;
            }

            autoTable(doc, {
                startY: yPos,
                head: [[{ content: `${dim} — ${result.level}`, colSpan: 2, styles: { halign: 'left', fillColor: blue, textColor: [255, 255, 255] } }]],
                body: [[{ content: `"${maturityDescriptions[result.level]}"`, colSpan: 2, styles: { fontStyle: 'italic', textColor: [90, 90, 90] } }]],
                theme: 'grid',
                styles: { fontSize: 9, cellPadding: 2.2 }
            });
            yPos = (asAnyDoc.lastAutoTable?.finalY ?? yPos) + 1;

            autoTable(doc, {
                startY: yPos,
                head: [['Recommendation', 'Details & Action Steps']],
                body: recRows,
                theme: 'striped',
                headStyles: { fillColor: gold, textColor: [15, 23, 42] },
                styles: { fontSize: 9, cellPadding: 2.2 },
                columnStyles: {
                    0: { fontStyle: 'bold', cellWidth: 60 },
                    1: { cellWidth: 'auto' }
                }
            });
            yPos = (asAnyDoc.lastAutoTable?.finalY ?? yPos) + 8;
        });

        const totalPages = doc.internal.getNumberOfPages();
        for (let i = 1; i <= totalPages; i++) {
            doc.setPage(i);
            addFooter(i, totalPages);
        }

        doc.save('Radoss_Agency_Digital_Maturity_Report.pdf');
    };

    const restartQuiz = () => {
        setStarted(false);
        setShowResults(false);
        setCurrentQuestionIndex(0);
        setAnswers(new Array(questions.length).fill(null));
        setResults(null);
        setLeadCaptureOpen(false);
        setLeadCaptured(false);
        setLeadSubmitting(false);
        setLeadError("");
        setLeadNotice("");
        setLeadForm({ name: "", company: "", email: "" });
    };

    const freeBenefits = [
        {
            title: 'Free Instant Scoring',
            text: 'Get immediate maturity scores across Customer, Strategy, Technology, Operations, and Organisation & Culture.',
        },
        {
            title: 'Tailored Recommendations',
            text: 'Receive contextual recommendations based on your business profile, not generic transformation advice.',
        },
        {
            title: 'Executive-Ready PDF',
            text: 'Download a clean report you can share with leadership teams for planning and prioritization.',
        },
    ];

    return (
        <div className={styles.toolWrapper}>
            <section className={styles.gradientHero}>
                <div className="container">
                    <div className={styles.heroMeta}>
                        <span className={styles.freeBadge}>FREE</span>
                        <span className={styles.metaText}>15 Questions • 5 Dimensions • Instant Report</span>
                    </div>
                    <h1 className={styles.heroTitle}>
                        <span className={styles.highlightGold}>Digital</span> Maturity Assessment Tool<span className={styles.highlightGold}>.</span>
                    </h1>
                    <p className={styles.heroSubtitle}>
                        A free strategic diagnostic for leaders who want clarity on digital readiness, capability gaps, and the next best moves for transformation.
                    </p>
                    {!started && (
                        <button onClick={() => document.getElementById('assessment-start')?.scrollIntoView({ behavior: 'smooth' })} className={styles.heroButton}>
                            Start Free Assessment
                        </button>
                    )}
                </div>
            </section>

            <div className={styles.pageContent}>
                <div className={`container ${styles.centeredContainer}`}>

                    {!started && !showResults && (
                        <>
                            <section className={styles.contentSection}>
                                <h2>Why Assess Your Digital Maturity?</h2>
                                <p>Transformation is hard when priorities are unclear. This free assessment gives your team a baseline so investments, capability building, and execution plans can be sequenced with confidence.</p>
                                <ul className={styles.list}>
                                    <li><strong>Identify Strengths & Weaknesses:</strong> see where your current model is helping or holding growth back.</li>
                                    <li><strong>Benchmark Maturity:</strong> understand how advanced your systems and operating habits are.</li>
                                    <li><strong>Prioritize Investment:</strong> focus budget and execution energy where impact will be highest.</li>
                                    <li><strong>Align Leadership:</strong> establish shared language and measurable transformation priorities.</li>
                                </ul>
                            </section>

                            <section className={styles.contentSection}>
                                <h2>What You Get (Free)</h2>
                                <div className={styles.benefitsGrid}>
                                    {freeBenefits.map((item) => (
                                        <article key={item.title} className={styles.benefitCard}>
                                            <h3>{item.title}</h3>
                                            <p>{item.text}</p>
                                        </article>
                                    ))}
                                </div>
                            </section>

                            <section className={styles.contentSection}>
                                <h2>Who Should Use This Tool?</h2>
                                <p>This assessment is designed for founders, C-suite leaders, growth teams, and operations teams that need an honest, structured view of digital readiness before making strategic bets.</p>
                                <ul className={styles.list}>
                                    <li><strong>SMEs and Scaleups:</strong> building repeatable growth systems and operational discipline.</li>
                                    <li><strong>Enterprise Units:</strong> modernizing legacy workflows, tooling, and customer journeys.</li>
                                    <li><strong>Marketing and Revenue Teams:</strong> aligning sales, marketing, data, and automation workflows.</li>
                                    <li><strong>Transformation Leads:</strong> creating a practical roadmap backed by measurable maturity signals.</li>
                                </ul>
                            </section>

                            <section id="assessment-start" className={styles.contentSection}>
                                <div className={styles.quizContainer}>
                                    <h2 className={styles.quizHeading}>Start Your Free Assessment</h2>
                                    <p className={styles.quizIntro}>Tell us a bit about your business so your recommendations are context-aware and practical.</p>

                                    <div className={styles.profileGrid}>
                                        <div>
                                            <label className={styles.inputLabel}>Industry</label>
                                            <input
                                                type="text"
                                                className={styles.inputField}
                                                placeholder="e.g. Retail, Finance"
                                                value={businessProfile.industry}
                                                onChange={(e) => setBusinessProfile({ ...businessProfile, industry: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className={styles.inputLabel}>Business Scale</label>
                                            <select
                                                className={styles.inputField}
                                                value={businessProfile.scale}
                                                onChange={(e) => setBusinessProfile({ ...businessProfile, scale: e.target.value })}
                                            >
                                                <option value="">Select Scale</option>
                                                <option value="Small (1-50 employees)">Small (1-50)</option>
                                                <option value="Medium (51-500 employees)">Medium (51-500)</option>
                                                <option value="Large (501+ employees)">Large (501+)</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className={styles.inputLabel}>Business Type</label>
                                            <select
                                                className={styles.inputField}
                                                value={businessProfile.type}
                                                onChange={(e) => setBusinessProfile({ ...businessProfile, type: e.target.value })}
                                            >
                                                <option value="">Select Type</option>
                                                <option value="B2C">B2C</option>
                                                <option value="B2B">B2B</option>
                                                <option value="Non-profit">Non-profit</option>
                                                <option value="Government">Government</option>
                                                <option value="Other">Other</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className={styles.centerRow}>
                                        <button onClick={handleStart} className={styles.heroButton}>Continue to Questions</button>
                                    </div>
                                </div>
                            </section>
                        </>
                    )}

                    {started && !showResults && (
                        <section className={styles.contentSection}>
                            <div className={styles.progressBarContainer}>
                                <div className={styles.progressBar} style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}></div>
                            </div>

                            <div className={styles.questionCard}>
                                <h2 className={styles.questionDimension}>
                                    Dimension: {questions[currentQuestionIndex].dimension}
                                </h2>
                                <p className={styles.questionText}>
                                    {currentQuestionIndex + 1}. {questions[currentQuestionIndex].text}
                                </p>
                                <div>
                                    {questions[currentQuestionIndex].options.map((option, idx) => (
                                        <label
                                            key={idx}
                                            className={`${styles.optionLabel} ${answers[currentQuestionIndex] === option.score ? styles.selectedOption : ''}`}
                                            onClick={() => handleOptionSelect(option.score)}
                                        >
                                            <input
                                                type="radio"
                                                name={`q${currentQuestionIndex}`}
                                                checked={answers[currentQuestionIndex] === option.score}
                                                readOnly
                                                className={styles.radioInput}
                                            />
                                            {option.text}
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className={styles.navRow}>
                                <button onClick={handlePrev} disabled={currentQuestionIndex === 0} className={styles.navButton}>Previous</button>
                                <span className={styles.navStatus}>Question {currentQuestionIndex + 1} of {questions.length}</span>
                                <button onClick={handleNext} disabled={answers[currentQuestionIndex] === null} className={styles.navButton}>
                                    {currentQuestionIndex === questions.length - 1 ? 'Show Results' : 'Next'}
                                </button>
                            </div>
                        </section>
                    )}

                    {showResults && results && (
                        <section className={styles.contentSection}>
                            <h2 className={styles.resultsTitle}>Your Digital Maturity Results</h2>

                            <div className={`${styles.resultBox} ${styles.overallResultBox}`}>
                                <h3 className={styles.overallHeading}>Overall Maturity Level: <span className={styles.overallLevel}>{results.overallMaturityLevel}</span></h3>
                                <p className={styles.overallDescription}>{maturityDescriptions[results.overallMaturityLevel]}</p>
                            </div>

                            <h3 className={styles.sectionSubheading}>Recommendations by Dimension</h3>

                            {dimensionsOrder.filter((dim) => Boolean(results.dimensionResults[dim])).map(dim => {
                                const result = results.dimensionResults[dim];
                                const recs = getPersonalizedRecommendations(dim, result.level);

                                return (
                                    <div key={dim} className={styles.resultBox}>
                                        <div className={styles.resultHeader}>
                                            <h4 className={styles.resultDimension}>{dim}</h4>
                                            <span className={styles.resultLevel}>{result.level}</span>
                                        </div>
                                        <p className={styles.dimensionQuote}>&quot;{maturityDescriptions[result.level]}&quot;</p>

                                        {recs.map((rec: Recommendation, i: number) => (
                                            <div key={i} className={styles.recommendationItem}>
                                                <strong className={styles.recommendationHeadline}>
                                                    {rec.headline} {rec.personalizedFor && <span className={styles.personalizedTag}>({rec.personalizedFor})</span>}
                                                </strong>
                                                <p className={styles.recommendationText}>{rec.details}</p>
                                            </div>
                                        ))}
                                    </div>
                                );
                            })}

                            <div className={styles.resultActions}>
                                <button onClick={restartQuiz} className={`${styles.heroButton} ${styles.secondaryButton}`}>Restart Assessment</button>
                                <button onClick={handleDownloadRequest} className={styles.heroButton}>
                                    {leadCaptured ? 'Download PDF Report' : 'Get PDF Report'}
                                </button>
                            </div>
                            {leadNotice && <p className={styles.leadNotice}>{leadNotice}</p>}

                            {leadCaptureOpen && (
                                <div className={`${styles.resultBox} ${styles.leadCaptureCard}`}>
                                    <h3 className={styles.leadHeading}>Get Your Report by Email + Instant Download</h3>
                                    <p className={styles.leadCopy}>
                                        Enter your details so we can send a copy to your inbox and log your assessment for follow-up support.
                                    </p>
                                    <form onSubmit={submitLeadAndDownload} className={styles.leadForm}>
                                        <div className={styles.leadFormGrid}>
                                            <div>
                                                <label className={styles.inputLabel}>Name</label>
                                                <input
                                                    type="text"
                                                    className={styles.inputField}
                                                    value={leadForm.name}
                                                    onChange={(e) => setLeadForm((prev) => ({ ...prev, name: e.target.value }))}
                                                    placeholder="Your full name"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className={styles.inputLabel}>Company</label>
                                                <input
                                                    type="text"
                                                    className={styles.inputField}
                                                    value={leadForm.company}
                                                    onChange={(e) => setLeadForm((prev) => ({ ...prev, company: e.target.value }))}
                                                    placeholder="Company name"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className={styles.inputLabel}>Email</label>
                                                <input
                                                    type="email"
                                                    className={styles.inputField}
                                                    value={leadForm.email}
                                                    onChange={(e) => setLeadForm((prev) => ({ ...prev, email: e.target.value }))}
                                                    placeholder="you@company.com"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        {leadError && <p className={styles.leadError}>{leadError}</p>}
                                        <div className={styles.leadActions}>
                                            <button type="submit" className={styles.heroButton} disabled={leadSubmitting}>
                                                {leadSubmitting ? 'Saving…' : 'Submit & Download PDF'}
                                            </button>
                                            <button
                                                type="button"
                                                className={styles.navButton}
                                                onClick={() => {
                                                    setLeadCaptureOpen(false);
                                                    setLeadError("");
                                                }}
                                                disabled={leadSubmitting}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            )}

                            <SolutionCTA
                                title="Need a Custom Digital Roadmap?"
                                description="Your assessment is just the beginning. Let Radoss Agency build and execute a bespoke growth strategy tailored to your organization's maturity."
                            />
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
}
