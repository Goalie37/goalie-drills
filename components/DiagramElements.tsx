import React from "react";
import { DiagramElement, DiagramPath } from "@/types";

interface DiagramElementsProps {
  elements: DiagramElement[];
  paths: DiagramPath[];
  onElementClick?: (id: string) => void;
  selectedId?: string;
}

function shortenPathEnd(
  points: { x: number; y: number }[],
  amount: number
): { x: number; y: number }[] {
  if (points.length < 2 || amount <= 0) return points;

  const next = points.map((point) => ({ ...point }));
  let remaining = amount;

  while (next.length > 1 && remaining > 0) {
    const last = next[next.length - 1];
    const prev = next[next.length - 2];
    const dx = last.x - prev.x;
    const dy = last.y - prev.y;
    const dist = Math.hypot(dx, dy);

    if (dist > remaining) {
      next[next.length - 1] = {
        x: last.x - (dx / dist) * remaining,
        y: last.y - (dy / dist) * remaining,
      };
      remaining = 0;
    } else {
      next.pop();
      remaining -= dist;
    }
  }

  return next.length >= 2 ? next : points;
}

function arrowDirection(points: { x: number; y: number }[]) {
  const tip = points[points.length - 1];
  const minDist = 2.5;

  for (let i = points.length - 2; i >= 0; i--) {
    const dx = tip.x - points[i].x;
    const dy = tip.y - points[i].y;
    if (dx * dx + dy * dy >= minDist * minDist) {
      return Math.atan2(dy, dx);
    }
  }

  const prev = points[points.length - 2];
  return Math.atan2(tip.y - prev.y, tip.x - prev.x);
}

export function DiagramElements({ elements, paths, onElementClick, selectedId }: DiagramElementsProps) {
  const renderPath = (path: DiagramPath, index: number) => {
    if (path.points.length < 2) return null;

    const color = path.color === "green" ? "#00AA00" : path.color === "orange" ? "#FFA500" : "black";
    const arrowLength = 4.8;
    const drawPoints = path.hasArrow ? shortenPathEnd(path.points, arrowLength - 0.4) : path.points;
    
    let pathD = "";
    
    if (path.type === "wavy") {
      // Create wavy path
      pathD = `M ${drawPoints[0].x} ${drawPoints[0].y}`;
      for (let i = 1; i < drawPoints.length; i++) {
        const prev = drawPoints[i - 1];
        const curr = drawPoints[i];
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
      pathD = drawPoints.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
    }

    const tip = path.points[path.points.length - 1];
    const angle = arrowDirection(path.points);
    const wing = (Math.PI * 22) / 180;

    return (
      <g key={`path-${index}`}>
        <path
          d={pathD}
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="butt"
          strokeLinejoin="round"
          strokeDasharray={path.type === "dashed" ? "4,3" : "0"}
        />
        {path.hasArrow && (
          <polygon
            points={`${tip.x},${tip.y} ${
              tip.x - arrowLength * Math.cos(angle - wing)
            },${tip.y - arrowLength * Math.sin(angle - wing)} ${
              tip.x - arrowLength * Math.cos(angle + wing)
            },${tip.y - arrowLength * Math.sin(angle + wing)}`}
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
