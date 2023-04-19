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
import { getMessageMap } from "../utils/toErrorMap";

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
    console.log("data in form: ", fulldata);
    const response = await loginUser(fulldata);
    console.log("id: ", response?.data?.login?.user?.id);

    // Handling errors;
    if (response.data?.login) {
      console.log("error");
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
            errorMessage="Invalid User Name"
            fieldToRegister={`username`}
            placeHolder="Username"
            required={true}
            pattern={regex.userName}
          />
          {errors.username?.message}
          <InputField
            label="Password"
            type={HTMLInputTypes.PASSWORD}
            register={register as UseFormRegister<FormRegisterInputs>}
            errors={errors}
            errorMessage="Field is required"
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
