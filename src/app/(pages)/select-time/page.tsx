"use client";
import { useEffect, useState } from "react";
import { useTimeSlotBySalonServiceWorkerDateId } from "./_api/selectTime";
import { TimeSlotBySalonServiceWorkerDateIdResult } from "./_api/selectTime.types";

const days = [
  { id: 11, day: "Thu", active: true },
  { id: 12, day: "Fri", active: true },
  { id: 13, day: "Sat", active: true },
  { id: 14, day: "Sun", active: false },
  { id: 15, day: "Mon", active: false },
  { id: 16, day: "Tue", active: true },
  { id: 17, day: "Wed", active: true },
];

const SelectTime = () => {
  const [selectedDay, setSelectedDay] = useState(11);

  const [data, setData] =
    useState<TimeSlotBySalonServiceWorkerDateIdResult | null>(null);

  const {
    mutate: getTimeSlotBySalonServiceWorkerDateId,
    isPending: isGetTimeSlotBySalonServiceWorkerDateIdLoading,
  } = useTimeSlotBySalonServiceWorkerDateId({
    onSuccess: timeSlotBySalonServiceWorkerDateIdOnSuccess,
  });

  useEffect(() => {
    getTimeSlotBySalonServiceWorkerDateId({
      salon_id: "1000",
      date: "1404.06.16",
      service_id: "3",
      worker_id: "5",
    });
  }, []);

  function timeSlotBySalonServiceWorkerDateIdOnSuccess(
    res: TimeSlotBySalonServiceWorkerDateIdResult
  ) {
    setData(res);
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">انتخاب زمان</h2>
      <h2 className="text-lg font-semibold mb-4">آذر 1404</h2>

      {/* Days Row */}
      <div className="flex justify-between mb-6">
        {days.map((d) => (
          <button
            key={d.id}
            onClick={() => d.active && setSelectedDay(d.id)}
            className={`flex flex-col items-center w-12 h-12 rounded-full justify-center border border-neutral-200
              ${d.active ? "cursor-pointer" : "opacity-40 bg-neutral-400 cursor-not-allowed"} 
              ${selectedDay === d.id && d.active ? "bg-blue-400 text-neutral-50" : "bg-neutral-50 text-gray-700"}`}
          >
            <span
              className={
                d.active
                  ? "text-sm font-semibold"
                  : " text-sm font-semibold line-through"
              }
            >
              {d.id}
            </span>
            <span className={d.active ? "text-xs" : "text-xs line-through"}>
              {d.day}
            </span>
          </button>
        ))}
      </div>

      {/* Time Slots */}
      <div className="space-y-3">
        {data?.slots.map((slot, i) => (
          <div
            key={i}
            className="w-full cursor-pointer flex justify-between items-center px-4 py-3 border border-neutral-200 rounded-xl text-left"
          >
            <div>
              <span className="text-gray-800 font-medium">
                {slot?.start_time}
              </span>
              {" - "}
              <span className="text-gray-800 font-medium">
                {slot?.end_time}
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
