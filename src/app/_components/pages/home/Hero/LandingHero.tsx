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
import { CitiesListResult, ProvinceListResult, ServiceListResult } from "./_api/hero.types";
import { GENDER_TYPE_LIST } from "../../_shared/utils";
import { useRouter } from "next/navigation";
import { HeroFormDataType } from "./landingHero.types";


const LandingHero = () => {
  const [provinceList, setProvinceList] = useState<{ id: number; title: string }[]>(
    []
  );

  const [citiesList, setCitiesList] = useState<{ id: number; title: string }[]>(
    []
  );

  const [servicesList, setServicesList] = useState<
    { id: number; title: string }[]
  >([]);

  const router = useRouter()

  const [form] = Form.useForm<HeroFormDataType>();

  const { mutate: getProvinceList, isPending: isProvinceListLoading } =
    useProvinceList({ onSuccess: provinceListOnSuccess });

  const { mutate: getCitiesList, isPending: isCitiesListLoading } =
    useCitiesList({ onSuccess: citiesListOnSuccess });

  const { mutate: getServiceList, isPending: isServiceListLoading } =
    useServiceList({ onSuccess: serviceListOnSuccess });

  function provinceListOnSuccess(res: ProvinceListResult) {
    setProvinceList(
      res.provinces?.map((item) => ({ id: +item.province_id, title: item.province }))
    );
  }

  function citiesListOnSuccess(res: CitiesListResult) {
    setCitiesList(
      res.cities?.map((item) => ({ id: +item.ID, title: item.city }))
    );
  }

  function serviceListOnSuccess(res: ServiceListResult) {
    setServicesList(
      res?.map((item) => ({ id: +item.ID, title: item?.service }))
    );
  }

  useEffect(() => {
    getProvinceList({})

  }, []);

  const changeProvinceHandler = (provinceId: number) => {
    getCitiesList({
      province_id: provinceId
    });
  }

  const genderChangeHandler = (genderId: string) => {
    getServiceList({ gender: genderId });

    form.setFieldsValue({
      serviceType: undefined,
    });
  };

  const searchBtnHandler = () => {
    const params = new URLSearchParams();
    const { city, serviceType, gender } = form.getFieldsValue()

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

    router.push(`/search?${params.toString()}`);
  }

  return (
    <div className="md:max-w-[80%] mx-auto mt-12 md:mt-28 flex flex-col gap-8 items-center w-full">
      <h1 className="text-2xl md:text-4xl font-bold text-center">
        خدمات زیبایی و سلامتی محلی را رزرو کنید
      </h1>
      <Form form={form}>
        <Row
          gutter={[16, 16]}
          className="w-full px-4 max-w-[500px] md:max-w-[600px]"
        >
          <Col xs={24} md={12}>
            <CustomSelect
              options={provinceList}
              name="province"
              placeholder="انتخاب استان"
              prefix={<BiSolidCity />}
              form={form}
              onChange={(id) => changeProvinceHandler(id as number)}
              loading={isProvinceListLoading}
            />
          </Col>
          <Col xs={24} md={12}>
            <CustomSelect
              options={citiesList}
              name="city"
              placeholder="انتخاب شهر"
              prefix={<BiSolidCity />}
              form={form}
              loading={isCitiesListLoading}
            />
          </Col>
          <Col xs={24} md={12}>
            <CustomSelect
              options={GENDER_TYPE_LIST}
              name="gender"
              placeholder="انتخاب جنسیت"
              prefix={<ImManWoman />}
              form={form}
              onChange={(e) => genderChangeHandler(e as string)}
            />
          </Col>
          <Col xs={24} md={12}>
            <CustomSelect
              options={servicesList}
              name="serviceType"
              placeholder="انتخاب نوع خدمت"
              prefix={<MdMiscellaneousServices />}
              form={form}
              loading={isServiceListLoading}
            />
          </Col>
          <Col xs={24} md={12}>
            <CustomDatePicker name="date" placeholder="انتخاب تاریخ" />
          </Col>
          <Col span={24}>
            <CustomButton type="primary" icon={<CiSearch />} className="w-full" onClick={searchBtnHandler}>
              جستجو
            </CustomButton>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default LandingHero;
