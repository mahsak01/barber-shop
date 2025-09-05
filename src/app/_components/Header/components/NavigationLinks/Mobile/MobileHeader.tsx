"use client";
import React, { useState } from "react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { FiMenu } from "react-icons/fi";
import CustomDrawer from "@/app/_components/core/antdComponents/CustomDrawer/CustomDrawer";
import CustomDrawerHeader from "@/app/_components/core/antdComponents/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import { menuItems } from "../menuItems";
import ThemeSwitcher from "../../ThemeSwitcher/ThemeSwitcher";
import "./_mobileHeader.css";
import Login from "../../Login/Login";

const MobileHeader = () => {
  const pathName = usePathname();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { resolvedTheme } = useTheme();
  const closeDrawerHandler = () => {
    setIsDrawerOpen(false);
  };
  const isDark = resolvedTheme === "dark";

  return (
    <>
      <CustomDrawer
        open={isDrawerOpen}
        onClose={closeDrawerHandler}
        className={
          isDark ? "mobile-nav-container-dark" : "mobile-nav-container-light"
        }
        size="default"
      >
        <div>
          <CustomDrawerHeader
            closeDrawerHandler={closeDrawerHandler}
            hasLeftSide
            leftSideContent={
              <Image
                src="/images/logo.png"
                width={108}
                height={48}
                alt="logo"
              />
            }
          />
          <div className="flex items-center justify-between">
            <ThemeSwitcher />
          </div>
          <div>
            {/* MENU ITEMS */}
            <div className="flex flex-col py-8">
              {menuItems?.map((item) => {
                const isActive = pathName === item?.href;
                return (
                  <Link
                    key={item?.href}
                    href={item?.href}
                    className={`p-4 text-text-50 transition-colors hover:text-primary dark:text-text-50 dark:hover:text-primary ${isActive && "rounded-lg bg-primary-500 text-neutral-50 dark:text-neutral-50"}`}
                    onClick={closeDrawerHandler}
                  >
                    <span>{item?.title}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </CustomDrawer>
      <span className="flex items-center justify-center gap-4 md:hidden">
        <Login/>
        <FiMenu onClick={() => setIsDrawerOpen(true)} />
      </span>
    </>
  );
};
export default MobileHeader;
