"use client";
import React, { useEffect, useState } from 'react'
import { useUserReservedData } from './_api/userReservation';
import { UserReservedDataResult, UserReservedDataType } from './_api/userReservation.types';
import { PAYMENT_METHOD_STATUS_TITLE } from '@/utils/business/businessUtil';

const UserReservation = () => {
    const [reservData, setReserveData] = useState<UserReservedDataType[]>([])

    const { mutate: getUserReservedData, isPending: isGetUserReservedDataLoading } =
        useUserReservedData({
            onSuccess: userReservedDataOnSuccess,
        });

    function userReservedDataOnSuccess(res: UserReservedDataResult) {
        setReserveData(res?.all_turns)
    }

    useEffect(() => {
        getUserReservedData({
            customer_id: "4",
        });
    }, []);

    return (
        <div className="p-8 flex flex-col gap-6 ">
            <h1 className="text-2xl font-bold ">رزرو های شما</h1>
            <div className="max-w-6xl mx-auto p-4 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {reservData.map((item) => (
                    <div className="bg-white shadow-md rounded-lg p-5 flex flex-col sm:flex-row justify-between gap-4">
                        <div className="flex flex-col space-y-1">
                            <h2 className="text-lg font-semibold text-gray-800">{item?.salon_name}</h2>
                            <p className="text-gray-600 text-sm">{item?.salon_address}</p>
                        </div>

                        <div className="flex flex-col space-y-1">
                            <p><span className="font-semibold">خدمت:</span> {item?.service_name} - {item?.sub_service}</p>
                            <p><span className="font-semibold">خدمت دهنده:</span> {item?.worker_name}</p>
                            <p><span className="font-semibold">مشتری:</span> {item?.customer_name}</p>
                        </div>

                        <div className="flex flex-col space-y-1">
                            <p><span className="font-semibold">تاریخ:</span> {item?.date}</p>
                            <p><span className="font-semibold">ساعت:</span> {item?.start_time} - {item?.end_time}</p>
                            <p><span className="font-semibold">تاریخ ثبت رزرو:</span> {item?.created_time}</p>
                        </div>

                        <div className="flex flex-col space-y-1 text-right">
                            <p><span className="font-semibold">قیمت:</span> {item?.price.toLocaleString()} تومان</p>
                            <p><span className="font-semibold">شیوه پرداخت:</span> {PAYMENT_METHOD_STATUS_TITLE[item?.pay_state]}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default UserReservation   