import { defineStore } from "pinia";
import { useDataStore } from "./data";
import { Theme } from "../model/interface";

export const useThemeStore = defineStore('theme', ()=> {

    /**Récupération des thèmes de l'appli */
    const storeData = useDataStore();
    const themes = storeData.themes

    /**Sauvegarde des données de l'application */
    function save(){
        storeData.save()
    }

    /**Vérifie si un thème existe */
    function contain(themeId:number){
        return themes[themeId] ? true : false
    }

    /**
     * Retourne un thèmes
     * @param id Identifiant du thème
     * @returns Theme
     */
    function getTheme(id:number){ return themes[id] as Theme }

    /**
     * Retourne le nombre de carte que possède le thème
     * @param id Identifiant du thème
     * @returns Retourne -1 si le thème n'existe
     */
    function getCardCount(id:number){
        return getTheme(id)?.cards.length || 0
    }

    /**Retourne les thèmes de l'appli */
    function getThemes(){ return themes }


    return {getTheme, getCardCount, getThemes, contain, save}
})