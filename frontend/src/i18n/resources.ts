import bgCommon from './locales/bg/common.json'
import enCommon from './locales/en/common.json'

export const resources = {
    bg: {
        common: bgCommon
    },
    en: {
        common: enCommon
    }
} as const

export type Resources = typeof resources