import CustomButton from "@/app/_components/core/antdComponents/CustomButton/CustomButton";
import { Dropdown, Menu } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { WorkersListDataType } from "@/app/(pages)/admin/workers/_api/workersList.types";
import Image from "next/image";
import { WorkersListTableModelTypes } from "./workersListTableModel.types";

const WorkersListTableModel = ({
  detailDrawerHandler,
}: WorkersListTableModelTypes) => [
  {
    title: "نام",
    dataIndex: "fname",
    render: (value: string, record: WorkersListDataType) => (
      <div className="flex items-center gap-2">
        {record?.avatar === 0 ? (
          <Image // Placeholder image
            src={`/images/placeholder/man.png`}
            alt="placeholder"
            width={40}
            height={40}
            className="w-10 h-10 min-w-10 rounded-full object-cover mr-3"
          />
        ) : (
          <Image
            src={`https://be-nobat.ir/images/users/${record?.ID}.jpg`}
            alt="placeholder"
            width={40}
            height={40}
            className="w-10 h-10 min-w-10 rounded-full object-cover mr-3"
          />
        )}
        <div>
          <div className="font-medium">
            {value} {record?.lname}
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "راه ارتباطی",
    dataIndex: "email",
    render: (value: string, record: WorkersListDataType) => (
      <div className="flex flex-col">
        {record.phone && (
          <span className="text-gray-500 text-xs">{record.phone}</span>
        )}
        <span className="text-blue-600">{value}</span>
      </div>
    ),
  },
  {
    title: "امتیاز",
    dataIndex: "score",
    render: (value: string) => <span className="text-gray-500">{value}</span>,
  },
  {
    title: "",
    key: "ID",
    render: (value: number) => {
      const menu = (
        <Menu
          items={[
            {
              key: "1",
              label: "جزییات",
              onClick: () => detailDrawerHandler(value),
            },
            { key: "2", label: "ویرایش", onClick: () => {} },
            { key: "3", label: "شیفت", onClick: () => {} },
          ]}
        />
      );
      return (
        <Dropdown overlay={menu} trigger={["click"]}>
          <CustomButton>
            عملیات
            <DownOutlined />
          </CustomButton>
        </Dropdown>
      );
    },
  },
];

export default WorkersListTableModel;
