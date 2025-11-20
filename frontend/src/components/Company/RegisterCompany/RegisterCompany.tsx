import { useState } from "react";
import "./RegisterCompany.css";
import "./Responsive.css";
import { createCompany } from "../../../services/companyService";
import { showSuccess } from "../../../utils/toast";
import { useNavigate } from "react-router";

export interface RegisterCompanyInterface {
    _id?: string,
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

export default function RegisterCompany() {
  const [form, setForm] = useState<RegisterCompanyInterface>(initialValues);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate()

  const onChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const trimmedValue = value.trim();

    setForm((prev) => ({
      ...prev,
      [name]: trimmedValue,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    try {
      const result = await createCompany(form);
      navigate('/')
      showSuccess("Company registered successfully!");
    } catch (error: any) {
      setErrors(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="create-company-container">
      <h2>Create Company</h2>
      <h3>All fields are required.</h3>
      <form className="create-company-form" onSubmit={submitHandler}>
        <div className="form-group">
          <label htmlFor="name">Company Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter company name"
            value={form.name}
            onChange={onChangeHandler}
          />
          <div className="error-message">Test</div>
        </div>

        <div className="form-group">
          <label htmlFor="industry">Industry</label>
          <input
            type="text"
            id="industry"
            name="industry"
            placeholder="Enter industry"
            value={form.industry}
            onChange={onChangeHandler}
          />
          <div className="error-message">Test</div>
        </div>

        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            placeholder="Enter location"
            value={form.location}
            onChange={onChangeHandler}
          />
          <div className="error-message">Test</div>
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            placeholder="Enter description"
            value={form.description}
            onChange={onChangeHandler}
          ></textarea>
          <div className="error-message">Test</div>
        </div>

        <div className="form-group">
          <label htmlFor="website">Website</label>
          <input
            type="text"
            id="website"
            name="website"
            placeholder="Enter website URL"
            value={form.website}
            onChange={onChangeHandler}
          />
          <div className="error-message">Test</div>
        </div>

        <div className="form-group">
          <label htmlFor="logo">Logo URL</label>
          <input
            type="text"
            id="logo"
            name="logo"
            placeholder="Enter logo URL"
            value={form.logo}
            onChange={onChangeHandler}
          />
          <div className="error-message">Test</div>
        </div>

        <div className="form-group">
          <label htmlFor="size">Company Size</label>
          <input
            type="text"
            id="size"
            name="size"
            placeholder="Enter size (e.g. 10-50)"
            value={form.size}
            onChange={onChangeHandler}
          />
          <div className="error-message">Test</div>
        </div>

        <div className="form-group">
          <label htmlFor="foundedYear">Founded Year</label>
          <input
            type="number"
            id="foundedYear"
            name="foundedYear"
            placeholder="Enter founded year"
            value={form.foundedYear}
            onChange={onChangeHandler}
          />
          <div className="error-message">Test</div>
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
