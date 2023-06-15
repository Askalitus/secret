<template>
  <div class="container">
    <p
      v-if="store.error"
      class="container__deadLink"
    >
      У ссылки закончился срок действия, или ее не существует
    </p>
    <p
      v-if="store.link.message != 'Здесь появится ваше сообщение' && !store.error"
    >
      У ссылки осталось просмотров (включая текущий):
      {{ store.link.remainingWatchings }} и дней:
      {{ store.link.remainingDays }}
    </p>
    <textarea
      v-if="!store.error"
      v-model="store.link.message"
      readonly
      cols="30"
      rows="10"
    />
    <button
      :disabled="store.link.message != 'Здесь появится ваше сообщение'"
      v-if="!store.error"
      type="button"
      @click="showMessage"
    >
      Показать сообщение
    </button>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useStore } from '../../../store/store.ts';
import { useActions } from '../../../store/actions.ts';

const store = useStore();
const actions = useActions();
const route = useRoute();

const showMessage = (): void => {
  actions.getLinkId(String(route.params.id));
};
</script>

<style lang="sass" scoped>
.container
  padding: 40px
  display: flex
  flex-direction: column
  gap: 40px
  background: white
  border-radius: 15px
  box-shadow: 3px 5px 20px rgba(105, 35, 121, 0.5)

.container__deadLink
  background: rgba(246, 49, 49, 0.98)
  padding: 5px
  color: white
  border-radius: 5px
</style>
