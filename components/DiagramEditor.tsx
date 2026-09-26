"use client";

import { useState, useRef, useCallback } from "react";
import {
  CreaseDiagram,
  DiagramCanvasType,
  DiagramElement,
  DiagramPath,
  DiagramElementType,
  PathType,
  PathColor,
} from "@/types";
import { InZoneCanvas, CreaseCanvas } from "./RinkCanvas";
import { DiagramElements } from "./DiagramElements";

interface DiagramEditorProps {
  initialDiagram: CreaseDiagram;
  onSave: (diagram: CreaseDiagram) => void;
  onCancel: () => void;
}

type Tool =
  | "select"
  | "goalie"
  | "shooter"
  | "cone"
  | "puck"
  | "screen"
  | "label"
  | "path-solid"
  | "path-wavy"
  | "path-dashed";

export default function DiagramEditor({
  initialDiagram,
  onSave,
  onCancel,
}: DiagramEditorProps) {
  const [canvasType, setCanvasType] = useState<DiagramCanvasType>(
    initialDiagram.canvasType
  );
  const [elements, setElements] = useState<DiagramElement[]>(
    initialDiagram.elements
  );
  const [paths, setPaths] = useState<DiagramPath[]>(initialDiagram.paths);
  const [selectedTool, setSelectedTool] = useState<Tool>("select");
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);
  const [currentPath, setCurrentPath] = useState<DiagramPath | null>(null);
  const [pathColor, setPathColor] = useState<PathColor>("black");
  const [history, setHistory] = useState<{ elements: DiagramElement[]; paths: DiagramPath[] }[]>([]);
  const handleCanvasClick = useCallback(
    (e: React.MouseEvent<SVGSVGElement>) => {
      const svg = e.currentTarget;
      const rect = svg.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 200;
      const y = ((e.clientY - rect.top) / rect.height) * 200;

      // Save history
      setHistory([...history, { elements, paths }]);

      if (selectedTool.startsWith("path-")) {
        // Path drawing
        const pathType: PathType = selectedTool.replace("path-", "") as PathType;
        
        if (currentPath) {
          // Add point to current path
          setCurrentPath({
            ...currentPath,
            points: [...currentPath.points, { x, y }],
          });
        } else {
          // Start new path
          setCurrentPath({
            type: pathType,
            points: [{ x, y }],
            color: pathColor,
            hasArrow: false,
          });
        }
      } else if (selectedTool !== "select") {
        // Place element
        const newElement: DiagramElement = {
          id: `${selectedTool}-${Date.now()}`,
          type: selectedTool as DiagramElementType,
          x,
          y,
          label: selectedTool === "goalie" ? "G" : undefined,
        };
        setElements([...elements, newElement]);
      }
    },
    [selectedTool, currentPath, pathColor, elements, paths, history]
  );

  const finishPath = useCallback(() => {
    if (currentPath && currentPath.points.length >= 2) {
      setPaths([...paths, { ...currentPath, hasArrow: true }]);
      setCurrentPath(null);
    }
  }, [currentPath, paths]);

  const handleElementClick = useCallback((id: string) => {
    if (selectedTool === "select") {
      setSelectedId(selectedId === id ? undefined : id);
    }
  }, [selectedTool, selectedId]);

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
    onSave({
      canvasType,
      elements,
      paths,
      notes: initialDiagram.notes,
    });
  }, [canvasType, elements, paths, initialDiagram.notes, onSave]);

  const renderCanvas = () => {
    return (
      <>
        <DiagramElements
          elements={elements}
          paths={paths}
          onElementClick={handleElementClick}
          selectedId={selectedId}
        />
        {currentPath && currentPath.points.length > 0 && (
          <DiagramElements
            elements={[]}
            paths={[currentPath]}
          />
        )}
      </>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Toolbar */}
        <div className="mb-6 border-2 border-black p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold uppercase tracking-wider">
              Diagram Editor
            </h2>
            <div className="flex space-x-2">
              <button
                onClick={undo}
                disabled={history.length === 0}
                className="px-4 py-2 border border-black text-sm uppercase tracking-wider hover:bg-black hover:text-white transition-colors disabled:opacity-30"
              >
                Undo
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-black text-white text-sm uppercase tracking-wider hover:bg-gray-800 transition-colors"
              >
                Save
              </button>
              <button
                onClick={onCancel}
                className="px-4 py-2 border border-black text-sm uppercase tracking-wider hover:bg-black hover:text-white transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>

          {/* Canvas Type Selection */}
          <div className="mb-4">
            <label className="block text-xs uppercase tracking-wider mb-2 font-bold">
              Canvas Type
            </label>
            <div className="flex space-x-2">
              {(["in-zone", "crease"] as DiagramCanvasType[]).map((type) => (
                <button
                  key={type}
                  onClick={() => setCanvasType(type)}
                  className={`px-4 py-2 border border-black text-sm uppercase tracking-wider transition-colors ${
                    canvasType === type
                      ? "bg-black text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Tools */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider mb-2 font-bold">
                Elements
              </label>
              <div className="flex flex-wrap gap-2">
                {["select", "goalie", "shooter", "cone", "puck", "screen", "label"].map(
                  (tool) => (
                    <button
                      key={tool}
                      onClick={() => {
                        setSelectedTool(tool as Tool);
                        setCurrentPath(null);
                      }}
                      className={`px-3 py-2 border border-black text-xs uppercase tracking-wider transition-colors ${
                        selectedTool === tool
                          ? "bg-black text-white"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      {tool}
                    </button>
                  )
                )}
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider mb-2 font-bold">
                Paths
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {["path-solid", "path-wavy", "path-dashed"].map((tool) => (
                  <button
                    key={tool}
                    onClick={() => {
                      setSelectedTool(tool as Tool);
                      setCurrentPath(null);
                    }}
                    className={`px-3 py-2 border border-black text-xs uppercase tracking-wider transition-colors ${
                      selectedTool === tool
                        ? "bg-black text-white"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    {tool.replace("path-", "")}
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <label className="text-xs uppercase tracking-wider">Color:</label>
                {(["black", "green", "orange"] as PathColor[]).map((color) => (
                  <button
                    key={color}
                    onClick={() => setPathColor(color)}
                    className={`px-2 py-1 border border-black text-xs uppercase ${
                      pathColor === color ? "bg-black text-white" : ""
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
              {currentPath && (
                <button
                  onClick={finishPath}
                  className="mt-2 px-4 py-1 bg-green-700 text-white text-xs uppercase tracking-wider"
                >
                  Finish Path
                </button>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="mt-4 pt-4 border-t border-gray-300">
            <button
              onClick={deleteSelected}
              disabled={!selectedId}
              className="px-4 py-2 border border-black text-sm uppercase tracking-wider hover:bg-red-700 hover:text-white hover:border-red-700 transition-colors disabled:opacity-30"
            >
              Delete Selected
            </button>
          </div>
        </div>

        {/* Canvas */}
        <div className="border-2 border-black p-6 bg-gray-50">
          {canvasType === "in-zone" && (
            <InZoneCanvas width={800} height={800}>
              <g onClick={handleCanvasClick as any}>
                <rect x="0" y="0" width="200" height="200" fill="transparent" />
                {renderCanvas()}
              </g>
            </InZoneCanvas>
          )}

          {canvasType === "crease" && (
            <CreaseCanvas width={800} height={800}>
              <g onClick={handleCanvasClick as any}>
                <rect x="0" y="0" width="200" height="200" fill="transparent" />
                {renderCanvas()}
              </g>
            </CreaseCanvas>
          )}
        </div>

        {/* Instructions */}
        <div className="mt-4 text-sm text-gray-600 border border-gray-300 p-4">
          <p className="font-bold mb-2">Instructions:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Select a tool and click on the canvas to place elements</li>
            <li>For paths: click multiple points, then click "Finish Path"</li>
            <li>Use "Select" tool to click and select elements for deletion</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
