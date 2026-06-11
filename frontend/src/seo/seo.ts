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

const siteBaseUrl = "https://job-board-three-omega.vercel.app";

const defaultSeoConfig: SeoConfig = {
  title: "Job Board",
  description: "Find your next job opportunity.",
  image: "https://job-board-three-omega.vercel.app/og-card-v2.png",
  siteName: "Job Board",
  type: "website",
  twitterCard: "summary_large_image"
};



//Dynamically generate SEO config for each page
export const generateSeoConfig = (pageKey: string, dynamicValue?: string): SeoConfig => {
  const normalizedPageKey = pageKey === "terms-and-conditions" ? "termsAndConditions" : pageKey;

  if (normalizedPageKey === "category" && dynamicValue) {
  return {
    ...defaultSeoConfig,
    title: `Jobs from ${dynamicValue} | Job Board`,
    description: `Explore the latest job opportunities in ${dynamicValue}. Find your next career move in ${dynamicValue} today!`,
    url: `${siteBaseUrl}/category/${encodeURIComponent(dynamicValue)}`
  };
  }
  //if the pageKey exists in the seoConfig, return it
if (seoConfig[normalizedPageKey]) {
  return {
    ...defaultSeoConfig,
    ...seoConfig[normalizedPageKey]
  };
}
  // Default fallback
  return { ...defaultSeoConfig };

};

export const seoConfig: Record<string, SeoConfig> = {
  home: {
    title: "Job Board - Find Your Next Opportunity",    
    description: "Discover your next career move with our job board. Browse thousands of job listings, find the perfect fit, and take the next step in your professional journey.",
    url: "https://job-board-three-omega.vercel.app/"
   },
  viewAllJobs: {
    title: "Browse All Jobs | Find Your Next Opportunity!",
    description: "Browse all job listings and find your next opportunity. Fresh listings, sorted by newest first.",
    url: "https://job-board-three-omega.vercel.app/jobs"
    },
    profile: {
        title: "Your Profile | Job Board",
        description: "View and edit your profile, manage your job applications, and track your career progress on Job Board.",
        noindex: true
    },
    editProfile: {
        title: "Edit Your Profile | Job Board",
        description: "Update your profile information, upload your resume, and manage your job preferences on Job Board.",
        noindex: true   
    },
    notifications: {
        title: "Your Notifications | Job Board",
        description: "Stay updated with the latest job alerts, application statuses, and important updates on Job Board.",
        noindex: true
    },
    viewSavedJobs: {
        title: "Your Saved Jobs | Job Board",
        description: "View and manage your saved job listings, keep track of your favorite opportunities, and stay organized on Job Board.",
        noindex: true
    },


    //company pages
    postJob: {
        title: "Post a Job | Job Board",
        description: "Post your job openings and find the perfect candidates on Job Board. Reach a wide audience of job seekers and grow your team.",
        noindex: true
    },
    companyDashboard: {
        title: "Company Dashboard | Job Board",
        description: "Manage your company profile, post job openings, and track applications with the Company Dashboard on Job Board.",
        noindex: true
    },
      companyMembers: {
        title: "Company Members | Job Board",
        description: "Manage your company's team members, assign roles, and collaborate effectively with the Company Members page on Job Board.",
        noindex: true
    },

    //footer pages
    forUs: {
      title: "For Job Seekers | Job Board",
      description: "Discover how Job Board can help you find your next opportunity. Explore job listings, create a profile, and take control of your career journey.",
      url :"https://job-board-three-omega.vercel.app/for-us"
    },
    contacts: {
      title: "Contact Us | Job Board",
      description: "Have questions or need support? Contact the Job Board team for assistance with your job search, account, or any other inquiries.",
      url :"https://job-board-three-omega.vercel.app/contacts"
    },
    forEmployers: {
      title: "For Employers | Job Board",
      description: "Discover how Job Board can help you find the best candidates for your job openings. Post jobs, manage applications, and grow your team with ease.",
      url :"https://job-board-three-omega.vercel.app/for-employers"
    },
    termsAndConditions: {
      title: "Terms and Conditions | Job Board",
      description: "Read the terms and conditions for using Job Board. Understand your rights and responsibilities as a user of our job search platform.",
      url: "https://job-board-three-omega.vercel.app/terms-and-conditions"
    },
    privacy: {
      title: "Privacy Policy | Job Board",
      description: "Learn about our privacy practices and how we protect your personal information on Job Board. Your privacy is important to us.",
      url: "https://job-board-three-omega.vercel.app/privacy"
    },
    cookies: {
      title: "Cookie Policy | Job Board",
      description: "Understand how Job Board uses cookies to enhance your experience. Learn about the types of cookies we use and how to manage them.",
      url: "https://job-board-three-omega.vercel.app/cookies"
    },
    cvTips: {
      title: "CV Tips | Job Board",
      description: "Get expert advice on creating a standout CV. Learn how to highlight your skills, experience, and achievements to land your dream job.",
      url: "https://job-board-three-omega.vercel.app/career-advice/cv-tips"
    },
    interviewPreparation: {
      title: "Interview Preparation | Job Board",
      description: "Prepare for your next job interview with confidence. Get tips on common questions, body language, and how to make a great impression.",
      url: "https://job-board-three-omega.vercel.app/career-advice/interview-preparation"
    },
    salaryNegotiation: {
      title: "Salary Negotiation | Job Board",
      description: "Learn how to negotiate your salary effectively. Get strategies for discussing compensation and ensuring you get the pay you deserve.",
      url: "https://job-board-three-omega.vercel.app/career-advice/salary-negotiation"
    },

}