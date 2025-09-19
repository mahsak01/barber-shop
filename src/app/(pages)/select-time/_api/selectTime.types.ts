import { NetworkError } from "@/types/network-error.interface";

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
