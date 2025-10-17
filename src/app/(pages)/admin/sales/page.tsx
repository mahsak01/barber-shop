"use client";
import SaleAppointmentsTab from "@/app/_components/pages/admin/sales/Appointments/SaleAppointmentsTab";
import PaymentTransactions from "@/app/_components/pages/admin/sales/PaymentTransactions/PaymentTransactionsTab";
import SalesTab from "@/app/_components/pages/admin/sales/Sales/SalesTab";
import SalesDailyReport from "@/app/_components/pages/admin/sales/SalesDailyReport/SalesDailyReport";
import { Tabs, TabsProps } from "antd";
import React from "react";

const Sales = () => {
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "گزارش فروش روزانه",
      children: <SalesDailyReport />,
    },
    {
      key: "2",
      label: "نوبت ها",
      children: <SaleAppointmentsTab />,
    },
    {
      key: "3",
      label: "فروش ها",
      children: <SalesTab />,
    },
    {
      key: "4",
      label: "تراکنش های پرداخت",
      children: <PaymentTransactions />,
    },
    {
      key: "5",
      label: "فروش کارت های هدیه",
      children: <p></p>,
    },
    {
      key: "6",
      label: "عضویت‌های فروخته‌شده",
      children: <p></p>,
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

export default Sales;
