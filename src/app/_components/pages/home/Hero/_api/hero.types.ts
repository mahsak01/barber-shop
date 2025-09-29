import { NetworkError } from "@/types/network-error.interface";

export type ProvinceListRequestModel = {}

export type ProvinceListResult = {
  "provinces": {
    "province_id": string,
    "province": string
  }[]
}

export type ProvinceListOptions = {
  onSuccess?: (response: ProvinceListResult) => void;
  onError?: (error: NetworkError) => void;
}

export type CitiesListRequestModel = {
  counts?: number;
  province_id: number;
};

export type CitiesListResult = {
  cities: {
    city_id: string;
    city: string;
  }[];
};

export type CitiesListOptions = {
  onSuccess?: (response: CitiesListResult) => void;
  onError?: (error: NetworkError) => void;
};

export type ServiceListRequestModel = {
  gender: string;
};

export type ServiceListResult = {
  ID: string;
  service: string;
}[];

export type ServiceListOptions = {
  onSuccess?: (response: ServiceListResult) => void;
  onError?: (error: NetworkError) => void;
};
