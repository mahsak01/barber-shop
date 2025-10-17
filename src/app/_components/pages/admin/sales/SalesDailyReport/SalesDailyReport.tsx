import React from "react";
import { Table, Button, Dropdown, DatePicker } from "antd";
import { DownOutlined, PlusOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import "antd/dist/reset.css";

export default function SalesDailyReport() {
  const date = dayjs();

  const transactionColumns = [
    { title: "نوع آیتم", dataIndex: "item", key: "item" },
    { title: "تعداد فروش", dataIndex: "salesQty", key: "salesQty" },
    { title: "تعداد مرجوعی", dataIndex: "refundQty", key: "refundQty" },
    { title: "مبلغ کل", dataIndex: "total", key: "total" },
  ];

  const transactionData = [
    { key: 1, item: "خدمات", salesQty: 0, refundQty: 0, total: "۰ IRR" },
    {
      key: 2,
      item: "افزودنی خدمات",
      salesQty: 0,
      refundQty: 0,
      total: "۰ IRR",
    },
    { key: 3, item: "محصولات", salesQty: 0, refundQty: 0, total: "۰ IRR" },
    { key: 4, item: "ارسال", salesQty: 0, refundQty: 0, total: "۰ IRR" },
    { key: 5, item: "کارت هدیه", salesQty: 0, refundQty: 0, total: "۰ IRR" },
    { key: 6, item: "اشتراک‌ها", salesQty: 0, refundQty: 0, total: "۰ IRR" },
    {
      key: 7,
      item: "هزینه لغو دیرهنگام",
      salesQty: 0,
      refundQty: 0,
      total: "۰ IRR",
    },
    {
      key: 8,
      item: "جریمه عدم حضور",
      salesQty: 0,
      refundQty: 0,
      total: "۰ IRR",
    },
    {
      key: 9,
      item: "مبلغ استرداد",
      salesQty: 0,
      refundQty: 0,
      total: "۰ IRR",
    },
    {
      key: 10,
      item: "جمع کل فروش",
      salesQty: 0,
      refundQty: 0,
      total: "۰ IRR",
    },
  ];

  const cashColumns = [
    { title: "نوع پرداخت", dataIndex: "paymentType", key: "paymentType" },
    { title: "مبالغ دریافتی", dataIndex: "collected", key: "collected" },
    { title: "مبالغ برگشتی", dataIndex: "refund", key: "refund" },
  ];

  const cashData = [
    { key: 1, paymentType: "نقدی", collected: "۰ IRR", refund: "۰ IRR" },
    { key: 2, paymentType: "سایر", collected: "۰ IRR", refund: "۰ IRR" },
    {
      key: 3,
      paymentType: "استفاده از کارت هدیه",
      collected: "۰ IRR",
      refund: "۰ IRR",
    },
    {
      key: 4,
      paymentType: "جمع کل پرداختی‌ها",
      collected: "۰ IRR",
      refund: "۰ IRR",
    },
    { key: 5, paymentType: "انعام‌ها", collected: "۰ IRR", refund: "۰ IRR" },
  ];

  const exportMenu = {
    items: [
      { key: "1", label: "خروجی CSV" },
      { key: "2", label: "چاپ" },
    ],
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">فروش روزانه</h1>
        <div className="flex items-center space-x-3 space-x-reverse">
          <Dropdown menu={exportMenu}>
            <Button>
              خروجی <DownOutlined />
            </Button>
          </Dropdown>
          <Button type="primary" icon={<PlusOutlined />}>
            افزودن جدید
          </Button>
        </div>
      </div>

      <p className="text-gray-500 mb-4">
        مشاهده، فیلتر و خروجی گرفتن از تراکنش‌ها و پرداخت‌های نقدی روز
      </p>

      {/* Date Filter */}
      <div className="flex items-center space-x-2 space-x-reverse mb-6">
        <Button>امروز</Button>
        <DatePicker defaultValue={date} format="dddd DD MMM YYYY" />
      </div>

      {/* Tables */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-3">خلاصه تراکنش‌ها</h2>
          <Table
            columns={transactionColumns}
            dataSource={transactionData}
            pagination={false}
            size="small"
          />
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-3">خلاصه پرداخت‌های نقدی</h2>
          <Table
            columns={cashColumns}
            dataSource={cashData}
            pagination={false}
            size="small"
          />
        </div>
      </div>
    </div>
  );
}
