import { useState } from "react"
import "./ForgotPassword.css"
import useForm from "../../../hooks/useForm";
import { useValidation } from "../../validators/useValidation";

const initialFormValue = {
    email: ''
}

export function ForgotPassowrd() {
    const [userEmail, setUserEmail] = useState<string>();
    const {validateForm} = useValidation()


    const resetLinkSendHandler = () => {
        console.log(values)
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
    <button type="submit">
      Send link for new password
    </button>
  </form>
  {/* Покажи това, ако има таймер */}
  {/* <p>Може да изпратите отново след 30 сек.</p> */}
  {/* Покажи това, ако таймерът е 0 */}
  {/* <button>Изпрати отново линк</button> */}
  {/* Съобщения за успех/грешка */}
  {/* <p className="success-message">Успешно изпратен линк!</p> */}
  {/* <p className="error-message">Възникна грешка!</p> */}
</div>
        </div>

    )
}