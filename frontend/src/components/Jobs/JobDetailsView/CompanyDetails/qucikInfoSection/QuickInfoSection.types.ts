export interface QuickInfoSectionProps {
  jobData?: {
    isActive?: boolean;
    createdAt?: string;
    category?: { name: string } | string;
    employmentType?: string;
    location?: string;
    salary?: string;
  };
  isLoggedIn: boolean;
  isCompanyMember?: boolean;
  setShowApplyModal: (show: boolean) => void;
  jobId: string;
  location: {
    pathname: string;
  };
}
