import { defineStore } from 'pinia';
import { useI18n } from 'vue-i18n';
import { computed } from 'vue';
import { useStore } from './store.ts';

export const useGetters = defineStore('getters', () => {
  const { t } = useI18n();
  const store = useStore();

  const remainings = computed(() => `${t('remainingViews')
  } ${store.link.remainingWatchings}${t('remainingDays')} ${store.link.remainingDays}`);

  return { remainings };
});
