import Image from "next/image";
import React from "react";
import { IoIosStar } from "react-icons/io";
import { FaArrowLeftLong } from "react-icons/fa6";
import { SearchSalonDataType } from "@/app/(pages)/search/_api/searchResult.types";

const services = [
  { name: "خدمات وکس – گوش و بینی", price: "10", time: "5 دقیقه" },
  {
    name: "رنگ ریش + اصلاح ریش",
    price: "75",
    time: "30 دقیقه - 45 دقیقه",
  },
  { name: "خدمات ابرو", price: "42", time: "20 دقیقه" },
  {
    name: "مدل موی استاندارد",
    price: "49",
    time: "30 دقیقه - 45 دقیقه",
  },
];

const ProductCard = ({data}:{data: SearchSalonDataType}) => {
  return (
    <div className="max-w-sm bg-white rounded-lg shadow-md overflow-hidden">
      {/* Image placeholder */}
      <Image
        src={`https://be-nobat.ir/images/${data?.pic}`}
        alt={data?.title}
        width={394}
        height={242}
        className="w-full"
      />

      {/* Content */}
      <div className="p-4">
        {/* Title and rating */}
        <h2 className="text-lg font-semibold mb-2 text-neutral-900">
         {data?.title}
        </h2>
        <div className="flex items-center gap-4 mb-2">
          <div className="flex">
            {Array(Math.ceil(+data?.score))
              .fill(0)
              .map((_, i) => (
                <IoIosStar size={16} color="var(--warning-400)" />
              ))}
          </div>
          <span className="text-gray-500 text-sm">({data?.CommentCount})</span>
        </div>

        {/* Address */}
        <p className="text-sm mb-3 truncate text-neutral-11">
          {data?.address}
        </p>
        <hr className="my-2 text-neutral-200 " />
        {/* Services */}
        <div className="space-y-3">
          {services.map(({ name, price, time }) => (
            <div key={name} className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-neutral-11">{name}</p>
                <p className="text-xs text-neutral-11">{time}</p>
              </div>
              <p className="text-xs font-semibold text-neutral-11">
                از {price} هزار تومان{" "}
              </p>
            </div>
          ))}
        </div>

        {/* See all services link */}
        <div className="flex justify-end gap-2 items-center cursor-pointer text-primary-7 hover:text-primary-6 mt-4 ">
          <span className="text-sm font-semibold">
            دیدن تمامی سرویس ها
          </span>
          <FaArrowLeftLong size={12} />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
