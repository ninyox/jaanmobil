/** @type {import('tailwindcss').Config} **/
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./modals/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        mycolor: "#6b34ff",
        dark: "#1c1c1c",
        darke: "#1e1e1e",
        fakecolor: "#E0C12310",
        lightdark:"#424141",
        bluecolor: "#11053b60",
        bluecolortran: "#0000ff20",
        sidecolor: "#1a2035",
        setgray: "#333333",
        graytext: "#616161",
        figmagray: "#E5E2E1",
        yellow: "#FFB901",
      },
      backgroundImage: {
        chatbg: "url('./assets/images/chatbg.jpeg')",
        // Add other background images here
      },
      borderRadius: {
        custom: "30px",
      },
      fontSize:{
        ten:"10px",
        eight:"8px",
        sixt:"16px",
        twelve:"12px"
        
      },
      fontFamily: {
        inter: ["inter"],
        intermedium: ["inter-medium"],
        interbold: ["inter-bold"],
        interregular: ["inter-regular"],
        intersemibold: ["inter-semibold"],
        interblack: ["inter-black"],
        lexendbold: ["lexend-bold", "sans"],
        lexend: ["lexend"],
        lexendmedium: ["lexend-medium"],
      },
      width: {
        half: "48%",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".scrollbar-hide": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
        },
        ".scrollbar-hide::-webkit-scrollbar": {
          display: "none",
        },
        ".skeleton-loading": {
          backgroundColor: "#cccccc",
          backgroundImage:
            "linear-gradient(90deg, #cccccc 25%, #e0e0e0 50%, #cccccc 75%)",
          backgroundSize: "200% 100%",
          animation: "skeleton-loading 1.5s ease infinite",
        },
        "@keyframes skeleton-loading": {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
      };

      addUtilities(newUtilities, {
        variants: ["responsive", "hover"],
      });
    },
  ],
};
