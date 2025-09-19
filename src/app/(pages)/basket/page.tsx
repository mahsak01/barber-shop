"use client";
import React, { useEffect, useState } from "react";
import { useBasketData, useBasketInPersonConfirm, useBasketItemDetail, useDeleteBaskeItem } from "./_api/basket";
import { BasketDataResult, BasketDataType, BasketItemDetailResult } from "./_api/basket.types";
import CustomButton from "@/app/_components/core/antdComponents/CustomButton/CustomButton";
import { Modal, Radio } from "antd";
import { PiDivideDuotone, PiEarSlashThin } from "react-icons/pi";
import { FaErlang } from "react-icons/fa6";
import { useRouter } from "next/navigation";

const PAYMENT_TYPE = {
  inPerson: "0",
  online: '1'
}

const Basket = () => {
  const [basketData, setBasketData] = useState<BasketDataType[]>([]);

  const [deleteModalOpen, setDeleteModalOpen] = useState({ id: -1, isOpen: false })
  const [detailModalOpen, setDetailModalOpen] = useState({ id: -1, isOpen: false })
  const [confirmReservationModalOpen, setConfirmReservationModalOpen] = useState(false)
  const [selectPaymentType, setSelectPaymentType] = useState(null)

  const router = useRouter()

  const { mutate: getBasketData, isPending: isGetBasketDataLoading } =
    useBasketData({
      onSuccess: basketDataOnSuccess,
    });

  const { mutate: deleteBasketItem, isPending: isDeleteBasketItemLoading } =
    useDeleteBaskeItem({
      onSuccess: deleteBasketItemOnSuccess,
    });

  const { mutate: basketItemDetail, isPending: isBasketItemDetailLoading } =
    useBasketItemDetail({
      onSuccess: basketItemDetailOnSuccess,
    });

  const { mutate: basketInPersonConfirm, isPending: isBasketInPersonConfirmLoading } =
    useBasketInPersonConfirm({
      onSuccess: basketInPersonConfirmOnSuccess,
    });

  useEffect(() => {
    getBasketData({
      customer_id: "4",
    });
  }, []);

  function basketDataOnSuccess(res: BasketDataResult) {
    setBasketData(res?.basket_items);
  }

  function deleteBasketItemOnSuccess() {
    getBasketData({
      customer_id: "4",
    });

    closeDeleteModalHandler()
  }

  function basketItemDetailOnSuccess(res: BasketItemDetailResult) {
    console.log({ res })
    // setBasketData(res?.basket_items);
  }

  function basketInPersonConfirmOnSuccess() {
    closeConfirmReservationModalHandler()
    router.push("/");
  }

  // Delete
  const openDeleteModalHandler = (id: string) => { setDeleteModalOpen({ id: +id, isOpen: true }) };
  const closeDeleteModalHandler = () => { setDeleteModalOpen({ id: -1, isOpen: false }) };
  const deleteServiceHandler = () => {
    deleteBasketItem({
      customer_id: "4",
      order_id: deleteModalOpen.id?.toString()
    })
  }

  //Detail
  const openDetailModalHandler = (id: string) => {
    setDetailModalOpen({ id: +id, isOpen: true })

    basketItemDetail({
      customer_id: "4",
      order_id: id
    })
  };
  const closeDetailModalHandler = () => { setDetailModalOpen({ id: -1, isOpen: false }) };

  // Confirm reservation
  const openConfirmReservationModalHandler = () => { setConfirmReservationModalOpen(true) };
  const closeConfirmReservationModalHandler = () => { setConfirmReservationModalOpen(false) };
  const confirmReservationHandler = () => {
    if (selectPaymentType === PAYMENT_TYPE.inPerson) {
      basketInPersonConfirm({ customer_id: "4", pay_method: PAYMENT_TYPE.inPerson })
    }

    if (selectPaymentType === PAYMENT_TYPE.online) {

    }
  }

  return (
    <>
      
        {/* Delete */}
        <Modal
          open={deleteModalOpen.isOpen}
          onCancel={closeDeleteModalHandler}
          footer={
            <div className="flex gap-2 justify-end">
              <CustomButton onClick={deleteServiceHandler} loading={isDeleteBasketItemLoading} >
                حذف
              </CustomButton>
              <CustomButton type="primary" onClick={closeDeleteModalHandler} >
                کنسل
              </CustomButton>
            </div>
          }
        >
          <p className="text-lg text-neutral-11">حذف سرویس؟</p>
        </Modal>
        {/* Detail */}
        <Modal
          open={detailModalOpen.isOpen}
          onCancel={closeDetailModalHandler}
          footer={null}
        >
          <p className="text-lg text-neutral-11">جزییات سبد خرید</p>
        </Modal>
        {/* Confirm reservation */}
        <Modal
          open={confirmReservationModalOpen}
          onCancel={closeConfirmReservationModalHandler}
          footer={
            <div className="flex gap-2 justify-end">
              <CustomButton type="primary" onClick={confirmReservationHandler}   >
                تایید
              </CustomButton>
              <CustomButton onClick={closeConfirmReservationModalHandler} >
                کنسل
              </CustomButton>
            </div>
          }
        >
          <div className="flex flex-col gap-6">
            <p className="text-lg text-neutral-11">شیوه پرداخت</p>
            <Radio.Group
              name="paymentType"
              options={[
                {
                  label: "حضوری",
                  value: PAYMENT_TYPE.inPerson
                }, {
                  label: "آنلاین",
                  value: PAYMENT_TYPE.online
                }
              ]}
              onChange={(e) => setSelectPaymentType(e?.target?.value)}
            />
          </div>

        </Modal>
        

        {basketData.length === 0 ? (
          <p className="p-8 text-gray-500">سبد خرید خالی می باشد</p>
        ) : (
          <div className="p-8 flex flex-col gap-6 ">
          <h1 className="text-2xl font-bold ">سبد خرید شما</h1>
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

                <div className="flex gap-2">
                  <CustomButton type="primary" onClick={() => openDetailModalHandler(item.order_id)}>جزییات بیشتر</CustomButton>
                  <CustomButton type="primary" danger onClick={() => openDeleteModalHandler(item.order_id)}>حذف</CustomButton>
                </div>
              </div>
            ))}
          </div>
        <div className="text-end">
          <CustomButton type="primary" onClick={openConfirmReservationModalHandler}>تایید خرید</CustomButton>
        </div>
      </div>
        )}
    </>

  );
};

export default Basket;
