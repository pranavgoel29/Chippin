import React, { useState } from "react";
import { SubmitHandler, UseFormRegister, useForm } from "react-hook-form";
import InputField from "../../common/Inputs";

import {
  EditProfileInputs,
  FormRegisterInputs,
  HTMLInputTypes,
} from "../../utils/types";


import { useForgotPasswordMutation } from "../../generated/graphql";
import SignUpWrapper from "../../common/SignUpWrapper";
import { regex } from "../../utils";

const ForgotPassword: React.FC<EditProfileInputs> = () => {
  const [complete, setComplete] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<EditProfileInputs>({});

  // We will be using these custom hooks instead of using useMutation-hook from 'urql'.
  const [forgot, forgotPassword] = useForgotPasswordMutation();
  const onSubmit: SubmitHandler<any> = async (fulldata) => {
    await forgotPassword(fulldata);
    setComplete(true);
  };

  return (
    <SignUpWrapper>
      <div className="head-div">Chippin.</div>
      <div className="main-div">
        <div className="sub-div1">
          <h1 className="title-heading">Chippin.</h1>
        </div>
        <div className="sub-div2">
          <div className="form-div">
            <h2 className="signup-head">Forgot Password</h2>

            <div className="form-main-div">
              {complete ? (
                <div>If an account with that email exists, we sent you an email.</div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="form">
                  <InputField
                    label="Email"
                    type={HTMLInputTypes.TEXT}
                    register={register as UseFormRegister<FormRegisterInputs>}
                    errors={errors}
                    errorMessage={
                      errors.email?.message
                        ? errors.email?.message
                        : "Invalid email"
                    }
                    fieldToRegister={`email`}
                    placeHolder="email"
                    required={true}
                    pattern={regex.email}
                  />

                  <button type="submit" className="form-button">
                    Forgot Password
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </SignUpWrapper>
  );
};

export default ForgotPassword;
