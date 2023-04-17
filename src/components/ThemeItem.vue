<script setup lang="ts">
import { useThemeStore } from "../stores/theme"
import { Theme } from "../model/interface";
import type { PropType } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  theme: { type: Object as PropType<Theme>, required: true }
})

const storeTheme = useThemeStore()
const router = useRouter()

/**Navigue vers la page de détail du thème */
function goTo() {
  router.push({ path: `/theme/${props.theme.id}` })
}

</script>

<template>
  <div class="theme-item" v-on:click="goTo()">

    <!-- Info du thème -->
    <div class="theme-item-info">
      <h2>{{ theme.name }}</h2>
      <p>{{ theme.last_revision }}</p>
    </div>

    <!-- Nombre de carte -->
    <p class="theme-item-qte">{{ storeTheme.getCardCount(theme.id) }}</p>
  </div>
</template>

<style scoped lang="scss">
.theme-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  box-shadow: 0px 4px 4px rgba(206, 206, 206, 0.25);
  border-radius: 8px;

  padding: 1em;

  &-info {
    display: flex;
    flex-direction: column;
  }

  &-qte {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #E8EAEC;
    width: 2.5em;
    height: 2.5em;
    border-radius: 8px;
    font-family: Barlow-Bold;
    font-size: 1.6em;
  }
}
</style>