import { postRequest } from "@/core/http-service/http-service";
import {
  SalonListOptions,
  SalonListRequestModel,
  SalonListResult,
} from "./home.types";
import { useMutation } from "@tanstack/react-query";

// get Salon list
const getSalonList = (model: SalonListRequestModel): Promise<SalonListResult> =>
  postRequest<SalonListRequestModel, SalonListResult>(
    "/api/salon_card.php",
    model
  );

export const useSalonList = ({ onSuccess, onError }: SalonListOptions) => {
  const { mutate, isPending, data } = useMutation({
    mutationFn: (model: SalonListRequestModel) => getSalonList(model),
    onSuccess: onSuccess,
    onError: onError,
  });

  return {
    mutate,
    isPending,
    data,
  };
};
