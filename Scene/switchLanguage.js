import * as React from 'react';
import * as Localization from 'expo-localization';
import I18n from 'i18n-js';
import zh from './cn'
import en from './en'

// Set the key-value pairs for the different languages you want to support.
I18n.translations = {
  en,
  zh,
};
const systemLanguage = Localization.locale;
if (systemLanguage) {
  I18n.locale = systemLanguage;
} else {
  I18n.locale = 'en';  // 默认语言为英文
}

// Set the locale once at the beginning of your app.

// When a value is missing from a language it'll fallback to another language with the key present.
I18n.fallbacks = true;


export default I18n;
