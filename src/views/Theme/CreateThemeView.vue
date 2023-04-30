<script setup lang="ts">
import TopBar from '../../components/TopBar.vue';
import router from '../../router';
import { useThemeStore } from '../../stores/theme/theme';
import { Ref, ref } from 'vue'

const storeTheme = useThemeStore()

let options = [1,2,3,4,5,6,7]
let optionVal = ""

let name = ref("")
let description = ref("")
let level = ref("")

function createTheme(){

    let lvl = optionVal != "" ? Number(optionVal) : 0

    console.log(lvl);
    console.log(name.value);
    console.log(description.value);

    if(lvl != 0 && name.value != "" && description.value != ""){
        storeTheme.createTheme(name.value, description.value, lvl)
        reset()
        exit()

    } else {
        //Alerte
        //Modifier la couleur de bordure des champs
        console.log("Echec");
    }

}

function reset(){
    name.value = ""
        description.value = ""
        level.value = ""
}

function exit(){
    router.push("/")
}

</script>


<template>
    <TopBar :show-setting="false" path="/" />

    <div class="core">

        <h1>Création de thème</h1>

        <div class="form">

            <div class="form-name">
                <p>Nom du thème</p>
                <input type="text" v-model="name">
            </div>

            <div class="form-desc">
                <p>Description du thème</p>
                <textarea name="" id="" cols="30" rows="10" v-model="description"></textarea>
            </div>

            <div class="form-level">
                <p>Niveau maximum</p>
                <select v-model="optionVal" name="level" id="level-select">
                    <option v-for="ops in options" :value="ops" >Niveau {{ ops }}</option>
                </select>
            </div>
        </div>

       
    </div> 
    <div class="btns">
            <button class="btn" v-on:click="exit()">Annuler</button>
            <button class="btn" v-on:click="createTheme()">Créer</button>
        </div>
</template>

<style scoped lang="scss">

.form{
    display: flex;
    flex-direction: column;
    gap: 1em;
    margin-top: 2em;
}

.btns{
    padding: 0 1.5em;
    display: flex;
    justify-content: center;
    position: fixed;
    bottom: 3em;
    left: 0;
    right: 0;
    gap: 1em;

    &>.btn{
        padding: 0.7em 0;
        width: 100%;
    }

    .btn:first-child {
        background-color: transparent;
        color: #171717;
        border: #171717 2px solid;
    }
}


p {
    font-family: 'Barlow-Regular';
    font-weight: 400;
    font-size: 1.2em;
    color: #171717;
    margin-bottom: 0.5em;
}

input, textarea, select {
    background: #E8EAEC;
    box-shadow: inset 0px 1px 4px #D2D6DA;
    border-radius: 6px;
    border: none; 
    width: 100%;
    font-size: 1em;
    padding: 1em;
    resize: none;

    &:focus{
        outline: none;
    }
}

select {
    box-shadow: 2px 2px 4px rgba(85, 85, 85, 0.25);
    margin-right: 1em;
    appearance: none;
    background-image: url("../../assets/arrow.svg");
    background-repeat: no-repeat;
    background-position: right 1rem center;
    background-size: 1em;
}

</style>