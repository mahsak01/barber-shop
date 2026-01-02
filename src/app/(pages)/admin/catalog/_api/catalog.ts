import { postRequest } from "@/core/http-service/http-service";
import { useMutation } from "@tanstack/react-query";
import {
  ServicesListOptions,
  ServicesListRequestModel,
  ServicesListResult,
} from "./catalog.types";

// get services list list
const getServicesList = (
  model: ServicesListRequestModel
): Promise<ServicesListResult> =>
  postRequest<ServicesListRequestModel, ServicesListResult>(
    "/api/salon_moderate/get_all_service.php",
    model
  );

export const useServicesList = ({
  onSuccess,
  onError,
}: ServicesListOptions) => {
  const { mutate, isPending, data } = useMutation({
    mutationFn: (model: ServicesListRequestModel) => getServicesList(model),
    onSuccess: onSuccess,
    onError: onError,
  });

  return {
    mutate,
    isPending,
    data,
  };
};
