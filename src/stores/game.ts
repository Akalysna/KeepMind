import { defineStore } from "pinia";
import { useThemeStore } from "./theme/theme";
import { useRevisionStore } from "./revision/revision";
import { useCardStore } from "./card/card";
import { Revision, Theme } from "../model/interface";
import dayjs from 'dayjs'

export const useGameStore = defineStore('game', () => {

    // const storeData = useDataStore();
    const storeTheme = useThemeStore()
    const storeRevision = useRevisionStore()
    const storeCard = useCardStore()

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
    function save() {
        storeCard.save()
        storeRevision.save()
        // storeTheme.save()
    }

    function revision(id: number) {
        let theme: Theme | undefined;
        let revision: Revision | undefined
        theme = storeTheme.get(id)
        return storeRevision.get(theme.revision_id)
    }

    /**
     * Ajoute des cartes de révision au thème en fonction 
     * du nombre de carte défini par l'utilisateur.
     * Met a jour la date de la dernière révision
     * @param themeId Identifiant du thème
     */
    function addCard(revisionId: number) {

        let revision: Revision | undefined

        //Vérifi si le theme et la révision existe
        if (revision = storeRevision.get(revisionId)) {

            let length = revision.cards_revision[0].length
            let nbCard = revision.new_cards

            // S'il reste au moins X cartes
            if (length >= nbCard)
                revision.cards_revision[1].push(...revision.cards_revision[0].splice(0, nbCard))

            else
                revision.cards_revision[1].push(...revision.cards_revision[0].splice(0, length))

            save()

        } else {
            console.log("Le thème ou la révision n'existe pas");
        }
    }

    /**
     * Retourne les cartes du niveau d'un thème 
     * @param themeId Identifiant du thème
     * @param level Niveau à récupérer
     * @returns Liste des cartes du niveau
     */
    function getLevelCards(themeId: number, level: number) {

        let theme: Theme | undefined;
        let revision: Revision | undefined;

        if (storeTheme.contain(themeId)) {
            theme = storeTheme.get(themeId)

            if (storeRevision.contain(theme.revision_id)) {
                revision = storeRevision.get(theme.revision_id)
                return revision?.cards_revision[level] ?? []
            }

            return []
        }

        return []
    }

    function haveCard(themeId: number, level: number) {
        return getLevelCards(themeId, level).length !== 0
    }

    /**
     * Met à jour la position de la carte. Si l'utilisateur a une bonne reponse la carte passe au niveau suivant. Sinon elle retourne au niveau 1
     * @param cardId Identifiant de la carte
     * @param isCorrectAnswer true : La réponse est la bonne
     */
    function cardAnswer(themeId: number, cardId: number, level: number, isCorrectAnswer: boolean) {

        let theme: Theme;
        let revision: Revision;

        if (storeTheme.contain(themeId)) {
            theme = storeTheme.get(themeId)

            if (storeRevision.contain(theme.revision_id)) {

                revision = storeRevision.get(theme.revision_id) || {} as Revision

                /**Index de la carte dans le niveau */
                let cardIndex = revision.cards_revision[level].indexOf(cardId)

                //Suppression de la carte de son niveau
                revision.cards_revision[level].splice(cardIndex, 1)

                //Passage de la carte au niveau supperieur si correct sinon retour au niveau 1
                if (isCorrectAnswer) {
                    //Ajouter la carte dans le niveau suivant si elle existe
                    if (level < 7) {
                        revision.cards_revision[level + 1].push(cardId)
                    }

                } else {
                    revision.cards_revision[1].unshift(cardId)
                }

                save()
            }
        }
    }

    /**Vérifie s'il y a des cartes à réviser */
    function cardForToday(themeId: number, levels: number[]) {

        let haveCards = false

        levels.forEach(level => {
            let cards = getLevelCards(themeId, level)
            haveCards ||= cards.length >= 0
        })

        return haveCards
    }

    /**Retourne les niveau à réviser du jour */
    function getTodayLevel(themeId: number) {

        let theme: Theme;
        let revision: Revision;

        if (storeTheme.contain(themeId)) {
            theme = storeTheme.get(themeId)

            if (storeRevision.contain(theme.revision_id)) {
                revision = storeRevision.get(theme.revision_id)

                /**Nombre de jour depuis la première révision */
                const days = 13//dayjs().diff(revision.first_revision, 'day')

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

            } else {
                return []
            }
        } else {
            return []
        }
    }



    return { haveCard, addCard, getLevelCards, cardAnswer, cardForToday, daySpace, getTodayLevel }
})