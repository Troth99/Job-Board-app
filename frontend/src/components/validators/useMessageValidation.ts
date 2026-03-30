// useMessageValidation.ts
// Custom hook for validating message input (not empty)
import { useState } from "react";

export function useMessageValidation() {
  const [error, setError] = useState<string | null>(null);

  const validateMessage = (message: string) => {
    if (!message.trim()) {
      setError("Message cannot be empty.");
      return false;
    }
    setError(null);
    return true;
  };

  return { error, validateMessage, setError };
}
