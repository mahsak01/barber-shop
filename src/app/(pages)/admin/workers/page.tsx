"use client";
import { TabsProps, Tabs } from "antd";

import WorkersListTab from "@/app/_components/pages/admin/workersList/WorkersListTab/WorkersListTab";
import WorkersScheduleTab from "@/app/_components/pages/admin/workersList/WorkersScheduleTab/WorkersScheduleTab";
import "./_workersList.css";

const Workers = () => {
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "اعضای تیم",
      children: <WorkersListTab />,
    },
    {
      key: "2",
      label: "جدول زمانی",
      children: <WorkersScheduleTab />,
    },
  ];

  return (
    <Tabs
      defaultActiveKey="1"
      items={items}
      onChange={() => {}}
      className="px-8"
    />
  );
};

export default Workers;
