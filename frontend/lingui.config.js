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
			path: "<rootDir>/src/i18n/locales/{locale}/messages",
			include: ["src"],
		},
	],
});
