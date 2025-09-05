"use client";
import { Badge, Button } from "antd";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { BiHeart, BiMapPin, BiShare } from "react-icons/bi";
import { IoIosStar } from "react-icons/io";
import { useSalonDetail } from "./_api/salonDetail";
import {
  SalonDetailDataType,
  SalonDetailResult,
} from "./_api/salonDetail.types";
import CustomButton from "@/app/_components/core/antdComponents/CustomButton/CustomButton";

const x = {
  ID: "1001",
  province: "سمنان",
  city: "شاهرود",
  working_time: {
    saturday: {
      shift1_start: "09:00:00",
      shift1_end: "13:00:00",
      shift2_start: "16:00:00",
      shift2_end: "21:00:00",
      is_shift1_closed: false,
      is_shift2_closed: false,
      is_day_closed: false,
    },
    sunday: {
      shift1_start: "09:00:00",
      shift1_end: "13:00:00",
      shift2_start: "16:00:00",
      shift2_end: "21:00:00",
      is_shift1_closed: false,
      is_shift2_closed: false,
      is_day_closed: false,
    },
    monday: {
      shift1_start: "09:00:00",
      shift1_end: "13:00:00",
      shift2_start: "16:00:00",
      shift2_end: "21:00:00",
      is_shift1_closed: false,
      is_shift2_closed: false,
      is_day_closed: false,
    },
    tuesday: {
      shift1_start: "09:00:00",
      shift1_end: "13:00:00",
      shift2_start: "16:00:00",
      shift2_end: "21:00:00",
      is_shift1_closed: false,
      is_shift2_closed: false,
      is_day_closed: false,
    },
    wednesday: {
      shift1_start: "09:00:00",
      shift1_end: "13:00:00",
      shift2_start: "16:00:00",
      shift2_end: "21:00:00",
      is_shift1_closed: false,
      is_shift2_closed: false,
      is_day_closed: false,
    },
    thursday: {
      shift1_start: "09:00:00",
      shift1_end: "13:00:00",
      shift2_start: "16:00:00",
      shift2_end: "21:00:00",
      is_shift1_closed: false,
      is_shift2_closed: false,
      is_day_closed: false,
    },
    friday: {
      shift1_start: null,
      shift1_end: null,
      shift2_start: null,
      shift2_end: null,
      is_shift1_closed: true,
      is_shift2_closed: true,
      is_day_closed: true,
    },
  },
  calendar_holidays: "0",
  location: "3645' 4594'",
  type: "1",
  area: "18",
  line: "3",
  moving: "0",
  floor: "0",
  elevator: "0",
  child_state: "1",
  wheel: "0",
  cooling: "1",
  heating: "1",
  magazine: "1",
  toy: "1",
  h_water: "1",
  tv: "1",
  music: "0",
  park_space: "1",
  drink: "0",
  bisexual: "0",
  animal: "0",
  dirt: "0",
  dull: "1",
  tolerance: "10",
  social_network: "",
  Reserved_appointments: [
    {
      ID: "1",
      service: "اصلاح ساده سر",
      worker_id: "5",
      date: "1404.06.13",
      start_time: "19:15:00",
      end_time: "19:35:00",
      service_duration: "20",
      tolerance: "8",
    },
  ],
};

const categories = [
  "Featured",
  "Hair Care",
  "Beard Care",
  "Color",
  "Face Care",
];

const openingTimes = [
  { day: "Monday", open: "09:00", close: "20:00", openStatus: true },
  { day: "Tuesday", open: "09:00", close: "20:00", openStatus: true },
  { day: "Wednesday", open: "09:00", close: "20:00", openStatus: true },
  { day: "Thursday", open: "09:00", close: "20:00", openStatus: true },
  { day: "Friday", open: "09:00", close: "20:00", openStatus: true },
  { day: "Saturday", open: "09:00", close: "18:00", openStatus: true },
  { day: "Sunday", openStatus: false },
];

const additionalInfo = [
  { icon: "check", label: "Instant Confirmation" },
  { icon: "creditCard", label: "Pay by app" },
  { icon: "pet", label: "Pet-friendly" },
  { icon: "kid", label: "Kid-friendly" },
  { icon: "wheelchair", label: "Wheelchair accessible" },
  { icon: "bus", label: "Near public transport" },
  { icon: null, label: "LGBTQ+" },
  { icon: null, label: "Woman-owned" },
  { icon: null, label: "Hispanic-owned" },
];

const icons = {
  check: (
    <svg
      className="w-5 h-5 text-black"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  ),
  creditCard: (
    <svg
      className="w-5 h-5 text-black"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="20" height="14" x="2" y="5" rx="2" ry="2" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M2 10h20" />
    </svg>
  ),
  pet: (
    <svg
      className="w-5 h-5 text-black"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Paw print icon */}
      <circle cx="9" cy="9" r="2" />
      <circle cx="15" cy="9" r="2" />
      <circle cx="12" cy="12" r="2" />
      <circle cx="9" cy="15" r="2" />
      <circle cx="15" cy="15" r="2" />
    </svg>
  ),
  kid: (
    <svg
      className="w-5 h-5 text-black"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Smiley face */}
      <circle cx="12" cy="12" r="10" />
      <path d="M8 14s1.5 2 4 0" />
      <circle cx="9" cy="10" r="1" />
      <circle cx="15" cy="10" r="1" />
    </svg>
  ),
  wheelchair: (
    <svg
      className="w-5 h-5 text-black"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Wheelchair icon simplified */}
      <circle cx="15" cy="15" r="4" />
      <path d="M11 12l-2-3" />
      <path d="M4 12h7l5 8" />
      <circle cx="7" cy="17" r="3" />
    </svg>
  ),
  bus: (
    <svg
      className="w-5 h-5 text-black"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Bus icon */}
      <rect x="3" y="7" width="18" height="10" rx="2" ry="2" />
      <circle cx="7.5" cy="17.5" r="1.5" />
      <circle cx="16.5" cy="17.5" r="1.5" />
    </svg>
  ),
};

const SalonDetail = () => {
  const [data, setData] = useState<SalonDetailDataType | null>(null);
  const [activeCategory, setActiveCategory] = useState("Featured");

  const searchParams = useSearchParams();
  const queryParams = Object.fromEntries(searchParams.entries());

  const { mutate: getDetail, isPending: isGetDetailLoading } = useSalonDetail({
    onSuccess: salonDetailOnSuccess,
  });

  useEffect(() => {
    getDetail({
      id: "1001",
    });
  }, []);

  function salonDetailOnSuccess(res: SalonDetailResult) {
    setData(res?.salon[0]);
  }

  const reviewCount = 3061;
  const status = "Closed";
  const openingTime = "09:00";

  return (
    <div className="p-8 flex flex-col gap-8">
      <div className="max-w-4xl rounded-lg overflow-hidden">
        {/* Header */}
        <div className="p-6 pb-4">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-3xl mb-2">{data?.title}</h1>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center gap-1">
                  {data?.score &&
                    Array.from({ length: Math.ceil(+data?.score) }, (_, i) => (
                      <IoIosStar key={i} className="w-4 h-4" />
                    ))}
                </div>
                <span className="text-lg">{data?.score}</span>
                <span className="text-blue-600 hover:underline cursor-pointer">
                  ({reviewCount.toLocaleString()})
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 mb-1">
                <span className="bg-red-100 text-red-600 hover:bg-red-100">
                  {status}
                </span>
                <span>- باز از {openingTime}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <span>{data?.address}</span>
                <CustomButton type="link" ghost>
                  مسیر‌یابی
                </CustomButton>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="border border-neutral-400 p-1 rounded-full">
                <BiShare className="w-5 h-5" />
              </span>
              <span className="border border-neutral-400 p-1 rounded-full">
                <BiHeart className="w-5 h-5" />
              </span>
            </div>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 p-6">
          {/* Left big image */}
          <div className="md:col-span-2">
            <Image
              src={`https://be-nobat.ir/images/${data?.pic}`}
              alt="Main"
              width={800}
              height={600}
              className="w-full h-full object-cover rounded-xl"
            />
          </div>

          {/* Right side images */}
          <div className="flex flex-col gap-2 md:gap-4">
            <Image
              //   src={`https://be-nobat.ir/images/${data?.images[0]}`}
              src={`https://be-nobat.ir/images/${data?.pic}`}
              alt="Top"
              width={400}
              height={300}
              className="w-full h-1/2 object-cover rounded-xl"
            />

            <div className="relative">
              <Image
                //   src={`https://be-nobat.ir/images/${data?.images[1]}`}
                src={`https://be-nobat.ir/images/${data?.pic}`}
                alt="Top"
                width={400}
                height={300}
                className="w-full object-cover rounded-xl"
              />
              {/* Overlay button */}
              <CustomButton className="absolute bottom-3 right-3 bg-white/80 hover:bg-white text-gray-800 text-sm font-medium px-3 py-1.5 rounded-lg shadow-md transition">
                See all images
              </CustomButton>
            </div>
          </div>
        </div>

        {/* Services */}
        <section className="max-w-3xl mx-auto px-6 py-8 ">
          <h2 className="text-xl font-semibold mb-4">سرویس ها</h2>

          {/* Categories */}
          <div className="flex flex-wrap gap-4 mb-6">
            {categories.map((category) => (
              <CustomButton
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
                  activeCategory === category
                    ? "bg-neutral-9 text-white"
                    : "bg-transparent text-gray-700 hover:text-black"
                }`}
              >
                {category}
              </CustomButton>
            ))}
          </div>

          {/* Services list */}
          <div className="space-y-4">
            {data?.services.map((service) => (
              <div
                key={service.ID}
                className="flex justify-between items-center border rounded-xl border-neutral-200 p-4 hover:shadow-sm transition"
              >
                <div>
                  <h3 className="font-medium">{service.service}</h3>
                  <p className="text-sm text-gray-500">
                    {service.duration} دقیقه
                  </p>
                  <p className="text-sm font-medium mt-1">{service.price}</p>
                </div>
                <CustomButton className="px-4 py-1.5 border rounded-full border-neutral-200  text-sm font-medium hover:bg-gray-100 transition">
                  رزرو
                </CustomButton>
              </div>
            ))}
          </div>
        </section>

        {/* Teams */}
        <section className="max-w-4xl mx-auto px-6 py-10">
          <h2 className="text-xl font-semibold mb-8">تیم</h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 justify-items-center">
            {data?.team.map((member) => (
              <div
                key={member.ID}
                className="flex flex-col items-center text-center"
              >
                <div className="relative">
                  <Image
                    src={`https://be-nobat.ir/images/${data?.pic}`}
                    alt={member.worker_name}
                    width={117}
                    height={117}
                    className="w-28 h-28 rounded-full object-cover"
                  />
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-white border rounded-full border-neutral-200  px-2 py-0.5 text-xs font-medium flex items-center shadow">
                    ⭐ {5}
                  </div>
                </div>
                <p className="mt-6 font-medium">{member.worker_name}</p>
                <p className="text-sm text-gray-500">{member.bio}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Comments */}
        <section className="max-w-4xl mx-auto px-6 py-10">
          {/* Header */}
          <div className="mb-6">
            <h2 className="font-bold text-lg mb-1">نظرات</h2>
            <div className="flex items-center space-x-1 mb-1">
              {[...Array(5)].map((_, i) => (
                <IoIosStar key={i} className="w-4 h-4" />
              ))}
            </div>
            <div className="flex items-center gap-1 space-x-1 text-sm font-semibold">
              <span>5.0</span>
              <span className="text-blue-700 hover:underline">
                (data?.CommentCount)
              </span>
            </div>
          </div>

          {/* Reviews Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {data?.comments?.map((item) => (
              <div key={item?.ID}>
                <div className="flex items-center gap-2 space-x-3 mb-1">
                  <Image
                    src={`https://be-nobat.ir/images/${data?.pic}`}
                    alt={item?.full_name}
                    width={80}
                    height={80}
                    className="w-[80px] h-[80px] rounded-full object-cover"
                  />

                  <div>
                    <p className="font-semibold text-sm">{item?.full_name}</p>
                    <p className="text-xs text-gray-400">{item?.date}</p>
                  </div>
                </div>
                <div className="flex space-x-0.5 mb-1">
                  {[...Array(Math.ceil(+item?.avrage_score))].map((_, i) => (
                    <IoIosStar key={i} className="w-4 h-4" />
                  ))}
                </div>
                <p className="font-bold text-sm">{item?.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Aboutt*/}
        <section className="flex flex-col gap-1 px-6 py-10">
          <h2 className="font-bold text-lg mb-1">درباره ما</h2>
          <p className="text-base">{data?.about}</p>
        </section>

        {/* Opening time and additional info */}
        <div className="max-w-4xl mx-auto p-6 flex flex-col md:flex-row md:gap-20 gap-10">
          {/* Opening times */}
          <div>
            <h3 className="font-semibold mb-4">ساعات کاری</h3>
            <ul>
              {openingTimes.map(({ day, open, close, openStatus }) => (
                <li
                  key={day}
                  className="flex items-center justify-between mb-1 text-sm"
                >
                  <div className="flex items-center space-x-2">
                    <span
                      className={`w-3 h-3 rounded-full ${
                        openStatus ? "bg-green-500" : "bg-gray-400"
                      }`}
                      aria-hidden="true"
                    ></span>
                    <span
                      className={`${
                        openStatus ? "text-black" : "text-gray-400"
                      } font-medium`}
                    >
                      {day}
                    </span>
                  </div>
                  <span
                    className={`${
                      openStatus ? "text-black" : "text-gray-400"
                    } font-medium`}
                  >
                    {openStatus ? `${open} – ${close}` : "Closed"}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Additional information */}
          <div className="max-w-xs">
            <h3 className="font-semibold mb-4">Additional information</h3>
            <ul className="space-y-2 text-sm">
              {additionalInfo.map(({ icon, label }) => (
                <li key={label} className="flex items-center space-x-2">
                  {icon && icons[icon]}
                  <span>{label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalonDetail;
