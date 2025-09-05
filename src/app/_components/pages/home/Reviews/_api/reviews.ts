import { postRequest } from "@/core/http-service/http-service";
import { useMutation } from "@tanstack/react-query";
import {
  CommentsListOptions,
  CommentsListRequestModel,
  CommentsListResult,
} from "./reviews.types";

// get comments list
const getCommentsList = (
  model: CommentsListRequestModel
): Promise<CommentsListResult> =>
  postRequest<CommentsListRequestModel, CommentsListResult>(
    "/api/last_comments.php",
    model
  );

export const useCommentsList = ({
  onSuccess,
  onError,
}: CommentsListOptions) => {
  const { mutate, isPending, data } = useMutation({
    mutationFn: (model: CommentsListRequestModel) => getCommentsList(model),
    onSuccess: onSuccess,
    onError: onError,
  });

  return {
    mutate,
    isPending,
    data,
  };
};
