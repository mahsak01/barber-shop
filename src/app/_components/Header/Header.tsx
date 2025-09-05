import React from "react";
import Image from "next/image";
import ScrollableHeader from "./components/ScrollableHeader/ScrollableHeader";
import DesktopHeader from "./components/NavigationLinks/Desktop/DesktopHeader";
import MobileHeader from "./components/NavigationLinks/Mobile/MobileHeader";
import ThemeSwitcher from "./components/ThemeSwitcher/ThemeSwitcher";
import Login from "./components/Login/Login";
import "./_header.css";

const Header = () => {
  return (
    <ScrollableHeader>
      <nav className="container h-full md:px-10">
        <div className="flex h-full items-center justify-between px-4 sm:px-0">
          {/* LOGO */}
          <div className="flex items-center sm:gap-4 lg:gap-8">
            <div className="flex items-center justify-center">
              <Image
                src="/images/logo.png"
                width={108}
                height={48}
                alt="logo"
              />
            </div>

            {/* MAIN MENU ITEMS */}
            <DesktopHeader />
          </div>

          <div className="flex items-center gap-4">
            {/*  THEME BUTTON */}
            <div className="hidden md:flex">
              <Login />
              <ThemeSwitcher />
            </div>
          </div>

          {/* MOBILE HEADER */}
          <MobileHeader />
        </div>
      </nav>
    </ScrollableHeader>
  );
};

export default Header;
