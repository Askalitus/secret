import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useStore = defineStore('store', () => {
  const link = ref({
    message: 'Здесь появится ваше сообщение' as string,
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
