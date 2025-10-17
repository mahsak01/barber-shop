import { postRequest } from "@/core/http-service/http-service";
import { useMutation } from "@tanstack/react-query";
import {
  CreateNewWorkerOptions,
  CreateNewWorkerRequestModel,
  CreateNewWorkerResult,
} from "./addWorker.types";

// create new worker
const createNewWorker = (
  model: CreateNewWorkerRequestModel
): Promise<CreateNewWorkerResult> =>
  postRequest<CreateNewWorkerRequestModel, CreateNewWorkerResult>(
    "/api/salon_moderate/add_team_member.php",
    model
  );

export const useCreateNewWorker = ({
  onSuccess,
  onError,
}: CreateNewWorkerOptions) => {
  const { mutate, isPending, data } = useMutation({
    mutationFn: (model: CreateNewWorkerRequestModel) => createNewWorker(model),
    onSuccess: onSuccess,
    onError: onError,
  });

  return {
    mutate,
    isPending,
    data,
  };
};
