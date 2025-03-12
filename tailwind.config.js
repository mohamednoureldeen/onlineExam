/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      animation: {
        float: "float 3s infinite",
      },
      float: {
      "0%": { transform: "translateY(0)" },
      "50%": { transform: "translateY(-10px)" },
      "100%": { transform: "translateY(0)" },
    },
    },
    container: {
      center: true,
    },
  },
  plugins: [
    
  ],
}

