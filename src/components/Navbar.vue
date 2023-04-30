<script setup lang="ts">
import router from '../router';
import NavItem from './NavItem.vue';
import IconHome from './icons/IconHome.vue'
import IconChartBar from './icons/IconChartBar.vue'
import IconPlus from './icons/IconPlus.vue'


function createTheme() {
  router.push({ path: `/create-theme` })
}
</script>

<template>
  <div class="navbar">
    <NavItem :is-selected="true" img="../assets/icon/home.svg" text="Home">
      <template #icon>
        <IconHome id="icon-pencil" />
      </template>
    </NavItem>

    <button v-on:click="createTheme()" class="add-theme"><IconPlus/></button>

    <NavItem img="../assets/icon/chart-bar.svg" text="Stats">
      <template #icon>
        <IconChartBar id="icon-pencil" />
      </template>
    </NavItem>
  </div>
</template>

<style scoped lang="scss">

.add-theme{

  display: flex;
  align-items: center;
  justify-content: center;
  
  background: #171717;
  border-radius: 8px;
  height: 1.8em;
  width: 1.8em;
  border: none;
  color: white;
  font-size: 2em;
  padding: 0;
}

.navbar {
  display: flex;
  justify-content: center;
  align-items: center;

  background: #FFFFFF;
  box-shadow: 2px 4px 4px rgba(115, 115, 115, 0.25);
  border-radius: 28px;

  padding: 0.8em;
  width: 90vw;
  margin: auto;

  gap: 4em;

  position: fixed;
  bottom: 1.5em;
  left: 0;
  right: 0;
}
</style>