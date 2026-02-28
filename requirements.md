# Disney StoryWorld — Requirements

## Project Info
- **Name**: Disney StoryWorld
- **Type**: React + Vite (JavaScript)
- **Node Version**: >= 18.x
- **Package Manager**: npm

## Dependencies (Production)

| Package | Version | Purpose |
|---------|---------|---------|
| react | ^19.2.0 | UI library |
| react-dom | ^19.2.0 | React DOM renderer |
| three | ^0.183.1 | 3D WebGL rendering engine |
| @react-three/fiber | ^9.5.0 | React renderer for Three.js |
| @react-three/drei | ^10.7.7 | Three.js helpers & components |
| framer-motion | ^12.34.3 | Animation library (scroll, hover, stagger) |
| gsap | ^3.14.2 | Timeline animations (intro sequence) |
| lucide-react | ^0.575.0 | Icon library (navbar icons) |

## Dev Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| vite | ^7.3.1 | Build tool & dev server |
| @vitejs/plugin-react | ^5.1.1 | React integration for Vite |
| eslint | ^9.39.1 | Code linting |
| eslint-plugin-react-hooks | ^7.0.1 | React hooks linting |
| eslint-plugin-react-refresh | ^0.4.24 | HMR linting |
| globals | ^16.5.0 | Global variables for ESLint |
| @types/react | ^19.2.7 | React type definitions |
| @types/react-dom | ^19.2.3 | React DOM type definitions |

## Setup Instructions

```bash
# 1. Clone the repository
git clone <repo-url>
cd disney-storyworld

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Build for production
npm run build

# 5. Preview production build
npm run preview
```

## External Assets Required
- `public/models/castle.glb` — 3D Cinderella castle model (GLB format)
- `public/pixar.jpg` — Pixar realm card image
- `public/starwars.png` — Star Wars realm card image
- `public/castle-silhouette.svg` — Castle SVG (auto-generated)

## Google Fonts Used
- **Cinzel** — Headings / display text
- **Quicksand** — Body text
- **Dancing Script** — Decorative / script text
