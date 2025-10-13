import { postRequest } from "@/core/http-service/http-service";
import { useMutation } from "@tanstack/react-query";
import {
  SalonDetailOptions,
  SalonDetailRequestModel,
  SalonDetailResult,
} from "./salonDetail.types";

// get Salon list
const getSalonDetail = (
  model: SalonDetailRequestModel
): Promise<SalonDetailResult> =>
  postRequest<SalonDetailRequestModel, SalonDetailResult>(
    "/api/salon_detail.php",
    model
  );

export const useSalonDetail = ({ onSuccess, onError }: SalonDetailOptions) => {
  const { mutate, isPending, data } = useMutation({
    mutationFn: (model: SalonDetailRequestModel) => getSalonDetail(model),
    onSuccess: onSuccess,
    onError: onError,
  });

  return {
    mutate,
    isPending,
    data,
  };
};
