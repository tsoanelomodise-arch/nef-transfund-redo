import * as React from "react";

/**
 * TF BESPOKE ICON SYSTEM  ·  v2 "grid"
 * ------------------------------------
 * A single custom-drawn icon set for the Transformation Fund site, built to two
 * reference languages:
 *
 *  · LIGHT / NEUTRAL CONTEXTS — pixel-precise geometric monoline marks. Every
 *    vertex lands on a 0.5 step of the 24 grid, terminals are flat-square, and
 *    forms are reduced to the smallest set of straight runs, arcs and squares
 *    that still carry meaning. Muted by default (inherits `currentColor`, the
 *    site normally passes gray-400 / black-40).
 *
 *  · DARK / BLACK CONTEXTS — same geometry, crisper optical weight and a very
 *    subtle luminance halo so the glyph separates from deep black without
 *    turning neon. Opt in per icon with `tone="dark"`, or wrap a dark section in
 *    `<TfIconTone tone="dark">` and every icon inside picks it up.
 *
 * Shared rules
 *  - 24 x 24 viewBox, 2px optical padding (live area 20 x 20)
 *  - Monoline: stroke 1.5 (light) / 1.4 (dark), no fills except deliberate dots
 *  - Square caps and mitre joins on straight runs; round only where an arc ends
 *  - Colour always via `currentColor`
 *
 * Usage: <TfMail className="w-5 h-5" /> | <TfCapital tone="dark" size={18} />
 */

export type TfIconTone = "light" | "dark";

export interface TfIconProps extends React.SVGProps<SVGSVGElement> {
  /** Pixel size shortcut; prefer Tailwind sizing via className. */
  size?: number | string;
  /** Accessible label. When omitted the icon is hidden from assistive tech. */
  title?: string;
  /** Rendering context. `dark` sharpens weight and adds a subtle halo. */
  tone?: TfIconTone;
}

const ToneContext = React.createContext<TfIconTone>("light");

/** Wrap any dark/black section so nested icons adopt the dark treatment. */
export const TfIconTone = ({
  tone,
  children,
}: {
  tone: TfIconTone;
  children: React.ReactNode;
}) => <ToneContext.Provider value={tone}>{children}</ToneContext.Provider>;

const Svg = ({
  size,
  title,
  tone,
  className = "w-5 h-5",
  children,
  strokeWidth,
  style,
  ...rest
}: TfIconProps & { children: React.ReactNode }) => {
  const ctxTone = React.useContext(ToneContext);
  const resolved = tone ?? ctxTone;
  const isDark = resolved === "dark";

  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth ?? (isDark ? 1.4 : 1.5)}
      strokeLinecap="round"
      strokeLinejoin="round"
      shapeRendering="geometricPrecision"
      className={className}
      style={
        isDark
          ? { filter: "drop-shadow(0 0 3px currentColor)", opacity: 0.98, ...style }
          : style
      }
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      focusable="false"
      {...rest}
    >
      {title ? <title>{title}</title> : null}
      {children}
    </svg>
  );
};

/* ── Contact & communication ─────────────────────────────────────────── */

/** Squared envelope, single fold run — email addresses. */
export const TfMail = (p: TfIconProps) => (
  <Svg {...p}>
    <path d="M3.5 6h17v12h-17z" />
    <path d="M3.5 8.5 12 13.5l8.5-5" />
  </Svg>
);

/** Handset reduced to two orthogonal runs and a corner — telephone contact. */
export const TfPhone = (p: TfIconProps) => (
  <Svg {...p}>
    <path d="M4 4h5v5H6.5" />
    <path d="M20 20h-5v-5h2.5" />
    <path d="M6.5 9c0 4.7 3.8 8.5 8.5 8.5" />
  </Svg>
);

/** Marker: square head rotated to a point, centred aperture — addresses. */
export const TfPin = (p: TfIconProps) => (
  <Svg {...p}>
    <path d="M12 21 5.5 14.5a6.5 6.5 0 1 1 13 0Z" />
    <path d="M10 10.5h4v4h-4z" />
  </Svg>
);

/** Dial with two orthogonal hands — opening times. */
export const TfClock = (p: TfIconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7v5h4.5" />
  </Svg>
);

/** Ring crossed by two latitudes and one meridian — reach and web presence. */
export const TfGlobe = (p: TfIconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M3.5 9.5h17M3.5 14.5h17M12 3.5v17" />
  </Svg>
);

/** Squared speech plate with a stepped tail — enquiries and messaging. */
export const TfMessage = (p: TfIconProps) => (
  <Svg {...p}>
    <path d="M3.5 4.5h17v11h-9l-4 4v-4h-4z" />
    <path d="M7.5 8.5h9M7.5 11.5h5.5" />
  </Svg>
);

/* ── Documents & resources ───────────────────────────────────────────── */

/** Sheet with a stepped corner and two rules — published documents. */
export const TfDocument = (p: TfIconProps) => (
  <Svg {...p}>
    <path d="M6 3h7.5L18 7.5V21H6z" />
    <path d="M13.5 3v4.5H18" />
    <path d="M9 12.5h6M9 16h4" />
  </Svg>
);

/** Vector dropped into an open tray — file downloads. */
export const TfDownload = (p: TfIconProps) => (
  <Svg {...p}>
    <path d="M12 3.5v10.5" />
    <path d="M8 10.5 12 14.5l4-4" />
    <path d="M4.5 16.5v4h15v-4" />
  </Svg>
);

/** Frame with a vector escaping the top-right quadrant — off-site links. */
export const TfExternal = (p: TfIconProps) => (
  <Svg {...p}>
    <path d="M13.5 4.5h6v6" />
    <path d="M19.5 4.5 11 13" />
    <path d="M18 13.5v6h-14v-14h6" />
  </Svg>
);

/* ── Wayfinding & controls ───────────────────────────────────────────── */

/** Lens on a 45° handle — site search. */
export const TfSearch = (p: TfIconProps) => (
  <Svg {...p}>
    <circle cx="10.5" cy="10.5" r="6.5" />
    <path d="m15.5 15.5 4.5 4.5" />
  </Svg>
);

/** Three measured rules, stepped length — compact main menu. */
export const TfMenu = (p: TfIconProps) => (
  <Svg {...p}>
    <path d="M3.5 6.5h17M3.5 12h17M3.5 17.5h11" />
  </Svg>
);

/** Balanced cross — dismiss and close. */
export const TfClose = (p: TfIconProps) => (
  <Svg {...p}>
    <path d="M5.5 5.5 18.5 18.5M18.5 5.5 5.5 18.5" />
  </Svg>
);

/** Shallow chevron — dropdown and disclosure affordance. */
export const TfChevronDown = (p: TfIconProps) => (
  <Svg {...p}>
    <path d="m5.5 9.5 6.5 6 6.5-6" />
  </Svg>
);

export const TfChevronLeft = (p: TfIconProps) => (
  <Svg {...p}>
    <path d="m14.5 5.5-6 6.5 6 6.5" />
  </Svg>
);

export const TfChevronRight = (p: TfIconProps) => (
  <Svg {...p}>
    <path d="m9.5 5.5 6 6.5-6 6.5" />
  </Svg>
);

/** Long directional run with a 45° head — forward navigation and CTAs. */
export const TfArrowRight = (p: TfIconProps) => (
  <Svg {...p}>
    <path d="M3.5 12h17" />
    <path d="m14.5 6 6 6-6 6" />
  </Svg>
);

export const TfArrowLeft = (p: TfIconProps) => (
  <Svg {...p}>
    <path d="M20.5 12h-17" />
    <path d="m9.5 6-6 6 6 6" />
  </Svg>
);

export const TfArrowUp = (p: TfIconProps) => (
  <Svg {...p}>
    <path d="M12 20.5v-17" />
    <path d="m6 9.5 6-6 6 6" />
  </Svg>
);

/** Triangle inscribed in a ring — video playback. */
export const TfPlay = (p: TfIconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M10 8.5 16 12l-6 3.5z" />
  </Svg>
);

/** Single confirming tick — met criteria and list bullets. */
export const TfCheck = (p: TfIconProps) => (
  <Svg {...p}>
    <path d="m4.5 12.5 5 5 10-11" />
  </Svg>
);

/** Tick sealed in a ring — success states. */
export const TfCheckCircle = (p: TfIconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="m8 12.5 2.75 2.75L16.25 9.5" />
  </Svg>
);

/* ── Programme & content themes ──────────────────────────────────────── */

/** Case split by a centre rule, raised handle — careers and opportunities. */
export const TfBriefcase = (p: TfIconProps) => (
  <Svg {...p}>
    <path d="M3.5 7.5h17v12h-17z" />
    <path d="M9 7.5V4.5h6v3" />
    <path d="M3.5 12.5h17" />
  </Svg>
);

/** Ruled plate with two posts — dates and deadlines. */
export const TfCalendar = (p: TfIconProps) => (
  <Svg {...p}>
    <path d="M3.5 5.5h17v15h-17z" />
    <path d="M3.5 10h17M8.5 3.5v4M15.5 3.5v4" />
  </Svg>
);

/** Two figures on a shared baseline — mentorship and communities. */
export const TfPeople = (p: TfIconProps) => (
  <Svg {...p}>
    <circle cx="9" cy="8" r="3.5" />
    <path d="M3.5 19.5v-1.5A5.5 5.5 0 0 1 9 12.5a5.5 5.5 0 0 1 5.5 5.5v1.5" />
    <path d="M16 5.5a3.5 3.5 0 0 1 0 6M17.5 13a5.5 5.5 0 0 1 3 5v1.5" />
  </Svg>
);

/** Stepped ascent above a baseline — growth, performance and statistics. */
export const TfGrowth = (p: TfIconProps) => (
  <Svg {...p}>
    <path d="M3.5 20.5v-17" />
    <path d="M3.5 20.5h17" />
    <path d="M7 16.5v-4M11.5 16.5v-7M16 16.5v-10" />
  </Svg>
);

/** Open manual with a centre gutter — guides and knowledge resources. */
export const TfBook = (p: TfIconProps) => (
  <Svg {...p}>
    <path d="M12 6.5C10.4 5.2 8.5 4.5 6 4.5H3.5v13H6c2.5 0 4.4.7 6 2 1.6-1.3 3.5-2 6-2h2.5v-13H18c-2.5 0-4.4.7-6 2Z" />
    <path d="M12 6.5v13" />
  </Svg>
);

/** Concentric target with a squared centre — objectives and eligibility. */
export const TfTarget = (p: TfIconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <circle cx="12" cy="12" r="4.25" />
    <path d="M10.75 10.75h2.5v2.5h-2.5z" fill="currentColor" stroke="none" />
  </Svg>
);

/** Shield with an inner keel — governance, trust and compliance. */
export const TfShield = (p: TfIconProps) => (
  <Svg {...p}>
    <path d="M12 3.5 4.5 6.25V12c0 4.2 3 7.6 7.5 9 4.5-1.4 7.5-4.8 7.5-9V6.25Z" />
    <path d="m8.75 12 2.5 2.5 4.5-5" />
  </Svg>
);

/** Four aligned modules — capability building and support interventions. */
export const TfModules = (p: TfIconProps) => (
  <Svg {...p}>
    <path d="M3.5 3.5h7v7h-7zM13.5 3.5h7v7h-7zM3.5 13.5h7v7h-7zM13.5 13.5h7v7h-7z" />
  </Svg>
);

/** Stacked capital tiers on a baseline — funding and capital. */
export const TfCapital = (p: TfIconProps) => (
  <Svg {...p}>
    <ellipse cx="12" cy="6.5" rx="7" ry="2.5" />
    <path d="M5 6.5v11c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5v-11" />
    <path d="M5 12c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5" />
  </Svg>
);
