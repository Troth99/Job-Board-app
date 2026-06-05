export type SeoConfig = {
  title: string;
  description: string;
  image?: string;
  url?: string;
  siteName?: string;
  type?: string;
  twitterCard?: string;
};

//Dynamically generate SEO config for each page

export const generateSeoConfig = (pageKey: string, dynamicValue?: string): SeoConfig => {
  if (pageKey === "category" && dynamicValue) {
    return {
      title: `Jobs from ${dynamicValue} | Job Board`,
      description: `Explore the latest job opportunities in ${dynamicValue}. Find your next career move in ${dynamicValue} today!`
    };
  }
  //if the pageKey exists in the seoConfig, return it
  if (seoConfig[pageKey]) {
    return seoConfig[pageKey];
  }
  // Default fallback
  return {
    title: "Job Board",
    description: "Find your next job opportunity.",
    image: "https://job-board-three-omega.vercel.app/og-default.svg",
    url: "https://job-board-three-omega.vercel.app/",
    siteName: "Job Board",
    type: "website",
    twitterCard: "summary_large_image"
  };
};

export const seoConfig: Record<string, SeoConfig> = {
  home: {
    title: "Job Board - Find Your Next Opportunity",    
    description: "Discover your next career move with our job board. Browse thousands of job listings, find the perfect fit, and take the next step in your professional journey.",
    image: "https://job-board-three-omega.vercel.app/og-default.svg",
    url: "https://job-board-three-omega.vercel.app/",
    siteName: "Job Board",
    type: "website",
    twitterCard: "summary_large_image"
   },
  viewAllJobs: {
    title: "Browse All Jobs | Find Your Next Opportunity!",
    description: "Browse all job listings and find your next opportunity. Fresh listings, sorted by newest first."
    },
    profile: {
        title: "Your Profile | Job Board",
        description: "View and edit your profile, manage your job applications, and track your career progress on Job Board."
    },
    editProfile: {
        title: "Edit Your Profile | Job Board",
        description: "Update your profile information, upload your resume, and manage your job preferences on Job Board."   
    },
    notifications: {
        title: "Your Notifications | Job Board",
        description: "Stay updated with the latest job alerts, application statuses, and important updates on Job Board."
    },
    viewSavedJobs: {
        title: "Your Saved Jobs | Job Board",
        description: "View and manage your saved job listings, keep track of your favorite opportunities, and stay organized on Job Board."
    },
    postJob: {
        title: "Post a Job | Job Board",
        description: "Post your job openings and find the perfect candidates on Job Board. Reach a wide audience of job seekers and grow your team."
    },
    companyDashboard: {
        title: "Company Dashboard | Job Board",
        description: "Manage your company profile, post job openings, and track applications with the Company Dashboard on Job Board."
    },

    //footer pages
    forUs: {
      title: "For Job Seekers | Job Board",
      description: "Discover how Job Board can help you find your next opportunity. Explore job listings, create a profile, and take control of your career journey."
    },
    contacts: {
      title: "Contact Us | Job Board",
      description: "Have questions or need support? Contact the Job Board team for assistance with your job search, account, or any other inquiries."
    },
    forEmployers: {
      title: "For Employers | Job Board",
      description: "Discover how Job Board can help you find the best candidates for your job openings. Post jobs, manage applications, and grow your team with ease."
    },
    termsAndConditions: {
      title: "Terms and Conditions | Job Board",
      description: "Read the terms and conditions for using Job Board. Understand your rights and responsibilities as a user of our job search platform."
    },
    privacy: {
      title: "Privacy Policy | Job Board",
      description: "Learn about our privacy practices and how we protect your personal information on Job Board. Your privacy is important to us."
    },
    cookies: {
      title: "Cookie Policy | Job Board",
      description: "Understand how Job Board uses cookies to enhance your experience. Learn about the types of cookies we use and how to manage them."
    },
    cvTips: {
      title: "CV Tips | Job Board",
      description: "Get expert advice on creating a standout CV. Learn how to highlight your skills, experience, and achievements to land your dream job."
    },
    interviewPreparation: {
      title: "Interview Preparation | Job Board",
      description: "Prepare for your next job interview with confidence. Get tips on common questions, body language, and how to make a great impression."
    },
    salaryNegotiation: {
      title: "Salary Negotiation | Job Board",
      description: "Learn how to negotiate your salary effectively. Get strategies for discussing compensation and ensuring you get the pay you deserve."
    },

}