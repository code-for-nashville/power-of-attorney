import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import english from './english'

i18n
  .use(LanguageDetector)
  .init({
    fallbackLng: 'en',
    debug: process.env.NODE_ENV !== 'production',
    // react i18next special options (optional) https://react.i18next.com/components/i18next-instance
    react: {
      wait: false,
      bindI18n: 'languageChanged loaded',
      bindStore: 'added removed',
      nsMode: 'default'
    }
  });

i18n.addResourceBundle('en', 'translation', english, true, true)

export default i18n;