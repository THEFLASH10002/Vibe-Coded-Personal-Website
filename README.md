# Personal Portfolio Website

A modern personal portfolio website built with Next.js, TypeScript, and Tailwind CSS, designed to match a Figma design one-to-one.

## Features

- Responsive design with mobile-first approach
- Smooth scroll navigation
- Modern gradient hero section
- Skillset showcase with interactive cards
- Single-page layout with scrollable sections
- Projects page (to be implemented)

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library

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

3. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
/
├── app/
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Home page
│   ├── projects/        # Projects page
│   └── globals.css      # Global styles
├── components/
│   ├── Header.tsx       # Navigation header
│   ├── Hero.tsx         # Hero section
│   ├── Skillset.tsx     # Skillset section
│   ├── Projects.tsx     # Projects section
│   ├── About.tsx        # About section
│   └── Contact.tsx      # Contact section
└── tailwind.config.ts   # Tailwind configuration
```

## Customization

### Colors

Edit `tailwind.config.ts` to customize the color palette:

- `dark-teal`: #1A4B6B
- `dark-blue`: #202A50
- `light-blue`: #2E5A7A
- `accent-blue`: #3A6B8A
- `nav-blue`: #4A7BA0
- `card-blue`: #4A7BA0

### Content

Update the content in each component file to match your personal information.

## License

MIT


