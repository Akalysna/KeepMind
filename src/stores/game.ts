import { useThemeStore } from './theme';
import { defineStore } from "pinia";
import { Theme } from '../model/interface';

export const useGameStore = defineStore('game', () => {

    // Récupérer les cartes à réviser pour la date du jour
    // Commencé par les niveaux les plus élevé
    // Quand le niveau est vide passé au suivant sauf pour le niveau in qui doit ce vidé entièrement

    /**Permet de connaitre les niveaux à révisé selon le nombre de jours */
    const daySpace = {
        1: { start: 1, gap: 1 },
        2: { start: 1, gap: 2 },
        3: { start: 2, gap: 4 },
        4: [4, 13, 20, 29, 36, 45, 52, 61],
        5: [12, 28, 44, 60],
        6: [24, 59],
        7: [56],
    }

    /**Retourne les niveau à réviser du jour */
    function getTodayLevel() {

        /**Nombre de jour depuis la première révision */
        const days = getDayDiff()

        /**Niveau à réviser */
        const revisionLevels: number[] = []

        //Bouclé sur le nombre de niveau max autorisé par le thème
        for (let i = 1; i <= theme.max_level; i++) {

            //Pattern irrégulier
            if (i > 3)
                if (daySpace[i].includes(days))
                    revisionLevels.push(i)

                //Pattern régulier
                else
                    if ((days - daySpace[i].start) % daySpace[i].gap == 0)
                        revisionLevels.push(i)
        }

        return revisionLevels
    }


    /**Retourne le nombre de jour entre le début des révisions et la date du jour */
    function getDayDiff() {
        const firstRevision = Date.parse(theme.first_revision)
        const today = Date.parse(new Date().toString())

        const diffTime = Math.abs(today - firstRevision);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        console.log({ diffDays });

        return diffDays
    }


    const themStore = useThemeStore()
    let theme: Theme;
    let nbAddCard: number;

    /**Niveaux du jour à réviser */
    let todayLevel: number[] = []

    /**
     * Initialisation de la partie
     * @param themeId Identifiant du thème
     * @param nbCard Nombre de carte à ajouter à chaque révision
     * @returns False : La partie ne peut pas être créer, le thème n'existe pas
     */
    function init(themeId: number, nbCard: number = 5) {

        //Si le theme existe
        if (themStore.contain(themeId)) {

            //Initialisation du nombre de carte a chaque révision
            nbAddCard = nbCard

            //Attribution du thème 
            theme = themStore.getTheme(themeId) || {} as Theme
        
            //Création de la pile de révision
            if (theme.first_revision == "")
                theme.cards_revision[0] = theme.cards

            //Révision du jour
            todayLevel = getTodayLevel()

            console.log(getTodayLevel());
            console.log({ theme });

            return true
            
        } else {
            return false
        }
    }

    //A ajouter lorsque le niveau 1 est entièrement terminer
    /**Ajoute de nouvelle cartes à révisé*/
    function addNewCard() {
        let length = theme.cards_revision[0].length

        //S'il reste au moins 5 cartes
        if (length >= nbAddCard)
            theme.cards_revision[1].push(...theme.cards_revision[0].splice(0, nbAddCard))
        else if (length != 0)
            theme.cards_revision[1].push(...theme.cards_revision[0].splice(0, length))
    }

    function cardAnswer(cardId: number, isCorrectAnswer: boolean) {

    }

    return { init }
})