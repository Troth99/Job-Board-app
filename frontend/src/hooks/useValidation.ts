import { useState } from "react";


export function useValidation() {
    const [errors, setErrors] = useState<{[key: string] : string}>({});

    const validateEmail = (email:string) => {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if(!email) {
            setErrors((prev) => ({...prev, email: 'Email is required!'}))
        }else if (!regex.test(email)){
            setErrors((prev) => ({...prev, email: 'Please enter a valid email.'}))
        }else {
             setErrors((prev) => ({ ...prev, email: '' }));
        }
    }

      const validatePassword = (password: string) => {
    if (!password) {
      setErrors((prev) => ({ ...prev, password: 'Password is required' }));
    } else {
      setErrors((prev) => ({ ...prev, password: '' }));
    }
  };


  return {
    errors,
    validateEmail,
    validatePassword
  }
}
