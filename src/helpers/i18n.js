// @flow
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector'
import english from '../strings/english'
import spanish from '../strings/spanish'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
  fallbackLng: 'en',
  // debug: process.env.NODE_ENV !== 'production',
  debug: false,
  // react i18next special options (optional) https://react.i18next.com/components/i18next-instance
  react: {
    wait: false,
    bindI18n: 'languageChanged loaded',
    bindStore: 'added removed',
    nsMode: 'default'
  },
  resources: {
    en: {
      translation: english
    },
    es: {
      translation: spanish
    }
  },
  detection: {
    order: [
      'navigator',
      'querystring',
      'cookie',
      'localStorage',
      'htmlTag',
      'path',
      'subdomain'
    ]
  }
})

export const getCurrentLanguage = () => {
  // English and Spanish are currently the only supported languages
  if (i18n.language && i18n.language.indexOf('es') >= 0) {
    return 'es'
  }
  return 'en'
}

export default i18n
