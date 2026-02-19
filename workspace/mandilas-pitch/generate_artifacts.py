#!/usr/bin/env python3
import json
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import urlparse

import requests
from bs4 import BeautifulSoup

ROOT = Path('/Users/radossagency/Documents/Web-Projects/new-radoss.agency')
OUT = ROOT / 'workspace' / 'mandilas-pitch'
ASSETS = OUT / 'assets'
LOGOS = ASSETS / 'logos'
OUT.mkdir(parents=True, exist_ok=True)
ASSETS.mkdir(parents=True, exist_ok=True)
LOGOS.mkdir(parents=True, exist_ok=True)

NOW = datetime.now(timezone.utc).isoformat()

UPDATED_PORTFOLIO = '/Users/radossagency/Downloads/Radoss Portfolio.pdf'
LEGACY_PORTFOLIO = '/Users/radossagency/Documents/Business/Radoss/Contracts/Radoss Portfolio.pdf'

RADOSS_URLS = [
    'https://radoss.agency/',
    'https://radoss.agency/about',
    'https://radoss.agency/approach',
    'https://radoss.agency/expertise',
    'https://radoss.agency/expertise/digital-performance-marketing',
    'https://radoss.agency/expertise/business-digital-transformation',
    'https://radoss.agency/expertise/brand-traditional-marketing',
    'https://radoss.agency/work',
    'https://radoss.agency/solutions/radoss-digital',
    'https://radoss.agency/solutions/meta-ads-payment',
    'https://radoss.agency/solutions/wabar-whatsapp-api',
    'https://radoss.agency/contact',
    'https://radossdigital.com',
    'https://radossdigital.com/about-radoss-digital',
    'https://radossdigital.com/digital-services',
    'https://radossdigital.com/radoss-digital-blog',
]

MANDILAS_URLS = [
    'https://www.mandilasng.com/',
    'https://www.linkedin.com/company/mandilas-group',
    'https://www.facebook.com/MandilasGroup/',
    'https://www.instagram.com/mandilasgroup/',
    'https://toyotanigeria.com/dealers/mandilas-enterprises-ltd/',
]

RESEARCH_URLS = [
    'https://datareportal.com/reports/digital-2025-nigeria',
    'https://api.worldbank.org/v2/country/NGA/indicator/SP.URB.TOTL.IN.ZS?format=json&per_page=70',
    'https://api.worldbank.org/v2/country/NGA/indicator/FP.CPI.TOTL.ZG?format=json&per_page=70',
    'https://api.worldbank.org/v2/country/NGA/indicator/NY.GDP.MKTP.KD.ZG?format=json&per_page=70',
    'https://www.gsma.com/solutions-and-impact/connectivity-for-good/mobile-economy/sub-saharan-africa-2024/',
    'https://www.deloitte.com/us/en/insights/industry/automotive/global-automotive-consumer-study.html',
    'https://www.pwc.com/gx/en/consumer-markets/consumer-insights-survey.html',
]


def page_type(url: str) -> str:
    p = urlparse(url)
    host = p.netloc.lower()
    path = p.path.lower().strip('/')

    if 'linkedin.com' in host:
        return 'linkedin_channel'
    if 'instagram.com' in host:
        return 'instagram_channel'
    if 'facebook.com' in host:
        return 'facebook_channel'
    if 'mandilasng.com' in host:
        return 'mandilas_website'
    if 'toyotanigeria.com' in host:
        return 'dealer_reference'
    if 'datareportal.com' in host:
        return 'digital_behavior_report'
    if 'worldbank.org' in host:
        return 'macro_indicator_api'
    if 'gsma.com' in host:
        return 'connectivity_report'
    if 'deloitte.com' in host:
        return 'industry_study'
    if 'pwc.com' in host:
        return 'consumer_study'
    if 'radoss' in host:
        if path.startswith('work'):
            return 'case_study_index'
        if path.startswith('about'):
            return 'agency_about'
        if path.startswith('approach'):
            return 'strategy_framework'
        if path.startswith('expertise'):
            return 'service_detail'
        if path.startswith('solutions'):
            return 'solution_detail'
        return 'agency_page'
    return 'source'


def scrape(url: str):
    headers = {'User-Agent': 'Mozilla/5.0'}
    r = requests.get(url, timeout=45, headers=headers)
    s = BeautifulSoup(r.text, 'html.parser')

    title = s.title.get_text(strip=True) if s.title else ''
    md = s.find('meta', attrs={'name': 'description'})
    ogd = s.find('meta', attrs={'property': 'og:description'})

    desc = ''
    if md and md.get('content'):
        desc = md['content'].strip()
    elif ogd and ogd.get('content'):
        desc = ogd['content'].strip()

    h1 = [x.get_text(' ', strip=True) for x in s.find_all('h1') if x.get_text(' ', strip=True)][:8]
    h2 = [x.get_text(' ', strip=True) for x in s.find_all('h2') if x.get_text(' ', strip=True)][:12]

    bullets = []
    for li in s.find_all('li'):
        t = li.get_text(' ', strip=True)
        if t and t not in bullets:
            bullets.append(t)
        if len(bullets) >= 16:
            break

    image_alt_entities = []
    for img in s.find_all('img'):
        alt = (img.get('alt') or '').strip()
        if alt and alt not in image_alt_entities:
            image_alt_entities.append(alt)
        if len(image_alt_entities) >= 24:
            break

    return {
        'url': url,
        'domain': urlparse(url).netloc,
        'page_type': page_type(url),
        'title': title,
        'meta_description': desc,
        'h1': h1,
        'h2': h2,
        'bullets': bullets,
        'image_alt_entities': image_alt_entities,
        'last_seen_utc': NOW,
    }


def world_bank_snapshot():
    indicators = {
        'SP.URB.TOTL.IN.ZS': 'Urban population (% of total population)',
        'FP.CPI.TOTL.ZG': 'Inflation, consumer prices (annual %)',
        'NY.GDP.MKTP.KD.ZG': 'GDP growth (annual %)',
    }
    out = {}
    for code, _ in indicators.items():
        u = f'https://api.worldbank.org/v2/country/NGA/indicator/{code}?format=json&per_page=70'
        j = requests.get(u, timeout=45).json()[1]
        latest = next((x for x in j if x.get('value') is not None), None)
        out[code] = {'year': latest['date'], 'value': latest['value']}
    return out


def b(kind, title, body=None, bullets=None):
    x = {'kind': kind, 'title': title}
    if body:
        x['body'] = body
    if bullets:
        x['bullets'] = bullets
    return x


def build_claims(wb):
    return [
        {
            'claim_id': 'CLM-001',
            'claim_text': 'Radoss positions itself as the nexus of business, marketing, and technology for integrated growth execution.',
            'supporting_urls': ['https://radoss.agency/', f'file://{UPDATED_PORTFOLIO}'],
            'confidence': 0.99,
            'slide_id': 'S04',
        },
        {
            'claim_id': 'CLM-002',
            'claim_text': 'The updated portfolio documents 9 case-study streams including Gerocare, Halogen Security, Eatalia, Healthtracka, Zenith, Miva, Bracken, and HippoAds.',
            'supporting_urls': [f'file://{UPDATED_PORTFOLIO}', 'https://radoss.agency/work'],
            'confidence': 0.98,
            'slide_id': 'S18-S26',
        },
        {
            'claim_id': 'CLM-003',
            'claim_text': 'Mandilas public channels indicate heritage operations and multi-sector presence across mobility and engineering touchpoints.',
            'supporting_urls': [
                'https://www.linkedin.com/company/mandilas-group',
                'https://www.instagram.com/mandilasgroup/',
                'https://www.facebook.com/MandilasGroup/',
                'https://www.mandilasng.com/',
            ],
            'confidence': 0.93,
            'slide_id': 'S29',
        },
        {
            'claim_id': 'CLM-004',
            'claim_text': 'Toyota Nigeria dealer listing confirms Mandilas service operations in Lagos touchpoints.',
            'supporting_urls': ['https://toyotanigeria.com/dealers/mandilas-enterprises-ltd/'],
            'confidence': 0.95,
            'slide_id': 'S29',
        },
        {
            'claim_id': 'CLM-005',
            'claim_text': 'DataReportal 2025 Nigeria reports 150M mobile connections, 107M internet users, and 38.7M social media identities.',
            'supporting_urls': ['https://datareportal.com/reports/digital-2025-nigeria'],
            'confidence': 0.96,
            'slide_id': 'S30',
        },
        {
            'claim_id': 'CLM-006',
            'claim_text': f"World Bank latest Nigeria macro snapshot: urban population {wb['SP.URB.TOTL.IN.ZS']['value']:.1f}% ({wb['SP.URB.TOTL.IN.ZS']['year']}), inflation {wb['FP.CPI.TOTL.ZG']['value']:.1f}% ({wb['FP.CPI.TOTL.ZG']['year']}), GDP growth {wb['NY.GDP.MKTP.KD.ZG']['value']:.1f}% ({wb['NY.GDP.MKTP.KD.ZG']['year']}).",
            'supporting_urls': [
                'https://api.worldbank.org/v2/country/NGA/indicator/SP.URB.TOTL.IN.ZS?format=json&per_page=70',
                'https://api.worldbank.org/v2/country/NGA/indicator/FP.CPI.TOTL.ZG?format=json&per_page=70',
                'https://api.worldbank.org/v2/country/NGA/indicator/NY.GDP.MKTP.KD.ZG?format=json&per_page=70',
            ],
            'confidence': 0.99,
            'slide_id': 'S30',
        },
        {
            'claim_id': 'CLM-007',
            'claim_text': 'GSMA SSA mobile economy highlights persistent usage gap and continuing 4G/5G adoption trajectory.',
            'supporting_urls': ['https://www.gsma.com/solutions-and-impact/connectivity-for-good/mobile-economy/sub-saharan-africa-2024/'],
            'confidence': 0.89,
            'slide_id': 'S30',
        },
        {
            'claim_id': 'CLM-008',
            'claim_text': 'Deloitte and PwC consumer/automotive studies indicate stronger demand for digital research, transparent pricing, and frictionless purchase/service journeys.',
            'supporting_urls': [
                'https://www.deloitte.com/us/en/insights/industry/automotive/global-automotive-consumer-study.html',
                'https://www.pwc.com/gx/en/consumer-markets/consumer-insights-survey.html',
            ],
            'confidence': 0.84,
            'slide_id': 'S31',
        },
    ]


def build_manifest(wb):
    pop = '235M'
    mobile = '150M'
    internet = '107M'
    social = '38.7M'

    logo = lambda name: f'file://{LOGOS / name}'

    slides = [
        {
            'slide_no': 1,
            'slide_title': 'Mandilas x Radoss | Partnership Strategy Deck',
            'objective': 'Set panel context, strategic intent, and outcome expectations.',
            'content_blocks': [
                b('hero', 'Digital & Creative Partner Presentation', bullets=[
                    'Prepared for Mandilas Group panel review',
                    'Built from public evidence + updated Radoss portfolio',
                    'Focus: strategic depth, execution capability, measurable outcomes',
                ]),
                b('meta', 'What This Deck Delivers', bullets=[
                    'Agency portfolio and capability depth',
                    'M-C-I-A strategic framework in action',
                    'All relevant case studies with impact logic',
                    'Mandilas-specific strategic recommendations',
                ]),
            ],
            'visual_assets': [
                f'file://{ASSETS / "mandilas-logo.png"}',
                logo('radoss.png'),
            ],
            'speaker_notes': 'Open with confidence and keep focus on decision quality.',
            'footnote': 'Callout: This version integrates the updated portfolio end-to-end and removes date-based availability confirmation.',
            'duration_min': 1.2,
        },
        {
            'slide_no': 2,
            'slide_title': 'Agenda & Session Flow',
            'objective': 'Show structure and how each question is answered directly.',
            'content_blocks': [
                b('agenda', 'Presentation Route', bullets=[
                    'Section 01: Agency Portfolio Overview',
                    'Section 02: Strategic Framework (deep M-C-I-A)',
                    'Section 03: Notable Campaigns & Impact (all portfolio case studies)',
                    'Section 04: Working with Radoss (Mandilas-specific recommendations)',
                    'Close: governance model, references, contact channels, Q&A',
                ]),
            ],
            'visual_assets': [],
            'speaker_notes': 'Set expectations for a high-density but structured walkthrough.',
            'footnote': 'Navigation cue: Section breakers appear at the start of each Mandilas request block.',
            'duration_min': 1.1,
        },
        {
            'slide_no': 3,
            'slide_title': 'SECTION 01 | Agency Portfolio Overview',
            'objective': 'Page breaker for Question 1.',
            'content_blocks': [b('breaker', 'Background • Team • Capabilities • Brands Served')],
            'visual_assets': [],
            'speaker_notes': 'Explicitly anchor this to Request Item 1 from Mandilas.',
            'footnote': 'Section marker aligned to client request item 1.',
            'duration_min': 0.7,
        },
        {
            'slide_no': 4,
            'slide_title': 'Who We Are | The Nexus of Business, Marketing & Technology',
            'objective': 'Define positioning and value lens from both current site and portfolio.',
            'content_blocks': [
                b('position', 'Integrated Growth Positioning', 'Radoss bridges strategic intent, execution discipline, and technology enablement to unlock measurable business growth.'),
                b('dna', 'Portfolio-Derived Brand Perspective', bullets=[
                    'Interconnected solutions over siloed services',
                    'Growth architecture that aligns business + marketing + systems',
                    'Lagos headquartered with local execution and regional relevance',
                ]),
            ],
            'visual_assets': [
                logo('radoss.png'),
                f'file://{ROOT / "public/radoss-logo.jpg"}',
            ],
            'speaker_notes': 'Use visual balance to avoid dead space and reinforce brand architecture.',
            'footnote': 'Evidence: radoss.agency positioning language + updated portfolio narrative.',
            'duration_min': 1.5,
        },
        {
            'slide_no': 5,
            'slide_title': 'Leadership & Key Team',
            'objective': 'Present full leadership and delivery continuity across strategy, operations, and execution.',
            'content_blocks': [
                b('team', 'Core Team', bullets=[
                    'Uchenna Innocent, MCIM — Chief Digital Architect & Founder',
                    'Timi Uk — Chief Operating Officer & Co-Founder',
                    'Ebere Agbaje — Business Operations Lead',
                ]),
                b('coverage', 'Execution Lens', bullets=[
                    'Business and transformation strategy ownership',
                    'Performance and brand operations governance',
                    'Research intelligence, analytics, and optimization control',
                ]),
            ],
            'visual_assets': [
                'https://res.cloudinary.com/innosaint/image/upload/v1759535536/Uchenna-Innocent_headshot_nzenth.jpg',
                f'file://{ROOT / "public/images/team/timi-uk-silhouette.svg"}',
                'https://media.licdn.com/dms/image/v2/D4D03AQHarcZat2nPZw/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1719027089306?e=2147483647&v=beta&t=qEoLB81CVNV6nJK594wiSEHdc8D2ROPySo4U4kI5rg4',
            ],
            'speaker_notes': 'Demonstrate that this is a real operating team, not a single-person pitch.',
            'footnote': 'Callout: Leadership-to-delivery continuity is built into the operating model.',
            'duration_min': 1.7,
        },
        {
            'slide_no': 6,
            'slide_title': 'Core Service Offerings & In-House Capabilities',
            'objective': 'Map capability pillars to practical business outcomes.',
            'content_blocks': [
                b('digital', 'Digital & Performance Marketing', bullets=['SEO and content strategy', 'PPC and paid media', 'Social and lifecycle automation', 'Analytics and attribution']),
                b('transform', 'Business & Digital Transformation', bullets=['Sales-marketing alignment', 'MarTech/process optimization', 'Systems integration', 'Change management support']),
                b('brand', 'Brand & Traditional Marketing', bullets=['Brand strategy and identity', 'ATL/BTL activation design', 'Integrated TTL campaign planning']),
            ],
            'visual_assets': [],
            'speaker_notes': 'Keep this as capability architecture, not a generic service list.',
            'footnote': 'Outcome lens: acquisition, operational efficiency, and brand trust growth.',
            'duration_min': 1.5,
        },
        {
            'slide_no': 7,
            'slide_title': 'Brand Reference Matrix | Full Portfolio Coverage',
            'objective': 'Show complete visible brand footprint with no empty slots.',
            'content_blocks': [
                b('brands', 'Portfolio + Site Referenced Brands', bullets=[
                    'Gerocare', 'Halogen Security', 'Eatalia', 'Healthtracka', 'Zenith Bank',
                    'Miva University', 'Bracken', 'HippoAds', 'Indomie (Tolaram)', 'Palmpay',
                ]),
                b('proof', 'Proof Basis', 'Logos sourced from portfolio context, public brand endpoints, and radoss.agency case references.'),
            ],
            'visual_assets': [
                logo('gerocare.png'),
                logo('halogen.jpg'),
                logo('eatalia.png'),
                logo('healthtracka.svg'),
                logo('zenith.png'),
                logo('miva.png'),
                logo('bracken.png'),
                logo('hippoads.jpg'),
                logo('indomie.svg'),
                logo('palmpay.jpg'),
            ],
            'speaker_notes': 'Explicitly mention this addresses the ask for full brand matrix depth.',
            'footnote': 'Design intent: full-logo matrix with stylistic spacing and parity.',
            'duration_min': 1.6,
        },
        {
            'slide_no': 8,
            'slide_title': 'Portfolio Perspective | Continuity, Learning, Maturity',
            'objective': 'Use the updated portfolio as a capability maturity signal.',
            'content_blocks': [
                b('continuity', 'Consistency Signals', bullets=[
                    'Integrated strategic posture remains consistent',
                    'Case-led evidence orientation across sectors',
                    'Expanded execution depth in performance + operations',
                ]),
                b('learning', 'What Changed in Updated Portfolio', bullets=[
                    'Broader case coverage in 2022–2026 window',
                    'Clearer challenge-to-achievement articulation',
                    'Stronger evidence for full-funnel operating capability',
                ]),
            ],
            'visual_assets': [f'file://{UPDATED_PORTFOLIO}'],
            'speaker_notes': 'Frame this as progression and operating maturity.',
            'footnote': 'Source: updated portfolio attachment (inclusion, not replacement).',
            'duration_min': 1.2,
        },
        {
            'slide_no': 9,
            'slide_title': 'SECTION 02 | Strategic Framework',
            'objective': 'Page breaker for Question 2.',
            'content_blocks': [b('breaker', 'Business Objectives → Insight-Led Strategy → Compounding Outcomes')],
            'visual_assets': [],
            'speaker_notes': 'Transition to strategic methodology depth.',
            'footnote': 'Section marker aligned to client request item 2.',
            'duration_min': 0.7,
        },
        {
            'slide_no': 10,
            'slide_title': 'Strategic Philosophy | Outcomes over Activity',
            'objective': 'Explain how business goals are translated into actionable strategy.',
            'content_blocks': [
                b('principle', 'Translation Model', bullets=[
                    'Start from explicit business objectives and constraints',
                    'Form customer, market, and channel hypotheses',
                    'Prioritize experiments with commercial relevance',
                    'Scale what works; retire what does not',
                ]),
                b('discipline', 'Decision Discipline', bullets=['Evidence before assumptions', 'Operating rhythm before campaign bursts', 'Measurement before scale']),
            ],
            'visual_assets': [],
            'speaker_notes': 'Keep language boardroom-grade and operationally concrete.',
            'footnote': 'Callout: this philosophy governs every case-study execution path.',
            'duration_min': 1.3,
        },
        {
            'slide_no': 11,
            'slide_title': 'M-C-I-A Overview | Strategic Flywheel',
            'objective': 'Present the Map-Connect-Implement-Analyse cycle as an operating system.',
            'content_blocks': [
                b('flywheel', 'Map → Connect → Implement → Analyse', 'A continuous cycle where each phase upgrades the next decision and compounds ROI.'),
                b('benefits', 'Compounding Benefits', bullets=['Higher decision quality', 'Lower channel waste', 'Faster adaptation to market shifts', 'Stronger cross-team accountability']),
            ],
            'visual_assets': [],
            'speaker_notes': 'Use this as the anchor before going phase-by-phase.',
            'footnote': 'Footnote: M-C-I-A is applied as a rhythm, not a one-off planning exercise.',
            'duration_min': 1.4,
        },
        {
            'slide_no': 12,
            'slide_title': 'M | Map the Market',
            'objective': 'Detail market diagnosis, opportunity mapping, and strategic choice architecture.',
            'content_blocks': [
                b('questions', 'Diagnostic Questions', bullets=['Where is value concentration highest?', 'What constraints shape execution viability?', 'What opportunity windows are currently underplayed?']),
                b('outputs', 'Outputs & Gates', bullets=['Market opportunity map', 'Risk register + mitigation owners', 'Priority stack linked to KPI baseline']),
            ],
            'visual_assets': [],
            'speaker_notes': 'Emphasize that execution quality starts with mapping quality.',
            'footnote': 'Decision note: no implementation begins without KPI baseline and risk ownership.',
            'duration_min': 1.2,
        },
        {
            'slide_no': 13,
            'slide_title': 'C | Connect with the Consumer',
            'objective': 'Convert insight into relevance, trust, and conversion architecture.',
            'content_blocks': [
                b('questions', 'Insight Questions', bullets=['What is the real job-to-be-done?', 'Where do trust and friction break?', 'Which message-value exchange drives action?']),
                b('outputs', 'Outputs', bullets=['Audience and intent blueprint', 'Journey intervention map', 'Message architecture by stage and segment']),
            ],
            'visual_assets': [],
            'speaker_notes': 'Tie consumer clarity directly to media and creative performance.',
            'footnote': 'Consumer lens: relevance + trust + speed drive both acquisition and retention.',
            'duration_min': 1.2,
        },
        {
            'slide_no': 14,
            'slide_title': 'I | Implement with Impact',
            'objective': 'Show brief-to-rollout execution system and accountability model.',
            'content_blocks': [
                b('system', 'Execution System', bullets=['Roadmap with clear ownership', 'Cross-functional dependencies managed upfront', 'Instrumentation and attribution readiness']),
                b('cadence', 'Operating Cadence', bullets=['Weekly standups and campaign checks', 'Bi-weekly optimization gates', 'Monthly executive review']),
            ],
            'visual_assets': [],
            'speaker_notes': 'Position implementation as a managed operating system.',
            'footnote': 'Delivery note: rigor in cadence is what preserves consistency under pressure.',
            'duration_min': 1.2,
        },
        {
            'slide_no': 15,
            'slide_title': 'A | Analyse, Adapt & Amplify',
            'objective': 'Detail measurement and optimization mechanics.',
            'content_blocks': [
                b('loop', 'Optimization Loop', bullets=['Leading + lagging KPI scorecards', 'Causal diagnostics on performance shifts', 'Budget and channel reallocation rules']),
                b('amplify', 'Compounding Strategy', bullets=['Codify winning patterns', 'Deploy fast iteration cycles', 'Feed learnings back into next Map phase']),
            ],
            'visual_assets': [],
            'speaker_notes': 'Keep this tied to measurable business movement.',
            'footnote': 'Evidence note: each analysis cycle upgrades future execution quality.',
            'duration_min': 1.2,
        },
        {
            'slide_no': 16,
            'slide_title': 'Data, Consumer Insights & Market Intelligence Stack',
            'objective': 'Show how data and intelligence are operationalized in planning and optimization.',
            'content_blocks': [
                b('inputs', 'Intelligence Inputs', bullets=['Search and social intent signals', 'Journey analytics and conversion telemetry', 'Competitive context and category trend tracking', 'Macro-demand and affordability signals']),
                b('decisions', 'How It Is Used', bullets=['Channel and budget weighting', 'Creative and offer refinement', 'Service-experience and retention optimization', 'Leadership reporting and decision checkpoints']),
            ],
            'visual_assets': [],
            'speaker_notes': 'This slide answers how data is used, not just collected.',
            'footnote': 'Sources integrated in recommendation section: DataReportal [6], World Bank [7], GSMA [8], Deloitte [9], PwC [10].',
            'duration_min': 1.1,
        },
        {
            'slide_no': 17,
            'slide_title': 'SECTION 03 | Notable Campaigns & Impact',
            'objective': 'Page breaker for Question 3.',
            'content_blocks': [b('breaker', 'Challenge • Creative/Execution Approach • Channels • Outcomes')],
            'visual_assets': [],
            'speaker_notes': 'Signal full case-study depth from updated portfolio.',
            'footnote': 'Section marker aligned to client request item 3.',
            'duration_min': 0.7,
        },
        {
            'slide_no': 18,
            'slide_title': 'Case 1 | Gerocare (2025–2026) — Health-Tech Performance Marketing',
            'objective': 'Show acquisition + visibility gains under attribution constraints.',
            'content_blocks': [
                b('challenge', 'Challenge', 'Needed nationwide awareness and qualified inquiries for elderly healthcare plans while attribution was constrained by backend integration limits.'),
                b('approach', 'Approach', bullets=['SEO optimization and keyword tracking', 'GA/Search Console behavioral monitoring', 'Meta funnel: Awareness + Traffic + WhatsApp']),
                b('outcome', 'Outcome', bullets=['Organic impressions improved 30–50%', 'Landing engagement efficiency improved 15–25%', 'Inbound inquiries increased 4–6x within budget guardrails']),
            ],
            'visual_assets': [logo('gerocare.png')],
            'speaker_notes': 'Lead with business problem, then show measured response.',
            'footnote': 'Portfolio evidence: Gerocare case pages (updated portfolio).',
            'duration_min': 1.5,
        },
        {
            'slide_no': 19,
            'slide_title': 'Case 2 | Halogen Security (2025–2026) — Enterprise Performance Campaigns',
            'objective': 'Show B2B demand generation in a trust-sensitive sector.',
            'content_blocks': [
                b('challenge', 'Challenge', 'Needed enterprise-grade qualified inquiries for security services while preserving brand authority in a high-trust category.'),
                b('approach', 'Approach', bullets=['Targeted paid media for enterprise audiences', 'Campaigns for services and cyber-training offers', 'Message framing around credibility and decision confidence']),
                b('outcome', 'Outcome', bullets=['Measurable growth in qualified B2B inquiries', 'Category-fit campaign positioning for risk-sensitive buyers']),
            ],
            'visual_assets': [logo('halogen.jpg')],
            'speaker_notes': 'Emphasize complexity: trust-intensive B2B funnel.',
            'footnote': 'Portfolio evidence: Halogen Security case page (updated portfolio).',
            'duration_min': 1.3,
        },
        {
            'slide_no': 20,
            'slide_title': 'Case 3 | Eatalia (2024–2025) — Digital Process Optimization',
            'objective': 'Demonstrate operational transformation + demand enablement.',
            'content_blocks': [
                b('challenge', 'Challenge', 'Website limitations, fragmented ordering operations, and weak digital engagement consistency.'),
                b('approach', 'Approach', bullets=['Built website and online ordering infrastructure', 'Implemented POS, inventory, and stock systems', 'Strengthened social content and brand consistency']),
                b('outcome', 'Outcome', bullets=['Order flow became more reliable and trackable', 'Manual errors reduced with real-time visibility', 'Digital footfall and convenience increased']),
            ],
            'visual_assets': [logo('eatalia.png')],
            'speaker_notes': 'Show blend of business operations and marketing execution.',
            'footnote': 'Portfolio evidence: Eatalia case page (updated portfolio).',
            'duration_min': 1.3,
        },
        {
            'slide_no': 21,
            'slide_title': 'Case 4 | Healthtracka (2023) — Social Conversion Recovery',
            'objective': 'Show turnaround on underperforming social channels.',
            'content_blocks': [
                b('challenge', 'Challenge', 'Underperforming Facebook, Instagram, and Twitter channels needed conversion recovery.'),
                b('approach', 'Approach', bullets=['Audience-aligned targeting on Meta and Twitter', 'Message architecture designed for stronger resonance', 'Creative optimization focused on trust and relevance']),
                b('outcome', 'Outcome', bullets=['Improved brand affinity and recall', 'Stronger conversion movement on previously weak channels']),
            ],
            'visual_assets': [logo('healthtracka.svg')],
            'speaker_notes': 'Treat this as performance triage and recovery.',
            'footnote': 'Portfolio evidence: Healthtracka social conversion case (updated portfolio).',
            'duration_min': 1.3,
        },
        {
            'slide_no': 22,
            'slide_title': 'Case 5 | Healthtracka (2023) — SEM / Display / Programmatic',
            'objective': 'Show multi-channel intent capture and funnel progression.',
            'content_blocks': [
                b('challenge', 'Challenge', 'Needed search and programmatic capability to convert high-intent audiences beyond social channels.'),
                b('approach', 'Approach', bullets=['Built SEM execution on Google ad platforms', 'Rolled out funnel sequencing to guide audience to conversion', 'Aligned trust messaging with category sensitivity']),
                b('outcome', 'Outcome', bullets=['Improved search-led visibility and intent capture', 'Stronger conversion consistency across channel mix']),
            ],
            'visual_assets': [logo('healthtracka.svg')],
            'speaker_notes': 'Differentiate this from slide 21 as a separate activation stream.',
            'footnote': 'Portfolio evidence: Healthtracka SEM/programmatic case (updated portfolio).',
            'duration_min': 1.3,
        },
        {
            'slide_no': 23,
            'slide_title': 'Case 6 | Zenith Bank (2023–2025) — Acquisition Efficiency',
            'objective': 'Show acquisition economics and promo execution effectiveness.',
            'content_blocks': [
                b('challenge', 'Challenge', 'Targeted minimum 2,000 new accounts through Beta Life promo activation.'),
                b('approach', 'Approach', bullets=['Promo-led social buzz and conversion push', 'Targeting and message sequencing for account opening intent']),
                b('outcome', 'Outcome', bullets=['Reported acquisition benchmark reached', 'Reported cost per new account: 750 naira']),
            ],
            'visual_assets': [logo('zenith.png')],
            'speaker_notes': 'Keep stated metrics exactly as portfolio wording.',
            'footnote': 'Portfolio evidence: Zenith Bank case (updated portfolio + radoss.agency/work).',
            'duration_min': 1.3,
        },
        {
            'slide_no': 24,
            'slide_title': 'Case 7 | Miva University (2025) — Integrated ATL/OOH Support',
            'objective': 'Show coordinated offline-digital planning with cost discipline.',
            'content_blocks': [
                b('challenge', 'Challenge', 'Early enrollment push required offline OOH to complement digital efforts.'),
                b('approach', 'Approach', bullets=['BRT branding route selection against target corridors', 'Offline and digital coordination against enrollment timeline']),
                b('outcome', 'Outcome', bullets=['Visibility improved in high-value routes', 'Reported lower OOH campaign cost profile']),
            ],
            'visual_assets': [logo('miva.png')],
            'speaker_notes': 'Demonstrate integrated planning across channels.',
            'footnote': 'Portfolio evidence: Miva University case (updated portfolio + radoss.agency/work).',
            'duration_min': 1.3,
        },
        {
            'slide_no': 25,
            'slide_title': 'Case 8 | Bracken (2022–2024) — Ad-Tech Execution Support',
            'objective': 'Show subcontract delivery strength and multi-client campaign execution.',
            'content_blocks': [
                b('challenge', 'Challenge', 'Bracken subcontracted social ad execution for client portfolios including Palmpay.'),
                b('approach', 'Approach', bullets=['Data-driven paid media implementation', 'Cross-client execution governance and delivery continuity']),
                b('outcome', 'Outcome', bullets=['Brand awareness improvements across subcontracted accounts', 'Expanded audience engagement footprint across campaigns']),
            ],
            'visual_assets': [logo('bracken.png'), logo('palmpay.jpg')],
            'speaker_notes': 'Position this as reliability and execution-at-scale evidence.',
            'footnote': 'Portfolio evidence: Bracken case with Palmpay mention (updated portfolio).',
            'duration_min': 1.3,
        },
        {
            'slide_no': 26,
            'slide_title': 'Case 9 | HippoAds (2023–2024) — Multi-Placement Social Campaign Management',
            'objective': 'Show placement-level execution breadth and campaign management rigor.',
            'content_blocks': [
                b('challenge', 'Challenge', 'Needed reliable campaign implementation across diverse social placements for subcontracted client portfolios.'),
                b('approach', 'Approach', bullets=['Facebook Mobile, Feed, Stories, Audience Network', 'Instagram Feed and Stories execution', 'Placement-level continuity management']),
                b('outcome', 'Outcome', bullets=['Comprehensive placement coverage achieved', 'Engagement and reach objectives supported through structured deployment']),
            ],
            'visual_assets': [logo('hippoads.jpg')],
            'speaker_notes': 'Use this to show operational depth in campaign management.',
            'footnote': 'Portfolio evidence: HippoAds case (updated portfolio).',
            'duration_min': 1.3,
        },
        {
            'slide_no': 27,
            'slide_title': 'Cross-Case Impact Synthesis',
            'objective': 'Synthesize common impact patterns from all case studies.',
            'content_blocks': [
                b('patterns', 'Observed Impact Patterns', bullets=['Acquisition efficiency improvement', 'Operational friction reduction', 'Execution reliability and continuity', 'Brand visibility and engagement lift']),
                b('insight', 'Strategic Read', 'Consistent gains come from connecting strategy, execution, and systems instead of running channels in isolation.'),
            ],
            'visual_assets': [
                logo('gerocare.png'), logo('halogen.jpg'), logo('eatalia.png'), logo('healthtracka.svg'),
                logo('zenith.png'), logo('miva.png'), logo('bracken.png'), logo('hippoads.jpg'), logo('indomie.svg'),
            ],
            'speaker_notes': 'This is the bridge from evidence to recommendation.',
            'footnote': 'Synthesis is drawn from all portfolio case studies in this deck.',
            'duration_min': 1.2,
        },
        {
            'slide_no': 28,
            'slide_title': 'SECTION 04 | Working with Radoss.',
            'objective': 'Introduce Mandilas-specific strategic recommendation block.',
            'content_blocks': [b('breaker', 'Industry Signals • Consumer Insight • M-C-I-A Actions • Quick Wins')],
            'visual_assets': [],
            'speaker_notes': 'Transition from historical proof into forward model.',
            'footnote': 'Recommendation section grounded in trusted public sources + portfolio delivery evidence.',
            'duration_min': 0.7,
        },
        {
            'slide_no': 29,
            'slide_title': 'Mandilas Context | Opportunity Map',
            'objective': 'Frame Mandilas operating reality from publicly verifiable signals.',
            'content_blocks': [
                b('context', 'Public Context Signals', bullets=[
                    'Mandilas positioned publicly as a heritage Nigerian business with long operating history [1]',
                    'Social/public channels indicate operations across mobility and engineering service touchpoints [2][3][4]',
                    'Toyota dealer listing confirms service footprint and aftersales relevance [5]',
                    'Official website reconstruction presents digital front-door redesign opportunity [4]',
                ]),
                b('implication', 'Strategic Implication', bullets=[
                    'Unify brand narrative across channels and service lines',
                    'Build a conversion-centric digital entry point for inquiries, bookings, and service lifecycle',
                    'Prioritize trust, response speed, and service continuity as growth levers',
                ]),
            ],
            'visual_assets': [f'file://{ASSETS / "mandilas-logo.png"}'],
            'speaker_notes': 'Stay anchored to evidence that can be defended in-room.',
            'footnote': 'Citations: [1]-[5]. Recommendations infer from these public signals.',
            'duration_min': 1.7,
        },
        {
            'slide_no': 30,
            'slide_title': 'Consumer Behaviour & Industry Signals (Nigeria / SSA)',
            'objective': 'Use trusted market signals to shape practical recommendations.',
            'content_blocks': [
                b('signals', 'Key Signals', bullets=[
                    f'Nigeria: {mobile} mobile connections, {internet} internet users, {social} social identities in 2025 [6]',
                    f'Population ~{pop}; urban population ~{wb["SP.URB.TOTL.IN.ZS"]["value"]:.1f}% ({wb["SP.URB.TOTL.IN.ZS"]["year"]}) [7]',
                    f'Inflation ~{wb["FP.CPI.TOTL.ZG"]["value"]:.1f}% ({wb["FP.CPI.TOTL.ZG"]["year"]}) reinforces value sensitivity [7]',
                    'SSA connectivity usage gap remains large while adoption rises through 2030 [8]',
                ]),
                b('implications', 'Mandilas-Relevant Implications', bullets=[
                    'Mobile-first discovery and service access are mandatory',
                    'Trust and service responsiveness materially influence conversion',
                    'Retention programs must balance reliability, value, and affordability',
                ]),
            ],
            'visual_assets': [],
            'speaker_notes': 'Use this as decision context, not generic market trivia.',
            'footnote': 'Sources: DataReportal [6], World Bank [7], GSMA [8].',
            'duration_min': 1.7,
        },
        {
            'slide_no': 31,
            'slide_title': 'Mandilas Opportunity Areas | Sector-Fit Strategic Lens',
            'objective': 'Translate external insights into concrete priority domains.',
            'content_blocks': [
                b('mobility', 'Mobility / Aftersales Opportunity', bullets=['Digital service booking and quote requests', 'Service reminder and retention lifecycle automation', 'Category-specific landing pages by vehicle/service need']),
                b('engineering', 'Engineering / Enterprise Services Opportunity', bullets=['B2B lead qualification and account-routing model', 'Consultative content and proof-led case storytelling', 'Relationship marketing with WhatsApp-assisted service follow-through']),
                b('consumer', 'Consumer Decision Signals', bullets=['Higher digital research behavior before purchase/service [9]', 'Value-conscious purchasing behavior under inflation pressure [7][10]', 'Preference for convenience and speed in service journeys [10]']),
            ],
            'visual_assets': [f'file://{ASSETS / "mandilas-logo.png"}'],
            'speaker_notes': 'This is where market data becomes business opportunity choices.',
            'footnote': 'Sources: Deloitte [9], World Bank [7], PwC [10].',
            'duration_min': 1.7,
        },
        {
            'slide_no': 32,
            'slide_title': 'Working with Radoss | M-C-I-A Applied to Mandilas',
            'objective': 'Present practical phase plan with outputs and decision gates.',
            'content_blocks': [
                b('map', 'M | Map (Weeks 1-4)', bullets=['Demand and category diagnosis by business line', 'Channel and competitor gap map', 'KPI baseline + risk register']),
                b('connect', 'C | Connect (Weeks 5-8)', bullets=['Segmented journeys: retail, fleet, enterprise', 'Message architecture by intent stage', 'WhatsApp-integrated response workflows']),
                b('implement_analyse', 'I + A | Implement/Analyse (Weeks 9-16)', bullets=['Pilot activations with instrumentation', 'Dashboard and attribution governance', 'Optimization and scale decisions']),
            ],
            'visual_assets': [],
            'speaker_notes': 'Keep this concrete and owner-oriented.',
            'footnote': 'Output at phase end: strategy map, activation blueprint, KPI cockpit, next-quarter scale plan.',
            'duration_min': 1.4,
        },
        {
            'slide_no': 33,
            'slide_title': 'Quick Wins (First 90-120 Days) | Partnership Operating Model',
            'objective': 'Provide immediate-value initiatives and governance rhythm.',
            'content_blocks': [
                b('quickwins', 'Quick Wins', bullets=[
                    'Unified inbound capture for Toyota/Carrier/service inquiries',
                    'High-intent landing pages for service and quote conversion',
                    'WhatsApp reminder and follow-up automation for retention uplift',
                    'Performance dashboard linking spend to inquiries, bookings, and closed outcomes',
                ]),
                b('cadence', 'Operating Rhythm', bullets=['Weekly execution check-ins', 'Bi-weekly optimization gates', 'Monthly leadership steering reviews']),
            ],
            'visual_assets': [],
            'speaker_notes': 'Anchor this slide as practical value realization plan.',
            'footnote': 'Execution principle: fast pilots, tight measurement, deliberate scale.',
            'duration_min': 1.5,
        },
        {
            'slide_no': 34,
            'slide_title': 'Governance, Reporting & KPI Model',
            'objective': 'Define accountability, reporting layers, and performance scorecards.',
            'content_blocks': [
                b('governance', 'Governance Structure', bullets=['Executive sponsor alignment', 'Campaign and ops owners with clear responsibilities', 'Escalation and risk protocols']),
                b('kpi', 'KPI Categories', bullets=['Demand: qualified inquiries / lead quality', 'Conversion: booking-to-close rates', 'Efficiency: CAC/CPL and channel productivity', 'Retention: repeat service and lifecycle value']),
            ],
            'visual_assets': [],
            'speaker_notes': 'This closes the loop on execution credibility.',
            'footnote': 'Reporting layers: weekly operator view, monthly leadership view, quarterly strategy review.',
            'duration_min': 1.2,
        },
        {
            'slide_no': 35,
            'slide_title': 'References & Citations',
            'objective': 'Provide source transparency for research and recommendation slides.',
            'content_blocks': [
                b('refs', 'Source List', bullets=[
                    '[1] https://www.linkedin.com/company/mandilas-group',
                    '[2] https://www.instagram.com/mandilasgroup/',
                    '[3] https://www.facebook.com/MandilasGroup/',
                    '[4] https://www.mandilasng.com/',
                    '[5] https://toyotanigeria.com/dealers/mandilas-enterprises-ltd/',
                    '[6] https://datareportal.com/reports/digital-2025-nigeria',
                    '[7] World Bank API: SP.URB.TOTL.IN.ZS | FP.CPI.TOTL.ZG | NY.GDP.MKTP.KD.ZG',
                    '[8] https://www.gsma.com/solutions-and-impact/connectivity-for-good/mobile-economy/sub-saharan-africa-2024/',
                    '[9] https://www.deloitte.com/us/en/insights/industry/automotive/global-automotive-consumer-study.html',
                    '[10] https://www.pwc.com/gx/en/consumer-markets/consumer-insights-survey.html',
                    f'[11] {UPDATED_PORTFOLIO}',
                    f'[12] {LEGACY_PORTFOLIO}',
                ]),
            ],
            'visual_assets': [],
            'speaker_notes': 'Keep this visible for defensible Q&A.',
            'footnote': 'All recommendations trace to public sources or supplied portfolio artifacts.',
            'duration_min': 0.8,
        },
        {
            'slide_no': 36,
            'slide_title': 'Contact & Next Steps',
            'objective': 'Close with clear contact channels and partnership handoff.',
            'content_blocks': [
                b('contact', 'Radoss Contact Channels', bullets=[
                    'Website: https://radoss.agency',
                    'Website: https://radossdigital.com',
                    'Email: hello@radossdigital.com',
                    'Phone: +234 703 382 7657 | +234 813 659 1585',
                    'Location: Lagos, Nigeria',
                ]),
                b('close', 'Thank You', bullets=['Ready for Q&A and deeper implementation discussion.']),
            ],
            'visual_assets': [logo('radoss.png'), f'file://{ASSETS / "mandilas-logo.png"}'],
            'speaker_notes': 'End with clarity and ease of follow-up.',
            'footnote': 'Final page intentionally includes contact, websites, and email channels.',
            'duration_min': 0.7,
        },
    ]

    total = sum(x['duration_min'] for x in slides)
    assert abs(total - 45.0) < 1e-6, total
    return slides


def main():
    inv = []
    for u in RADOSS_URLS + MANDILAS_URLS + RESEARCH_URLS:
        try:
            inv.append(scrape(u))
        except Exception as e:
            inv.append({
                'url': u,
                'domain': urlparse(u).netloc,
                'page_type': page_type(u),
                'title': '',
                'meta_description': f'ERROR: {e}',
                'h1': [],
                'h2': [],
                'bullets': [],
                'image_alt_entities': [],
                'last_seen_utc': NOW,
            })

    # Local source provenance and route fallbacks
    inv.extend([
        {
            'url': 'https://radoss.agency/approach/mcia-strategic-framework',
            'domain': 'radoss.agency',
            'page_type': 'framework_local_fallback',
            'title': 'M-C-I-A Strategic Framework | Local source fallback',
            'meta_description': 'Pulled from local src/app route because live route may return 404 shell.',
            'h1': ['The M-C-I-A Strategic Framework'],
            'h2': [],
            'bullets': ['Map', 'Connect', 'Implement', 'Analyse'],
            'image_alt_entities': [],
            'last_seen_utc': NOW,
        },
        {
            'url': 'https://radoss.agency/solutions',
            'domain': 'radoss.agency',
            'page_type': 'solution_index_local_fallback',
            'title': 'Radoss Solutions | Local source fallback',
            'meta_description': 'Pulled from local src/app route because live route may return 404 shell.',
            'h1': ['Solutions Built for Growth'],
            'h2': [],
            'bullets': ['Radoss Digital', 'Pay Meta Ads in Naira', 'WABAR API', 'Digital Maturity Assessment'],
            'image_alt_entities': [],
            'last_seen_utc': NOW,
        },
        {
            'url': f'file://{UPDATED_PORTFOLIO}',
            'domain': 'localfile',
            'page_type': 'updated_portfolio_pdf',
            'title': 'Radoss Portfolio.pdf (Updated)',
            'meta_description': 'Updated portfolio attachment used for complete case-study expansion and brand matrix.',
            'h1': ['Portfolio', 'Team Profile', 'Case Studies'],
            'h2': ['The Nexus of Business, Marketing & Technology'],
            'bullets': ['Gerocare', 'Halogen Security', 'Eatalia', 'Healthtracka', 'Zenith Bank', 'Miva University', 'Bracken', 'HippoAds'],
            'image_alt_entities': ['Uchenna Innocent', 'Ebere Agbaje'],
            'last_seen_utc': NOW,
        },
        {
            'url': f'file://{LEGACY_PORTFOLIO}',
            'domain': 'localfile',
            'page_type': 'legacy_portfolio_pdf',
            'title': 'Radoss Portfolio.pdf (Legacy)',
            'meta_description': 'Legacy portfolio retained for brand continuity reference.',
            'h1': ['Portfolio', 'Case Studies'],
            'h2': ['Brand continuity reference'],
            'bullets': ['Continuity baseline'],
            'image_alt_entities': [],
            'last_seen_utc': NOW,
        },
    ])

    wb = world_bank_snapshot()
    claims = build_claims(wb)
    manifest = build_manifest(wb)

    (OUT / 'source_inventory.json').write_text(json.dumps(inv, indent=2, ensure_ascii=False), encoding='utf-8')
    (OUT / 'claims_registry.json').write_text(json.dumps(claims, indent=2, ensure_ascii=False), encoding='utf-8')
    (OUT / 'slide_manifest.json').write_text(json.dumps(manifest, indent=2, ensure_ascii=False), encoding='utf-8')

    print('wrote source_inventory.json records:', len(inv))
    print('wrote claims_registry.json claims:', len(claims))
    print('wrote slide_manifest.json slides:', len(manifest))
    print('total duration:', sum(x['duration_min'] for x in manifest))


if __name__ == '__main__':
    main()
