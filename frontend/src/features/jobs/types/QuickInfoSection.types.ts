import { Job } from "./Job.model";

export interface QuickInfoSectionProps {
  jobData?: Pick<
    Job,
    | "isActive"
    | "createdAt"
    | "category"
    | "employmentType"
    | "location"
    | "salary"
  >;
  isLoggedIn: boolean;
  isCompanyMember?: boolean;
  setShowApplyModal: (show: boolean) => void;
  jobId: string;
  location: {
    pathname: string;
  };
}
