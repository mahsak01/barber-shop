import { NetworkError } from "@/types/network-error.interface";

export type BasketDataRequestModel = {
  customer_id: string;
};

export type BasketDataType = {
  order_id: string;
  salon_name: string;
  service_name: string;
  sub_service: string;
  worker_name: string;
  customer_name: string;
  start_time: string;
  end_time: string;
  date: string;
  price: string;
};

export type BasketDataResult = {
  basket_items: BasketDataType[];
};

export type BasketDataOptions = {
  onSuccess?: (response: BasketDataResult) => void;
  onError?: (error: NetworkError) => void;
};
