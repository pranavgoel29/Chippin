import React from "react";
import { SubmitHandler, UseFormRegister, useForm } from "react-hook-form";
import InputField from "../../common/Inputs";
import Button from "@mui/material/Button";

import {
  EditProfileInputs,
  FormRegisterInputs,
  HTMLInputTypes,
} from "../../utils/types";

import theme from "../../styles/theme";
import styled from "styled-components";

const CreateExpenseWrapper = styled.div`
  font-family: Montserrat;
  height: fit-content;
  border-radius: 24px;
  padding: 40px;
  background-color: ${theme.cardBackgroundAccentColor};
  min-width: 280px;

  .createExpenseHeading {
    color: ${theme.dark_beige};
    margin-bottom: 10px;
    font-weight: 600;
  }

  form {
    input {
      background-color: ${theme.cardInputColor};
    }

    .createExpenseButton {
      margin-top: 10px;
      font-weight: 600;
    }
  }
`;

const CreateExpense: React.FC<EditProfileInputs> = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditProfileInputs>({});

  // We will be using these custom hooks instead of using useMutation-hook from 'urql'.

  const onSubmit: SubmitHandler<any> = async (fulldata) => {
    console.log(fulldata);
  };

  return (
    <CreateExpenseWrapper>
      <h2 className="createExpenseHeading">Create Expense</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <InputField
          label="Title"
          type={HTMLInputTypes.TEXT}
          register={register as UseFormRegister<FormRegisterInputs>}
          errors={errors}
          errorMessage={"Field is required"}
          fieldToRegister={`title`}
          placeHolder="Title"
          required={true}
        />

        <InputField
          label="Price"
          type={HTMLInputTypes.TEXT}
          register={register as UseFormRegister<FormRegisterInputs>}
          errors={errors}
          errorMessage={"Field is required"}
          fieldToRegister={`price`}
          placeHolder="Price"
          required={true}
        />
        <Button
          type="submit"
          className="createExpenseButton"
          variant="contained"
          style={{
            backgroundColor: `${theme.button_dark_beige}`,
            color: `${theme.button_font}`,
            fontWeight: "700",
          }}
        >
          Create Expense
        </Button>
      </form>
    </CreateExpenseWrapper>
  );
};

export default CreateExpense;
