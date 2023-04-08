import { Card, CardFace } from './../model/interface';
import { defineStore } from "pinia";
import { useDataStore } from './data';
import { useCardStore } from './card';

export const useCardGameStore = defineStore('card-game', () => {

    let card: Card|undefined;
    let showVerso:boolean = false

    function initCard(idCard: number) {
        card = useCardStore().getCard(idCard)
        


        return card ? true : false
    }

    

    return {}
})