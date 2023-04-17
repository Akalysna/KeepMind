<script setup lang="ts">

import router from '../../router';
import { useCardStore } from '../../stores/card';
import { Ref, ref } from 'vue'
import type { Card, Theme } from '../../model/interface';
import { useThemeStore } from '../../stores/theme';
import { useRevisionStore } from '../../stores/revision';
import { useDataStore } from '../../stores/data';
import CardCPS from '../../components/Card.vue'

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

let theme:Theme = {} as Theme;
let levels:number[] = []
let cards:number[] = []

let currentLevel = 0
let card:Ref<Card>;
let showVerso = ref(false) 


//Récupération du thème
if (storeTheme.contain(props.id)) {

    theme = storeTheme.getTheme(props.id)

    if(theme.first_revision === ""){
        theme.cards_revision[0] = Array.from(theme.cards)
        theme.first_revision = new Date().toString()
        console.log("> Initialisation des cartes dans le niveau 0", theme.cards);
    }

    //S'il s'agit d'un nouveau jour ajouter des cartes
    if (storeRevision.getDayDiffWithToday(theme.last_revision) != 0 || theme.last_revision === "") {
        storeRevision.addRevisionCard(props.id, 5)
        console.log("> Ajout des cartes du jour");
    }

    levels = storeRevision.getTodayLevel(storeTheme.getTheme(props.id))
    console.log("> Niveau du jour : ", levels);

    //Y'a t'il des cartes à révisé aujourd'hui ? 
    if (storeRevision.cardForToday(props.id, levels)) {

        nextLevel()
        console.log("Carte révision : ", theme.cards_revision);
        storeData.showData()
        console.log("Carte révision : ", theme.cards_revision);

        console.log("> Niveau courant : ", currentLevel);
        console.log("> Carte du niveau : ", cards);
        card = ref(storeCard.getCard(cards[cards.length -1]))

        console.log("La carte : ", card.value);

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
        console.log("Next level : Current Level : ", currentLevel);

        //Si le niveau est à 0, c'est que la liste est vide, fin de la partie
        if (currentLevel == 0)
            isEndGame = true

        else {

            isEmpty = storeRevision.getCard(props.id, currentLevel).length <= 0

            //Si le niveau courant à des cartes
            if (!isEmpty) {
                cards = storeRevision.getCard(props.id, currentLevel)
            }
        }

    } while (isEmpty && levels.length > 0);

    if(isEndGame)
        endGame()
}

/**Montre le verso de la carte */
function showAnswer() {
    showVerso.value = !showVerso.value
    console.log("> Verso de la carte : ", showVerso.value);
}

function answer(cardId:number, isCorrect:boolean){
    storeRevision.cardAnswer(props.id, cardId, currentLevel, isCorrect )
    console.log("> Traitement de la réponse");
    next()
}

function next() {

    console.log({cards});
    
    if (cards.length > 0) {
        card.value = storeCard.getCard(cards[cards.length -1]) ?? {} as Card
        console.log(card.value);
    } else {
        nextLevel()
    }

    showVerso.value = false
}

</script>

<template>
    <CardCPS :show-verso="showVerso" :edit="false" :id-theme="id" :id="card.id" :recto="card.recto"
                    :verso="card.verso" />

            <div class="btns">

                <div v-show="showVerso" class="btns-answer">
                    <button v-on:click="answer(card.id, false)">Faux</button>
                    <button v-on:click="answer(card.id, true)">Juste</button>
                </div>

                <button v-show="!showVerso" v-on:click="showAnswer()">Afficher la carte</button>
            </div>
</template>

<style scoped lang="scss"></style>