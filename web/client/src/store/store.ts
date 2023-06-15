import { ref } from 'vue';
import { defineStore } from 'pinia';
import { useI18n } from 'vue-i18n';

export const useStore = defineStore('store', () => {
  const { t } = useI18n();
  const link = ref({
    message: `${t('placeholder')}` as string,
    remainingDays: 0 as number,
    remainingWatchings: 0 as number,
  });

  const userMessage = ref('');
  const userDays = ref(0);
  const userWatchings = ref(0);
  const resultLink = ref('');
  const error = ref('');

  return {
    link, userMessage, userDays, userWatchings, resultLink, error,
  };
});
