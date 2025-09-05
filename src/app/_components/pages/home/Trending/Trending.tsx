import React from "react";
import LandingSwiper from "../Swiper/LandingSwiper";

const Trending = () => {
  return    <div className="mt-24 flex flex-col gap-6">
      <h3 className="text-xl md:text-2xl font-bold">پرطرفدار ها</h3>
      <LandingSwiper list={[1, 2, 3, 4, 5, 6, 7]} />
    </div>
};

export default Trending;
