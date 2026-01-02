import { NetworkError } from "@/types/network-error.interface";

// create new worker
export type CreateNewWorkerRequestModel = FormData;

export type CreateNewWorkerResult = {};

export type CreateNewWorkerOptions = {
  onSuccess?: (response: CreateNewWorkerResult) => void;
  onError?: (error: NetworkError) => void;
};

// get worker info
export type GetWorkerInfoRequestModel = {
  type: number;
  worker?: string;
  salon_id: string;
  worker_id: string;
};

export type GetWorkerInfoResult = {
  type: 0;
  data: {
    fname: string;
    lname: string;
    email: string;
    phone1: string;
    phone2: string;
    job_title: string;
    birthday: string;
    color: string;
    start_work: string;
    end_work: string;
    specialist_id: string;
    employment_type: number;
    note: string;
    avatar: number;
    province: string;
    city: string;
    gender: number;
  };
};

export type GetWorkerInfoOptions = {
  onSuccess?: (response: GetWorkerInfoResult) => void;
  onError?: (error: NetworkError) => void;
};
