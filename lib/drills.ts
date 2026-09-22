import { Drill } from "@/types";

export const drills: Drill[] = [
  {
    id: "1",
    name: "Butterfly Push Progression",
    description: "Develop explosive butterfly pushes from post-to-post. Focus on proper recovery and edge work.",
    categories: ["Butterfly", "Lateral Movement"],
    difficulty: "Intermediate",
    duration: 15,
    equipment: ["Pucks", "Cones"],
    coachingCues: [
      "Drive from inside edge",
      "Keep chest square to shooter",
      "Recover to athletic stance between pushes",
      "Full extension on push leg"
    ],
    diagram: {
      canvasType: "dual",
      elements: [
        { id: "g1", type: "goalie", x: 65, y: 160, label: "G", canvas: "left" },
        { id: "c1", type: "cone", x: 65, y: 175, canvas: "left" },
        { id: "c2", type: "cone", x: 135, y: 175, canvas: "left" },
        { id: "g2", type: "goalie", x: 82, y: 100, label: "1", canvas: "right" },
        { id: "g3", type: "goalie", x: 118, y: 100, label: "2", canvas: "right" },
      ],
      paths: [
        {
          type: "solid",
          points: [{ x: 70, y: 160 }, { x: 130, y: 160 }],
          hasArrow: true,
        },
        {
          type: "solid",
          points: [{ x: 82, y: 100 }, { x: 118, y: 100 }],
          hasArrow: true,
        },
        {
          type: "solid",
          points: [{ x: 118, y: 100 }, { x: 82, y: 100 }],
          hasArrow: true,
          color: "green"
        },
      ],
      notes: "Post-to-post butterfly pushes with recovery"
    }
  },
  {
    id: "2",
    name: "Tracking High-Low Shots",
    description: "Train visual tracking on shots transitioning between high and low zones. Improves glove-blocker coordination.",
    categories: ["Tracking", "Glove Work"],
    difficulty: "Advanced",
    duration: 20,
    equipment: ["Pucks", "Two shooters"],
    coachingCues: [
      "Track puck from release point",
      "Quiet upper body",
      "React to height change late",
      "Maintain depth in crease"
    ],
    diagram: {
      canvasType: "in-zone",
      elements: [
        { id: "g1", type: "goalie", x: 100, y: 155, label: "G" },
        { id: "s1", type: "shooter", x: 100, y: 50, label: "HIGH" },
        { id: "s2", type: "shooter", x: 100, y: 110, label: "LOW" },
      ],
      paths: [
        {
          type: "dashed",
          points: [{ x: 100, y: 55 }, { x: 100, y: 150 }],
          hasArrow: true,
        },
        {
          type: "dashed",
          points: [{ x: 100, y: 115 }, { x: 100, y: 145 }],
          hasArrow: true,
          color: "green"
        },
      ],
      notes: "Alternate high and low shots from center"
    }
  },
  {
    id: "3",
    name: "Post Integration Seals",
    description: "Practice sealing the post on wraparound attempts and tight-angle shots.",
    categories: ["Post Play", "Positioning"],
    difficulty: "Intermediate",
    duration: 12,
    equipment: ["Pucks", "Cones for angles"],
    coachingCues: [
      "Seal pad flush against post",
      "Head on puck side of post",
      "Active stick blade in passing lane",
      "Quick push off post when puck moves"
    ],
    diagram: {
      canvasType: "crease",
      elements: [
        { id: "g1", type: "goalie", x: 100, y: 90, label: "START" },
        { id: "g2", type: "goalie", x: 70, y: 100, label: "SEAL" },
        { id: "p1", type: "puck", x: 50, y: 110 },
      ],
      paths: [
        {
          type: "solid",
          points: [{ x: 100, y: 90 }, { x: 70, y: 100 }],
          hasArrow: true,
        },
        {
          type: "wavy",
          points: [{ x: 50, y: 110 }, { x: 60, y: 105 }, { x: 68, y: 102 }],
          hasArrow: true,
          color: "green"
        },
      ],
      notes: "Seal post on wraparound approach"
    }
  },
  {
    id: "4",
    name: "Rebound Control Circuit",
    description: "Multi-station drill focusing on absorbing shots and directing rebounds to corners.",
    categories: ["Rebound Control", "Positioning"],
    difficulty: "Beginner",
    duration: 18,
    equipment: ["Multiple pucks", "Three shooters"],
    coachingCues: [
      "Angle rebounds to corners",
      "Soft hands on blocker",
      "Set depth before shot",
      "Reset after each save"
    ],
    diagram: {
      canvasType: "in-zone",
      elements: [
        { id: "g1", type: "goalie", x: 100, y: 155, label: "G" },
        { id: "s1", type: "shooter", x: 70, y: 90, label: "S1" },
        { id: "s2", type: "shooter", x: 100, y: 85, label: "S2" },
        { id: "s3", type: "shooter", x: 130, y: 90, label: "S3" },
      ],
      paths: [
        {
          type: "dashed",
          points: [{ x: 70, y: 95 }, { x: 95, y: 150 }],
          hasArrow: true,
        },
        {
          type: "dashed",
          points: [{ x: 100, y: 90 }, { x: 100, y: 150 }],
          hasArrow: true,
        },
        {
          type: "dashed",
          points: [{ x: 130, y: 95 }, { x: 105, y: 150 }],
          hasArrow: true,
        },
      ],
      notes: "Rapid shots from multiple angles"
    }
  },
  {
    id: "5",
    name: "Breakaway Decision Tree",
    description: "Work through breakaway scenarios with various shooter approaches and release points.",
    categories: ["Breakaways", "Decision Making"],
    difficulty: "Advanced",
    duration: 20,
    equipment: ["Pucks", "Multiple shooters"],
    coachingCues: [
      "Read shooter's posture",
      "Control gap management",
      "Commit only when shooter commits",
      "Stay tall through approach"
    ],
    diagram: {
      canvasType: "in-zone",
      elements: [
        { id: "s1", type: "shooter", x: 100, y: 45, label: "X" },
        { id: "g1", type: "goalie", x: 100, y: 145, label: "G" },
        { id: "p1", type: "puck", x: 100, y: 55 },
      ],
      paths: [
        {
          type: "wavy",
          points: [{ x: 100, y: 60 }, { x: 105, y: 80 }, { x: 95, y: 100 }, { x: 100, y: 120 }],
          color: "green",
        },
        {
          type: "solid",
          points: [{ x: 100, y: 145 }, { x: 100, y: 130 }],
          hasArrow: true,
        },
      ],
      notes: "Manage gap on breakaway approach"
    }
  },
];

// Generate 25 more placeholder drills with basic diagrams
for (let i = 6; i <= 30; i++) {
  drills.push({
    id: i.toString(),
    name: `Drill ${i}`,
    description: `Training drill ${i} - Edit this diagram in the editor.`,
    categories: ["General"],
    difficulty: "Intermediate",
    duration: 15,
    equipment: ["Pucks"],
    coachingCues: ["Edit this drill in the diagram editor"],
    diagram: {
      canvasType: "crease",
      elements: [
        { id: "g1", type: "goalie", x: 100, y: 100, label: "G" },
      ],
      paths: [],
      notes: "Use the editor to customize this diagram"
    }
  });
}
