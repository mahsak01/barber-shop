"use client";
import ScrollableHeader from "@/app/_components/Header/components/ScrollableHeader/ScrollableHeader";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { useState, ReactNode } from "react";
import {
  BiBell,
  BiBookOpen,
  BiCalendar,
  BiHome,
  BiSearch,
  BiShoppingBag,
  BiSmile,
} from "react-icons/bi";
import { FaChartLine } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import { PiUserListThin, PiUsersThree } from "react-icons/pi";

const data = [
  { day: "Thu 25", sales: 0, appointments: 0 },
  { day: "Fri 26", sales: 0, appointments: 0 },
  { day: "Sat 27", sales: 0, appointments: 0 },
  { day: "Sun 28", sales: 0, appointments: 0 },
  { day: "Mon 29", sales: 0, appointments: 0 },
  { day: "Tue 30", sales: 0, appointments: 0 },
  { day: "Wed 1", sales: 0, appointments: 0 },
  { day: "Thu 2", sales: 1, appointments: 140 },
];

const menu = [
  { icon: BiHome, route: "/admin" },
  { icon: BiCalendar, route: "/admin/calender" },
  { icon: BiShoppingBag, route: "/admin/sales" },
  { icon: BiSmile, route: "/admin/clients" },
  { icon: BiBookOpen, route: "/admin/catalog" },
  { icon: PiUserListThin, route: "" },
  { icon: PiUsersThree, route: "/admin/workers" },
  { icon: FaChartLine, route: "" },
  { icon: IoSettingsOutline, route: "" },
];

export default function AdminPanelLayout({ children }: { children: ReactNode }) {
  const [active, setActive] = useState(0);

  const router = useRouter();

  return (
    <div className="flex flex-col h-screen">
      {/* Header - Full Width */}
      <ScrollableHeader>
        <header className="flex items-center justify-between px-6 py-3.5  border-gray-200 dark:border-gray-700 shadow-sm">
          {/* Logo */}
          <Image src="/images/logo.png" width={108} height={48} alt="logo" />

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button className="bg-purple-600 text-white px-4 py-2 rounded-full">
              Continue setup
            </button>
            <BiSearch className="w-5 h-5 text-gray-500 cursor-pointer" />
            <div className="relative">
              <BiBell className="w-5 h-5 text-gray-500 cursor-pointer" />
              <span className="absolute -top-1 -right-1 bg-error-500 text-white text-xs rounded-full px-1">
                3
              </span>
            </div>
            <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center">
              A
            </div>
          </div>
        </header>
      </ScrollableHeader>

      {/* Main Content Area - Sidebar on Right, Content on Left */}
      <div className="flex flex-1 overflow-hidden">
    

        {/* Sidebar */}
        <aside className="w-16 bg-neutral-13 text-white flex flex-col items-center py-4 space-y-6">
          {menu.map((item, i) => {
            const Icon = item.icon;
            return (
              <button
                key={i}
                onClick={() => {
                  setActive(i);
                  router.push(item.route);
                }}
                className={`p-2 rounded-lg ${
                  active === i ? "bg-neutral-600" : "hover:bg-neutral-700"
                }`}
              >
                <Icon className="w-6 h-6" />
              </button>
            );
          })}
        </aside>
            {/* Content */}
            <main className="flex-1 overflow-y-auto scrollbar-hide">
          {children}
        </main>
      </div>
    </div>
  );
}
