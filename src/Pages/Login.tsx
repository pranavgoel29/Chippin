import React from "react";
import { SubmitHandler, UseFormRegister, useForm } from "react-hook-form";
import InputField from "../common/Inputs";
import Button from "@mui/material/Button";
import {
  EditProfileInputs,
  FormRegisterInputs,
  HTMLInputTypes,
} from "../utils/types";
import { regex } from "../utils";
import styled from "styled-components";
import { useLoginMutation, useRegisterMutation } from "../generated/graphql";
import { useNavigate } from "react-router-dom";
import { getFieldMap, getMessageMap } from "../utils/toErrorMap";

const FormWrapper = styled.div`
  height: 100vh;

  width: 100%;
  max-width: 800px;
  margin: auto;
  .container {
    padding: 40px;
    h2 {
      margin-bottom: 8px;
    }
  }
  form {
    // width: 20em;
  }
`;

const Login: React.FC<EditProfileInputs> = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    control,
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
    <FormWrapper>
      <div className="container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
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
          <Button
            type="submit"
            variant="contained"
            style={{ backgroundColor: "#202020" }}
          >
            Login
          </Button>
        </form>
      </div>
    </FormWrapper>
  );
};

export default Login;