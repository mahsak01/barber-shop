import { NetworkError } from "@/types/network-error.interface";

export type SearchSalonListRequestModel = {
  gender: string;
  city: string;
  service: string;
};

export type SearchSalonDataType = {
  ID: string;
  title: string;
  score: string;
  pic: string;
  province: string;
  city: string;
  address: string;
  about: string;
  CommentCount: string;
};

export type SearchSalonListResult = {
  salon: SearchSalonDataType[];
};

export type SearchSalonListOptions = {
  onSuccess?: (response: SearchSalonListResult) => void;
  onError?: (error: NetworkError) => void;
};
