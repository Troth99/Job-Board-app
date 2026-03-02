import { useState } from "react";
import { useParams } from "react-router";
import useCompany from "../../../hooks/useCompany";
import useForm from "../../../hooks/useForm";
import { useValidation } from "../../validators/useValidation";
import "./CompanyMembers.css";

const initialValue = {
  email: "",
};

export function CompanyMembers() {
  const { companyId } = useParams();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [userEmailExistError, setuserEmailExistError] = useState<string>("");
  const { validateEmail } = useValidation();
  const { checkUser, addMemberToCompany } = useCompany();

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
    if (!companyId || !values.email) {
      console.error("Data is missing");
      return;
    }
    try {
      const response = await checkUser(values.email);
      if (!response || response.message === "User does not exist") {
        setuserEmailExistError("User does not exist!");
        return;
      }
      if (!response.userId) {
        setuserEmailExistError(
          "User ID not found! Backend must return userId."
        );
        return;
      }
      const result = await addMemberToCompany(companyId, response.userId);

      //to set notification for invitations for company

      if (result.success) {
        setShowModal(false);
      } else {
        setuserEmailExistError("User is already a member");
      }
    } catch (error: any) {
      setuserEmailExistError(
        "Failed to check if the user exists in the backend"
      );
    }
  };

  const { register, formHandler, errors, setErrors } = useForm(
    addMemberHandler,
    initialValue,
    validators
  );

  const handleCloseModal = () => {
    setShowModal(false);
    setErrors({});
    setuserEmailExistError("");
  };
  return (
    <>
      <div className="content-header">
        <button className="add-button" onClick={() => setShowModal(true)}>
          + Add Member
        </button>
      </div>

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
              {errors.email && (
                <div className="error-message">{errors.email}</div>
              )}
              <div className="error-message">{userEmailExistError}</div>
              <button type="submit">Add</button>
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
