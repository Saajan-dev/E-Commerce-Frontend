import { CreateAndUpdateDealerProps } from "../@types/service";
import { baseURL } from "../config";
import http from "./Interceptors";

export const createDealers = (
  user_id: string,
  data: CreateAndUpdateDealerProps
) => {
  return http.post(`${baseURL}/dealer/${user_id}`, data);
};

export const getAllDealers = (user_id: string) => {
  return http.get(`${baseURL}/dealer/${user_id}`);
};

export const updateDealers = (
  user_id: string,
  data: CreateAndUpdateDealerProps
) => {
  return http.put(`${baseURL}/dealer/${user_id}`, data);
};

export const deleteDealers = (user_id: string, dealer_id: string) => {
  return http.delete(`${baseURL}/dealer/${user_id}/${dealer_id}`);
};
