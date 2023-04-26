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
import { Link, useNavigate } from "react-router-dom";
import { getFieldMap, getMessageMap } from "../../utils/toErrorMap";
import SignUpWrapper from "../../common/SignUpWrapper";
import { Pages } from "../../routes";
import theme from "../../styles/theme";

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
      console.log(getFieldMap(response?.data.login.errors));
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
            <h2 className="signup-head">Login</h2>

            <div className="form-main-div">
              <form onSubmit={handleSubmit(onSubmit)} className="form">
                <InputField
                  label="Username or Email"
                  type={HTMLInputTypes.TEXT}
                  register={register as UseFormRegister<FormRegisterInputs>}
                  errors={errors}
                  errorMessage={
                    errors.usernameOrEmail?.message
                      ? errors.usernameOrEmail?.message
                      : "Invalid userName"
                  }
                  fieldToRegister={`usernameOrEmail`}
                  placeHolder="username or email"
                  required={true}
                  // pattern={regex.userName || regex.email}
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
                <div className="createNewLink" style={{ marginTop: "25px" }}>
                  <Link
                    to={Pages.FORGOT_PASSWORD}
                    style={{ color: `${theme.gray}`, fontSize: "12px" }}
                  >
                    Forgot Password?
                  </Link>
                </div>
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
