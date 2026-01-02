import React, { useState } from "react";
import { Checkbox, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const AddWorkerServices = () => {
  const [checkedServices, setCheckedServices] = useState({
    all: true,
    categories: {
      hairStyling: true,
    },
    services: {
      haircut: true,
      hairColor: true,
      blowDry: true,
    },
  });

  const handleCheckAll = (e) => {
    const checked = e.target.checked;
    setCheckedServices({
      all: checked,
      categories: { hairStyling: checked },
      services: {
        haircut: checked,
        hairColor: checked,
        blowDry: checked,
      },
    });
  };

  const handleCategoryChange = (e) => {
    const checked = e.target.checked;
    setCheckedServices((prev) => ({
      ...prev,
      categories: { hairStyling: checked },
      services: {
        haircut: checked,
        hairColor: checked,
        blowDry: checked,
      },
      all: checked,
    }));
  };

  const handleServiceChange = (key) => (e) => {
    const newServices = {
      ...checkedServices.services,
      [key]: e.target.checked,
    };
    const allChecked = Object.values(newServices).every(Boolean);
    setCheckedServices({
      all: allChecked,
      categories: { hairStyling: allChecked },
      services: newServices,
    });
  };

  const services = [
    {
      key: "haircut",
      name: "کوتاهی مو",
      duration: "۴۵ دقیقه",
      price: "۴۰,۰۰۰ تومان",
    },
    {
      key: "hairColor",
      name: "رنگ مو",
      duration: "۱ ساعت و ۱۵ دقیقه",
      price: "۵۷,۰۰۰ تومان",
    },
    {
      key: "blowDry",
      name: "براشینگ",
      duration: "۳۵ دقیقه",
      price: "۳۵,۰۰۰ تومان",
    },
  ];

  return (
    <div className="  mx-auto p-6 bg-white  space-y-4 text-right" dir="rtl">
      <h2 className="text-2xl font-semibold">خدمات</h2>
      <p className="text-gray-500 text-sm">
        خدماتی را که این همکار ارائه می‌دهد انتخاب کنید
      </p>

      <Input
        prefix={<SearchOutlined className="text-gray-400" />}
        placeholder="جستجوی خدمات"
        className="rounded-lg py-2 text-right"
      />

      <div className="mt-4 space-y-4">
        {/* همه خدمات */}
        <div className="p-3 rounded-lg hover:bg-gray-50">
          <Checkbox checked={checkedServices.all} onChange={handleCheckAll}>
            <span className="font-medium">همه خدمات</span>
            <span className="ml-1 text-gray-400">(۵)</span>
          </Checkbox>
        </div>

        {/* مو و حالت‌دهی */}
        <div className="  p-4 space-y-3">
          <Checkbox
            checked={checkedServices.categories.hairStyling}
            onChange={handleCategoryChange}
          >
            <span className="font-medium">مو و حالت‌دهی</span>
            <span className="ml-1 text-gray-400">(۴)</span>
          </Checkbox>

          <div className="pr-6 space-y-3">
            {services.map((service) => (
              <div
                key={service.key}
                className="flex justify-between items-center hover:bg-white rounded-lg p-2 transition"
              >
                <div className="flex items-center gap-3">
                  <Checkbox
                    checked={checkedServices.services[service.key]}
                    onChange={handleServiceChange(service.key)}
                  >
                    <span className="font-medium">{service.name}</span>
                  </Checkbox>
                  <span className="text-gray-400 text-sm">
                    {service.duration}
                  </span>
                </div>
                <span className="font-medium">{service.price}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddWorkerServices;
