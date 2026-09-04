import Spinner from "../Spinner/Spinner";

interface LoadingIndicatorProps {
  message?: string;
  size?: "small" | "medium" | "large";
}

// Thin alias kept for readability at call sites; the real spinner lives in Spinner.tsx.
export function LoadingIndicator({ message = "Loading...", size = "medium" }: LoadingIndicatorProps) {
  return <Spinner variant="inline" size={size} message={message} />;
}
