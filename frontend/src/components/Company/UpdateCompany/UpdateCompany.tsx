import { useState } from "react";
import useForm from "../../../hooks/shared/useForm";
import { RegisterCompanyInterface } from "../RegisterCompany/RegisterCompany";
import { validateCompany } from "../../validators/useCompanyValidation";

const initialValues: RegisterCompanyInterface = {
  name: "",
  industry: "",
  location: "",
  email: "",
  phone: "",
  officeLocation: "",
  sector: "",
  whyWorkHere: "",
  description: "",
  website: "",
  logo: "",
  size: "",
  foundedYear: "",
};

function UpdateCompany() {
  const [loading, setLoading] = useState<boolean>(false);

  const formAction = async (values: RegisterCompanyInterface) => {};

  const validateForm = (values: RegisterCompanyInterface) =>
    validateCompany(values);

  const { register, formHandler, errors } = useForm(
    formAction,
    initialValues,
    validateForm,
  );
  return (
    <div className="update-company-container">
      <h2>Update Company</h2>
      <form className="update-company-form" onSubmit={formHandler}>
        <div className="form-group">
          <label htmlFor="name">Company Name</label>
          <input
            type="text"
            id="name"
            placeholder="Company name"
            {...register("name")}
          />
          <div className="error-message">{errors.name}</div>
        </div>

        <div className="form-group">
          <label htmlFor="industry">Industry</label>
          <input
            type="text"
            id="industry"
            placeholder="Industry"
            {...register("industry")}
          />
          <div className="error-message">{errors.industry}</div>
        </div>

        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            placeholder="Location"
            {...register("location")}
          />
          <div className="error-message">{errors.location}</div>
        </div>

        <div className="form-group">
          <label htmlFor="officeLocation">Office Location</label>
          <input
            type="text"
            id="officeLocation"
            placeholder="Office location"
            {...register("officeLocation")}
          />
          <div className="error-message">{errors.officeLocation}</div>
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            placeholder="Company description"
            {...register("description")}
          ></textarea>
          <div className="error-message">{errors.description}</div>
        </div>

        <div className="form-group">
          <label htmlFor="whyWorkHere">
            Why Work Here <span className="optional-badge">Optional</span>
          </label>
          <textarea
            id="whyWorkHere"
            placeholder="e.g., Great company culture, Growth opportunities, Flexible schedule"
            {...register("whyWorkHere")}
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="sector">Sector</label>
          <input
            type="text"
            id="sector"
            placeholder="Sector"
            {...register("sector")}
          />
          <div className="error-message">{errors.sector}</div>
        </div>

        <div className="form-group">
          <label htmlFor="website">Website</label>
          <input
            type="text"
            id="website"
            placeholder="Website URL"
            {...register("website")}
          />
          <div className="error-message">{errors.website}</div>
        </div>

        <div className="form-group">
          <label htmlFor="logo">Logo URL</label>
          <input
            type="text"
            id="logo"
            placeholder="Logo URL"
            {...register("logo")}
          />
          <div className="error-message">{errors.logo}</div>
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Contact email"
            {...register("email")}
          />
          <div className="error-message">{errors.email}</div>
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            id="phone"
            placeholder="Contact phone"
            {...register("phone")}
          />
          <div className="error-message">{errors.phone}</div>
        </div>

        <div className="form-group">
          <label htmlFor="size">Company Size</label>
          <input
            type="text"
            id="size"
            placeholder="Company size (e.g. 10-50)"
            {...register("size")}
          />
          <div className="error-message">{errors.size}</div>
        </div>

        <div className="form-group">
          <label htmlFor="foundedYear">Founded Year</label>
          <input
            type="number"
            id="foundedYear"
            placeholder="Founded year"
            {...register("foundedYear")}
          />
          <div className="error-message">{errors.foundedYear}</div>
        </div>

        <button
          type="submit"
          className="create-company-button"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Company"}
        </button>
      </form>
    </div>
  );
}

export default UpdateCompany;
function useCompanyValidation(): { validateForm: any; } {
    throw new Error("Function not implemented.");
}

