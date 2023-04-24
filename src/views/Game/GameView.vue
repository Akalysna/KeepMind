<script setup lang="ts">

import router from '../../router';
import { useCardStore } from '../../stores/card';
import { Ref, ref } from 'vue'
import type { Card, Theme } from '../../model/interface';
import { useThemeStore } from '../../stores/theme';
import { useRevisionStore } from '../../stores/revision';
import { useDataStore } from '../../stores/data';
import CardCPS from '../../components/Card.vue'
import dayjs from 'dayjs'



const storeTheme = useThemeStore()
const storeCard = useCardStore()
const storeData = useDataStore()
const storeRevision = useRevisionStore()
const props = defineProps({
    id: { type: Number, required: true }
})

/*
Déroulement du niveau
- Récupération des cartes du jour et des niveaux
    - Si la date de la dernière révision n'est pas egale a la date du jour 
        - (Ajouter le bon nombre maj le json) Ajouter X cartes et affecter la date du jour
- Retourner les cartes du dernier niveau du jour
    - Si vide passer au niveau suivant (l'ordre est décroissant)
- Répondre à chaque carte 
    - Correct = Passer la carte au niveau suivant
    - Faux = Passer la carte au niveau 1
- Vérifier si le niveau ne contient plus de carte
- Si tout les niveaux sont vide plus de revision pour aujourd'hui
*/

//___________________________________________________________

let daySpace = 0

/**Tableau contenant l'identifiant des cartes du jour */
let daysCardId: number[] = []
let daysLevel: number[] = []
let showVerso = ref(false)
let level = 0

let theme: Theme = {} as Theme;
let card: Ref<Card> = ref({} as Card)

storeData.showData()

if (theme = storeTheme.getTheme(props.id)) {

    //Première révision
    if (theme.first_revision === "") {
        console.log("Première révision");

        theme.first_revision = new Date().toString()
        storeTheme.save()
    }

    //Nombre de jour entre la première révision et aujourd'hui 
    daySpace = dayjs().diff(theme.first_revision, 'day')

    console.log(daySpace);

    //Ajout de carte en plus
    if (daySpace > 0) {
        console.log("Ajout de nouvelles cartes");
        storeRevision.addRevisionCard(props.id)
    }

    //Vérifier s'il y a des cartes a révisé 

    /**Tableau contenant les niveaux du jour à révisé */
    daysLevel = storeRevision.getTodayLevel(props.id)

    if (daysLevel.length !== 0) {

        if (storeRevision.cardForToday(props.id, daysLevel)) {

            nextLevel()
            nextCard()

        } else {
            exit("Il n'y pas de carte a réviser pour aujourd'hui")
        }

    } else {
        exit("Pas de carte à réviser")
    }

} else {
    exit("Le theme n'existe pas")
}

function exit(message: string) {
    console.log(message);
    router.go(-1)
}

function nextCard() {
    if (daysCardId.length > 0) {
        let id = daysCardId[daysCardId.length - 1]
        if (id > 0)
            card.value = storeCard.getCard(id)
        else
            endGame()
    }
    else
        nextLevel()
}

function nextLevel() {

    //Tant qu'il reste des niveaux et qu'il n'y a pas de carte dans le niveau 
    let haveCard = false
    console.log(daysLevel);

    do {

        level = daysLevel.pop() ?? 0
        console.log(level);
        if (level && level !== 0) {

            haveCard = storeRevision.haveCard(props.id, level)
            console.log(haveCard);
            if (haveCard) {
                daysCardId = storeRevision.getCard(props.id, level)
            }

        } else {
            endGame()
        }

    } while (daysLevel.length > 0 && !haveCard);
}

function endGame() {
    exit("Fin de la révision. End Game")
}



/**Montre le verso de la carte */
function showAnswer() {
    showVerso.value = !showVerso.value
    console.log("showVerso : ", showVerso.value);
}

function answer(cardId: number, isCorrect: boolean) {
    console.log(cardId);
    storeRevision.cardAnswer(props.id, cardId, level, isCorrect)
    nextCard()
}

</script>

<template>
    <CardCPS :show-verso="showVerso" :edit="false" :id-theme="id" :id="card.id" :recto="card.recto" :verso="card.verso" />

    <div class="btns">

        <div v-show="showVerso" class="btns-answer">
            <button v-on:click="answer(card.id, false)">Faux</button>
            <button v-on:click="answer(card.id, true)">Juste</button>
        </div>

        <button v-show="!showVerso" v-on:click="showAnswer()">Afficher la carte</button>
    </div>
</template>

<style scoped lang="scss"></style>