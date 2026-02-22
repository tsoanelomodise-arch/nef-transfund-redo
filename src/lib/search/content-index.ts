// Comprehensive content index for the SA Transformation Fund website
import { SearchableContent } from './types';

const currentDate = new Date().toISOString().split('T')[0];

export const searchableContent: SearchableContent[] = [
  // ============================================
  // FAQs - Highest priority for direct answers
  // ============================================
  {
    id: 'faq-what-is-fund',
    type: 'faq',
    title: 'What is the Transformation Fund?',
    description: "South Africa's national platform pooling resources for inclusive economic growth",
    content: "The Transformation Fund is South Africa's national platform that pools resources from government, corporates, and development finance institutions to create systemic impact for inclusive economic growth. It provides bundled support - capital, capability development, and market access - to empowered enterprises.",
    url: '/faq',
    anchor: 'faq-0',
    category: 'general',
    audience: ['entrepreneurs', 'corporates', 'government', 'investors', 'general'],
    keywords: ['what is', 'transformation fund', 'about', 'overview', 'definition', 'purpose', 'mission'],
    priority: 5,
    lastUpdated: currentDate,
  },
  {
    id: 'faq-who-benefits',
    type: 'faq',
    title: 'Who can benefit from the Transformation Fund?',
    description: 'Eligibility for black-owned SMMEs and entrepreneurs',
    content: "The Fund primarily supports black-owned SMMEs and entrepreneurs across various sectors. It targets businesses at different stages - from early-stage startups needing seed capital to growth-stage enterprises requiring scale-up funding and market access.",
    url: '/faq',
    anchor: 'faq-1',
    category: 'eligibility',
    audience: ['entrepreneurs', 'general'],
    keywords: ['eligibility', 'who qualifies', 'requirements', 'black-owned', 'SMME', 'entrepreneurs', 'startups', 'beneficiaries'],
    priority: 5,
    lastUpdated: currentDate,
  },
  {
    id: 'faq-difference-bbbee',
    type: 'faq',
    title: 'How does the Fund differ from traditional B-BBEE programs?',
    description: 'Coordinated national approach vs fragmented compliance programs',
    content: "Unlike fragmented B-BBEE compliance programs, the Transformation Fund coordinates resources at a national level, bundles capital with capability development and market access, and measures real transformation outcomes rather than just compliance. It creates network effects that amplify impact across the entire ecosystem.",
    url: '/faq',
    anchor: 'faq-2',
    category: 'governance',
    audience: ['corporates', 'government', 'general'],
    keywords: ['B-BBEE', 'BBBEE', 'BEE', 'difference', 'compliance', 'traditional', 'programs', 'compared'],
    priority: 4,
    lastUpdated: currentDate,
  },
  {
    id: 'faq-support-types',
    type: 'faq',
    title: 'What types of support does the Fund provide?',
    description: 'Three pillars: Capital, Capability, and Market Access',
    content: "The Fund provides three pillars of support: Access to Capital (grants, loans, equity, and blended finance), Access to Capability (business development, technical training, and mentorship), and Access to Markets (procurement linkages and supply chain integration).",
    url: '/faq',
    anchor: 'faq-3',
    category: 'support',
    audience: ['entrepreneurs', 'general'],
    keywords: ['support', 'types', 'capital', 'capability', 'markets', 'grants', 'loans', 'equity', 'training', 'mentorship', 'funding types'],
    priority: 5,
    lastUpdated: currentDate,
  },
  {
    id: 'faq-company-contribute',
    type: 'faq',
    title: 'How can my company contribute to the Fund?',
    description: 'Corporate contribution through ED/SD budgets',
    content: "Corporates can contribute through their Enterprise and Supplier Development (ED/SD) budgets, which can be pooled into the Fund. This allows companies to meet B-BBEE requirements while creating greater systemic impact through coordinated deployment of resources.",
    url: '/faq',
    anchor: 'faq-4',
    category: 'funding',
    audience: ['corporates', 'investors'],
    keywords: ['contribute', 'corporate', 'company', 'ED/SD', 'enterprise development', 'supplier development', 'donate', 'invest'],
    priority: 4,
    lastUpdated: currentDate,
  },
  {
    id: 'faq-transformation-index',
    type: 'faq',
    title: 'What is the Transformation Index?',
    description: 'Data platform measuring transformation outcomes',
    content: "The Transformation Index is a comprehensive data platform that continuously measures, aggregates, and reports on transformation outcomes across the ecosystem. It tracks metrics like jobs created, revenue generated, black ownership percentages, women participation, and youth employment - providing real-time visibility into impact.",
    url: '/faq',
    anchor: 'faq-5',
    category: 'impact',
    audience: ['corporates', 'government', 'investors', 'general'],
    keywords: ['transformation index', 'metrics', 'measurement', 'impact', 'data', 'outcomes', 'tracking', 'reporting'],
    priority: 4,
    lastUpdated: currentDate,
  },
  {
    id: 'faq-how-apply',
    type: 'faq',
    title: 'How do I apply for support from the Fund?',
    description: 'Application process through online portal',
    content: "Applications can be submitted through our online portal. Visit online.sa-transformationfund.co.za to register and submit your application. You'll need to provide information about your business, funding needs, and transformation objectives.",
    url: '/faq',
    anchor: 'faq-6',
    category: 'application',
    audience: ['entrepreneurs', 'general'],
    keywords: ['apply', 'application', 'how to apply', 'submit', 'portal', 'register', 'process', 'steps'],
    priority: 5,
    lastUpdated: currentDate,
  },

  // ============================================
  // Policy & Governance Sections
  // ============================================
  {
    id: 'policy-choice',
    type: 'policy',
    title: 'The Policy Choice',
    description: 'Bold intervention to accelerate transformation through pooled resources',
    content: "The Transformation Fund represents a policy choice to create a bold, coordinated intervention that accelerates transformation through pooled resources and shared accountability. It addresses the fragmentation problem where multiple agencies and corporates work in isolation.",
    url: '/about/why#policy-choice',
    category: 'governance',
    audience: ['government', 'corporates', 'general'],
    keywords: ['policy', 'governance', 'intervention', 'strategy', 'approach', 'coordination', 'pooled resources'],
    priority: 4,
    lastUpdated: currentDate,
  },
  {
    id: 'policy-funding-sources',
    type: 'policy',
    title: 'Funding Sources',
    description: 'How the Fund is financed through government and corporate contributions',
    content: "Funding sources include government appropriations, development finance institutions, corporate Enterprise and Supplier Development (ED/SD) contributions, and private sector investments. This blended approach creates a substantial capital base for transformation initiatives.",
    url: '/about/why#policy-choice',
    anchor: 'funding-sources',
    category: 'funding',
    audience: ['government', 'corporates', 'investors'],
    keywords: ['funding sources', 'finance', 'money', 'capital', 'budget', 'contributions', 'government funding'],
    priority: 4,
    lastUpdated: currentDate,
  },
  {
    id: 'policy-governance',
    type: 'policy',
    title: 'Governance Structure',
    description: 'Multi-stakeholder board with government, private sector, and civil society',
    content: "The Fund is governed by a multi-stakeholder board comprising representatives from government departments, private sector partners, development finance institutions, and civil society organizations. This ensures balanced oversight and accountability.",
    url: '/about/why#policy-choice',
    anchor: 'governance-structure',
    category: 'governance',
    audience: ['government', 'corporates', 'general'],
    keywords: ['governance', 'board', 'oversight', 'management', 'structure', 'accountability', 'stakeholders'],
    priority: 4,
    lastUpdated: currentDate,
  },

  // ============================================
  // Theory of Change Sections
  // ============================================
  {
    id: 'theory-of-change',
    type: 'guide',
    title: 'Theory of Change',
    description: 'How pooling resources creates network effects and systemic impact',
    content: "The Theory of Change explains how pooling fragmented resources creates network effects that amplify impact. By coordinating capital, capability development, and market access, the Fund creates a virtuous cycle that strengthens the entire ecosystem.",
    url: '/about/why#theory',
    category: 'governance',
    audience: ['government', 'corporates', 'investors', 'general'],
    keywords: ['theory of change', 'network effects', 'systemic impact', 'pooling', 'coordination', 'ecosystem'],
    priority: 3,
    lastUpdated: currentDate,
  },

  // ============================================
  // Value Proposition Sections
  // ============================================
  {
    id: 'value-government',
    type: 'section',
    title: 'Value for Government & Policy Makers',
    description: 'How the Fund benefits government through coordinated policy implementation',
    content: "For government and policy makers, the Fund provides coordinated implementation of transformation policy, measurable outcomes through the Transformation Index, efficient deployment of public resources, and reduced fragmentation across agencies.",
    url: '/about/why#value',
    anchor: 'government',
    category: 'governance',
    audience: ['government'],
    keywords: ['government', 'policy makers', 'public sector', 'benefits', 'value proposition'],
    priority: 3,
    lastUpdated: currentDate,
  },
  {
    id: 'value-private-sector',
    type: 'section',
    title: 'Value for Private Sector & Investors',
    description: 'Benefits for corporates through enhanced B-BBEE compliance and impact',
    content: "For the private sector and investors, the Fund offers enhanced B-BBEE compliance outcomes, access to vetted investment opportunities, reduced due diligence costs through shared infrastructure, and measurable social impact for ESG reporting.",
    url: '/about/why#value',
    anchor: 'private-sector',
    category: 'funding',
    audience: ['corporates', 'investors'],
    keywords: ['private sector', 'investors', 'corporates', 'business', 'ESG', 'investment opportunities'],
    priority: 3,
    lastUpdated: currentDate,
  },
  {
    id: 'value-communities',
    type: 'section',
    title: 'Value for Labour, Communities & Society',
    description: 'Job creation, skills development, and community empowerment',
    content: "For labour, communities, and society, the Fund creates sustainable jobs, develops skills through training programs, builds local economic capacity, and promotes inclusive growth that benefits previously disadvantaged communities.",
    url: '/about/why#value',
    anchor: 'communities',
    category: 'impact',
    audience: ['general'],
    keywords: ['communities', 'society', 'jobs', 'employment', 'skills', 'training', 'empowerment'],
    priority: 3,
    lastUpdated: currentDate,
  },

  // ============================================
  // Operating Model
  // ============================================
  {
    id: 'operating-capital',
    type: 'guide',
    title: 'Access to Capital',
    description: 'Grants, loans, equity, and blended finance instruments',
    content: "Access to Capital provides various funding instruments including grants for early-stage businesses, concessional loans for growth enterprises, equity investments for scale-ups, and blended finance structures that combine public and private capital.",
    url: '/about/why#operating-model',
    anchor: 'capital',
    category: 'funding',
    audience: ['entrepreneurs', 'investors'],
    keywords: ['capital', 'funding', 'grants', 'loans', 'equity', 'blended finance', 'investment', 'money'],
    priority: 4,
    lastUpdated: currentDate,
  },
  {
    id: 'operating-capability',
    type: 'guide',
    title: 'Access to Capability',
    description: 'Business development, training, and mentorship programs',
    content: "Access to Capability provides business development support, technical training programs, mentorship from experienced entrepreneurs and executives, and digital literacy training to help businesses build sustainable operations.",
    url: '/about/why#operating-model',
    anchor: 'capability',
    category: 'support',
    audience: ['entrepreneurs', 'general'],
    keywords: ['capability', 'training', 'mentorship', 'skills', 'development', 'coaching', 'support programs'],
    priority: 4,
    lastUpdated: currentDate,
  },
  {
    id: 'operating-markets',
    type: 'guide',
    title: 'Access to Markets',
    description: 'Procurement linkages and supply chain integration opportunities',
    content: "Access to Markets connects empowered enterprises to procurement opportunities with corporates and government, facilitates supply chain integration, and provides export market support for businesses ready to scale internationally.",
    url: '/about/why#operating-model',
    anchor: 'markets',
    category: 'support',
    audience: ['entrepreneurs', 'corporates'],
    keywords: ['markets', 'procurement', 'supply chain', 'contracts', 'opportunities', 'customers', 'sales'],
    priority: 4,
    lastUpdated: currentDate,
  },

  // ============================================
  // Implementation Plan
  // ============================================
  {
    id: 'implementation-phases',
    type: 'guide',
    title: 'Implementation Plan',
    description: 'Phased rollout from pre-launch to institutionalisation',
    content: "The implementation follows four phases: Pre-Launch (stakeholder engagement and systems setup), Activation (pilot programs and initial deployments), Scale-Up (expansion across sectors and regions), and Institutionalisation (embedding transformation as standard practice).",
    url: '/about/why#implementation',
    category: 'governance',
    audience: ['government', 'corporates', 'general'],
    keywords: ['implementation', 'phases', 'rollout', 'timeline', 'plan', 'stages', 'execution'],
    priority: 3,
    lastUpdated: currentDate,
  },

  // ============================================
  // National Agenda
  // ============================================
  {
    id: 'national-agenda',
    type: 'policy',
    title: 'Advancing the National Agenda',
    description: 'Alignment with national development priorities and goals',
    content: "The Fund aligns with national development priorities including entrepreneurship and SMME development, job creation and poverty reduction, broadening black ownership and participation, and strengthening social protection and economic resilience.",
    url: '/about/why#national-agenda',
    category: 'governance',
    audience: ['government', 'general'],
    keywords: ['national agenda', 'development', 'priorities', 'goals', 'NDP', 'national development plan'],
    priority: 3,
    lastUpdated: currentDate,
  },

  // ============================================
  // About Page Content
  // ============================================
  {
    id: 'about-vision',
    type: 'section',
    title: 'Building the Future - Our Vision',
    description: 'Creating a transformed economy with broad-based participation',
    content: "Our vision is a transformed South African economy where black-owned businesses thrive, create jobs, and participate meaningfully in all sectors. We envision an ecosystem where transformation is not just compliance but competitive advantage.",
    url: '/about#vision',
    category: 'general',
    audience: ['general'],
    keywords: ['vision', 'future', 'mission', 'goals', 'purpose', 'about us'],
    priority: 3,
    lastUpdated: currentDate,
  },
  {
    id: 'about-approach',
    type: 'section',
    title: 'More Than Growth - Our Approach',
    description: 'Holistic support combining capital, capability, and market access',
    content: "Our approach goes beyond just providing capital. We bundle financial support with capability development and market access to create sustainable businesses that can compete and grow in the mainstream economy.",
    url: '/about#approach',
    category: 'support',
    audience: ['entrepreneurs', 'general'],
    keywords: ['approach', 'methodology', 'how we work', 'support model', 'holistic'],
    priority: 3,
    lastUpdated: currentDate,
  },

  // ============================================
  // Success Stories
  // ============================================
  {
    id: 'story-thandi',
    type: 'story',
    title: "Thandi's Journey - From Township to Tech Success",
    description: 'How a young entrepreneur built a successful tech company with Fund support',
    content: "Thandi started with a small coding bootcamp in Soweto and grew it into a national tech training company. With support from the Transformation Fund, she secured contracts with major corporates and now employs over 50 people.",
    url: '/news-media',
    category: 'impact',
    audience: ['entrepreneurs', 'general'],
    keywords: ['success story', 'thandi', 'tech', 'entrepreneur', 'township', 'impact', 'case study'],
    priority: 4,
    lastUpdated: currentDate,
  },
  {
    id: 'story-thabo',
    type: 'story',
    title: "Thabo's Story - Manufacturing Excellence",
    description: 'Building a manufacturing business from the ground up',
    content: "Thabo transformed a small welding workshop into a certified manufacturing supplier for the automotive industry. The Fund provided equipment financing and supplier development support, enabling him to meet quality standards and secure long-term contracts.",
    url: '/news-media',
    category: 'impact',
    audience: ['entrepreneurs', 'corporates', 'general'],
    keywords: ['success story', 'thabo', 'manufacturing', 'supplier', 'automotive', 'impact', 'case study'],
    priority: 4,
    lastUpdated: currentDate,
  },

  // ============================================
  // Contact Information
  // ============================================
  {
    id: 'contact-info',
    type: 'contact',
    title: 'Contact the Transformation Fund',
    description: 'Email, phone, and office location',
    content: "Contact us at info@sa-transformationfund.co.za or call +27 (0) 10 023 5916. Our offices are located in Johannesburg. Office hours are Monday to Friday, 8:00 AM to 5:00 PM.",
    url: '/contacts',
    category: 'contact',
    audience: ['general'],
    keywords: ['contact', 'email', 'phone', 'address', 'location', 'office', 'get in touch', 'reach us'],
    priority: 5,
    lastUpdated: currentDate,
  },
  {
    id: 'portal-login',
    type: 'guide',
    title: 'Portal Login',
    description: 'Access the online application portal',
    content: "Access the Transformation Fund online portal at online.sa-transformationfund.co.za to submit applications, track your application status, and manage your account.",
    url: 'https://dev-online.sa-transformationfund.co.za/',
    category: 'application',
    audience: ['entrepreneurs', 'general'],
    keywords: ['portal', 'login', 'sign in', 'account', 'application portal', 'online'],
    priority: 4,
    lastUpdated: currentDate,
  },

  // ============================================
  // Documents & Downloads
  // ============================================
  {
    id: 'doc-executive-summary',
    type: 'document',
    title: 'Transformation Fund Executive Summary',
    description: 'Quick overview of the Fund - PDF download',
    content: "Download the Executive Summary for a concise overview of the Transformation Fund objectives, operating model, and impact metrics. PDF document.",
    url: '/resources/Transformation_Fund_Executive_Summary_v1_29Sept.pdf',
    category: 'general',
    audience: ['general'],
    keywords: ['executive summary', 'download', 'PDF', 'overview', 'document', 'summary', 'quick guide'],
    priority: 5,
    lastUpdated: currentDate,
  },
  {
    id: 'doc-full-document',
    type: 'document',
    title: 'Full Transformation Fund Document',
    description: 'Comprehensive Fund documentation - PDF download',
    content: "Download the complete Transformation Fund document with detailed governance, funding mechanisms, eligibility criteria, and implementation plans. PDF document.",
    url: '/resources/TransformationFundDocument_v2.4_28Sept25.pdf',
    category: 'general',
    audience: ['general'],
    keywords: ['full document', 'download', 'PDF', 'comprehensive', 'detailed', 'complete', 'documentation'],
    priority: 5,
    lastUpdated: currentDate,
  },

  // ============================================
  // News & Stories page
  // ============================================
  {
    id: 'news-stories-page',
    type: 'section',
    title: 'News & Stories',
    description: 'Latest news highlights and featured success stories',
    content: "Browse the latest news, media coverage, and inspiring success stories from the Transformation Fund. Stay up to date with announcements, events, and entrepreneur spotlights.",
    url: '/news-media',
    category: 'general',
    audience: ['general', 'entrepreneurs', 'corporates', 'investors'],
    keywords: ['news', 'stories', 'media', 'announcements', 'press', 'coverage', 'highlights', 'updates'],
    priority: 4,
    lastUpdated: currentDate,
  },

  // ============================================
  // Resources & Support
  // ============================================
  {
    id: 'resource-business-development',
    type: 'guide',
    title: 'Business Development Resources',
    description: 'Access to business planning, market research, and strategic development',
    content: 'Access business planning support, market research tools, and strategic development resources. Get help with developing your business strategy, understanding your market, and planning for growth.',
    url: '/about#approach',
    category: 'support',
    audience: ['entrepreneurs', 'general'],
    keywords: ['business development', 'planning', 'market research', 'strategy', 'resources', 'support'],
    priority: 4,
    lastUpdated: currentDate,
  },
  {
    id: 'resource-mentorship',
    type: 'guide',
    title: 'Mentorship Network',
    description: 'Connect with experienced business leaders and industry experts',
    content: 'Connect with our network of experienced business leaders and industry experts for guidance and support. Get matched with mentors who can help you navigate challenges and accelerate your growth.',
    url: '/about#approach',
    category: 'support',
    audience: ['entrepreneurs', 'general'],
    keywords: ['mentorship', 'mentor', 'coaching', 'guidance', 'experts', 'leaders', 'network', 'support'],
    priority: 4,
    lastUpdated: currentDate,
  },
  {
    id: 'resource-training',
    type: 'guide',
    title: 'Training Programs',
    description: 'Skills development workshops and business management training',
    content: 'Access skills development workshops, financial literacy programs, and business management training. Build the capabilities you need to run a successful business.',
    url: '/about#approach',
    category: 'support',
    audience: ['entrepreneurs', 'general'],
    keywords: ['training', 'workshops', 'skills', 'financial literacy', 'business management', 'development', 'programs'],
    priority: 4,
    lastUpdated: currentDate,
  },
];

// Helper function to get content by type
export const getContentByType = (type: SearchableContent['type']) => 
  searchableContent.filter(item => item.type === type);

// Helper function to get content by category
export const getContentByCategory = (category: SearchableContent['category']) => 
  searchableContent.filter(item => item.category === category);
