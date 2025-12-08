import { useEffect, useState } from "react";

export type FormValues = Record<string, string | undefined>;

type CallbackFunction<T extends FormValues> = (
  values: T
) => void | Promise<void>;

type ValidateFunction<T extends FormValues> = (values: T) => Partial<T>;

export default function useForm<T extends FormValues>(
  callBack: CallbackFunction<T>,
  initialValues: T,
  validateForm: ValidateFunction<T>
) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<T>>({});

  useEffect(() => {
    setValues(initialValues);
  }, [initialValues]);

  const changeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setValues((state) => ({
      ...state,
      [name]: value,
    }));
    // Clear this field's error while typing
    setErrors((prev) => ({
      ...prev,
      [name]: undefined,
    }));
  };

  const blurHandler = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name } = e.target;
    const formErrors = validateForm(values);
    // Only update the specific field's error on blur
    setErrors((prev) => ({
      ...prev,
      [name]: (formErrors as any)[name],
    }));
  };

  const formHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    const formErrors = validateForm(values);
    setErrors(formErrors);

    if (Object.keys(formErrors).length > 0) {
      return;
    }

    await callBack(values);
    
  };

  const register = (fieldName: keyof T & string) => {
    return {
      name: fieldName,
      onChange: changeHandler,
      onBlur: blurHandler,
      value: values[fieldName],
    };
  };

  const setFieldValue = (field: keyof T, value: any) => {
    setValues((state) => ({
      ...state,
      [field]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [field]: undefined,
    }));
  };
  return {
    values,
    register,
    formHandler,
    errors,
    setErrors,
    setFieldValue,
  };
}
