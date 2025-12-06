import "./ViewAllCompanies.css"
export function ViewAllCompanies () {


        return (
            <div className="company-card-unique">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQT7RiKSjCLH7UUM2…" alt="TechNova Solutions Logo" className="company-logo-unique" />
                <h2 className="company-title-unique">TechNova Solutions</h2>
                <p className="company-industry-unique"><span className="company-label-unique">Industry:</span> Software Development</p>
                <p className="company-desc-unique"><span className="company-label-unique">Description:</span> Innovative software solutions for small and medium businesses</p>
                <p className="company-location-unique"><span className="company-label-unique">Location:</span> Sofia, Bulgaria</p>
                <p className="company-website-unique"><span className="company-label-unique">Website:</span> <a href="https://technova-solutions.com/" target="_blank" rel="noopener noreferrer" className="company-link-unique">technova-solutions.com</a></p>
                <p className="company-size-unique"><span className="company-label-unique">Company Size:</span> 10-50</p>
                <p className="company-founded-unique"><span className="company-label-unique">Founded Year:</span> 2021</p>
            </div>
        )
}