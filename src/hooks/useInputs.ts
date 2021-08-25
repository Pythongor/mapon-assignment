import { useState } from "react";

export const useInputs = <
  KeyType extends string,
  InputsValuesType extends { [index in KeyType]: unknown }
>(
  initialValues: InputsValuesType
) => {
  const [inputValues, setInputsValues] =
    useState<InputsValuesType>(initialValues);

  const initialErrorsEntries = Object.keys(initialValues).map(
    (key) => [key, false] as [KeyType, false]
  );
  const initialErrors = Object.fromEntries(initialErrorsEntries) as Record<
    KeyType,
    boolean
  >;
  const [errors, setErrors] = useState<Record<KeyType, boolean>>(initialErrors);

  const changeInputHandler = (key: KeyType, value: string) => {
    setInputsValues((values: InputsValuesType) => ({
      ...values,
      [key]: value,
    }));
    changeErrorHandler(key, false);
  };
  const changeErrorHandler = (key: KeyType, value: boolean) => {
    setErrors((errors) => ({
      ...errors,
      [key]: value,
    }));
  };

  return { inputValues, errors, changeInputHandler, changeErrorHandler };
};
