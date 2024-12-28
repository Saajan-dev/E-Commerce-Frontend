import { useFormik } from "formik";
import image from "../../assets/images/png/login.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { IoMdArrowRoundForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { cookie_user_data, siteLogo } from "../../config";
import Loader from "../../components/loader";
import { toastMessage } from "../../components/ToastMessage";
import { getErrorMessage, setCookie } from "../../utils/helpers";
import { userLoginSchema } from "../../validations/auth.schema";
import { UserLoginService } from "../../services/AuthService";

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setisLoading] = useState(false);
  const [isShowPassword, setisShowPassword] = useState(false);
  const { values, handleSubmit, handleChange, errors, touched } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: userLoginSchema,
    onSubmit: () => {
      handleLogin();
    },
  });

  const handleLogin = async () => {
    setisLoading(true);
    try {
      const response = await UserLoginService(values);
      const { data, status, message, verifyuser } = response?.data;
      if (verifyuser) {
        toastMessage("success", message);
        navigate("/verify-user", {
          state: {
            email: data?.email,
          },
        });
      } else {
        if (status) {
          toastMessage("success", message);
          setCookie(cookie_user_data, data);
          navigate("/home-page");
        } else {
          toastMessage("error", message);
        }
      }
    } catch (error) {
      getErrorMessage(error);
    } finally {
      setisLoading(false);
    }
  };

  return (
    <>
      <div className="bg-white text-black min-h-screen flex flex-col lg:flex-row">
        <div className="lg:w-[55%] h-[50vh] lg:h-[100vh]  flex items-center justify-center">
          <img
            src={image}
            alt="login-bg"
            className="w-[40%] lg:w-[55%] object-cover"
          />
        </div>

        <div className="lg:w-[45%] w-full p-5 flex flex-col items-center justify-center">
          <div className="flex justify-center mb-5">
            <img
              src={siteLogo}
              alt="Site-logo"
              className="w-[50%] md:w-[40%] object-cover"
            />
          </div>

          <h5 className="text-center text-3xl md:text-4xl font-semibold">
            Signin
          </h5>

          <div className="w-[90%] sm:w-[75%] lg:w-[60%]">
            <div className="flex flex-col">
              <label htmlFor="email">Email</label>
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

            <div className="flex flex-col mt-3">
              <label htmlFor="password">Password</label>
              <div className="border-2 my-2 focus:border-2 focus-within:border-green-500 rounded-sm p-2 flex items-center">
                <input
                  id="password"
                  type={isShowPassword ? "text" : "password"}
                  className="border-none outline-none w-[95%] mr-2"
                  placeholder="Enter your password"
                  value={values?.password}
                  onChange={handleChange("password")}
                />
                {values?.password && (
                  <p
                    className="cursor-pointer text-center w-[5%] text-lg text-gray-600"
                    onClick={() => setisShowPassword(!isShowPassword)}
                  >
                    {isShowPassword ? <FaEyeSlash /> : <FaEye />}
                  </p>
                )}
              </div>
              {errors?.password && touched?.password && (
                <p className="text-red-500 text-xs md:text-sm">
                  {errors?.password}
                </p>
              )}
            </div>
            <div className="flex justify-between">
              <span
                className="text-blue-600 font-semibold my-3 cursor-pointer text-xs md:text-sm"
                onClick={() => navigate("/signup")}
              >
                New User?
              </span>
              <span
                className="text-blue-600 font-semibold my-3 cursor-pointer text-xs md:text-sm"
                onClick={() => navigate("/forgot-password")}
              >
                Forgot your Password?
              </span>
            </div>

            <div className="flex items-center justify-center">
              <button
                type="button"
                className="bg-emerald-500 hover:bg-emerald-600 transition-all text-white py-2 px-6 md:py-3 md:px-8 rounded-md flex items-center gap-2"
                onClick={() => handleSubmit()}
              >
                Click here to login <IoMdArrowRoundForward />
              </button>
            </div>
          </div>
        </div>
      </div>

      {isLoading && <Loader isVisible={isLoading} />}
    </>
  );
};

export default Login;
