import React from "react";
import { SubmitHandler, UseFormRegister, useForm } from "react-hook-form";
import InputField from "../../common/Inputs";
// import Button from "@mui/material/Button";
import {
  EditProfileInputs,
  FormRegisterInputs,
  HTMLInputTypes,
} from "../../utils/types";
import { regex } from "../../utils";

import { useLoginMutation } from "../../generated/graphql";
import { useNavigate } from "react-router-dom";
import { getFieldMap, getMessageMap } from "../../utils/toErrorMap";
import SignUpWrapper from "../../common/SignUpWrapper";
import { Pages } from "../../routes";

const Login: React.FC<EditProfileInputs> = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<EditProfileInputs>({});

  // We will be using these custom hooks instead of using useMutation-hook from 'urql'.
  const [user, loginUser] = useLoginMutation();
  const onSubmit: SubmitHandler<any> = async (fulldata) => {
    const response = await loginUser(fulldata);

    // Handling errors;
    if (response.data?.login.errors) {
      setError(
        //@ts-ignore
        `${getFieldMap(response.data.login.errors)}`,
        {
          type: "custom",
          message: `${getMessageMap(response.data.login.errors)}`,
        }
      );
    } else if (response.data?.login.user) {
      // Worked
      console.log("not error");
      navigate("/");
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
            <h2 className="signup-head">Login</h2>

            <div className="form-main-div">
              <form onSubmit={handleSubmit(onSubmit)} className="form">
                <InputField
                  label="User Name"
                  type={HTMLInputTypes.TEXT}
                  register={register as UseFormRegister<FormRegisterInputs>}
                  errors={errors}
                  errorMessage={
                    errors.username?.message
                      ? errors.username?.message
                      : "Invalid userName"
                  }
                  fieldToRegister={`username`}
                  placeHolder="Username"
                  required={true}
                  pattern={regex.userName}
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
              Login
            </Button> */}
                <button type="submit" className="form-button">
                  Login
                </button>
              </form>
            </div>
            <div className="signup-link">
              <p className="signup-link-text">
                Don't have an account?{" "}
                <a
                  onClick={() => navigate(Pages.REGISTER)}
                  className="signup-link-text2"
                >
                  Register here
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </SignUpWrapper>
  );
};

export default Login;