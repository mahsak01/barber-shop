import axios, {
  AxiosRequestHeaders,
  AxiosHeaders,
  GenericAbortSignal,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { API_URL } from "@/configs/global";

// Extend AxiosRequestConfig to include `skipAuth`
interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  skipAuth?: boolean; // Custom flag to skip the Authorization header
  SkipLanguage?: boolean; // Custom flag to skip the Accept Language
  signal?: GenericAbortSignal; // AbortController signal for request cancellation
}

const httpService = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const axiosHeader = new AxiosHeaders();

async function apiBase<T>(
  url: string,
  options?: CustomAxiosRequestConfig
): Promise<T> {
  const response: AxiosResponse = await httpService(url, options);
  return response.data as T;
}

export async function postRequest<TModel, TResult>(
  url: string,
  data: TModel,
  isDataRaw = true,
  headers?: AxiosRequestHeaders,
  skipAuth = false,
  signal?: AbortSignal
): Promise<TResult> {
  const options: CustomAxiosRequestConfig = {
    headers: headers || axiosHeader,
    method: "POST",
    data: isDataRaw ? JSON.stringify(data) : data,
    skipAuth,
    signal,
  };
  return await apiBase<TResult>(url, options);
}
