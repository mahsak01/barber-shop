import { NetworkError } from "@/types/network-error.interface";

export type CommentsDataType = {
  name: string;
  comment: string;
  date: string;
  UserID: string;
  title: string;
  score: string;
  avatar: string
};

export type CommentsListResult = {
  comments: CommentsDataType[];
};

export type CommentsListOptions = {
  onSuccess?: (response: CommentsListResult) => void;
  onError?: (error: NetworkError) => void;
};

export type CommentsListRequestModel = {
  countc: number;
};
