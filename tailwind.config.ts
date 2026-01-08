import type { Config } from 'tailwindcss';

export default {
    darkMode: 'class',
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // PayPal-inspired (Light Mode)
                'paypal-blue': '#0070BA',
                'paypal-dark-blue': '#003087',
                'paypal-hover': '#005EA6',
                // Premium Zinc Palette (Dark Mode) - Single Source of Truth
                'zinc-950': '#09090b',
                'zinc-900': '#18181b',
                'zinc-800': '#27272a',
                'zinc-700': '#3f3f46',
                'zinc-400': '#a1a1aa',
                'zinc-300': '#d4d4d8',
                'zinc-100': '#f4f4f5',
                'accent-blue': '#5B8DEF',
            },
            animation: {
                'text-flow': 'text-flow 5s ease infinite',
            },
            keyframes: {
                'text-flow': {
                    '0%, 100%': {
                        'background-size': '200% 200%',
                        'background-position': 'left center',
                    },
                    '50%': {
                        'background-size': '200% 200%',
                        'background-position': 'right center',
                    },
                },
            },
            transitionDuration: {
                'theme': '300ms',
            },
        },
    },
    plugins: [],
} satisfies Config;
