import { useMutation } from "@tanstack/react-query";
import {
  AddReserveTimeToBasketModel,
  AddReserveTimeToBasketOptions,
  AddReserveTimeToBasketResult,
  SideDatesOptions,
  SideDatesRequestModel,
  SideDatesResult,
  TimeSlotBySalonServiceWorkerDateIdOptions,
  TimeSlotBySalonServiceWorkerDateIdRequestModel,
  TimeSlotBySalonServiceWorkerDateIdResult,
} from "./selectTime.types";
import { postRequest } from "@/core/http-service/http-service";

// get calender
const getSideDates = (model: SideDatesRequestModel): Promise<SideDatesResult> =>
  postRequest<SideDatesRequestModel, SideDatesResult>(
    "/api/side_dates.php",
    model
  );

export const useSideDates = ({ onSuccess, onError }: SideDatesOptions) => {
  const { mutate, isPending, data } = useMutation({
    mutationFn: (model: SideDatesRequestModel) => getSideDates(model),
    onSuccess: onSuccess,
    onError: onError,
  });

  return {
    mutate,
    isPending,
    data,
  };
};

// get Time list
const getTimeSlotBySalonServiceWorkerDateId = (
  model: TimeSlotBySalonServiceWorkerDateIdRequestModel
): Promise<TimeSlotBySalonServiceWorkerDateIdResult> =>
  postRequest<
    TimeSlotBySalonServiceWorkerDateIdRequestModel,
    TimeSlotBySalonServiceWorkerDateIdResult
  >("/api/worker_times.php", model);

export const useTimeSlotBySalonServiceWorkerDateId = ({
  onSuccess,
  onError,
}: TimeSlotBySalonServiceWorkerDateIdOptions) => {
  const { mutate, isPending, data } = useMutation({
    mutationFn: (model: TimeSlotBySalonServiceWorkerDateIdRequestModel) =>
      getTimeSlotBySalonServiceWorkerDateId(model),
    onSuccess: onSuccess,
    onError: onError,
  });

  return {
    mutate,
    isPending,
    data,
  };
};

// add reserved time to basket
const addReserveTimeToBasket = (
  model: AddReserveTimeToBasketModel
): Promise<AddReserveTimeToBasketResult> =>
  postRequest<AddReserveTimeToBasketModel, AddReserveTimeToBasketResult>(
    "/api/basket/reg_order.php",
    model
  );

export const useAddReserveTimeToBasket = ({
  onSuccess,
  onError,
}: AddReserveTimeToBasketOptions) => {
  const { mutate, isPending, data } = useMutation({
    mutationFn: (model: AddReserveTimeToBasketModel) =>
      addReserveTimeToBasket(model),
    onSuccess: onSuccess,
    onError: onError,
  });

  return {
    mutate,
    isPending,
    data,
  };
};
