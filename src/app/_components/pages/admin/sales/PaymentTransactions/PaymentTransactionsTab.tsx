import React from "react";
import { Table, Button, DatePicker } from "antd";

const PaymentTransactions = () => {
  const columns = [
    {
      title: "تاریخ پرداخت", // Payment Date
      dataIndex: "paymentDate",
      key: "paymentDate",
    },
    {
      title: "شماره مرجع", // Ref #
      dataIndex: "refNumber",
      key: "refNumber",
    },
    {
      title: "مشتری", // Client
      dataIndex: "client",
      key: "client",
    },
    {
      title: "عضو تیم", // Team member
      dataIndex: "teamMember",
      key: "teamMember",
    },
    {
      title: "نوع", // Type
      dataIndex: "type",
      key: "type",
    },
    {
      title: "روش پرداخت", // Method
      dataIndex: "method",
      key: "method",
    },
    {
      title: "مقدار", // Amount
      dataIndex: "amount",
      key: "amount",
    },
  ];

  const data = [
    {
      key: "1",
      paymentDate: "17 اکتبر 2025, 09:32",
      refNumber: "1",
      client: "حضوری",
      teamMember: "عاطفه بخشی",
      type: "فروش",
      method: "نقدی",
      amount: "IRR 150",
    },
    {
      key: "12",
      paymentDate: "17 اکتبر 2025, 09:32",
      refNumber: "1",
      client: "آنلاین",
      teamMember: "عاطفه بخشی",
      type: "فروش",
      method: "انلاین",
      amount: "IRR 150",
    },
  ];

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-semibold">تراکنش‌های پرداخت</h1>
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

export default PaymentTransactions;
