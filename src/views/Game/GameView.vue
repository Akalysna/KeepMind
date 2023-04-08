<script setup>
import Card from '../../components/Card.vue';
import router from '../../router';
import { useCardStore } from '../../stores/card';
import { useGameStore } from '../../stores/game';
import { reactive, ref } from 'vue'

const gameStore = useGameStore()
const cardStore = useCardStore()
const props = defineProps({
    id: { type: Number, required: true }
})

/**Vérifie si l'initialisation c'est bien déroulé */
let initOk = gameStore.init(props.id)

//Redirection vers la page précédente
if (!initOk) {
    console.log("Erreur lors du chargement du thème");
    router.go(-1)
}

let cardId = ref(0)
let showVerso = ref(false)

/**Passe à la carte suivant */
function nextCard() {
    cardId.value += 1
    console.log(cardId.value);
    showVerso.value = false
}

/**Montre le verso de la carte */
function showAnswer() {
    showVerso.value = !showVerso.value
    console.log("showVerso : ", showVerso.value);
}


</script>

<template>
    <Card :show-verso="showVerso" :edit="false" :id-theme="id" :id="cardId" :recto="cardStore.getCard(cardId).recto"
        :verso="cardStore.getCard(cardId).verso" />

    <div class="btns">

        <div v-show="showVerso" class="btns-answer">
            <button>Faux</button>
            <button v-on:click="nextCard()">Juste</button>
        </div>

        <button v-show="!showVerso" v-on:click="showAnswer()">Afficher la carte</button>
    </div>
</template>

<style scoped lang="scss"></style>