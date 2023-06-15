import { createI18n } from 'vue-i18n';
import en from '../langs/en.json';
import ru from '../langs/ru.json';

function loadLocaleMessages() {
  const locales = [{ en }, { ru }];
  const messages = {};
  locales.forEach((lang) => {
    const key = Object.keys(lang);
    messages[key] = lang[key];
  });
  return messages;
}

export default createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: loadLocaleMessages(),
  globalInjection: true,
});
