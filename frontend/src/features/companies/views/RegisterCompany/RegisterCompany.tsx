import { useState } from "react";
import "../../styles/registerCompany.css"
import { showSuccess } from "../../../../shared/utils/toast";
import { useNavigate } from "react-router";
import { validateCompany } from "../../validators/useCompanyValidation";
import useForm from "../../../../shared/hooks/useForm";
import useCompanies from "../../hooks/useCompanyAPI";
import { RegisterCompanyInterface } from "../../types/companyTypes";
import { Trans, useLingui } from "@lingui/react/macro";

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
  const { company, createCompany } = useCompanies();

  const { t } = useLingui();

  const validateForm = (values: RegisterCompanyInterface) =>
    validateCompany(values);
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
      const userStr = localStorage.getItem("user");
      if (userStr) {
        const user = JSON.parse(userStr);
        user.company = companyId;
        localStorage.setItem("user", JSON.stringify(user));
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
    validateForm,
  );

  return (
    <div className="create-company-container">
      <h2>
        <Trans>Register Company</Trans>
      </h2>
      <form className="create-company-form" onSubmit={formHandler}>
        <div className="form-group">
          <label htmlFor="name">
            <Trans>Company Name</Trans>
          </label>
          <input
            type="text"
            id="name"
            placeholder={t`Enter company name`}
            {...register("name")}
          />
          <div className="error-message">{errors.name}</div>
        </div>

        <div className="form-group">
          <label htmlFor="industry">
            <Trans>Industry</Trans>
          </label>
          <input
            type="text"
            id="industry"
            placeholder={t`Enter industry`}
            {...register("industry")}
          />
          <div className="error-message">{errors.industry}</div>
        </div>

        <div className="form-group">
          <label htmlFor="location">
            <Trans>Location</Trans>
          </label>
          <input
            type="text"
            id="location"
            placeholder={t`Enter location`}
            {...register("location")}
          />
          <div className="error-message">{errors.location}</div>
        </div>

        <div className="form-group">
          <label htmlFor="officeLocation">
            <Trans>Office Location</Trans>
          </label>
          <input
            type="text"
            id="officeLocation"
            placeholder={t`Enter office location`}
            {...register("officeLocation")}
          />
          <div className="error-message">{errors.officeLocation}</div>
        </div>

        <div className="form-group">
          <label htmlFor="description">
            <Trans>Description</Trans>
          </label>
          <textarea
            id="description"
            placeholder={t`Enter company description`}
            {...register("description")}
          ></textarea>
          <div className="error-message">{errors.description}</div>
        </div>

        <div className="form-group">
          <label htmlFor="whyWorkHere">
            <Trans>Why Work Here</Trans> <span className="optional-badge"><Trans>Optional</Trans></span>
          </label>
          <textarea
            id="whyWorkHere"
            placeholder={t`e.g., Great company culture, Growth opportunities, Flexible schedule`}
            {...register("whyWorkHere")}
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="sector">
            <Trans>Sector</Trans>
          </label>
          <input
            type="text"
            id="sector"
            placeholder={t`Enter sector`}
            {...register("sector")}
          />
          <div className="error-message">{errors.sector}</div>
        </div>

        <div className="form-group">
          <label htmlFor="website">
            <Trans>Website</Trans>
          </label>
          <input
            type="text"
            id="website"
            placeholder={t`Enter website URL`}  
            {...register("website")}
          />
          <div className="error-message">{errors.website}</div>
        </div>

        <div className="form-group">
          <label htmlFor="logo">
            <Trans>Logo URL</Trans>
          </label>
          <input
            type="text"
            id="logo"
            placeholder={t`Enter logo URL`}
            {...register("logo")}
          />
          <div className="error-message">{errors.logo}</div>
        </div>

        <div className="form-group">
          <label htmlFor="email">
            <Trans>Email</Trans>
          </label>
          <input
            type="email"
            id="email"
            placeholder={t`Enter contact email`}
            {...register("email")}
          />
          <div className="error-message">{errors.email}</div>
        </div>

        <div className="form-group">
          <label htmlFor="phone">
            <Trans>Phone</Trans>
          </label>
          <input
            type="text"
            id="phone"
            placeholder={t`Enter contact phone`}
            {...register("phone")}
          />
          <div className="error-message">{errors.phone}</div>
        </div>

        <div className="form-group">
          <label htmlFor="size">
            <Trans>Company Size</Trans>
          </label>
          <input
            type="text"
            id="size"
            placeholder={t`Enter company size (e.g. 10-50)`}
            {...register("size")}
          />
          <div className="error-message">{errors.size}</div>
        </div>

        <div className="form-group">
          <label htmlFor="foundedYear">
            <Trans>Founded Year</Trans>
          </label>
          <input
            type="number"
            id="foundedYear"
            placeholder={t`Enter founded year`}   
            {...register("foundedYear")}
          />
          <div className="error-message">{errors.foundedYear}</div>
        </div>

        <button
          type="submit"
          className="create-company-button"
          disabled={loading}
        >
          {loading ? t`Registering...` : t`Register Company`}
        </button>
      </form>
    </div>
  );
}
