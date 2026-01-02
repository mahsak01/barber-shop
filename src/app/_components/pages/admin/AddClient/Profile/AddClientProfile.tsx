"use client";
import { useState } from "react";
import { Form, Upload, Button, Divider } from "antd";
import { UploadOutlined, UserOutlined } from "@ant-design/icons";
import { useCreateNewClient } from "@/app/(pages)/admin/add-client/_api/addClient";
import { CreateNewClientResult } from "@/app/(pages)/admin/add-client/_api/addClient.types";
import CustomInput from "@/app/_components/core/antdComponents/CustomInput/CustomInput";
import CustomDatePicker from "@/app/_components/core/antdComponents/CustomDatePicker/CustomDatePicker";
import CustomSelect from "@/app/_components/core/antdComponents/CustomSelect/CustomSelect";
import { REQUIRED_RULES } from "@/utils/formRules/formRulesUtils";
import CustomButton from "@/app/_components/core/antdComponents/CustomButton/CustomButton";

const AddClientProfile = () => {
  const [form] = Form.useForm();

  const [selectDate, setSelectDate] = useState({
    birth: "",
  });
  const [file, setFile] = useState<File | null>(null);

  const { mutate: createNewClient, isPending: isCreateNewClientLoading } =
    useCreateNewClient({
      onSuccess: createNewQorkerOnSuccess,
    });

  function createNewQorkerOnSuccess(res: CreateNewClientResult) {}

  const handleUploadChange = (info: any) => {
    const realFile = info.file;

    if (realFile instanceof File) {
      setFile(realFile);
    } else {
      console.error("originFileObj IS NOT a real File:", realFile);
    }
  };

  const createNewClientHandler = () => {
    form.validateFields().then((value) => {
      const formdata = new FormData();
      formdata.append("salon_id", "1002");
      formdata.append("fname", value?.firstname);
      formdata.append("lname", value?.lastname);
      formdata.append("phone", value?.phoneOne);
      formdata.append("email", value?.email);
      formdata.append("birthday", selectDate.birth?.split("-")?.join("."));
      formdata.append("job", value?.jobTitle);
      formdata.append("attract", "1");
      formdata.append("gender", "0");
      formdata.append("extra_phone", value?.secondNumber);
      if (file) {
        formdata.append("avatar_file", file, file.name);
      }

      createNewClient(formdata);
    });
  };

  return (
    <div className="p-8 w-full">
      {/* Title */}
      <div className="mb-6 flex justify-between">
        <div>
          <h2 className="text-xl font-semibold">پروفایل</h2>
          <p className="text-gray-500">مدیریت پروفایل مشتری</p>
        </div>
        <CustomButton type="primary" onClick={createNewClientHandler}>
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
          <CustomSelect name="gender" options={[]} label="جنسیت" />
        </div>
        <Divider />
        {/*  Work detail */}
        <div className="flex flex-col gap-4">
          <h5 className="text-xl"> اطلاعات اضافه</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CustomSelect
              name="clientSource"
              options={[]}
              label="منبع جذب مشتری"
            />
            <CustomInput label="معرف" name="referredBy" />
            <CustomInput label="عنوان شغل" name="jobTitle" />
            <CustomInput label="شماره اضافه" name="secondNumber" />
          </div>
        </div>
      </Form>
    </div>
  );
};

export default AddClientProfile;
