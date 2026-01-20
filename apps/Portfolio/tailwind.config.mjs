/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        // COLORES PRINCIPALES - Cambia aquí para cambiar TODO el tema
        primary: {
          DEFAULT: '#f97316',    // Naranja principal
          light: '#fb923c',      // Naranja claro (para hovers, fondos suaves)
          dark: '#ea580c',       // Naranja oscuro (para texto, bordes)
          50: '#fff7ed',         // Muy claro (fondos)
          100: '#ffedd5',        // Claro (fondos suaves)
          200: '#fed7aa',        // Texto suave
          600: '#f97316',        // Principal
          700: '#ea580c',        // Oscuro
          800: '#c2410c',        // Muy oscuro
          900: '#9a3412',        // Extra oscuro (fondos oscuros)
          950: '#7c2d12',        // Extremadamente oscuro
        },
        // Alias para compatibilidad
        secondary: '#ea580c',
        accent: '#fb923c',
      },
    },
  },
  plugins: [],
}
