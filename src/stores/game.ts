import { useThemeStore } from './theme';
import { defineStore } from "pinia";
import { Theme } from '../model/interface';
import { useDataStore } from './data';

export const useGameStore = defineStore('game', () => {

    const themeStore = useThemeStore()


    return { }
})