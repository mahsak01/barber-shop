import { NetworkError } from "@/types/network-error.interface";

export type ServicesListRequestModel = {
  salon_id: number;
};

export type ServicesListRecordType = {
  service_entry_id: number;
  service_id: number;
  service_title: string;
  sub_service_title: string;
  worker_id: number;
  duration: number;
  price: number;
};

export type ServicesListResult = {
  total: number;
  data: ServicesListRecordType[];
};

export type ServicesListOptions = {
  onSuccess?: (response: ServicesListResult) => void;
  onError?: (error: NetworkError) => void;
};
