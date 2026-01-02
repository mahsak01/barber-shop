import { postRequest } from "@/core/http-service/http-service";
import { useMutation } from "@tanstack/react-query";
import {
  CreateNewClientOptions,
  CreateNewClientRequestModel,
  CreateNewClientResult,
} from "./addClient.types";

// create new client
const createNewClient = (
  model: CreateNewClientRequestModel
): Promise<CreateNewClientResult> =>
  postRequest<CreateNewClientRequestModel, CreateNewClientResult>(
    "/api/salon_moderate/add_customer.php",
    model,
    false,
    { "Content-Type": "multipart/form-data" } as any
  );

export const useCreateNewClient = ({
  onSuccess,
  onError,
}: CreateNewClientOptions) => {
  const { mutate, isPending, data } = useMutation({
    mutationFn: (model: CreateNewClientRequestModel) => createNewClient(model),
    onSuccess: onSuccess,
    onError: onError,
  });

  return {
    mutate,
    isPending,
    data,
  };
};
