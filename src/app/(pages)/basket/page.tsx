"use client";
import React, { useEffect, useState } from "react";
import { useBasketData } from "./_api/basket";
import { BasketDataResult, BasketDataType } from "./_api/basket.types";
import { BiTrash } from "react-icons/bi";
import CustomButton from "@/app/_components/core/antdComponents/CustomButton/CustomButton";

const Basket = () => {
  const [basketData, setBasketData] = useState<BasketDataType[]>([]);

  const { mutate: getBasketData, isPending: isGetBasketDataLoading } =
    useBasketData({
      onSuccess: salonBasketDataOnSuccess,
    });

  useEffect(() => {
    getBasketData({
      customer_id: "4",
    });
  }, []);

  function salonBasketDataOnSuccess(res: BasketDataResult) {
    setBasketData(res?.basket_items);
  }

  const handleDelete = (id: string) => {};

  return (
    <div className="p-8 flex flex-col gap-6 ">
      <h1 className="text-2xl font-bold ">سبد خرید شما</h1>

      {basketData.length === 0 ? (
        <p className="text-gray-500">سبد خرید خالی می باشد</p>
      ) : (
        <div className="space-y-4">
          {basketData.map((item) => (
            <div
              key={item.order_id}
              className="flex justify-between items-end  rounded-2xl shadow-xl p-4 hover:shadow-md transition"
            >
              <div className="flex flex-col gap-2">
                <div className="text-sm text-neutral-11">
                  نوع خدمت:{" "}
                  <span className="text-lg text-neutral-11">
                    {item.service_name} ({item.sub_service})
                  </span>
                </div>
                <div className="text-sm text-neutral-11">
                  نام سالن:{" "}
                  <span className="text-lg text-neutral-11">
                    {item.salon_name}
                  </span>
                </div>
                <div className="text-sm text-neutral-11">
                  مسئول خدمت:{" "}
                  <span className="text-lg text-neutral-11">
                    {item.worker_name}
                  </span>
                </div>
                <div className="text-sm text-neutral-11">
                  تاریخ:{" "}
                  <span className="text-base text-neutral-11">
                    {item.date} | {item.start_time} - {item.end_time}
                  </span>
                </div>
                <p className="text-base font-bold text-indigo-600 mt-2">
                  {Number(item.price).toLocaleString()} ریال
                </p>
              </div>

              <div
                onClick={() => handleDelete(item.order_id)}
                className="cursor-pointer"
              >
                <BiTrash color="#c12f0d" size={24} />
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="text-end">
        <CustomButton type="primary">تایید خرید</CustomButton>
      </div>
    </div>
  );
};

export default Basket;
