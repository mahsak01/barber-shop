import { NetworkError } from "@/types/network-error.interface";

// get calender
export type SideDatesRequestModel = {
  date: string;
  fd_type: string;
  after: string;
  before: string;
  salon_id: string;
  worker_id: string;
  service_id: string;
};

export type SideDatesTypes = {
  date: string;
  year: string;
  day: string;
  weekday: string;
  month: string;
  is_today: boolean;
  is_selected: boolean;
  is_available: boolean;
};

export type SideDatesResult = {
  side_dates: SideDatesTypes[];
};

export type SideDatesOptions = {
  onSuccess?: (response: SideDatesResult) => void;
  onError?: (error: NetworkError) => void;
};

// get Time list
export type TimeSlotBySalonServiceWorkerDateIdRequestModel = {
  salon_id: string;
  date: string;
  service_id: string;
  worker_id: string;
};

export type TimeSlotBySalonServiceWorkerDateIdResult = {
  salon_id: string;
  service_id: string;
  worker_id: string;
  date: string;
  weekday: string;
  price: number;
  slots: {
    start_time: string;
    end_time: string;
    is_available: boolean;
  }[];
};

export type TimeSlotBySalonServiceWorkerDateIdOptions = {
  onSuccess?: (response: TimeSlotBySalonServiceWorkerDateIdResult) => void;
  onError?: (error: NetworkError) => void;
};

// add reserved time to basket
export type AddReserveTimeToBasketModel = {
  salon_id: string;
  date: string;
  service_id: string;
  worker_id: string;
  customer_id: string;
  start_time: string;
  end_time: string;
};

export type AddReserveTimeToBasketResult = {
  message: string;
  order_id: string;
};

export type AddReserveTimeToBasketOptions = {
  onSuccess?: (response: AddReserveTimeToBasketResult) => void;
  onError?: (error: NetworkError) => void;
};
