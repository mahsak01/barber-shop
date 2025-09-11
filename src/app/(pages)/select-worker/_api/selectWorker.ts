import { postRequest } from "@/core/http-service/http-service";
import { useMutation } from "@tanstack/react-query";
import { WorkerListBySalonServiceIdOptions, WorkerListBySalonServiceIdRequestModel, WorkerListBySalonServiceIdResult } from "./selectWorker.types";

// get Worker list
const getWorkerListBySalonServiceId = (
  model: WorkerListBySalonServiceIdRequestModel
): Promise<WorkerListBySalonServiceIdResult> =>
  postRequest<WorkerListBySalonServiceIdRequestModel, WorkerListBySalonServiceIdResult>(
    "/api/service_workers.php",
    model
  );

export const useWorkerListBySalonServiceIdResultDetail = ({ onSuccess, onError }: WorkerListBySalonServiceIdOptions) => {
  const { mutate, isPending, data } = useMutation({
    mutationFn: (model: WorkerListBySalonServiceIdRequestModel) => getWorkerListBySalonServiceId(model),
    onSuccess: onSuccess,
    onError: onError,
  });

  return {
    mutate,
    isPending,
    data,
  };
};
