"use client";

import { useState } from "react";
import { AuthForm } from "./AuthForm";

export default function ForgotPass() {
  const [email, setEmail] = useState("");

  const handleSubmit = (values: Record<string, string | boolean>) => {
    console.log("Login Values:", values);
    // Login logic here
  };

  return (
    <>
      <AuthForm
        fields={[
          {
            label: "Email",
            name: "email",
            type: "email",
            placeholder: "your@email.com",
          },
        ]}
        buttonLabel="Get OTP"
        onSubmit={handleSubmit}
        imageLink="/images/auth/basket_ball1.png"
        heading="Forget password"
        description="Enter your email address to ger a verification code for resetting your password."
        btnLink="/otp"
      />
    </>
  );
}
