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

}