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

    function get(id:number){
        return revision[id]
    }

    function contain(id:number){ return revision[id] ? true : false }
    
    return { init, save, getSize, get, contain }
})