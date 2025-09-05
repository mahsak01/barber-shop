"use client";
import ServiceCard from "@/app/_components/shared/ServiceCard/ServiceCard";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import { SalonDataType } from "../_shared/_api/home.types";

const LandingSwiper = ({ list }: { list: SalonDataType[] }) => {
  return (
    <Swiper
      modules={[Autoplay]}
      spaceBetween={20}
      loop={true}
      autoplay={{
        delay: 2000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      className="w-full max-w-[320px] xs:max-w-[320px] sm:max-w-[390px] md:max-w-[728px]  lg:max-w-[910px] xl:max-w-[1280px] 2xl:max-w-[1440px]"
      breakpoints={{
        0: {
          slidesPerView: 0.85, // موبایل
        },
        480: {
          slidesPerView: 2.3, // تبلت کوچک
        },
        768: {
          slidesPerView: 2.75, // تبلت بزرگ / لپتاپ کوچک
        },
        976: {
          slidesPerView: 3.75, // تبلت بزرگ / لپتاپ کوچک
        },
        1024: {
          slidesPerView: 4, // لپتاپ بزرگ
        },
        1280: {
          slidesPerView: 5, // دسکتاپ بزرگ
        },
        1536: {
          slidesPerView: 6, // مانیتور خیلی بزرگ
        },
      }}
    >
      {list?.map((item) => (
        <SwiperSlide key={item?.title}>
          <ServiceCard
            title={item?.title}
            score={item?.score}
            // Todo:uncomment when api got ready
            // votes={3444}
            address={item?.city}
            img={item?.pic}
            // tags="ماساژ"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default LandingSwiper;
