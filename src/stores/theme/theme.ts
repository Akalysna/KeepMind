import { Theme } from "../../model/interface";
import { defineStore } from "pinia";
import { useAllStore } from "../all";
import json from './theme.json'
import dayjs from "dayjs";
import { useRevisionStore } from "../revision/revision";

export const useThemeStore = defineStore('theme', ()=> {

    const storeAll = useAllStore()
    const storeRevision = useRevisionStore()
    const localStorageKey = storeAll.appPrefixName + "theme"
    let themes = {}

    /**Initialisation des thèmes de l'application */
    function init(){ 
        themes = storeAll.init(localStorageKey, json)
    }

    /**Sauvegarde des données de l'application */
    function save(){ storeAll.save(localStorageKey, themes) }

    function getSize(){
        return Object.keys(themes).length 
    }

    /**Vérifie si un thème existe */
    function contain(themeId:number){ return themes[themeId] ? true : false }

    /**
     * Retourne un thèmes
     * @param id Identifiant du thème
     * @returns Theme
     */
    function get(id:number){ return themes[id] as Theme }

    /**
     * Retourne le nombre de carte que possède le thème
     * @param id Identifiant du thème
     * @returns Retourne -1 si le thème n'existe
     */
    function getCardCount(id:number){
        return get(id)?.cards.length || 0
    }

    function getThemes(){
        return themes
    }

    function getLastId(){
        let lastId = 0

        for(const key in themes) {
            if(themes[key].id > lastId)
                lastId = themes[key].id
        }

        lastId += 1
        return lastId
    }

    function createTheme(name:string, description:string, level:number){

        //Index de la futur carte
        let id = getLastId()

        //Création de la carte
        themes[id] = {
            "id": id,
            "revision_id":id,
            "name": name,
            "description": description,
            "creation_date": dayjs().toString(),
            "cards": [],
            "max_level": level
        }

        //Créer la révision de ce thème
        storeRevision.createRevision(id)

        save()
    }


    return {init,getThemes,  themes, get, getSize, getCardCount, contain, save, createTheme}
})