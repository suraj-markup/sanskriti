/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                "primary": "#581c87", // Deep Purple (purple-900 equivalent or custom professional deep purple)
                "primary-hover": "#4c1d95",
                "deep-blue": "#1e1b4b",
                "background-light": "#f8f7f5",
                "background-dark": "#111827",
            },
            fontFamily: {
                "display": ["Lexend", "sans-serif"],
                "poppins": ["Poppins", "sans-serif"]
            },
            borderRadius: {
                "DEFAULT": "0.25rem",
                "lg": "0.5rem",
                "xl": "0.75rem",
                "full": "9999px"
            },
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
        require('@tailwindcss/container-queries')
    ],
}
