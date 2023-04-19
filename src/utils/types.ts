import {
  FieldErrors,
  UseFormGetValues,
  UseFormRegister,
  UseFormWatch,
  ValidationRule,
} from "react-hook-form";

export type EditProfileInputs = {
  fullName: string;
  email: string;
  phoneNumber?: string;
};

export type FormRegisterInputs = EditProfileInputs;

export enum HTMLInputTypes {
  EMAIL = "email",
  FILE = "file",
  TEXT = "text",
  DATE = "date",
  PASSWORD = "password",
}

export type InputProps = {
  type: HTMLInputTypes;
  register: UseFormRegister<FormRegisterInputs>;
  errors?: FieldErrors<any>;
  errorMessage?: string;
  fieldToRegister: any;
  placeHolder: string;
  required?: ValidationRule<boolean>;
  pattern?: ValidationRule<RegExp>;
  disabled?: boolean;
  getValues?: UseFormGetValues<FormRegisterInputs>;
  watch?: UseFormWatch<FormRegisterInputs>;
  onChangeValue?: Function;
  useFormRegisterConfig?: any;
};
