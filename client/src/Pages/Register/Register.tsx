import React from "react";
import SignUpWrapper from "../../common/SignUpWrapper";
import { Pages } from "../../routes";

import { SubmitHandler, UseFormRegister, useForm } from "react-hook-form";
import InputField from "../../common/Inputs";

import {
  EditProfileInputs,
  FormRegisterInputs,
  HTMLInputTypes,
} from "../../utils/types";
import { regex } from "../../utils";

import { useRegisterMutation } from "../../generated/graphql";
import { useNavigate } from "react-router-dom";
import { getFieldMap, getMessageMap } from "../../utils/toErrorMap";

const Register = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<EditProfileInputs>({});

  // We will be using these custom hooks instead of using useMutation-hook from 'urql'.
  const [user, registerUser] = useRegisterMutation();
  const onSubmit: SubmitHandler<any> = async (fulldata) => {
    const response = await registerUser({ options: fulldata });

    // Handling errors;
    if (response.data?.register.errors) {
      setError(
        //@ts-ignore
        `${getFieldMap(response.data.register.errors)}`,
        {
          type: "custom",
          message: `${getMessageMap(response.data.register.errors)}`,
        }
      );
    } else if (response.data?.register.user) {
      // Worked
      navigate(Pages.HOME);
    }
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
            <h2 className="signup-head">Register</h2>

            <div className="form-main-div">
              <form onSubmit={handleSubmit(onSubmit)} className="form">
                <InputField
                  label="Username"
                  type={HTMLInputTypes.TEXT}
                  register={register as UseFormRegister<FormRegisterInputs>}
                  errors={errors}
                  errorMessage={
                    errors.username?.message
                      ? errors.username?.message
                      : "Invalid userName"
                  }
                  fieldToRegister={`username`}
                  placeHolder="username"
                  required={true}
                  pattern={regex.userName}
                />

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

                <InputField
                  label="Password"
                  type={HTMLInputTypes.PASSWORD}
                  register={register as UseFormRegister<FormRegisterInputs>}
                  errors={errors}
                  errorMessage={
                    errors.password?.message
                      ? errors.password?.message
                      : "Field is required"
                  }
                  fieldToRegister={`password`}
                  placeHolder="Password"
                  required={true}
                />
                {/* <Button
                  type="submit"
                  variant="contained"
                  style={{ backgroundColor: "#202020" }}
                >
                  Register
                </Button> */}
                <button type="submit" className="form-button">
                  Register
                </button>
              </form>
            </div>
            <div className="signup-link">
              <p className="signup-link-text">
                Already have an Account?{" "}
                <a
                  onClick={() => navigate(Pages.LOGIN)}
                  className="signup-link-text2"
                >
                  Login
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </SignUpWrapper>
  );
};

export default Register;
