import { defineStore } from "pinia";
import { useDataStore } from "./data";

export const useThemeStore = defineStore('theme', ()=> {

    /**Récupération des thèmes de l'appli */
    const dataStore = useDataStore();
    const themes = dataStore.themes

    /**Sauvegarde des données de l'application */
    function save(){
        dataStore.save()
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
    function getTheme(id:number){ return themes[id] }

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