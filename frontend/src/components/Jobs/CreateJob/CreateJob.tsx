interface Company {
  name: string;
  logo: string;  
}

export interface Job {
  id: string;
  title: string;
  description: string;
  location: string;
  salary?: string;
  createdBy: string;
  company?: Company | null
  type: string;        
  category?: string | null;
  createdAt: string;     
  logo?: string | null;
  skills?: string[];     
  employmentType?: "Full-time" | "Part-time" | "Internship";
  benefits?: string[];
  applicationDeadline?: string;  
  views?: number;
  isActive?: boolean;
  tags?: string[];
  contactEmail?: string;
  applyUrl?: string;
}
