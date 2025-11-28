import { useEffect, useState } from "react";


interface FormValues {
  [key: string]: string | undefined;
}


type CallbackFunction = (values: FormValues) => void;

export default function useForm(callBack: CallbackFunction, initialValues: FormValues, validateForm: Function) {
    const [values, setValues] = useState<FormValues>(initialValues);
    const [errors, setErrors] = useState<FormValues>({}); 

   
    useEffect(() => {
        setValues(initialValues);
    }, [initialValues]);

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setValues(state => ({
            ...state,
            [name]: value
        }));
    }

    const formHandler = (e: React.FormEvent) => {
        e.preventDefault();
        
        const formErrors = validateForm(values);
        setErrors(formErrors); 

 
        if (Object.keys(formErrors).length > 0) {
            return;
        }

   
        callBack(values);  
    }

 
    const register = (fieldName: string) => {
        return {
            name: fieldName,
            onChange: changeHandler,
            value: values[fieldName]
        };
    };

    return {
        values,
        register,
        formHandler,
        errors, 
    };
}
