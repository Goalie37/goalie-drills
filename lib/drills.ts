import { Drill } from "@/types";

export const drills: Drill[] = [
  {
    id: "1",
    name: "High to Low",
    description: "Challenge the point, then retreat and square up as the puck drops from high to a shooter below the hash marks.",
    categories: ["Positioning", "Depth"],
    difficulty: "Intermediate",
    duration: 15,
    equipment: ["Pucks", "Two shooters"],
    coachingCues: [
      "Challenge the point at the top of the crease",
      "Retreat on the pass and stay square to the puck",
      "Arrive set before the low shot is released",
      "Recover your depth after the save"
    ],
    diagram: {
      canvasType: "in-zone",
      elements: [
        { id: "s-high", type: "shooter", x: 97.3, y: 56, label: "HIGH" },
        { id: "s-low", type: "shooter", x: 154, y: 100, label: "LOW" },
        { id: "g-high", type: "goalie", x: 88, y: 100, label: "H" },
        { id: "g-low", type: "goalie", x: 112, y: 116, label: "L" },
      ],
      paths: [
        {
          type: "solid",
          points: [{ x: 112, y: 74 }, { x: 148, y: 94 }],
          hasArrow: true,
          color: "green",
        },
        {
          type: "solid",
          points: [{ x: 94, y: 106 }, { x: 106, y: 112 }],
          hasArrow: true,
        },
        {
          type: "dashed",
          points: [{ x: 146, y: 104 }, { x: 118, y: 114 }],
          hasArrow: true,
        },
      ],
      notes: "Pass from the point down low; goalie drops from high depth into the crease"
    }
  },
];
