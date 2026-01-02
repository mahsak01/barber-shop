"use client";
import { useEffect, useState } from "react";
import {
  useAddReserveTimeToBasket,
  useSideDates,
  useTimeSlotBySalonServiceWorkerDateId,
} from "./_api/selectTime";
import {
  AddReserveTimeToBasketResult,
  SideDatesResult,
  SideDatesTypes,
  TimeSlotBySalonServiceWorkerDateIdResult,
} from "./_api/selectTime.types";
import { useRouter, useSearchParams } from "next/navigation";
import CustomButton from "@/app/_components/core/antdComponents/CustomButton/CustomButton";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";

const SelectTime = () => {
  const [sideDates, setSideDates] = useState<SideDatesTypes[]>([]);
  const [selectedDay, setSelectedDay] = useState({
    date: "0",
    month: "",
    year: "",
  });

  const [data, setData] =
    useState<TimeSlotBySalonServiceWorkerDateIdResult | null>(null);

  const [selectSlot, setSelectSlot] = useState({ start: "", end: "" });

  const searchParams = useSearchParams();
  const queryParams = Object.fromEntries(searchParams.entries());

  const router = useRouter();

  const { mutate: getSideDates, isPending: isGetSideDatesLoading } =
    useSideDates({
      onSuccess: SideDatesOnSuccess,
    });

  const {
    mutate: getTimeSlotBySalonServiceWorkerDateId,
    isPending: isGetTimeSlotBySalonServiceWorkerDateIdLoading,
  } = useTimeSlotBySalonServiceWorkerDateId({
    onSuccess: timeSlotBySalonServiceWorkerDateIdOnSuccess,
  });

  const {
    mutate: addReserveTimeToBasket,
    isPending: isAddReserveTimeToBasketLoading,
  } = useAddReserveTimeToBasket({
    onSuccess: AddReserveTimeToBasketOnSuccess,
  });

  useEffect(() => {
    getSideDates({
      date: "1404.08.10",
      fd_type: "1",
      after: "10",
      before: "6",
      salon_id: "1001",
      service_id: "3",
      worker_id: "6",
    });
  }, []);

  useEffect(() => {
    getSlotList();
  }, [selectedDay.date]);

  function SideDatesOnSuccess(res: SideDatesResult) {
    setSideDates(res?.side_dates);
    setSelectedDay({
      date: res?.side_dates?.[0]?.date,
      month: res?.side_dates?.[0]?.month,
      year: res?.side_dates?.[0]?.year,
    });
  }

  function timeSlotBySalonServiceWorkerDateIdOnSuccess(
    res: TimeSlotBySalonServiceWorkerDateIdResult
  ) {
    setData(res);
  }

  function AddReserveTimeToBasketOnSuccess(res: AddReserveTimeToBasketResult) {
    getSlotList();
    setSelectSlot({ start: "", end: "" });
  }

  const getSlotList = () => {
    getTimeSlotBySalonServiceWorkerDateId({
      salon_id: queryParams?.salonId,
      date: selectedDay?.date,
      service_id: queryParams?.serviceId,
      worker_id: queryParams?.workerId,
    });
  };

  const addSlotTobasket = (start: string, end: string) => {
    setSelectSlot({ start, end });
  };

  const goToSelectWorkerPage = () => {
    router.push(
      `/select-worker?salonId=${queryParams?.salonId}&serviceId=${queryParams?.serviceId}`
    );
  };

  const completeReservtion = () => {
    addReserveTimeToBasket({
      customer_id: "4",
      date: selectedDay?.date,
      salon_id: queryParams?.salonId,
      service_id: queryParams?.serviceId,
      worker_id: queryParams?.workerId,
      start_time: selectSlot?.start,
      end_time: selectSlot?.end,
    });
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">انتخاب زمان</h2>
      <h2 className="text-lg font-semibold mb-4">
        {selectedDay?.month} {selectedDay?.year}
      </h2>

      {/* Days Row */}
      <div className="flex justify-between gap-2 w-full overflow-x-scroll  mb-6">
        {sideDates.map((d) => (
          <button
            key={d.date}
            onClick={() =>
              d.is_available &&
              setSelectedDay({
                date: d.date,
                month: d.month,
                year: d.year,
              })
            }
            className={`flex flex-col items-center w-12 h-12 rounded-full justify-center border border-neutral-200
              ${d.is_available ? "cursor-pointer" : "opacity-40 bg-neutral-400 cursor-not-allowed"} 
              ${selectedDay?.date === d.date && d.is_available ? "bg-blue-400 text-neutral-50" : "bg-neutral-50 text-gray-700"}`}
          >
            <span
              className={
                d.is_available
                  ? "text-sm font-semibold"
                  : " text-sm font-semibold line-through"
              }
            >
              {d.day}
            </span>
            <span
              className={
                d.is_available ? "text-[10px]" : "text-[10px] line-through"
              }
            >
              {d.weekday}
            </span>
          </button>
        ))}
      </div>

      <div className="flex justify-between mb-6">
        <CustomButton
          type="primary"
          icon={<FaArrowRightLong />}
          onClick={completeReservtion}
        >
          تکمیل رزرو
        </CustomButton>
        <CustomButton
          icon={<FaArrowLeftLong />}
          iconPosition="end"
          onClick={goToSelectWorkerPage}
        >
          بازگشت
        </CustomButton>
      </div>

      {/* Time Slots */}
      <div className="space-y-3">
        {data?.slots?.map((slot, i) => (
          <div
            key={i}
            className={`${selectSlot?.start === slot?.start_time ? "bg-success-400" : ""} ${!slot?.is_available ? "opacity-40 bg-neutral-200" : "cursor-pointer"} w-full  flex justify-between items-center px-4 py-3 border border-neutral-200 rounded-xl text-left`}
            onClick={() =>
              slot?.is_available &&
              addSlotTobasket(slot.start_time, slot.end_time)
            }
          >
            <div>
              <span className="text-gray-800 font-medium">
                {slot?.end_time}
              </span>
              {" - "}
              <span className="text-gray-800 font-medium">
                {slot?.start_time}
              </span>
            </div>
            <span className="text-gray-600 text-sm">
              از {data?.price} هزار تومان
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectTime;
