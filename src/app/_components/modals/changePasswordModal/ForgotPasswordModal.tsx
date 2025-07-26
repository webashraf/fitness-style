"use client";

import { Button, Input } from "antd";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { HiOutlineArrowSmLeft, HiOutlineMailOpen } from "react-icons/hi";
import VerifyOTP from "./VerifyOTP";

const ForgotPassword = ({ setOpen, setIsForgotPassword }: any) => {
  const [isVerifyMail, setIsVerifyMail] = useState(false);
  const [resetToken, setResetToken] = useState("");

  // const [sendOtpForForgotPassword] = useSendOtpForgotPasswordMutation();

  const {
    register,
    handleSubmit,
    control, // Extracting control
    formState: { errors },
  } = useForm<{ email: string }>();

  const onSubmit = async (data: any) => {
    // const res = await sendOtpForForgotPassword(data).unwrap();
    // if (res.success) {
    //   toast.success("OTP sent successfully");
    //   setResetToken(res?.data?.resetToken);
    //   setIsVerifyMail(true);
    // }
  };

  return (
    <div>
      {!isVerifyMail ? (
        <div className="w-[484px] px-6 pb-6">
          <span className="flex items-center gap-3">
            <HiOutlineArrowSmLeft
              onClick={() => setIsForgotPassword(false)}
              className="hover:cursor-pointer"
              size={30}
            />
            <h2 className="font-medium">Forgot Password</h2>
          </span>
          <p className="text-gray-500 mt-1">
            Please enter your email address to reset your password
          </p>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-4">
              <label className="block text-gray-600 mb-1">
                Enter Your Email
              </label>
              <Controller
                name="email"
                control={control} // Using control here
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                    message: "Please enter a valid email",
                  },
                }}
                render={({ field }) => (
                  <Input
                    {...field}
                    size="large"
                    placeholder="Enter your Email"
                    className="border border-green-500 h-[56px] bg-white"
                    style={{ backgroundColor: "white !important" }} // Enforcing white background
                    prefix={<HiOutlineMailOpen size={18} color="#5C5C5C" />}
                  />
                )}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full bg-[#FF4F00] h-[56px] mt-5 text-white font-semibold"
            >
              Send OTP
            </Button>
          </form>
        </div>
      ) : (
        <VerifyOTP
          setOpen={setOpen}
          setIsVerifyMail={setIsVerifyMail}
          resetToken={resetToken}
        />
      )}
    </div>
  );
};

export default ForgotPassword;
