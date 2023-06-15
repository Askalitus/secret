<template>
  <div class="container">
    <p
      v-if="store.error"
      class="container__deadLink"
    >
      {{ $t('deadLink') }}
    </p>
    <p
      v-if="store.link.message != 'Здесь появится ваше сообщение' &&
        store.link.message != 'Here will appear your message' && !store.error"
    >
      {{ $t('remainingViews') }}
      {{ store.link.remainingWatchings }} {{ $t('remainingDays') }}
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
      :disabled="store.link.message != 'Здесь появится ваше сообщение' &&
        store.link.message != 'Here will appear your message'"
      v-if="!store.error"
      type="button"
      @click="showMessage"
    >
      {{ $t('show') }}
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
