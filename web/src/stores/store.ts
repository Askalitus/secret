import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from '../../axios.js';

export const useStore = defineStore('link', () => {
  const link = ref({
      linkId: '',
      message: '',
      days: 0,
      watching: 0,
      createdIn: ''
  })
  function getLinkId(id: string): void {
    axios
        .get('/' + id)
        .then(res => {
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

  const visible = computed(() => {
      return link.value.watching > 0 && +new Date() - +new Date(link.value.createdIn) < link.value.watching * 24 * 60 * 60 * 1000 ? true : false
  })

  return { link, getLinkId, lowWatching, visible }
})
