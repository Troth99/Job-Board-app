import { useState } from "react";
import "./RegisterCompany.css";
import "./Responsive.css";
import { showSuccess } from "../../../utils/toast";
import { useNavigate } from "react-router";
import { validateCompany } from "../../validators/registerCompanyValidation";
import useForm from "../../../hooks/useForm";
import useCompany from "../../../hooks/useCompany";

export interface RegisterCompanyInterface extends Record<string, string> {
  name: string;
  industry: string;
  location: string;
  description: string;
  website: string;
  logo: string;
  size: string;
  foundedYear: string;
}

const initialValues: RegisterCompanyInterface = {
  name: "",
  industry: "",
  location: "",
  description: "",
  website: "",
  logo: "",
  size: "",
  foundedYear: "",
};

export default function RegisterCompany() {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const {company, createCompany } = useCompany();

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
      <h2>Create Company</h2>
      <form className="create-company-form" onSubmit={formHandler}>
        <div className="form-group">
          <label htmlFor="name">Company Name</label>
          <input
            type="text"
            id="name"
            placeholder="Enter company name"
            {...register("name")}
          />
          <div className="error-message">{errors.name}</div>
        </div>

        <div className="form-group">
          <label htmlFor="industry">Industry</label>
          <input
            type="text"
            id="industry"
            placeholder="Enter industry"
            {...register("industry")}
          />
          <div className="error-message">{errors.industry}</div>
        </div>

        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            placeholder="Enter location"
            {...register("location")}
          />
          <div className="error-message">{errors.location}</div>
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            placeholder="Enter description"
            {...register("description")}
          ></textarea>
          <div className="error-message">{errors.description}</div>
        </div>

        <div className="form-group">
          <label htmlFor="website">Website</label>
          <input
            type="text"
            id="website"
            placeholder="Enter website URL"
            {...register("website")}
          />
          <div className="error-message">{errors.website}</div>
        </div>

        <div className="form-group">
          <label htmlFor="logo">Logo URL</label>
          <input
            type="text"
            id="logo"
            placeholder="Enter logo URL"
            {...register("logo")}
          />
          <div className="error-message">{errors.logo}</div>
        </div>

        <div className="form-group">
          <label htmlFor="size">Company Size</label>
          <input
            type="text"
            id="size"
            placeholder="Enter size (e.g. 10-50)"
            {...register("size")}
          />
          <div className="error-message">{errors.size}</div>
        </div>

        <div className="form-group">
          <label htmlFor="foundedYear">Founded Year</label>
          <input
            type="number"
            id="foundedYear"
            placeholder="Enter founded year"
            {...register("foundedYear")}
          />
          <div className="error-message">{errors.foundedYear}</div>
        </div>

        <button
          type="submit"
          className="create-company-button"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Company"}
        </button>
      </form>
    </div>
  );
}
