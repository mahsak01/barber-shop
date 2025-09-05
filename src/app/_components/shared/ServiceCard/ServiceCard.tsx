import Image from "next/image";
import React from "react";
import { ServiceCardProps } from "./serviceCard.types";

const ServiceCard = ({
  title,
  img,
  score,
  votes,
  address,
  tags,
}: ServiceCardProps) => {
  return (
    <div className="max-w-[250px] rounded-lg overflow-hidden shadow-md bg-white ">
      <Image
        src={`https://be-nobat.ir/images/${img}`}
        alt={title}
        className="w-full h-48 object-cover"
        width={220}
        height={123}
      />
      <div className="p-4 text-neutral-11">
        <h2 className="text-lg font-semibold mb-1 ">{title}</h2>
        <div className="flex items-center mb-2">
          <span className="mr-1">&#9733;</span>
          <span className="font-semibold">{score}</span>
          {votes && <span className="text-gray-500 ml-2">({votes})</span>}
        </div>
        <p className="text-gray-600 text-sm mb-3">{address}</p>
        {tags && (
          <span className="rounded-2xl px-2 text-xs border border-neutral-200">
            {tags}
          </span>
        )}
      </div>
    </div>
  );
};

export default ServiceCard;
