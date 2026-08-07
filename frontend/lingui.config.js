import { defineConfig } from "@lingui/cli";
import { formatter } from "@lingui/format-po";

export default defineConfig({
	sourceLocale: "en",
	locales: ["bg", "en"],
	format: formatter({
		origins: false,
		lineNumbers: false,
		compactMultiline: true,
		foldLength: 0,
	}),
	catalogs: [
		{
			path: "<rootDir>/src/i18n/locales/{locale}/shared",
			include: [
				"src/shared/components",
				"src/shared/hooks",
				"src/shared/Layouts",
				"src/shared/pages",
				"src/shared/utils",
				"src/shared/validators",
				"src/shared/view/Header",
				"src/i18n",
				"src/App.tsx",
				"src/main.tsx",
			],
		},
		{
			path: "<rootDir>/src/i18n/locales/{locale}/auth",
			include: ["src/features/auth"],
		},
		{
			path: "<rootDir>/src/i18n/locales/{locale}/homeview",
			include: ["src/features/homeview"],
		},
		{
			path: "<rootDir>/src/i18n/locales/{locale}/jobs",
			include: ["src/features/jobs"],
		},
		{
			path: "<rootDir>/src/i18n/locales/{locale}/view-all-companies",
			include: ["src/features/companies/views/ViewAllCompanies"],
		},
		{
			path: "<rootDir>/src/i18n/locales/{locale}/categories",
			include: ["src/features/categories"],
		},
		{
			path: "<rootDir>/src/i18n/locales/{locale}/notifications",
			include: ["src/features/notifications"],
		},
		{
			path: "<rootDir>/src/i18n/locales/{locale}/profile",
			include: ["src/features/profile"],
		},
		{
			path: "<rootDir>/src/i18n/locales/{locale}/footer",
			include: [
				"src/shared/view/Footer",
				"src/shared/routes/FooterRoutes.tsx",
			],
		},
		{
			path: "<rootDir>/src/i18n/locales/{locale}/for-us",
			include: ["src/shared/view/FooterPages/ForUs"],
		},
		{
			path: "<rootDir>/src/i18n/locales/{locale}/contact",
			include: ["src/shared/view/FooterPages/Contacts"],
		},
		{
			path: "<rootDir>/src/i18n/locales/{locale}/for-employers",
			include: ["src/shared/view/FooterPages/ForEmployers"],
		},
		{
			path: "<rootDir>/src/i18n/locales/{locale}/terms-and-conditions",
			include: ["src/shared/view/FooterPages/TOS"],
		},
		{
			path: "<rootDir>/src/i18n/locales/{locale}/privacy",
			include: ["src/shared/view/FooterPages/Privacy"],
		},
		{
			path: "<rootDir>/src/i18n/locales/{locale}/cookies",
			include: ["src/shared/view/FooterPages/Cookies"],
		},
		{
			path: "<rootDir>/src/i18n/locales/{locale}/cv-tips",
			include: ["src/shared/view/FooterPages/CareerAdvice/CVTips"],
		},
		{
			path: "<rootDir>/src/i18n/locales/{locale}/interview-preparation",
			include: ["src/shared/view/FooterPages/CareerAdvice/interviewPreparation"],
		},
		{
			path: "<rootDir>/src/i18n/locales/{locale}/salary-negotiation",
			include: ["src/shared/view/FooterPages/CareerAdvice/SalaryNegotiation"],
		},
		{
			path: "<rootDir>/src/i18n/locales/{locale}/profile",
			include: [
				"src/features/profile/mainProfilePage/profile",
				"src/features/profile/components/ProfileDataContainer/ProfileMainContainer",
				"src/features/profile/components/UploadProfileImage/UploadProfileImage",
				"src/features/profile/components/JobPosting/JobPosting",
				"src/features/profile/components/RoleAndCompanySection/ProfileRightPanel",
				"src/features/auth/views/Logout/Logout",
			],

		},
		{
			path: "<rootDir>/src/i18n/locales/{locale}/edit-profile",
			include: ["src/features/profile/views/EditProfile",
				"src/features/profile/views/ChangePassword",
			],

		},
		{
			path: "<rootDir>/src/i18n/locales/{locale}/jobs",
			include: ["src/features/jobs/views/ViewAllJobs/ViewAllJobs",
			],

		},
		{
			path: "<rootDir>/src/i18n/locales/{locale}/notifications",
			include: ["src/features/notifications/views/Notifications",
				"src/features/notifications/components/NewMessageNotification/ModalReply",
				"src/features/notifications/components/NewMessageNotification/CompanyInvitationNotification",
				"src/features/notifications/components/NewMessageNotification/NewMessageNotification",
			],

		},
		{
			path: "<rootDir>/src/i18n/locales/{locale}/post-job",
			include: ["src/features/jobs/views/CreateJob",
				"src/features/jobs/validators",
				"src/features/jobs/form/",
			],

		},
		{
			path: "<rootDir>/src/i18n/locales/{locale}/pagination",
			include: ["src/shared/components/Pagination"],

		},
		{
			path: "<rootDir>/src/i18n/locales/{locale}/company-view",
			include: ["src/features/companies/views/ViewAllCompanies",],

		},
		{
			path: "<rootDir>/src/i18n/locales/{locale}/register-company",
			include: ["src/features/companies/views/RegisterCompany",],

		},

		{
			path: "<rootDir>/src/i18n/locales/{locale}/dashboard",
			include: ["src/features/companies/views/Dashboard",
				"src/features/companies/components/DashboardSidebarUI",
				"src/features/companies/components/CompanyJobList",
				"src/features/companies/components/DangerButtons/LeaveCompany",
				"src/features/companies/components/DangerButtons/AbandonCompany",
				"src/features/companies/components/PromoteOwnershipModal",
				"src/features/companies/components/InviteMemberToCompany",
				"src/features/companies/components/SendMessage",
			],

		},
		{
			path: "<rootDir>/src/i18n/locales/{locale}/edit-job",
			include: ["src/features/jobs/views/EditJob",],

		},
		{
			path: "<rootDir>/src/i18n/locales/{locale}/filtered-jobs",
			include: ["src/features/jobs/views/FilterJobsByCategory",
				"src/features/jobs/form",
			],

		},
		{
			path: "<rootDir>/src/i18n/locales/{locale}/guide-post-job",
			include: ["src/features/jobs/views/HowToPostJobInfo",],

		},

		{
			path: "<rootDir>/src/i18n/locales/{locale}/seoTranslates",
			include: ["src/seo",],

		},
		{
			path: "<rootDir>/src/i18n/locales/{locale}/members-view",
			include: ["src/features/companies/views/ViewMembers",
				"src/features/companies/components/MembersActions",
			],

		},
		{
			path: "<rootDir>/src/i18n/locales/{locale}/saved-jobs",
			include: ["src/features/jobs/views/SavedJobView",],

		},
		{
			path: "<rootDir>/src/i18n/locales/{locale}/saved-jobs",
			include: ["src/features/jobs/views/SavedJobView",],

		},
		


	],

});
