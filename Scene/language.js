import I18n from 'react-native-i18n';
import React ,{Component}from 'react';
import * as RNLocalize from "react-native-localize";
import cn from './cn';
import en from './en';

const locales = RNLocalize.getLocales();
const systemLanguage = locales[0]?.languageCode;  // 用户系统偏好语言
console.log(locales);
console.log(systemLanguage);

if (1) {
  I18n.locale = 'zh';
} else {
  I18n.locale = 'zh';  // 默认语言为英文
}

I18n.fallbacks = true;
I18n.translations = {
  zh:cn,
  en,
};

export const changeLaguage = (languageKey) => {
  i18next.setLanguage(languageKey)
}
export default I18n;
