import React from "react";

interface RinkCanvasProps {
  width?: number;
  height?: number;
  children?: React.ReactNode;
}

export function InZoneCanvas({ width = 400, height = 400, children }: RinkCanvasProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 200 200"
      style={{ display: "block" }}
      className="bg-white border-2 border-black"
    >
      {/* End boards */}
      <path
        d="M 10 10 Q 10 10, 10 30 L 10 170 Q 10 190, 10 190 L 190 190 Q 190 190, 190 170 L 190 30 Q 190 10, 190 10 Z"
        fill="none"
        stroke="black"
        strokeWidth="2"
      />
      
      {/* Rounded corners */}
      <path
        d="M 10 30 Q 10 10, 30 10 L 170 10 Q 190 10, 190 30"
        fill="none"
        stroke="black"
        strokeWidth="2"
      />
      
      {/* Goal line (red) */}
      <line x1="10" y1="160" x2="190" y2="160" stroke="#DC143C" strokeWidth="2" />
      
      {/* Blue line */}
      <line x1="10" y1="80" x2="190" y2="80" stroke="#0047AB" strokeWidth="3" />
      
      {/* Center line (dashed) */}
      <line x1="10" y1="40" x2="190" y2="40" stroke="black" strokeWidth="1" strokeDasharray="4,4" />
      
      {/* Crease (light blue fill) */}
      <ellipse cx="100" cy="160" rx="18" ry="12" fill="#87CEEB" stroke="#DC143C" strokeWidth="1.5" />
      <path
        d="M 82 160 L 82 166 L 100 169 L 118 166 L 118 160"
        fill="none"
        stroke="#DC143C"
        strokeWidth="1.5"
      />
      
      {/* Goal (red) */}
      <rect x="88" y="161" width="24" height="8" fill="none" stroke="#DC143C" strokeWidth="2" />
      <line x1="88" y1="161" x2="88" y2="169" stroke="#DC143C" strokeWidth="2" />
      <line x1="112" y1="161" x2="112" y2="169" stroke="#DC143C" strokeWidth="2" />
      <path
        d="M 88 161 L 88 165 L 100 167 L 112 165 L 112 161"
        fill="#DC143C"
        opacity="0.3"
      />
      
      {/* Left faceoff circle (red) */}
      <circle cx="60" cy="120" r="15" fill="none" stroke="#DC143C" strokeWidth="1.5" />
      <circle cx="60" cy="120" r="1" fill="#DC143C" />
      <line x1="55" y1="120" x2="50" y2="120" stroke="#DC143C" strokeWidth="1" />
      <line x1="65" y1="120" x2="70" y2="120" stroke="#DC143C" strokeWidth="1" />
      <line x1="60" y1="115" x2="60" y2="110" stroke="#DC143C" strokeWidth="1" />
      <line x1="60" y1="125" x2="60" y2="130" stroke="#DC143C" strokeWidth="1" />
      
      {/* Right faceoff circle (red) */}
      <circle cx="140" cy="120" r="15" fill="none" stroke="#DC143C" strokeWidth="1.5" />
      <circle cx="140" cy="120" r="1" fill="#DC143C" />
      <line x1="135" y1="120" x2="130" y2="120" stroke="#DC143C" strokeWidth="1" />
      <line x1="145" y1="120" x2="150" y2="120" stroke="#DC143C" strokeWidth="1" />
      <line x1="140" y1="115" x2="140" y2="110" stroke="#DC143C" strokeWidth="1" />
      <line x1="140" y1="125" x2="140" y2="130" stroke="#DC143C" strokeWidth="1" />
      
      {/* Hash marks near crease */}
      <line x1="75" y1="158" x2="75" y2="162" stroke="black" strokeWidth="1" />
      <line x1="125" y1="158" x2="125" y2="162" stroke="black" strokeWidth="1" />
      
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

export function DualCanvas({
  width = 800,
  height = 400,
  leftChildren,
  rightChildren,
}: {
  width?: number;
  height?: number;
  leftChildren?: React.ReactNode;
  rightChildren?: React.ReactNode;
}) {
  return (
    <div className="flex gap-4 border-2 border-black p-4 bg-white">
      <div className="flex-1">
        <div className="text-xs uppercase tracking-wider mb-2 font-bold">In-Zone View</div>
        <InZoneCanvas width={width / 2 - 24} height={height}>
          {leftChildren}
        </InZoneCanvas>
      </div>
      <div className="flex-1">
        <div className="text-xs uppercase tracking-wider mb-2 font-bold">Crease Detail</div>
        <CreaseCanvas width={width / 2 - 24} height={height}>
          {rightChildren}
        </CreaseCanvas>
      </div>
    </div>
  );
}
