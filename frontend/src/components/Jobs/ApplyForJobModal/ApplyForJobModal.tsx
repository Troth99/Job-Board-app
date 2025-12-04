import "./ApplyForJob.css";
import useForm from "../../../hooks/useForm";
import useJobs from "../../../hooks/useJobs";
import { getUserFromLocalStorage } from "../../../hooks/useAuth";
import { useState } from "react";

type FormValues = {
  email: string;
  phone: string;
  cv: string;
  coverLetter: string;
};

const initialValues = {
  email: "",
  phone: "",
  cv: "",
  coverLetter: "",
};

const validateForm = (values: typeof initialValues) => {
  const errors: Record<string, string> = {};
  if (!values.email) errors.email = "Email is required";
  if (!values.cv) errors.cv = "CV link is required";
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
  const { createApplication } = useJobs();
  const user = getUserFromLocalStorage();
  const userId = user._id;
  const [success, setSuccess] = useState(false);

  const submitHandler = async (formValues: FormValues) => {
    if (!jobId) {
      console.error("Job id is missing.");
      return;
    }
    try {
      const dataToSend = {
        ...formValues,
        jobId,
        userId,
        filename: "",
      };
      await createApplication(dataToSend);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 5000);
    } catch (error: any) {
      console.error("Failed to create application", error);
    }
  };

  const { register, errors, formHandler } = useForm(
    submitHandler,
    initialValues,
    validateForm
  );

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose} title="Close">
          ×
        </button>
        <div className="modal-header">
          <h2>Apply for {jobTitle}</h2>
          <p className="modal-desc">
            Show your best! Paste a link to your CV and add a short cover
            letter.
          </p>
        </div>
        {success ? (
          <div
            style={{
              textAlign: "center",
              color: "#1976d2",
              fontWeight: "bold",
              fontSize: "1.2rem",
              margin: "32px 0",
            }}
          >
            Your CV has been sent.
            <br />
            We will contact you!
          </div>
        ) : (
          <form onSubmit={formHandler} className="modal-form">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Your email address"
              {...register("email")}
            />
            {errors.email && (
              <div className="error-message">{errors.email}</div>
            )}

            <label htmlFor="phone">Phone</label>
            <input
              id="phone"
              type="phone"
              placeholder="Phone number"
              {...register("phone")}
            />
            {errors.phone && (
              <div className="error-message">{errors.phone}</div>
            )}

            <label htmlFor="cv">CV Link</label>
            <input
              id="cv"
              type="text"
              placeholder="Paste your CV link (Google Drive, Dropbox, etc.)"
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
        )}
      </div>
    </div>
  );
}
