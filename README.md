# Memories - Valentine's Day Website

A beautiful, interactive 3D gallery website built with Next.js, React Three Fiber, and Framer Motion for a special Valentine's Day gift.

## Features

- 🎨 **3D Infinite Gallery**: Immersive 3D photo gallery with smooth cloth-like animations
- ✨ **Smooth Animations**: Powered by Framer Motion for buttery-smooth transitions
- 🎭 **Interactive Controls**: Navigate with mouse wheel, arrow keys, or touch
- 💫 **Auto-play**: Automatically scrolls through memories when idle
- 📱 **Responsive**: Works beautifully on all devices
- 🎯 **WebGL Fallback**: Graceful degradation for devices without WebGL support

## Tech Stack

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React Three Fiber** - 3D rendering
- **Three.js** - 3D graphics library
- **@react-three/drei** - Useful helpers for React Three Fiber
- **Framer Motion** - Animation library
- **shadcn/ui** - Component structure

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Customization

### Adding Your Own Images

Edit `app/page.tsx` and replace the `sampleImages` array with your own image URLs:

```tsx
const sampleImages = [
  { src: 'your-image-url-1.jpg', alt: 'Description 1' },
  { src: 'your-image-url-2.jpg', alt: 'Description 2' },
  // ... more images
];
```

### Adjusting Gallery Settings

You can customize the gallery behavior in `app/page.tsx`:

```tsx
<InfiniteGallery
  images={sampleImages}
  speed={1.2}              // Scroll speed multiplier
  visibleCount={12}        // Number of visible images
  zSpacing={3}             // Depth spacing
  falloff={{ near: 0.8, far: 14 }}  // Fade distance
/>
```

### Changing the Title

Edit the title text in `app/page.tsx`:

```tsx
<h1 className="...">
  <span>Your Title Here</span>
</h1>
```

## Project Structure

```
├── app/
│   ├── page.tsx          # Main page with gallery
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/
│   └── ui/
│       └── 3d-gallery-photography.tsx  # 3D gallery component
├── lib/
│   └── utils.ts          # Utility functions
└── package.json
```

## Build for Production

```bash
npm run build
npm start
```

## License

This project is created with love for a special someone. 💕
