import { useDashbordList } from "@/app/(pages)/admin/_api/admin";
import CustomButton from "@/app/_components/core/antdComponents/CustomButton/CustomButton";
import { Dropdown } from "antd";
import React, { useEffect, useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { IoMdTime } from "react-icons/io";
import { IoStatsChart } from "react-icons/io5";
import { MdCalendarViewWeek, MdOutlineCalendarMonth } from "react-icons/md";

const appointments = [
  {
    day: "18",
    month: "Oct",
    dateText: "Sat, 18 Oct 2025 10:15",
    status: "Booked",
    service: "Hair Color",
    details: "Walk-In, 1h 15min with Atefeh",
  },
  {
    day: "17",
    month: "Oct",
    dateText: "Fri, 17 Oct 2025 10:00",
    status: "Booked",
    service: "Haircut",
    details: "Walk-In, 45min with Atefeh",
  },
];

const LogActivity = () => {
  const [dashbordList, setDashbordList] = useState(null);

  const [selectDayCount, setSelectDayCount] = useState(7);

  const { mutate: getDashbordList, isPending: isGetDashbordListLoading } =
    useDashbordList({
      onSuccess: DashbordListOnSuccess,
    });

  function DashbordListOnSuccess(res: any) {
    console.log(res);
  }

  useEffect(() => {
    getDashbordList({
      salon_id: 1002,
      count_days: selectDayCount,
      type: 2, // لاگ اکتیویتی
    });
  }, [selectDayCount]);

  const filterItems = [
    {
      key: "1",
      label: (
        <span
          style={{ display: "flex", alignItems: "center", gap: 8 }}
          onClick={() => setSelectDayCount(7)}
        >
          <MdCalendarViewWeek size={18} />7 روز
        </span>
      ),
    },
    {
      key: "2",
      label: (
        <span
          style={{ display: "flex", alignItems: "center", gap: 8 }}
          onClick={() => setSelectDayCount(30)}
        >
          <MdOutlineCalendarMonth size={18} />
          30 روز
        </span>
      ),
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow p-4 flex flex-col">
      <div className="flex justify-between">
        <h2 className="font-semibold mb-2">عملیات هفت روز اخیر</h2>
        <Dropdown
          menu={{ items: filterItems }}
          trigger={["click"]}
          className="bg-white border-white"
        >
          <CustomButton>
            <HiDotsVertical size={20} />
          </CustomButton>
        </Dropdown>
      </div>
      <div className="flex flex-col items-center justify-center  gap-4 text-center ">
        {dashbordList ? (
          <>
            <IoStatsChart size={40} />
            <p className="font-semibold">اکشنی برای هفت روز اخیر وجود ندارد</p>
          </>
        ) : (
          <div className=" w-full">
            {appointments.map((a, index) => (
              <>
                <div key={index} className="flex gap-4 p-4">
                  {/* Date */}
                  <div className="text-center w-12">
                    <div className="text-xl font-semibold text-gray-900">
                      {a.day}
                    </div>
                    <div className="text-sm text-gray-500">{a.month}</div>
                  </div>

                  {/* Details */}
                  <div className=" ">
                    <div className="flex   gap-2 text-sm text-gray-500">
                      <span>{a.dateText}</span>
                      <span className="bg-blue-100 text-blue-700 text-xs font-medium px-2 py-0.5 rounded-full">
                        {a.status}
                      </span>
                    </div>
                    <div className="text-gray-900 font-semibold mt-1">
                      {a.service}
                    </div>
                    <div className="text-gray-500 text-sm">{a.details}</div>
                  </div>
                </div>
                <hr className="border-neutral-200" />
              </>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LogActivity;
