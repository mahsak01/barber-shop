import { useDashbordList } from "@/app/(pages)/admin/_api/admin";
import CustomButton from "@/app/_components/core/antdComponents/CustomButton/CustomButton";
import { Line } from "@ant-design/charts";
import { Dropdown } from "antd";
import React, { useEffect, useState } from "react";
import { BsGraphUpArrow } from "react-icons/bs";
import { HiDotsVertical } from "react-icons/hi";
import { MdCalendarViewWeek, MdOutlineCalendarMonth } from "react-icons/md";

const DashbordHomeTurns = () => {
  const [dashbordList, setDashbordList] = useState<
    | {
        date: string;
        turns_count: number;
        sales_sum: number;
      }[]
    | null
  >(null);

  const [selectDayCount, setSelectDayCount] = useState(7);

  const { mutate: getDashbordList, isPending: isGetDashbordListLoading } =
    useDashbordList({
      onSuccess: DashbordListOnSuccess,
    });

  function DashbordListOnSuccess(res: any) {
    setDashbordList(res?.data?.past_N_days_daily);
  }

  useEffect(() => {
    getDashbordList({
      salon_id: 1002,
      count_days: selectDayCount,
      type: 0, // نوبت
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
        <h2 className="font-semibold mb-2">نوبت های اخیر</h2>
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
          <p className="font-semibold">نوبتی برای هفت روز اخیر ثبت نشده است</p>
        </div>
      ) : (
        <Line
          {...{
            data: dashbordList,
            xField: "date",
            yField: "turns_count",
            point: {
              shapeField: "circle",
              sizeField: 4,
            },
            interaction: {
              tooltip: {
                marker: false,
              },
            },
            style: {
              lineWidth: 2,
            },
          }}
        />
      )}
    </div>
  );
};

export default DashbordHomeTurns;
