"use client";

import { CreaseDiagram, DiagramElement } from "@/types";

interface CreaseDiagramProps {
  diagram: CreaseDiagram;
  width?: number;
  height?: number;
  className?: string;
}

export default function CreaseDiagramComponent({
  diagram,
  width = 400,
  height = 300,
  className = "",
}: CreaseDiagramProps) {
  const viewBoxWidth = 200;
  const viewBoxHeight = 150;

  const renderElement = (element: DiagramElement, index: number) => {
    const { type, x = 0, y = 0, rotation = 0, label, pathPoints, size = 1 } = element;

    switch (type) {
      case "goalie":
        return (
          <g key={index} transform={`translate(${x}, ${y}) rotate(${rotation})`}>
            <rect
              x={-4 * size}
              y={-6 * size}
              width={8 * size}
              height={12 * size}
              fill="black"
              stroke="black"
              strokeWidth="1"
            />
            <circle cx={0} cy={-8 * size} r={3 * size} fill="black" />
            {label && (
              <text
                x={0}
                y={18 * size}
                textAnchor="middle"
                fontSize="8"
                fill="black"
                fontWeight="bold"
              >
                {label}
              </text>
            )}
          </g>
        );

      case "cone":
        return (
          <g key={index}>
            <circle cx={x} cy={y} r={2.5 * size} fill="none" stroke="black" strokeWidth="1.5" />
            <line x1={x - 2 * size} y1={y + 2 * size} x2={x + 2 * size} y2={y - 2 * size} stroke="black" strokeWidth="1.5" />
            {label && (
              <text
                x={x}
                y={y + 10}
                textAnchor="middle"
                fontSize="7"
                fill="black"
              >
                {label}
              </text>
            )}
          </g>
        );

      case "shooter":
        return (
          <g key={index} transform={`translate(${x}, ${y}) rotate(${rotation})`}>
            <circle cx={0} cy={0} r={4 * size} fill="white" stroke="black" strokeWidth="1.5" />
            <line x1={0} y1={-3 * size} x2={0} y2={3 * size} stroke="black" strokeWidth="1.5" />
            <line x1={-3 * size} y1={0} x2={3 * size} y2={0} stroke="black" strokeWidth="1.5" />
            {label && (
              <text
                x={0}
                y={12}
                textAnchor="middle"
                fontSize="7"
                fill="black"
              >
                {label}
              </text>
            )}
          </g>
        );

      case "puck":
        return (
          <g key={index}>
            <circle cx={x} cy={y} r={2 * size} fill="black" />
          </g>
        );

      case "screen":
        return (
          <g key={index} transform={`translate(${x}, ${y}) rotate(${rotation})`}>
            <rect
              x={-3 * size}
              y={-5 * size}
              width={6 * size}
              height={10 * size}
              fill="white"
              stroke="black"
              strokeWidth="1.5"
              strokeDasharray="2,2"
            />
            {label && (
              <text
                x={0}
                y={14}
                textAnchor="middle"
                fontSize="7"
                fill="black"
              >
                {label}
              </text>
            )}
          </g>
        );

      case "path":
        if (!pathPoints || pathPoints.length < 2) return null;
        const pathD = pathPoints
          .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
          .join(" ");
        return (
          <g key={index}>
            <path
              d={pathD}
              fill="none"
              stroke="black"
              strokeWidth="2"
              strokeDasharray="4,3"
            />
          </g>
        );

      case "arrow":
        if (!pathPoints || pathPoints.length < 2) return null;
        const start = pathPoints[0];
        const end = pathPoints[pathPoints.length - 1];
        const angle = Math.atan2(end.y - start.y, end.x - start.x);
        const arrowSize = 5;
        
        return (
          <g key={index}>
            <line
              x1={start.x}
              y1={start.y}
              x2={end.x}
              y2={end.y}
              stroke="black"
              strokeWidth="2"
            />
            <polygon
              points={`
                ${end.x},${end.y}
                ${end.x - arrowSize * Math.cos(angle - Math.PI / 6)},${end.y - arrowSize * Math.sin(angle - Math.PI / 6)}
                ${end.x - arrowSize * Math.cos(angle + Math.PI / 6)},${end.y - arrowSize * Math.sin(angle + Math.PI / 6)}
              `}
              fill="black"
            />
          </g>
        );

      case "label":
        return (
          <text
            key={index}
            x={x}
            y={y}
            textAnchor="middle"
            fontSize="8"
            fill="black"
            fontWeight="bold"
          >
            {label}
          </text>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`bg-white border-2 border-black ${className}`}>
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
        style={{ display: "block" }}
      >
        {/* Goal line and crease */}
        <line x1={0} y1={75} x2={200} y2={75} stroke="black" strokeWidth="1.5" />
        
        {/* Crease (semi-circle) */}
        <path
          d="M 85 75 Q 85 60, 100 55 Q 115 60, 115 75"
          fill="none"
          stroke="black"
          strokeWidth="1.5"
        />
        <line x1={85} y1={75} x2={85} y2={80} stroke="black" strokeWidth="1.5" />
        <line x1={115} y1={75} x2={115} y2={80} stroke="black" strokeWidth="1.5" />
        
        {/* Goal posts */}
        <rect x={88} y={73} width={2} height={4} fill="black" />
        <rect x={110} y={73} width={2} height={4} fill="black" />
        
        {/* Net */}
        <path
          d="M 88 75 L 88 78 L 100 80 L 112 78 L 112 75"
          fill="none"
          stroke="black"
          strokeWidth="1"
        />
        
        {/* Hash marks */}
        <line x1={70} y1={73} x2={70} y2={77} stroke="black" strokeWidth="1" />
        <line x1={130} y1={73} x2={130} y2={77} stroke="black" strokeWidth="1" />
        
        {/* Center line reference */}
        <line x1={100} y1={0} x2={100} y2={10} stroke="black" strokeWidth="0.5" strokeDasharray="2,2" />
        
        {/* Render drill-specific elements */}
        {diagram.elements.map((element, index) => renderElement(element, index))}
      </svg>
      
      {diagram.notes && (
        <div className="px-3 py-2 text-xs border-t border-black">
          {diagram.notes}
        </div>
      )}
    </div>
  );
}
