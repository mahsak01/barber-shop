import React from "react";
import { Table, Button, Input, Select } from "antd";
import CustomInput from "@/app/_components/core/antdComponents/CustomInput/CustomInput";

const Clients = () => {
  const columns = [
    {
      title: "نام مشتری", // Client name
      dataIndex: "clientName",
      key: "clientName",
    },
    {
      title: "شماره موبایل", // Mobile number
      dataIndex: "mobileNumber",
      key: "mobileNumber",
    },
    {
      title: "نظرات", // Reviews
      dataIndex: "reviews",
      key: "reviews",
    },
    {
      title: "فروش‌ها", // Sales
      dataIndex: "sales",
      key: "sales",
    },
    {
      title: "تاریخ ایجاد", // Created at
      dataIndex: "createdAt",
      key: "createdAt",
    },
  ];

  const data = [
    {
      key: "1",
      clientName: "عاطفه بخشی", // Atefeh Bakhshi
      mobileNumber: "-",
      reviews: "-",
      sales: "IRR 0",
      createdAt: "17 اکتبر 2025",
    },
    {
      key: "2",
      clientName: "Jack Doe",
      mobileNumber: "-",
      reviews: "-",
      sales: "IRR 0",
      createdAt: "2 اکتبر 2025",
    },
    {
      key: "3",
      clientName: "Jane Doe",
      mobileNumber: "-",
      reviews: "-",
      sales: "IRR 0",
      createdAt: "2 اکتبر 2025",
    },
    {
      key: "4",
      clientName: "John Doe",
      mobileNumber: "-",
      reviews: "-",
      sales: "IRR 0",
      createdAt: "2 اکتبر 2025",
    },
  ];

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-semibold">لیست مشتریان</h1>
        <Button type="primary" className="bg-blue-500 text-white">
          افزودن
        </Button>
      </div>

      <div className="mb-4 flex gap-4 items-center">
        <div>
          <CustomInput
            className="mr-2"
            placeholder="جستجو بر اساس نام، ایمیل یا شماره تلفن"
          />
        </div>
        <Select className="w-40" placeholder="فیلترها">
          <Select.Option value="option1">فیلتر 1</Select.Option>
          <Select.Option value="option2">فیلتر 2</Select.Option>
        </Select>
      </div>

      <Table columns={columns} dataSource={data} pagination={false} />
    </div>
  );
};

export default Clients;
