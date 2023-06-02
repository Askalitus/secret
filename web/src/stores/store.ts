import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
// @ts-ignore
import axios from '../../axios.js';
import moment from 'moment';

export const useStore = defineStore('link', () => {
  const link = ref({
      linkId: '' as string,
      message: '' as string,
      days: 0 as number,
      watching: 0 as number,
      createdIn: '' as string
  })
  function getLinkId(id: string): void {
    axios
        .get('/' + id)
        .then((res: axios.AxiosResponse<any>): void => {
            link.value.linkId = res.data[0].id
            link.value.message = res.data[0].message
            link.value.days = res.data[0].days
            link.value.watching = res.data[0].watching
            link.value.createdIn = res.data[0].createdin
            console.log(+new Date() - +new Date(link.value.createdIn))
        })
  }

  function lowWatching(id: string): void {
    axios
        .put('/' + id, { watching: link.value.watching - 1 })
        .then()
  }

  const visible = computed((): boolean => {
      return link.value.watching > 0 && +new Date() - (+new Date(link.value.createdIn) - 10800000) < link.value.watching * 24 * 60 * 60 * 1000 ? true : false
  })

     const remainingDays = computed((): any => {
         return Math.trunc((link.value.days * 24 * 60 * 60 * 1000 - (+new Date() - (+new Date(link.value.createdIn) - 10800000))) / 24 / 60 / 60 / 1000) + 1
     })

  return { link, getLinkId, lowWatching, visible, remainingDays }
})
