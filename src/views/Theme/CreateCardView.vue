<script setup lang="ts">
import { useCardStore } from '../../stores/card'
import { useThemeStore } from '../../stores/theme';
import Card from '../../components/Card.vue';
import { Ref, reactive, ref } from 'vue'
import TopBar from '../../components/TopBar.vue';

const props = defineProps({
    id: {
        type: Number,
        required: true
    }
})

let recto = ref("");
let verso = ref("");
const storeCard = useCardStore()
const storeTheme = useThemeStore()

const theme = storeTheme.getTheme(props.id)
const cards: number[] = reactive(theme?.cards || [])

function create() {

    if (recto.value !== "" && verso.value !== "") {
        storeCard.createCard(props.id, { type: "text", data: recto.value }, { type: "text", data: verso.value })
        recto.value = "";
        verso.value = "";
    } else {
        console.log("Remplissez les deux champs pour créer la carte");
    }

}
</script>


<template>
    <TopBar top-bar-name="Retour au thèmes" :back="-1" />

    <div class="core">
        <h1>Cartes</h1>

        <div class="create-card">
            <div class="create-card-top">
                <textarea placeholder="Tâche" type="text" v-model="recto"></textarea>
            </div>
            <div class="create-card-bottom">
                <textarea id="text" placeholder="Réponse" type="text" v-model="verso"></textarea>
            </div>
            <div class="create-card-add">
                <button v-on:click="create()">Créer une carte</button>
            </div>

        </div>


        <div class="cards">
            <Card v-for="(idCard, index) in cards" :key="index"
                :recto="storeCard.getCard(idCard)?.recto || { type: 'text', data: '' }"
                :verso="storeCard.getCard(idCard)?.verso || { type: 'text', data: '' }" :edit="true" :id=idCard
                :id-theme=id />
        </div>
    </div>
</template>

<style scoped lang="scss">

.create-card {
    background: #F5F5F5;
    border: 1px solid #9D9D9D;
    border-radius: 8px;
    margin: 1em 0;

    textarea {
        font-family: Barlow-Regular;
        font-size: 1.4em;
        width: 100%;
        height: 4em;
        max-height: 8em;
        background-color: transparent;
        border: none;
        height: 100%;

        &:focus{
            outline: none;
        }
    }

    &-top,
    &-bottom, &-add {
        display: flex;
        padding: 1em;
    }

    &-top {
        border-bottom: 1px solid #D9D9D9;
    }

    &-add{
        justify-content: center;
        align-items: center;
        padding-top: 0;
        button{
            border: 1px solid #636363;
            border-radius: 8px;
            background-color: transparent;
            padding: 0.8em;
            width: 80%;
            font-size: 1.2em;
        }
    }
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