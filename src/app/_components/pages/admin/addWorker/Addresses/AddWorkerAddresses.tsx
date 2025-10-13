import CustomButton from "@/app/_components/core/antdComponents/CustomButton/CustomButton";
import CustomInput from "@/app/_components/core/antdComponents/CustomInput/CustomInput";
import { Col, Modal, Row } from "antd";
import React, { useState } from "react";
import { BiLocationPlus } from "react-icons/bi";
import { CiEdit } from "react-icons/ci";

const AddWorkerAddresses = () => {
  const [addModalOpen, setAddModalOpen] = useState(false);

  const closeModalHander = () => {
    setAddModalOpen(false);
  };

  const confirmModalHandler = () => {};

  return (
    <div className="p-8 flex flex-col gap-8">
      <p className="text-lg font-bold">مدیریت آدرس‌های مکاتبه اعضای تیم خود</p>
      <div>
        <CustomButton
          icon={<BiLocationPlus />}
          onClick={() => {
            setAddModalOpen(true);
          }}
        >
          اضافه کردن آدرس
        </CustomButton>
      </div>
      <div className="border rounded-lg p-4 border-neutral-200 flex justify-between">
        <div className="flex flex-col gap-2">
          <span>نام آدرس</span>
          <p>آدرس</p>
        </div>
        <CustomButton icon={<CiEdit size={18} />} iconPosition="end">
          ویرایش
        </CustomButton>
      </div>

      <Modal
        open={addModalOpen}
        onCancel={closeModalHander}
        title="اضافه کردن آدرس"
        footer={
          <div className="flex gap-2 justify-end">
            <CustomButton type="primary" onClick={confirmModalHandler}>
              اضافه کردن
            </CustomButton>
            <CustomButton onClick={closeModalHander}>کنسل</CustomButton>
          </div>
        }
      >
        <Row gutter={[16, 16]} className="p-4 pb-8">
          <Col sm={24} md={12}>
            <CustomInput label="نام آدرس" name="" />
          </Col>
          <Col sm={24} md={12}>
            <CustomInput label="آدرس" name="" />
          </Col>
        </Row>
      </Modal>
    </div>
  );
};

export default AddWorkerAddresses;
