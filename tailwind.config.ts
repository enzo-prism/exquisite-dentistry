
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
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				sans: ['Montserrat', 'system-ui', 'sans-serif'],
				body: ['Open Sans', 'system-ui', 'sans-serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				gold: {
					light: '#B09A78',
					DEFAULT: '#9A8360',
					dark: '#7D6A4D',
				},
				secondary: {
					light: '#9A8360', // Changed to match gold.DEFAULT
					DEFAULT: '#9A8360', // Changed to match gold.DEFAULT
					dark: '#9A8360', // Changed to match gold.DEFAULT
				},
				black: {
					light: '#2A2A2A',
					DEFAULT: '#171717',
					dark: '#000000',
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
			},
			spacing: {
				'section': '6rem',
				'content': '2.5rem',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translate3d(0, 10px, 0)' },
					'100%': { opacity: '1', transform: 'translate3d(0, 0, 0)' }
				},
				'fade-in-right': {
					'0%': { opacity: '0', transform: 'translate3d(20px, 0, 0)' },
					'100%': { opacity: '1', transform: 'translate3d(0, 0, 0)' }
				},
				'fade-in-left': {
					'0%': { opacity: '0', transform: 'translate3d(-20px, 0, 0)' },
					'100%': { opacity: '1', transform: 'translate3d(0, 0, 0)' }
				},
				'scale-in': {
					'0%': { opacity: '0', transform: 'scale3d(0.95, 0.95, 1)' },
					'100%': { opacity: '1', transform: 'scale3d(1, 1, 1)' }
				},
				'float': {
					'0%, 100%': { transform: 'translate3d(0, 0, 0)' },
					'50%': { transform: 'translate3d(0, -10px, 0)' }
				},
				'pulse-subtle': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.85' }
				},
				'slide-up': {
					'0%': { opacity: '0', transform: 'translate3d(0, 20px, 0)' },
					'100%': { opacity: '1', transform: 'translate3d(0, 0, 0)' }
				},
				'slide-down': {
					'0%': { opacity: '0', transform: 'translate3d(0, -20px, 0)' },
					'100%': { opacity: '1', transform: 'translate3d(0, 0, 0)' }
				},
				'zoom-in': {
					'0%': { opacity: '0', transform: 'scale3d(0.8, 0.8, 1)' },
					'100%': { opacity: '1', transform: 'scale3d(1, 1, 1)' }
				},
				'rotate-in': {
					'0%': { opacity: '0', transform: 'rotate3d(0, 0, 1, -45deg) scale3d(0.9, 0.9, 1)' },
					'100%': { opacity: '1', transform: 'rotate3d(0, 0, 1, 0deg) scale3d(1, 1, 1)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards',
				'fade-in-right': 'fade-in-right 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards',
				'fade-in-left': 'fade-in-left 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards',
				'scale-in': 'scale-in 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards',
				'float': 'float 6s ease-in-out infinite',
				'pulse-subtle': 'pulse-subtle 3s ease-in-out infinite',
				'slide-up': 'slide-up 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards',
				'slide-down': 'slide-down 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards',
				'zoom-in': 'zoom-in 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards',
				'rotate-in': 'rotate-in 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards',
			},
			transitionProperty: {
				'width': 'width',
				'height': 'height',
				'spacing': 'margin, padding',
				'backdrop': 'backdrop-filter',
			},
			backdropBlur: {
				'xs': '2px',
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
