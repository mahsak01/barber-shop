import { NetworkError } from "@/types/network-error.interface";

export type SaleTurnsRequestModel = {
  salon_id: number;
  // 0 تمامی نوبت ها
  // 1 فقط نوبت های منتظر تایید
  // 2 نوبت های تایید شده ولی انجام نشده
  // 3 نوبت هایی که توسط مشتری لغو شده اند
  // 4 نوبت هایی که توسط سالن دار یا وورکر لغو شده اند
  // 5 نوبت هایی که با موفقیت انجام شدن
  // 6 نوبت های روز جاری
  type: number;
  date_start?: string;
  date_end?: string;
  start_time?: string;
  end_time?: string;
  worker_name?: string;
  worker_family?: string;
  worker_user?: string;
  customer_user?: string;
  customer_name?: string;
  customer_family?: string;
  service_name?: string;
  price_min?: number;
  price_max?: number;
  pay_state?: number;
  from: number;
  to: number;
};

export type SaleTurnsRecordType = {
  turn_id: number;
  date: string;
  weekday: string;
  start_time: string;
  end_time: string;
  price: number;
  payment_type: string;
  status: string;
  customer_phone: string;
  customer_name: string;
  customer_family: string;
  worker_phone: string;
  worker_name: string;
  worker_family: string;
  service_category: string;
  service_name: string;
  service_duration: number;
};

export type SaleTurnsResult = {
  total: number;
  from: number;
  to: number;
  data: SaleTurnsRecordType[];
};

export type SaleTurnsOptions = {
  onSuccess?: (response: SaleTurnsResult) => void;
  onError?: (error: NetworkError) => void;
};

// get paid transactions
export type PaiedTransactionsRequestModel = {
  salon_id: number;
  end_date: string;
  start_date: string;
};

export type PaiedTransactionsRecordType = {
  date: string;
  time: string;
  month_name: string;
  price: number;
  customer_phone: string;
  customer_name: string;
  worker_phone: string;
  worker_name: string;
  salon_name: string;
  refid: string;
  pay_method: string;
  type: string;
};

export type PaiedTransactionsResult = {
  count: number;
  transactions: PaiedTransactionsRecordType[];
};

export type PaiedTransactionsOptions = {
  onSuccess?: (response: PaiedTransactionsResult) => void;
  onError?: (error: NetworkError) => void;
};
