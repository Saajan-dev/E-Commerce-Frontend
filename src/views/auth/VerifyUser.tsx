import { useFormik } from "formik";
import image from "../../assets/images/png/otp.png";
import { IoMdArrowRoundForward } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { siteLogo } from "../../config";
import Loader from "../../components/loader";
import { getErrorMessage } from "../../utils/helpers";
import { verifyUserService } from "../../services/AuthService";
import { toastMessage } from "../../components/ToastMessage";

const VerifyUser = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoading, setisLoading] = useState(false);
  const { values, setFieldValue, handleSubmit, resetForm } = useFormik({
    initialValues: {
      otp: Array(6).fill(""),
    },
    onSubmit: () => {
      handleVerifyOTP();
    },
  });

  const handleOTPChange = (event: any, index: number) => {
    const newOTP = [...values.otp];
    const inputValue = event.target.value;

    if (inputValue.length > 1) return;

    if (event.key === "Backspace") {
      if (!inputValue) {
        // If the input is empty and backspace is pressed, move to the previous input
        if (index > 0) {
          const prevInput = document.getElementById(`otp-${index - 1}`);
          if (prevInput) prevInput.focus();
        }
      } else {
        // Clear the current input value
        newOTP[index] = "";
      }
    } else if (inputValue) {
      // Update the current input and move to the next one
      newOTP[index] = inputValue;

      if (index < values.otp.length - 1) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }

    setFieldValue("otp", newOTP);
  };

  const handleVerifyOTP = async () => {
    setisLoading(true);
    try {
      const response = await verifyUserService({
        otp: values?.otp.join(""),
        email: location?.state?.email,
      });
      const { status, data, message } = response?.data;
      if (status) {
        toastMessage("success", message);
        resetForm();
        navigate("/", {
          state: {
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
            User Verification
          </h5>

          <div className="w-[90%] sm:w-[75%] lg:w-[60%]">
            <div className="flex flex-col mt-3">
              <div className="grid grid-cols-6 gap-2 mb-5">
                {Array.from({ length: 6 }, (_, i) => (
                  <div className="w-[50px]" key={i}>
                    <input
                      id={`otp-${i}`}
                      value={values?.otp[i]}
                      className="w-full h-[50px] text-center border-2 my-2 focus:border-2 outline-none p-2 focus:border-green-500 rounded-sm"
                      onChange={(e) =>
                        setFieldValue("otp", [
                          ...values.otp.slice(0, i),
                          e.target.value,
                          ...values.otp.slice(i + 1),
                        ])
                      }
                      onKeyDown={(e) => handleOTPChange(e, i)}
                      maxLength={1}
                    />
                  </div>
                ))}
              </div>
            </div>
            <p
              className="text-end text-blue-600 font-semibold mb-3 cursor-pointer text-xs md:text-sm"
              onClick={() => navigate("/")}
            >
              Go to Login Page?
            </p>

            <div className="flex items-center justify-center">
              <button
                type="button"
                className="bg-emerald-500 hover:bg-emerald-600 transition-all text-white py-2 px-6 md:py-3 md:px-8 rounded-md flex items-center gap-2"
                onClick={() => handleSubmit()}
              >
                Click to Verify User <IoMdArrowRoundForward />
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

export default VerifyUser;
