// import TextInputBox from "../components/TextInputBox.tsx";
import { useFormik } from "formik";
import image from "../../assets/images/png/Forgot password.png";
import { ForgotPasswordService } from "../../services/AuthService";
import { toastMessage } from "../../components/ToastMessage";
import { getErrorMessage } from "../../utils/helpers";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { siteLogo } from "../../config";
import { IoMdArrowRoundForward } from "react-icons/io";
import Loader from "../../components/loader";
import { forgotPasswordSchema } from "../../validations/auth.schema";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [isLoading, setisLoading] = useState(false);
  const { values, handleSubmit, handleChange, errors, touched, resetForm } =
    useFormik({
      initialValues: {
        email: "",
      },
      validationSchema: forgotPasswordSchema,
      onSubmit: () => {
        handleForgotPassword();
      },
    });

  const handleForgotPassword = async () => {
    setisLoading(true);
    try {
      const response = await ForgotPasswordService(values);
      const { status, data, message } = response?.data;
      console.log(data)
      if (status) {
        toastMessage("success", message);
        navigate("/reset-password", {
          state: {
            resetKey: data?.reset_key,
            email: data?.email,
          },
        });
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
            Forgot Password
          </h5>

          <div className="w-[90%] sm:w-[75%] lg:w-[60%]">
            <div className="flex flex-col">
              <label htmlFor="email" className="font-semibold">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="border-2 my-2 focus:border-2 outline-none p-2 focus:border-green-500 rounded-sm"
                placeholder="Enter your email address"
                value={values?.email}
                onChange={handleChange("email")}
              />
              {errors?.email && touched?.email && (
                <p className="text-red-500 text-xs md:text-sm">
                  {errors?.email}
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
                Forgot Password <IoMdArrowRoundForward />
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

export default ForgotPassword;
