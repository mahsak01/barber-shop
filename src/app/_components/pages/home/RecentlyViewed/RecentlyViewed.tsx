import LandingSwiper from "../Swiper/LandingSwiper";

const RecentlyViewed = () => {
  return (
    <div className="mt-24 flex flex-col gap-6">
      <h3 className="text-xl md:text-2xl font-bold">مشاهده های اخیر</h3>
      <LandingSwiper list={[1, 2, 3, 4, 5, 6, 7]} />
    </div>
  );
};

export default RecentlyViewed;