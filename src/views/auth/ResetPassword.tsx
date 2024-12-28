import { useFormik } from "formik";
import image from "../../assets/images/png/reset-password.png";
import { IoMdArrowRoundForward } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ResetPasswordSchema } from "../../validations/auth.schema";
import { siteLogo } from "../../config";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Loader from "../../components/loader";
import { getErrorMessage } from "../../utils/helpers";
import { ResetPasswordService } from "../../services/AuthService";
import { toastMessage } from "../../components/ToastMessage";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoading, setisLoading] = useState(false);
  const [isShowPassword, setisShowPassword] = useState({
    newPassword: false,
    confirmPassword: false,
  });

  const { values, handleSubmit, handleChange, errors, touched, resetForm } =
    useFormik({
      initialValues: {
        otp: "",
        newPassword: "",
        confirmPassword: "",
      },
      validationSchema: ResetPasswordSchema,
      onSubmit: () => {
        handleResetPassword();
      },
    });

  const handleResetPassword = async () => {
    setisLoading(true);
    try {
      const reqData = {
        otp: values?.otp,
        password: values?.confirmPassword,
        email: location?.state?.email,
        reset_key: location?.state?.resetKey,
      };
      const response = await ResetPasswordService(reqData);
      const { status, message } = response?.data;
      if (status) {
        toastMessage("success", message);
        navigate("/");
        resetForm();
      } else {
        toastMessage("error", message);
      }
    } catch (error) {
      getErrorMessage(error);
    } finally {
      setisLoading(false);
    }
  };

  return (
    <>
      <div className="bg-white min-h-screen flex flex-col lg:flex-row">
        <div className="lg:w-[45%] w-full p-5 flex flex-col items-center justify-center">
          <div className="flex justify-center mb-5">
            <img
              src={siteLogo}
              alt="Site-logo"
              className="w-[50%] md:w-[40%] object-cover"
            />
          </div>

          <h5 className="text-center text-3xl md:text-4xl font-semibold my-5">
            Reset Password
          </h5>

          <div className="w-[90%] sm:w-[75%] lg:w-[60%]">
            <div className="flex flex-col mt-3">
              <label htmlFor="otp">
                OTP <span className="text-red-600">*</span>
              </label>
              <div className="border-2 my-2 focus:border-2 focus-within:border-green-500 rounded-sm p-2 flex items-center">
                <input
                  id="otp"
                  type="text"
                  className="border-none outline-none w-[95%] mr-2"
                  placeholder="Enter your OTP"
                  value={values?.otp}
                  onChange={handleChange("otp")}
                />
              </div>
              {errors?.otp && touched?.otp && (
                <p className="text-red-500 text-xs md:text-sm">{errors?.otp}</p>
              )}
            </div>
            <div className="flex flex-col mt-3">
              <label htmlFor="password">
                New Password <span className="text-red-600">*</span>
              </label>
              <div className="border-2 my-2 focus:border-2 focus-within:border-green-500 rounded-sm p-2 flex items-center">
                <input
                  id="newPassword"
                  type={isShowPassword.newPassword ? "text" : "password"}
                  className="border-none outline-none w-[95%] mr-2"
                  placeholder="Enter your new password"
                  value={values?.newPassword}
                  onChange={handleChange("newPassword")}
                />
                {values?.newPassword && (
                  <p
                    className="cursor-pointer text-center w-[5%] text-lg text-gray-600"
                    onClick={() =>
                      setisShowPassword((prevState) => ({
                        ...prevState,
                        newPassword: !isShowPassword.newPassword,
                      }))
                    }
                  >
                    {isShowPassword.newPassword ? <FaEyeSlash /> : <FaEye />}
                  </p>
                )}
              </div>
              {errors?.newPassword && touched?.newPassword && (
                <p className="text-red-500 text-xs md:text-sm">
                  {errors?.newPassword}
                </p>
              )}
            </div>
            <div className="flex flex-col mt-3">
              <label htmlFor="password">
                Confirm Password <span className="text-red-600">*</span>
              </label>
              <div className="border-2 my-2 focus:border-2 focus-within:border-green-500 rounded-sm p-2 flex items-center">
                <input
                  id="confirmPassword"
                  type={isShowPassword.confirmPassword ? "text" : "password"}
                  className="border-none outline-none w-[95%] mr-2"
                  placeholder="Re-Enter your password"
                  value={values?.confirmPassword}
                  onChange={handleChange("confirmPassword")}
                />
                {values?.confirmPassword && (
                  <p
                    className="cursor-pointer text-center w-[5%] text-lg text-gray-600"
                    onClick={() =>
                      setisShowPassword((prevState) => ({
                        ...prevState,
                        confirmPassword: !isShowPassword.confirmPassword,
                      }))
                    }
                  >
                    {isShowPassword.confirmPassword ? (
                      <FaEyeSlash />
                    ) : (
                      <FaEye />
                    )}
                  </p>
                )}
              </div>
              {errors?.confirmPassword && touched?.confirmPassword && (
                <p className="text-red-500 text-xs md:text-sm">
                  {errors?.confirmPassword}
                </p>
              )}
            </div>
            <div className="flex justify-end">
              <span
                className="text-blue-600 font-semibold my-3 cursor-pointer text-xs md:text-sm"
                onClick={() => navigate("/")}
              >
                Go to Login Page?
              </span>
            </div>

            <div className="flex items-center justify-center">
              <button
                type="button"
                className="bg-emerald-500 hover:bg-emerald-600 transition-all text-white py-2 px-6 md:py-3 md:px-8 rounded-md flex items-center gap-2"
                onClick={() => handleSubmit()}
              >
                Click to Reset Password <IoMdArrowRoundForward />
              </button>
            </div>
          </div>
        </div>

        <div className="lg:w-[55%] h-[50vh] lg:h-[100vh] bg-[var(--login-bg-color)] flex items-center justify-center">
          <img
            src={image}
            alt="login-bg"
            className="w-[40%] lg:w-[55%] object-cover"
          />
        </div>
      </div>

      {isLoading && <Loader isVisible={isLoading} />}
    </>
  );
};

export default ResetPassword;
