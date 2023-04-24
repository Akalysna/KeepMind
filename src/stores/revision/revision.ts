import { defineStore } from "pinia";
import { useAllStore } from '../all';
import json from './revision.json'

export const useRevisionStore = defineStore('revision', () => {

    const storeAll = useAllStore()
    const localStorageKey = storeAll.appPrefixName + "revision"
    let revision = {}

    function init(){
        revision = storeAll.init(localStorageKey, json)
    }

    function save(){
        storeAll.save(localStorageKey, revision)
    }

    function getSize(){
        return Object.keys(revision).length 
    }
    
    return { init, save, getSize }
})