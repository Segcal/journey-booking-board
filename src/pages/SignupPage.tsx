
import React from "react";
import SignupForm from "@/components/auth/SignupForm";

const SignupPage = () => {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Create an Account</h1>
      <SignupForm />
    </div>
  );
};

export default SignupPage;
