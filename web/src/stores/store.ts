import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from '../../axios.js';

export const useStore = defineStore('link', () => {
  const link = ref({
      linkId: '',
      message: '',
      days: 0,
      watching: 0
  })
  function getLinkId(id: string): void {
    axios
        .get('/' + id)
        .then(res => {
            link.value.linkId = res.data[0].id
            link.value.message = res.data[0].message
            link.value.days = res.data[0].days
            link.value.watching = res.data[0].watching
        })
  }

  return { link, getLinkId }
})
