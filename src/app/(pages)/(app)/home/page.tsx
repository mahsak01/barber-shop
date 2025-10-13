import RecentlyViewed from "../../../_components/pages/home/RecentlyViewed/RecentlyViewed";
import Trending from "../../../_components/pages/home/Trending/Trending";
import LandingHero from "@/app/_components/pages/home/Hero/LandingHero";
import Recommended from "@/app/_components/pages/home/Recommended/Recommended";
import Newest from "@/app/_components/pages/home/Newest/Newest";
import Reviews from "@/app/_components/pages/home/Reviews/Reviews";
import Statistics from "@/app/_components/pages/home/Statistics/Statistics";

export default function Home() {
  return (
    <div className="px-6">
      <LandingHero />
      {/* <RecentlyViewed/> */}
      <Recommended />
      <Newest />
      {/* <Trending/>*/}
      <Reviews />
      <Statistics />
    </div>
  );
}
