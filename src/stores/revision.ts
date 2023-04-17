import { defineStore } from "pinia";
import { useThemeStore } from "./theme";
import { useDataStore } from "./data";
import { Theme } from "../model/interface";

export const useRevisionStore = defineStore('revision', ()=> {

    const dataStore = useDataStore();
    const themeStore = useThemeStore()

    const daySpace = {
        1: { start: 1, gap: 1 },
        2: { start: 1, gap: 2 },
        3: { start: 2, gap: 4 },
        4: [4, 13, 20, 29, 36, 45, 52, 61],
        5: [12, 28, 44, 60],
        6: [24, 59],
        7: [56],
    }

    /**Sauvegarde des données */
    function saveData(){
        dataStore.updateThemeStorage(themeStore.getThemes())
    }
    
    /**
     * Ajoute des cartes de révision au thème en fonction 
     * du nombre de carte défini par l'utilisateur
     * @param themeId Identifiant du thème
     */
    function addRevisionCard(themeId: number, nbCard: number = 1) {

        let theme: Theme | undefined;

        if (theme = themeStore.getTheme(themeId)) {

            let length = theme.cards_revision[0].length

            //S'il reste au moins 5 cartes
            if (length >= nbCard)
                theme.cards_revision[1].push(...theme.cards_revision[0].splice(0, nbCard))
            else if (length != 0)
                theme.cards_revision[1].push(...theme.cards_revision[0].splice(0, length))

            // Mise à jour de la dernière révision
            theme.last_revision = new Date().toString()
            saveData()
        }
    }

    /**
     * Retourne les cartes d'un niveau du thème 
     * @param themeId Identifiant du thème
     * @param level Niveau à récupérer
     * @returns Liste des cartes du niveau
     */
    function getCard(themeId: number, level: number) {
        let theme: Theme | undefined;
        return (theme = themeStore.getTheme(themeId)) ? theme?.cards_revision[level] : []
    }

    /**
     * Met à jour la position de la carte. Si l'utilisateur a une bonne reponse la carte passe au niveau suivant. Sinon elle retourne au niveau 1
     * @param cardId Identifiant de la carte
     * @param isCorrectAnswer true : La réponse est la bonne
     */
    function cardAnswer(themeId: number, cardId: number, isCorrectAnswer: boolean) {

        let theme: Theme | undefined;

        if (theme = themeStore.getTheme(themeId)) {

            /**Niveau de la carte*/
            let levelIndex = theme.cards_revision.findIndex(obj => obj.includes(cardId))
            
            if (levelIndex == -1) {
                //Erreur
            }

            /**Index de la carte dans le niveau */
            let cardIndex = theme.cards_revision[levelIndex].indexOf(cardId)

            //Suppression de la carte de son niveau
            theme.cards_revision[levelIndex].splice(cardIndex, 1)

            //Passage de la carte au niveau supperieur si correct sinon retour au niveau 1
            if (isCorrectAnswer) {
                //Ajouter la carte dans le niveau suivant si elle existe
                if (levelIndex < 7) {
                    theme.cards_revision[levelIndex + 1].push(cardId)
                }
            }

            else
                theme.cards_revision[1].push(cardId)

                saveData()
        }
    }

    /**Vérifie s'il y a des cartes à réviser */
    function cardForToday(themeId:number, levels:number[]){

        let haveCards = true

        levels.forEach(level => {
            let cards = getCard(themeId, level)
            haveCards ||= cards.length <= 0
        })

        return haveCards
    }

    

    return {addRevisionCard, getCard, cardAnswer, cardForToday, daySpace}
})