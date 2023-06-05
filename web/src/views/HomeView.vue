<template>
  <div class="home_container">
    <div class="left_side">
      <textarea cols="30" rows="10" v-model="message"></textarea>
      <button @click="hash" :disabled="!message.length">Зашифровать</button>
    </div>
    <div class="line"></div>
    <div class="right_side">
      <h1>Удалить сообщение и ссылку после:</h1>
      <div class="selects">
        <div class="item">
          <p>Дней:</p>
          <input type="number" min="1" v-model="days">
        </div>
        <div class="item">
          <p>Просмотров:</p>
          <input type="number" min="1" v-model="watching">
        </div>
      </div>
      <h1 class="link_title">Готовая ссылка:</h1>
      <p class="link">{{ link }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import CryptoJS from "crypto-js"
import axios from "../../axios.js"
import {v4} from "uuid";
import {ref} from "vue";
import moment from "moment";

const message = ref<string>('')
const days = ref<number>(1)
const watching = ref<number>(1)
const link = ref<string>('')

const hash = ():void => {
  if(days.value < 1 || watching.value < 1){
    alert('Введите корректное количество дней и просмотров')
  }else {
    const linkId: string = v4().split('-').join('')
    const hashMessage : string = CryptoJS.AES.encrypt(message.value, 'secret').toString()

    axios
        .post('/', {id: linkId, message: hashMessage, days: days.value, watching: watching.value, createdIn: moment(Date()).format()})
        .then(res => {
          link.value = document.location.href + linkId
        })
  }
}
</script>
