"use client";
import { Divider, Row, Col, Radio, Switch, Typography } from "antd";
import CustomInput from "@/app/_components/core/antdComponents/CustomInput/CustomInput";
import CustomSelect from "@/app/_components/core/antdComponents/CustomSelect/CustomSelect";
import { useState } from "react";

const { Text, Link } = Typography;

const commissions = [
  {
    title: "کمیسیون خدمات",
    description: "کمیسیونی که از خدمات ارائه‌شده به‌دست آمده است.",
  },
  {
    title: "کمیسیون محصولات",
    description: "کمیسیونی که از فروش محصولات به‌دست آمده است.",
  },
  {
    title: "کمیسیون عضویت‌ها",
    description: "کمیسیونی که از فروش عضویت‌ها به‌دست آمده است.",
  },
  {
    title: "کمیسیون کارت هدیه",
    description: "کمیسیونی که از فروش کارت‌های هدیه به‌دست آمده است.",
  },
  {
    title: "کمیسیون لغو رزرو",
    description:
      "کمیسیونی که از هزینه‌های عدم‌حضور یا لغو دیرهنگام به‌دست آمده است.",
  },
];

const AddWorkerCommissions = () => {
  const [switchStates, setSwitchStates] = useState(
    commissions.map(() => false)
  );

  const toggleSwitch = (index: number) => {
    const newStates = [...switchStates];
    newStates[index] = !newStates[index];
    setSwitchStates(newStates);
  };
  return (
    <div className="p-8  ">
      {commissions.map((item, index) => (
        <div key={index} className=" flex flex-col gap-8 ">
          <div className="py-4">
            <div className="flex justify-between items-center">
              <div>
                <Text strong className="text-lg">
                  {item.title}
                </Text>
                <div>
                  <Text type="secondary" className="text-sm">
                    {item.description}{" "}
                    <Link href="#" target="_blank">
                      بیشتر بدانید
                    </Link>
                  </Text>
                </div>
              </div>
              <Switch
                checked={switchStates[index]}
                onChange={() => toggleSwitch(index)}
              />
            </div>
          </div>

          {/*  Commission items */}
          {switchStates[index] && (
            <div className="w-2/3">
              <Row gutter={[16, 16]}>
                <Col sm={24} md={12}>
                  <CustomSelect
                    options={[]}
                    name="commissionType"
                    label="نوع کمیسیون"
                  />
                </Col>
                <Col sm={24} md={12}>
                  <CustomInput name="value" label="مقدار" />
                </Col>
                <Col span={24}>
                  <CustomInput name="value" label="مقدار" />
                </Col>
                <Radio.Group
                  //   value={1}
                  options={[
                    { value: 1, label: "پیش فرض" },
                    { value: 2, label: "جدید" },
                  ]}
                />
              </Row>
            </div>
          )}

          {index < commissions.length - 1 && <Divider className="my-4" />}
        </div>
      ))}
    </div>
  );
};

export default AddWorkerCommissions;
