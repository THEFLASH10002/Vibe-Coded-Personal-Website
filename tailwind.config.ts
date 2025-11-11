import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'dark': '#000000',
        'dark-gray': '#0a0a0a',
        'dark-charcoal': '#1a1a1a',
        'orange': '#ff6b35',
        'orange-light': '#ff8c5a',
        'orange-dark': '#e55a2b',
        'orange-accent': '#ff8c42',
        'orange-gradient': '#FFA500',
        'orange-gradient-hover': '#FF7700',
        // Keep some teal/blue for gradients and accents if needed
        'dark-teal': '#1A4B6B',
        'dark-blue': '#0a0a0a',
        'light-blue': '#1a1a1a',
        'accent-blue': '#2a2a2a',
        'nav-blue': '#333333',
        'card-blue': '#1a1a1a',
      },
      backgroundImage: {
        'gradient-hero': 'linear-gradient(to bottom, #000000 0%, #1a1a1a 100%)',
        'gradient-orange': 'linear-gradient(to bottom, transparent 0%, #ff6b35 100%)',
      },
    },
  },
  plugins: [],
}
export default config

