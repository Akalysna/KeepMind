import { defineStore } from "pinia";

export const useAllStore = defineStore('all', () => {

    const appPrefixName = "KeepMind_0905_"

    /**
     * Normalize les données de l'application
     * @param themeList Liste des thèmes
     * @param cardList Liste des cartes
     */
    function normalize(list:any[]){

        let object = {}
        
        list.forEach(obj => {
            object[obj.id] = obj
        })
        
        return object
    }

    /**Sauvegarde les données de l'application*/
    function save(localStorageKey:string, object:{}){

        let data:any[] = []

        Object.values(object).forEach(val => {
            data.push(val as any)
        });
        
        localStorage.setItem(localStorageKey, JSON.stringify(data))
        console.log("Les données on été sauvegardé : " , data);
    }

    /**Initialisation de la "base de donnée" */
    function init(localStorageKey:string, json:any) {

        //Si les données n'existe pas dans le local storage les stocker
        if (localStorage.getItem(localStorageKey) == null) {

            localStorage.setItem(localStorageKey, JSON.stringify(json))
            return normalize(json)
            
        } else {

            let tmpJson = JSON.parse(localStorage.getItem(localStorageKey) || "")
            return normalize(tmpJson)
        }
    }

    /**Supprime définitivement les données de l'application */
    function clearLocalStorage() {
        localStorage.clear()
    }

    function removeItem(localStorageKey:string){
        localStorage.removeItem(localStorageKey)
    }

    function showData(localStorageKey:string){
        let data = JSON.parse(localStorage.getItem(localStorageKey) ?? "")
        console.log("Les données on été sauvegardé : " , data);
    }

    return { save, init, clearLocalStorage, removeItem, showData, appPrefixName }
})