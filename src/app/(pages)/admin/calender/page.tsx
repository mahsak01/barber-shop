"use client";
import { useEffect, useState } from "react";
import { Dropdown, Space } from "antd";
import { useWorkersList } from "../workers/_api/workersList";
import { WorkersListResult } from "../workers/_api/workersList.types";
import { AiOutlineCalendar } from "react-icons/ai";
import { FiUsers, FiTag } from "react-icons/fi";
import { GiTwoCoins } from "react-icons/gi";
import CustomButton from "@/app/_components/core/antdComponents/CustomButton/CustomButton";
import { DownOutlined } from "@ant-design/icons";
import { FaRegCalendarTimes } from "react-icons/fa";
import CustomDrawer from "@/app/_components/core/antdComponents/CustomDrawer/CustomDrawer";
import AppintmentDrawerContent from "@/app/_components/pages/admin/calender/drawers/Appintment/AppintmentDrawerContent";
import BlockedTimeDrawerContent from "@/app/_components/pages/admin/calender/drawers/BlockedTime/BlockedTimeDrawerContent";
import {
  MdCalendarViewWeek,
  MdOutlineCalendarMonth,
  MdOutlineViewDay,
  MdOutlineViewWeek,
} from "react-icons/md";
import CustomSelect from "@/app/_components/core/antdComponents/CustomSelect/CustomSelect";
import { useGetAppointments } from "./_api/calender";
import {
  AppointmentsRecord,
  GetAppointmentsResult,
} from "./_api/calender.types";
import CalenderCard from "@/app/_components/pages/admin/calender/CalenderCards/CalenderCards";
import { useServicesList } from "../catalog/_api/catalog";
import { ServicesListResult } from "../catalog/_api/catalog.types";

type ServiceItem = {
  id: number;
  title: string;
};

function toSolarHijri(date: Date) {
  const formatter = new Intl.DateTimeFormat("en-US-u-ca-persian", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const parts = formatter.formatToParts(date);
  const year = parts.find((p) => p.type === "year")?.value;
  const month = parts.find((p) => p.type === "month")?.value;
  const day = parts.find((p) => p.type === "day")?.value;

  return `${year}.${month}.${day}`;
}

// Helper: add days to a date
function addDays(date: Date, days: number) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

// Helper: add months to a date
function addMonths(date: Date, months: number) {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
}

const Calender = () => {
  const [data, setDatesList] = useState<AppointmentsRecord | null>(null);

  const [workersList, setWorkersList] = useState<
    { id: number; title: string }[]
  >([]);

  const [appointmentDrawerOpen, setAppointmentDrawerOpen] = useState(false);
  const [blockedTimeDrawerOpen, setBlockedTimeDrawerOpen] = useState(false);

  const [servicesList, setServicesList] = useState<ServiceItem[]>([]);
  //Filter
  // date
  const [filterDate, setFilterDate] = useState("");

  // worker
  const [filterWorker, setFilterWorker] = useState(null);

  // service
  const [filterService, setFilterService] = useState(null);

  const { mutate: getWorkersList, isPending: isGetWorkersListLoading } =
    useWorkersList({
      onSuccess: WorkersListOnSuccess,
    });

  const { mutate: getAppointments, isPending: isGetAppointmentsLoading } =
    useGetAppointments({
      onSuccess: AppointmentsOnSuccess,
    });

  const { mutate: getServicesList, isPending: isGetServicesListLoading } =
    useServicesList({
      onSuccess: ServicesListOnSuccess,
    });

  useEffect(() => {
    const today = new Date();
    if (filterDate) {
      getAppointments({
        salon_id: 1002,
        type: 0,
        date_start: toSolarHijri(today),
        date_end: filterDate,
        ...(filterService ? { service_name: filterService } : {}),
      });
    } else {
      getAppointments({
        salon_id: 1002,
        type: 0,
        date_start: toSolarHijri(today),
        date_end: toSolarHijri(addMonths(today, 1)),
        ...(filterService ? { service_name: filterService } : {}),
      });
    }
  }, [filterDate, filterWorker, filterService]);

  useEffect(() => {
    getWorkersList({
      owner_user_id: 8,
      salon_id: 1002,
    });

    getServicesList({
      salon_id: 1002,
    });
  }, []);

  function AppointmentsOnSuccess(res: GetAppointmentsResult) {
    setDatesList(res?.by_date);
  }

  function WorkersListOnSuccess(res: WorkersListResult) {
    setWorkersList(
      res?.data?.map((item) => ({
        id: item.ID,
        title: `${item.fname} ${item.lname}`,
      }))
    );
  }

  function ServicesListOnSuccess(res: ServicesListResult) {
    const services = Object.values(
      res?.data.reduce<Record<string, ServiceItem>>((acc, item) => {
        const key = `${item.service_id}-${item.service_title}`; // unique key

        if (!acc[key]) {
          acc[key] = {
            id: item.service_id,
            title: item.service_title,
          };
        }
        return acc;
      }, {})
    );

    setServicesList(services);
  }

  // Modals
  // Appointment
  const openAppoinmentDrawerHandler = () => {
    setAppointmentDrawerOpen(true);
  };
  const closeAppoinmentDrawerHandler = () => {
    setAppointmentDrawerOpen(false);
  };

  // Blocked time
  const openBlockedTimeDrawerHandler = () => {
    setBlockedTimeDrawerOpen(true);
  };
  const closeBlockedTimeDrawerHandler = () => {
    setBlockedTimeDrawerOpen(false);
  };

  const items = [
    {
      key: "1",
      label: (
        <span
          style={{ display: "flex", alignItems: "center", gap: 8 }}
          onClick={openAppoinmentDrawerHandler}
        >
          <AiOutlineCalendar size={18} />
          نوبت دهی
        </span>
      ),
    },
    {
      key: "2",
      label: (
        <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <FiUsers size={18} />
          نوبت دهی گروهی
        </span>
      ),
    },
    {
      key: "3",
      label: (
        <span
          style={{ display: "flex", alignItems: "center", gap: 8 }}
          onClick={openBlockedTimeDrawerHandler}
        >
          <FaRegCalendarTimes size={18} />
          زمان بلاکی
        </span>
      ),
    },
    {
      key: "4",
      label: (
        <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <FiTag size={18} />
          فروش
        </span>
      ),
    },
    {
      key: "5",
      label: (
        <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <GiTwoCoins size={18} />
          پرداخت سریع
        </span>
      ),
    },
  ];

  const filterTimeHandler = (value: number, type: string) => {
    const today = new Date();
    if (type === "day") {
      if (value === 1) {
        setFilterDate(toSolarHijri(today));
      } else {
        setFilterDate(toSolarHijri(addDays(today, value)));
      }
    }
    if (type === "month") {
      setFilterDate(toSolarHijri(addMonths(today, 1)));
    }
  };

  const filterItems = [
    {
      key: "1",
      label: (
        <span
          style={{ display: "flex", alignItems: "center", gap: 8 }}
          onClick={() => filterTimeHandler(1, "day")}
        >
          <MdOutlineViewDay size={18} />
          روز
        </span>
      ),
    },
    {
      key: "2",
      label: (
        <span
          style={{ display: "flex", alignItems: "center", gap: 8 }}
          onClick={() => filterTimeHandler(2, "day")}
        >
          <MdOutlineViewWeek size={18} />3 روز
        </span>
      ),
    },
    {
      key: "3",
      label: (
        <span
          style={{ display: "flex", alignItems: "center", gap: 8 }}
          onClick={() => filterTimeHandler(6, "day")}
        >
          <MdCalendarViewWeek size={18} />
          هفتگی
        </span>
      ),
    },
    {
      key: "4",
      label: (
        <span
          style={{ display: "flex", alignItems: "center", gap: 8 }}
          onClick={() => filterTimeHandler(1, "month")}
        >
          <MdOutlineCalendarMonth size={18} />
          ماهانه
        </span>
      ),
    },
  ];

  const filterByWorkerHandler = (value: any) => {
    console.log(value);
  };

  const filterByServiceHandler = (value: any) => {
    setFilterService(value?.label);
  };

  return (
    <>
      <div className="p-8">
        <div className="flex gap-2">
          <CustomSelect
            placeholder="فیلتر متخصص"
            options={workersList}
            name="workerList"
            onChange={(_, value) => filterByWorkerHandler(value)}
          />
          <CustomSelect
            placeholder="فیلتر سرویس"
            options={servicesList}
            name="servicesList"
            onChange={(_, value) => filterByServiceHandler(value)}
          />
          <Dropdown menu={{ items: filterItems }} trigger={["click"]}>
            <CustomButton>
              <Space>
                فیلتر زمان
                <DownOutlined />
              </Space>
            </CustomButton>
          </Dropdown>
          <Dropdown menu={{ items }} trigger={["click"]}>
            <CustomButton>
              <Space>
                گزینه‌ها
                <DownOutlined />
              </Space>
            </CustomButton>
          </Dropdown>
        </div>
        <CalenderCard data={data} />
      </div>

      {appointmentDrawerOpen && (
        <CustomDrawer
          open={appointmentDrawerOpen}
          onClose={closeAppoinmentDrawerHandler}
          width="50%"
        >
          <AppintmentDrawerContent />
        </CustomDrawer>
      )}
      {blockedTimeDrawerOpen && (
        <CustomDrawer
          open={blockedTimeDrawerOpen}
          onClose={closeBlockedTimeDrawerHandler}
          width="50%"
        >
          <BlockedTimeDrawerContent />
        </CustomDrawer>
      )}
    </>
  );
};

export default Calender;
