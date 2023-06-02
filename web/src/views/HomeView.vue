<template>
  <div class="container">
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
import { useRoute } from "vue-router";
import {v4} from "uuid";
import {ref} from "vue";
import moment from "moment";

const route = useRoute()
const message = ref('')
const days = ref(1)
const watching = ref(1)
const link = ref('')

const hash = ():void => {
  if(days.value < 1 || watching.value < 1){
    alert('Введите корректное количество дней и просмотров')
  }else {
    const linkId: string = v4().split('-').join('')
    const hashMessage : string = CryptoJS.AES.encrypt(message.value, 'secret').toString()

    axios
        .post('/', {id: linkId, message: hashMessage, days: days.value, watching: watching.value, createdIn: moment(Date()).format()})
        .then(link.value = document.location.href + linkId)
  }
}
</script>

<style scoped>
  .container{
    padding: 40px;
    display: flex;
    gap: 40px;
    background: white;
    border-radius: 15px;
    box-shadow: 3px 5px 20px rgba(105, 35, 121, 0.5);
  }
  textarea{
    border-radius: 10px;
    resize: none;
    width: calc(100% - 20px);
    padding: 10px;
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
    transition: 0.2s;
    box-shadow: 0px 10px 30px rgb(0,0,0,0.5);
  }
  button[disabled]{
    background: rgb(204,204,204);
    background: linear-gradient(270deg, rgba(204,204,204,1) 0%, rgba(145,145,145,1) 100%);
    box-shadow: none;
  }
  button:hover{
    box-shadow: none;
    cursor: pointer;
  }
  .line{
    width: 1px;
    height: 200px;
    background: rgb(0,0,0,0.3);
  }
  .selects{
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }
  input{
    margin-top: 10px;
    border-radius: 5px;
    width: 70px;
  }
  h1{
    font-size: 21px;
  }
  .link_title{
    margin-top: 10px;
  }
  .link{
    width: 100%;
    padding: 10px;
    background: rgba(251,192,242,1);
    height: 20px;
    border-radius: 10px;
    margin-top: 10px;
    color: white;
  }

</style>
