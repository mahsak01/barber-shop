"use client";
import { Tabs, TabsProps } from "antd";
import CatalogCategoriesTab from "@/app/_components/pages/admin/catalog/Categories/CatalogCategoriesTab";

const Catalog = () => {
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "سرویس ها",
      children: <CatalogCategoriesTab />,
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

export default Catalog;
