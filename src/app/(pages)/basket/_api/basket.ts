import { postRequest } from "@/core/http-service/http-service";
import { useMutation } from "@tanstack/react-query";
import {
  BasketDataOptions,
  BasketDataRequestModel,
  BasketDataResult,
} from "./basket.types";

// get basket data
const getBasketData = (
  model: BasketDataRequestModel
): Promise<BasketDataResult> =>
  postRequest<BasketDataRequestModel, BasketDataResult>(
    "/api/basket/basket_detail.php",
    model
  );

export const useBasketData = ({ onSuccess, onError }: BasketDataOptions) => {
  const { mutate, isPending, data } = useMutation({
    mutationFn: (model: BasketDataRequestModel) => getBasketData(model),
    onSuccess: onSuccess,
    onError: onError,
  });

  return {
    mutate,
    isPending,
    data,
  };
};
