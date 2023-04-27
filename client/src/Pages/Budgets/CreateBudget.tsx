import React from "react";
import { SubmitHandler, UseFormRegister, useForm } from "react-hook-form";
import InputField from "../../common/Inputs";
import Button from "@mui/material/Button";

import { regex } from "../../utils";
import { useIsAuth } from "../../utils/useIsAuth";

import {
  EditProfileInputs,
  FormRegisterInputs,
  HTMLInputTypes,
} from "../../utils/types";

import theme from "../../styles/theme";
import styled from "styled-components";
import {
  useBudgetsQuery,
  useCreateBudgetMutation,
} from "../../generated/graphql";

const CreateBudgetWrapper = styled.div`
  font-family: Montserrat;
  height: fit-content;
  border-radius: 24px;
  padding: 40px;
  background-color: ${theme.cardBackgroundAccentColor};
  min-width: 300px;
  max-width: 340px;

  .createBudgetHeading {
    color: ${theme.dark_beige};
    margin-bottom: 10px;
    font-weight: 600;
  }

  form {
    input {
      background-color: ${theme.cardInputColor};
    }

    .createBudgetButton {
      // width: 100%;
      margin-top: 20px;
      font-weight: 600;
    }

    .createBudgetButton:hover {
      background-color: ${theme.button_dark_beige_hover} !important;
    }
  }
`;

const CreateBudget: React.FC<EditProfileInputs> = () => {
  useIsAuth();
  const [{ data, fetching, error }, reexecute] = useBudgetsQuery();
  const [, createBudget] = useCreateBudgetMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditProfileInputs>({});

  const budgets = data?.budgets;
  console.log("data: ", data);

  // We will be using these custom hooks instead of using useMutation-hook from 'urql'.

  const onSubmit: SubmitHandler<any> = async (fulldata) => {
    console.log(fulldata);
    await createBudget({ input: fulldata });

    // Re-executing the query to update the budget list.
    reexecute({ requestPolicy: "network-only" });
  };

  return (
    <>
      {!data && fetching ? null : budgets?.length == 0 ? (
        <CreateBudgetWrapper>
          <>
            <h2 className="createBudgetHeading">Create Budget</h2>
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
                label="Budget"
                type={HTMLInputTypes.TEXT}
                register={register as UseFormRegister<FormRegisterInputs>}
                errors={errors}
                errorMessage={"Invalid Value (only numbers)"}
                fieldToRegister={`price`}
                placeHolder="Budget"
                required={true}
                pattern={regex.number}
              />
              <Button
                type="submit"
                className="createBudgetButton"
                variant="contained"
                style={{
                  backgroundColor: `${theme.button_dark_beige}`,
                  color: `${theme.button_font}`,
                  fontWeight: "700",
                }}
              >
                Create Budget
              </Button>
            </form>
          </>
        </CreateBudgetWrapper>
      ) : null}
    </>
  );
};

export default CreateBudget;
