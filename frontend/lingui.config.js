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
			path: "<rootDir>/src/i18n/locales/{locale}/companies",
			include: ["src/features/companies"],
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
	],
});
