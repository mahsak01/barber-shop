"use client";
import { Table, Button, Dropdown, Menu, Space, Badge } from "antd";
import { ColumnsType } from "antd/es/table";
import { SearchOutlined, DownOutlined } from "@ant-design/icons";
import CustomButton from "@/app/_components/core/antdComponents/CustomButton/CustomButton";
import CustomInput from "@/app/_components/core/antdComponents/CustomInput/CustomInput";
import { FiFilter } from "react-icons/fi";

interface TeamMember {
  key: string;
  name: string;
  contact: string;
  phone?: string;
  rating: string;
  avatar?: string; // url or initials
  status?: string; // e.g. invitation expired
}

const members: TeamMember[] = [
  {
    key: "1",
    name: "محمد کوه بر",
    contact: "yubar@gmail.com",
    rating: "امتیازی موجود نیست",
    status: "Invitation expired",
  },
  {
    key: "2",
    name: "Atefeh Bakhshi",
    contact: "atefeh.b.samim@gmail.com",
    phone: "+98 913 528 0252",
    rating: "امتیازی موجود نیست",
  },
  {
    key: "3",
    name: "Wendy Smith (Demo)",
    contact: "",
    rating: "امتیازی موجود نیست",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg", // sample avatar
  },
];

const AdminMain = () => {
  const columns: ColumnsType<TeamMember> = [
    {
      title: "نام",
      dataIndex: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (text, record) => (
        <div className="flex items-center gap-2">
          {record.avatar ? (
            <img
              src={record.avatar}
              alt={text}
              className="w-8 h-8 rounded-full"
            />
          ) : (
            <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-gray-600">
              {text.charAt(0)}
            </div>
          )}
          <div>
            <div className="font-medium">{text}</div>
            {record.status && (
              <div className="text-xs text-red-500">{record.status}</div>
            )}
          </div>
        </div>
      ),
    },
    {
      title: "راه ارتباطی",
      dataIndex: "contact",
      render: (_, record) => (
        <div className="flex flex-col">
          <span className="text-blue-600">{record.contact}</span>
          {record.phone && (
            <span className="text-gray-500 text-xs">{record.phone}</span>
          )}
        </div>
      ),
    },
    {
      title: "امتیاز",
      dataIndex: "rating",
      render: (text) => <span className="text-gray-500">{text}</span>,
    },
    {
      title: "",
      key: "actions",
      render: () => {
        const menu = (
          <Menu
            items={[
              { key: "1", label: "View" },
              { key: "2", label: "Edit" },
              { key: "3", label: "Remove" },
            ]}
          />
        );
        return (
          <Dropdown overlay={menu} trigger={["click"]}>
            <Button>
              عملیات
              <DownOutlined />
            </Button>
          </Dropdown>
        );
      },
    },
  ];

  return (
    <div className="p-8 flex flex-col gap-8  bg-neutral-50">
      <div className="flex justify-between mb-4">
        <div className="flex gap-3 items-center">
          <h2 className="text-xl font-semibold">اعضای تیم</h2>
          <Badge count={3} color="#bdbdbd" />
        </div>
        <Space>
          <Dropdown
            menu={{
              items: [
                {
                  label: "1st menu item",
                  key: "1",
                },
              ],
            }}
          >
            <CustomButton>
              <Space>
                گزینه‌ها
                <DownOutlined />
              </Space>
            </CustomButton>
          </Dropdown>
          <CustomButton type="primary">اضافه کردن</CustomButton>
        </Space>
      </div>
      <div className="flex justify-between bg-neutral-100 rounded-md p-4  ">
        <CustomInput
          prefix={<SearchOutlined />}
          placeholder="جستجو اعضای تیم"
          className="w-64"
        />
        <CustomButton icon={<FiFilter />}>فیلترها</CustomButton>
      </div>
      <Table
        rowSelection={{}}
        columns={columns}
        dataSource={members}
        pagination={false}
      />
    </div>
  );
};

export default AdminMain;
