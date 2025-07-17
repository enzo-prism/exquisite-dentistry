
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
				},
				'gradient-move': {
					'0%, 100%': { 
						backgroundPosition: '0% 50%',
						transform: 'scale3d(1, 1, 1)'
					},
					'50%': { 
						backgroundPosition: '100% 50%',
						transform: 'scale3d(1.02, 1.02, 1)'
					}
				},
				'gradient-shift': {
					'0%': { backgroundPosition: '0% 0%' },
					'25%': { backgroundPosition: '100% 100%' },
					'50%': { backgroundPosition: '0% 100%' },
					'75%': { backgroundPosition: '100% 0%' },
					'100%': { backgroundPosition: '0% 0%' }
				},
				'elegant-float': {
					'0%, 100%': { 
						transform: 'translate3d(0, 0, 0) scale3d(1, 1, 1)',
						opacity: '0.9'
					},
					'33%': { 
						transform: 'translate3d(10px, -5px, 0) scale3d(1.01, 1.01, 1)',
						opacity: '1'
					},
					'66%': { 
						transform: 'translate3d(-5px, 5px, 0) scale3d(0.99, 0.99, 1)',
						opacity: '0.95'
					}
				},
				// Enhanced gradient animations with GPU acceleration
				'gradient-flow': {
					'0%, 100%': { 
						transform: 'translate3d(0, 0, 0) scale(1)',
						backgroundPosition: '0% 0%'
					},
					'25%': { 
						transform: 'translate3d(1px, 0, 0) scale(1.002)',
						backgroundPosition: '25% 25%'
					},
					'50%': { 
						transform: 'translate3d(0, 1px, 0) scale(1)',
						backgroundPosition: '50% 50%'
					},
					'75%': { 
						transform: 'translate3d(-1px, 0, 0) scale(1.001)',
						backgroundPosition: '75% 25%'
					}
				},
				'golden-veins': {
					'0%, 100%': { 
						transform: 'translate3d(0, 0, 0) rotate(0deg)',
						backgroundPosition: '0% 0%, 100% 100%'
					},
					'33%': { 
						transform: 'translate3d(2px, -1px, 0) rotate(0.5deg)',
						backgroundPosition: '33% 67%, 67% 33%'
					},
					'66%': { 
						transform: 'translate3d(-1px, 2px, 0) rotate(-0.3deg)',
						backgroundPosition: '66% 34%, 34% 66%'
					}
				},
				'sparkle-dance': {
					'0%, 100%': { 
						transform: 'translate3d(0, 0, 0)',
						backgroundPosition: '0px 0px, 150px 150px, 120px 120px, 90px 90px'
					},
					'25%': { 
						transform: 'translate3d(0.5px, 0, 0)',
						backgroundPosition: '25px 25px, 175px 125px, 95px 145px, 115px 65px'
					},
					'50%': { 
						transform: 'translate3d(0, 0.5px, 0)',
						backgroundPosition: '50px 50px, 100px 100px, 70px 170px, 140px 40px'
					},
					'75%': { 
						transform: 'translate3d(-0.5px, 0, 0)',
						backgroundPosition: '75px 25px, 125px 175px, 145px 95px, 65px 115px'
					}
				},
				'depth-shimmer': {
					'0%, 100%': { 
						transform: 'translate3d(0, 0, 0)',
						backgroundPosition: '0% 0%, 0% 0%'
					},
					'50%': { 
						transform: 'translate3d(0, 0, 0)',
						backgroundPosition: '100% 100%, 50% 50%'
					}
				},
				'texture-breathe': {
					'0%, 100%': { 
						transform: 'translate3d(0, 0, 0) scale(1)',
						opacity: '0.2'
					},
					'50%': { 
						transform: 'translate3d(0, 0, 0) scale(1.001)',
						opacity: '0.15'
					}
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
				'gradient-move': 'gradient-move 12s ease-in-out infinite',
				'gradient-shift': 'gradient-shift 16s ease-in-out infinite',
				'elegant-float': 'elegant-float 20s ease-in-out infinite',
				// GPU-optimized gradient animations
				'gradient-flow': 'gradient-flow 20s cubic-bezier(0.4, 0, 0.2, 1) infinite',
				'golden-veins': 'golden-veins 25s cubic-bezier(0.4, 0, 0.2, 1) infinite',
				'sparkle-dance': 'sparkle-dance 30s linear infinite',
				'depth-shimmer': 'depth-shimmer 18s cubic-bezier(0.4, 0, 0.2, 1) infinite',
				'texture-breathe': 'texture-breathe 22s cubic-bezier(0.4, 0, 0.2, 1) infinite',
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
