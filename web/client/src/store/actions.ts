import { defineStore } from 'pinia';
import { AxiosResponse } from 'axios';
import { useStore } from './store.ts';
import axios from '../axios.ts';

export const useActions = defineStore('actions', () => {
  const getLinkId = (id: string): void => {
    const store = useStore();
    axios
      .get(`/${id}`)
      .then((res: AxiosResponse<any>): void => {
        store.link.message = res.data.message;
        store.link.remainingDays = res.data.remainingdays;
        store.link.remainingWatchings = res.data.remainingwatchings;
        if (res.data === 'Ссылка была удалена или её не существует!') {
          store.error = 'Ссылка была удалена или её не существует!';
        }
      });

    axios
      .put(`/${id}`)
      .then();
  };

  const createLink = () => {
    const store = useStore();
    axios
      .post('/', { message: store.userMessage, days: store.userDays, watchingAll: store.userWatchings })
      .then((res) => {
        store.resultLink = document.location.href + res.data;
      })
      .catch((err) => {
        alert(err.response.data.message[0]);
      });
  };

  return {
    getLinkId, createLink,
  };
});
