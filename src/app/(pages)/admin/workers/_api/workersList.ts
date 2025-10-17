import { useMutation } from "@tanstack/react-query";
import { postRequest } from "@/core/http-service/http-service";
import {
  WorkersListOptions,
  WorkersListRequestModel,
  WorkersListResult,
  WorkersScheduleOptions,
  WorkersScheduleRequestModel,
  WorkersScheduleResult,
} from "./workersList.types";

// get worker list
const getWorkersList = (
  model: WorkersListRequestModel
): Promise<WorkersListResult> =>
  postRequest<WorkersListRequestModel, WorkersListResult>(
    "/api/salon_moderate/get_team.php",
    model
  );

export const useWorkersList = ({ onSuccess, onError }: WorkersListOptions) => {
  const { mutate, isPending, data } = useMutation({
    mutationFn: (model: WorkersListRequestModel) => getWorkersList(model),
    onSuccess: onSuccess,
    onError: onError,
  });

  return {
    mutate,
    isPending,
    data,
  };
};

// get worker schedule
const getWorkersSchedule = (
  model: WorkersScheduleRequestModel
): Promise<WorkersScheduleResult> =>
  postRequest<WorkersScheduleRequestModel, WorkersScheduleResult>(
    "/api/salon_moderate/get_workers_time.php",
    model
  );

export const useWorkersSchedule = ({
  onSuccess,
  onError,
}: WorkersScheduleOptions) => {
  const { mutate, isPending, data } = useMutation({
    mutationFn: (model: WorkersScheduleRequestModel) =>
      getWorkersSchedule(model),
    onSuccess: onSuccess,
    onError: onError,
  });

  return {
    mutate,
    isPending,
    data,
  };
};
