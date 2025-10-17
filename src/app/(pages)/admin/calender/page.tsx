"use client";
import CustomCalendar from "@/app/_components/core/antdComponents/CustomCalendar/CustomCalendar";
import { useEffect, useState } from "react";
import { CalendarProps } from "antd";
import moment from "moment";
import { Dayjs } from "dayjs";
import { useWorkersSchedule } from "../workers/_api/workersList";
import {
  WorkersScheduleDataType,
  WorkersScheduleDataTypeWhitFLName,
  WorkersScheduleRecordsType,
  WorkersScheduleResult,
} from "../workers/_api/workersList.types";
import CalenderCellDrawers from "@/app/_components/pages/admin/calender/drawers/CalenderCell/CalenderCellDrawers";

const workerColors: Record<string, string> = {};

function getWorkerColor(name: string) {
  if (!workerColors[name]) {
    workerColors[name] =
      `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }
  return workerColors[name];
}

const Calender = () => {
  const [mappedData, setMappedData] = useState<WorkersScheduleRecordsType[]>(
    []
  );

  const [drawerOpen, setIsDrawerOpen] = useState<{
    isOpen: boolean;
    data: null | {};
  }>({
    isOpen: false,
    data: null,
  });

  const { mutate: getWorkersSchedule, isPending: isGetWorkersScheduleLoading } =
    useWorkersSchedule({
      onSuccess: WorkersScheduleOnSuccess,
    });

  useEffect(() => {
    getWorkersSchedule({
      owner_user_id: 7,
      salon_id: 1001,
      start_date: "1404.07.25",
      end_date: "1404.07.30",
    });
  }, []);

  function WorkersScheduleOnSuccess(res: WorkersScheduleResult) {
    setMappedData(res?.data);
    const tempDateList = res?.data?.[0]?.schedule?.map((item) => ({
      weekday: item.weekday,
      month: item.month,
      day: item.day,
    }));

    // setDatesList(tempDateList);
  }

  const closeDrawerHandler = () => {
    setIsDrawerOpen({ isOpen: false, data: null });
  };

  // success
  const onCalendarChanges = (date: moment.MomentInput) => {};

  // dateCellRender
  const dateCellRender = (value: Dayjs) => {
    const currentDate = value.format("YYYY.MM.DD");

    const transformData = mappedData?.map((item) => {
      return {
        ...item,
        schedule: item?.schedule?.map((s) => ({
          ...s,
          fname: item.fname,
          lname: item.lname,
        })),
      };
    });

    const tempDates = transformData?.map((item) => item.schedule);

    const daySchedules = tempDates?.flat().filter((item) => {
      return item?.date_j === currentDate;
    });

    if (daySchedules.length === 0) return null;

    const onCellClick = (schedule: WorkersScheduleDataTypeWhitFLName[]) => {
      setIsDrawerOpen({
        isOpen: true,
        data: schedule,
      });
    };

    return (
      <ul
        className="list-none flex flex-col gap-1"
        onClick={() => onCellClick(daySchedules)}
      >
        {daySchedules.map((schedule, idx) => {
          const color = getWorkerColor(`${schedule.fname} ${schedule.lname}`);
          return (
            <li key={idx}>
              <div className="flex flex-col gap-1">
                {schedule.shifts.map((shift, i) => {
                  return (
                    <div
                      className={`bg-info-200 rounded-md py-1 text-center `}
                      style={{ backgroundColor: color }}
                      key={i}
                    >
                      {shift.start.slice(0, 5)} - {shift.end.slice(0, 5)}
                    </div>
                  );
                })}
              </div>
            </li>
          );
        })}
      </ul>
    );
  };

  // cellRenderer
  const cellRenderer: CalendarProps<Dayjs>["cellRender"] = (current, info) => {
    if (info.type === "date") return dateCellRender(current);

    return info.originNode;
  };

  return (
    <>
      <div className="p-8">
        <CustomCalendar
          name="calendar"
          mode="month"
          isYearSelectorDisabled={true}
          //   isLoading={isGetAllCalendarInfoLoading}
          cellRender={cellRenderer}
        />
      </div>
      <CalenderCellDrawers
        closeDrawerHandler={closeDrawerHandler}
        drawerOpen={drawerOpen}
      />
    </>
  );
};

export default Calender;
