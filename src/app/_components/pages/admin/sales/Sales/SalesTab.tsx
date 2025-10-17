import React from "react";
import { Table, Button, DatePicker } from "antd";

const SalesTab = () => {
  const columns = [
    {
      title: "شماره فروش", // Sale #
      dataIndex: "saleNumber",
      key: "saleNumber",
    },
    {
      title: "مشتری", // Client
      dataIndex: "client",
      key: "client",
    },
    {
      title: "وضعیت", // Status
      dataIndex: "status",
      key: "status",
      render: (text) => (
        <span className={`status-${text.toLowerCase()}`}>{text}</span>
      ),
    },
    {
      title: "تاریخ فروش", // Sale date
      dataIndex: "saleDate",
      key: "saleDate",
    },
    {
      title: "انعام", // Tips
      dataIndex: "tips",
      key: "tips",
    },
    {
      title: "جمع کل", // Gross total
      dataIndex: "grossTotal",
      key: "grossTotal",
    },
  ];

  const data = [
    {
      key: "1",
      saleNumber: "1",
      client: "Walk-In",
      status: "Completed",
      saleDate: "17 اکتبر 2025, 09:32", // Translated date
      tips: "IRR 0",
      grossTotal: "IRR 150",
    },
  ];

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-semibold">فروش‌ها</h1>
        <Button type="primary" className="bg-blue-500 text-white">
          افزودن جدید
        </Button>
      </div>

      <div className="mb-4">
        <DatePicker.RangePicker className="mr-2" />
      </div>

      <Table columns={columns} dataSource={data} pagination={false} />
    </div>
  );
};

export default SalesTab;
