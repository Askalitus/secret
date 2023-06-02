<template>
  <div class="container">
    <p class="deadLink" v-if="!store.visible">У ссылки закончился срок действия, или ее не существует</p>
    <p v-if="store.visible">У ссылки осталось просмотров (включая текущий): {{ store.link.watching }} и дней: {{ store.link.days }}</p>
    <textarea readonly cols="30" rows="10" v-model="message" v-if="store.visible"></textarea>
    <button @click="showMessage" v-if="store.visible">Показать сообщение</button>
  </div>
</template>

<script setup lang="ts">
import CryptoJS from "crypto-js"
import {useStore} from "@/stores/store";
import { useRoute } from "vue-router";
import {onMounted, ref} from "vue";

const store = useStore()
const route = useRoute()
const message = ref('Здесь появится ваше сообщение')

onMounted(() => {
  store.getLinkId(route.params.id)
})

const showMessage = () => {
  message.value = CryptoJS.AES.decrypt(store.link.message, 'secret').toString(CryptoJS.enc.Utf8)
  store.lowWatching(route.params.id)
}

</script>

<style scoped>
.container{
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 40px;
  background: white;
  border-radius: 15px;
  box-shadow: 3px 5px 20px rgba(105, 35, 121, 0.5);
}
button{
  margin-top: 10px;
  width: 100%;
  padding: 20px 0;
  font-size: 20px;
  border-radius: 10px;
  border: none;
  background: rgb(217,128,255);
  background: linear-gradient(90deg, rgba(217,128,255,1) 0%, rgba(251,192,242,1) 100%);
  color: white;
  font-weight: 700;
}
textarea{
  border-radius: 10px;
  resize: none;
  width: calc(100% - 20px);
  padding: 10px;
}
.deadLink{
  background: rgba(246, 49, 49, 0.98);
  padding: 5px;
  color: white;
  border-radius: 5px;
}
</style>
