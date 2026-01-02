import { SaleTurnsRecordType } from "@/app/(pages)/admin/sales/_api/sales.types";
import { Tag } from "antd";

const SaleAppointmentsTableModels = () => {
  return [
    {
      title: "شماره مرجع",
      dataIndex: "turn_id",
      key: "turn_id",
      width: 100,
    },
    {
      title: "مشتری",
      dataIndex: "payment_type",
      key: "payment_type",
      width: 100,
    },
    {
      title: "خدمت",
      dataIndex: "service_name",
      key: "service_name",
      width: 200,
    },
    {
      title: "ایجاد شده توسط",
      dataIndex: "customer_name",
      key: "customer_name",
      width: 200,
      render: (value: string, records: SaleTurnsRecordType) => {
        return (
          <div className="flex flex-col gap-1">
            <span>
              {value} {records?.customer_family}
            </span>
            <span className="text-primary">{records?.customer_phone}</span>
          </div>
        );
      },
    },
    // {
    //   title: "تاریخ ایجاد",
    //   dataIndex: "createdDate",
    //   key: "createdDate",
    //   width: 200,
    // },
    {
      title: "تاریخ زمان‌بندی",
      dataIndex: "date",
      key: "date",
      width: 150,
      render: (value: string, records: SaleTurnsRecordType) => {
        return (
          <div className="flex flex-col gap-1">
            <span>{value}</span>
            <span>
              {records?.start_time?.slice(0, 5)}
              {" - "}
              {records?.end_time?.slice(0, 5)}
            </span>
          </div>
        );
      },
    },
    {
      title: "مدت زمان",
      dataIndex: "service_duration",
      key: "service_duration",
      width: 100,
      render: (value: string) => {
        return <>{value} دقیقه</>;
      },
    },
    {
      title: "عضو تیم",
      dataIndex: "worker_name",
      key: "worker_name",
      width: 150,
      render: (value: string, records: SaleTurnsRecordType) => {
        return (
          <div className="flex flex-col gap-1">
            <span>
              {value} {records?.worker_family}
            </span>
            <span className="text-primary">{records?.worker_phone}</span>
          </div>
        );
      },
    },
    {
      title: "قیمت",
      dataIndex: "price",
      key: "price",
      width: 100,
    },
    {
      title: "وضعیت",
      dataIndex: "status",
      key: "status",
      width: 200,
      render: (status: string) => (
        <Tag color="blue" className="rounded-full px-3 py-1">
          {status}
        </Tag>
      ),
    },
  ];
};

export default SaleAppointmentsTableModels;
