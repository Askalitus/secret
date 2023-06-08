<template>
  <div class="link_container">
    <p
      v-if="!store.link.message"
      class="deadLink"
    >
      У ссылки закончился срок действия, или ее не существует
    </p>
    <p
      v-if="store.link.message"
    >
      У ссылки осталось просмотров (включая текущий):
      {{ store.remainingWatching }} и дней:
      {{ store.remainingDays }}
    </p>
    <textarea
      v-if="store.link.message"
      v-model="message"
      readonly
      cols="30"
      rows="10"
    />
    <button
      v-if="store.link.message"
      type="button"
      class="link_button"
      @click="showMessage"
    >
      Показать сообщение
    </button>
  </div>
</template>

<script setup lang="ts">
import CryptoJS from 'crypto-js';
import { useRoute } from 'vue-router';
import { onMounted, ref } from 'vue';
import { useStore } from '@/store/store';

const store = useStore();
const route = useRoute();
const message = ref<string>('Здесь появится ваше сообщение');

onMounted(() => {
  store.getLinkId(String(route.params.id));
});

const showMessage = (): void => {
  message.value = CryptoJS.AES.decrypt(store.link.message, 'secret').toString(CryptoJS.enc.Utf8);
  store.lowWatching(String(route.params.id));
};

</script>
