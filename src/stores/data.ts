import { defineStore } from "pinia";
import json from './data/KeepMind.json'
import { Card, DataApp, Theme } from "../model/interface";

export const useDataStore = defineStore('data', () => {

    let data: DataApp = {
        cards: [],
        themes: []
    };

    /**Initialisation de la "base de donnée" */
    function init() {

        //Si les données existe dans le local storage les utilisés
        if (localStorage.getItem("data") == null) {
            data = json
            localStorage.setItem("data", JSON.stringify(json))
        } else {
            data = JSON.parse(localStorage.getItem("data") || "")
        }

        console.log("Données de la BDD : ", data);
    }

    /**Retourne les données de l'application. Initialement présent dans le json */
    function getData() { return data }

    /**Supprime définitivement les données de l'application */
    function clearData() {
        localStorage.clear()
        data = {
            cards: [],
            themes: []
        };
    }


    /**
     * Met à jour les données des thèmes de l'application 
     * @param themes Tableau des thèmes de l'application à "sauvegarder"
     */
    function updateThemeStorage(themes: Theme[]) {
        data.themes = themes
        updateData(data)
    }

    /**
     * Met à jour les données des cartes de l'application
     * @param cards Tableau des cartes de l'application à "sauvegarder"
     */
    function updateCardStorage(cards: Card[]) {
        data.cards = cards
        updateData(data)
    }

    /** Met à jour les données de l'application */
    function updateData(data: DataApp) {
        localStorage.setItem("data", JSON.stringify(data))
        return true
    }


    /**Retourne le nombre de thème dans l'application */
    function getThemeCount() { return data.themes.length }

    /**Retourne le nombre de carte dans l'application */
    function getCardCount() { return data.cards.length }

    return { init, getData, clearData, updateCardStorage, updateThemeStorage, getCardCount, getThemeCount }
})