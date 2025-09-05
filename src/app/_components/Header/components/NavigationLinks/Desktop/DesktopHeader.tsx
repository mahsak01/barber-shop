"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { menuItems } from "../menuItems";

const DesktopHeader = () => {
  const pathName = usePathname();

  return (
    <div className="hidden gap-4 md:flex">
      {menuItems?.map((item) => {
        const isActive = pathName === item?.href;
        return (
          <Link
            href={item?.href}
            key={item?.href}
            className={`text-text-100 transition-colors hover:text-primary dark:text-text-50 dark:hover:text-primary ${isActive && "!text-primary-700 dark:!text-primary-700"}`}
          >
            {item?.title}
          </Link>
        );
      })}
    </div>
  );
};

export default DesktopHeader;
