import React from "react";
import { Table, Tag, Button } from "antd";
import {
  SearchOutlined,
  FilterOutlined,
  CalendarOutlined,
  ExportOutlined,
} from "@ant-design/icons";

const data = [
  {
    key: "1",
    ref: "#3B5A5EDF",
    client: "مراجعه حضوری",
    service: "رنگ مو",
    createdBy: "عاطفه بخشی",
    createdDate: "17 مهر 1404، 07:03",
    scheduledDate: "18 مهر 1404، 10:15",
    duration: "1 ساعت و 15 دقیقه",
    teamMember: "عاطفه بخشی",
    price: "57 IRR",
    status: "رزرو شده",
  },
  {
    key: "2",
    ref: "#DCDB06DC",
    client: "مراجعه حضوری",
    service: "کوتاهی مو",
    createdBy: "عاطفه بخشی",
    createdDate: "17 مهر 1404، 06:57",
    scheduledDate: "17 مهر 1404، 10:00",
    duration: "45 دقیقه",
    teamMember: "عاطفه بخشی",
    price: "40 IRR",
    status: "رزرو شده",
  },
  {
    key: "3",
    ref: "#8689DD49",
    client: "جین دو",
    service: "رنگ مو",
    createdBy: "عاطفه بخشی",
    createdDate: "2 مهر 1404، 20:07",
    scheduledDate: "2 مهر 1404، 13:00",
    duration: "1 ساعت و 15 دقیقه",
    teamMember: "عاطفه بخشی",
    price: "57 IRR",
    status: "رزرو شده",
  },
  {
    key: "4",
    ref: "#87893B3B",
    client: "جان دو",
    service: "کوتاهی مو",
    createdBy: "عاطفه بخشی",
    createdDate: "2 مهر 1404، 20:07",
    scheduledDate: "2 مهر 1404، 11:00",
    duration: "45 دقیقه",
    teamMember: "عاطفه بخشی",
    price: "40 IRR",
    status: "رزرو شده",
  },
  {
    key: "5",
    ref: "#45E02082",
    client: "جک دو",
    service: "سشوار",
    createdBy: "عاطفه بخشی",
    createdDate: "2 مهر 1404، 20:07",
    scheduledDate: "2 مهر 1404، 10:00",
    duration: "35 دقیقه",
    teamMember: "وندی اسمیت (دمو)",
    price: "35 IRR",
    status: "رزرو شده",
  },
];

const columns = [
  {
    title: "شماره مرجع",
    dataIndex: "ref",
    key: "ref",
    render: (text) => <a href="#">{text}</a>,
  },
  {
    title: "مشتری",
    dataIndex: "client",
    key: "client",
    render: (text) => <a href="#">{text}</a>,
  },
  {
    title: "خدمت",
    dataIndex: "service",
    key: "service",
  },
  {
    title: "ایجاد شده توسط",
    dataIndex: "createdBy",
    key: "createdBy",
  },
  {
    title: "تاریخ ایجاد",
    dataIndex: "createdDate",
    key: "createdDate",
  },
  {
    title: "تاریخ زمان‌بندی",
    dataIndex: "scheduledDate",
    key: "scheduledDate",
  },
  {
    title: "مدت زمان",
    dataIndex: "duration",
    key: "duration",
  },
  {
    title: "عضو تیم",
    dataIndex: "teamMember",
    key: "teamMember",
  },
  {
    title: "قیمت",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "وضعیت",
    dataIndex: "status",
    key: "status",
    render: (status) => (
      <Tag color="blue" className="rounded-full px-3 py-1">
        {status}
      </Tag>
    ),
  },
];

const SaleAppointmentsTab = () => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-full">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold mb-1">نوبت‌ها</h2>
          <p className="text-gray-500">
            نمایش، فیلتر و خروجی نوبت‌های رزرو شده توسط مشتریان شما.
          </p>
        </div>
        <Button icon={<ExportOutlined />}>خروجی</Button>
      </div>
      <div className="flex flex-wrap gap-4 mb-4">
        <div className="flex items-center border rounded px-3 py-2 w-full md:w-auto text-gray-500">
          <SearchOutlined className="ml-2" />
          <input
            type="text"
            placeholder="جستجو بر اساس مرجع یا مشتری"
            className="outline-none placeholder-gray-400 bg-transparent w-full"
          />
        </div>
        <button className="flex items-center gap-2 border rounded px-3 py-2 text-gray-700 hover:bg-gray-100 transition">
          1 مهر 1404 - 31 مهر 1404
          <CalendarOutlined />
        </button>
        <button className="flex items-center gap-2 border rounded px-3 py-2 text-gray-700 hover:bg-gray-100 transition">
          فیلتر
          <FilterOutlined />
        </button>
        <button className="flex items-center gap-2 border rounded px-3 py-2 text-gray-700 hover:bg-gray-100 transition ml-auto">
          جدیدترین تاریخ زمان‌بندی
        </button>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        className="text-right"
        bordered
      />
      <p className="text-center text-gray-500 mt-4">نمایش ۵ از ۵ نتیجه</p>
    </div>
  );
};

export default SaleAppointmentsTab;
