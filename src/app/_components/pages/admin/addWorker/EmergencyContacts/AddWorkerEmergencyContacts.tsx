import CustomButton from "@/app/_components/core/antdComponents/CustomButton/CustomButton";
import CustomInput from "@/app/_components/core/antdComponents/CustomInput/CustomInput";
import CustomSelect from "@/app/_components/core/antdComponents/CustomSelect/CustomSelect";
import { Form, Modal } from "antd";
import React, { useState } from "react";
import { BiLocationPlus } from "react-icons/bi";
import { CiEdit } from "react-icons/ci";

const AddWorkerEmergencyContacts = () => {
  const [addModalOpen, setAddModalOpen] = useState(false);

  const [form] = Form.useForm();

  const closeModalHander = () => {
    setAddModalOpen(false);
  };

  const confirmModalHandler = () => {};

  return (
    <div className="p-8 flex flex-col gap-8">
      <p className="text-lg font-bold">مدیریت تماس های ضروری اعضای تیم خود</p>
      <div>
        <CustomButton
          icon={<BiLocationPlus />}
          onClick={() => {
            setAddModalOpen(true);
          }}
        >
          اضافه کردن تماس
        </CustomButton>
      </div>
      <div className="border rounded-lg p-4 border-neutral-200 flex justify-between">
        <div className="flex flex-col gap-2">
          <span>نام </span>
          <p>نسبت</p>
          <p>ایمیل</p>
          <p>شماره تماس</p>
        </div>
        <CustomButton icon={<CiEdit size={18} />} iconPosition="end">
          ویرایش
        </CustomButton>
      </div>

      <Modal
        open={addModalOpen}
        onCancel={closeModalHander}
        title="اضافه کردن تماس"
        footer={
          <div className="flex gap-2 justify-end">
            <CustomButton type="primary" onClick={confirmModalHandler}>
              اضافه کردن
            </CustomButton>
            <CustomButton onClick={closeModalHander}>کنسل</CustomButton>
          </div>
        }
      >
        <Form form={form} layout="vertical">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CustomInput label="نام کامل" name="fullname" />
            <CustomSelect label="نسبت" name="relation" options={[]} />
            <CustomInput label="ایمیل" name="email" />
            <CustomInput label="شماره موبایل" name="phone" />
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default AddWorkerEmergencyContacts;
