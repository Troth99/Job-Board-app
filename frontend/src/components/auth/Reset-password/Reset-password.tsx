export default function ResetPassword() {
  return (
    <div className="reset-password-container">
      <h2>Reset Your Password</h2>
      <form>
        <input type="password" placeholder="New password" required />
        <input type="password" placeholder="Confirm new password" required />
        <button type="submit">Reset Password</button>
      </form>
      {/* Място за съобщения за успех или грешка */}
    </div>
  );
}
