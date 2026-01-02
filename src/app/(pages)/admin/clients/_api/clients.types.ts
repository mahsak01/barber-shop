import { NetworkError } from "@/types/network-error.interface";

export type ClientsListRequestModel = {
  salon_id: number;
  name?: string;
  phone?: string;
};

export type ClientRecordType = {
  customer_id: number;
  customer_phone: string;
  customer_name: string;
  total_purchase: number;
  created_date: string;
  created_month_name: string;
  comments: string;
};

export type ClientsListResult = {
  count: number;
  customers: ClientRecordType[];
};

export type ClientsListOptions = {
  onSuccess?: (response: ClientsListResult) => void;
  onError?: (error: NetworkError) => void;
};
