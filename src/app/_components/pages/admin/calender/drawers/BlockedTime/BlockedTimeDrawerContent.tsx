import { useWorkersList } from "@/app/(pages)/admin/workers/_api/workersList";
import { WorkersListResult } from "@/app/(pages)/admin/workers/_api/workersList.types";
import CustomButton from "@/app/_components/core/antdComponents/CustomButton/CustomButton";
import CustomDatePicker from "@/app/_components/core/antdComponents/CustomDatePicker/CustomDatePicker";
import CustomInput from "@/app/_components/core/antdComponents/CustomInput/CustomInput";
import CustomSelect from "@/app/_components/core/antdComponents/CustomSelect/CustomSelect";
import { Col, Form, Row } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PiPlus } from "react-icons/pi";

export default function BlockedTimeDrawerContent() {
  const [selectedBlockTimeType, setSelectedBlockTimeType] = useState<
    number | null
  >(null);

  const [workersList, setWorkersList] = useState<
    { id: number; title: string }[]
  >([]);

  const [form] = Form.useForm();

  const router = useRouter();

  const { mutate: getWorkersList, isPending: isGetWorkersListLoading } =
    useWorkersList({
      onSuccess: WorkersListOnSuccess,
    });

  function WorkersListOnSuccess(res: WorkersListResult) {
    setWorkersList(
      res?.data?.map((item) => ({
        id: item?.ID,
        title: `${item?.fname} ${item?.lname}`,
      }))
    );
  }

  const blockTimeTypeList = [
    {
      id: 1,
      title: "سفارشی",
      subtitle: "زمان جدید بلاک‌شده",
    },
    {
      id: 2,
      title: "ناهار",
      subtitle: "۳۰ دقیقه • بدون حقوق",
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold ">افزودن زمان بلاک‌شده</h1>
        <CustomButton onClick={() => router.push("/admin/add-block-time-type")}>
          افزورن نوع بلاک جدید
        </CustomButton>
      </div>

      <div className="grid grid-cols-2 gap-3   mt-8">
        {blockTimeTypeList?.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedBlockTimeType(item.id)}
            className={`${selectedBlockTimeType === item.id ? "bg-info-100" : ""} p-4 border border-neutral-200 rounded-2xl shadow-sm text-center cursor-pointer`}
          >
            <p className="font-semibold">{item.title}</p>
            <p className="text-sm text-gray-500">{item.subtitle}</p>
          </div>
        ))}
      </div>
      <Form form={form} layout="vertical" className="flex flex-col gap-8">
        <Row gutter={[16, 16]}>
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
              }}
            />
          </Col>
          <Col span={12}>
            <CustomSelect
              label="زمان شروع"
              placeholder=""
              options={[]}
              name="startTime"
              form={form}
            />
          </Col>
          <Col span={12}>
            <CustomSelect
              label="زمان پایان"
              placeholder=""
              options={[]}
              name="endTime"
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
            <CustomSelect
              label="تکرار"
              placeholder=""
              options={[]}
              name="frequency"
              form={form}
            />
          </Col>
          <Col span={24}>
            <CustomSelect
              label="پایان"
              placeholder=""
              options={[]}
              name="end"
              form={form}
            />
          </Col>
          <Col span={24}>
            <CustomInput label="توضیحات" placeholder="" name="desc" />
          </Col>
        </Row>
        <CustomButton className="w-full " type="primary">
          افزودن
        </CustomButton>
      </Form>
    </div>
  );
}
