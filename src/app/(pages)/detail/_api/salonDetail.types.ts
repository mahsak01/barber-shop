import { NetworkError } from "@/types/network-error.interface";

export type SalonDetailRequestModel = {
  id: string;
};

type workingTimeType = {
  shift1_start: string;
  shift1_end: string;
  shift2_start: string;
  shift2_end: string;
  is_shift1_closed: boolean;
  is_shift2_closed: boolean;
  is_day_closed: boolean;
};

export type TransferWorkingTimeType = workingTimeType & { day: string }

export type SalonServiceType = {
  service_name: string;
  sub_services: {
    service_id: number;
    sub_service_name: string;
    price: number;
    duration: string;
    worker_id: string;
  }[];
};

export type SalonDetailDataType = {
  ID: string;
  title: string;
  "is_open_now": boolean,
  "open_at": string,
  "closed_at": string,
  score: string;
  pic: string;
  images: [string, string];
  province: string;
  city: string;
  address: string;
  about: string;
  working_time: Record<string, workingTimeType>;
  calendar_holidays: string;
  CommentCount: string;
  location: string;
  type: string;
  area: string;
  line: string;
  moving: string;
  floor: string;
  elevator: string;
  child_state: string;
  wheel: string;
  cooling: string;
  heating: string;
  magazine: string;
  toy: string;
  h_water: string;
  tv: string;
  music: string;
  park_space: string;
  drink: string;
  bisexual: string;
  animal: string;
  dirt: string;
  dull: string;
  tolerance: string;
  social_network: string;
  team: {
    ID: string;
    worker_id: string;
    worker_name: string;
    bio: string;
    picture: string;
  }[];
  services: SalonServiceType[];
  Reserved_appointments: {
    ID: string;
    service: string;
    worker_id: string;
    date: string;
    start_time: string;
    end_time: string;
    service_duration: string;
    tolerance: string;
  }[];
  comments: {
    ID: string;
    full_name: string;
    Commenter_ID: string;
    detail: string;
    date: string;
    average_score: string;
    worker_name: string;
    worker_id: string;
  }[];
};

export type SalonDetailResult = {
  salon: SalonDetailDataType[];
};

export type SalonDetailOptions = {
  onSuccess?: (response: SalonDetailResult) => void;
  onError?: (error: NetworkError) => void;
};
