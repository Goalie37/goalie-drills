import React from "react";
import { DiagramElement, DiagramPath } from "@/types";

interface DiagramElementsProps {
  elements: DiagramElement[];
  paths: DiagramPath[];
  onElementClick?: (id: string) => void;
  selectedId?: string;
}

export function DiagramElements({ elements, paths, onElementClick, selectedId }: DiagramElementsProps) {
  const renderPath = (path: DiagramPath, index: number) => {
    if (path.points.length < 2) return null;

    const color = path.color === "green" ? "#00AA00" : path.color === "orange" ? "#FFA500" : "black";
    
    let pathD = "";
    
    if (path.type === "wavy") {
      // Create wavy path
      pathD = `M ${path.points[0].x} ${path.points[0].y}`;
      for (let i = 1; i < path.points.length; i++) {
        const prev = path.points[i - 1];
        const curr = path.points[i];
        const dx = curr.x - prev.x;
        const dy = curr.y - prev.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const waves = Math.max(3, Math.floor(dist / 10));
        
        for (let w = 0; w < waves; w++) {
          const t1 = w / waves;
          const t2 = (w + 0.5) / waves;
          const t3 = (w + 1) / waves;
          
          const x1 = prev.x + dx * t1;
          const y1 = prev.y + dy * t1;
          const x2 = prev.x + dx * t2;
          const y2 = prev.y + dy * t2;
          const x3 = prev.x + dx * t3;
          const y3 = prev.y + dy * t3;
          
          // Perpendicular offset
          const perpX = -dy / dist * 3;
          const perpY = dx / dist * 3;
          
          pathD += ` Q ${x2 + perpX} ${y2 + perpY} ${x3} ${y3}`;
        }
      }
    } else {
      // Straight or dashed path
      pathD = path.points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
    }

    const lastPoint = path.points[path.points.length - 1];
    const secondLastPoint = path.points[path.points.length - 2];
    const angle = secondLastPoint
      ? Math.atan2(lastPoint.y - secondLastPoint.y, lastPoint.x - secondLastPoint.x)
      : 0;

    return (
      <g key={`path-${index}`}>
        <path
          d={pathD}
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeDasharray={path.type === "dashed" ? "4,3" : "0"}
        />
        {path.hasArrow && (
          <polygon
            points={`
              ${lastPoint.x},${lastPoint.y}
              ${lastPoint.x - 6 * Math.cos(angle - Math.PI / 6)},${lastPoint.y - 6 * Math.sin(angle - Math.PI / 6)}
              ${lastPoint.x - 6 * Math.cos(angle + Math.PI / 6)},${lastPoint.y - 6 * Math.sin(angle + Math.PI / 6)}
            `}
            fill={color}
          />
        )}
      </g>
    );
  };

  const renderElement = (element: DiagramElement) => {
    const isSelected = element.id === selectedId;
    const strokeColor = isSelected ? "#FF6B00" : "black";
    const strokeWidth = isSelected ? 3 : 2;

    switch (element.type) {
      case "goalie":
        return (
          <g
            key={element.id}
            transform={`translate(${element.x}, ${element.y})`}
            onClick={() => onElementClick?.(element.id)}
            style={{ cursor: onElementClick ? "pointer" : "default" }}
          >
            <circle cx={0} cy={0} r={8} fill="#87CEEB" stroke={strokeColor} strokeWidth={strokeWidth} />
            <text
              x={0}
              y={0}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize="10"
              fontWeight="bold"
              fill="black"
            >
              {element.label || "G"}
            </text>
          </g>
        );

      case "shooter":
        return (
          <g
            key={element.id}
            transform={`translate(${element.x}, ${element.y})`}
            onClick={() => onElementClick?.(element.id)}
            style={{ cursor: onElementClick ? "pointer" : "default" }}
          >
            <line x1={-6} y1={-6} x2={6} y2={6} stroke={strokeColor} strokeWidth={strokeWidth} />
            <line x1={-6} y1={6} x2={6} y2={-6} stroke={strokeColor} strokeWidth={strokeWidth} />
            {element.label && (
              <text
                x={0}
                y={15}
                textAnchor="middle"
                fontSize="8"
                fontWeight="bold"
                fill="black"
              >
                {element.label}
              </text>
            )}
          </g>
        );

      case "cone":
        return (
          <g
            key={element.id}
            transform={`translate(${element.x}, ${element.y})`}
            onClick={() => onElementClick?.(element.id)}
            style={{ cursor: onElementClick ? "pointer" : "default" }}
          >
            <polygon
              points="0,-6 -4,6 4,6"
              fill="#FFA500"
              stroke={strokeColor}
              strokeWidth={strokeWidth === 3 ? 2 : 1}
            />
            {element.label && (
              <text
                x={0}
                y={15}
                textAnchor="middle"
                fontSize="7"
                fill="black"
              >
                {element.label}
              </text>
            )}
          </g>
        );

      case "puck":
        return (
          <g
            key={element.id}
            onClick={() => onElementClick?.(element.id)}
            style={{ cursor: onElementClick ? "pointer" : "default" }}
          >
            <circle
              cx={element.x}
              cy={element.y}
              r={strokeWidth === 3 ? 3 : 2}
              fill="black"
              stroke={isSelected ? "#FF6B00" : "none"}
              strokeWidth={strokeWidth}
            />
          </g>
        );

      case "screen":
        return (
          <g
            key={element.id}
            transform={`translate(${element.x}, ${element.y})`}
            onClick={() => onElementClick?.(element.id)}
            style={{ cursor: onElementClick ? "pointer" : "default" }}
          >
            <rect
              x={-6}
              y={-8}
              width={12}
              height={16}
              fill="white"
              stroke={strokeColor}
              strokeWidth={strokeWidth}
              strokeDasharray="2,2"
            />
            {element.label && (
              <text
                x={0}
                y={20}
                textAnchor="middle"
                fontSize="7"
                fill="black"
              >
                {element.label}
              </text>
            )}
          </g>
        );

      case "label":
        return (
          <text
            key={element.id}
            x={element.x}
            y={element.y}
            textAnchor="middle"
            fontSize="9"
            fontWeight="bold"
            fill="black"
            onClick={() => onElementClick?.(element.id)}
            style={{ cursor: onElementClick ? "pointer" : "default" }}
          >
            {element.label}
          </text>
        );

      default:
        return null;
    }
  };

  return (
    <>
      {paths.map((path, index) => renderPath(path, index))}
      {elements.map((element) => renderElement(element))}
    </>
  );
}
