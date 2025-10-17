import { NetworkError } from "@/types/network-error.interface";

// create new worker
export type CreateNewWorkerRequestModel = {
  owner_user_id: number;
  salon_id: number;
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  birthday: string;
  color: string;
  job_title: string;
  employment_type: number;
  start_work: string;
  end_work: string;
  note: string;
  avatar: string;
};

export type CreateNewWorkerResult = {};

export type CreateNewWorkerOptions = {
  onSuccess?: (response: CreateNewWorkerResult) => void;
  onError?: (error: NetworkError) => void;
};
