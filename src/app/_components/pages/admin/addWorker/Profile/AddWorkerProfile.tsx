"use client";
import { Form, Upload, Button, Divider } from "antd";
import { UploadOutlined, UserOutlined } from "@ant-design/icons";
import CustomInput from "@/app/_components/core/antdComponents/CustomInput/CustomInput";
import CustomDatePicker from "@/app/_components/core/antdComponents/CustomDatePicker/CustomDatePicker";
import CustomSelect from "@/app/_components/core/antdComponents/CustomSelect/CustomSelect";

function getRandomRgbColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

const AddWorkerProfile = () => {
  const [form] = Form.useForm();

  return (
    <div className="p-8 w-full">
      {/* Title */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold">پروفایل</h2>
        <p className="text-gray-500">مدیریت پروفایل کارمندان</p>
      </div>

      {/* Avatar Upload */}
      <div className="flex flex-col items-center mb-8">
        <div className="relative">
          <div className="w-28 h-28 rounded-full bg-indigo-50 flex items-center justify-center">
            <UserOutlined className="text-4xl text-indigo-500" />
          </div>
          <Upload showUploadList={false} className="absolute bottom-1 right-1">
            <Button
              shape="circle"
              icon={<UploadOutlined />}
              size="small"
              className="shadow"
            />
          </Upload>
        </div>
      </div>

      {/* Form */}
      <Form form={form} layout="vertical" className="flex flex-col p-4 ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CustomInput label="نام" name="workerName" />
          <CustomInput label="نام خانوادگی" name="lastName" />
          <CustomInput label="ایمیل" name="email" />
          <CustomInput label="شماره تماس" name="phoneOne" />
          <CustomInput label="شماره تماس دوم" name="phoneTwo" />
          <CustomDatePicker label="تاریخ تولد" name="birthDate" />
          <CustomInput label="عنوان شغل" name="jobTitle" />
        </div>
        <Divider />
        <div className="flex flex-col gap-4">
          <h5 className="text-lg">رنگ تقویم</h5>
          <div className="flex flex-row flex-wrap gap-2">
            {Array.from({ length: 10 }, (_, i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full shadow-lg"
                style={{ backgroundColor: getRandomRgbColor() }}
              />
            ))}
          </div>
        </div>
        <Divider />
        {/*  Work detail */}
        <div className="flex flex-col gap-4">
          <h5 className="text-xl"> جزئیات شغل</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CustomDatePicker label="تاریخ شروع کار" name="" />
            <CustomDatePicker label="تاریخ پایان کار" name="" />
            <CustomInput label="آیدی متخصص" name="" />
            <CustomSelect name="" options={[]} label="نحوه همکاری" />
          </div>
          <CustomInput label="توضیحات" name="" />
        </div>
      </Form>
    </div>
  );
};

export default AddWorkerProfile;
