import Image from "next/image";
import React from "react";
import { ServiceCardProps } from "./serviceCard.types";
import { useRouter } from "next/navigation";

const ServiceCard = ({
  title,
  img,
  score,
  votes,
  address,
  tags,
  id
}: ServiceCardProps) => {
  const router = useRouter()


  return (
    <div className="max-w-[350px] cursor-pointer rounded-lg " onClick={()=> router.push(`/detail?id=${id}`)}>
      <Image
        src={`https://be-nobat.ir/images/${img}`}
        alt={title}
        className="w-full h-48 object-cover rounded-[15px]"
        width={220}
        height={123}
      />

      <div className="p-4 text-neutral-11">
  <div className="flex justify-between items-start mb-2">
    <h2 className="text-lg font-semibold text-right">{title}</h2>

    <div className="flex items-center gap-1 text-sm">
      <span className="text-yellow-400 text-base">⭐</span>
      <span className="font-semibold">{score}</span>
      {votes && (
        <span className="text-gray-500">({votes})</span>
      )}
    </div>
  </div>

  <p className="text-gray-600 text-sm mb-3 text-right">
    {address}
  </p>

  {tags && (
    <span className="inline-block rounded-2xl px-2 py-0.5 text-xs border border-neutral-200">
      {tags}
    </span>
  )}
</div>

    </div>
  );
};

export default ServiceCard;
