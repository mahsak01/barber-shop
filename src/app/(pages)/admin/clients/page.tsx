"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Table, Button, Input, Select } from "antd";
import CustomInput from "@/app/_components/core/antdComponents/CustomInput/CustomInput";
import { useClientsList } from "./_api/clients";
import { ClientRecordType, ClientsListResult } from "./_api/clients.types";
import "./_clients.css";

//  "customer_id": 4,
//  "created_month_name": "مهر",

const ClientsTableModel = [
  {
    title: "نام مشتری", // Client name
    dataIndex: "customer_name",
    key: "customer_name",
    width: 150,
  },
  {
    title: "شماره موبایل", // Mobile number
    dataIndex: "customer_phone",
    key: "customer_phone",
    width: 150,
  },
  {
    title: "نظرات", // Reviews
    dataIndex: "comments",
    key: "comments",
    width: 150,
  },
  {
    title: "فروش‌ها", // Sales
    dataIndex: "total_purchase",
    key: "total_purchase",
    width: 150,
  },
  {
    title: "تاریخ ایجاد", // Created at
    dataIndex: "created_date",
    key: "created_date",
    width: 150,
  },
];

const Clients = () => {
  const [clientList, setClientList] = useState<ClientRecordType[]>([]);

  const router = useRouter();

  const { mutate: getClientList, isPending: isGetClientListLoading } =
    useClientsList({
      onSuccess: ClientListOnSuccess,
    });

  function ClientListOnSuccess(res: ClientsListResult) {
    setClientList(res?.customers);
  }

  useEffect(() => {
    getClientList({
      salon_id: 1002,
    });
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-semibold">لیست مشتریان</h1>
        <Button
          type="primary"
          onClick={() => {
            router.push("/admin/add-client");
          }}
          className="bg-blue-500 text-white"
        >
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

      <Table
        columns={ClientsTableModel}
        dataSource={clientList}
        pagination={false}
        scroll={{ x: "max-content" }}
      />
    </div>
  );
};

export default Clients;
