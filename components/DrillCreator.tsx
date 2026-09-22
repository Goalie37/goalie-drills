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
  const [currentPath, setCurrentPath] = useState<DiagramPath | null>(null);
  const [pathMode, setPathMode] = useState<PathType | null>(null);
  const [pathColor, setPathColor] = useState<PathColor>("black");
  const [history, setHistory] = useState<any[]>([]);
  const [isDirty, setIsDirty] = useState(false);
  
  const canvasRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    setIsDirty(true);
  }, [name, description, elements, paths, categories, difficulty, duration, equipment, coachingCues, notes]);

  const handleDragStart = (type: DiagramElementType) => {
    setDraggedElement(type);
  };

  const handleCanvasDrop = useCallback(
    (e: React.DragEvent<SVGSVGElement>) => {
      e.preventDefault();
      if (!draggedElement) return;

      const svg = e.currentTarget;
      const rect = svg.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 200;
      const y = ((e.clientY - rect.top) / rect.height) * 200;

      const newElement: DiagramElement = {
        id: `${draggedElement}-${Date.now()}`,
        type: draggedElement,
        x,
        y,
        label: draggedElement === "goalie" ? "G" : undefined,
      };

      setHistory([...history, { elements, paths }]);
      setElements([...elements, newElement]);
      setDraggedElement(null);
    },
    [draggedElement, elements, paths, history]
  );

  const handleCanvasClick = useCallback(
    (e: React.MouseEvent<SVGSVGElement>) => {
      if (!pathMode) return;

      const svg = e.currentTarget;
      const rect = svg.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 200;
      const y = ((e.clientY - rect.top) / rect.height) * 200;

      if (currentPath) {
        setCurrentPath({
          ...currentPath,
          points: [...currentPath.points, { x, y }],
        });
      } else {
        setCurrentPath({
          type: pathMode,
          points: [{ x, y }],
          color: pathColor,
          hasArrow: false,
        });
      }
    },
    [pathMode, currentPath, pathColor]
  );

  const finishPath = useCallback(() => {
    if (currentPath && currentPath.points.length >= 2) {
      setHistory([...history, { elements, paths }]);
      setPaths([...paths, { ...currentPath, hasArrow: true }]);
      setCurrentPath(null);
      setPathMode(null);
    }
  }, [currentPath, paths, elements, history]);

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
    <div className="min-h-screen bg-white">
      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 pb-6 border-b-2 border-black">
          <h1 className="text-4xl font-bold uppercase tracking-wider">
            {initialDrill ? "Edit Drill" : "Create Drill"}
          </h1>
          <div className="flex space-x-4">
            <button
              onClick={undo}
              disabled={history.length === 0}
              className="px-6 py-3 border border-black text-sm uppercase tracking-wider hover:bg-black hover:text-white transition-colors disabled:opacity-30"
            >
              Undo
            </button>
            <button
              onClick={handleCancel}
              className="px-6 py-3 border border-black text-sm uppercase tracking-wider hover:bg-black hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-8 py-3 bg-black text-white text-sm uppercase tracking-wider hover:bg-gray-800 transition-colors"
            >
              Save Drill
            </button>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-8">
          {/* Left Panel - Metadata */}
          <div className="col-span-3 space-y-6">
            <div className="border-2 border-black p-6">
              <h2 className="text-xl font-bold uppercase tracking-wider mb-4 pb-2 border-b border-gray-300">
                Details
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider mb-2 font-bold">
                    Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 border border-black focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="Drill name"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider mb-2 font-bold">
                    Description
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-3 py-2 border border-black focus:outline-none focus:ring-2 focus:ring-black resize-none"
                    rows={3}
                    placeholder="Brief description"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider mb-2 font-bold">
                    Difficulty
                  </label>
                  <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value as any)}
                    className="w-full px-3 py-2 border border-black focus:outline-none focus:ring-2 focus:ring-black bg-white"
                  >
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                    <option>Elite</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider mb-2 font-bold">
                    Duration (min)
                  </label>
                  <input
                    type="number"
                    value={duration}
                    onChange={(e) => setDuration(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-black focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider mb-2 font-bold">
                    Categories
                  </label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {categories.map((cat) => (
                      <span
                        key={cat}
                        className="text-xs border border-black px-2 py-1 flex items-center gap-1"
                      >
                        {cat}
                        <button
                          onClick={() => removeCategory(cat)}
                          className="hover:text-red-600"
                        >
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
              </div>
            </div>

            <div className="border-2 border-black p-6">
              <h2 className="text-xl font-bold uppercase tracking-wider mb-4 pb-2 border-b border-gray-300">
                Equipment
              </h2>
              <div className="space-y-2 mb-2">
                {equipment.map((eq, i) => (
                  <div key={i} className="flex justify-between items-center text-sm">
                    <span>• {eq}</span>
                    <button
                      onClick={() => removeEquipment(i)}
                      className="text-xs hover:text-red-600"
                    >
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

            <div className="border-2 border-black p-6">
              <h2 className="text-xl font-bold uppercase tracking-wider mb-4 pb-2 border-b border-gray-300">
                Coaching Cues
              </h2>
              <div className="space-y-2 mb-2">
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
          </div>

          {/* Center - Canvas */}
          <div className="col-span-6">
            <div className="border-2 border-black p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold uppercase tracking-wider">
                  Diagram
                </h2>
                <div className="flex space-x-2">
                  {(["in-zone", "crease"] as DiagramCanvasType[]).map((type) => (
                    <button
                      key={type}
                      onClick={() => setCanvasType(type)}
                      className={`px-4 py-2 border border-black text-xs uppercase tracking-wider transition-colors ${
                        canvasType === type ? "bg-black text-white" : "hover:bg-gray-100"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div
                className="bg-gray-50 border-2 border-black p-4"
                onDragOver={(e) => e.preventDefault()}
              >
                <Canvas width={700} height={700}>
                  <g
                    ref={canvasRef}
                    onDrop={handleCanvasDrop}
                    onClick={handleCanvasClick}
                  >
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
              </div>

              {pathMode && (
                <div className="mt-4 flex justify-between items-center p-3 bg-black text-white">
                  <span className="text-sm uppercase tracking-wider">
                    Click to add path points
                  </span>
                  <div className="flex space-x-2">
                    <button
                      onClick={finishPath}
                      disabled={!currentPath || currentPath.points.length < 2}
                      className="px-4 py-2 border border-white text-xs uppercase tracking-wider hover:bg-white hover:text-black transition-colors disabled:opacity-30"
                    >
                      Finish Path
                    </button>
                    <button
                      onClick={() => {
                        setPathMode(null);
                        setCurrentPath(null);
                      }}
                      className="px-4 py-2 border border-white text-xs uppercase tracking-wider hover:bg-white hover:text-black transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {selectedId && (
                <div className="mt-4 flex justify-between items-center p-3 border-2 border-black">
                  <span className="text-sm uppercase tracking-wider">Element selected</span>
                  <button
                    onClick={deleteSelected}
                    className="px-4 py-2 bg-black text-white text-xs uppercase tracking-wider hover:bg-red-700 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>

            <div className="mt-6 border-2 border-black p-6">
              <h2 className="text-xl font-bold uppercase tracking-wider mb-4">
                Setup Notes
              </h2>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-4 py-3 border border-black focus:outline-none focus:ring-2 focus:ring-black resize-none"
                rows={3}
                placeholder="Add coaching notes or setup instructions..."
              />
            </div>
          </div>

          {/* Right Panel - Palette & Tools */}
          <div className="col-span-3 space-y-6">
            <div className="border-2 border-black p-6">
              <h2 className="text-xl font-bold uppercase tracking-wider mb-4 pb-2 border-b border-gray-300">
                Pieces
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {(["goalie", "shooter", "cone", "puck", "screen", "label"] as DiagramElementType[]).map(
                  (type) => (
                    <div
                      key={type}
                      draggable
                      onDragStart={() => handleDragStart(type)}
                      className="aspect-square border-2 border-black p-4 flex flex-col items-center justify-center cursor-move hover:bg-gray-100 transition-colors"
                    >
                      <div className="mb-2">
                        {type === "goalie" && (
                          <div className="w-10 h-10 rounded-full bg-[#87CEEB] border-2 border-black flex items-center justify-center font-bold">
                            G
                          </div>
                        )}
                        {type === "shooter" && (
                          <div className="w-10 h-10 flex items-center justify-center">
                            <svg width="40" height="40">
                              <line x1="5" y1="5" x2="35" y2="35" stroke="black" strokeWidth="3" />
                              <line x1="5" y1="35" x2="35" y2="5" stroke="black" strokeWidth="3" />
                            </svg>
                          </div>
                        )}
                        {type === "cone" && (
                          <div className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-b-[30px] border-b-[#FFA500]" />
                        )}
                        {type === "puck" && (
                          <div className="w-6 h-6 rounded-full bg-black" />
                        )}
                        {type === "screen" && (
                          <div className="w-10 h-12 border-2 border-dashed border-black" />
                        )}
                        {type === "label" && (
                          <div className="text-2xl font-bold">A</div>
                        )}
                      </div>
                      <span className="text-xs uppercase tracking-wider">{type}</span>
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="border-2 border-black p-6">
              <h2 className="text-xl font-bold uppercase tracking-wider mb-4 pb-2 border-b border-gray-300">
                Paths
              </h2>
              <div className="space-y-3">
                {(["solid", "wavy", "dashed"] as PathType[]).map((type) => (
                  <button
                    key={type}
                    onClick={() => setPathMode(type)}
                    className={`w-full px-4 py-3 border-2 border-black text-sm uppercase tracking-wider transition-colors ${
                      pathMode === type ? "bg-black text-white" : "hover:bg-gray-100"
                    }`}
                  >
                    {type} line
                  </button>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-gray-300">
                <label className="block text-xs uppercase tracking-wider mb-2 font-bold">
                  Color
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(["black", "green", "orange"] as PathColor[]).map((color) => (
                    <button
                      key={color}
                      onClick={() => setPathColor(color)}
                      className={`px-3 py-2 border-2 border-black text-xs uppercase ${
                        pathColor === color ? "bg-black text-white" : ""
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-2 border-black p-6 bg-gray-50">
              <h2 className="text-sm font-bold uppercase tracking-wider mb-3">
                Instructions
              </h2>
              <ul className="text-xs space-y-2">
                <li>• Drag pieces onto the ice</li>
                <li>• Click a path type, then click points on canvas</li>
                <li>• Select elements to delete</li>
                <li>• Fill in details and save</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
