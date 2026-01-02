import { postRequest } from "@/core/http-service/http-service";
import { useMutation } from "@tanstack/react-query";
import {
  DashbordListOptions,
  DashbordListRequestModel,
  DashbordListResult,
} from "./admin.types";

// get dashbord list
const getDashbordList = (
  model: DashbordListRequestModel
): Promise<DashbordListResult> =>
  postRequest<DashbordListRequestModel, DashbordListResult>(
    "/api/salon_moderate/stat.php",
    model
  );

export const useDashbordList = ({
  onSuccess,
  onError,
}: DashbordListOptions) => {
  const { mutate, isPending, data } = useMutation({
    mutationFn: (model: DashbordListRequestModel) => getDashbordList(model),
    onSuccess: onSuccess,
    onError: onError,
  });

  return {
    mutate,
    isPending,
    data,
  };
};
