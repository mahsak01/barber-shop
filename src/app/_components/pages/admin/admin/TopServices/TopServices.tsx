import { useDashbordList } from "@/app/(pages)/admin/_api/admin";
import CustomButton from "@/app/_components/core/antdComponents/CustomButton/CustomButton";
import { Dropdown } from "antd";
import React, { useEffect, useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import {
  MdCalendarViewWeek,
  MdMiscellaneousServices,
  MdOutlineCalendarMonth,
} from "react-icons/md";

const TopServices = () => {
  const [dashbordList, setDashbordList] = useState<any>(null);

  const [selectDayCount, setSelectDayCount] = useState(7);

  const { mutate: getDashbordList, isPending: isGetDashbordListLoading } =
    useDashbordList({
      onSuccess: DashbordListOnSuccess,
    });

  function DashbordListOnSuccess(res: any) {
    setDashbordList({
      thisMonth: res?.data?.top_services_current_month,
      lastMonth: res?.data?.top_services_last_month,
    });
  }

  useEffect(() => {
    getDashbordList({
      salon_id: 1002,
      count_days: selectDayCount,
      type: 4, // سرویس برتر
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
        <h2 className="font-semibold mb-2">سرویس های برتر</h2>
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
          <MdMiscellaneousServices size={40} />
          <p className="font-semibold">سرویس برتری وجود ندارد</p>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center  gap-4 text-center text-gray-500">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-300">
                <th className="font-semibold py-2">سرویس</th>
                <th className="font-semibold py-2">ماه جاری</th>
                <th className="font-semibold py-2">ماه گذشته</th>
              </tr>
            </thead>
            <tbody>
              {dashbordList?.thisMonth?.map((item, index) => (
                <tr className="border-b border-gray-200">
                  <td className="py-2">{item?.service_name}</td>
                  <td className="py-2">{item?.reservations}</td>
                  <td className="py-2">
                    {dashbordList?.lastMonth?.[index]?.reservations || "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TopServices;
