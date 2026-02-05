"use client";
import { Col, Form, Row } from "antd";
import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { ImManWoman } from "react-icons/im";
import { BiSolidCity } from "react-icons/bi";
import { MdMiscellaneousServices } from "react-icons/md";
import CustomSelect from "@/app/_components/core/antdComponents/CustomSelect/CustomSelect";
import CustomDatePicker from "@/app/_components/core/antdComponents/CustomDatePicker/CustomDatePicker";
import CustomButton from "@/app/_components/core/antdComponents/CustomButton/CustomButton";
import { useCitiesList, useProvinceList, useServiceList } from "./_api/hero";
import {
  CitiesListResult,
  ProvinceListResult,
  ServiceListResult,
} from "./_api/hero.types";
import { GENDER_TYPE_LIST } from "../../_shared/utils";
import { useRouter } from "next/navigation";
import { HeroFormDataType } from "./landingHero.types";
import {BubbleBackground} from "@/app/_components/pages/home/Hero/bubble";

const LandingHero = () => {
  const [provinceList, setProvinceList] = useState<
    { id: number; title: string }[]
  >([]);

  const [citiesList, setCitiesList] = useState<{ id: number; title: string }[]>(
    []
  );

  const [servicesList, setServicesList] = useState<
    { id: number; title: string }[]
  >([]);

  const [selectedDate, setSelectedDate] = useState("");

  const router = useRouter();

  const [form] = Form.useForm<HeroFormDataType>();

  const { mutate: getProvinceList, isPending: isProvinceListLoading } =
    useProvinceList({ onSuccess: provinceListOnSuccess });

  const { mutate: getCitiesList, isPending: isCitiesListLoading } =
    useCitiesList({ onSuccess: citiesListOnSuccess });

  const { mutate: getServiceList, isPending: isServiceListLoading } =
    useServiceList({ onSuccess: serviceListOnSuccess });

  function provinceListOnSuccess(res: ProvinceListResult) {
    setProvinceList(
      res.provinces?.map((item) => ({
        id: +item.province_id,
        title: item.province,
      }))
    );
  }

  function citiesListOnSuccess(res: CitiesListResult) {
    setCitiesList(
      res.cities?.map((item) => ({ id: +item.city_id, title: item.city }))
    );
  }

  function serviceListOnSuccess(res: ServiceListResult) {
    setServicesList(
      res?.map((item) => ({ id: +item.ID, title: item?.service }))
    );
  }

  useEffect(() => {
    getProvinceList({});
  }, []);

  const changeProvinceHandler = (provinceId: number) => {
    getCitiesList({
      province_id: provinceId,
    });
  };

  const genderChangeHandler = (genderId: string) => {
    getServiceList({ gender: genderId });

    form.setFieldsValue({
      serviceType: undefined,
    });
  };

  const searchBtnHandler = () => {
    const params = new URLSearchParams();
    const { city, serviceType, gender, province } = form.getFieldsValue();

    if (province) {
      params.append("province", province.title);
    }

    if (city) {
      params.append("city", city.title);
    }

    if (gender) {
      params.append("genderId", gender.code.toString());
      params.append("gender", gender.title);
    }

    if (serviceType) {
      params.append("service", serviceType.title);
    }

    if (selectedDate) {
      params.append("date", selectedDate);
    }

    router.push(`/search?${params.toString()}`);
  };

  return (
      <section className="relative mt-12 md:mt-24 w-full">
        <div className="fixed inset-0 -z-10" >
          <BubbleBackground
              interactive={false}
              className="h-full w-full rounded-3xl bg-gradient-to-br from-pink-500 via-fuchsia-600 to-purple-700"
          />
        </div>

        <div className="md:max-w-[80%] mx-auto mt-12 md:mt-28 flex flex-col gap-8 items-center w-full">

      <h1 className="text-2xl md:text-4xl font-bold text-center">
        خدمات زیبایی و سلامتی محلی را رزرو کنید
      </h1>
      <div className="bg-white rounded-3xl p-2 w-full md:w-auto shadow-md">
      <Form form={form}>
      <Row gutter={16} wrap={true} className="w-full max-w-full overflow-hidden">
  <Col xs={24} sm={12} md={4} className="p-2">
    <CustomSelect
      options={provinceList}
      name="province"
      placeholder="استان"
      prefix={<BiSolidCity />}
      form={form}
      bordered={false}
      onChange={(id) => changeProvinceHandler(id as number)}
      style={{ width: "100%", minWidth: "120px" }}
    />
  </Col>

  <Col xs={24} sm={12} md={4} className="p-2">
    <CustomSelect
      options={citiesList}
      name="city"
      placeholder="شهر"
      prefix={<BiSolidCity />}
      form={form}
      bordered={false}
      loading={isCitiesListLoading}
      style={{ width: "100%", minWidth: "120px" }}
    />
  </Col>

  <Col xs={24} sm={12} md={4} className="p-2">
    <CustomSelect
      options={GENDER_TYPE_LIST}
      name="gender"
      placeholder="جنسیت"
      prefix={<ImManWoman />}
      form={form}
      bordered={false}
      onChange={(e) => genderChangeHandler(e as string)}
      style={{ width: "100%", minWidth: "120px" }}
    />
  </Col>

  <Col xs={24} sm={12} md={4} className="p-2">
    <CustomSelect
      options={servicesList}
      name="serviceType"
      placeholder="نوع خدمت"
      prefix={<MdMiscellaneousServices />}
      form={form}
      bordered={false}
      loading={isServiceListLoading}
      style={{ width: "100%", minWidth: "120px" }}
    />
  </Col>

  <Col xs={24} sm={12} md={4} className="p-2">
    <CustomDatePicker
      name="date"
      placeholder="انتخاب تاریخ"
      form={form}
      bordered={false}
      onChange={(_, localeDate) => setSelectedDate(localeDate as string)}
      style={{ width: "100%", minWidth: "120px" }}
    />
  </Col>

  <Col xs={24} sm={12} md={3} className="p-2 flex items-stretch">
    <CustomButton
      type="primary"
      icon={<CiSearch />}
      className="btn-black px-4 rounded-2xl shadow-none"
      style={{ width: "100%" }}
      onClick={searchBtnHandler}
    >
      جستجو
    </CustomButton>
  </Col>
</Row>

    </Form>
</div>

    </div>
      </section>
  );
};

export default LandingHero;
