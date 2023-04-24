<script setup lang="ts">

import { useThemeStore } from '../stores/theme/theme'
import { useAllStore } from '../stores/all';
import { useCardStore } from '../stores/card/card';

import ThemeItem from "../components/ThemeItem.vue";
import Stats from '../components/Stats.vue';

const storeAll = useAllStore()
const storeTheme = useThemeStore()
const storeCard = useCardStore()

let themes = storeTheme.themes

function clear() {
  storeAll.clearLocalStorage()
}
</script>


<template>
  <header>
    <h1>Keep Mind</h1>

    <div class="stats">
      <Stats :number="storeTheme.getSize()" name="Themes" />
      <Stats :number="storeCard.getSize()" name="Cartes" />
      <Stats :number="0" name="Apprise" />
    </div>
  </header>

  <button v-on:click="clear()">Supprime tout !</button>

  <section>
    <h2>Mes thèmes</h2>

    <div class="themes">
      <ThemeItem v-for="item in themes" :theme="item" />
    </div>
  </section>
</template>

<style scoped lang="scss">
header {
  display: flex;
  justify-content: end;
  flex-direction: column;
  align-items: center;
  padding-top: 2em;

  background-color: #171717;

  h1 {
    display: inline-block;
    color: white;
    font-size: 3em;
  }
}

.stats {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 80%;
}

section {
  margin: 1em 1.5em;
}

.themes {
  display: flex;
  flex-direction: column;
  overflow: auto;
  gap: 1em;
}

h2 {
  margin-bottom: 0.5em;
  margin-left: 0.5em;
  font-family: Barlow-SemiBold;
  font-size: 1.6em;
  text-transform: uppercase;
}
</style>
