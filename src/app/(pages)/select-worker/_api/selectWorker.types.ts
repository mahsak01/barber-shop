import { NetworkError } from "@/types/network-error.interface";

export type WorkerListBySalonServiceIdRequestModel = {
  salon_id: string;
  service_id: string;
};

export type WorkerDateBySalonServiceId = {
  worker_id: string;
  worker_score: string;
  worker_name: string;
  worker_about: string;
  picture: string;
  price: string;
  duration: string;
};

export type WorkerListBySalonServiceIdResult = {
  salon_id: string;
  service_id: string;
  service_workers: WorkerDateBySalonServiceId[];
};

export type WorkerListBySalonServiceIdOptions = {
  onSuccess?: (response: WorkerListBySalonServiceIdResult) => void;
  onError?: (error: NetworkError) => void;
};
