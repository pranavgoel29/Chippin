import { FieldErrors } from "react-hook-form";

export const checkForErrors = ({
  fieldToRegister,
  errors,
}: {
  fieldToRegister: string;
  errors: FieldErrors<any>;
}): boolean => {
  // Fot Contacts + Profile Forms.

  // @ts-ignore
  return errors[fieldToRegister];
};
