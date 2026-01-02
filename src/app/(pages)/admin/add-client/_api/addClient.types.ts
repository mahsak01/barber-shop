import { NetworkError } from "@/types/network-error.interface";

// create new client
export type CreateNewClientRequestModel = FormData;

export type CreateNewClientResult = {};

export type CreateNewClientOptions = {
  onSuccess?: (response: CreateNewClientResult) => void;
  onError?: (error: NetworkError) => void;
};
