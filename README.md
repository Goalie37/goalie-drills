# Goalie Drills

A sleek, black-and-white directory of ice hockey goalie drills. Browse the library, build practice plans, and design season-long training programs.

## Features

- **Drill Library**: 30 curated goalie drills covering technique, positioning, conditioning, and game situations
- **Practice Plans**: Create structured practice sessions by selecting and ordering drills from the library
- **Season Plans**: Design season-long programs with weekly themes and linked practice plans
- **Clean Design**: Stark black-and-white UI with editorial feel and high contrast
- **Local Storage**: All plans are saved locally in your browser

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

Build the application for production:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

## Usage

### Browse Drills

Navigate to the Drills page to browse the complete library. Use filters to narrow by category (Butterfly, Tracking, Lateral Movement, etc.) or difficulty level (Beginner, Intermediate, Advanced, Elite). Click any drill to view full details including equipment, coaching cues, and duration.

### Create Practice Plans

1. Go to Practice Plans
2. Click "Create Plan"
3. Name your plan
4. Search and add drills from the library
5. Adjust durations and reorder drills as needed
6. Save your plan

The interface shows the total practice duration and allows you to edit or delete plans.

### Build Season Plans

1. Create several practice plans first
2. Navigate to Season Plans
3. Click "Create Season"
4. Set season name and start date
5. Add weeks with themes
6. Assign practice plans to each week
7. Save your season

Season plans help you map out progressive training over multiple weeks with thematic focus areas.

## Technology Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Storage**: localStorage (client-side)

## Project Structure

```
/app              # Next.js app directory
  /drills         # Drill library and detail pages
  /practice-plans # Practice plan management
  /season-plans   # Season planning
/lib              # Utilities and data
  drills.ts       # Seed data (30 drills)
  storage.ts      # localStorage wrapper
/types            # TypeScript interfaces
/components       # Reusable components (future)
```

## License

ISC
