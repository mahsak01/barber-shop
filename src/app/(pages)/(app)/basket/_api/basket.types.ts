import { NetworkError } from "@/types/network-error.interface";

// basket list
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

//delete basket item
export type DeleteBaskeItemModel = {
  order_id: string;
  customer_id: string
}

export type DeleteBaskeItemResult = {
  message: string
}

export type DeleteBaskeItemOptions = {
  onSuccess?: (response: DeleteBaskeItemResult) => void;
  onError?: (error: NetworkError) => void;
}

//basket item detail
export type BasketItemDetailModel = {
  order_id: string;
  customer_id: string
}

export type BasketItemDetailResult = {  "salon_name": "ماه بانو",
  service_name: string,
  sub_service:string,
  worker_name:string,
  customer_name:string,
  start_time: string,
  end_time:string,
  date:string,
  price: string
}


export type BasketItemDetailOptions = {
  onSuccess?: (response: BasketItemDetailResult) => void;
  onError?: (error: NetworkError) => void;
}



// in person confirm payment
export type BasketInPersonConfirmModel = {
  pay_method: string;
  customer_id: string
}

export type BasketInPersonConfirmResult = {
  customer_id: string,
  pay_method: number,
  finalized_orders: {
    order_id: string,
    reservation_id: number
  }[]
}

export type BasketInPersonConfirmOptions = {
  onSuccess?: (response: BasketInPersonConfirmResult) => void;
  onError?: (error: NetworkError) => void;
}