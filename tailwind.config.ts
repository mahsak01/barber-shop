
import { tailwindColors } from "./src/tailwind/config/tailwindColors";
import { Config } from "tailwindcss";

const tailwindConfig: Config = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],

  theme: {
    colors: tailwindColors,
    container: {
      center: true,
    },
    extend: {
      screens: {
        xs: "320px",
        sm: "390px",
        ls: "480px",
        md: "768px",
        lg: "976px",
        xl: "1280px",
        "2xl": "1440px",
        "3xl": "1920px",
      },
      backgroundImage: {
        footerBg: "url('/images/footerBg.png')",
      },
    },
  },
  plugins: [],
};
export default tailwindConfig;
