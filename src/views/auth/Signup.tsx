import { useFormik } from "formik";
import image from "../../assets/images/png/signup.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { IoMdArrowRoundForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { siteLogo } from "../../config";
import Loader from "../../components/loader";
import { toastMessage } from "../../components/ToastMessage";
import { getErrorMessage } from "../../utils/helpers";
import { userRegisterService } from "../../services/AuthService";
import { userRegisterSchema } from "../../validations/auth.schema";

const Signup = () => {
  const navigate = useNavigate();
  const [isLoading, setisLoading] = useState(false);
  const [isShowPassword, setisShowPassword] = useState(false);
  const { values, handleSubmit, handleChange, errors, touched, resetForm } =
    useFormik({
      initialValues: {
        name: "",
        phone: "",
        email: "",
        password: "",
      },
      validationSchema: userRegisterSchema,
      onSubmit: () => {
        handleRegister();
      },
    });

  const handleRegister = async () => {
    setisLoading(true);
    try {
      const response = await userRegisterService({
        ...values,
        phone: values?.phone.toString(),
      });
      console.log(response);
      const { status, data, message } = response?.data;
      if (status) {
        toastMessage("success", message);
        resetForm();
        navigate("/verify-user", {
          state: {
            email: data?.email,
            resetKey: data?.reset_key,
          },
        });
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
      <div className="bg-white text-black min-h-screen flex flex-col lg:flex-row">
        <div className="lg:w-[45%] w-full p-5 flex flex-col items-center justify-center">
          <div className="flex justify-center mb-5">
            <img
              src={siteLogo}
              alt="Site-logo"
              className="w-[50%] md:w-[40%] object-cover"
            />
          </div>

          <h5 className="text-center text-3xl md:text-4xl font-semibold">
            Signup
          </h5>

          <div className="w-[90%] sm:w-[75%] lg:w-[70%]">
            <div className="grid grid-cols-2 gap-2 mt-5">
              <div className="flex flex-col">
                <label htmlFor="Username">Username</label>
                <input
                  id="Username"
                  type="text"
                  className="border-2 my-2 focus:border-2 outline-none p-2 focus:border-green-500 rounded-sm"
                  placeholder="Enter your name"
                  value={values?.name}
                  onChange={handleChange("name")}
                />
                {errors?.name && touched?.name && (
                  <p className="text-red-500 text-xs md:text-sm">
                    {errors?.name}
                  </p>
                )}
              </div>
              <div className="flex flex-col">
                <label htmlFor="phone">Mobile Number</label>
                <input
                  id="phone"
                  type="number"
                  className="border-2 my-2 focus:border-2 outline-none p-2 focus:border-green-500 rounded-sm"
                  placeholder="Enter your mobile number"
                  value={values?.phone}
                  onChange={(e) => {
                    const input = e.target.value;
                    if (input.length <= 10) {
                      handleChange("phone")(e);
                    }
                  }}
                />
                {errors?.phone && touched?.phone && (
                  <p className="text-red-500 text-xs md:text-sm">
                    {errors?.phone}
                  </p>
                )}
              </div>
            </div>

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

            <div className="flex justify-end">
              <span
                className="text-blue-600 font-semibold my-3 cursor-pointer text-xs md:text-sm"
                onClick={() => navigate("/")}
              >
                Go to Login page?
              </span>
            </div>

            <div className="flex items-center justify-center">
              <button
                type="button"
                className="bg-emerald-500 hover:bg-emerald-600 transition-all text-white py-2 px-6 md:py-3 md:px-8 rounded-md flex items-center gap-2"
                onClick={() => handleSubmit()}
              >
                Click here to Register <IoMdArrowRoundForward />
              </button>
            </div>
          </div>
        </div>
        <div className="lg:w-[55%] h-[50vh] lg:h-[100vh]  flex items-center justify-center">
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

export default Signup;
