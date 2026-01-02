import { PaiedTransactionsRecordType } from "@/app/(pages)/admin/sales/_api/sales.types";

export const PaymentTransactionsTableModel = [
  {
    title: "تاریخ پرداخت", // Payment Date
    dataIndex: "date",
    key: "date",
    width: 150,
  },
  {
    title: "شماره مرجع", // Ref #
    dataIndex: "refid",
    key: "refid",
    width: 150,
  },
  {
    title: "مشتری", // Client
    dataIndex: "pay_method",
    key: "pay_method",
    width: 150,
  },
  {
    title: "عضو تیم", // Team member
    dataIndex: "worker_name",
    key: "worker_name",
    width: 150,
    render: (value: string, records: PaiedTransactionsRecordType) => {
      return (
        <div className="flex flex-col gap-1">
          <span>{value}</span>
          <span className="text-primary">{records?.worker_phone}</span>
        </div>
      );
    },
  },
  {
    title: "نوع", // Type
    dataIndex: "type",
    key: "type",
    width: 150,
  },
  // {
  //   title: "روش پرداخت", // Method
  //   dataIndex: "method",
  //   key: "method",
  //   width: 150,
  // },
  {
    title: "مقدار", // Amount
    dataIndex: "price",
    key: "price",
    width: 150,
  },
];
