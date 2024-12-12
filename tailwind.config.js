/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            boxShadow: {
                'custom-top-left': '-1.5px -1.5px 1px 0 rgba(255, 255, 255, 0.5)',
            },
            backgroundColor: {
                'custom-gray-50': 'rgba(107, 114, 128, 0.5)',
            }
        },
    },
    plugins: [],
};
