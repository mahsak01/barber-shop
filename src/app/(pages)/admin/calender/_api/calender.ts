import { postRequest } from "@/core/http-service/http-service";
import {
  GetAppointmentsOptions,
  GetAppointmentsRequestModel,
  GetAppointmentsResult,
} from "./calender.types";
import { useMutation } from "@tanstack/react-query";

// get appointments
const getAppointments = (
  model: GetAppointmentsRequestModel
): Promise<GetAppointmentsResult> =>
  postRequest<GetAppointmentsRequestModel, GetAppointmentsResult>(
    "/api/salon_moderate/turns_for_calendar.php",
    model
  );

export const useGetAppointments = ({
  onSuccess,
  onError,
}: GetAppointmentsOptions) => {
  const { mutate, isPending, data } = useMutation({
    mutationFn: (model: GetAppointmentsRequestModel) => getAppointments(model),
    onSuccess: onSuccess,
    onError: onError,
  });

  return {
    mutate,
    isPending,
    data,
  };
};
