<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <RouterView />
</template>

<style>
*{
  font-family: 'Comfortaa', cursive;
  margin: 0;
  padding: 0;
}
 body{
   display: flex;
   align-items: center;
   justify-content: center;
   background: rgb(217,128,255);
   background: linear-gradient(180deg, rgba(217,128,255,1) 0%, rgba(251,192,242,1) 100%);
   background-repeat: no-repeat;
   background-size: cover;
   min-height: 100vh;
 }
</style>
