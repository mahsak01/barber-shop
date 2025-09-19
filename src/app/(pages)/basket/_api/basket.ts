import { postRequest } from "@/core/http-service/http-service";
import { useMutation } from "@tanstack/react-query";
import {
  BasketDataOptions,
  BasketDataRequestModel,
  BasketDataResult,
  BasketInPersonConfirmModel,
  BasketInPersonConfirmOptions,
  BasketInPersonConfirmResult,
  BasketItemDetailModel,
  BasketItemDetailOptions,
  BasketItemDetailResult,
  DeleteBaskeItemModel,
  DeleteBaskeItemOptions,
  DeleteBaskeItemResult,
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

// delete basket item
const deleteBasketItem = (
  model: DeleteBaskeItemModel
): Promise<DeleteBaskeItemResult> =>
  postRequest<DeleteBaskeItemModel, DeleteBaskeItemResult>(
    "/api/basket/del_order.php",
    model
  );

export const useDeleteBaskeItem = ({ onSuccess, onError }: DeleteBaskeItemOptions) => {
  const { mutate, isPending, data } = useMutation({
    mutationFn: (model: DeleteBaskeItemModel) => deleteBasketItem(model),
    onSuccess: onSuccess,
    onError: onError,
  });

  return {
    mutate,
    isPending,
    data,
  };
};

// basket item detail
const basketItemDetail = (
  model: BasketItemDetailModel
): Promise<BasketItemDetailResult> =>
  postRequest<BasketItemDetailModel, BasketItemDetailResult>(
    "/api/basket/order_detail.php",
    model
  );

export const useBasketItemDetail = ({ onSuccess, onError }: BasketItemDetailOptions) => {
  const { mutate, isPending, data } = useMutation({
    mutationFn: (model: BasketItemDetailModel) => basketItemDetail(model),
    onSuccess: onSuccess,
    onError: onError,
  });

  return {
    mutate,
    isPending,
    data,
  };
};

// in person confirm payment
const basketInPersonConfirm = (
  model: BasketInPersonConfirmModel
): Promise<BasketInPersonConfirmResult> =>
  postRequest<BasketInPersonConfirmModel, BasketInPersonConfirmResult>(
    "/api/turn/reg_turn.php",
    model
  );

export const useBasketInPersonConfirm = ({ onSuccess, onError }: BasketInPersonConfirmOptions) => {
  const { mutate, isPending, data } = useMutation({
    mutationFn: (model: BasketInPersonConfirmModel) => basketInPersonConfirm(model),
    onSuccess: onSuccess,
    onError: onError,
  });

  return {
    mutate,
    isPending,
    data,
  };
};
