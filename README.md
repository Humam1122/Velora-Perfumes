# VELORA Perfumes — Luxury Fragrance House

A cinematic, highly premium, and immersive luxury perfume e-commerce frontend interface. Designed with meticulous attention to typography, transitions, and interactions to evoke the elegance of a high-end atelier.

## ✨ Features & Highlights

- **Cinematic Visual Experience**: Immerse users in the story of a luxury fragrance house with smooth gradients, curated HSL-tailored colors, and rich typography.
- **Glassmorphic Cart Drawer & Route System**: High-fidelity animated cart controls, product page views, catalog filters, and navigation.
- **Framer Motion Micro-animations**: Premium spring-physics animations, custom cursor glow, page transitions, and smooth hover effects.
- **Responsive Layout**: Designed for seamless utility across desktop, tablet, and mobile browsers.
- **Single-File Build Option**: Configured to compile down to a fully self-contained HTML file for ultra-fast, zero-dependency distribution.

## 🛠️ Tech Stack

This project is built using modern, state-of-the-art web technologies:

- **Core Library**: **React 19** (for component-driven declarative UI)
- **Programming Language**: **TypeScript** (for compile-time type safety)
- **Build Tooling**: **Vite 7** (for blazing fast Hot Module Replacement and production bundling)
- **Styling Engine**: **Tailwind CSS v4** (leveraging the brand-new `@tailwindcss/vite` compiler plugin for lightning-fast styling builds)
- **Animation Framework**: **Framer Motion v12** (powering custom smooth transitions, exit/enter presence, page-level routing animations, and cursor glow)
- **Icons**: **Lucide React** (modern, clean, scalable vector icons)
- **Utility libraries**: `clsx` and `tailwind-merge` for clean conditional class compositions
- **Special Compiler Plugin**: `vite-plugin-singlefile` (enables compiling all assets, CSS, and JS into a single static `index.html` file)

## 🚀 Getting Started

### 1. Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (v18+ recommended).

### 2. Installation
Clone or download the project, navigate to the folder, and install the dependencies:
```bash
npm install
```

### 3. Development Server
Run the local dev server:
```bash
npm run dev
```
Open `http://localhost:5173` in your browser to view the application.

### 4. Build Production Bundle
To bundle the entire project into a single, fully-contained static HTML file:
```bash
npm run build
```
The compiled output will be generated in the `dist` folder.
