import { InterventionItem } from '../types';

export const interventionData: Record<string, InterventionItem> = {
  advisory: {
    key: 'advisory',
    title: 'Business Advisory',
    iconType: 'target',
    overview: 'Comprehensive expert consulting designed to diagnose operational bottlenecks, restructure cash flows, and ensure full statutory and corporate compliance.',
    items: [
      'Business diagnostics & baseline health checks',
      'Strategic roadmap and growth milestone planning',
      'Working capital & cashflow optimization',
      'Corporate governance and board structure advisory',
      'Human Resources (HR) policy and labor compliance',
      'SARS tax advisory and compliance status maintenance',
      'Legal advisory, contract review, and risk mitigation'
    ],
    deliverables: 'Advisory report, compliance health certificate, and structured financial restructuring plan.'
  },
  planning: {
    key: 'planning',
    title: 'Business Planning',
    iconType: 'pie',
    overview: 'Professional drafting and financial modeling services to make your enterprise fully investment-ready for venture capital, debt funding, or corporate supplier development.',
    items: [
      'Formal Business Plan drafting and strategic narrative',
      'Advanced financial modelling and 3-5 year projections',
      'Executive pitch deck creation and design',
      'Market research and competitive landscape analysis',
      'Investment readiness audit and funding application packaging'
    ],
    deliverables: 'Bank-ready Business Plan document, Excel financial model, and investor pitch deck.'
  },
  technical: {
    key: 'technical',
    title: 'Technical Assistance',
    iconType: 'box',
    overview: 'Hands-on engineering, product testing, and compliance certification support to elevate product quality to commercial and export standards.',
    items: [
      'Product research, prototyping, and development',
      'Rigorous laboratory product testing and safety audits',
      'Industry standard certifications (e.g., SABS, ISO)',
      'Packaging design, labeling, and barcoding',
      'Brand identity design and packaging optimization',
      'Intellectual Property (IP) patent and trademark registration',
      'Quality assurance framework implementation'
    ],
    deliverables: 'Certified product readiness status, trademark certificates, and retail-ready packaging.'
  },
  skills: {
    key: 'skills',
    title: 'Skills Development',
    iconType: 'lightbulb',
    overview: 'Targeted digital and technical training programmes delivered via our integrated LMS to upskill entrepreneurs and their core teams.',
    items: [
      'Entrepreneurship fundamentals and leadership training',
      'Financial Literacy for non-financial managers',
      'Export Readiness and Digital Skills',
      'Workflow automation training',
      'Modern Marketing, digital acquisition, and sales funnels',
      'Procurement bidding, tendering, and supply chain execution',
      'Manufacturing efficiency and project management'
    ],
    deliverables: 'Accredited digital completion certificates and verified CPD/skills credits.'
  },
  incubation: {
    key: 'incubation',
    title: 'Incubation',
    iconType: 'building',
    overview: 'Access to physical co-working spaces, virtual innovation hubs, and specialized technology accelerators to fast-track early-stage growth.',
    items: [
      'Physical incubation facilities (office space, meeting rooms)',
      'Virtual incubation for remote digital enterprises',
      'High-intensity accelerator and scale-up cohorts',
      'Specialized innovation hubs for tech and manufacturing',
      'Advanced technology support and lab equipment access'
    ],
    deliverables: 'Incubation tenure agreement, co-working access pass, and accelerator graduation badge.'
  },
  mentorship: {
    key: 'mentorship',
    title: 'Mentorship',
    iconType: 'users',
    overview: 'Pairing enterprise founders with seasoned industry veterans, retired executives, and subject matter experts for 1-on-1 guidance.',
    items: [
      'Intelligent sector-based mentor allocation',
      'Executive leadership mentorship and strategic sparring',
      'Regular one-on-one coaching sessions and milestone reviews',
      'Network introductions to industry leaders and corporate buyers'
    ],
    deliverables: 'Assigned mentor profile, monthly progress log, and executive guidance plan.'
  },
  digital: {
    key: 'digital',
    title: 'Digital Enabling',
    iconType: 'laptop',
    overview: 'Digital transformation services empowering traditional businesses with modern web presence, e-commerce, and cloud tools.',
    items: [
      'Professional responsive website development',
      'E-commerce storefront setup and payment gateway integration',
      'Cloud software tools advisory (accounting, CRM, inventory)',
      'Automated business workflows and client onboarding systems'
    ],
    deliverables: 'Live functional website/e-commerce store and operational digital software stack.'
  },
  recommendation: {
    key: 'recommendation',
    title: 'Capability Recommendation Engine',
    iconType: 'sun',
    overview: 'Our automated gap analysis tool evaluates your Needs Assessment and enterprise data to identify specific capability gaps and intelligently map them to the correct interventions.',
    items: [
      'Enterprise needs assessment evaluation',
      'Automated capability gap analysis',
      'Intelligent programme mapping',
      'Intervention matching with accredited service providers'
    ],
    deliverables: 'Automated gap analysis report and a tailored intervention roadmap.'
  },
  provider: {
    key: 'provider',
    title: 'Provider Directory',
    iconType: 'grid',
    overview: 'Directly connect with accredited industry service providers, development agencies, and experts who deliver the necessary capability-building services.',
    items: [
      'Government entity partnerships',
      'Private sector partner network',
      'Incubator and university connections',
      'Professional service provider database'
    ],
    deliverables: 'Direct access to vetted service providers aligned with your intervention plan.'
  },
  calendar: {
    key: 'calendar',
    title: 'Training Calendar',
    iconType: 'calendar',
    overview: 'View and schedule upcoming cohort intake dates, live webinars, masterclasses, and assigned intervention sessions in one centralized location.',
    items: [
      'Cohort intake schedules',
      'Live webinar and masterclass dates',
      'One-on-one coaching schedules',
      'Important application deadlines'
    ],
    deliverables: 'Synchronized personal training schedule and proactive event notifications.'
  },
  dashboard: {
    key: 'dashboard',
    title: 'Progress Dashboard',
    iconType: 'activity',
    overview: 'A comprehensive interface offering real-time status tracking across your entire capability journey, from application submission to graduation.',
    items: [
      'Live application status tracking (In Progress, Approved, Completed)',
      'Training milestone monitoring',
      'Attendance and module completion tracking',
      'Mentor utilisation and feedback surveys'
    ],
    deliverables: 'Comprehensive visual dashboard displaying your enterprise\'s capability growth.'
  },
  mentormatching: {
    key: 'mentormatching',
    title: 'Mentor Matching',
    iconType: 'circles',
    overview: 'Connect directly with certified industry specialists and coaches allocated to your growth plan.',
    customType: 'mentormatching',
    deliverables: 'Personalised mentor matching profile and advisory tracking schedule.'
  },
  lms: {
    key: 'lms',
    title: 'Digital Learning Management System (LMS)',
    iconType: 'monitor',
    overview: 'Actionable online learning modules with progress tracking and digital certificate generation.',
    customType: 'lms',
    deliverables: 'Accredited digital completion certificates and trackable module completion.'
  },
  supplier_profile: {
    key: 'supplier_profile',
    title: 'Create Enterprise Profile',
    iconType: 'file-text',
    overview: 'Complete a comprehensive enterprise assessment to be officially listed on the platform\'s marketplace. Submit your business capabilities, product catalog, compliance status, and B-BBEE credentials.',
    items: [
      'Detailed Enterprise Assessment Questionnaire',
      'Upload product catalogs and service sheets',
      'Upload ISO and quality certifications',
      'Submit B-BBEE Certificate or Affidavit',
      'Declare ownership criteria (Women, Youth, Disability)'
    ],
    deliverables: 'Verified marketplace listing visible to matching corporate and government buyers.'
  },
  supplier_matching: {
    key: 'supplier_matching',
    title: 'Smart Matching',
    iconType: 'shield-check',
    overview: 'Our matching engine actively aligns your verified profile with active buyer requirements, corporate tenders, and relevant opportunity alerts.',
    items: [
      'Automated Buyer Matching algorithms',
      'Real-time opportunity and tender alerts',
      'Expression of Interest (EOI) submission tracking',
      'Visibility metrics for buyer reviews'
    ],
    deliverables: 'Match found notification and direct opportunity shortlisting.'
  },
  supplier_contract: {
    key: 'supplier_contract',
    title: 'Secure Contracts & Grow',
    iconType: 'award',
    overview: 'Respond to active proposals, formalize buyer relationships, and scale your commercial revenue through transparent contract execution.',
    items: [
      'Award opportunity notifications',
      'Digital contract formalization and workflow',
      'Performance rating and feedback tracking',
      'Seamless transition to Access to Capital module'
    ],
    deliverables: 'Signed commercial contract and unlocked access to funding applications.'
  },
  buyer_publish: {
    key: 'buyer_publish',
    title: 'Publish RFQs & Tenders',
    iconType: 'file-text',
    overview: 'Easily post your procurement specifications, required volumes, and strict local content criteria to instantly reach a pool of verified SMMEs.',
    items: [
      'Centralized opportunity board management',
      'Tender board publishing for Government & Corporate',
      'Automated supplier matching notifications',
      'Custom capability requirement setting'
    ],
    deliverables: 'Live tender listing and automated initial supplier screening.'
  },
  buyer_search: {
    key: 'buyer_search',
    title: 'Search Verified Database',
    iconType: 'search',
    overview: 'Filter our pre-vetted SMME database by B-BBEE level, ownership criteria, industry sector, and verified capacity metrics.',
    items: [
      'Full supplier directory access',
      'B-BBEE Level and ownership compliance filtering',
      'Geographic and rural distribution filtering',
      'Capacity and Certification verification checking'
    ],
    deliverables: 'Curated shortlist of compliant, capable, and verified local suppliers.'
  },
  buyer_track: {
    key: 'buyer_track',
    title: 'Track ESD Impact',
    iconType: 'activity',
    overview: 'Award contracts, monitor supplier delivery performance, and generate comprehensive reports on preferential procurement and transformation spend.',
    items: [
      'Live contract value tracking',
      'Delivery tracking, invoices, and purchase orders',
      'Transformation spend and Jobs created metrics',
      'Supplier performance rating and feedback loops'
    ],
    deliverables: 'Comprehensive Enterprise and Supplier Development (ESD) impact reports.'
  },
  smart_verified: {
    key: 'smart_verified',
    title: 'Verified Suppliers',
    iconType: 'shield-check',
    overview: 'To ensure absolute buyer confidence, all active profiles undergo rigorous validation before they can respond to tenders or appear in searches.',
    items: [
      'CIPC Company Registration validation',
      'SARS Tax Compliance Status checking',
      'B-BBEE Certificate or Sworn Affidavit validation',
      'Ownership Declaration and Identity verification'
    ],
    deliverables: "Official 'Verified Supplier' portal badge ensuring buyer trust."
  },
  smart_metrics: {
    key: 'smart_metrics',
    title: 'SA Compliance Metrics',
    iconType: 'bar-chart',
    overview: 'The engine matches suppliers intelligently based on highly specific compliance goals such as B-BBEE status, local content percentage, and specific ownership criteria.',
    items: [
      'Women-owned Business weighting',
      'Youth-owned Business tracking',
      'Disability and Rural enterprise identification',
      'Sector performance and capacity alignment'
    ],
    deliverables: 'Precision-matched supplier scoring based on South African transformation goals.'
  },
  smart_routing: {
    key: 'smart_routing',
    title: 'Automated RFQ Routing',
    iconType: 'zap',
    overview: 'Instant notification dispatch ensures that fully qualified, matching suppliers are alerted the second your tender specifications are published.',
    items: [
      'Real-time new opportunity alerts',
      'Direct buyer invitations and EOIs',
      'Automated tender deadline reminders',
      'Match found notifications and analytics'
    ],
    deliverables: 'Real-time email and dashboard alerts keeping suppliers and buyers synchronized.'
  },
  market_corp: {
    key: 'market_corp',
    title: 'Corporate Procurement',
    iconType: 'briefcase',
    overview: 'Connect directly with major corporates seeking qualified local suppliers to fulfill their Enterprise and Supplier Development (ESD) scorecards.',
    items: [
      'Logistics, Transport, and Facilities Management',
      'IT, Engineering, and Professional Services',
      'Corporate supply chain integration pipelines',
      'Direct matching for Enterprise Development programs'
    ],
    deliverables: 'Direct access to corporate buyer directories and private RFQ opportunities.'
  },
  'opp-corporate': {
    key: 'opp-corporate',
    title: 'Corporate Procurement',
    iconType: 'briefcase',
    overview: 'Connect directly with major corporates seeking qualified local suppliers to fulfill their Enterprise and Supplier Development (ESD) scorecards.',
    items: [
      'Logistics, Transport, and Facilities Management',
      'IT, Engineering, and Professional Services',
      'Corporate supply chain integration pipelines',
      'Direct matching for Enterprise Development programs'
    ],
    deliverables: 'Direct access to corporate buyer directories and private RFQ opportunities.'
  },
  market_gov: {
    key: 'market_gov',
    title: 'Government Procurement',
    iconType: 'landmark',
    overview: 'Access public sector tender opportunities and state procurement channels perfectly matched to your enterprise\'s capabilities.',
    items: [
      'Centralized tender board access',
      'State-owned entity (SOE) procurement',
      'Municipal and provincial contract alerts',
      'Compliance checking for state bidding rules'
    ],
    deliverables: 'Consolidated dashboard of active government tenders and matching scores.'
  },
  'opp-govt': {
    key: 'opp-govt',
    title: 'Government Procurement',
    iconType: 'landmark',
    overview: 'Access public sector tender opportunities and state procurement channels perfectly matched to your enterprise\'s capabilities.',
    items: [
      'Centralized tender board access',
      'State-owned entity (SOE) procurement',
      'Municipal and provincial contract alerts',
      'Compliance checking for state bidding rules'
    ],
    deliverables: 'Consolidated dashboard of active government tenders and matching scores.'
  },
  market_export: {
    key: 'market_export',
    title: 'Export Markets',
    iconType: 'globe',
    overview: 'Take your business global. Explore international trade missions, gain export readiness support, and connect with cross-border buyers.',
    items: [
      'Market intelligence & Country profiles',
      'Tariff information & Trade agreements advisory',
      'Export finance, insurance, and logistics partners',
      'Trade missions & Virtual exhibitions access'
    ],
    deliverables: 'Export readiness assessment and international buyer matchmaking.'
  },
  'opp-export': {
    key: 'opp-export',
    title: 'Export Markets',
    iconType: 'globe',
    overview: 'Take your business global. Explore international trade missions, gain export readiness support, and connect with cross-border buyers.',
    items: [
      'Market intelligence & Country profiles',
      'Tariff information & Trade agreements advisory',
      'Export finance, insurance, and logistics partners',
      'Trade missions & Virtual exhibitions access'
    ],
    deliverables: 'Export readiness assessment and international buyer matchmaking.'
  }
};
