"use client";
import ServiceCard from "@/app/_components/shared/ServiceCard/ServiceCard";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import ReviewCard from "@/app/_components/shared/ReviewCard/ReviewCard";
import { useCommentsList } from "./_api/reviews";
import { CommentsDataType, CommentsListResult } from "./_api/reviews.types";
import "./_reviews.css"

const Reviews = () => {
  const [commentsList, setCommentsList] = useState<CommentsDataType[]>([]);

  const { mutate: getCommentsList, isPending: isCommentsListLoading } =
    useCommentsList({
      onSuccess: commentsListOnSuccess,
    });

  useEffect(() => {
    getCommentsList({
      countc: 10,
    });
  }, []);

  function commentsListOnSuccess(res: CommentsListResult) {
    setCommentsList(res?.comments);
  }

  return (
    <div className="review-page-container mt-24 flex flex-col gap-6">
      <h3 className="text-xl md:text-2xl font-bold">نظرات شما</h3>
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
        {commentsList.map((item) => (
          <SwiperSlide key={item.name}>
            <ReviewCard data={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Reviews;
