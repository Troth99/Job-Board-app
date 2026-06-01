export type SeoConfig = {
  title: string;
  description: string;

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
    description: "Find your next job opportunity."
  };
};

export const seoConfig: Record<string, SeoConfig> = {
  home: {
    title: "Job Board - Find Your Next Opportunity",    
    description: "Discover your next career move with our job board. Browse thousands of job listings, find the perfect fit, and take the next step in your professional journey."
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
    }


}