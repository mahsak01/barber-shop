import React, { useEffect, useState } from "react";
import { Table, Button } from "antd";
import {
  SearchOutlined,
  FilterOutlined,
  CalendarOutlined,
  ExportOutlined,
} from "@ant-design/icons";
import { useSaleTurns } from "@/app/(pages)/admin/sales/_api/sales";
import {
  SaleTurnsRecordType,
  SaleTurnsResult,
} from "@/app/(pages)/admin/sales/_api/sales.types";
import SaleAppointmentsTableModels from "./helper/models/SaleAppointments/SaleAppointmentsTableModels";

const SaleAppointmentsTab = () => {
  const [saleTurnsList, setSaleTurnsList] = useState<SaleTurnsRecordType[]>([]);
  const { mutate: getSaleTurnsList, isPending: isGetSaleTurnsListLoading } =
    useSaleTurns({
      onSuccess: SaleTurnsListOnSuccess,
    });

  function SaleTurnsListOnSuccess(res: SaleTurnsResult) {
    setSaleTurnsList(res?.data);
  }

  useEffect(() => {
    getSaleTurnsList({
      salon_id: 1002,
      type: 0,
      from: 0,
      to: 10,
    });
  }, []);

  return (
    <div className="p-6 bg-white  max-w-full">
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
        columns={SaleAppointmentsTableModels()}
        dataSource={saleTurnsList}
        pagination={false}
        className="text-right"
        bordered
        scroll={{ x: "max-content" }}
      />
      <p className="text-center text-gray-500 mt-4">نمایش ۵ از ۵ نتیجه</p>
    </div>
  );
};

export default SaleAppointmentsTab;
