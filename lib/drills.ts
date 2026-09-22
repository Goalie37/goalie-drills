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
      elements: [
        { type: "goalie", x: 85, y: 70, label: "START" },
        { type: "arrow", pathPoints: [{ x: 85, y: 70 }, { x: 115, y: 70 }] },
        { type: "goalie", x: 115, y: 70, label: "PUSH" },
        { type: "arrow", pathPoints: [{ x: 115, y: 70 }, { x: 85, y: 70 }] },
        { type: "cone", x: 85, y: 85 },
        { type: "cone", x: 115, y: 85 },
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
      elements: [
        { type: "goalie", x: 100, y: 65 },
        { type: "shooter", x: 100, y: 20, label: "HIGH" },
        { type: "arrow", pathPoints: [{ x: 100, y: 25 }, { x: 100, y: 60 }] },
        { type: "shooter", x: 100, y: 110, label: "LOW" },
        { type: "arrow", pathPoints: [{ x: 100, y: 105 }, { x: 100, y: 70 }] },
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
      elements: [
        { type: "goalie", x: 100, y: 65, label: "CENTER" },
        { type: "arrow", pathPoints: [{ x: 100, y: 65 }, { x: 88, y: 72 }] },
        { type: "goalie", x: 85, y: 75, label: "SEAL", rotation: -45 },
        { type: "puck", x: 75, y: 85 },
        { type: "path", pathPoints: [{ x: 75, y: 85 }, { x: 80, y: 80 }, { x: 85, y: 78 }] },
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
      elements: [
        { type: "goalie", x: 100, y: 65 },
        { type: "shooter", x: 80, y: 30, label: "S1" },
        { type: "shooter", x: 100, y: 25, label: "S2" },
        { type: "shooter", x: 120, y: 30, label: "S3" },
        { type: "arrow", pathPoints: [{ x: 80, y: 35 }, { x: 95, y: 60 }] },
        { type: "arrow", pathPoints: [{ x: 100, y: 30 }, { x: 100, y: 60 }] },
        { type: "arrow", pathPoints: [{ x: 120, y: 35 }, { x: 105, y: 60 }] },
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
      elements: [
        { type: "shooter", x: 100, y: 10, label: "SHOOTER" },
        { type: "path", pathPoints: [{ x: 100, y: 15 }, { x: 100, y: 50 }] },
        { type: "goalie", x: 100, y: 65, label: "READY" },
        { type: "arrow", pathPoints: [{ x: 100, y: 60 }, { x: 100, y: 55 }] },
        { type: "label", x: 70, y: 40, label: "GAP" },
      ],
      notes: "Manage gap on breakaway approach"
    }
  },
  {
    id: "6",
    name: "Warmup: Dynamic Stretch Skating",
    description: "Light skating with dynamic stretches focusing on hip mobility and leg activation.",
    categories: ["Warm-up", "Mobility"],
    difficulty: "Beginner",
    duration: 8,
    equipment: [],
    coachingCues: [
      "Gradual intensity increase",
      "Full range of motion",
      "Focus on breathing",
      "Activate core throughout"
    ],
    diagram: {
      elements: [
        { type: "goalie", x: 70, y: 50 },
        { type: "path", pathPoints: [{ x: 70, y: 50 }, { x: 85, y: 40 }, { x: 100, y: 50 }, { x: 115, y: 40 }, { x: 130, y: 50 }] },
        { type: "arrow", pathPoints: [{ x: 130, y: 50 }, { x: 135, y: 48 }] },
        { type: "label", x: 100, y: 25, label: "SKATING PATTERN" },
      ],
      notes: "Light movement patterns for warmup"
    }
  },
  {
    id: "7",
    name: "Screen Traffic Challenge",
    description: "Face shots through traffic and screens. Develop visual lanes and reactive saves.",
    categories: ["Tracking", "Screens"],
    difficulty: "Elite",
    duration: 22,
    equipment: ["Pucks", "Screen dummies or players", "Multiple shooters"],
    coachingCues: [
      "Find lanes through traffic",
      "Anticipate release timing",
      "Active hands ready",
      "Recover depth between shots"
    ],
    diagram: {
      elements: [
        { type: "goalie", x: 100, y: 65 },
        { type: "screen", x: 95, y: 50, label: "SCREEN" },
        { type: "screen", x: 105, y: 45 },
        { type: "shooter", x: 100, y: 20, label: "SHOOTER" },
        { type: "arrow", pathPoints: [{ x: 100, y: 25 }, { x: 100, y: 60 }] },
        { type: "label", x: 80, y: 55, label: "FIND LANES" },
      ],
      notes: "Visual tracking through screens"
    }
  },
  {
    id: "8",
    name: "Down Butterfly Recovery Reps",
    description: "Rapid-fire recovery drills from butterfly position. Build core strength and explosive power.",
    categories: ["Butterfly", "Conditioning"],
    difficulty: "Intermediate",
    duration: 10,
    equipment: [],
    coachingCues: [
      "Drive off inside edges",
      "Lead with chest up",
      "Quick hands to set position",
      "Maintain balance throughout"
    ],
    diagram: {
      elements: [
        { type: "goalie", x: 90, y: 70, label: "DOWN" },
        { type: "arrow", pathPoints: [{ x: 90, y: 68 }, { x: 90, y: 55 }] },
        { type: "goalie", x: 90, y: 50, label: "UP" },
        { type: "arrow", pathPoints: [{ x: 90, y: 52 }, { x: 90, y: 65 }] },
        { type: "label", x: 110, y: 60, label: "REPEAT" },
      ],
      notes: "Rapid butterfly drop and recovery"
    }
  },
  {
    id: "9",
    name: "Glove Speed Ladder",
    description: "Quick glove reactions from various release points. Emphasize catch-and-freeze mechanics.",
    categories: ["Glove Work", "Tracking"],
    difficulty: "Intermediate",
    duration: 15,
    equipment: ["Tennis balls or pucks", "Two shooters"],
    coachingCues: [
      "Track puck into glove",
      "Strong wrist on catch",
      "Present glove target",
      "Quick recovery between shots"
    ],
    diagram: {
      elements: [
        { type: "goalie", x: 100, y: 65 },
        { type: "shooter", x: 75, y: 30, label: "S1" },
        { type: "shooter", x: 125, y: 30, label: "S2" },
        { type: "arrow", pathPoints: [{ x: 75, y: 35 }, { x: 95, y: 58 }] },
        { type: "arrow", pathPoints: [{ x: 125, y: 35 }, { x: 105, y: 58 }] },
        { type: "label", x: 100, y: 90, label: "GLOVE HIGH" },
      ],
      notes: "Alternate rapid glove shots"
    }
  },
  {
    id: "10",
    name: "Backdoor Pass Coverage",
    description: "Simulate one-timer scenarios from backdoor passes. Work on cross-crease pushes and timing.",
    categories: ["Lateral Movement", "Decision Making"],
    difficulty: "Advanced",
    duration: 18,
    equipment: ["Pucks", "Two passers/shooters"],
    coachingCues: [
      "Read pass early",
      "Explosive push across crease",
      "Square up before release",
      "Keep stick on ice through push"
    ],
    diagram: {
      elements: [
        { type: "goalie", x: 85, y: 70, label: "START" },
        { type: "shooter", x: 70, y: 40, label: "PASSER" },
        { type: "shooter", x: 130, y: 40, label: "SHOOTER" },
        { type: "path", pathPoints: [{ x: 75, y: 45 }, { x: 125, y: 45 }] },
        { type: "arrow", pathPoints: [{ x: 85, y: 70 }, { x: 115, y: 70 }] },
        { type: "goalie", x: 115, y: 70, label: "PUSH" },
      ],
      notes: "Cross-crease one-timer coverage"
    }
  },
  {
    id: "11",
    name: "Stick Save Station",
    description: "Focus on active stick blade positioning for low shots and redirects.",
    categories: ["Stick Work", "Positioning"],
    difficulty: "Beginner",
    duration: 12,
    equipment: ["Pucks", "Shooter"],
    coachingCues: [
      "Blade flat on ice",
      "Cover five-hole",
      "Active stick, not passive",
      "Direct puck to corners when possible"
    ],
    diagram: {
      elements: [
        { type: "goalie", x: 100, y: 65 },
        { type: "shooter", x: 100, y: 30, label: "SHOOTER" },
        { type: "arrow", pathPoints: [{ x: 100, y: 35 }, { x: 100, y: 70 }] },
        { type: "label", x: 100, y: 85, label: "LOW SHOTS" },
        { type: "puck", x: 95, y: 72 },
        { type: "puck", x: 105, y: 72 },
      ],
      notes: "Active stick for low shots"
    }
  },
  {
    id: "12",
    name: "RVH (Reverse Vertical Horizontal) Technique",
    description: "Master the RVH position for posts and scrambles. Balance stability with mobility.",
    categories: ["Post Play", "Butterfly"],
    difficulty: "Advanced",
    duration: 20,
    equipment: ["Pucks", "Cones"],
    coachingCues: [
      "Pad flush to post",
      "Inside leg horizontal for coverage",
      "Torso upright and square",
      "Can recover quickly to butterfly"
    ],
    diagram: {
      elements: [
        { type: "goalie", x: 88, y: 75, label: "RVH", rotation: -90 },
        { type: "puck", x: 70, y: 75 },
        { type: "arrow", pathPoints: [{ x: 70, y: 75 }, { x: 82, y: 75 }] },
        { type: "label", x: 88, y: 90, label: "VERTICAL PAD" },
      ],
      notes: "RVH position at post"
    }
  },
  {
    id: "13",
    name: "High Slot One-Timers",
    description: "React to high-danger one-timer opportunities from the slot. Emphasize reading shooter setup.",
    categories: ["Tracking", "Positioning"],
    difficulty: "Elite",
    duration: 16,
    equipment: ["Pucks", "Two passers/shooters"],
    coachingCues: [
      "Set depth in crease",
      "Track puck and shooter stick",
      "Explode up or down with shot",
      "Control rebounds into corners"
    ],
    diagram: {
      elements: [
        { type: "goalie", x: 100, y: 65 },
        { type: "shooter", x: 80, y: 35, label: "PASSER" },
        { type: "shooter", x: 100, y: 40, label: "SLOT" },
        { type: "path", pathPoints: [{ x: 85, y: 37 }, { x: 95, y: 42 }] },
        { type: "arrow", pathPoints: [{ x: 100, y: 45 }, { x: 100, y: 60 }] },
        { type: "label", x: 120, y: 50, label: "HIGH DANGER" },
      ],
      notes: "One-timer from slot"
    }
  },
  {
    id: "14",
    name: "Conditioning: Crease Battle Circuit",
    description: "High-intensity circuit of rapid shots, recoveries, and lateral movements. Build game-stamina.",
    categories: ["Conditioning", "Lateral Movement"],
    difficulty: "Advanced",
    duration: 25,
    equipment: ["Multiple pucks", "Multiple shooters", "Timer"],
    coachingCues: [
      "Maintain technique under fatigue",
      "Controlled breathing",
      "Reset mentally between reps",
      "Push through discomfort"
    ],
    diagram: {
      elements: [
        { type: "goalie", x: 85, y: 70 },
        { type: "arrow", pathPoints: [{ x: 85, y: 70 }, { x: 100, y: 65 }] },
        { type: "arrow", pathPoints: [{ x: 100, y: 65 }, { x: 115, y: 70 }] },
        { type: "shooter", x: 70, y: 35 },
        { type: "shooter", x: 100, y: 30 },
        { type: "shooter", x: 130, y: 35 },
        { type: "label", x: 100, y: 95, label: "CONTINUOUS" },
      ],
      notes: "High-intensity multi-station circuit"
    }
  },
  {
    id: "15",
    name: "Angle Play Fundamentals",
    description: "Work on cutting down shooter angles and controlling depth from top of crease.",
    categories: ["Positioning", "Decision Making"],
    difficulty: "Beginner",
    duration: 15,
    equipment: ["Pucks", "Cones for reference points"],
    coachingCues: [
      "Stay on top of crease",
      "Challenge shooters appropriately",
      "Square shoulders to puck",
      "Maintain balance in stance"
    ],
    diagram: {
      elements: [
        { type: "goalie", x: 100, y: 60 },
        { type: "shooter", x: 75, y: 25, label: "LEFT" },
        { type: "shooter", x: 100, y: 20, label: "CENTER" },
        { type: "shooter", x: 125, y: 25, label: "RIGHT" },
        { type: "arrow", pathPoints: [{ x: 75, y: 30 }, { x: 95, y: 55 }] },
        { type: "arrow", pathPoints: [{ x: 125, y: 30 }, { x: 105, y: 55 }] },
        { type: "cone", x: 100, y: 58 },
      ],
      notes: "Proper depth and angle"
    }
  },
  {
    id: "16",
    name: "Deception Recognition Drill",
    description: "Face shooters practicing dekes and shot fakes. Train patience and reaction timing.",
    categories: ["Breakaways", "Decision Making"],
    difficulty: "Elite",
    duration: 20,
    equipment: ["Pucks", "Multiple shooters"],
    coachingCues: [
      "Stay patient, don't bite on fakes",
      "Watch shooter's body, not just puck",
      "Keep hands ready",
      "Commit late, not early"
    ],
    diagram: {
      elements: [
        { type: "shooter", x: 100, y: 20, label: "SHOOTER" },
        { type: "path", pathPoints: [{ x: 100, y: 25 }, { x: 105, y: 40 }, { x: 95, y: 50 }, { x: 100, y: 60 }] },
        { type: "goalie", x: 100, y: 65, label: "PATIENT" },
        { type: "label", x: 120, y: 40, label: "DEKE" },
      ],
      notes: "Read dekes and stay patient"
    }
  },
  {
    id: "17",
    name: "Short-Side Awareness",
    description: "Defend against short-side shots from various angles. Prevent goals on near post.",
    categories: ["Positioning", "Glove Work"],
    difficulty: "Intermediate",
    duration: 14,
    equipment: ["Pucks", "Shooters at multiple angles"],
    coachingCues: [
      "Protect near post",
      "Don't over-commit to pass",
      "Quick glove hand",
      "Maintain good depth"
    ],
    diagram: {
      elements: [
        { type: "goalie", x: 95, y: 68 },
        { type: "shooter", x: 70, y: 50, label: "ANGLE" },
        { type: "arrow", pathPoints: [{ x: 75, y: 52 }, { x: 88, y: 72 }] },
        { type: "label", x: 85, y: 85, label: "SHORT SIDE" },
        { type: "cone", x: 85, y: 75 },
      ],
      notes: "Near-post protection"
    }
  },
  {
    id: "18",
    name: "Puck Handling Under Pressure",
    description: "Practice making quick outlet passes and handling dump-ins under forecheck pressure.",
    categories: ["Puck Handling", "Decision Making"],
    difficulty: "Advanced",
    duration: 18,
    equipment: ["Pucks", "Forecheckers"],
    coachingCues: [
      "Head up, scan for options",
      "Firm passes on tape",
      "Protect puck with body position",
      "Make quick decisions"
    ],
    diagram: {
      elements: [
        { type: "goalie", x: 100, y: 80, label: "G" },
        { type: "puck", x: 100, y: 90 },
        { type: "shooter", x: 100, y: 60, label: "PRESSURE" },
        { type: "arrow", pathPoints: [{ x: 100, y: 85 }, { x: 75, y: 75 }] },
        { type: "label", x: 65, y: 70, label: "OUTLET" },
      ],
      notes: "Puck handling under pressure"
    }
  },
  {
    id: "19",
    name: "Scramble Recovery Chaos",
    description: "Multi-puck chaos drill simulating net-front scrambles. Build awareness and recovery speed.",
    categories: ["Rebound Control", "Conditioning"],
    difficulty: "Advanced",
    duration: 15,
    equipment: ["Multiple pucks", "Multiple shooters", "Net-front presence"],
    coachingCues: [
      "Never give up on puck",
      "Aggressive hands and stick",
      "Cover puck when possible",
      "Quick resets between saves"
    ],
    diagram: {
      elements: [
        { type: "goalie", x: 100, y: 70 },
        { type: "screen", x: 95, y: 55 },
        { type: "puck", x: 90, y: 65 },
        { type: "puck", x: 105, y: 60 },
        { type: "puck", x: 100, y: 50 },
        { type: "shooter", x: 80, y: 35 },
        { type: "shooter", x: 120, y: 35 },
        { type: "label", x: 100, y: 90, label: "CHAOS" },
      ],
      notes: "Multi-puck scramble drill"
    }
  },
  {
    id: "20",
    name: "Cooldown: Static Stretching & Visualization",
    description: "End practice with static stretching sequence and mental visualization of successful saves.",
    categories: ["Warm-up", "Recovery"],
    difficulty: "Beginner",
    duration: 10,
    equipment: ["Mat (optional)"],
    coachingCues: [
      "Hold stretches for 30 seconds",
      "Focus on hip flexors and groin",
      "Deep breathing",
      "Visualize perfect technique"
    ],
    diagram: {
      elements: [
        { type: "goalie", x: 100, y: 65 },
        { type: "label", x: 100, y: 35, label: "STATIC STRETCH" },
        { type: "label", x: 100, y: 45, label: "& VISUALIZATION" },
      ],
      notes: "Recovery and mental preparation"
    }
  },
  {
    id: "21",
    name: "Blocker Deflection Practice",
    description: "Train blocker to deflect shots into safe zones. Develop wrist strength and positioning.",
    categories: ["Blocker Work", "Rebound Control"],
    difficulty: "Intermediate",
    duration: 12,
    equipment: ["Pucks", "Shooter"],
    coachingCues: [
      "Strong wrist on contact",
      "Angle deflections to corners",
      "Present blocker early",
      "Follow through toward target zone"
    ],
    diagram: {
      elements: [
        { type: "goalie", x: 100, y: 65 },
        { type: "shooter", x: 100, y: 30, label: "SHOOTER" },
        { type: "arrow", pathPoints: [{ x: 100, y: 35 }, { x: 100, y: 60 }] },
        { type: "arrow", pathPoints: [{ x: 105, y: 65 }, { x: 125, y: 75 }] },
        { type: "label", x: 130, y: 80, label: "CORNER" },
      ],
      notes: "Blocker deflection to corners"
    }
  },
  {
    id: "22",
    name: "Two-Pad Stack Recovery",
    description: "Learn and practice the two-pad stack for extreme lateral saves and recovery mechanics.",
    categories: ["Lateral Movement", "Advanced Technique"],
    difficulty: "Elite",
    duration: 16,
    equipment: ["Pucks", "Cones"],
    coachingCues: [
      "Use as last resort only",
      "Drive off both posts",
      "Cover maximum net surface",
      "Quick recovery essential"
    ],
    diagram: {
      elements: [
        { type: "goalie", x: 100, y: 65, label: "START" },
        { type: "arrow", pathPoints: [{ x: 100, y: 65 }, { x: 115, y: 75 }] },
        { type: "goalie", x: 118, y: 75, label: "STACK", rotation: 90 },
        { type: "puck", x: 125, y: 70 },
      ],
      notes: "Emergency two-pad stack save"
    }
  },
  {
    id: "23",
    name: "Vision Training: Peripheral Awareness",
    description: "Track multiple pucks in periphery while maintaining primary focus. Enhance visual processing.",
    categories: ["Tracking", "Conditioning"],
    difficulty: "Advanced",
    duration: 14,
    equipment: ["Multiple pucks", "Three shooters"],
    coachingCues: [
      "Maintain central focus",
      "Awareness of passing options",
      "Quick eye movement",
      "Trust peripheral vision"
    ],
    diagram: {
      elements: [
        { type: "goalie", x: 100, y: 65 },
        { type: "shooter", x: 75, y: 30, label: "S1" },
        { type: "shooter", x: 100, y: 25, label: "S2" },
        { type: "shooter", x: 125, y: 30, label: "S3" },
        { type: "puck", x: 70, y: 45 },
        { type: "puck", x: 100, y: 40 },
        { type: "puck", x: 130, y: 45 },
      ],
      notes: "Track multiple threats"
    }
  },
  {
    id: "24",
    name: "Battle Drill: Net-Front Presence",
    description: "Face shooters with net-front screens and tips. Develop positioning and compete level.",
    categories: ["Screens", "Positioning"],
    difficulty: "Advanced",
    duration: 20,
    equipment: ["Pucks", "Shooters", "Net-front player"],
    coachingCues: [
      "Box out net-front player",
      "Find shooting lanes",
      "Communicate with defense",
      "Stay square despite traffic"
    ],
    diagram: {
      elements: [
        { type: "goalie", x: 100, y: 68 },
        { type: "screen", x: 100, y: 52, label: "NF" },
        { type: "shooter", x: 100, y: 25, label: "SHOOTER" },
        { type: "arrow", pathPoints: [{ x: 100, y: 30 }, { x: 100, y: 45 }] },
        { type: "label", x: 75, y: 60, label: "BATTLE" },
      ],
      notes: "Battle through net-front traffic"
    }
  },
  {
    id: "25",
    name: "Quick-Catch Release Drill",
    description: "Catch-and-release puck handling with emphasis on quick outlet timing.",
    categories: ["Puck Handling", "Decision Making"],
    difficulty: "Intermediate",
    duration: 10,
    equipment: ["Pucks"],
    coachingCues: [
      "Soft hands on reception",
      "Quick scan before release",
      "Accurate passes",
      "Ready for immediate return pass"
    ],
    diagram: {
      elements: [
        { type: "goalie", x: 100, y: 78, label: "G" },
        { type: "puck", x: 100, y: 88 },
        { type: "arrow", pathPoints: [{ x: 100, y: 85 }, { x: 80, y: 70 }] },
        { type: "arrow", pathPoints: [{ x: 75, y: 68 }, { x: 95, y: 82 }] },
        { type: "label", x: 70, y: 65, label: "PASS" },
      ],
      notes: "Quick catch and release"
    }
  },
  {
    id: "26",
    name: "Butterfly Slide Technique",
    description: "Perfect the butterfly slide for lateral coverage without pushing. Focus on smooth gliding.",
    categories: ["Butterfly", "Lateral Movement"],
    difficulty: "Advanced",
    duration: 18,
    equipment: ["Pucks", "Cones"],
    coachingCues: [
      "Maintain butterfly position",
      "Use momentum, not muscle",
      "Keep pads sealed to ice",
      "Square to shooter throughout"
    ],
    diagram: {
      elements: [
        { type: "goalie", x: 85, y: 70, label: "START" },
        { type: "path", pathPoints: [{ x: 85, y: 70 }, { x: 100, y: 68 }, { x: 115, y: 70 }] },
        { type: "goalie", x: 115, y: 70, label: "SLIDE" },
        { type: "arrow", pathPoints: [{ x: 112, y: 68 }, { x: 116, y: 68 }] },
      ],
      notes: "Smooth butterfly slide motion"
    }
  },
  {
    id: "27",
    name: "Five-Hole Coverage Station",
    description: "Drill specifically targeting five-hole discipline and stick positioning.",
    categories: ["Stick Work", "Positioning"],
    difficulty: "Beginner",
    duration: 12,
    equipment: ["Pucks", "Shooter with five-hole focus"],
    coachingCues: [
      "Stick blade flat and forward",
      "Knees together in butterfly",
      "No gaps between pads",
      "Stay compact in stance"
    ],
    diagram: {
      elements: [
        { type: "goalie", x: 100, y: 65 },
        { type: "shooter", x: 100, y: 30, label: "SHOOTER" },
        { type: "arrow", pathPoints: [{ x: 100, y: 35 }, { x: 100, y: 72 }] },
        { type: "label", x: 100, y: 85, label: "5-HOLE" },
        { type: "puck", x: 100, y: 75 },
      ],
      notes: "Five-hole coverage focus"
    }
  },
  {
    id: "28",
    name: "Pressure Response Simulator",
    description: "High-pressure scenarios with game-like stress. Build mental toughness.",
    categories: ["Decision Making", "Conditioning"],
    difficulty: "Elite",
    duration: 25,
    equipment: ["Multiple pucks", "Multiple shooters", "Score tracking"],
    coachingCues: [
      "Stay calm under pressure",
      "One save at a time mentality",
      "Reset after goals",
      "Trust your training"
    ],
    diagram: {
      elements: [
        { type: "goalie", x: 100, y: 65 },
        { type: "shooter", x: 75, y: 30 },
        { type: "shooter", x: 100, y: 25 },
        { type: "shooter", x: 125, y: 30 },
        { type: "screen", x: 95, y: 50 },
        { type: "puck", x: 80, y: 45 },
        { type: "puck", x: 120, y: 45 },
        { type: "label", x: 100, y: 95, label: "PRESSURE" },
      ],
      notes: "High-pressure game simulation"
    }
  },
  {
    id: "29",
    name: "Poke Check Timing Drill",
    description: "Practice poke check on breakaways and dekes. Emphasize timing and recovery.",
    categories: ["Breakaways", "Stick Work"],
    difficulty: "Advanced",
    duration: 15,
    equipment: ["Pucks", "Shooters"],
    coachingCues: [
      "Commit when shooter overhandles",
      "Full extension on check",
      "Quick recovery if miss",
      "Return to stance immediately"
    ],
    diagram: {
      elements: [
        { type: "shooter", x: 100, y: 30, label: "SHOOTER" },
        { type: "path", pathPoints: [{ x: 100, y: 35 }, { x: 100, y: 55 }] },
        { type: "goalie", x: 100, y: 60, label: "READY" },
        { type: "arrow", pathPoints: [{ x: 100, y: 65 }, { x: 100, y: 50 }] },
        { type: "label", x: 120, y: 55, label: "POKE" },
      ],
      notes: "Poke check timing on breakaway"
    }
  },
  {
    id: "30",
    name: "Game Situation Walkthrough",
    description: "Walk through common game scenarios: empty net, 6-on-5, delayed penalty, etc.",
    categories: ["Decision Making", "Positioning"],
    difficulty: "Intermediate",
    duration: 20,
    equipment: ["Pucks", "Multiple players"],
    coachingCues: [
      "Know your responsibilities",
      "Communicate with teammates",
      "Adjust positioning per situation",
      "Stay mentally engaged"
    ],
    diagram: {
      elements: [
        { type: "goalie", x: 100, y: 65 },
        { type: "shooter", x: 80, y: 35 },
        { type: "shooter", x: 100, y: 30 },
        { type: "shooter", x: 120, y: 35 },
        { type: "label", x: 100, y: 15, label: "SCENARIO" },
        { type: "label", x: 100, y: 95, label: "POSITIONING" },
      ],
      notes: "Game situation awareness"
    }
  }
];
