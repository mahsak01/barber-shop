import { useDashbordList } from "@/app/(pages)/admin/_api/admin";
import CustomButton from "@/app/_components/core/antdComponents/CustomButton/CustomButton";
import { Dropdown } from "antd";
import React, { useEffect, useState } from "react";
import { BsGraphUpArrow } from "react-icons/bs";
import { GiPodiumWinner } from "react-icons/gi";
import { HiDotsVertical } from "react-icons/hi";
import { MdCalendarViewWeek, MdOutlineCalendarMonth } from "react-icons/md";

const TopWorker = () => {
  const [dashbordList, setDashbordList] = useState<any>(null);

  const [selectDayCount, setSelectDayCount] = useState(7);

  const { mutate: getDashbordList, isPending: isGetDashbordListLoading } =
    useDashbordList({
      onSuccess: DashbordListOnSuccess,
    });

  function DashbordListOnSuccess(res: any) {
    console.log(res);
    // setDashbordList({
    //   thisMonth: res?.data?.top_services_current_month,
    //   lastMonth: res?.data?.top_services_last_month,
    // });
  }

  useEffect(() => {
    getDashbordList({
      salon_id: 1002,
      count_days: selectDayCount,
      type: 5, // عضو برتر
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
        <h2 className="font-semibold mb-2">برترین عضو</h2>
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
      {!dashbordList ? (
        <div className="flex flex-col items-center justify-center  gap-4 text-center text-gray-500">
          <BsGraphUpArrow size={40} />
          <p className="font-semibold">این ماه فروشی وجود ندارد.</p>
          <p className="text-sm">
            برای نمایش داده‌های برنامه، چند شیفت ثبت کنید.
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center  gap-4 text-center text-gray-500">
          <GiPodiumWinner size={50} style={{ color: "purple" }} />
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-300">
                <th className="font-semibold py-2">نام</th>
                <th className="font-semibold py-2">مقدار فروش هفتگی </th>
                <th className="font-semibold py-2">تعداد مشتری</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200">
                <td className="py-2">زهرا علوی</td>
                <td className="py-2">2</td>
                <td className="py-2">0</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-2">مینا علوی</td>
                <td className="py-2">1</td>
                <td className="py-2">0</td>
              </tr>
              <tr className="bg-gray-100">
                <td className="py-2">مبینا یوسفی</td>
                <td className="py-2">1</td>
                <td className="py-2">0</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TopWorker;
