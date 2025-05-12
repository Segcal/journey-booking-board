
import React from "react";
import LoginForm from "@/components/auth/LoginForm";

const LoginPage = () => {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Login to Your Account</h1>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
