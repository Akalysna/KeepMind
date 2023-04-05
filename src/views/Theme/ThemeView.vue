<script setup lang="ts">

import Card from '../../components/Card.vue';
import Topbar from '../../components/TopBar.vue';
import { useCardStore } from '../../stores/card';
import { useThemeStore } from '../../stores/theme'
import { useRouter } from 'vue-router'

const storeTheme = useThemeStore()
const storeCard = useCardStore()
const router = useRouter()
const props = defineProps({
    id: {
        type: Number,
        required: true
    }
})

const theme = storeTheme.getTheme(props.id)

let cards: number[] = theme?.cards || []


function goToCards() {
    router.push({ path: `/theme/${props.id}/cards` })
}

</script>

<template>
    <Topbar :show-setting="true" path="/"/>

    <div class="core">

        <h1>{{ theme?.name }}</h1>
        <p>{{ theme?.description }}</p>

        <div class="btns">
            <button class="edit" v-on:click="goToCards()">Modifier</button>
            <button class="revision">Révisé</button>
        </div>

            <h2>Cartes ({{ storeTheme.getNumberCard(id) }})</h2>

            <div class="cards">
                <Card v-for="(idCard) in cards"
                    :recto="storeCard.getCard(idCard)?.recto || { type: 'text', data: '' }"
                    :verso="storeCard.getCard(idCard)?.verso || { type: 'text', data: '' }" 
                    :edit="false" :id="idCard" :id-theme="id" />
            </div>
    </div>
</template>

<style scoped lang="scss">

.btns{
    display: flex;
    justify-content: space-around;
    align-items: center;
    gap: 2em;

    margin: 1em 0 1.8em 0;

    button{
        padding: 0.8em;
        text-transform: uppercase;
        width: 100%;
        font-family: Barlow-SemiBold;
        font-size: 1.2em;
        border-radius: 8px;
        border: 1px solid #171717;
    }
    .edit {
        background: transparent;
        color: #171717;
    }

    .revision{
        background: #171717;
        color: white;
    }
}

h2 {
    font-family: Barlow-SemiBold;
}

.cards {
    display: flex;
    flex-direction: column;
    margin-top: 0.8em;

    gap: 1em;

    height: 100%;
    overflow: auto;
}
</style>