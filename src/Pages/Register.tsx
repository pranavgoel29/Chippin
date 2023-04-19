import React from "react";
import { SubmitHandler, UseFormRegister, useForm } from "react-hook-form";
import InputField from "../common/Inputs";
import {
  EditProfileInputs,
  FormRegisterInputs,
  HTMLInputTypes,
} from "../utils/types";
import { regex } from "../utils";
import styled from "styled-components";

const FormWrapper = styled.div`
  height: 100vh;
  padding: 40px;
  form {
    width: 20em;
    input {
      margin-bottom: 12px;
    }
  }
`;

const Register: React.FC<EditProfileInputs> = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<EditProfileInputs>({});

  const onSubmit: SubmitHandler<any> = async (fulldata) => {
    console.log(fulldata);
  };

  return (
    <FormWrapper>
      <h2>Hello</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          type={HTMLInputTypes.TEXT}
          register={register as UseFormRegister<FormRegisterInputs>}
          errors={errors}
          errorMessage="Invalid User Name"
          fieldToRegister={`userName`}
          placeHolder="User Name"
          required={true}
          pattern={regex.userName}
        />
        <InputField
          type={HTMLInputTypes.PASSWORD}
          register={register as UseFormRegister<FormRegisterInputs>}
          errors={errors}
          errorMessage="Field is required"
          fieldToRegister={`password`}
          placeHolder="Password"
          required={true}
        />
        <button type="submit">Submit</button>
      </form>
    </FormWrapper>
  );
};

export default Register;
