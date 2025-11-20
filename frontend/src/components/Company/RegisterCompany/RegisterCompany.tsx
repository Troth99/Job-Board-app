import React, { useState } from "react";
import "./RegisterCompany.css";
import "./Responsive.css";
import { createCompany } from "../../../services/companyService";
import { showSuccess } from "../../../utils/toast";
import { useNavigate } from "react-router";
import { validateCompany } from "../../../utils/registerCompanyValidation";

export interface RegisterCompanyInterface {
  _id?: string;
  name: string;
  industry: string;
  location: string;
  description: string;
  website: string;
  logo: string;
  size: string;
  foundedYear: string;
}

const initialValues = {
  name: "",
  industry: "",
  location: "",
  description: "",
  website: "",
  logo: "",
  size: "",
  foundedYear: "",
};

// Errors type validator
type ValidationErrors = Partial<Record<keyof RegisterCompanyInterface, string>>;

export default function RegisterCompany() {
  const [form, setForm] = useState<RegisterCompanyInterface>(initialValues);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const navigate = useNavigate();

  const onChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    const validationErrors = validateCompany(form as ValidationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const result = await createCompany(form);
      navigate("/");
      showSuccess("Company registered successfully!");
    } catch (error: any) {
      setErrors(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const onBlurHandler = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
    const ValidationErrors = validateCompany(form as ValidationErrors);
    const error = ValidationErrors[name];

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  return (
    <div className="create-company-container">
      <h2>Create Company</h2>
      <form className="create-company-form" onSubmit={submitHandler}>
        <div className="form-group">
          <label htmlFor="name">Company Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter company name"
            value={form.name}
            onBlur={onBlurHandler}
            onChange={onChangeHandler}
          />
          <div className="error-message">{errors.name}</div>
        </div>

        <div className="form-group">
          <label htmlFor="industry">Industry</label>
          <input
            type="text"
            id="industry"
            name="industry"
            placeholder="Enter industry"
            value={form.industry}
            onBlur={onBlurHandler}
            onChange={onChangeHandler}
          />
          <div className="error-message">{errors.industry}</div>
        </div>

        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            placeholder="Enter location"
            value={form.location}
            onBlur={onBlurHandler}
            onChange={onChangeHandler}
          />
          <div className="error-message">{errors.location}</div>
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            placeholder="Enter description"
            value={form.description}
            onBlur={onBlurHandler}
            onChange={onChangeHandler}
          ></textarea>
          <div className="error-message">{errors.description}</div>
        </div>

        <div className="form-group">
          <label htmlFor="website">Website</label>
          <input
            type="text"
            id="website"
            name="website"
            placeholder="Enter website URL"
            value={form.website}
            onBlur={onBlurHandler}
            onChange={onChangeHandler}
          />
          <div className="error-message">{errors.website}</div>
        </div>

        <div className="form-group">
          <label htmlFor="logo">Logo URL</label>
          <input
            type="text"
            id="logo"
            name="logo"
            placeholder="Enter logo URL"
            value={form.logo}
            onBlur={onBlurHandler}
            onChange={onChangeHandler}
          />
          <div className="error-message">{errors.logo}</div>
        </div>

        <div className="form-group">
          <label htmlFor="size">Company Size</label>
          <input
            type="text"
            id="size"
            name="size"
            placeholder="Enter size (e.g. 10-50)"
            value={form.size}
            onBlur={onBlurHandler}
            onChange={onChangeHandler}
          />
          <div className="error-message">{errors.size}</div>
        </div>

        <div className="form-group">
          <label htmlFor="foundedYear">Founded Year</label>
          <input
            type="number"
            id="foundedYear"
            name="foundedYear"
            placeholder="Enter founded year"
            value={form.foundedYear}
            onBlur={onBlurHandler}
            onChange={onChangeHandler}
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
