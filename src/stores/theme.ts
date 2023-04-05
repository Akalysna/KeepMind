import { defineStore } from "pinia";
import { useDataStore } from "./data";

export const useThemeStore = defineStore('theme', ()=> {

    let themes = useDataStore().getData().themes

    function getTheme(id:number){ return themes.find(obj => obj.id == id) }

    function getNumberCard(id:number){
        return getTheme(id)?.cards.length
    }

    function getThemes(){
        return themes
    }

    return {getTheme, getNumberCard, getThemes}
})