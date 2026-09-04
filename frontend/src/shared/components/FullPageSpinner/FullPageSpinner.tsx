import Spinner from "../Spinner/Spinner";

// Thin alias kept for readability at call sites; the real spinner lives in Spinner.tsx.
export default function FullPageSpinner() {
  return <Spinner variant="fullpage" />;
}
