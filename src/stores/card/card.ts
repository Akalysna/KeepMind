import { CardFace } from '../../model/interface';
import { defineStore } from "pinia";
import { useAllStore } from '../all';
import { useThemeStore } from '../theme/theme';
import json from './card.json'

/**Store des cartes de l'application */
export const useCardStore = defineStore('card', () => {
    
    const storeAll = useAllStore()
    const storeTheme = useThemeStore()
    let themes = {}
    let cards = {}
    
    const localStorageKey = storeAll.appPrefixName + "card"

    function init(){ 
        cards = storeAll.init(localStorageKey, json) 
        themes = storeTheme.getThemes()
    }

    function save(){
        storeAll.save(localStorageKey, cards)
        storeTheme.save()
    }

    function getSize(){
        return Object.keys(cards).length 
    }

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

        console.log(themes[themeId]);

        //Récupération du thème associé et ajout de la carte
        themes[themeId].cards.push(id)

        save()
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

        save()
    }

    /**
     * Retourne la carte
     * @param id Identifiant de la carte
     * @returns 
     */
    function get(id: number) {
        return cards[id]
    }

    function getCards(){
        return cards
    }

    function contain(id:number){ return cards[id] ? true : false }

    return { init, save, getCards, getSize, createCard, get, deleteCard, contain}
})