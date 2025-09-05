"use client";
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import CustomButton from "@/app/_components/core/antdComponents/CustomButton/CustomButton";

const ThemeSwitcher = () => {
  const { resolvedTheme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  const isDark = resolvedTheme === "dark";

  useEffect(() => {
    setMounted(true);
  }, []);

  // Avoid rendering until after mounting to prevent hydration mismatch
  if (!mounted) {
    return <div className="size-5" />; // Or a loading placeholder if preferred
  }

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <CustomButton
      className="items-center justify-center md:flex"
      onClick={toggleTheme}
      type="text"
      shape="circle"
      icon={
        isDark ? (
          <MdLightMode className="size-5 fill-warning" color="white" />
        ) : (
          <MdDarkMode className="size-5 fill-[#4f347d]" />
        )
      }
    />
  );
};

export default ThemeSwitcher;
