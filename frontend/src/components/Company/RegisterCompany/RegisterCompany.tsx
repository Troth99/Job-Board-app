import "./RegisterCompany.css"
import "./Responsive.css"

export default function RegisterCompany() {


    return (
       <div className="create-company-container">
  <h2>Create Company</h2>
  <form className="create-company-form">
    <div className="form-group">
      <label htmlFor="name">Company Name*</label>
      <input type="text" id="name" name="name" placeholder="Enter company name" required />
    </div>
    
    <div className="form-group">
      <label htmlFor="industry">Industry*</label>
      <input type="text" id="industry" name="industry" placeholder="Enter industry" required />
    </div>
    
    <div className="form-group">
      <label htmlFor="location">Location*</label>
      <input type="text" id="location" name="location" placeholder="Enter location" required />
    </div>
    
    <div className="form-group">
      <label htmlFor="description">Description</label>
      <textarea id="description" name="description" placeholder="Enter description"></textarea>
    </div>
    
    <div className="form-group">
      <label htmlFor="website">Website</label>
      <input type="text" id="website" name="website" placeholder="Enter website URL" />
    </div>
    
    <div className="form-group">
      <label htmlFor="logo">Logo URL</label>
      <input type="text" id="logo" name="logo" placeholder="Enter logo URL" />
    </div>
    
    <div className="form-group">
      <label htmlFor="size">Company Size</label>
      <input type="text" id="size" name="size" placeholder="Enter size (e.g. 10-50)" />
    </div>
    
    <div className="form-group">
      <label htmlFor="foundedYear">Founded Year</label>
      <input type="number" id="foundedYear" name="foundedYear" placeholder="Enter founded year" />
    </div>
    
    <button type="submit">Create Company</button>
  </form>
</div>
    )
}