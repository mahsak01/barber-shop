import { AppointmentsRecord } from "@/app/(pages)/admin/calender/_api/calender.types";
import { Tooltip } from "antd";
import React from "react";
import { GiMoneyStack } from "react-icons/gi";
import { IoTimeOutline } from "react-icons/io5";
import { MdOutlineMiscellaneousServices } from "react-icons/md";
import { RxAvatar } from "react-icons/rx";

const CalenderCards = ({ data }: { data: AppointmentsRecord | null }) => {
  if (!data) return;

  const dates = Object.keys(data);
  return (
    <div className="p-4 grid grid-cols-2 md:grid-cols-4 gap-4">
      {dates.map((dateKey) => {
        const day = data[dateKey];

        return (
          <div key={dateKey} className=" shadow-md p-2 flex flex-col gap-3">
            {/* DATE HEADER */}

            <h2 className="text-md font-bold flex justify-between">
              <span>{day.weekday}</span>

              <span>{day.date}</span>
            </h2>

            {/* TURNS INSIDE THE DATE */}
            <div className="rounded-md p-1 ">
              {day.turns.map((turn) => (
                <Tooltip
                  title={
                    <div>
                      {/* HEADER */}
                      <div className="flex justify-between  ">
                        <span className="bg-primary text-neutral-50 rounded-md px-2">
                          {"status"}
                        </span>
                        <p className="font-semibold text-neutral-400">
                          {turn.end_time?.slice(0, 5)}-{" "}
                          {turn.start_time?.slice(0, 5)}
                        </p>
                      </div>

                      {/* CONTENT */}
                      <div className="p-4">
                        {/* ICON + TITLE */}
                        <div className="flex items-center gap-2 mb-3  ">
                          <RxAvatar color="#3d3d3d" size={18} />
                          <span className="text-lg font-semibold text-neutral-11">
                            {turn?.worker?.fname} {turn?.worker?.lname}
                          </span>
                        </div>

                        {/* SERVICE + PRICE */}
                        <div>
                          <div className="flex gap-1 items-center text-neutral-400">
                            <MdOutlineMiscellaneousServices color="#989898" />
                            <p className="font-semibold ">
                              {turn?.service?.category} - {turn?.service?.name}
                            </p>
                          </div>

                          <div className="flex gap-1 items-center text-neutral-800">
                            <GiMoneyStack className="font-semibold" />
                            <p className="font-semibold">{turn?.price}</p>
                          </div>
                          <div className="flex gap-1 items-center text-neutral-400">
                            <IoTimeOutline />
                            <p className="font-semibold">
                              {turn?.service?.duration}
                            </p>
                          </div>
                        </div>

                        <hr className="my-4 border border-neutral-400" />

                        <p className="text-xs text-neutral-400">
                          {turn?.customer?.fname} {turn?.customer?.lname}
                        </p>
                      </div>
                    </div>
                  }
                  color={"white"}
                  key={turn.turn_id}
                >
                  <div
                    className="flex justify-between px-2 rounded-md"
                    style={{ backgroundColor: turn?.worker?.color }}
                  >
                    <p className="font-semibold">
                      {turn.start_time?.slice(0, 5)} -{" "}
                      {turn.end_time?.slice(0, 5)}
                    </p>
                    <p>
                      {turn.customer.fname} {turn.customer.lname}
                    </p>
                  </div>
                </Tooltip>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CalenderCards;
