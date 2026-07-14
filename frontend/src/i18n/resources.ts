import bgCommon from './locales/bg/common.json'
import emCommon from './locales/en/common.json'

export const resources = {
    bg: {
        common: bgCommon
    },
    em: {
        common: emCommon
    }
} as const

export type Resources = typeof resources