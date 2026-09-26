"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Drill,
  CreaseDiagram,
  DiagramCanvasType,
  DiagramElement,
  DiagramPath,
  DiagramElementType,
  PathType,
  PathColor,
} from "@/types";
import { InZoneCanvas, CreaseCanvas } from "@/components/RinkCanvas";
import { DiagramElements } from "@/components/DiagramElements";

interface DrillCreatorProps {
  initialDrill?: Drill;
}

function HoverRail({
  side,
  label,
  open,
  pinned,
  onPinToggle,
  onHoverChange,
  children,
}: {
  side: "left" | "right";
  label: string;
  open: boolean;
  pinned: boolean;
  onPinToggle: () => void;
  onHoverChange: (hovering: boolean) => void;
  children: React.ReactNode;
}) {
  const isLeft = side === "left";

  return (
    <aside
      className={`absolute inset-y-0 z-20 flex ${isLeft ? "left-0" : "right-0 flex-row-reverse"}`}
      onMouseEnter={() => onHoverChange(true)}
      onMouseLeave={() => onHoverChange(false)}
    >
      <button
        type="button"
        onClick={onPinToggle}
        aria-pressed={pinned}
        aria-expanded={open}
        title={pinned ? `Unpin ${label}` : `Pin ${label}`}
        className={`relative z-30 w-10 shrink-0 border-black flex items-center justify-center transition-colors ${
          isLeft ? "border-r-2" : "border-l-2"
        } ${pinned ? "bg-black text-white" : "bg-white hover:bg-gray-50"}`}
      >
        <span className="text-[11px] font-bold uppercase tracking-[0.22em] -rotate-90 whitespace-nowrap">
          {label}
        </span>
      </button>
      <div
        className={`h-full shrink-0 overflow-hidden transition-[width] duration-200 ease-out ${
          open ? "w-80" : "w-0"
        } ${isLeft ? "border-r-2" : "border-l-2"} ${
          open ? "border-black bg-white shadow-xl" : "border-transparent"
        }`}
      >
        <div className="w-80 h-full overflow-y-auto p-5 space-y-6">{children}</div>
      </div>
    </aside>
  );
}

export default function DrillCreator({ initialDrill }: DrillCreatorProps) {
  const router = useRouter();
  const [name, setName] = useState(initialDrill?.name || "");
  const [description, setDescription] = useState(initialDrill?.description || "");
  const [categories, setCategories] = useState<string[]>(initialDrill?.categories || []);
  const [difficulty, setDifficulty] = useState<Drill["difficulty"]>(
    initialDrill?.difficulty || "Intermediate"
  );
  const [duration, setDuration] = useState(initialDrill?.duration || 15);
  const [equipment, setEquipment] = useState<string[]>(initialDrill?.equipment || []);
  const [coachingCues, setCoachingCues] = useState<string[]>(
    initialDrill?.coachingCues || []
  );
  const [notes, setNotes] = useState(initialDrill?.diagram?.notes || "");
  
  const [canvasType, setCanvasType] = useState<DiagramCanvasType>(
    initialDrill?.diagram?.canvasType || "in-zone"
  );
  const [elements, setElements] = useState<DiagramElement[]>(
    initialDrill?.diagram?.elements || []
  );
  const [paths, setPaths] = useState<DiagramPath[]>(initialDrill?.diagram?.paths || []);
  
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);
  const [draggedElement, setDraggedElement] = useState<DiagramElementType | null>(null);
  const [draggedPathType, setDraggedPathType] = useState<PathType | null>(null);
  const [currentPath, setCurrentPath] = useState<DiagramPath | null>(null);
  const [pathMode, setPathMode] = useState<PathType | null>(null);
  const [pathColor, setPathColor] = useState<PathColor>("black");
  const [history, setHistory] = useState<any[]>([]);
  const [isDirty, setIsDirty] = useState(false);
  const [leftPinned, setLeftPinned] = useState(false);
  const [rightPinned, setRightPinned] = useState(false);
  const [hoveredSide, setHoveredSide] = useState<"left" | "right" | null>(null);

  const canvasWrapRef = useRef<HTMLDivElement>(null);
  const drawingRef = useRef(false);
  const pathPointsRef = useRef<{ x: number; y: number }[]>([]);
  const pathModeRef = useRef<PathType | null>(null);
  const pathColorRef = useRef<PathColor>("black");
  const draggedPathTypeRef = useRef<PathType | null>(null);
  const elementsRef = useRef(elements);
  const pathsRef = useRef(paths);
  pathModeRef.current = pathMode;
  pathColorRef.current = pathColor;
  draggedPathTypeRef.current = draggedPathType;
  elementsRef.current = elements;
  pathsRef.current = paths;

  const leftOpen = leftPinned || hoveredSide === "left";
  const rightOpen =
    rightPinned || hoveredSide === "right" || !!draggedElement || !!draggedPathType;

  useEffect(() => {
    setIsDirty(true);
  }, [name, description, elements, paths, categories, difficulty, duration, equipment, coachingCues, notes]);

  const handleDragStart = (type: DiagramElementType) => {
    setDraggedElement(type);
  };

  const getCanvasPoint = useCallback((clientX: number, clientY: number) => {
    const svg = canvasWrapRef.current?.querySelector("svg");
    if (!svg) return null;
    const rect = svg.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return null;
    return {
      x: Math.min(200, Math.max(0, ((clientX - rect.left) / rect.width) * 200)),
      y: Math.min(200, Math.max(0, ((clientY - rect.top) / rect.height) * 200)),
    };
  }, []);

  const startPathDraw = useCallback((type: PathType, point: { x: number; y: number }) => {
    drawingRef.current = true;
    pathPointsRef.current = [point];
    setCurrentPath({
      type,
      points: [point],
      color: pathColorRef.current,
      hasArrow: false,
    });
  }, []);

  const extendPathDraw = useCallback((point: { x: number; y: number }) => {
    if (!drawingRef.current) return;
    const points = pathPointsRef.current;
    const last = points[points.length - 1];
    if (last) {
      const dx = point.x - last.x;
      const dy = point.y - last.y;
      const minDist = pathModeRef.current === "wavy" ? 8 : 2.5;
      if (dx * dx + dy * dy < minDist * minDist) return;
    }
    const next = [...points, point];
    pathPointsRef.current = next;
    setCurrentPath((path) => (path ? { ...path, points: next } : path));
  }, []);

  const finishPathDraw = useCallback(() => {
    if (!drawingRef.current) return;
    drawingRef.current = false;
    const points = pathPointsRef.current;
    const type = pathModeRef.current;
    if (points.length >= 2 && type) {
      setHistory((history) => [
        ...history,
        { elements: elementsRef.current, paths: pathsRef.current },
      ]);
      setPaths((current) => [
        ...current,
        {
          type,
          points,
          color: pathColorRef.current,
          hasArrow: true,
        },
      ]);
    }
    pathPointsRef.current = [];
    setCurrentPath(null);
  }, []);

  const handleCanvasDragOver = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const pathType = draggedPathTypeRef.current;
      if (!pathType) return;
      const point = getCanvasPoint(e.clientX, e.clientY);
      if (!point) return;
      if (!drawingRef.current) {
        startPathDraw(pathType, point);
      } else {
        extendPathDraw(point);
      }
    },
    [extendPathDraw, getCanvasPoint, startPathDraw]
  );

  const handleCanvasDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      if (draggedPathTypeRef.current) {
        finishPathDraw();
        setDraggedPathType(null);
        draggedPathTypeRef.current = null;
        return;
      }
      if (!draggedElement) return;

      const point = getCanvasPoint(e.clientX, e.clientY);
      if (!point) return;

      const newElement: DiagramElement = {
        id: `${draggedElement}-${Date.now()}`,
        type: draggedElement,
        x: point.x,
        y: point.y,
        label: draggedElement === "goalie" ? "G" : undefined,
      };

      setHistory((history) => [
        ...history,
        { elements: elementsRef.current, paths: pathsRef.current },
      ]);
      setElements((current) => [...current, newElement]);
      setDraggedElement(null);
    },
    [draggedElement, finishPathDraw, getCanvasPoint]
  );

  const handleCanvasPointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!pathModeRef.current || draggedElement || e.button !== 0) return;
      if (!(e.target instanceof Element) || !e.target.closest("svg")) return;
      try {
        e.currentTarget.setPointerCapture(e.pointerId);
      } catch {
        // Synthetic or already-released pointers can throw here.
      }
      const point = getCanvasPoint(e.clientX, e.clientY);
      if (point) startPathDraw(pathModeRef.current, point);
    },
    [draggedElement, getCanvasPoint, startPathDraw]
  );

  const handleCanvasPointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!drawingRef.current || draggedPathTypeRef.current) return;
      const point = getCanvasPoint(e.clientX, e.clientY);
      if (point) extendPathDraw(point);
    },
    [extendPathDraw, getCanvasPoint]
  );

  const pathDragOccurredRef = useRef(false);

  const handlePathDragStart = (type: PathType) => (e: React.DragEvent) => {
    e.dataTransfer.setData("text/plain", type);
    e.dataTransfer.effectAllowed = "copy";
    pathDragOccurredRef.current = true;
    draggedPathTypeRef.current = type;
    setDraggedPathType(type);
    setPathMode(type);
  };

  const handlePathDragEnd = () => {
    finishPathDraw();
    draggedPathTypeRef.current = null;
    setDraggedPathType(null);
  };

  const handleElementClick = useCallback((id: string) => {
    setSelectedId((prev) => (prev === id ? undefined : id));
  }, []);

  const deleteSelected = useCallback(() => {
    if (selectedId) {
      setHistory([...history, { elements, paths }]);
      setElements(elements.filter((e) => e.id !== selectedId));
      setSelectedId(undefined);
    }
  }, [selectedId, elements, paths, history]);

  const undo = useCallback(() => {
    if (history.length > 0) {
      const prev = history[history.length - 1];
      setElements(prev.elements);
      setPaths(prev.paths);
      setHistory(history.slice(0, -1));
    }
  }, [history]);

  const handleSave = useCallback(() => {
    if (!name.trim()) {
      alert("Please enter a drill name");
      return;
    }

    const drill: Drill = {
      id: initialDrill?.id || `custom-${Date.now()}`,
      name: name.trim(),
      description: description.trim(),
      categories,
      difficulty,
      duration,
      equipment,
      coachingCues,
      diagram: {
        canvasType,
        elements,
        paths,
        notes,
      },
    };

    // Save to localStorage
    const saved = typeof window !== "undefined" ? localStorage.getItem("custom-drills") : null;
    const customDrills = saved ? JSON.parse(saved) : [];
    const existingIndex = customDrills.findIndex((d: Drill) => d.id === drill.id);
    
    if (existingIndex >= 0) {
      customDrills[existingIndex] = drill;
    } else {
      customDrills.push(drill);
    }
    
    localStorage.setItem("custom-drills", JSON.stringify(customDrills));
    setIsDirty(false);
    router.push("/drills");
  }, [name, description, categories, difficulty, duration, equipment, coachingCues, canvasType, elements, paths, notes, initialDrill, router]);

  const handleCancel = useCallback(() => {
    if (isDirty && !confirm("Discard changes?")) return;
    router.push("/drills");
  }, [isDirty, router]);

  const addCategory = (cat: string) => {
    if (cat && !categories.includes(cat)) {
      setCategories([...categories, cat]);
    }
  };

  const removeCategory = (cat: string) => {
    setCategories(categories.filter((c) => c !== cat));
  };

  const addEquipment = (eq: string) => {
    if (eq) {
      setEquipment([...equipment, eq]);
    }
  };

  const removeEquipment = (index: number) => {
    setEquipment(equipment.filter((_, i) => i !== index));
  };

  const addCoachingCue = (cue: string) => {
    if (cue) {
      setCoachingCues([...coachingCues, cue]);
    }
  };

  const removeCoachingCue = (index: number) => {
    setCoachingCues(coachingCues.filter((_, i) => i !== index));
  };

  const Canvas = canvasType === "crease" ? CreaseCanvas : InZoneCanvas;

  return (
    <div data-editor className="bg-white min-h-[calc(100vh-4rem)] flex flex-col">
      <header className="flex items-center justify-between gap-4 px-4 py-3 border-b-2 border-black">
        <div className="min-w-0">
          <h1 className="text-lg font-bold uppercase tracking-wider">
            {initialDrill ? "Edit Drill" : "Create Drill"}
          </h1>
          <p className="text-sm text-gray-600 truncate">{name || "Untitled drill"}</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {(["in-zone", "crease"] as DiagramCanvasType[]).map((type) => (
            <button
              key={type}
              onClick={() => setCanvasType(type)}
              className={`px-3 py-1.5 border border-black text-xs uppercase tracking-wider transition-colors ${
                canvasType === type ? "bg-black text-white" : "hover:bg-gray-100"
              }`}
            >
              {type}
            </button>
          ))}
          <button
            onClick={undo}
            disabled={history.length === 0}
            className="px-3 py-1.5 border border-black text-xs uppercase tracking-wider hover:bg-black hover:text-white transition-colors disabled:opacity-30"
          >
            Undo
          </button>
          <button
            onClick={handleCancel}
            className="px-3 py-1.5 border border-black text-xs uppercase tracking-wider hover:bg-black hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-1.5 bg-black text-white text-xs uppercase tracking-wider hover:bg-gray-800 transition-colors"
          >
            Save Drill
          </button>
        </div>
      </header>

      <div className="relative flex-1 min-h-[640px]">
        <HoverRail
          side="left"
          label="Details"
          open={leftOpen}
          pinned={leftPinned}
          onPinToggle={() => setLeftPinned((pinned) => !pinned)}
          onHoverChange={(hovering) =>
            setHoveredSide((side) => {
              if (hovering) return "left";
              return side === "left" ? null : side;
            })
          }
        >
          <section
            className="space-y-4"
            onFocusCapture={() => setLeftPinned(true)}
          >
            <div>
              <label className="block text-[11px] uppercase tracking-wider mb-1.5 font-bold">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-black text-sm focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Drill name"
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider mb-1.5 font-bold">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 border border-black text-sm focus:outline-none focus:ring-2 focus:ring-black resize-none"
                rows={3}
                placeholder="Brief description"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] uppercase tracking-wider mb-1.5 font-bold">
                  Difficulty
                </label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value as Drill["difficulty"])}
                  className="w-full px-3 py-2 border border-black text-sm focus:outline-none focus:ring-2 focus:ring-black bg-white"
                >
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                  <option>Elite</option>
                </select>
              </div>
              <div>
                <label className="block text-[11px] uppercase tracking-wider mb-1.5 font-bold">
                  Minutes
                </label>
                <input
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-black text-sm focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider mb-1.5 font-bold">
                Categories
              </label>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {categories.map((cat) => (
                  <span
                    key={cat}
                    className="text-xs border border-black px-2 py-1 flex items-center gap-1"
                  >
                    {cat}
                    <button onClick={() => removeCategory(cat)} className="hover:text-red-600">
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <input
                type="text"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    addCategory((e.target as HTMLInputElement).value);
                    (e.target as HTMLInputElement).value = "";
                  }
                }}
                className="w-full px-3 py-2 border border-black text-xs"
                placeholder="Type + Enter"
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider mb-1.5 font-bold">
                Equipment
              </label>
              <div className="space-y-1.5 mb-2">
                {equipment.map((eq, i) => (
                  <div key={i} className="flex justify-between items-center text-sm">
                    <span>• {eq}</span>
                    <button onClick={() => removeEquipment(i)} className="text-xs hover:text-red-600">
                      ×
                    </button>
                  </div>
                ))}
              </div>
              <input
                type="text"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    addEquipment((e.target as HTMLInputElement).value);
                    (e.target as HTMLInputElement).value = "";
                  }
                }}
                className="w-full px-3 py-2 border border-black text-xs"
                placeholder="Type + Enter"
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider mb-1.5 font-bold">
                Coaching Cues
              </label>
              <div className="space-y-1.5 mb-2">
                {coachingCues.map((cue, i) => (
                  <div key={i} className="flex justify-between items-start text-sm">
                    <span className="flex-1">{cue}</span>
                    <button
                      onClick={() => removeCoachingCue(i)}
                      className="text-xs hover:text-red-600 ml-2"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              <textarea
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    addCoachingCue((e.target as HTMLTextAreaElement).value);
                    (e.target as HTMLTextAreaElement).value = "";
                  }
                }}
                className="w-full px-3 py-2 border border-black text-xs resize-none"
                rows={2}
                placeholder="Type + Enter"
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider mb-1.5 font-bold">
                Setup Notes
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3 py-2 border border-black text-sm focus:outline-none focus:ring-2 focus:ring-black resize-none"
                rows={3}
                placeholder="Coaching notes or setup instructions"
              />
            </div>
          </section>
        </HoverRail>

        <div className="h-full px-14 py-6 flex flex-col items-center justify-center">
          <div
            ref={canvasWrapRef}
            className={`relative w-full max-w-[min(72vh,760px)] [&_svg]:w-full [&_svg]:h-auto ${
              pathMode ? "cursor-crosshair" : ""
            }`}
            onDragOver={handleCanvasDragOver}
            onDrop={handleCanvasDrop}
            onPointerDown={handleCanvasPointerDown}
            onPointerMove={handleCanvasPointerMove}
            onPointerUp={finishPathDraw}
            onPointerCancel={finishPathDraw}
          >
            <Canvas width={760} height={760}>
              <g>
                <rect x="0" y="0" width="200" height="200" fill="transparent" />
                <DiagramElements
                  elements={elements}
                  paths={paths}
                  onElementClick={handleElementClick}
                  selectedId={selectedId}
                />
                {currentPath && currentPath.points.length > 0 && (
                  <DiagramElements elements={[]} paths={[currentPath]} />
                )}
              </g>
            </Canvas>

            {pathMode && (
              <div className="absolute inset-x-0 bottom-0 flex justify-between items-center p-3 bg-black text-white">
                <span className="text-xs uppercase tracking-wider">
                  Drag on the ice to draw
                </span>
                <button
                  onClick={() => {
                    drawingRef.current = false;
                    pathPointsRef.current = [];
                    setPathMode(null);
                    setCurrentPath(null);
                  }}
                  className="px-3 py-1.5 border border-white text-xs uppercase tracking-wider hover:bg-white hover:text-black transition-colors"
                >
                  Done
                </button>
              </div>
            )}

            {selectedId && (
              <div className="absolute inset-x-0 top-0 flex justify-between items-center p-3 bg-white/95 border-b-2 border-black">
                <span className="text-xs uppercase tracking-wider">Element selected</span>
                <button
                  onClick={deleteSelected}
                  className="px-3 py-1.5 bg-black text-white text-xs uppercase tracking-wider hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
          <p className="mt-3 text-[11px] uppercase tracking-wider text-gray-500">
            Hover the edges for details and pieces
          </p>
        </div>

        <HoverRail
          side="right"
          label="Tools"
          open={rightOpen}
          pinned={rightPinned}
          onPinToggle={() => setRightPinned((pinned) => !pinned)}
          onHoverChange={(hovering) =>
            setHoveredSide((side) => {
              if (hovering) return "right";
              return side === "right" ? null : side;
            })
          }
        >
          <section>
            <h2 className="text-sm font-bold uppercase tracking-wider mb-3">Pieces</h2>
            <div className="grid grid-cols-3 gap-2">
              {(["goalie", "shooter", "cone", "puck", "screen", "label"] as DiagramElementType[]).map(
                (type) => (
                  <div
                    key={type}
                    draggable
                    onDragStart={() => handleDragStart(type)}
                    className="aspect-square border border-black p-2 flex flex-col items-center justify-center cursor-move hover:bg-gray-100 transition-colors"
                  >
                    {type === "goalie" && (
                      <div className="w-8 h-8 rounded-full bg-[#87CEEB] border-2 border-black flex items-center justify-center text-xs font-bold">
                        G
                      </div>
                    )}
                    {type === "shooter" && (
                      <svg width="28" height="28">
                        <line x1="4" y1="4" x2="24" y2="24" stroke="black" strokeWidth="3" />
                        <line x1="4" y1="24" x2="24" y2="4" stroke="black" strokeWidth="3" />
                      </svg>
                    )}
                    {type === "cone" && (
                      <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-b-[18px] border-b-[#FFA500]" />
                    )}
                    {type === "puck" && <div className="w-5 h-5 rounded-full bg-black" />}
                    {type === "screen" && (
                      <div className="w-7 h-8 border-2 border-dashed border-black" />
                    )}
                    {type === "label" && <div className="text-xl font-bold">A</div>}
                    <span className="mt-1 text-[10px] uppercase tracking-wider">{type}</span>
                  </div>
                )
              )}
            </div>
          </section>

          <section>
            <h2 className="text-sm font-bold uppercase tracking-wider mb-3">Paths</h2>
            <div className="space-y-2">
              {(["solid", "wavy", "dashed"] as PathType[]).map((type) => (
                <div
                  key={type}
                  role="button"
                  tabIndex={0}
                  draggable
                  onClick={() => {
                    if (pathDragOccurredRef.current) {
                      pathDragOccurredRef.current = false;
                      return;
                    }
                    setPathMode((current) => (current === type ? null : type));
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setPathMode((current) => (current === type ? null : type));
                    }
                  }}
                  onDragStart={handlePathDragStart(type)}
                  onDragEnd={handlePathDragEnd}
                  className={`w-full px-3 py-2 border border-black text-xs uppercase tracking-wider cursor-move transition-colors ${
                    pathMode === type ? "bg-black text-white" : "hover:bg-gray-100"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <svg width="40" height="12" viewBox="0 0 40 12" aria-hidden="true">
                      {type === "wavy" ? (
                        <path
                          d="M 2 6 Q 8 1 14 6 T 26 6 T 38 6"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                      ) : (
                        <line
                          x1="2"
                          y1="6"
                          x2="38"
                          y2="6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeDasharray={type === "dashed" ? "4 3" : undefined}
                        />
                      )}
                    </svg>
                    {type} line
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-3">
              <label className="block text-[11px] uppercase tracking-wider mb-1.5 font-bold">
                Color
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(["black", "green", "orange"] as PathColor[]).map((color) => (
                  <button
                    key={color}
                    onClick={() => setPathColor(color)}
                    className={`px-2 py-1.5 border border-black text-[10px] uppercase ${
                      pathColor === color ? "bg-black text-white" : ""
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          </section>

          <p className="text-[11px] text-gray-500 leading-relaxed">
            Drag pieces onto the ice. Drag a line onto the rink, or select a path
            and draw by dragging. Click a rail to pin it open.
          </p>
        </HoverRail>
      </div>
    </div>
  );
}
