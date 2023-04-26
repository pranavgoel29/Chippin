import React from "react";
import { SubmitHandler, UseFormRegister, useForm } from "react-hook-form";
import InputField from "../../common/Inputs";
// import Button from "@mui/material/Button";
import {
  EditProfileInputs,
  FormRegisterInputs,
  HTMLInputTypes,
} from "../../utils/types";
// import { regex } from "../../utils";

import {
  useChangePasswordMutation,
  useLoginMutation,
} from "../../generated/graphql";
import { useNavigate, useParams } from "react-router-dom";
import { getFieldMap, getMessageMap } from "../../utils/toErrorMap";
import SignUpWrapper from "../../common/SignUpWrapper";
import { Pages } from "../../routes";

const ChangePassword: React.FC<EditProfileInputs> = () => {
  const navigate = useNavigate();

  const { token_id: token } = useParams();

  console.log(token);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<EditProfileInputs>({});

  // We will be using these custom hooks instead of using useMutation-hook from 'urql'.
  const [, changePassword] = useChangePasswordMutation();
  const onSubmit: SubmitHandler<any> = async (fulldata) => {
    const response = await changePassword({
      newPassword: fulldata.newPassword,
      //@ts-ignore
      token,
    });

    console.log(response);

    // // Handling errors;
    if (response.data?.changePassword.errors) {
      console.log(getFieldMap(response?.data.changePassword.errors));
      setError(
        //@ts-ignore
        `${getFieldMap(response.data.changePassword.errors)}`,
        {
          type: "custom",
          message: `${getMessageMap(response.data.changePassword.errors)}`,
        }
      );
    } else if (response.data?.changePassword.user) {
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
            <h2 className="signup-head">Change Password</h2>

            <div className="form-main-div">
              <form onSubmit={handleSubmit(onSubmit)} className="form">
                <InputField
                  label="Password"
                  type={HTMLInputTypes.PASSWORD}
                  register={register as UseFormRegister<FormRegisterInputs>}
                  errors={errors}
                  errorMessage={
                    errors.newPassword?.message
                      ? errors.newPassword?.message
                      : "Field is required"
                  }
                  fieldToRegister={`newPassword`}
                  placeHolder="Password"
                  required={true}
                />

                <button type="submit" className="form-button">
                  Change Password
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </SignUpWrapper>
  );
};

export default ChangePassword;
