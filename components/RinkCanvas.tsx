import React from "react";

interface RinkCanvasProps {
  width?: number;
  height?: number;
  children?: React.ReactNode;
}

const RED = "#E11D2E";
const BLUE = "#2F6FED";

function FaceoffCircle({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  const arm = r * 0.2;
  const hashX = r * 0.2;
  const hashGap = r * 0.055;
  const hashH = r * 0.16;

  return (
    <g stroke={RED} strokeWidth="0.9" fill="none" strokeLinecap="butt">
      <circle cx={cx} cy={cy} r={r} />
      <circle cx={cx} cy={cy} r="0.9" fill={RED} stroke="none" />
      <line x1={cx - arm} y1={cy} x2={cx + arm} y2={cy} />
      <line x1={cx} y1={cy - arm} x2={cx} y2={cy + arm} />
      <line x1={cx - hashX} y1={cy - hashH} x2={cx - hashX} y2={cy + hashH} />
      <line x1={cx - hashX - hashGap} y1={cy - hashH} x2={cx - hashX - hashGap} y2={cy + hashH} />
      <line x1={cx + hashX} y1={cy - hashH} x2={cx + hashX} y2={cy + hashH} />
      <line x1={cx + hashX + hashGap} y1={cy - hashH} x2={cx + hashX + hashGap} y2={cy + hashH} />
    </g>
  );
}

export function InZoneCanvas({ width = 400, height = 400, children }: RinkCanvasProps) {
  const left = 12;
  const right = 188;
  const top = 16;
  const bottom = 176;
  const corner = 26;
  const mid = 100;
  const blueY = 56;
  const faceY = 120;
  const faceX = 44;
  const faceR = 30;
  const goalY = 162;

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 200 200"
      style={{ display: "block" }}
      className="bg-white"
    >
      {/* Boards: open at center ice, rounded end-board corners */}
      <path
        d={`
          M ${left} ${top + 1.6}
          L ${left} ${bottom - corner}
          Q ${left} ${bottom} ${left + corner} ${bottom}
          L ${right - corner} ${bottom}
          Q ${right} ${bottom} ${right} ${bottom - corner}
          L ${right} ${top + 1.6}
        `}
        fill="none"
        stroke={BLUE}
        strokeWidth="1.65"
        strokeLinecap="butt"
        strokeLinejoin="round"
      />

      {/* Center line — solid ends so the board joints stay red, not blue */}
      <line x1={left - 0.2} y1={top} x2={left + 4} y2={top} stroke={RED} strokeWidth="1.2" />
      <line
        x1={left + 3}
        y1={top}
        x2={right - 3}
        y2={top}
        stroke={RED}
        strokeWidth="1.1"
        strokeDasharray="2.2 1.9"
        strokeLinecap="round"
      />
      <line x1={right - 4} y1={top} x2={right + 0.2} y2={top} stroke={RED} strokeWidth="1.2" />

      {/* Center-ice circle (lower half) */}
      <path
        d={`M ${mid - 24} ${top} A 24 24 0 0 0 ${mid + 24} ${top}`}
        fill="none"
        stroke={RED}
        strokeWidth="1"
      />

      {/* Neutral-zone faceoff dots */}
      <circle cx={mid - faceX} cy={36} r="1.05" fill={RED} />
      <circle cx={mid + faceX} cy={36} r="1.05" fill={RED} />

      {/* Blue line */}
      <line
        x1={left}
        y1={blueY}
        x2={right}
        y2={blueY}
        stroke={BLUE}
        strokeWidth="2.5"
        strokeLinecap="butt"
      />

      <FaceoffCircle cx={mid - faceX} cy={faceY} r={faceR} />
      <FaceoffCircle cx={mid + faceX} cy={faceY} r={faceR} />

      {/* Short goal line so crease and net read as one unit */}
      <line
        x1={mid - 7}
        y1={goalY}
        x2={mid + 7}
        y2={goalY}
        stroke={RED}
        strokeWidth="1.05"
      />
      <path
        d={`M ${mid - 7} ${goalY} C ${mid - 7} ${goalY - 8.5} ${mid + 7} ${goalY - 8.5} ${mid + 7} ${goalY}`}
        fill="none"
        stroke={RED}
        strokeWidth="1.05"
      />
      <path
        d={`M ${mid - 5} ${goalY} L ${mid - 5} ${goalY + 5} Q ${mid} ${goalY + 6.2} ${mid + 5} ${goalY + 5} L ${mid + 5} ${goalY}`}
        fill="none"
        stroke={RED}
        strokeWidth="1.05"
        strokeLinejoin="round"
      />

      {children}
    </svg>
  );
}

export function CreaseCanvas({ width = 400, height = 400, children }: RinkCanvasProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 200 200"
      style={{ display: "block" }}
      className="bg-white border-2 border-black"
    >
      {/* Goal line (red) */}
      <line x1="0" y1="100" x2="200" y2="100" stroke="#DC143C" strokeWidth="3" />
      
      {/* Crease (large, light blue fill) */}
      <ellipse cx="100" cy="100" rx="45" ry="30" fill="#87CEEB" stroke="#DC143C" strokeWidth="2" />
      <path
        d="M 55 100 L 55 110 L 100 115 L 145 110 L 145 100"
        fill="none"
        stroke="#DC143C"
        strokeWidth="2"
      />
      
      {/* Crease arc details */}
      <line x1="55" y1="100" x2="55" y2="105" stroke="#DC143C" strokeWidth="2" />
      <line x1="145" y1="100" x2="145" y2="105" stroke="#DC143C" strokeWidth="2" />
      
      {/* Goal posts (red) */}
      <rect x="70" y="99" width="4" height="12" fill="#DC143C" />
      <rect x="126" y="99" width="4" height="12" fill="#DC143C" />
      
      {/* Goal cage (red net pattern) */}
      <rect x="70" y="100" width="60" height="18" fill="none" stroke="#DC143C" strokeWidth="2" />
      <path
        d="M 70 100 L 70 105 L 100 110 L 130 105 L 130 100"
        fill="#DC143C"
        opacity="0.4"
      />
      {/* Net lines */}
      <line x1="80" y1="100" x2="80" y2="118" stroke="#DC143C" strokeWidth="0.5" opacity="0.6" />
      <line x1="90" y1="100" x2="90" y2="118" stroke="#DC143C" strokeWidth="0.5" opacity="0.6" />
      <line x1="100" y1="100" x2="100" y2="118" stroke="#DC143C" strokeWidth="0.5" opacity="0.6" />
      <line x1="110" y1="100" x2="110" y2="118" stroke="#DC143C" strokeWidth="0.5" opacity="0.6" />
      <line x1="120" y1="100" x2="120" y2="118" stroke="#DC143C" strokeWidth="0.5" opacity="0.6" />
      
      {/* Hash marks */}
      <line x1="30" y1="98" x2="30" y2="102" stroke="black" strokeWidth="1.5" />
      <line x1="170" y1="98" x2="170" y2="102" stroke="black" strokeWidth="1.5" />
      <line x1="20" y1="98" x2="20" y2="102" stroke="black" strokeWidth="1" />
      <line x1="180" y1="98" x2="180" y2="102" stroke="black" strokeWidth="1" />
      
      {/* Reference lines (light gray) */}
      <line x1="100" y1="0" x2="100" y2="30" stroke="#CCCCCC" strokeWidth="0.5" strokeDasharray="2,2" />
      
      {children}
    </svg>
  );
}

