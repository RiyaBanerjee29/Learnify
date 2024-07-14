/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width: {
        '25' : '25rem',
        '30': '30rem',
        '40': '40rem',
      },
      height: {
        '30': '30rem',
        '40' : '40rem',
    }
  },
  plugins: [],
}

}