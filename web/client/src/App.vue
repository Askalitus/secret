<template>
  <router-view />
  <ChangeLang />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import ChangeLang from './components/ChangeLang.vue';
</script>
