// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          'go-to-top': 'Go to top',
          notFound: 'No results found',
          categoryNotFound: 'Category not found',
          addToCart: 'Add to cart',
        },
      },
      de: {
        translation: {
          'go-to-top': 'Zum Anfang',
          notFound: 'Keine Ergebnisse gefunden',
          categoryNotFound: 'Kategorie nicht gefunden',
          addToCart: 'Zum Warenkorb hinzufügen',
        },
      },
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
