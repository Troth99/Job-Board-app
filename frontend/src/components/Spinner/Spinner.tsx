import "./bodySpinner.css"
interface SpinnerProps {
  overlay?: boolean;
}

export default function Spinner({ overlay = false }: SpinnerProps) {
  if (!overlay) return null; 

  return (
      <div className="profile-body" style={{ position: "relative" }}>
        <div className="body-spinner">
          <div className="spinner-body"></div> 
        </div>
    </div>
      );
}