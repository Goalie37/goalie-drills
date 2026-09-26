import React from "react";

interface RinkCanvasProps {
  width?: number;
  height?: number;
  children?: React.ReactNode;
}

/** Artwork is drawn in this pixel space, matching the reference zone's proportions. */
const ART = { width: 476, height: 346 };

/**
 * Diagram coordinates. Width stays at 200 so markers keep their scale.
 * Height is locked to the zone's aspect ratio so the rink cannot stretch.
 */
export const RINK_VIEW = {
  width: 200,
  height: (200 * ART.height) / ART.width,
} as const;

const RED = "#E33928";
const BLUE = "#1D3C93";

function FaceoffCircle({ cx, cy }: { cx: number; cy: number }) {
  const r = 58;
  const hash = 3.5;

  return (
    <g stroke={RED} fill="none" strokeLinecap="butt">
      <circle cx={cx} cy={cy} r={r} strokeWidth={3.5} />
      {/* Two horizontal ticks on each side of the circle */}
      {[-1, 1].map((side) =>
        [-7.5, 8.5].map((dy) => (
          <line
            key={`${side}-${dy}`}
            x1={cx + side * r - side * 4}
            y1={cy + dy}
            x2={cx + side * r + side * 8}
            y2={cy + dy}
            strokeWidth={hash}
          />
        ))
      )}
      <circle cx={cx} cy={cy} r={4.5} fill={RED} stroke="none" />
    </g>
  );
}

function RinkArt() {
  const scale = RINK_VIEW.width / ART.width;

  return (
    <g transform={`scale(${scale})`}>
      {/* Center circle sits on the red line; the line is drawn over it */}
      <circle cx={232} cy={16} r={59} fill="none" stroke={BLUE} strokeWidth={3} />

      <line x1={18} y1={111} x2={447} y2={111} stroke={BLUE} strokeWidth={5} />

      <path
        d="M 22 0 L 22 286 A 40 40 0 0 0 62 326 L 402.5 326 A 40 40 0 0 0 442.5 286 L 442.5 0"
        fill="none"
        stroke={BLUE}
        strokeWidth={7}
        strokeLinejoin="round"
      />

      <line x1={25} y1={16} x2={439} y2={16} stroke={RED} strokeWidth={10} />
      {Array.from({ length: 19 }, (_, i) => (
        <circle key={i} cx={32 + i * 22} cy={16} r={2.2} fill="white" />
      ))}

      <circle cx={125} cy={84.5} r={8} fill={RED} />
      <circle cx={339} cy={84.5} r={8} fill={RED} />

      <FaceoffCircle cx={126.5} cy={202} />
      <FaceoffCircle cx={339} cy={202} />

      <line x1={28} y1={282} x2={436} y2={282} stroke={RED} strokeWidth={5} />
      <path
        d="M 214 282 A 18 18 0 0 1 250 282"
        fill="none"
        stroke={RED}
        strokeWidth={3}
      />
      <path
        d="M 218 268 L 218 295 L 246 295 L 246 268"
        fill="none"
        stroke={RED}
        strokeWidth={3.5}
        strokeLinejoin="miter"
      />
      <line x1={170} y1={286} x2={154} y2={322} stroke={RED} strokeWidth={4} />
      <line x1={294} y1={286} x2={310} y2={322} stroke={RED} strokeWidth={4} />
    </g>
  );
}

function RinkSurface({ width = 600, children }: RinkCanvasProps) {
  const height = width * (RINK_VIEW.height / RINK_VIEW.width);

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${RINK_VIEW.width} ${RINK_VIEW.height}`}
      preserveAspectRatio="xMidYMid meet"
      style={{ display: "block" }}
      className="bg-white"
    >
      <RinkArt />
      {children}
    </svg>
  );
}

export const InZoneCanvas = RinkSurface;
export const CreaseCanvas = RinkSurface;
