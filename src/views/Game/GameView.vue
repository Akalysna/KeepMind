<script setup lang="ts">

import router from '../../router';
import { useCardStore } from '../../stores/card';
import { Ref, ref } from 'vue'
import type { Card, Theme } from '../../model/interface';
import { useThemeStore } from '../../stores/theme';
import { useRevisionStore } from '../../stores/revision';
import CardCPS from '../../components/Card.vue'

const themeStore = useThemeStore()
const cardStore = useCardStore()
const revisionStore = useRevisionStore()
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

let theme:Theme = {} as Theme;
let levels:number[] = []
let cards:number[] = []

let currentLevel = 0
let card:Ref<Card>;

//Récupération du thème
if (themeStore.contain(props.id)) {

    theme = themeStore.getTheme(props.id)

    //S'il s'agit d'un nouveau jour ajouter des cartes
    if (getDayDiffWithToday(theme.last_revision)) {
        revisionStore.addRevisionCard(props.id, 1)
    }

    levels = getTodayLevel(themeStore.getTheme(props.id))

    //Y'a t'il des cartes à révisé aujourd'hui ? 
    if (revisionStore.cardForToday(props.id, levels)) {

        nextLevel()
        

    } else {
        exit()
    }


} else {
    exit()
}

//_______________________________________________________
//_______________________________________________________
//_______________________________________________________

function exit() {
    router.go(-1)
}

function endGame() {
    console.log("End game")
    router.go(-1)
}

/**Passe carte du niveau suivant s'il en reste. Sinon endGame */
function nextLevel() {

    let isEndGame: boolean = false;
    let isEmpty = true

    //Tant que le niveau courant est vide et qu'il reste des cartes
    do {

        //Récupération du dernier niveau
        currentLevel = levels.pop() ?? 0

        //Si le niveau est à 0, c'est que la liste est vide, fin de la partie
        if (currentLevel == 0)
            isEndGame = true

        else {

            isEmpty = revisionStore.getCard(props.id, currentLevel).length <= 0

            //Si le niveau courant à des cartes
            if (!isEmpty) {
                cards = revisionStore.getCard(props.id, currentLevel)
            }
        }

    } while (isEmpty && levels.length > 0);

    if(isEndGame)
        endGame()
}

/**Retourne le nombre de jour entre la date passé en paramètre et la date du jour */
function getDayDiffWithToday(date: string) {
    const startDate = Date.parse(date)
    const today = Date.parse(new Date().toString())

    const diffTime = Math.abs(today - startDate);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

/**Retourne les niveau à réviser du jour */
function getTodayLevel(theme: Theme) {

    /**Nombre de jour depuis la première révision */
    const days = getDayDiffWithToday(theme.first_revision)

    /**Niveau à réviser */
    const revisionLevels: number[] = []

    //Bouclé sur le nombre de niveau max autorisé par le thème
    for (let i = 1; i <= theme.max_level; i++) {

        //Pattern irrégulier
        if (i > 3) {
            if (revisionStore.daySpace[i].includes(days))
                revisionLevels.push(i)
        }

        //Pattern régulier
        else {
            if ((days - revisionStore.daySpace[i].start) % revisionStore.daySpace[i].gap == 0)
                revisionLevels.push(i)
        }
    }

    return revisionLevels
}

</script>

<template>
    <!-- <CardCPS :show-verso="showVerso" :edit="false" :id-theme="id" :id="card.id" :recto="card.recto"
                    :verso="card.verso" />

            <div class="btns">

                <div v-show="showVerso" class="btns-answer">
                    <button v-on:click="answer(card.id, false)">Faux</button>
                    <button v-on:click="answer(card.id, true)">Juste</button>
                </div>

                <button v-show="!showVerso" v-on:click="showAnswer()">Afficher la carte</button>
            </div> -->
</template>

<style scoped lang="scss"></style>