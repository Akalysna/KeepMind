import { defineStore } from "pinia";
import { useThemeStore } from "./theme";
import { useDataStore } from "./data";
import { Theme } from "../model/interface";

export const useRevisionStore = defineStore('revision', () => {

    const storeData = useDataStore();
    const storeTheme = useThemeStore()

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
    function saveData() {
        storeData.save()
    }

    /**
     * Ajoute des cartes de révision au thème en fonction 
     * du nombre de carte défini par l'utilisateur
     * @param themeId Identifiant du thème
     */
    function addRevisionCard(themeId: number, nbCard: number = 1) {

        let theme: Theme | undefined;

        //Vérifi si le theme existe
        if (theme = storeTheme.getTheme(themeId)) {

            let length = theme.cards_revision[0].length
            console.log({nbCard});

            //S'il reste au moins X cartes
            // if (length >= nbCard){
               // theme.cards_revision[1].push(...theme.cards_revision[0].splice(0, nbCard))
               // theme.cards_revision[1] = theme.cards_revision[1].concat(theme.cards_revision[0].splice(0, nbCard  + 1))
               for(let tmp = 0; tmp < nbCard; tmp++) {
                    theme.cards_revision[1].push(theme.cards_revision[0].shift() ?? 0)
               } 
            // }
            // else if (length != 0)
            //     theme.cards_revision[1].push(...theme.cards_revision[0].splice(0, length))

                console.log("Theme niveau 1 : ", theme.cards_revision[1]);
            // Mise à jour de la dernière révision
            theme.last_revision = new Date().toString()
            saveData()

        } else {
            console.log("error");
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
        return (theme = storeTheme.getTheme(themeId)) ? theme?.cards_revision[level] : []
    }

    /**
     * Met à jour la position de la carte. Si l'utilisateur a une bonne reponse la carte passe au niveau suivant. Sinon elle retourne au niveau 1
     * @param cardId Identifiant de la carte
     * @param isCorrectAnswer true : La réponse est la bonne
     */
    function cardAnswer(themeId: number, cardId: number, level: number, isCorrectAnswer: boolean) {

        let theme: Theme | undefined;

        if (theme = storeTheme.getTheme(themeId)) {
            
            /**Index de la carte dans le niveau */
            let cardIndex = theme.cards_revision[level].indexOf(cardId)

            console.log(theme.cards_revision[level]);
            console.log("Remove Card. Level : " + level + ", cardIndex : " + cardIndex);
            //Suppression de la carte de son niveau
            theme.cards_revision[level].splice(cardIndex, 1)

            //Passage de la carte au niveau supperieur si correct sinon retour au niveau 1
            if (isCorrectAnswer) {
                //Ajouter la carte dans le niveau suivant si elle existe
                if (level < 7) {
                    theme.cards_revision[level + 1].push(cardId)
                }
            }

            else
                theme.cards_revision[1].push(cardId)

            saveData()

        } else 
        console.log("Error");
    }

    /**Vérifie s'il y a des cartes à réviser */
    function cardForToday(themeId: number, levels: number[]) {

        let haveCards = true

        levels.forEach(level => {
            let cards = getCard(themeId, level)
            haveCards ||= cards.length <= 0
        })

        return haveCards
    }

    /**Retourne le nombre de jour entre la date passé en paramètre et la date du jour */
    function getDayDiffWithToday(date: string) {
        const startDate = Date.parse(date)
        const today = Date.parse(new Date().toString())

        const diffTime = Math.abs(today - startDate);
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }

    /**Retourne les niveau à réviser du jour */
    function getTodayLevel(theme: Theme) {

        /**Nombre de jour depuis la première révision */
        const days = getDayDiffWithToday(theme.first_revision)

        /**Niveau à réviser */
        const revisionLevels: number[] = []

        //Bouclé sur le nombre de niveau max autorisé par le thème
        for (let i = 1; i <= theme.max_level; i++) {

            //Pattern irrégulier
            if (i > 3) {
                if (daySpace[i].includes(days))
                    revisionLevels.push(i)
            }

            //Pattern régulier
            else {
                if ((days - daySpace[i].start) % daySpace[i].gap == 0)
                    revisionLevels.push(i)
            }
        }

        return revisionLevels
    }



    return { addRevisionCard, getCard, cardAnswer, cardForToday, daySpace, getDayDiffWithToday, getTodayLevel}
})