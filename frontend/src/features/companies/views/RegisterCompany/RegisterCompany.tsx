import { useState } from "react";
import "./RegisterCompany.css";
import "./Responsive.css";
import { showSuccess } from "../../../../utils/toast";
import {  useNavigate } from "react-router";
import { validateCompany } from "../../../../components/validators/useCompanyValidation";
import useForm from "../../../../hooks/shared/useForm";
import useCompanies from "../../hooks/useCompanyAPI";
import { RegisterCompanyInterface } from "../../types/companyTypes";

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

export default function RegisterCompany() {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const {company, createCompany } = useCompanies();

  const validateForm = (values: RegisterCompanyInterface) => validateCompany(values);
  const onSubmit = async (values: RegisterCompanyInterface) => {
    setLoading(true);
    try {
      const createdCompany = await createCompany(values);
      
      // Extract company ID from response
      const companyId = createdCompany?.company?._id || createdCompany?._id;
      
      if (!companyId) {
        throw new Error("Company ID not returned from server");
      }
      
      // Update localStorage to include company ID
      const userStr = localStorage.getItem('user');
      if (userStr) {
        const user = JSON.parse(userStr);
        user.company = companyId;
        localStorage.setItem('user', JSON.stringify(user));
      }
      
      showSuccess("Company registered successfully!");
      navigate(`/company/${companyId}/dashboard`);
    } catch (error: any) {
      throw new Error(error.message || "Failed to create company");
    } finally {
      setLoading(false);
    }
  };

  const { register, formHandler, errors } = useForm<RegisterCompanyInterface>(
    onSubmit,
    initialValues,
    validateForm
  );

  return (
    <div className="create-company-container">
      <h2>Register Company</h2>
      <form className="create-company-form" onSubmit={formHandler}>
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
          {loading ? "Registering..." : "Register Company"}
        </button>
      </form>
    </div>
  );
}
