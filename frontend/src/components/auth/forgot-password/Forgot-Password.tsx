import { useEffect, useState } from "react"
import "./ForgotPassword.css"
import useForm from "../../../hooks/useForm";
import { useValidation } from "../../validators/useValidation";
import useAuth from "../../../hooks/useAuth";

const initialFormValue = {
    email: ''
}

export function ForgotPassowrd() {
    const [userEmail, setUserEmail] = useState<string>();
    const [timer, setTimer] = useState<number>(0);
    const [success, setSuccess] = useState<string>('')
    const [error, setError] = useState<string>('')
    const [loading, setLoading] = useState<boolean>()
    const {validateForm} = useValidation()
    const {sendResetPasswordLink} = useAuth()

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if(timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1)
            }, 1000)
        }

        return () => {
            if(interval) clearInterval(interval)
        }
    },[timer])

    const resetLinkSendHandler = async (values: {email: string}) => {
      try {
      await sendResetPasswordLink(values.email)
        setTimer(60)
      } catch (error) {
        console.error('Failed to send reset password email')
      }
    }


  const { values, register, formHandler, errors, setErrors } =
    useForm(resetLinkSendHandler, initialFormValue, validateForm);

    return (
        <div className="forgot-password-page">
<div className="forgot-password-container">
  <h2>Forgot password</h2>
  <form className="forgot-password-form" onSubmit={formHandler}>
    <label htmlFor="email">Email:</label>
    <input
      type="email"
      id="email"
      placeholder="Peter@yahoo.com"
      {...register('email')}
        required
    />
        {errors && <div className="error-message">{errors.email}</div>}
    <button type="submit" disabled={timer > 0}>
     {timer > 0 ? `Request again after ${timer}c` : 'Request reset link.'}
    </button>
  </form>
  {/* Покажи това, ако има таймер */}
  {/* <p>Може да изпратите отново след 30 сек.</p> */}
  {/* Покажи това, ако таймерът е 0 */}
  {/* <button>Изпрати отново линк</button> */}
<p className="success-message">Успешно изпратен линк!</p>
  {/* <p className="error-message">Възникна грешка!</p> */}
</div>
        </div>

    )
}