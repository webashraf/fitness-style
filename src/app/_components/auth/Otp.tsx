"use client";

import { AuthForm } from "@/app/_components/auth/AuthForm";
import { OtpInputGroup } from "../ui/OtpInputGroup";

const Otp = () => {
  const handleSubmit = (values: Record<string, string | boolean>) => {
    console.log("Login Values:", values);
    // Login logic here
  };

  return (
    <div>
      <AuthForm
        buttonLabel="Get OTP"
        onSubmit={handleSubmit}
        imageLink="/images/auth/basket_ball2.png"
        heading="Verify OTP"
        description="Please check your email. We have sent a code to contact @gmail.com"
        btnLink="/reset-pass"
        extraContent={
          <>
            <OtpInputGroup length={4} />
            <div className="flex justify-between pt-3">
              <p className="mt-4 text-sm text-gray-600">Didn’t receive code?</p>
              <button
                onClick={() => {}}
                className="text-blue-600 hover:underline text-sm mt-1"
              >
                Resend
              </button>
            </div>
          </>
        }
      />
    </div>
  );
};

export default Otp;
