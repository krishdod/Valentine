# Setup Instructions

## Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```

3. **Open Browser**
   Navigate to `http://localhost:3000`

## Project Structure

This project follows the **shadcn/ui** structure:

- `/components/ui` - Contains reusable UI components (like the 3D gallery)
- `/app` - Next.js app directory with pages
- `/lib` - Utility functions

## Why `/components/ui`?

The `/components/ui` folder is the standard location for shadcn/ui components. This structure:
- Keeps UI components organized and reusable
- Follows shadcn/ui conventions
- Makes it easy to add more components later
- Separates UI components from page-specific components

## Dependencies Installed

- **three** - 3D graphics library
- **@react-three/fiber** - React renderer for Three.js
- **@react-three/drei** - Useful helpers for React Three Fiber
- **framer-motion** - Smooth animations
- **lucide-react** - Beautiful icons (Heart, Sparkles, etc.)

## Customization

### Replace Images

Edit `app/page.tsx` and update the `sampleImages` array with your own image URLs.

### Change Title/Text

Edit the text in `app/page.tsx` in the title section.

### Adjust Gallery Settings

Modify the `InfiniteGallery` component props in `app/page.tsx`:
- `speed` - Controls scroll speed
- `visibleCount` - Number of images visible at once
- `zSpacing` - Depth spacing between images

## Troubleshooting

### WebGL Not Supported
The component automatically falls back to a grid layout if WebGL is not available.

### Images Not Loading
Make sure your image URLs are accessible and CORS-enabled. For Unsplash images, the URLs in the code should work.

### Build Errors
Make sure all dependencies are installed:
```bash
npm install
```
