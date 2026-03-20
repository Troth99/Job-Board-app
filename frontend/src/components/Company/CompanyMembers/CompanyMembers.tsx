import { useEffect, useState } from "react";
import { useParams } from "react-router";
import useCompany from "../../../hooks/useCompany";
import useForm from "../../../hooks/useForm";
import { useValidation } from "../../validators/useValidation";
import "./CompanyMembers.css";
import { useNotification } from "../../../hooks/useNotification";

const initialValue = {
  email: "",
};

export function CompanyMembers() {
  const { companyId } = useParams();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [userEmailExistError, setuserEmailExistError] = useState<string>("");
  const { validateEmail } = useValidation();
  const { checkUser } = useCompany();
  const { createNotificationByEmail } = useNotification();

  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validators = (value: { email: string }) => {
    const errors: Partial<{ email: string }> = {};
    const emailError = validateEmail(value.email);
    if (emailError) {
      errors.email = emailError;
    }
    return errors;
  };

  const addMemberHandler = async (values: { email: string }) => {
    setuserEmailExistError("");
    setSuccessMessage("");
    setIsSubmitting(true);

    if (!companyId || !values.email) {
      console.error("Data is missing");
         setIsSubmitting(false);
      return;
    }
    try {
      const response = await checkUser(values.email);
      if (!response || response.message === "User does not exist") {
        setuserEmailExistError("User does not exist!");
           setIsSubmitting(false);
        return;
      }
      if (!response.userId) {
        setuserEmailExistError(
          "User ID not found! Backend must return userId.",
        );
        setIsSubmitting(false);
        return;
      }
      await createNotificationByEmail(values.email, {
        sender: localStorage.getItem("userId"),
        company: companyId,
        message: "You have a new company invitation.",
        type: "company_invite",
        actionRequired: true,
        actionType: "accept_reject",
      });
      setSuccessMessage("Invitation sent successfully");
    } catch (error: any) {
      setIsSubmitting(false);
      setuserEmailExistError(
        "Failed to check if the user exists in the backend",
      );
    }
  };

  const { register, formHandler, errors, setErrors, reset } = useForm(
    addMemberHandler,
    initialValue,
    validators,
  );

  const handleCloseModal = () => {
    setShowModal(false);
    setErrors({});
    setuserEmailExistError("");
    setSuccessMessage("");
    setIsSubmitting(false);
    reset()
  
  };
  return (
    <>
   
        <button className="add-button" onClick={() => setShowModal(true)}>
          + Add Member
        </button>
     

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Add Member</h3>
            <form onSubmit={formHandler}>
              <input
                type="email"
                placeholder="Enter member email"
                {...register("email")}
              />
              {successMessage && (
                <div className="success-message">{successMessage}</div>
              )}
              {errors.email && (
                <div className="error-message">{errors.email}</div>
              )}
              <div className="error-message">{userEmailExistError}</div>
              <button type="submit" disabled={isSubmitting}>Add</button>
            </form>
            <button className="modal-close-f2" onClick={handleCloseModal}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* Displaying Member List */}
    </>
  );
}
