import * as Yup from "yup";

export const userRegisterSchema = Yup.object({
  name: Yup.string().required("Username is required."),
  phone: Yup.string()
    .min(10, "Maximum 10 digits")
    .required("Mobile numbe ris required."),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export const userLoginSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export const forgotPasswordSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

export const ResetPasswordSchema = Yup.object({
  otp: Yup.string()
    .max(6, "Enter your 6 digits OTP")
    .required("OTP is required."),
  newPassword: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required")
    .oneOf([Yup.ref("newPassword")], "Password must match"),
});
