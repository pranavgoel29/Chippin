import React from "react";
import { SubmitHandler, UseFormRegister, useForm } from "react-hook-form";
import InputField from "../common/Inputs";
import { EditProfileInputs, FormRegisterInputs, HTMLInputTypes } from "../utils/types";
import { regex } from "../utils";

// interface registerProps {}

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
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputField
        type={HTMLInputTypes.TEXT}
        register={register as UseFormRegister<FormRegisterInputs>}
        errors={errors}
        errorMessage="Invalid Full Name"
        fieldToRegister={`fullName`}
        placeHolder="Full Name"
        required={true}
        pattern={regex.fullName}
      />
    </form>
  );
};

export default Register;
