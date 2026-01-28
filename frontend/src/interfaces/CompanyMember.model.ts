export interface CompanyMember {
  _id: string;
  role: string;
  userId: {
    _id: string;
    name?: string;
    email?: string;
  };
  invitedBy?: {
    _id: string;
    name?: string;
    email?: string;
  };
  invitedAt?: string;
  updatedAt?: string;
}