import { postRequest } from "@/core/http-service/http-service";
import { useMutation } from "@tanstack/react-query";
import {
  ClientsListOptions,
  ClientsListRequestModel,
  ClientsListResult,
} from "./clients.types";

// get clients list
const getClientsList = (
  model: ClientsListRequestModel
): Promise<ClientsListResult> =>
  postRequest<ClientsListRequestModel, ClientsListResult>(
    "/api/salon_moderate/get_customers.php",
    model
  );

export const useClientsList = ({ onSuccess, onError }: ClientsListOptions) => {
  const { mutate, isPending, data } = useMutation({
    mutationFn: (model: ClientsListRequestModel) => getClientsList(model),
    onSuccess: onSuccess,
    onError: onError,
  });

  return {
    mutate,
    isPending,
    data,
  };
};
