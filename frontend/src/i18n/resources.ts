import bgCommon from './locales/bg/home.json'
import enCommon from './locales/en/home.json'

export const resources = {
    bg: {
        common: bgCommon
    },
    en: {
        common: enCommon
    }
} as const

export type Resources = typeof resources