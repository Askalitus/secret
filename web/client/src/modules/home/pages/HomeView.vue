<template>
  <div class="container">
    <div class="container__left">
      <textarea
        v-model="store.userMessage"
        cols="30"
        rows="10"
      />
      <button
        type="button"
        :disabled="!store.userMessage.trim()"
        @click="actions.createLink();"
      >
        {{ $t("buttons.hash") }}
      </button>
    </div>
    <div class="container__line" />
    <div>
      <h1>{{ $t('delete') }}</h1>
      <div class="container__selects">
<!--        todo v-for -->
        <div v-for="input in store.inputs" :key="input">
          <p>{{ $t(input.title) }}</p>
          <input
            v-model="input.model"
            type="number"
            min="1"
          >
        </div>
      </div>
      <h1 class="container__link-title">
        {{ $t('link') }}
      </h1>
      <p class="container__link">
        {{ store.resultLink }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from '../../../store/store.ts';
import { useActions } from '../../../store/actions.ts';

const store = useStore();
const actions = useActions();
</script>

<style lang="sass" scoped>
.container
  padding: 40px
  display: flex
  gap: 40px
  background: white
  border-radius: 15px
  box-shadow: 3px 5px 20px rgba(4, 47, 157, 0.5)

  &__left
    width: 500px

  &__line
    width: 1px
    height: 200px
    background: rgb(0,0,0,0.3)

  &__selects
    display: flex
    justify-content: space-between
    margin-top: 20px

  &__link-title
    margin-top: 10px
  &__link
    width: 550px
    padding: 10px
    background: rgb(86,78,228)
    height: 20px
    border-radius: 10px
    margin-top: 10px
    color: white
</style>
