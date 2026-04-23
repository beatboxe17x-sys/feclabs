/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        cyan: {
          DEFAULT: "#00d4ff",
          muted: "rgba(0, 212, 255, 0.6)",
        },
        magenta: "#ff3366",
        violet: "#7c3aed",
        amber: "#f59e0b",
        surface: "#0a0a12",
        "surface-hover": "#11111a",
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        rajdhani: ['Rajdhani', 'sans-serif'],
      },
      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xs: "calc(var(--radius) - 6px)",
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        glow: "0 0 20px rgba(0, 212, 255, 0.4), 0 0 40px rgba(0, 212, 255, 0.2)",
        "glow-magenta": "0 0 20px rgba(255, 51, 102, 0.4)",
        "card-hover": "0 0 30px rgba(0, 212, 255, 0.15), 0 0 60px rgba(0, 212, 255, 0.05)",
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
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(-10px)" },
          "50%": { transform: "translateY(10px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "pulse-crosshair": {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "1" },
        },
        "glitch-anim": {
          "0%": { clipPath: "inset(20% 0 80% 0)", transform: "translate(-2px, 1px)" },
          "20%": { clipPath: "inset(60% 0 10% 0)", transform: "translate(2px, -1px)" },
          "40%": { clipPath: "inset(40% 0 50% 0)", transform: "translate(-2px, 2px)" },
          "60%": { clipPath: "inset(80% 0 5% 0)", transform: "translate(2px, -2px)" },
          "80%": { clipPath: "inset(10% 0 70% 0)", transform: "translate(-1px, 1px)" },
          "100%": { clipPath: "inset(30% 0 40% 0)", transform: "translate(1px, -1px)" },
        },
        "glitch-anim2": {
          "0%": { clipPath: "inset(10% 0 60% 0)", transform: "translate(2px, -1px)" },
          "20%": { clipPath: "inset(80% 0 5% 0)", transform: "translate(-2px, 1px)" },
          "40%": { clipPath: "inset(30% 0 20% 0)", transform: "translate(1px, 2px)" },
          "60%": { clipPath: "inset(50% 0 30% 0)", transform: "translate(-1px, -2px)" },
          "80%": { clipPath: "inset(70% 0 15% 0)", transform: "translate(2px, 1px)" },
          "100%": { clipPath: "inset(15% 0 55% 0)", transform: "translate(-2px, -1px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 4s linear infinite",
        "pulse-crosshair": "pulse-crosshair 3s ease-in-out infinite",
        "glitch-anim": "glitch-anim 0.3s infinite linear alternate-reverse",
        "glitch-anim2": "glitch-anim2 0.3s infinite linear alternate-reverse",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
