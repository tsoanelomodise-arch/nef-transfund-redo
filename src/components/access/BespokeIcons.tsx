import React from 'react';

interface IconProps {
  className?: string;
  size?: number | string;
  theme?: 'light' | 'dark';
}

/**
 * BESPOKE DUAL-THEME ICON SYSTEM
 * 
 * References:
 * - Light/Neutral UI contexts: Geometric, modular/matrix precision glyphs (Ref: 0d6f13da97fb006a062b4525bb5612e6.jpg)
 * - Dark/Black UI contexts: Architectural monoline, segmented arcs, radial bursts, optical targets, split vectors (Ref: e6314aae91c9137289a3f4abba90272e.jpg)
 */

// 1. Business Diagnostics & Advisory
export const IconAdvisory: React.FC<IconProps> = ({ className = 'w-5 h-5', theme = 'dark' }) => {
  if (theme === 'dark') {
    // Segmented radial burst / sun flare (from dark reference top row, col 3)
    return (
      <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <line x1="12" y1="2" x2="12" y2="6" />
        <line x1="12" y1="18" x2="12" y2="22" />
        <line x1="2" y1="12" x2="6" y2="12" />
        <line x1="18" y1="12" x2="22" y2="12" />
        <line x1="4.93" y1="4.93" x2="7.76" y2="7.76" />
        <line x1="16.24" y1="16.24" x2="19.07" y2="19.07" />
        <line x1="4.93" y1="19.07" x2="7.76" y2="16.24" />
        <line x1="16.24" y1="7.76" x2="19.07" y2="4.93" />
      </svg>
    );
  }
  // Light theme: Matrix burst / 8-point geometric star (from light reference row 1, col 1)
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <rect x="10" y="2" width="4" height="20" rx="1" />
      <rect x="2" y="10" width="20" height="4" rx="1" />
      <rect x="5.5" y="5.5" width="4" height="4" rx="0.5" />
      <rect x="14.5" y="5.5" width="4" height="4" rx="0.5" />
      <rect x="5.5" y="14.5" width="4" height="4" rx="0.5" />
      <rect x="14.5" y="14.5" width="4" height="4" rx="0.5" />
    </svg>
  );
};

// 2. Financial Modeling & Capital Readiness
export const IconFinancial: React.FC<IconProps> = ({ className = 'w-5 h-5', theme = 'dark' }) => {
  if (theme === 'dark') {
    // Directional corner vector with 45-deg ascending ray (from dark reference row 2, col 2)
    return (
      <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M4 20h16" />
        <path d="M4 4h16v16" />
        <line x1="4" y1="20" x2="18" y2="6" />
      </svg>
    );
  }
  // Light theme: Stepped bar level block (from light reference row 1, col 2)
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <rect x="3" y="5" width="18" height="3" rx="0.5" />
      <rect x="3" y="11" width="14" height="3" rx="0.5" />
      <rect x="3" y="17" width="9" height="3" rx="0.5" />
    </svg>
  );
};

// 3. Technical Standards, Compliance & Quality
export const IconTechnical: React.FC<IconProps> = ({ className = 'w-5 h-5', theme = 'dark' }) => {
  if (theme === 'dark') {
    // Dual split corner angle brackets (from dark reference row 4, col 2)
    return (
      <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M7 3H3v4" />
        <path d="M17 3h4v4" />
        <path d="M7 21H3v-4" />
        <path d="M17 21h4v-4" />
        <circle cx="12" cy="12" r="3" strokeWidth="2" />
      </svg>
    );
  }
  // Light theme: Geometric solid framed square (from light reference row 2, col 3)
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <rect x="3" y="3" width="18" height="18" rx="2" fill="none" stroke="currentColor" strokeWidth="3" />
      <rect x="8.5" y="8.5" width="7" height="7" rx="1" />
    </svg>
  );
};

// 4. Skills Development & Operations
export const IconSkills: React.FC<IconProps> = ({ className = 'w-5 h-5', theme = 'dark' }) => {
  if (theme === 'dark') {
    // 4 Parallel Vertical Hash Bars (from dark reference row 2, col 4)
    return (
      <svg className={className} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" viewBox="0 0 24 24">
        <line x1="5" y1="4" x2="5" y2="20" />
        <line x1="10" y1="4" x2="10" y2="20" />
        <line x1="15" y1="4" x2="15" y2="20" />
        <line x1="20" y1="4" x2="20" y2="20" />
      </svg>
    );
  }
  // Light theme: 3x3 Modular dot matrix (from light reference row 3, col 3)
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <circle cx="5" cy="5" r="2" />
      <circle cx="12" cy="5" r="2" />
      <circle cx="19" cy="5" r="2" />
      <circle cx="5" cy="12" r="2" />
      <circle cx="12" cy="12" r="2" />
      <circle cx="19" cy="12" r="2" />
      <circle cx="5" cy="19" r="2" />
      <circle cx="12" cy="19" r="2" />
      <circle cx="19" cy="19" r="2" />
    </svg>
  );
};

// 5. Enterprise Incubation & Accelerator
export const IconIncubation: React.FC<IconProps> = ({ className = 'w-5 h-5', theme = 'dark' }) => {
  if (theme === 'dark') {
    // Radiating beacon / lighthouse beam rays on baseline (from dark reference row 3, col 2)
    return (
      <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <line x1="3" y1="20" x2="21" y2="20" />
        <line x1="7" y1="20" x2="10" y2="8" />
        <line x1="17" y1="20" x2="14" y2="8" />
        <line x1="12" y1="20" x2="12" y2="8" />
        <line x1="6" y1="5" x2="8" y2="7" />
        <line x1="12" y1="3" x2="12" y2="6" />
        <line x1="18" y1="5" x2="16" y2="7" />
      </svg>
    );
  }
  // Light theme: Segmented module socket / bracket node (from light reference row 5, col 3)
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <rect x="6" y="7" width="12" height="10" rx="1.5" />
      <rect x="9" y="3" width="6" height="4" rx="0.5" />
      <rect x="10.5" y="17" width="3" height="4" rx="0.5" />
    </svg>
  );
};

// 6. Mentorship & Masterclasses
export const IconMentorship: React.FC<IconProps> = ({ className = 'w-5 h-5', theme = 'dark' }) => {
  if (theme === 'dark') {
    // 3 Triple overlapping arcs (from dark reference row 1, col 1)
    return (
      <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24">
        <path d="M4 16a5 5 0 0 1 7-4" />
        <path d="M9 13a5 5 0 0 1 7-4" />
        <path d="M14 10a5 5 0 0 1 7-4" />
      </svg>
    );
  }
  // Light theme: Modular connector node (from light reference row 3, col 1)
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <rect x="4" y="17" width="16" height="3" rx="0.5" />
      <rect x="10" y="9" width="4" height="8" rx="0.5" />
      <rect x="13" y="6" width="4" height="4" rx="0.5" />
    </svg>
  );
};

// 7. Digital Transformation & Systems
export const IconDigital: React.FC<IconProps> = ({ className = 'w-5 h-5', theme = 'dark' }) => {
  if (theme === 'dark') {
    // Split 4-Quadrant Optical Concentric Target Ring (from dark reference row 3, col 4)
    return (
      <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="9" strokeDasharray="10 4" />
        <circle cx="12" cy="12" r="4" strokeWidth="2.5" />
      </svg>
    );
  }
  // Light theme: Split pixelated matrix glyph (from light reference row 2, col 4)
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <rect x="3" y="10" width="6" height="4" rx="0.5" />
      <rect x="15" y="10" width="6" height="4" rx="0.5" />
      <rect x="10" y="3" width="4" height="6" rx="0.5" />
      <rect x="10" y="15" width="4" height="6" rx="0.5" />
      <rect x="10.5" y="10.5" width="3" height="3" rx="0.5" fill="none" stroke="white" strokeWidth="1" />
    </svg>
  );
};

// 8. Pipeline Step 1: In Progress / Application Submission
export const IconPipelineSubmission: React.FC<IconProps> = ({ className = 'w-6 h-6', theme = 'light' }) => {
  if (theme === 'dark') {
    return (
      <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="8" y1="13" x2="16" y2="13" />
        <line x1="8" y1="17" x2="13" y2="17" />
      </svg>
    );
  }
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M6 3h8l5 5v13H6V3z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="14 3 14 8 19 8" fill="none" stroke="currentColor" strokeWidth="2" />
      <rect x="8.5" y="12" width="7" height="2" rx="0.5" />
      <rect x="8.5" y="16" width="4" height="2" rx="0.5" />
    </svg>
  );
};

// 9. Pipeline Step 2: Approved / Diagnostic Assessment
export const IconPipelineApproved: React.FC<IconProps> = ({ className = 'w-6 h-6', theme = 'light' }) => {
  if (theme === 'dark') {
    return (
      <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    );
  }
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <polyline points="9 12 11 14 15 10" strokeWidth="2.5" />
    </svg>
  );
};

// 10. Pipeline Step 3: In Training / LMS Active
export const IconPipelineTraining: React.FC<IconProps> = ({ className = 'w-6 h-6', theme = 'light' }) => {
  if (theme === 'dark') {
    return (
      <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M9 18h6" />
        <path d="M10 22h4" />
        <path d="M12 2a7 7 0 0 0-7 7c0 2.5 1.5 4.5 3 6h8c1.5-1.5 3-3.5 3-6a7 7 0 0 0-7-7z" />
      </svg>
    );
  }
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <circle cx="12" cy="10" r="6" />
      <path d="M9 16v3h6v-3" />
      <line x1="12" y1="2" x2="12" y2="4" />
      <line x1="4" y1="10" x2="6" y2="10" />
      <line x1="18" y1="10" x2="20" y2="10" />
    </svg>
  );
};

// 11. Pipeline Step 4: Completed / Certificate Issued
export const IconPipelineCertificate: React.FC<IconProps> = ({ className = 'w-6 h-6', theme = 'light' }) => {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
    </svg>
  );
};

// 12. Corporate Procurement (Markets)
export const IconProcurement: React.FC<IconProps> = ({ className = 'w-5 h-5', theme = 'light' }) => {
  if (theme === 'dark') {
    return (
      <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    );
  }
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <line x1="3" y1="10" x2="21" y2="10" />
      <line x1="9" y1="4" x2="9" y2="20" />
    </svg>
  );
};

// 13. Public Sector Tenders & Logistics (Markets)
export const IconGovernment: React.FC<IconProps> = ({ className = 'w-5 h-5', theme = 'light' }) => {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M3 21h18" />
      <path d="M4 18h16" />
      <path d="M12 2l8 5H4l8-5z" />
      <line x1="6" y1="10" x2="6" y2="15" />
      <line x1="10" y1="10" x2="10" y2="15" />
      <line x1="14" y1="10" x2="14" y2="15" />
      <line x1="18" y1="10" x2="18" y2="15" />
    </svg>
  );
};

// 14. Export & Cross-Border Offtake (Markets)
export const IconExportTrade: React.FC<IconProps> = ({ className = 'w-5 h-5', theme = 'light' }) => {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
};

// 15. General Checkmark / Verification Icon
export const IconCheck: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
