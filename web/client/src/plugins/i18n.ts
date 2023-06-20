import { createI18n } from 'vue-i18n';
import en from '../langs/en.json';
import ru from '../langs/ru.json';

type MessageSchema = typeof en;

const loadLocaleMessages = (): MessageSchema => {
  const locales = [{ en }, { ru }];
  const messages: MessageSchema = {};
  locales.forEach((lang: MessageSchema): void => {
    const key = Object.keys(lang);
    messages[key] = lang[key];
  });
  return messages;
};

export default createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: loadLocaleMessages(),
  globalInjection: true,
});
