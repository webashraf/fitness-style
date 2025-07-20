"use client";

import { AuthForm } from "./AuthForm";

const ResetPass = () => {
  const handleLogin = (values: Record<string, string | boolean>) => {
    console.log("Login Values:", values);
    // Login logic here
  };
  return (
    <div>
      <AuthForm
        fields={[
          { label: "New Password", name: "new-password", type: "password" },
          {
            label: "COnfirm Password",
            name: "confirm-password",
            type: "password",
          },
        ]}
        buttonLabel="Update Password"
        onSubmit={handleLogin}
        imageLink="/images/auth/run_couple.png"
        heading="Set new password"
        description="New Password"
        btnLink="/login"
      />
    </div>
  );
};

export default ResetPass;
