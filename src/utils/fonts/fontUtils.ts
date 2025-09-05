import { Vazirmatn } from "next/font/google";

export const vazirmatn = Vazirmatn({
  weight: ["400", "500", "700"], // You can adjust this to other available weights like "100"–"900"
  subsets: ["arabic"], // "arabic" is the correct subset for Vazirmatn
  variable: "--vazirmatn", // Custom CSS variable
  display: "swap", // Font display strategy
});
