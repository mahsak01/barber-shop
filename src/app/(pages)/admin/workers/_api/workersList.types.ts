import { NetworkError } from "@/types/network-error.interface";

//list
export type WorkersListRequestModel = {
  owner_user_id: number;
  salon_id: number;
};

export type WorkersListDataType = {
  ID: number;
  fname: string;
  lname: string;
  first_letter: string;
  phone: string;
  email: string;
  correspondence: string;
  score: number;
  avatar: number;
};

export type WorkersListResult = {
  total: number;
  data: WorkersListDataType[];
};

export type WorkersListOptions = {
  onSuccess?: (response: WorkersListResult) => void;
  onError?: (error: NetworkError) => void;
};

// schedule
export type WorkersScheduleRequestModel = {
  owner_user_id: number;
  salon_id: number;
  start_date: string;
  end_date: string;
};

export type WorkersScheduleDataType = {
  date_j: string;
  weekday: string;
  month: string;
  day: number;
  shifts: {
    shift: number;
    start: string;
    end: string;
  }[];
};

export type WorkersScheduleDataTypeWhitFLName = WorkersScheduleDataType & {
  fname: string;
  lname: string;
};

export type WorkersScheduleRecordsType = {
  worker_id: number;
  fname: string;
  first_letter: string;
  lname: string;
  weekly_hours: number;
  avatar: number;
  schedule: WorkersScheduleDataType[];
};

export type WorkersScheduleResult = {
  data: WorkersScheduleRecordsType[];
};

export type WorkersScheduleOptions = {
  onSuccess?: (response: WorkersScheduleResult) => void;
  onError?: (error: NetworkError) => void;
};
