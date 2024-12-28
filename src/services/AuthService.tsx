import axios from "axios";
import { AdminLoginProps, ForgotPasswordProps } from "../@types/service";
import { baseUrl } from "../config";

export const userRegisterService = (data: any) => {
  return axios.post(`${baseUrl}/auth/signup`, data);
};

export const verifyUserService = (data: any) => {
  return axios.post(`${baseUrl}/auth/verify-otp`, data);
};

export const UserLoginService = (data: AdminLoginProps) => {
  return axios.post(`${baseUrl}/auth/login`, data);
};

export const ForgotPasswordService = (data: ForgotPasswordProps) => {
  return axios.post(`${baseUrl}/auth/forgot-password`, data);
};

export const ResetPasswordService = (data: ForgotPasswordProps) => {
  return axios.post(`${baseUrl}/auth/reset-password`, data);
};
