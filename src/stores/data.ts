import { defineStore } from "pinia";
import json from './data/KeepMind.json'
import { Card, DataApp, Theme } from "../model/interface";

export const useDataStore = defineStore('data', () => {
 
    let data:DataApp = {
        cards: [],
        themes: []
    };

    function getNumTheme(){
        return data.themes.length
    }
    function getNumCard(){
        return data.cards.length
    }

    function getData(){
        return data
    }

    function clearData(){
        localStorage.clear()
        data = {
        cards: [],
        themes: []
    };
    }

    /**Initialisation de la "base de donnée" */
    function initStorage() {

        //Si les données existe dans le local storage les utilisés
        if (localStorage.getItem("data") == null) {
            data = json
            localStorage.setItem("data", JSON.stringify(json))
        } else {
            data = JSON.parse(localStorage.getItem("data") || "")
        }

        console.log("Base de données courant : ", data);
        return data
    }

    /**Mise à jour les données des thèmes de l'application */
    function updateThemeStorage(themes:Theme[]) {
        data.themes = themes
        updateData(data)
    }

    /** Mise à jour des données des cartes de l'application */
    function updateCardStorage(cards:Card[]) {
        data.cards = cards
        updateData(data)
    }

    /** Mise à jour de la base de données */
    function updateData(data:DataApp) {
        localStorage.setItem("data", JSON.stringify(data))
        return true
    }

    return { getData, initStorage, updateCardStorage, updateThemeStorage, clearData, getNumCard, getNumTheme }
})