import { postRequest } from "@/core/http-service/http-service";
import { useMutation } from "@tanstack/react-query";
import { UserReservedDataOptions, UserReservedDataRequestModel, UserReservedDataResult } from "./userReservation.types";

// get user reserved data
const getUserReservedData = (
  model: UserReservedDataRequestModel
): Promise<UserReservedDataResult> =>
  postRequest<UserReservedDataRequestModel, UserReservedDataResult>(
    "/api/turn/all_turns.php",
    model
  );

export const useUserReservedData = ({ onSuccess, onError }: UserReservedDataOptions) => {
  const { mutate, isPending, data } = useMutation({
    mutationFn: (model: UserReservedDataRequestModel) => getUserReservedData(model),
    onSuccess: onSuccess,
    onError: onError,
  });

  return {
    mutate,
    isPending,
    data,
  };
};