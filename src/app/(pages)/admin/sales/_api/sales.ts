import { useMutation } from "@tanstack/react-query";
import { postRequest } from "@/core/http-service/http-service";
import {
  PaiedTransactionsOptions,
  PaiedTransactionsRequestModel,
  PaiedTransactionsResult,
  SaleTurnsOptions,
  SaleTurnsRequestModel,
  SaleTurnsResult,
} from "./sales.types";

// get sale turns
const getSaleTurns = (model: SaleTurnsRequestModel): Promise<SaleTurnsResult> =>
  postRequest<SaleTurnsRequestModel, SaleTurnsResult>(
    "/api/salon_moderate/show_turns.php",
    model
  );

export const useSaleTurns = ({ onSuccess, onError }: SaleTurnsOptions) => {
  const { mutate, isPending, data } = useMutation({
    mutationFn: (model: SaleTurnsRequestModel) => getSaleTurns(model),
    onSuccess: onSuccess,
    onError: onError,
  });

  return {
    mutate,
    isPending,
    data,
  };
};

// get paid transactions
const getPaiedTransactions = (
  model: PaiedTransactionsRequestModel
): Promise<PaiedTransactionsResult> =>
  postRequest<PaiedTransactionsRequestModel, PaiedTransactionsResult>(
    "/api/salon_moderate/get_pays.php",
    model
  );

export const usePaiedTransactions = ({
  onSuccess,
  onError,
}: PaiedTransactionsOptions) => {
  const { mutate, isPending, data } = useMutation({
    mutationFn: (model: PaiedTransactionsRequestModel) =>
      getPaiedTransactions(model),
    onSuccess: onSuccess,
    onError: onError,
  });

  return {
    mutate,
    isPending,
    data,
  };
};
