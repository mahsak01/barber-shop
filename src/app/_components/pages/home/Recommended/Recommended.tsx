"use client";
import React, { useEffect, useState } from "react";
import LandingSwiper from "../Swiper/LandingSwiper";
import { SalonDataType, SalonListResult } from "../_shared/_api/home.types";
import { SALON_API_PARAMETER } from "../../_shared/utils";
import { useSalonList } from "../_shared/_api/home";

const Recommended = () => {
  const [salonList, setSalonList] = useState<SalonDataType[]>([]);

  const { mutate: getSalonList, isPending: isSalonListLoading } = useSalonList({
    onSuccess: salonListOnSuccess,
  });

  useEffect(() => {
    getSalonList({
      count: 10,
      type: SALON_API_PARAMETER.maxScore,
    });
  }, []);

  function salonListOnSuccess(res: SalonListResult) {
    setSalonList(res?.salon);
  }

  return (
    <div className="mt-24 flex flex-col gap-6">
      <h3 className="text-xl md:text-2xl font-bold">پیشنهاد شده ها</h3>
      <LandingSwiper list={salonList} />
    </div>
  );
};

export default Recommended;
