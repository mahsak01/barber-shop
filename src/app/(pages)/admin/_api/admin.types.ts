import { NetworkError } from "@/types/network-error.interface";

export type DashbordListRequestModel = {
  salon_id: number;
  type: number;
  status?: string;
  count_days: number;
};
export type DashbordListResult = {};

export type DashbordListOptions = {
  onSuccess?: (response: DashbordListResult) => void;
  onError?: (error: NetworkError) => void;
};
