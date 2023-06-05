<template>
  <div class="link_container">
    <p class="deadLink" v-if="!store.visible">У ссылки закончился срок действия, или ее не существует</p>
    <p v-if="store.visible">У ссылки осталось просмотров (включая текущий): {{ store.link.watching }} и дней: {{ store.remainingDays }}</p>
    <textarea readonly cols="30" rows="10" v-model="message" v-if="store.visible"></textarea>
    <button class="link_button" @click="showMessage" v-if="store.visible">Показать сообщение</button>
  </div>
</template>

<script setup lang="ts">
import CryptoJS from "crypto-js"
import {useStore} from "@/stores/store";
import { useRoute } from "vue-router";
import {onMounted, ref} from "vue";

const store = useStore()
const route = useRoute()
const message = ref<string>('Здесь появится ваше сообщение')

onMounted(() => {
  store.getLinkId(String(route.params.id))
})

const showMessage = (): void => {
  message.value = CryptoJS.AES.decrypt(store.link.message, 'secret').toString(CryptoJS.enc.Utf8)
  store.lowWatching(String(route.params.id))
}

</script>
