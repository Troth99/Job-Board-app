import "./ApplyForJob.css";
import useForm from "../../../../shared/hooks/useForm";
import useApplications from "../../hooks/useJobApplications";
import { getUserFromLocalStorage } from "../../../auth/hooks/useAuth";
import { useMemo, useState } from "react";
import { Trans,  } from "@lingui/react/macro";
import {t} from "@lingui/core/macro"
import { User } from "../../../profile/types/profileSectionTypes";

type FormValues = {
  email: string;
  phone: string;
  cv: string;
  coverLetter: string;
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
  userData
}: {
  jobId: string;
  jobTitle?: string;
  onClose: () => void;
  userData: User
}) {
  const { createApplication } = useApplications();
  const user = getUserFromLocalStorage();
  const userId = user._id;
  const [success, setSuccess] = useState(false);
  
  // Initialize form values with user data
  const initialValues = useMemo(
    () => ({
      email: userData.email || "",
      phone: userData.phone || "",
      cv: "",
      coverLetter: "",
    }),
    [userData.email, userData.phone],
  );

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
    validateForm,
  );

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose} title="Close">
          ×
        </button>
        <div className="modal-header">
          <h2>
            <Trans>Apply for {jobTitle}</Trans>
          </h2>
          <p className="modal-desc">
            <Trans>
              Show your best! Paste a link to your CV and add a short cover
              letterM
            </Trans>
            .
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
            <Trans> Your CV has been sent.</Trans>
            <br />
            <Trans>We will contact you!</Trans>
          </div>
        ) : (
          <form onSubmit={formHandler} className="modal-form">
            <label htmlFor="email">
              <Trans>Email</Trans>
            </label>
            <input
              id="email"
              type="email"
              {...register("email")}
              placeholder={t`Your email address`}
              readOnly
            />
            {errors.email && (
              <div className="error-message">{errors.email}</div>
            )}

            <label htmlFor="phone">
              <Trans>Phone</Trans>
            </label>
            <input
              id="phone"
              type="phone"
              placeholder={t`Phone number`}
              {...register("phone")}
            />
            {errors.phone && (
              <div className="error-message">{errors.phone}</div>
            )}

            <label htmlFor="cv">
              <Trans>CV Link</Trans>
            </label>
            <input
              id="cv"
              type="text"
              placeholder={t`Paste your CV link (Google Drive, Dropbox, etc.)`}
              {...register("cv")}
            />
            {errors.cv && <div className="error-message">{errors.cv}</div>}

            <label htmlFor="coverLetter">
              <Trans>Cover Letter</Trans>
            </label>
            <textarea
              id="coverLetter"
              placeholder={t`Write a short motivation...`}
              {...register("coverLetter")}
              rows={4}
              style={{ resize: "vertical" }}
            />

            <button type="submit" className="send-btn">
              <Trans>Send Application</Trans>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
