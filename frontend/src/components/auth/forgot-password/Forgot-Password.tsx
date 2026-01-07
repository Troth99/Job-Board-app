import "./ForgotPassword.css"

export function ForgotPassowrd() {

    return (
        <div className="forgot-password-page">
<div className="forgot-password-container">
  <h2>Forgot password</h2>
  <form className="forgot-password-form">
    <label htmlFor="email">Email:</label>
    <input
      type="email"
      id="email"
      required
    />
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