import { NetworkError } from "@/types/network-error.interface";

export type GetAppointmentsRequestModel = {
  salon_id: number;
  type: number; // نوع خروجی
  date_start: string;
  date_end: string;
  start_time?: string;
  end_time?: string;
  worker_name?: string;
  worker_family?: string;
  worker_user?: string; // شماره تلفن
  customer_user?: string;
  customer_name?: string;
  customer_family?: string;
  service_name?: string;
  price_min?: number;
  price_max?: number;
  pay_state?: number; //
  form?: number;
  to?: number;
};

export type AppointmentsRecord = {
  [date: string]: {
    date: string;
    weekday: string;
    count: number;
    turns: {
      turn_id: number;
      start_time: string;
      end_time: string;
      price: number;
      payment_type: string;
      status: string;
      customer: {
        phone: string;
        fname: string;
        lname: string;
      };
      worker: {
        phone: string;
        fname: string;
        lname: string;
        color: string;
      };
      service: {
        category: string;
        name: string;
        duration: number;
      };
    }[];
  };
};

export type GetAppointmentsResult = {
  type: number;
  total: number;
  from: number;
  to: number;
  returned: number;
  by_date: AppointmentsRecord;
};

export type GetAppointmentsOptions = {
  onSuccess?: (response: GetAppointmentsResult) => void;
  onError?: (error: NetworkError) => void;
};
