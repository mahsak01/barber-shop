"use client";

import { useDashbordList } from "./_api/admin";
import { useEffect, useState } from "react";
import { DashbordListResult } from "./_api/admin.types";
import Turns from "@/app/_components/pages/admin/admin/Turns/Turns";
import DashbordHomeSales from "@/app/_components/pages/admin/admin/DashbordHomeSales/DashbordHomeSales";
import LogActivity from "@/app/_components/pages/admin/admin/LogActivity/LogActivity";
import TopServices from "@/app/_components/pages/admin/admin/TopServices/TopServices";
import TopWorker from "@/app/_components/pages/admin/admin/TopWorker/TopWorker";
import DashbordHomeTurns from "@/app/_components/pages/admin/admin/DashbordHomeTurns/DashbordHomeTurns";

const STATUS_TYPE = [
  {
    id: 0,
    title: "منتظر تایید",
  },
  {
    id: 1,
    title: "تایید شده",
  },
  {
    id: 2,
    title: "انجام شده",
  },
  {
    id: 3,
    title: "لغو توسط سالن یا وورکر",
  },
  {
    id: 4,
    title: "لغو توسط مشتری",
  },
];

export default function DashboardPage() {
  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      <DashbordHomeSales />
      <DashbordHomeTurns />
      <Turns />
      <LogActivity />
      <TopServices />
      <TopWorker />
    </div>
  );
}
