import { Card, CardFace } from './../model/interface';
import { defineStore } from "pinia";
import { useDataStore } from './data';

export const useCardStore = defineStore('card', () => {

    let dataStore = useDataStore()
    let cards = dataStore.cards
    let themes = dataStore.themes

    /**Retourne un nouvel index pour la carte dans la base de données */
    function lastIndex() {

        let lastId = 0

        for(const key in cards) {
            if(cards[key].id > lastId)
                lastId = cards[key].id
        }

        lastId += 1
        return lastId
    }

    /**Créer une nouvelle carte dans le thème passé en paramètre */
    function createCard(themeId: number, recto: CardFace, verso: CardFace) {

        //Index de la futur carte
        let id = lastIndex()

        //Création de la carte
        cards[id] = {
            "id": id,
            "creation_date": new Date().toString(),
            "recto": recto,
            "verso": verso
        }

        //Récupération du thème associé et ajout de la carte
        themes[themeId].cards.push(id)

        dataStore.save()
    }

    /**
     * Supprime la carte du thème. La carte est supprimé si elle n'appartient à aucun thème
     * @param id Identifiant de la carte
     * @param themeId Identifiant du thème
     */
    function deleteCard(id:number, themeId:number){

        let tmp = themes[themeId]

        if(Object.keys(tmp).length !== 0){

            if(tmp.cards.includes(id))
                tmp.cards = tmp.cards.filter((num: number) => num !== id)
        }

        //Si aucun autre thème à cette carte la supprimé de la liste des cartes
        let haveCard:boolean = false

        for (const key in themes) {
            haveCard ||= themes[key].cards.includes(id)
        }

        if(!haveCard){
            delete cards[id]
        }

        dataStore.save()
    }

    /**
     * Retourne la carte
     * @param id Identifiant de la carte
     * @returns 
     */
    function getCard(id: number) {
        return cards[id]
    }

    return { createCard, getCard, deleteCard}
})