import { defineStore } from "pinia";
import json from './data/KeepMind.json'
import { Card, DataApp, Theme } from "../model/interface";

export const useDataStore = defineStore('data', () => {

    //themes : { 1 : {id, nom}}

    let themes = {}
    let cards = {}

    /**
     * Normalize les données de l'application
     * @param themeList Liste des thèmes
     * @param cardList Liste des cartes
     */
    function normalize(themeList:Theme[], cardList:Card[]){
        
        themeList.forEach(theme => {
            themes[theme.id] = theme
        })
        cardList.forEach(card => {
            cards[card.id] = card
        })
    }

    /**Sauvegarde les données de l'application*/
    function save(){

        let data: DataApp = {
            cards: [],
            themes: []
        };

        Object.values(themes).forEach(val => {
            data.themes.push(val as Theme)
        });
        
        Object.values(cards).forEach(val => {
            data.cards.push(val as Card)
        });

        localStorage.setItem("data", JSON.stringify(data))

        console.log("Les données on été sauvegardé : " , data);
    }

    /**Initialisation de la "base de donnée" */
    function init() {

        //Si les données n'existe pas dans le local storage les stocker
        if (localStorage.getItem("data") == null) {

            localStorage.setItem("data", JSON.stringify(json))
            normalize(json.themes as Theme[], json.cards)
            
        } else {
            let tmpJson = JSON.parse(localStorage.getItem("data") || "")
            console.log(tmpJson);
            normalize(tmpJson.themes as Theme[], tmpJson.cards)
        }

        console.log(themes);
        console.log(cards);
    }

    /**Supprime définitivement les données de l'application */
    function clearData() {
        localStorage.clear()
        
        themes = {}
        cards = {}
    }

    /**Retourne le nombre de thème dans l'application */
    function getThemeCount() { return Object.keys(themes).length }

    /**Retourne le nombre de carte dans l'application */
    function getCardCount() { return Object.keys(cards).length }

    return { themes, cards, save, init, clearData, getCardCount, getThemeCount }
})