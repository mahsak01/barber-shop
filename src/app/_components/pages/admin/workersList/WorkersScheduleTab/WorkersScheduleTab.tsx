"use client";
import { useWorkersSchedule } from "@/app/(pages)/admin/workers/_api/workersList";
import {
  WorkersScheduleRecordsType,
  WorkersScheduleResult,
} from "@/app/(pages)/admin/workers/_api/workersList.types";
import CustomDatePicker from "@/app/_components/core/antdComponents/CustomDatePicker/CustomDatePicker";
import { Col, Row, Table } from "antd";
import React, { useEffect, useState } from "react";
import WorkersScheduleTableModel from "./models/WorkersScheduleTableModel";

const WorkersScheduleTab = () => {
  const [workersSchedule, setWorkersSchedule] = useState<
    WorkersScheduleRecordsType[]
  >([]);

  const [datesList, setDatesList] = useState<
    {
      weekday: string;
      month: string;
      day: number;
    }[]
  >([]);

  const { mutate: getWorkersSchedule, isPending: isGetWorkersScheduleLoading } =
    useWorkersSchedule({
      onSuccess: WorkersScheduleOnSuccess,
    });

  useEffect(() => {
    getWorkersSchedule({
      owner_user_id: 7,
      salon_id: 1001,
      start_date: "1404.09.08",
      end_date: "1404.09.30",
    });
  }, []);

  function WorkersScheduleOnSuccess(res: WorkersScheduleResult) {
    setWorkersSchedule(res?.data);
    const tempDateList = res?.data?.[0]?.schedule?.map((item) => ({
      weekday: item.weekday,
      month: item.month,
      day: item.day,
    }));

    setDatesList(tempDateList);
  }

  return (
    <div className="p-8 flex flex-col gap-6">
      <Row>
        <Col xs={24} sm={12}>
          <CustomDatePicker name="date" label="انتخاب بازه زمانی" />
        </Col>
      </Row>

      <Table
        columns={WorkersScheduleTableModel({ datesList })}
        dataSource={workersSchedule}
        pagination={false}
        className="rounded-xl shadow-sm"
        scroll={{ x: "max-content" }}
      />

      <div className="bg-blue-100 text-gray-600 p-4 rounded-lg text-sm">
        💡 برنامهٔ تیمی، میزان در دسترس بودن شما را برای رزروها نشان می‌دهد و به
        ساعات کاری استاندارد کسب‌وکار شما متصل نیست. برای تنظیم ساعات کاری
        استاندارد،{" "}
        <a href="#" className="text-purple-600 underline">
          اینجا
        </a>{" "}
        کلیک کنید.
      </div>
    </div>
  );
};

export default WorkersScheduleTab;
