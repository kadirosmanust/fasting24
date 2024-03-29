import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import common from '@/locales/en/common.json';
import register from '@/locales/en/register.json';
import fastings from '@/locales/en/fasting.json';

export const defaultNS = 'common';
export const resources = {
  en: {
    common,
    register,
    fastings,
  },
} as const;

i18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  ns: ['common', 'register', 'fastings'],
  defaultNS,
  resources,
});
