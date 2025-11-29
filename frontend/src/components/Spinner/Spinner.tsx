import "./bodySpinner.css"
interface SpinnerProps {
  overlay?: boolean;
  inline?: boolean;
}

export default function Spinner({ overlay = false, inline = false }: SpinnerProps) {
  if (!overlay && !inline) return null;

  if (inline) {
    return (
      <div className="loading-container">
        <div className="inline-spinner"></div>
      </div>
    );
  }

  return (
      <div className="profile-body" style={{ position: "relative" }}>
        <div className="body-spinner">
          <div className="spinner-body"></div> 
        </div>
    </div>
      );
}