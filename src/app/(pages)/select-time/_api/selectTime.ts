import { useMutation } from "@tanstack/react-query";
import { TimeSlotBySalonServiceWorkerDateIdOptions, TimeSlotBySalonServiceWorkerDateIdRequestModel, TimeSlotBySalonServiceWorkerDateIdResult } from "./selectTime.types";
import { postRequest } from "@/core/http-service/http-service";

// get Time list
const getTimeSlotBySalonServiceWorkerDateId= (
  model: TimeSlotBySalonServiceWorkerDateIdRequestModel
): Promise<TimeSlotBySalonServiceWorkerDateIdResult> =>
  postRequest<TimeSlotBySalonServiceWorkerDateIdRequestModel, TimeSlotBySalonServiceWorkerDateIdResult>(
    "/api/worker_times.php",
    model
  );

export const useTimeSlotBySalonServiceWorkerDateId = ({ onSuccess, onError }: TimeSlotBySalonServiceWorkerDateIdOptions) => {
  const { mutate, isPending, data } = useMutation({
    mutationFn: (model: TimeSlotBySalonServiceWorkerDateIdRequestModel) => getTimeSlotBySalonServiceWorkerDateId(model),
    onSuccess: onSuccess,
    onError: onError,
  });

  return {
    mutate,
    isPending,
    data,
  };
};