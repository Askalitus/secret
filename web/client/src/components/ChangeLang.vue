<template>
  <div class="changeLang">
    <p>{{ $t('changeLang') }}</p>
    <select v-model="$i18n.locale">
      <option
        v-for="locale in $i18n.availableLocales"
        :key="`locale-${locale}`"
        :value="locale"
      >
        {{ locale }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<style lang="sass" scoped>
.changeLang
  display: flex
  justify-content: center
  align-items: center
  gap: 10px
  margin-top: 20px
  color: rgba(30, 30, 30, 0.58)
</style>
