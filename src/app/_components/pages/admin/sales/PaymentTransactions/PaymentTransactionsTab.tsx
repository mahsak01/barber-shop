import React, { useEffect, useState } from "react";
import { Table, Button, DatePicker } from "antd";
import { usePaiedTransactions } from "@/app/(pages)/admin/sales/_api/sales";
import {
  PaiedTransactionsRecordType,
  PaiedTransactionsResult,
} from "@/app/(pages)/admin/sales/_api/sales.types";
import { PaymentTransactionsTableModel } from "./helper/models/PaymentTransactions/PaymentTransactionsTableModel";

//   time: "02:50";
//   month_name: "مهر";
//   customer_phone: "09135280252";
//   customer_name: "عاطفه بخشی";
//   salon_name: "ماه بانو";

const PaymentTransactions = () => {
  const [paiedTransactionsList, setPaiedTransactionsList] = useState<
    PaiedTransactionsRecordType[]
  >([]);

  const {
    mutate: getPaiedTransactionsList,
    isPending: isGetPaiedTransactionsListLoading,
  } = usePaiedTransactions({
    onSuccess: PaiedTransactionsListOnSuccess,
  });

  function PaiedTransactionsListOnSuccess(res: PaiedTransactionsResult) {
    console.log(res);
    setPaiedTransactionsList(res?.transactions);
  }

  useEffect(() => {
    getPaiedTransactionsList({
      salon_id: 1002,
      start_date: "1404.07.01",
      end_date: "1404.07.30",
    });
  }, []);

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

      <Table
        columns={PaymentTransactionsTableModel}
        dataSource={paiedTransactionsList}
        pagination={false}
      />
    </div>
  );
};

export default PaymentTransactions;
