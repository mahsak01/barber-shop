import { postRequest } from "@/core/http-service/http-service";
import { useMutation } from "@tanstack/react-query";
import {
  CitiesListOptions,
  CitiesListRequestModel,
  CitiesListResult,
  ServiceListOptions,
  ServiceListRequestModel,
  ServiceListResult,
} from "./hero.types";

// get cities list
const getCitiesList = (
  model: CitiesListRequestModel = {}
): Promise<CitiesListResult> =>
  postRequest<CitiesListRequestModel, CitiesListResult>(
    "/api/available_city.php",
    model
  );

export const useCitiesList = ({ onSuccess, onError }: CitiesListOptions) => {
  const { mutate, isPending, data } = useMutation({
    mutationFn: (model?: CitiesListRequestModel) => getCitiesList(model),
    onSuccess: onSuccess,
    onError: onError,
  });

  return {
    mutate,
    isPending,
    data,
  };
};

// get services list
const getServiceList = (
  model: ServiceListRequestModel
): Promise<ServiceListResult> =>
  postRequest<ServiceListRequestModel, ServiceListResult>(
    "/api/available_services.php",
    model,
    false
  );

export const useServiceList = ({ onSuccess, onError }: ServiceListOptions) => {
  const { mutate, isPending, data } = useMutation({
    mutationFn: (model: ServiceListRequestModel) => getServiceList(model),
    onSuccess: onSuccess,
    onError: onError,
  });

  return {
    mutate,
    isPending,
    data,
  };
};
