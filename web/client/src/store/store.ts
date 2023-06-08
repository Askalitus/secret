import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { AxiosResponse } from 'axios';
import axios from "../axios";

export const useStore = defineStore('link', () => {
  // states
  const link = ref({
    message: '' as string,
    willDeleteAt: '' as string,
    watchingAll: 0 as number,
    watchingNow: 0 as number,
  });

  // actions
  function getLinkId(id: string): void {
    axios
      .get(`/${id}`)
      .then((res: AxiosResponse<any>): void => {
        link.value.message = res.data[0].message;
        link.value.willDeleteAt = res.data[0].willdeleteat;
        link.value.watchingAll = res.data[0].watchingall;
        link.value.watchingNow = res.data[0].watchingnow;
      });
  }

  function lowWatching(id: string): void {
    axios
      .put(`/${id}`, { watching: link.value.watchingNow + 1 })
      .then();
  }

  // getters
  const remainingWatching = computed(() => link.value.watchingAll - link.value.watchingNow);

  const remainingDays = computed(() => Math.trunc((new Date(link.value.willDeleteAt).getTime()
    - new Date().getTime()) / 86400000));

  return {
    link, getLinkId, lowWatching, remainingWatching, remainingDays,
  };
});
