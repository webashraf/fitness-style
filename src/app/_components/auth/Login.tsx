"user client";

import { AuthForm } from "./AuthForm";

const Login = () => {
  const handleLogin = (values: Record<string, string | boolean>) => {
    console.log("Login Values:", values);
    // Login logic here
  };
  return (
    <div className="">
      <AuthForm
        fields={[
          {
            label: "Email",
            name: "email",
            type: "email",
            placeholder: "your@email.com",
          },
          { label: "Password", name: "password", type: "password" },
        ]}
        buttonLabel="Sign In"
        onSubmit={handleLogin}
        showRemember={true}
        showForgotLink={true}
        imageLink="/images/auth/basket_ball1.png"
        heading="Login to Account!"
        description="Please enter your email and password to continue"
        btnLink="/forgot-pass"
      />
    </div>
  );
};

export default Login;
