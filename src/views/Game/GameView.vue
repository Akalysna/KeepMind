<script setup lang="ts">

import router from '../../router';
import { useCardStore } from '../../stores/card/card';
import { Ref, ref } from 'vue'
import type { Card, Revision, Theme } from '../../model/interface';
import { useThemeStore } from '../../stores/theme/theme';
import { useGameStore } from '../../stores/game';
import CardCPS from '../../components/Card.vue'
import dayjs from 'dayjs'
import { useRevisionStore } from '../../stores/revision/revision';
import { compileString } from 'sass';
import { useAllStore } from '../../stores/all';

const storeTheme = useThemeStore()
const storeCard = useCardStore()
const storeRevision = useRevisionStore()
const storeGame = useGameStore()
const storeAll = useAllStore()

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

/*

Vérifier que le thèmes existe
Si première révision initilisé la révision
    Vérifier s'il y a des Maj a faire pour un nouveau jour
    Mettre à jour la date de la dernière révision si besoin 
Vérifier s'il y a des cartes à révisé pour aujourd'hui

*/

//___________________________________________________________

let daySpace = 0

/**Tableau contenant l'identifiant des cartes du jour */
let daysCardId: number[] = []

/**Tableau contenant les niveaux du jour à révisé */
let daysLevel: number[] = []
let showVerso = ref(false)
let level = 0

let theme: Theme = {} as Theme;
let revision: Revision = {} as Revision
let card: Ref<Card> = ref({} as Card)
let revisionId = 0


// Si le thème existe
if (theme = storeTheme.get(props.id)) {

    // Récupération de la révision du thème 
    revisionId = theme.revision_id
    revision = storeRevision.get(revisionId) 

    //Si première révision
    if (revision.first_revision === "") {
        revision.first_revision = dayjs().toString()
        revision.last_revision = dayjs().toString() 
        revision.cards_revision[0].push(...theme.cards) //Initialisation des cartes
        storeGame.addCard(revisionId)//Ajout des cartes du thèmes
        storeRevision.save()
    }

    //Nombre de jour entre la première révision et aujourd'hui 
    daySpace = dayjs().diff(revision.first_revision, 'day')
    let sameDay = dayjs().isSame(dayjs(revision.last_revision))

    //Nouveau jour
    if (daySpace > 0 && !sameDay ) {
        revision.last_revision = dayjs().toString()
        revision.level = []
        storeGame.addCard(revisionId)
    }

    //Vérifier s'il y a des cartes a révisé 
    daysLevel = storeGame.getTodayLevel(props.id).filter(v => !revision.level.includes(v))

    if (daysLevel.length !== 0) {

        if (storeGame.cardForToday(props.id, daysLevel)) {

            storeAll.showData(storeAll.appPrefixName + "revision")
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
        if (id >= 0)
            card.value = storeCard.get(id)
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

        if (level && level !== 0) {

            haveCard = storeGame.haveCard(props.id, level)

            if (haveCard) {
                daysCardId = storeGame.getLevelCards(props.id, level)
            }else{
                revision.level.push(level)
            }

        } else {
            endGame()
        }

    } while (daysLevel.length > 0 && !haveCard);
}

function endGame() {
    console.log("Fin de la révision. End Game");
    router.push({ path: `/theme/${props.id}` })
}



/**Montre le verso de la carte */
function showAnswer() {
    showVerso.value = !showVerso.value
}

function answer(cardId: number, isCorrect: boolean) {
    console.log(cardId);
    storeGame.cardAnswer(props.id, cardId, level, isCorrect)
    nextCard()
    showVerso.value = false
}

</script>

<template>
    <CardCPS v-if="card.recto" :show-verso="showVerso" :edit="false" :id-theme="id" :id="card.id" :recto="card.recto" :verso="card.verso" />

    <div class="btns">

        <div v-show="showVerso" class="btns-answer">
            <button v-on:click="answer(card.id, false)">Faux</button>
            <button v-on:click="answer(card.id, true)">Juste</button>
        </div>

        <button v-show="!showVerso" v-on:click="showAnswer()">Afficher la carte</button>
    </div>
</template>

<style scoped lang="scss"></style>