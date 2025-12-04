import "./ApplyForJob.css";
import useForm from "../../../hooks/useForm";

const initialValues = {
  email: "",
  phone: "",
  cv: "",
  coverLetter: "",
};

const validateForm = (values: typeof initialValues) => {
  const errors: Record<string, string> = {};
  if (!values.email) errors.email = "Email is required";
  if (!values.cv) errors.cv = "CV is required";
  return errors;
};

export function ApplyForJobModal({
  jobId,
  jobTitle,
  onClose,
}: {
  jobId: string;
  jobTitle?: string;
  onClose: () => void;
}) {
  const submitCallback = () => {
    // Add your submission logic here
    // Example: send data to backend, show success/error, etc.
  };
  const { register, values, errors } = useForm(
    submitCallback,
    initialValues,
    validateForm
  );

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your submission logic here
    // Example: send data to backend, show success/error, etc.
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose} title="Close">
          ×
        </button>
        <div className="modal-header">
          <h2>Apply for {jobTitle}</h2>
          <p className="modal-desc">
            Show your best! Upload your CV and add a short cover letter.
          </p>
        </div>
        <form onSubmit={submitHandler} className="modal-form">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Your email address"
            {...register("email")}
          />
          {errors.email && <div className="error-message">{errors.email}</div>}

          <label htmlFor="phone">Phone</label>
          <input
            id="phone"
            type="phone"
            placeholder="Phone number"
            {...register("phone")}
          />
          {errors.phone && <div className="error-message">{errors.phone}</div>}

          <label htmlFor="cv">Upload CV</label>
          <input
            id="cv"
            type="file"
            accept=".pdf,.doc,.docx"
            {...register("cv")}
          />
          {errors.cv && <div className="error-message">{errors.cv}</div>}

          <label htmlFor="coverLetter">Cover Letter</label>
          <textarea
            id="coverLetter"
            placeholder="Write a short motivation..."
            {...register("coverLetter")}
            rows={4}
            style={{ resize: "vertical" }}
          />

          <button type="submit" className="send-btn">
            Send Application
          </button>
        </form>
      </div>
    </div>
  );
}
