"use client";
import { Tabs, TabsProps } from "antd";
import AddWorkerProfile from "@/app/_components/pages/admin/addWorker/Profile/AddWorkerProfile";
import AddWorkerCommissions from "@/app/_components/pages/admin/addWorker/Commissions/AddWorkerCommissions";
import AddWorkerAddresses from "@/app/_components/pages/admin/addWorker/Addresses/AddWorkerAddresses";
import AddWorkerEmergencyContacts from "@/app/_components/pages/admin/addWorker/EmergencyContacts/AddWorkerEmergencyContacts";
import AddWorkerServices from "@/app/_components/pages/admin/addWorker/Services/AddWorkerServices";

const AddWorker = () => {
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "پروفایل",
      children: <AddWorkerProfile />,
    },
    {
      key: "2",
      label: "آدرس",
      children: <AddWorkerAddresses />,
    },
    {
      key: "4",
      label: "تماس اضطراری",
      children: <AddWorkerEmergencyContacts />,
    },
    {
      key: "5",
      label: "سرویس ها",
      children: <AddWorkerServices />,
    },
    {
      key: "6",
      label: "اطلاعات مکانی",
      children: "Content of Tab Pane 3",
    },
    {
      key: "7",
      label: "کمیسیون ها",
      children: <AddWorkerCommissions />,
    },
  ];

  return <Tabs defaultActiveKey="1" items={items} className="p-8" />;
};

export default AddWorker;
