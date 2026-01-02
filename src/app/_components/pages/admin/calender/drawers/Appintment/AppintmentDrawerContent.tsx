import { useTimeSlotBySalonServiceWorkerDateId } from "@/app/(pages)/(app)/select-time/_api/selectTime";
import { TimeSlotBySalonServiceWorkerDateIdResult } from "@/app/(pages)/(app)/select-time/_api/selectTime.types";
import { useWorkersList } from "@/app/(pages)/admin/workers/_api/workersList";
import { WorkersListResult } from "@/app/(pages)/admin/workers/_api/workersList.types";
import CustomDatePicker from "@/app/_components/core/antdComponents/CustomDatePicker/CustomDatePicker";
import CustomSelect from "@/app/_components/core/antdComponents/CustomSelect/CustomSelect";
import { Col, Form, Row } from "antd";
import React, { useEffect, useState } from "react";

const AppintmentDrawerContent = () => {
  const [workersList, setWorkersList] = useState<
    { id: number; title: string }[]
  >([]);

  const [data, setData] =
    useState<TimeSlotBySalonServiceWorkerDateIdResult | null>(null);

  const [selectSlot, setSelectSlot] = useState({ start: "", end: "" });

  const [form] = Form.useForm();

  const { mutate: getWorkersList, isPending: isGetWorkersListLoading } =
    useWorkersList({
      onSuccess: WorkersListOnSuccess,
    });

  const {
    mutate: getTimeSlotBySalonServiceWorkerDateId,
    isPending: isGetTimeSlotBySalonServiceWorkerDateIdLoading,
  } = useTimeSlotBySalonServiceWorkerDateId({
    onSuccess: timeSlotBySalonServiceWorkerDateIdOnSuccess,
  });

  useEffect(() => {
    getWorkersList({
      owner_user_id: 8,
      salon_id: 1002,
    });
  }, []);

  function WorkersListOnSuccess(res: WorkersListResult) {
    setWorkersList(
      res?.data?.map((item) => ({
        id: item?.ID,
        title: `${item?.fname} ${item?.lname}`,
      }))
    );
  }

  function timeSlotBySalonServiceWorkerDateIdOnSuccess(
    res: TimeSlotBySalonServiceWorkerDateIdResult
  ) {
    setData(res);
  }

  const getSlotList = () => {
    getTimeSlotBySalonServiceWorkerDateId({
      salon_id: "1002",
      date: "1404-08-30",
      service_id: "8",
      worker_id: "10",
      fd_type: "0",

      //   salon_id: queryParams?.salonId,
      //   date: selectedDay?.date,
      //   service_id: queryParams?.serviceId,
      //   worker_id: queryParams?.workerId,
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold ">انتخاب زمان رزرو</h1>
      <Form layout="vertical" form={form}>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <CustomSelect
              label="سرویس ها"
              placeholder="انتخاب سرویس"
              options={[]}
              name="services"
              form={form}
            />
          </Col>
          <Col span={24}>
            <CustomSelect
              label="متخصص"
              placeholder=""
              options={workersList}
              name="worker"
              form={form}
            />
          </Col>
          <Col span={24}>
            <CustomDatePicker
              label="تاریخ"
              name="jobStartDate"
              // rules={[REQUIRED_RULES()]}
              form={form}
              onChange={(_, localeDate) => {
                // setSelectDate((prev) => ({
                //   ...prev,
                //   start: localeDate as string,
                // }));
                getSlotList();
              }}
            />
          </Col>
          <Col span={24}>
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
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default AppintmentDrawerContent;
