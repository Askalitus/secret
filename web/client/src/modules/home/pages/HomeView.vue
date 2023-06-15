<template>
  <div class="container">
    <div class="left_side">
      <textarea
        v-model="store.userMessage"
        cols="30"
        rows="10"
      />
      <button
        type="button"
        :disabled="!store.userMessage.length"
        @click="create"
      >
        {{ $t("buttons.hash") }}
      </button>
    </div>
    <div class="container__line" />
    <div class="right">
      <h1>{{ $t('delete') }}</h1>
      <div class="container__right__selects">
        <div class="item">
          <p>{{ $t('days') }}</p>
          <input
            v-model="store.userDays"
            type="number"
            min="1"
          >
        </div>
        <div class="item">
          <p>{{ $t('watchings') }}</p>
          <input
            v-model="store.userWatchings"
            type="number"
            min="1"
          >
        </div>
      </div>
      <h1 class="container__right__link-title">
        {{ $t('link') }}
      </h1>
      <p class="container__right__link">
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

const create = ():void => {
  actions.createLink();
};
</script>

<style lang="sass" scoped>
.container
  padding: 40px
  display: flex
  gap: 40px
  background: white
  border-radius: 15px
  box-shadow: 3px 5px 20px rgba(105, 35, 121, 0.5)

.container__line
  width: 1px
  height: 200px
  background: rgb(0,0,0,0.3)

.container__right__selects
  display: flex
  justify-content: space-between
  margin-top: 20px

.container__right__link-title
  margin-top: 10px
.container__right__link
  width: 100%
  padding: 10px
  background: rgba(251,192,242,1)
  height: 20px
  border-radius: 10px
  margin-top: 10px
  color: white
</style>
