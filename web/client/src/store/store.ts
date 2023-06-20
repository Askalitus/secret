import { reactive, ref } from 'vue';
import { defineStore } from 'pinia';
import { Link } from '../interfaces.ts';

export const useStore = defineStore('store', () => {

  const link: Link = reactive({
    message: '',
    remainingDays: 0,
    remainingWatchings: 0,
  });

  const userMessage = ref('');
  const userDays = ref(0);
  const userWatchings = ref(0);
  const resultLink = ref('');
  const error = ref(false);

  const inputs: { title: string, model: number }[] = reactive([
    { title: 'days', model: userDays },
    { title: 'watchings', model: userWatchings },
  ]);

  return {
    link, userMessage, userDays, userWatchings, resultLink, error, inputs,
  };
});
