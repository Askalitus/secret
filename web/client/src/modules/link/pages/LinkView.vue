<template>
  <div class="container">
    <p
      v-if="store.error"
      class="container__deadLink"
    >
      {{ $t('deadLink') }}
    </p>
    <p
      v-if="store.link.message"
    >
      {{ getters.remainings }}
    </p>
    <textarea
      v-if="!store.error"
      v-model="store.link.message"
      :placeholder="`${$t('placeholder')}`"
      readonly
      cols="30"
      rows="10"
    />
    <button
      v-if="!store.error"
      :disabled="store.link.remainingDays"
      type="button"
      @click="actions.getLinkId(String(route.params.id))"
    >
      {{ $t('show') }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useStore } from '../../../store/store.ts';
import { useActions } from '../../../store/actions.ts';
import { useGetters } from '../../../store/getters.ts';

const store = useStore();
const actions = useActions();
const getters = useGetters();
const route = useRoute();
</script>

<style lang="sass" scoped>
.container
  width: 650px
  padding: 40px
  display: flex
  flex-direction: column
  gap: 40px
  background: white
  border-radius: 15px
  box-shadow: 3px 5px 20px rgba(105, 35, 121, 0.5)

  &__deadLink
    background: rgba(246, 49, 49, 0.98)
    padding: 5px
    color: white
    border-radius: 5px
    text-align: center
</style>
