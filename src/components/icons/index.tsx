import * as React from "react";

/**
 * TF BESPOKE ICON SYSTEM
 * ----------------------
 * A single, custom-drawn monoline icon set for the Transformation Fund site.
 *
 * Design rules (kept identical across every glyph):
 *  - 24 x 24 grid, 2px optical padding (live area 20 x 20)
 *  - Monoline: stroke 1.5, no fills, round caps and joins
 *  - Corner radius 2 on rectangular forms, geometric construction only
 *  - Colour comes from `currentColor` so icons inherit brand text colour
 *
 * Usage: <TfMail className="w-5 h-5" />  |  <TfMail size={18} />
 */

export interface TfIconProps extends React.SVGProps<SVGSVGElement> {
  /** Pixel size shortcut; prefer Tailwind sizing via className. */
  size?: number | string;
  /** Accessible label. When omitted the icon is hidden from assistive tech. */
  title?: string;
}

const Svg = ({
  size,
  title,
  className = "w-5 h-5",
  children,
  strokeWidth = 1.5,
  ...rest
}: TfIconProps & { children: React.ReactNode }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    role={title ? "img" : undefined}
    aria-hidden={title ? undefined : true}
    focusable="false"
    {...rest}
  >
    {title ? <title>{title}</title> : null}
    {children}
  </svg>
);

/* ── Contact & communication ─────────────────────────────────────────── */

/** Envelope with a folded, off-centre seal line — used for email addresses. */
export const TfMail = (p: TfIconProps) => (
  <Svg {...p}>
    <rect x="2.75" y="5.25" width="18.5" height="13.5" rx="2" />
    <path d="M3.5 7.5 12 13l8.5-5.5" />
  </Svg>
);

/** Handset traced as a single continuous stroke — telephone contact. */
export const TfPhone = (p: TfIconProps) => (
  <Svg {...p}>
    <path d="M8.2 3.5h-2A2.7 2.7 0 0 0 3.5 6.2c0 8 6.3 14.3 14.3 14.3a2.7 2.7 0 0 0 2.7-2.7v-2l-4.2-1.4-1.7 2.1a15.4 15.4 0 0 1-6.3-6.3l2.1-1.7Z" />
  </Svg>
);

/** Location marker built from a circle and a plumb-line point — addresses. */
export const TfPin = (p: TfIconProps) => (
  <Svg {...p}>
    <path d="M12 21c4-4.5 6-7.9 6-10.6A6 6 0 0 0 6 10.4C6 13.1 8 16.5 12 21Z" />
    <circle cx="12" cy="10.3" r="2.3" />
  </Svg>
);

/** Dial face with hands at office hours — opening times. */
export const TfClock = (p: TfIconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="8.75" />
    <path d="M12 7.25V12l3.25 1.9" />
  </Svg>
);

/** Meridian globe — web presence and national reach. */
export const TfGlobe = (p: TfIconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="8.75" />
    <path d="M3.4 9.5h17.2M3.4 14.5h17.2" />
    <path d="M12 3.25c2.4 2.5 3.6 5.4 3.6 8.75S14.4 18.25 12 20.75c-2.4-2.5-3.6-5.4-3.6-8.75S9.6 5.75 12 3.25Z" />
  </Svg>
);

/** Speech frame with a squared tail — enquiries and messaging. */
export const TfMessage = (p: TfIconProps) => (
  <Svg {...p}>
    <path d="M4.75 4.75h14.5a1.5 1.5 0 0 1 1.5 1.5v8.5a1.5 1.5 0 0 1-1.5 1.5H10l-4.4 3.4v-3.4h-.85a1.5 1.5 0 0 1-1.5-1.5v-8.5a1.5 1.5 0 0 1 1.5-1.5Z" />
    <path d="M8 9.5h8M8 12.5h5" />
  </Svg>
);

/* ── Documents & resources ───────────────────────────────────────────── */

/** Sheet with a cut corner and two rule lines — published documents. */
export const TfDocument = (p: TfIconProps) => (
  <Svg {...p}>
    <path d="M13.5 3h-6A1.5 1.5 0 0 0 6 4.5v15A1.5 1.5 0 0 0 7.5 21h9a1.5 1.5 0 0 0 1.5-1.5V7.5Z" />
    <path d="M13.5 3v4.5H18" />
    <path d="M9 13h6M9 16.5h4" />
  </Svg>
);

/** Downward vector into a tray — file downloads. */
export const TfDownload = (p: TfIconProps) => (
  <Svg {...p}>
    <path d="M12 3.75v10.5" />
    <path d="m8 10.5 4 3.75 4-3.75" />
    <path d="M4.5 17.25v1.5a1.5 1.5 0 0 0 1.5 1.5h12a1.5 1.5 0 0 0 1.5-1.5v-1.5" />
  </Svg>
);

/** Frame with an escaping vector — links that leave the site. */
export const TfExternal = (p: TfIconProps) => (
  <Svg {...p}>
    <path d="M13.5 4.5h6v6" />
    <path d="M19.5 4.5 11 13" />
    <path d="M18 14.5v4.25a1.25 1.25 0 0 1-1.25 1.25H5.25A1.25 1.25 0 0 1 4 18.75V7.25A1.25 1.25 0 0 1 5.25 6H9.5" />
  </Svg>
);

/* ── Wayfinding & controls ───────────────────────────────────────────── */

/** Lens on a 45° handle — site search. */
export const TfSearch = (p: TfIconProps) => (
  <Svg {...p}>
    <circle cx="10.75" cy="10.75" r="6.5" />
    <path d="m15.5 15.5 4.25 4.25" />
  </Svg>
);

/** Three measured rules — main menu on compact viewports. */
export const TfMenu = (p: TfIconProps) => (
  <Svg {...p}>
    <path d="M3.75 7h16.5M3.75 12h16.5M3.75 17h11" />
  </Svg>
);

/** Balanced cross — dismiss and close. */
export const TfClose = (p: TfIconProps) => (
  <Svg {...p}>
    <path d="M5.75 5.75 18.25 18.25M18.25 5.75 5.75 18.25" />
  </Svg>
);

/** Shallow chevron — dropdown and disclosure affordance. */
export const TfChevronDown = (p: TfIconProps) => (
  <Svg {...p}>
    <path d="m5.5 9.25 6.5 6 6.5-6" />
  </Svg>
);

export const TfChevronLeft = (p: TfIconProps) => (
  <Svg {...p}>
    <path d="m14.75 5.5-6 6.5 6 6.5" />
  </Svg>
);

export const TfChevronRight = (p: TfIconProps) => (
  <Svg {...p}>
    <path d="m9.25 5.5 6 6.5-6 6.5" />
  </Svg>
);

/** Long directional vector — forward navigation and calls to action. */
export const TfArrowRight = (p: TfIconProps) => (
  <Svg {...p}>
    <path d="M3.75 12h16.5" />
    <path d="m14.5 6.25 5.75 5.75-5.75 5.75" />
  </Svg>
);

export const TfArrowLeft = (p: TfIconProps) => (
  <Svg {...p}>
    <path d="M20.25 12H3.75" />
    <path d="m9.5 6.25-5.75 5.75 9.5 5.75" />
  </Svg>
);

export const TfArrowUp = (p: TfIconProps) => (
  <Svg {...p}>
    <path d="M12 20.25V3.75" />
    <path d="m6.25 9.5 5.75-5.75 5.75 5.75" />
  </Svg>
);

/** Triangle inscribed in a ring — video playback. */
export const TfPlay = (p: TfIconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="8.75" />
    <path d="M10.25 8.75 16 12l-5.75 3.25V8.75Z" />
  </Svg>
);

/** Single confirming tick — completed criteria and list bullets. */
export const TfCheck = (p: TfIconProps) => (
  <Svg {...p}>
    <path d="m4.75 12.5 4.75 4.75L19.25 7" />
  </Svg>
);

/** Tick sealed in a ring — success states. */
export const TfCheckCircle = (p: TfIconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="8.75" />
    <path d="m8.25 12.25 2.6 2.6 5-5.4" />
  </Svg>
);

/* ── Programme & content themes ──────────────────────────────────────── */

/** Case with a raised handle — careers and opportunities. */
export const TfBriefcase = (p: TfIconProps) => (
  <Svg {...p}>
    <rect x="3.25" y="7.25" width="17.5" height="12.5" rx="2" />
    <path d="M9 7.25V5.75A1.5 1.5 0 0 1 10.5 4.25h3A1.5 1.5 0 0 1 15 5.75v1.5" />
    <path d="M3.25 12.5h17.5" />
  </Svg>
);

/** Ruled calendar plate — dates and deadlines. */
export const TfCalendar = (p: TfIconProps) => (
  <Svg {...p}>
    <rect x="3.5" y="5.25" width="17" height="15" rx="2" />
    <path d="M3.5 10h17M8.5 3.5v3.5M15.5 3.5v3.5" />
  </Svg>
);

/** Two figures on one baseline — mentorship and communities. */
export const TfPeople = (p: TfIconProps) => (
  <Svg {...p}>
    <circle cx="9.25" cy="8.5" r="3.25" />
    <path d="M3.5 19.5c0-3.2 2.6-5.25 5.75-5.25s5.75 2.05 5.75 5.25" />
    <path d="M16 5.6a3.25 3.25 0 0 1 0 5.8M17.25 14.6c2 .7 3.25 2.4 3.25 4.9" />
  </Svg>
);

/** Ascending plotted line — growth, funding performance and statistics. */
export const TfGrowth = (p: TfIconProps) => (
  <Svg {...p}>
    <path d="M3.75 19.75h16.5" />
    <path d="m5.5 15.5 4-4.25 3.25 2.75 5.75-6.5" />
    <path d="M14.5 7.5h4v4" />
  </Svg>
);

/** Open manual with a centre gutter — guides and knowledge resources. */
export const TfBook = (p: TfIconProps) => (
  <Svg {...p}>
    <path d="M12 6.75C10.3 5.4 8.4 4.75 6.25 4.75H3.5v13h2.75c2.15 0 4.05.65 5.75 2 1.7-1.35 3.6-2 5.75-2h2.75v-13h-2.75c-2.15 0-4.05.65-5.75 2Z" />
    <path d="M12 6.75v12" />
  </Svg>
);

/** Concentric target with a centred mark — objectives and eligibility. */
export const TfTarget = (p: TfIconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="8.75" />
    <circle cx="12" cy="12" r="4.5" />
    <circle cx="12" cy="12" r="0.9" fill="currentColor" stroke="none" />
  </Svg>
);

/** Shield with an inner keel — governance, trust and compliance. */
export const TfShield = (p: TfIconProps) => (
  <Svg {...p}>
    <path d="M12 3.25 4.75 6.1v5.4c0 4.2 2.9 7.6 7.25 9.25 4.35-1.65 7.25-5.05 7.25-9.25V6.1Z" />
    <path d="m9 12 2.25 2.25L15.25 10" />
  </Svg>
);

/** Interlocking modules — capability building and support interventions. */
export const TfModules = (p: TfIconProps) => (
  <Svg {...p}>
    <rect x="3.5" y="3.5" width="7" height="7" rx="2" />
    <rect x="13.5" y="3.5" width="7" height="7" rx="2" />
    <rect x="3.5" y="13.5" width="7" height="7" rx="2" />
    <rect x="13.5" y="13.5" width="7" height="7" rx="2" />
  </Svg>
);

/** Coin stack on a baseline — capital and funding. */
export const TfCapital = (p: TfIconProps) => (
  <Svg {...p}>
    <ellipse cx="12" cy="6.5" rx="7.25" ry="2.75" />
    <path d="M4.75 6.5v11c0 1.5 3.25 2.75 7.25 2.75s7.25-1.25 7.25-2.75v-11" />
    <path d="M4.75 12c0 1.5 3.25 2.75 7.25 2.75s7.25-1.25 7.25-2.75" />
  </Svg>
);
