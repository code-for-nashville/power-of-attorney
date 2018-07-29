import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import english from '../strings/english'
import spanish from '../strings/spanish'

i18n.use(LanguageDetector).init({
  fallbackLng: 'en',
  debug: process.env.NODE_ENV !== 'production',
  // react i18next special options (optional) https://react.i18next.com/components/i18next-instance
  react: {
    wait: false,
    bindI18n: 'languageChanged loaded',
    bindStore: 'added removed',
    nsMode: 'default'
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

i18n.addResourceBundle('en', 'translation', english)
i18n.addResourceBundle('es', 'translation', spanish)

export const getCurrentLanguage = () => {
  // English and Spanish are currently the only supported languages
  if (i18n.language && i18n.language.includes('es')) {
    return 'es'
  }
  return 'en'
}

export default i18n
