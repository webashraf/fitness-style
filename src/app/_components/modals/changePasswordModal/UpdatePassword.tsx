"use client";

import { Button, Input } from "antd";
import { Controller, useForm } from "react-hook-form";
import { HiOutlineArrowSmLeft } from "react-icons/hi";
import { RiLock2Line } from "react-icons/ri";

interface IUpdatePassword {
  newPassword: string;
  confirmPassword: string;
}

const UpdatePassword = ({ setOpen, setIsUpdatePassword }: any) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm<IUpdatePassword>();

  const onSubmit = (data: IUpdatePassword) => {
    if (data) {
      setOpen(false);
    }
  };

  return (
    <div className="w-[484px] px-6 pb-6">
      <span className="flex items-center gap-3">
        <HiOutlineArrowSmLeft
          onClick={() => setIsUpdatePassword(false)}
          className="hover:cursor-pointer"
          size={30}
        />{" "}
        <h2 className="font-medium">Update Password</h2>
      </span>
      <p className="text-[#333333] mt-1">Please enter your new password </p>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* New Password */}
        <div className="mt-4">
          <label className="block text-gray-600 mb-1">Set new password</label>
          <Controller
            name="newPassword"
            control={control}
            rules={{
              required: "New password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters long",
              },
            }}
            render={({ field }) => (
              <Input.Password
                {...field}
                size="large"
                placeholder="Set new password"
                className="border border-green-500 h-[56px]"
                prefix={<RiLock2Line color="#5C5C5C" />}
              />
            )}
          />
          {errors.newPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.newPassword.message}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="mt-4">
          <label className="block text-gray-600 mb-1">
            Re-enter new password
          </label>
          <Controller
            name="confirmPassword"
            control={control}
            rules={{
              required: "Please confirm your password",
              validate: (value) =>
                value === watch("newPassword") || "Passwords do not match",
            }}
            render={({ field }) => (
              <Input.Password
                {...field}
                size="large"
                placeholder="Re-enter new password"
                className="border border-green-500 h-[56px]"
                prefix={<RiLock2Line color="#5C5C5C" />}
              />
            )}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <Button
          type="primary"
          className="w-full bg-[#FF4F00] h-[56px] mt-5 text-white font-semibold"
          htmlType="submit"
        >
          Update password
        </Button>
      </form>
    </div>
  );
};

export default UpdatePassword;
