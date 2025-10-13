"use client";
import {
  Table,
  Button,
  Dropdown,
  Menu,
  Space,
  Badge,
  TabsProps,
  Tabs,
  Col,
  Row,
} from "antd";
import { ColumnsType } from "antd/es/table";
import { SearchOutlined, DownOutlined } from "@ant-design/icons";
import CustomButton from "@/app/_components/core/antdComponents/CustomButton/CustomButton";
import CustomInput from "@/app/_components/core/antdComponents/CustomInput/CustomInput";
import { FiFilter } from "react-icons/fi";
import { useRouter } from "next/navigation";
import CustomDatePicker from "@/app/_components/core/antdComponents/CustomDatePicker/CustomDatePicker";
import "./_workersList.css";

// import "./workersSchedule.css";

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

interface Member {
  key: string;
  name: string;
  hours: string;
  avatar?: string;
  schedule: Record<string, string | null>;
}

const data: Member[] = [
  {
    key: "1",
    name: "محمد کوه بر",
    hours: "52h",
    schedule: {
      "Sat, 4 Oct": "10:00 - 17:00",
      "Sun, 5 Oct": null,
      "Mon, 6 Oct": "10:00 - 19:00",
      "Tue, 7 Oct": "10:00 - 19:00",
      "Wed, 8 Oct": "10:00 - 19:00",
      "Thu, 9 Oct": "10:00 - 19:00",
      "Fri, 10 Oct": "10:00 - 19:00",
    },
  },
  {
    key: "2",
    name: "Atefeh Bakhshi",
    hours: "52h",
    schedule: {
      "Sat, 4 Oct": "10:00 - 17:00",
      "Sun, 5 Oct": null,
      "Mon, 6 Oct": "10:00 - 19:00",
      "Tue, 7 Oct": "10:00 - 19:00",
      "Wed, 8 Oct": "10:00 - 19:00",
      "Thu, 9 Oct": "10:00 - 19:00",
      "Fri, 10 Oct": "10:00 - 19:00",
    },
  },
  {
    key: "3",
    name: "Wendy Smith",
    hours: "52h",
    schedule: {
      "Sat, 4 Oct": "10:00 - 17:00",
      "Sun, 5 Oct": null,
      "Mon, 6 Oct": "10:00 - 19:00",
      "Tue, 7 Oct": "10:00 - 19:00",
      "Wed, 8 Oct": "10:00 - 19:00",
      "Thu, 9 Oct": "10:00 - 19:00",
      "Fri, 10 Oct": "10:00 - 19:00",
    },
  },
];

const Workers = () => {
  const router = useRouter();

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

  const scheduleColumns = [
    {
      title: <span className="font-semibold">اعضای تیم</span>,
      dataIndex: "name",
      key: "name",
      width: 200,
      render: (text: string, record: Member) => (
        <div className="flex items-center gap-2">
          {record.avatar ? (
            <img
              src={record.avatar}
              alt={text}
              className="w-8 h-8 rounded-full"
            />
          ) : (
            <div className="w-8 h-8 rounded-full p-[1px] flex items-center justify-center font-bold text-gray-600 bg-blue-50 border-success-300 border-2">
              {text.charAt(0)}
            </div>
          )}
          <div className="flex flex-col">
            <span>{text}</span>
            <span className="text-xs text-gray-500">{record.hours}</span>
          </div>
        </div>
      ),
    },
    ...Object.keys(data[0].schedule).map((day) => ({
      title: (
        <div className="text-center">
          <div className="font-semibold">{day}</div>
        </div>
      ),
      dataIndex: ["schedule", day],
      key: day,
      width: 200,
      render: (time: string | null) =>
        time ? (
          <div className="bg-blue-100 rounded-md px-2 py-1 text-center">
            {time}
          </div>
        ) : (
          <div className="text-gray-400 text-center">—</div>
        ),
    })),
  ];

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "اعضای تیم",
      children: (
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
              <CustomButton
                type="primary"
                onClick={() => {
                  router.push("/admin/add-worker");
                }}
              >
                اضافه کردن
              </CustomButton>
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
      ),
    },
    {
      key: "2",
      label: "جدول زمانی",
      children: (
        <div className="p-8 flex flex-col gap-6">
          <Row>
            <Col xs={24} sm={12}>
              <CustomDatePicker name="date" label="انتخاب بازه زمانی" />
            </Col>
          </Row>

          <Table
            columns={scheduleColumns}
            dataSource={data}
            pagination={false}
            className="rounded-xl shadow-sm"
            scroll={{ x: "max-content" }}
          />

          <div className="bg-blue-100 text-gray-600 p-4 rounded-lg text-sm">
            💡 برنامهٔ تیمی، میزان در دسترس بودن شما را برای رزروها نشان می‌دهد
            و به ساعات کاری استاندارد کسب‌وکار شما متصل نیست. برای تنظیم ساعات
            کاری استاندارد،{" "}
            <a href="#" className="text-purple-600 underline">
              اینجا
            </a>{" "}
            کلیک کنید.
          </div>
        </div>
      ),
    },
  ];

  return (
    <Tabs
      defaultActiveKey="1"
      items={items}
      onChange={() => {}}
      className="px-8"
    />
  );
};

export default Workers;
