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

export type SalonDetailDataType = {
  ID: string;
  title: string;
  score: string;
  pic: string;
  images: [string, string];
  province: string;
  city: string;
  address: string;
  about: string;
  working_time: {
    saturday: workingTimeType;
    sunday: workingTimeType;
    monday: workingTimeType;
    tuesday: workingTimeType;
    wednesday: workingTimeType;
    thursday: workingTimeType;
    friday: workingTimeType;
  };
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
  }[];
  services: {
    ID: string;
    service: string;
    duration: string;
    price: string;
    worker_name: string;
    worker_id: string;
  }[];
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
    avrage_score: string;
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
