import { FieldErrors } from 'react-hook-form';

export const checkForErrors = ({
  fieldToRegister,
  errors,
}: {
  fieldToRegister: string;
  errors: FieldErrors<any>;
}): boolean => {
  // Fot Contacts + Profile Forms.
  const isAddress = fieldToRegister.split('.')[0] === 'address'; // Ex: address.addressLine1
  const isPrimaryAddress = fieldToRegister.split('.')[0] === 'primaryDddress'; // Ex: primaryAddress.addressLine1
  const isMailingAddress = fieldToRegister.split('.')[0] === 'mailingAddress'; // Ex: mailingAddress.addressLine1
  const isAddressWithoutAssetDescription = isAddress || isPrimaryAddress || isMailingAddress;

  if (!isAddressWithoutAssetDescription) { // @ts-ignore
    return errors[fieldToRegister];
  }
  if (isAddress)
    { // @ts-ignore
      return (
        // @ts-ignore
            errors['address'] && errors['address'][getFieldToInvestigate({ fieldToRegister, index: 1 })]
          );
    }
  if (isPrimaryAddress)
    {
      return (
            errors['primaryAddress'] &&
            // @ts-ignore
            errors['primaryAddress'][getFieldToInvestigate({ fieldToRegister, index: 1 })]
          );
    }
  if (isMailingAddress)
    return (
      errors['mailingAddress'] &&
      // @ts-ignore
      errors['mailingAddress'][getFieldToInvestigate({ fieldToRegister, index: 1 })]
    );
// @ts-ignore
  return errors[fieldToRegister];
};

const getFieldToInvestigate = ({
  fieldToRegister,
  index,
}: {
  fieldToRegister: string;
  index: number;
}): string => fieldToRegister.split('.')[index];
