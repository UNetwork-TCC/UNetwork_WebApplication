'use client';

import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import PT from '@/public/assets/i18n/pt.json';
import EN from '@/public/assets/i18n/en.json';
import SP from '@/public/assets/i18n/sp.json';

// Criando recursos de forma segura para SSR
const resources = {
  pt: { translation: PT.translation },
  en: { translation: EN.translation },
  sp: { translation: SP.translation },
};

// Verificando se já foi inicializado para evitar múltiplas inicializações
if (!i18next.isInitialized) {
  i18next
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'pt',
      debug: process.env.NEXT_PUBLIC_NODE_ENV === 'development',
      interpolation: {
        escapeValue: false,
      },
      detection: {
        order: ['localStorage', 'navigator'],
        lookupLocalStorage: 'lang',
        caches: ['localStorage'],
      },
    });
}

export default i18next;
