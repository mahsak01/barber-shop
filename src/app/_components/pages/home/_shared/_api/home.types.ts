import { NetworkError } from "@/types/network-error.interface";

export type SalonListRequestModel = {
  count: number;
  type: number;
};

export type SalonDataType = {
  title: string;
  city: string;
  score: string;
  pic: string;
};

export type SalonListResult = {
  salon: SalonDataType[];
};

export type SalonListOptions = {
  onSuccess?: (response: SalonListResult) => void;
  onError?: (error: NetworkError) => void;
};
