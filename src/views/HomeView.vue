<script setup>
import { useThemeStore } from '../stores/theme'
import ThemeItem from "../components/ThemeItem.vue";
import Stats from '../components/Stats.vue';
import { useDataStore } from '../stores/data';

let store = useThemeStore()
const dataStore = useDataStore()
let themes = store.getThemes()

console.log({ themes });
</script>


<template>
  <header>

    <h1>Keep Mind</h1>

    <div class="stats">
      <Stats :number="dataStore.getNumTheme()" name="Themes" />
      <Stats :number="dataStore.getNumCard()" name="Cartes" />
      <Stats :number="0" name="Apprise" />
    </div>
  </header>

  <section>
    <h2>Mes thèmes</h2>

    <div class="themes">
      <ThemeItem v-for="(item, index) in themes" :theme="item" />
    </div>
  </section>

  <!-- <li v-for="(item, index) in themes" :key="index">{{ item.name }}, {{ store.getNumberCard(item.id) }}</li> -->
</template>

<style scoped lang="scss">
header {

  padding-top: 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: end;

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

section{
  margin: 1em 1.5em;
}

.themes{
  display: flex;
flex-direction: column;
overflow: auto;
gap: 1em;
}

h2{
  font-family: Barlow-SemiBold;
  font-size: 1.6em;
  text-transform: uppercase;
  margin-bottom: 0.5em;
  margin-left: 0.5em;
}
</style>
