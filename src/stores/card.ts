import { Card, CardFace } from './../model/interface';
import { defineStore } from "pinia";
import { useDataStore } from './data';

export const useCardStore = defineStore('card', () => {

    let dataStore = useDataStore()
    let cards = dataStore.getData().cards
    let themes = dataStore.getData().themes

    /**Retourne un nouvel index pour la carte dans la base de données */
    function lastIndex() {
        return cards.length == 0 ? 0 : cards.sort((a: Card, b: Card) => b.id - a.id)[0].id + 1
    }

    /**Créer une nouvelle carte dans le thème passé en paramètre */
    function createCard(themId: number, recto: CardFace, verso: CardFace) {

        //Index de la futur carte
        let tmpId = lastIndex()

        //Création de la carte
        cards.push({
            "id": tmpId,
            "creation_date": new Date().toString(),
            "recto": recto,
            "verso": verso
        }
        )

        //Récupération du thème associé et ajout de la carte
        themes.find(theme => theme.id == themId)?.cards.push(tmpId)

        dataStore.updateCardStorage(cards)
        dataStore.updateThemeStorage(themes)
        console.log(dataStore.getData());
    }

    function deleteCard(id:number, idTheme:number){

        //Supprimer la carte du thème
        let tmpTheme = themes.find(theme => theme.id == idTheme)
        if(tmpTheme){
            //Suppression de la carte si elle existe dans la liste
            if(tmpTheme.cards.includes(id)){
                tmpTheme.cards = tmpTheme.cards.filter(num => num != id)
             }
        }

        //Si aucun autre thème à cette carte la supprimé de la liste des cartes
        let containCard = themes.map(theme => {
            return theme.cards.every(obj => obj != id)
        })

        if(containCard){

            let index = cards.findIndex(obj => obj.id == id)
            if(index != -1)
                cards.splice(index, 1)
        }

       dataStore.updateCardStorage(cards)
       dataStore.updateThemeStorage(themes)
    }

    function getCard(id: number) {
        return cards.find(obj => obj.id == id)
    }

    return { createCard, getCard, deleteCard}
})