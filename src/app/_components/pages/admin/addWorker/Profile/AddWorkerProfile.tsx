"use client";
import { Form, Upload, Button, Divider, UploadFile } from "antd";
import { UploadOutlined, UserOutlined } from "@ant-design/icons";
import CustomInput from "@/app/_components/core/antdComponents/CustomInput/CustomInput";
import CustomDatePicker from "@/app/_components/core/antdComponents/CustomDatePicker/CustomDatePicker";
import CustomSelect from "@/app/_components/core/antdComponents/CustomSelect/CustomSelect";
import {
  useCreateNewWorker,
  useGetWorkerInfo,
} from "@/app/(pages)/admin/add-worker/_api/addWorker";
import {
  CreateNewWorkerResult,
  GetWorkerInfoResult,
} from "@/app/(pages)/admin/add-worker/_api/addWorker.types";
import { REQUIRED_RULES } from "@/utils/formRules/formRulesUtils";
import CustomButton from "@/app/_components/core/antdComponents/CustomButton/CustomButton";
import { useEffect, useState } from "react";
import { AddWorkerProfileFormType } from "./_addWorkerProfile.types";

const colorArray = [
  "#550991",
  "#3668b9",
  "#9683a3",
  "#bcbad3",
  "#f432a6",
  "#ec1866",
  "#9fce02",
  "#70b0ff",
  "#c44f2b",
  "#160711",
];

const AddWorkerProfile = () => {
  const [form] = Form.useForm<AddWorkerProfileFormType>();
  const [selectColor, setSelectColor] = useState("");
  const [selectDate, setSelectDate] = useState({
    start: "",
    end: "",
    birth: "",
  });
  const [file, setFile] = useState<File | null>(null);

  const { mutate: createNewWorker, isPending: isCreateNewWorkerLoading } =
    useCreateNewWorker({
      onSuccess: createNewQorkerOnSuccess,
    });

  const { mutate: getWorker, isPending: isGetWorkerLoading } = useGetWorkerInfo(
    {
      onSuccess: getworkerOnSuccess,
    }
  );

  function createNewQorkerOnSuccess(res: CreateNewWorkerResult) {}

  function getworkerOnSuccess(res: GetWorkerInfoResult) {}

  const handleUploadChange = (info: any) => {
    const realFile = info.file;

    if (realFile instanceof File) {
      setFile(realFile);
    } else {
      console.error("originFileObj IS NOT a real File:", realFile);
    }
  };

  const createNewWorkerHandler = () => {
    form.validateFields().then((value) => {
      const formdata = new FormData();
      formdata.append("owner_user_id", "8");
      formdata.append("salon_id", "1002");
      formdata.append("first_name", value?.firstname);
      formdata.append("last_name", value?.lastname);
      formdata.append("phone_number", value?.phoneOne);
      formdata.append("email", value?.email);
      formdata.append("birthday", selectDate.birth?.split("-")?.join("."));
      formdata.append("color", selectColor);
      formdata.append("job_title", value?.jobTitle);
      formdata.append("employment_type", "1");
      formdata.append("start_work", selectDate.start?.split("-")?.join("."));
      formdata.append("end_work", selectDate.end?.split("-")?.join("."));
      formdata.append("note", value?.description);
      if (file) {
        formdata.append("avatar", file, file.name);
      }

      createNewWorker(formdata);
    });
  };

  useEffect(() => {
    getWorker({
      type: 0,
      worker: "09124520178",
      salon_id: "1002",
      worker_id: "25",
    });
  }, []);

  return (
    <div className="p-8 w-full">
      {/* Title */}
      <div className="mb-6 flex justify-between">
        <div>
          <h2 className="text-xl font-semibold">پروفایل</h2>
          <p className="text-gray-500">مدیریت پروفایل کارمندان</p>
        </div>
        <CustomButton type="primary" onClick={createNewWorkerHandler}>
          ایجاد کاربر
        </CustomButton>
      </div>

      {/* Avatar Upload */}
      <div className="flex flex-col items-center mb-8">
        <div className="relative">
          <div className="w-28 h-28 rounded-full bg-indigo-50 flex items-center justify-center">
            <UserOutlined className="text-4xl text-indigo-500" />
          </div>
          <Upload
            maxCount={1}
            listType="picture"
            name="avatar"
            onChange={handleUploadChange}
            beforeUpload={() => false}
          >
            <Button type="primary" icon={<UploadOutlined />}>
              Upload
            </Button>
          </Upload>
        </div>
      </div>

      {/* Form */}
      <Form form={form} layout="vertical" className="flex flex-col p-4 ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CustomInput
            label="نام"
            name="firstname"
            rules={[REQUIRED_RULES()]}
          />
          <CustomInput
            label="نام خانوادگی"
            name="lastname"
            rules={[REQUIRED_RULES()]}
          />
          <CustomInput label="ایمیل" name="email" />
          <CustomInput label="شماره تماس" name="phoneOne" />
          {/* <CustomInput label="شماره تماس دوم" name="phoneTwo" /> */}
          <CustomDatePicker
            label="تاریخ تولد"
            name="birthDate"
            form={form}
            onChange={(_, localeDate) => {
              setSelectDate((prev) => ({
                ...prev,
                birth: localeDate as string,
              }));
            }}
          />
          <CustomInput label="عنوان شغل" name="jobTitle" />
        </div>
        <Divider />
        <div className="flex flex-col gap-4">
          <h5 className="text-lg">رنگ تقویم</h5>
          <div className="flex flex-row flex-wrap gap-2">
            {colorArray.map((color) => (
              <div
                key={color}
                className="w-8 h-8 rounded-full flex justify-center items-center shadow-lg text-lg "
                style={{ backgroundColor: color }}
                onClick={() => setSelectColor(color)}
              >
                {selectColor === color ? "✔️" : ""}
              </div>
            ))}
          </div>
        </div>
        <Divider />
        {/*  Work detail */}
        <div className="flex flex-col gap-4">
          <h5 className="text-xl"> جزئیات شغل</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CustomDatePicker
              label="تاریخ شروع کار"
              name="jobStartDate"
              // rules={[REQUIRED_RULES()]}
              form={form}
              onChange={(_, localeDate) => {
                setSelectDate((prev) => ({
                  ...prev,
                  start: localeDate as string,
                }));
              }}
            />
            <CustomDatePicker
              label="تاریخ پایان کار"
              name="jobendDate"
              // rules={[REQUIRED_RULES()]}
              form={form}
              onChange={(_, localeDate) => {
                setSelectDate((prev) => ({
                  ...prev,
                  end: localeDate as string,
                }));
              }}
            />
            <CustomInput label="آیدی متخصص" name="workerId" />
            <CustomSelect
              name="employeeMethod"
              options={[]}
              label="نحوه همکاری"
            />
          </div>
          <CustomInput label="توضیحات" name="description" />
        </div>
      </Form>
    </div>
  );
};

export default AddWorkerProfile;
