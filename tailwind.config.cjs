/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                background: {
                    950: 'hsl(var(--bg-color-950))',
                    900: 'hsl(var(--bg-color-900))',
                    800: 'hsl(var(--bg-color-800))',
                    700: 'hsl(var(--bg-color-700))',
                    600: 'hsl(var(--bg-color-600))',
                    500: 'hsl(var(--bg-color-500))',
                    400: 'hsl(var(--bg-color-400))',
                    300: 'hsl(var(--bg-color-300))',
                    200: 'hsl(var(--bg-color-200))',
                    100: 'hsl(var(--bg-color-100))',
                    50: 'hsl(var(--bg-color-50))'
                }
            }
        }
    },
    plugins: []
};
