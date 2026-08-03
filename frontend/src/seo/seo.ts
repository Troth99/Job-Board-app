import { t } from "@lingui/core/macro";

export type SeoConfig = {
  title: string;
  description: string;
  image?: string;
  url?: string;
  siteName?: string;
  type?: string;
  twitterCard?: string;
  noindex?: boolean;
};

//noindex is used to prevent search engines from indexing certain pages, 
//such as user profiles or admin pages, which are not meant to be publicly discoverable.

const siteBaseUrl = "https://job-board-three-omega.vercel.app";

const baseSeoConfig = {
  image: "https://job-board-three-omega.vercel.app/og-card-v2.png",
  siteName: "Job Board",
  type: "website",
  twitterCard: "summary_large_image",
};

const getDefaultSeoConfig = (): SeoConfig => ({
  title: t`Job Board`,
  description: t`Find your next job opportunity.`,
  ...baseSeoConfig,
});

const pageSeoConfig: Record<string, () => SeoConfig> = {
  home: () => ({
    title: t`Job Board - Find Your Next Opportunity`,
    description: t`Discover your next career move with our job board. Browse thousands of job listings, find the perfect fit, and take the next step in your professional journey.`,
    url: `${siteBaseUrl}/`,
  }),
  viewAllJobs: () => ({
    title: t`Browse All Jobs | Find Your Next Opportunity!`,
    description: t`Browse all job listings and find your next opportunity. Fresh listings, sorted by newest first.`,
    url: `${siteBaseUrl}/jobs`,
  }),
  profile: () => ({
    title: t`Your Profile | Job Board`,
    description: t`View and edit your profile, manage your job applications, and track your career progress on Job Board.`,
    noindex: true,
  }),
  editProfile: () => ({
    title: t`Edit Your Profile | Job Board`,
    description: t`Update your profile information, upload your resume, and manage your job preferences on Job Board.`,
    noindex: true,
  }),
  notifications: () => ({
    title: t`Your Notifications | Job Board`,
    description: t`Stay updated with the latest job alerts, application statuses, and important updates on Job Board.`,
    noindex: true,
  }),
  viewSavedJobs: () => ({
    title: t`Your Saved Jobs | Job Board`,
    description: t`View and manage your saved job listings, keep track of your favorite opportunities, and stay organized on Job Board.`,
    noindex: true,
  }),
  jobGuide: () => ({
    title: t`Job Posting Guide | Job Board`,
    description: t`Learn how to post a job listing on Job Board and reach a wide audience of qualified candidates.`,
    noindex: true,
  }),
  postJob: () => ({
    title: t`Post a Job | Job Board`,
    description: t`Post your job openings and find the perfect candidates on Job Board. Reach a wide audience of job seekers and grow your team.`,
    noindex: true,
  }),
  companyDashboard: () => ({
    title: t`Company Dashboard | Job Board`,
    description: t`Manage your company profile, post job openings, and track applications with the Company Dashboard on Job Board.`,
    noindex: true,
  }),
  companyMembers: () => ({
    title: t`Company Members | Job Board`,
    description: t`Manage your company's team members, assign roles, and collaborate effectively with the Company Members page on Job Board.`,
    noindex: true,
  }),
  updateCompany: () => ({
    title: t`Update Company Details | Job Board`,
    description: t`Update your company's profile information, including industry, location, and contact details on Job Board.`,
    noindex: true,
  }),
  forUs: () => ({
    title: t`For Job Seekers | Job Board`,
    description: t`Discover how Job Board can help you find your next opportunity. Explore job listings, create a profile, and take control of your career journey.`,
    url: `${siteBaseUrl}/for-us`,
  }),
  contacts: () => ({
    title: t`Contact Us | Job Board`,
    description: t`Have questions or need support? Contact the Job Board team for assistance with your job search, account, or any other inquiries.`,
    url: `${siteBaseUrl}/contacts`,
  }),
  forEmployers: () => ({
    title: t`For Employers | Job Board`,
    description: t`Discover how Job Board can help you find the best candidates for your job openings. Post jobs, manage applications, and grow your team with ease.`,
    url: `${siteBaseUrl}/for-employers`,
  }),
  termsAndConditions: () => ({
    title: t`Terms and Conditions | Job Board`,
    description: t`Read the terms and conditions for using Job Board. Understand your rights and responsibilities as a user of our job search platform.`,
    url: `${siteBaseUrl}/terms-and-conditions`,
  }),
  privacy: () => ({
    title: t`Privacy Policy | Job Board`,
    description: t`Learn about our privacy practices and how we protect your personal information on Job Board. Your privacy is important to us.`,
    url: `${siteBaseUrl}/privacy`,
  }),
  cookies: () => ({
    title: t`Cookie Policy | Job Board`,
    description: t`Understand how Job Board uses cookies to enhance your experience. Learn about the types of cookies we use and how to manage them.`,
    url: `${siteBaseUrl}/cookies`,
  }),
  cvTips: () => ({
    title: t`CV Tips | Job Board`,
    description: t`Get expert advice on creating a standout CV. Learn how to highlight your skills, experience, and achievements to land your dream job.`,
    url: `${siteBaseUrl}/career-advice/cv-tips`,
  }),
  interviewPreparation: () => ({
    title: t`Interview Preparation | Job Board`,
    description: t`Prepare for your next job interview with confidence. Get tips on common questions, body language, and how to make a great impression.`,
    url: `${siteBaseUrl}/career-advice/interview-preparation`,
  }),
  salaryNegotiation: () => ({
    title: t`Salary Negotiation | Job Board`,
    description: t`Learn how to negotiate your salary effectively. Get strategies for discussing compensation and ensuring you get the pay you deserve.`,
    url: `${siteBaseUrl}/career-advice/salary-negotiation`,
  }),
};

//Dynamically generate SEO config for each page
export const generateSeoConfig = (pageKey: string, dynamicValue?: string): SeoConfig => {
  const normalizedPageKey = pageKey === "terms-and-conditions" ? "termsAndConditions" : pageKey;

  if (normalizedPageKey === "category" && dynamicValue) {
    return {
      ...getDefaultSeoConfig(),
      title: t`Jobs from ${dynamicValue} | Job Board`,
      description: t`Explore the latest job opportunities in ${dynamicValue}. Find your next career move in ${dynamicValue} today!`,
      url: `${siteBaseUrl}/category/${encodeURIComponent(dynamicValue)}`,
    };
  }

  if (pageSeoConfig[normalizedPageKey]) {
    return {
      ...getDefaultSeoConfig(),
      ...pageSeoConfig[normalizedPageKey](),
    };
  }

  // Default fallback
  return getDefaultSeoConfig();
};

//Function to update SEO dynamically on the View all companies page based on search query
export const generateCompaniesSeo = (
  search?: string,
  page?: number
): SeoConfig => {
  const normalizedSearch = search?.trim();

  return {
    ...getDefaultSeoConfig(),
    title: normalizedSearch
      ? t`Company results for "${normalizedSearch}" | Job Board`
      : t`Browse Companies | Job Board`,
    description: normalizedSearch
      ? t`Explore companies related to ${normalizedSearch} on Job Board.`
      : t`Browse companies by industry, location, size, and latest activity on Job Board.`,
    url: normalizedSearch
      ? `${siteBaseUrl}/companies?page=${page || 1}&search=${encodeURIComponent(normalizedSearch)}`
      : `${siteBaseUrl}/companies?page=${page || 1}`,
    noindex: Boolean(normalizedSearch),
  };
};

export const seoConfig: Record<string, SeoConfig> = {
  home: {
    title: t`Job Board - Find Your Next Opportunity`,    
    description: t`Discover your next career move with our job board. Browse thousands of job listings, find the perfect fit, and take the next step in your professional journey.`,
    url: "https://job-board-three-omega.vercel.app/"
   },

   //jobs pages
  viewAllJobs: {
    title: t`Browse All Jobs | Find Your Next Opportunity!`,
    description: t`Browse all job listings and find your next opportunity. Fresh listings, sorted by newest first.`,
    url: "https://job-board-three-omega.vercel.app/jobs"
    },
    profile: {
        title: t`Your Profile | Job Board`,
        description: t`View and edit your profile, manage your job applications, and track your career progress on Job Board.`,
        noindex: true
    },
    editProfile: {
        title: t`Edit Your Profile | Job Board`,
        description: t`Update your profile information, upload your resume, and manage your job preferences on Job Board.`,
        noindex: true   
    },
    notifications: {
        title: t`Your Notifications | Job Board`,
        description: t`Stay updated with the latest job alerts, application statuses, and important updates on Job Board.`,
        noindex: true
    },
    viewSavedJobs: {
        title: t`Your Saved Jobs | Job Board`,
        description: t`View and manage your saved job listings, keep track of your favorite opportunities, and stay organized on Job Board.`,
        noindex: true
    },
       jobGuide: {
        title: t`Job Posting Guide | Job Board`,
        description: t`Learn how to post a job listing on Job Board and reach a wide audience of qualified candidates.`,
        noindex: true
    },


    //company pages
    postJob: {
        title: t`Post a Job | Job Board`,
        description: t`Post your job openings and find the perfect candidates on Job Board. Reach a wide audience of job seekers and grow your team.`,
        noindex: true
    },
    companyDashboard: {
        title: t`Company Dashboard | Job Board`,
        description: t`Manage your company profile, post job openings, and track applications with the Company Dashboard on Job Board.`,
        noindex: true
    },
      companyMembers: {
        title: t`Company Members | Job Board`,
        description: t`Manage your company's team members, assign roles, and collaborate effectively with the Company Members page on Job Board.`,
        noindex: true
    },
    updateCompany: {
        title: t`Update Company Details | Job Board`,
        description: t`Update your company's profile information, including industry, location, and contact details on Job Board.`,
        noindex: true
    },

    //footer pages
    forUs: {
      title: t`For Job Seekers | Job Board`,
      description: t`Discover how Job Board can help you find your next opportunity. Explore job listings, create a profile, and take control of your career journey.`,
      url :"https://job-board-three-omega.vercel.app/for-us"
    },
    contacts: {
      title: t`Contact Us | Job Board`,
      description: t`Have questions or need support? Contact the Job Board team for assistance with your job search, account, or any other inquiries.`,
      url :"https://job-board-three-omega.vercel.app/contacts"
    },
    forEmployers: {
      title: t`For Employers | Job Board`,
      description: t`Discover how Job Board can help you find the best candidates for your job openings. Post jobs, manage applications, and grow your team with ease.`,
      url :"https://job-board-three-omega.vercel.app/for-employers"
    },
    termsAndConditions: {
      title: t`Terms and Conditions | Job Board`,
      description: t`Read the terms and conditions for using Job Board. Understand your rights and responsibilities as a user of our job search platform.`,
      url: "https://job-board-three-omega.vercel.app/terms-and-conditions"
    },
    privacy: {
      title: t`Privacy Policy | Job Board`,
      description: t`Learn about our privacy practices and how we protect your personal information on Job Board. Your privacy is important to us.`,
      url: "https://job-board-three-omega.vercel.app/privacy"
    },
    cookies: {
      title: t`Cookie Policy | Job Board`,
      description: t`Understand how Job Board uses cookies to enhance your experience. Learn about the types of cookies we use and how to manage them.`,
      url: "https://job-board-three-omega.vercel.app/cookies"
    },
    cvTips: {
      title: t`CV Tips | Job Board`,
      description: t`Get expert advice on creating a standout CV. Learn how to highlight your skills, experience, and achievements to land your dream job.`,
      url: "https://job-board-three-omega.vercel.app/career-advice/cv-tips"
    },
    interviewPreparation: {
      title: t`Interview Preparation | Job Board`,
      description: t`Prepare for your next job interview with confidence. Get tips on common questions, body language, and how to make a great impression.`,
      url: "https://job-board-three-omega.vercel.app/career-advice/interview-preparation"
    },
    salaryNegotiation: {
      title: t`Salary Negotiation | Job Board`,
      description: t`Learn how to negotiate your salary effectively. Get strategies for discussing compensation and ensuring you get the pay you deserve.`,
      url: "https://job-board-three-omega.vercel.app/career-advice/salary-negotiation"
    },

}