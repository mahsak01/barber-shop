import CustomButton from "@/app/_components/core/antdComponents/CustomButton/CustomButton";
import { Divider } from "antd";
import { CiEdit } from "react-icons/ci";

import React, { useEffect, useState } from "react";
import { useServicesList } from "@/app/(pages)/admin/catalog/_api/catalog";
import {
  ServicesListRecordType,
  ServicesListResult,
} from "@/app/(pages)/admin/catalog/_api/catalog.types";
import { GroupedServiceType } from "./CatalogCategoriesTab.types";

export const groupServices = (
  data: ServicesListRecordType[]
): GroupedServiceType[] => {
  const result: Record<number, GroupedServiceType> = {};

  data.forEach((item) => {
    if (!result[item.service_id]) {
      result[item.service_id] = {
        service_id: item.service_id,
        service_title: item.service_title,
        sub_services: [],
      };
    }

    result[item.service_id].sub_services.push({
      service_entry_id: item.service_entry_id,
      sub_service_title: item.sub_service_title,
      duration: item.duration,
      price: item.price,
    });
  });

  return Object.values(result);
};

const CatalogCategoriesTab = () => {
  const [servicesList, setServicesList] = useState<GroupedServiceType[]>([]);
  const { mutate: getServicesList, isPending: isGetServicesListLoading } =
    useServicesList({
      onSuccess: ServicesListOnSuccess,
    });

  function ServicesListOnSuccess(res: ServicesListResult) {
    setServicesList(groupServices(res?.data));
  }

  useEffect(() => {
    getServicesList({
      salon_id: 1002,
    });
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold ">لیست سرویس ها</h1>
        <CustomButton type="primary">اضافه کردن</CustomButton>
      </div>
      <div>
        {servicesList.map((item) => (
          <>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2 px-4">
                <div className="flex justify-between mb-8">
                  <h2 className="text-2xl font-semibold">
                    {item?.service_title}
                  </h2>
                  <CustomButton>ویرایش</CustomButton>
                </div>
                {item?.sub_services.map((service, idx) => (
                  <div
                    key={service.service_entry_id}
                    className="flex justify-between items-center border border-neutral-100  border-r-4  border-r-neutral-300 px-12 mb-8 py-4"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-semibold">
                        {service.sub_service_title}
                      </span>

                      <span className="text-gray-400 text-sm">
                        {service.duration} دقیقه
                      </span>
                    </div>
                    <div className="flex gap-4">
                      <span>{service.price} تومان</span>
                      <CiEdit size={24} className="cursor-pointer" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <Divider />
          </>
        ))}
      </div>
    </div>
  );
};

export default CatalogCategoriesTab;
