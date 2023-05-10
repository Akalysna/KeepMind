<script setup lang="ts">

import ThemeItem from "../components/ThemeItem.vue";
import Stats from '../components/Stats.vue';

import { useThemeStore } from '../stores/theme/theme'
import { useCardStore } from '../stores/card/card';
import { useAllStore } from '../stores/all';
import router from "../router";
import Navbar from "../components/Navbar.vue";
import Modal from "../components/Modal.vue";

const storeAll = useAllStore()
const storeTheme = useThemeStore()
const storeCard = useCardStore()

////////////////////////////////////////////

/**Themes de l'application */
let themes = storeTheme.getThemes()

/**Supprime les données de l'application */
function clear() {
  storeAll.clearLocalStorage()
}

function createTheme() {
  router.push({ path: `/create-theme` })
}

</script>


<template>
  
  <Navbar />
  <header>
    <h1>Keep Mind</h1>

    <!-- Statistique sur le nombre de cartes, de themes et de cartes apprise -->
    <div class="stats">
      <Stats :number="storeTheme.getSize()" name="Themes" />
      <Stats :number="storeCard.getSize()" name="Cartes" />
      <Stats :number="0" name="Apprise" />
    </div>
  </header>
    
    <Modal>
      <form action="">
        <label for="">THE INPUT</label>
        <input type="text">
      </form>
    </Modal>

  <!-- <button v-on:click="clear()">Supprime tout !</button> -->

  <section>
    <h2>Mes thèmes</h2>

    <!-- Liste des thèmes de l'application -->
    <div class="themes">
      
      <ThemeItem v-for="item in themes" :theme="item" />
    </div>


  </section>

  <!-- <button v-on:click="createTheme()">+</button> -->

</template>

<style scoped lang="scss">
header {
  display: flex;
  justify-content: top;
  flex-direction: column;
  align-items: center;
  padding-top: 2em;
  padding: 3em;
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
  // width: 80%;
}

section {
  margin: 1em 1.5em;
  width: 100vw;
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
