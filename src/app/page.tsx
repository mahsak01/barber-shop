import Image from "next/image";
import LandingHero from "./_components/pages/home/Hero/LandingHero";
import RecentlyViewed from "./_components/pages/home/RecentlyViewed/RecentlyViewed";
import Recommended from "./_components/pages/home/Recommended/Recommended";
import Newest from "./_components/pages/home/Newest/Newest";
import Trending from "./_components/pages/home/Trending/Trending";
import Reviews from "./_components/pages/home/Reviews/Reviews";
import Statistics from "./_components/pages/home/Statistics/Statistics";

export default function Home() {
  return (
  <div className="px-6" >
    <LandingHero/>
    {/* <RecentlyViewed/> */}
    <Recommended/>
    <Newest/>
    {/* <Trending/>*/}
    <Reviews/>
    <Statistics/> 
  </div>
  );
}
