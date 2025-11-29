import "./LoadingIndicator.css"

interface LoadingIndicatorProps {
  message?: string;
  size?: "small" | "medium" | "large";
}



export function LoadingIndicator({ message = "Loading...", size = "medium" }: LoadingIndicatorProps) {
  const sizeMap = {
    small: "30px",
    medium: "50px",
    large: "70px"
  };

    return (
    <div className="loading-indicator-container">
      <div 
        className="loading-spinner" 
        style={{
          width: sizeMap[size],
          height: sizeMap[size]
        }}
      ></div>
      {message && <p className="loading-message">{message}</p>}
    </div>
  );
}