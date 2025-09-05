"use client";
import useScrollPosition from "@/app/hooks/useScrollPosition/useScrollPosition";
import { FC } from "react";

const ScrollableHeader: FC<{ children: React.ReactNode }> = ({ children }) => {
  const isScrolled = useScrollPosition();

  return (
    <header
      className={`sticky top-0 z-30 h-[67px] dark:bg-bg-1 ${isScrolled ? "bg-white/65 shadow-md backdrop-blur-sm dark:bg-base-300 dark:bg-base-300/10 dark:backdrop-blur-sm" : "transparent"}`}
    >
      {children}
    </header>
  );
};

export default ScrollableHeader;
