"use client";
import { Badge, Button } from "antd";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { RiScissorsFill } from "react-icons/ri";
import { BiHeart, BiMapPin, BiShare } from "react-icons/bi";
import { PiElevatorLight, PiTelevisionSimpleLight } from "react-icons/pi";
import { FaChildren } from "react-icons/fa6";
import { IoIosStar } from "react-icons/io";
import { TfiWheelchair } from "react-icons/tfi";
import { FiBookOpen } from "react-icons/fi";
import { MdOutlineToys } from "react-icons/md";
import { LuGlassWater } from "react-icons/lu";
import { IoMusicalNotes } from "react-icons/io5";
import { LuCircleParking } from "react-icons/lu";
import { RiDrinks2Fill } from "react-icons/ri";
import { FaTransgender } from "react-icons/fa";
import { PiDogLight } from "react-icons/pi";
import { FiCircle } from "react-icons/fi";
import { useSalonDetail } from "./_api/salonDetail";
import {
  SalonDetailDataType,
  SalonDetailResult,
  SalonServiceType,
  TransferWorkingTimeType,
} from "./_api/salonDetail.types";
import CustomButton from "@/app/_components/core/antdComponents/CustomButton/CustomButton";
import { englishDayToPersianDayConvertor } from "@/utils/global/common";
import { PiFanLight } from "react-icons/pi";
import { GiHeatHaze } from "react-icons/gi";

const SalonDetail = () => {
  const [data, setData] = useState<SalonDetailDataType | null>(null);

  const [services, setServices] = useState<SalonServiceType[]>([]);
  const [activeService, setActiveService] = useState("");

  const [workingTime, setWorkingTime] = useState<TransferWorkingTimeType[]>([]);

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
    setServices(res?.salon[0]?.services);
    setActiveService(res?.salon[0]?.services?.[0]?.service_name);

    const rawWorkingTime = res?.salon?.[0]?.working_time;
    const tempWorkingTimeData: TransferWorkingTimeType[] = [];

    for (const key in rawWorkingTime) {
      tempWorkingTimeData.push({
        day: englishDayToPersianDayConvertor[key],
        ...rawWorkingTime[key],
      });
    }

    setWorkingTime(tempWorkingTimeData);
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
            {services.map((service) => (
              <CustomButton
                key={service?.service_name}
                onClick={() => {
                  if (service?.service_name) {
                    setActiveService(service.service_name);
                  }
                }}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
                  activeService === service?.service_name
                    ? "bg-neutral-9 text-white"
                    : "bg-transparent text-gray-700 hover:text-black"
                }`}
              >
                {service?.service_name}
              </CustomButton>
            ))}
          </div>

          {/* Services list */}
          <div className="space-y-4">
            {services
              ?.find((service) => service.service_name === activeService)
              ?.sub_services?.map((service) => (
                <div
                  key={service.service_id}
                  className="flex justify-between items-center border rounded-xl border-neutral-200 p-4 hover:shadow-sm transition"
                >
                  <div>
                    <h3 className="font-medium">{service.sub_service_name}</h3>
                    <p className="text-sm text-gray-500">
                      {service.duration} دقیقه
                    </p>
                    <p className="text-sm font-medium mt-1">
                      {service.price} هزار تومان
                    </p>
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

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-10 justify-items-center">
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
                    className="w-28 h-28 min-w-28 rounded-full object-cover"
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
        <div className="max-w-4xl mx-auto p-6 flex flex-col  gap-10">
          {/* Opening times */}
          <div>
            <h3 className="font-bold text-lg mb-4">ساعات کاری</h3>
            <ul>
              {workingTime.map((wt) => (
                <li
                  key={wt?.day}
                  className="border-b border-neutral-200 flex items-center gap-5 md:gap-20 mb-1 text-sm"
                >
                  <div className=" min-w-24 flex items-center gap-2">
                    <span
                      className={`w-3 h-3 rounded-full ${
                        !wt?.is_day_closed
                          ? "bg-polar-green-8"
                          : "bg-neutral-400"
                      }`}
                      aria-hidden="true"
                    ></span>
                    <span
                      className={`${
                        !wt?.is_day_closed ? "text-black" : "text-gray-400"
                      } font-medium`}
                    >
                      {wt?.day}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div
                      className={`${
                        !wt?.is_day_closed ? "text-black" : "text-gray-400"
                      } font-medium`}
                    >
                      {!wt?.is_day_closed
                        ? `${wt?.shift1_start} – ${wt?.shift1_end}`
                        : "بسته"}
                    </div>
                    <div
                      className={`${
                        !wt?.is_day_closed ? "text-black" : "text-gray-400"
                      } font-medium`}
                    >
                      {!wt?.is_day_closed
                        ? `${wt?.shift2_start} – ${wt?.shift2_end}`
                        : "بسته"}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Additional information */}
          <div className="max-w-xs">
            <h3 className="font-bold text-lg mb-4">سایر اطلاعات</h3>
            <ul className="space-y-2 text-sm ">
              <li className=" flex items-center gap-5 text-base">
                <RiScissorsFill size={14} />
                <span className="min-w-36 ">سبار</span>
                <span>{data?.moving === "1" ? "بله" : "خیر"}</span>
              </li>
              <li className=" flex items-center gap-5 text-base">
                <PiElevatorLight size={14} />
                <span className="min-w-36 ">آسانسور</span>
                <span>{data?.elevator === "1" ? "دارد" : "ندارد"}</span>
              </li>
              <li className=" flex items-center gap-5 text-base">
                <FaChildren size={14} />
                <span className="min-w-36">پذیرش کودکان</span>
                <span>{data?.child_state === "1" ? "بله" : "خیر"}</span>
              </li>
              <li className=" flex items-center gap-5 text-base">
                <PiTelevisionSimpleLight size={14} />
                <span className="min-w-36">تلویریون</span>
                <span>{data?.tv === "1" ? "دارد" : "ندارد"}</span>
              </li>
              <li className=" flex items-center gap-5 text-base">
                <TfiWheelchair size={14} />
                <span className="min-w-36">مسیر ویلچر</span>
                <span>{data?.wheel === "1" ? "دارد" : "ندارد"}</span>
              </li>
              <li className=" flex items-center gap-5 text-base">
                <PiFanLight size={14} />
                <span className="min-w-36">سیستم سرمایش</span>
                <span>{data?.cooling === "1" ? "دارد" : "ندارد"}</span>
              </li>
              <li className=" flex items-center gap-5 text-base">
                <GiHeatHaze size={14} />
                <span className="min-w-36">سیستم گرمایش</span>
                <span>{data?.heating === "1" ? "دارد" : "ندارد"}</span>
              </li>
              <li className=" flex items-center gap-5 text-base">
                <FiBookOpen size={14} />
                <span className="min-w-36">مجله</span>
                <span>{data?.magazine === "1" ? "دارد" : "ندارد"}</span>
              </li>
              <li className=" flex items-center gap-5 text-base">
                <MdOutlineToys size={14} />
                <span className="min-w-36">اسباب بازی کودکان</span>
                <span>{data?.toy === "1" ? "دارد" : "ندارد"}</span>
              </li>
              <li className=" flex items-center gap-5 text-base">
                <LuGlassWater size={14} />
                <span className="min-w-36">آب گرم</span>
                <span>{data?.h_water === "1" ? "دارد" : "ندارد"}</span>
              </li>
              <li className=" flex items-center gap-5 text-base">
                <IoMusicalNotes size={14} />
                <span className="min-w-36">موریک</span>
                <span>{data?.music === "1" ? "دارد" : "ندارد"}</span>
              </li>
              <li className=" flex items-center gap-5 text-base">
                <LuCircleParking size={14} />
                <span className="min-w-36">جای پارک خودرو</span>
                <span>{data?.park_space === "1" ? "دارد" : "ندارد"}</span>
              </li>
              <li className=" flex items-center gap-5 text-base">
                <RiDrinks2Fill size={14} />
                <span className="min-w-36">پذیرایی از مشتری</span>
                <span>{data?.drink === "1" ? "دارد" : "ندارد"}</span>
              </li>
              <li className=" flex items-center gap-5 text-base">
                <FaTransgender size={14} />
                <span className="min-w-36">پذیرش ترنس</span>
                <span>{data?.bisexual === "1" ? "بله" : "خیر"}</span>
              </li>
              <li className=" flex items-center gap-5 text-base">
                <PiDogLight size={14} />
                <span className="min-w-36">امکات بردن حیوانات خانگی</span>
                <span>{data?.animal === "1" ? "دارد" : "ندارد"}</span>
              </li>
              <li className=" flex items-center gap-5 text-base">
                <FiCircle size={14} />
                <span className="min-w-36">پذیرش موی چرب یا شپشی</span>
                <span>{data?.dirt === "1" ? "بله" : "خیر"}</span>
              </li>
              <li className=" flex items-center gap-5 text-base">
                <FiCircle size={14} />
                <span className="min-w-36">پذیرش افراد کند ذهن</span>
                <span>{data?.dull === "1" ? "بله" : "خیر"}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalonDetail;
