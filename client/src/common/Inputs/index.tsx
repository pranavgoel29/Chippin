import React from "react";
import { HTMLInputTypes, InputProps } from "../../utils/types";
import { checkForErrors } from "../formUtils";
import { breakpoints } from "../../styles/Breakpoints";

import styled from "styled-components";

export const InputWrapper = styled.div`
  margin-bottom: 8px;
  input {
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;

    background-color: rgba(71, 84, 103, 0.05);

    

    margin-top: 3px;

    width: 100%;
    height: 40px;
    border-radius: 12px;
    border: 0;

    padding-left: 10px;
    font-family: Nunito Sans, sans-serif;

    :focus {
      outline: 1;
    }

    :valid {
      border: 0px solid;
    }

    :placeholder-shown {
      border: 0;
    }
  }

  .errorMessage {
    font-size: 14px;
    color: #c82f2f;
    margin-top: 5px;
    font-weight: 600;
  }

  @media screen and (max-width: ${breakpoints.sm}) {
    .errorMessage {
      font-size: 12px;
    }
  }
`;

const InputField = ({
  type,
  register,
  errors,
  errorMessage,
  fieldToRegister,
  placeHolder,
  required = false,
  pattern,
  disabled,
  getValues,
  watch,
  label,
  useFormRegisterConfig,
}: InputProps) => {
  const registerConfig = {
    required,
    ...(useFormRegisterConfig || {}),
    ...(pattern ? { pattern } : {}), // Uses pattern only if any valid regex is passed as a prop.
  };

  const validField =
    watch && type === HTMLInputTypes.DATE && watch(fieldToRegister);
  const { onChange: formOnChange, ...rest } = register(
    fieldToRegister,
    registerConfig
  );

  return (
    <InputWrapper>
      <label htmlFor={fieldToRegister}>{label}</label>
      <input
        {...rest}
        className={` ${disabled && "cursor-not-allowed"} `}
        disabled={disabled}
        type={type}
        placeholder={required ? `${placeHolder}*` : placeHolder}
      />

      {errors &&
        Object.keys(errors).length > 0 &&
        checkForErrors({ fieldToRegister, errors }) && (
          <p className="errorMessage">{errorMessage}</p>
        )}
    </InputWrapper>
  );
};

export default InputField;
