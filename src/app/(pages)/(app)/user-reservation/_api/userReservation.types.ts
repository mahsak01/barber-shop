// user reserved list
import { NetworkError } from "@/types/network-error.interface";

export type UserReservedDataRequestModel = {
    customer_id: string;
};

export type UserReservedDataType = {
    reservation_id: string,
    salon_name: string,
    salon_address: string,
    service_name: string,
    sub_service: string,
    worker_name: string,
    customer_name: string,
    start_time: string,
    end_time: string,
    date: string,
    price: string,
    status: string,
    pay_state: string,
    created_time: string
};

export type UserReservedDataResult = {
    "customer_id": string,
    "all_turns": UserReservedDataType[]
}

export type UserReservedDataOptions = {
    onSuccess?: (response: UserReservedDataResult) => void;
    onError?: (error: NetworkError) => void;
};
