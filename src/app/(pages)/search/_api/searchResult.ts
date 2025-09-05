import { useMutation } from "@tanstack/react-query";
import {
  SearchSalonListOptions,
  SearchSalonListRequestModel,
  SearchSalonListResult,
} from "./searchResult.types";
import { postRequest } from "@/core/http-service/http-service";

// get Salon list
const getSalonList = (
  model: SearchSalonListRequestModel
): Promise<SearchSalonListResult> =>
  postRequest<SearchSalonListRequestModel, SearchSalonListResult>(
    "/api/salon_search.php",
    model
  );

export const useSearchSalonList = ({
  onSuccess,
  onError,
}: SearchSalonListOptions) => {
  const { mutate, isPending, data } = useMutation({
    mutationFn: (model: SearchSalonListRequestModel) => getSalonList(model),
    onSuccess: onSuccess,
    onError: onError,
  });

  return {
    mutate,
    isPending,
    data,
  };
};
