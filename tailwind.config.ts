import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        // Shadow Leveling colors - keeping for reference
        'shadow-dark': '#091023',
        'shadow-darker': '#020310',
        'shadow-glow': '#8ad8ea',
        'shadow-violet': '#182863',
        'shadow-eyes': '#e0f9fc',
        
        // Blue color palette - keeping for reference
        'blue-dark': '#0c3b7c',
        'blue-primary': '#0d50b1',
        'blue-medium': '#1882e1',
        'blue-light': '#4aa7ea',
        'cyan-light': '#5dedfc',
        'cyan-bright': '#92f3f9',
        
        // Professional palette - keeping for reference
        'pro-primary': '#8B5CF6',
        'pro-secondary': '#0EA5E9',
        'pro-accent': '#F97316',
        'pro-neutral': {
          100: '#FFFFFF',
          200: '#F1F1F1',
          300: '#8E9196',
          800: '#403E43',
          900: '#221F26',
        },
        'pro-light': '#D3E4FD',
        'pro-fresh': '#F2FCE2',
        
        // New Gold/Black Theme
        'brand-gold': '#E6B325',       // Primary gold/amber color
        'brand-gold-light': '#F0CC5B', // Lighter gold for hover states
        'brand-gold-dark': '#C99B20',  // Darker gold for active states
        'brand-black': '#121212',      // Rich black for backgrounds
        'brand-gray-dark': '#333333',  // Dark gray for text on light backgrounds
        'brand-gray-light': '#F5F5F5', // Light gray for backgrounds
        'brand-white': '#FFFFFF',      // Pure white for text on dark backgrounds
        'brand-yellow': '#E6B325',     // Alias for brand-gold for backward compatibility
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "slide-in": {
          from: { transform: "translateX(-100%)" },
          to: { transform: "translateX(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "infinite-scroll": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-100% - 1rem))" },
        },
        "count-up": {
          from: { transform: "translateY(1rem)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "slide-in": "slide-in 0.3s ease-out",
        "fade-in": "fade-in 0.4s ease-out",
        "infinite-scroll": "infinite-scroll 25s linear infinite",
        "count-up": "count-up 0.6s ease-out forwards",
      },
      fontFamily: {
        sans: ['Open Sans', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
        playfair: ['Playfair Display', 'serif'],
        opensans: ['Open Sans', 'sans-serif'],
      },
      boxShadow: {
        'glow-sm': '0 0 10px rgba(0, 191, 255, 0.4)',
        'glow-md': '0 0 15px rgba(0, 191, 255, 0.6)',
        'glow-lg': '0 0 20px rgba(0, 191, 255, 0.8)',
        'accent-glow': '0 0 15px rgba(75, 0, 130, 0.6)',
        'gold-sm': '0 0 10px rgba(230, 179, 37, 0.4)',
        'gold-md': '0 0 15px rgba(230, 179, 37, 0.6)',
        'gold-lg': '0 0 20px rgba(230, 179, 37, 0.8)',
        'gold-gradient': 'linear-gradient(135deg, #E6B325, #F0CC5B)',
        'gold-gradient-reverse': 'linear-gradient(135deg, #F0CC5B, #E6B325)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
