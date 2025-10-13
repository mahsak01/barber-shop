"use client";
import CustomCalendar from "@/app/_components/core/antdComponents/CustomCalendar/CustomCalendar";
import { useEffect, useState } from "react";
import { CalendarProps } from "antd";
import moment from "moment";
import momentj from "jalali-moment";
import dayjs, { Dayjs } from "dayjs";

// Utility function to map the backend data to the calendar cell data
const mapCalendarData = (calendarData: CalendarAbsence) => {
  const mappedData: Record<string, CalendarPresenceAbsenceResponseData> = {};
  calendarData.forEach((item) => {
    const formattedDate = dayjs(item?.date).format("YYYY-MM-DD");
    // mappedData[formattedDate] = item?.AssociationPresenceAbsence_title;
    mappedData[formattedDate] = item;
  });
  return mappedData;
};

// Utility to get the list of events for a specific day
const getListDataFromApi = (
  value: Dayjs,
  mappedData: Record<string, CalendarPresenceAbsenceResponseData>
) => {
  const formattedDate = value.format("YYYY-MM-DD");
  return mappedData[formattedDate] || [];
};

const Calender = () => {
  const [mappedData, setMappedData] = useState<
    Record<string, CalendarPresenceAbsenceResponseData>
  >({});
  const [drawerOpen, setIsDrawerOpen] = useState<{
    isOpen: boolean;
    id: number;
    date: string;
  }>({
    isOpen: false,
    id: -1,
    date: "",
  });

  //   const {
  //     params: { id },
  //   } = useQueryParams();

  //? ================================  Api Calls ================================
  //   const [getAllCalendarInfo, { isFetching: isGetAllCalendarInfoLoading }] =
  //     useLazyGetCalendarPresenceAbsenceQuery();

  //? ================================ Effects ================================
  //   useEffect(() => {
  //     getCalendarInitData();
  //   }, []);

  //* ================================ Util Functions ================================
  const getCalendarInitData = (date?: string) => {
    const targetDate = date
      ? momentj.from(date, "fa", "YYYY-MM-DD").format("YYYY-MM-DD")
      : moment().format("YYYY-MM-DD");

    onCalendarChanges(targetDate);
  };

  // success
  const onCalendarChanges = (date: moment.MomentInput) => {
    // if (id && date) {
    //   getAllCalendarInfo({
    //     id: +id,
    //     date: [
    //       moment(date).subtract(41, "days").format("YYYY-MM-DD"),
    //       moment(date).add(41, "days").format("YYYY-MM-DD"),
    //     ],
    //   })
    //     .unwrap()
    //     .then(getAllCalendarInfoIsSuccess);
    // }
  };
  //   const getAllCalendarInfoIsSuccess = (
  //     value: GetCalendarPresenceAbsenceResponse
  //   ) => {
  //     if (value?.status === 200) {
  //       const mapped = mapCalendarData(value?.data);
  //       setMappedData(mapped);
  //     }
  //   };

  // dateCellRender
  const dateCellRender = (value: Dayjs) => {
    const data = getListDataFromApi(value, mappedData);

    const { AssociationPresenceAbsence_title, id } = data;

    const onCellClick = () => {
      setIsDrawerOpen({ isOpen: true, id, date: value.format("YYYY-MM-DD") });
    };

    if (AssociationPresenceAbsence_title === "مرخصي") {
      return (
        <div className="habitants-Leave-wrapper" onClick={onCellClick}>
          <span className="Leave">مرخصی</span>
          {/* <CustomSingleBadge status="warning" text="" /> */}
        </div>
      );
    }
    if (AssociationPresenceAbsence_title === "حاضر") {
      return (
        <div className="habitants-presence-wrapper" onClick={onCellClick}>
          <span className="presence">حاضر</span>
          {/* <CustomSingleBadge status="success" text="" /> */}
        </div>
      );
    }
    if (AssociationPresenceAbsence_title === "غايب") {
      return (
        <div className="habitants-absence-wrapper" onClick={onCellClick}>
          <span className="absence">غايب</span>
          {/* <CustomSingleBadge status="error" text="" /> */}
        </div>
      );
    }
    if (AssociationPresenceAbsence_title === "ثبت نشده") {
      return (
        <div
          className="habitants-not-register-wrapper"
          onClick={onCellClick}
        ></div>
      );
    }
  };

  // cellRenderer
  const cellRenderer: CalendarProps<Dayjs>["cellRender"] = (current, info) => {
    if (info.type === "date") return dateCellRender(current);
    // Todo[saman]: month cells are not needed on project yet!
    // if (info.type === "month") return monthCellRender(current);
    return info.originNode;
  };

  // drawer handler

  return (
    <div className="p-8">
      <CustomCalendar
        name="calendar"
        mode="month"
        isYearSelectorDisabled={true}
        //   isLoading={isGetAllCalendarInfoLoading}
        cellRender={cellRenderer}
      />
    </div>
  );
};

export default Calender;
