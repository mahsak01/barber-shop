"use client";
import { Tabs, TabsProps } from "antd";
import AddClientAddresses from "@/app/_components/pages/admin/AddClient/Addresses/AddClientAddresses";
import AddClientEmergencyContacts from "@/app/_components/pages/admin/AddClient/EmergencyContacts/AddClientEmergencyContacts";
import AddClientProfile from "@/app/_components/pages/admin/AddClient/Profile/AddClientProfile";

const AddClient = () => {
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "پروفایل",
      children: <AddClientProfile />,
    },
    {
      key: "2",
      label: "آدرس",
      children: <AddClientAddresses />,
    },
    {
      key: "4",
      label: "تماس اضطراری",
      children: <AddClientEmergencyContacts />,
    },
  ];

  return <Tabs defaultActiveKey="1" items={items} className="p-8" />;
};

export default AddClient;
