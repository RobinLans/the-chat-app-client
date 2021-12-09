module.exports = {
  purge: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        nunito: ["Nunito"],
      },
      colors: {
        primary: "#FF1D89",
        secondary: "#FF92C6",
        backGround: "#FBFEFB",
      },
      borderWidth: {
        smallThick: "10px",
        thick: "12px",
        extraThick: "14px",
        veryThick: "16px",
        superThick: "18px",
      },
      height: {
        chatBig: "720px",
        chatSmall: "480px",
      },
      width: {
        chatBig: "1080px",
        chatSmall: "720px",
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ["active"],
      color: ["active"],
    },
  },
  plugins: [],
};
