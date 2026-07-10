export interface Member {
  _id: string;
  email: string;
}

export interface Company {
  _id: string;
  name: string;
  industry: string;
  location: string;
  logo: string;
  members?: Member[];
  description: string;
  size: string;
  website: string;
  createdAt: string;
}

export interface CompaniesResponse {
  companies: Company[];
  totalPages: number;
  currentPage: number;
  totalCompanies: number;
  limit: number;
}

export interface RegisterCompanyInterface extends Record<string, string> {
  name: string;
  industry: string;
  location: string;
  description: string;
  website: string;
  logo: string;
  size: string;
  foundedYear: string;
  phone: string;
  email: string;
  officeLocation: string;
  sector: string;
  whyWorkHere: string;
}
