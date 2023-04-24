<script setup lang="ts">
import { useCardStore } from '../stores/card/card';
import { CardFace } from '../model/interface'
import { PropType } from 'vue';
import { ref } from 'vue'

const storeCard = useCardStore()
const props = defineProps({
    id: { type:Number, required: true },
    idTheme: { type:Number, required: true },
    recto: { type: Object as PropType<CardFace>, required: true },
    verso: { type: Object as PropType<CardFace>, required: true },
    edit: { type: Boolean, required: true },
    showVerso: { type: Boolean, default:true },

})

let showEdit = ref(false)

/**Masque ou non les boutons d'option de la carte */
function show(){ showEdit.value = !showEdit.value }

/**Supression de la carte */
function deleteCard(){
    storeCard.deleteCard(props.id, props.idTheme)
}
</script>

<template>
    <div class="card" v-on:click="show()">
        <div class="card-top">
            <p>{{ recto.data }}</p>
        </div>
        <div v-show="showVerso" class="card-bottom">
            <p>{{ verso.data }}</p>
        </div>
        <div v-show="edit && showEdit" class="card-edit">
            <button v-on:click="deleteCard()">Supprimer</button>
            <button>Modifier</button>  
        </div>
    </div>
</template>

<style scoped lang="scss">
.card {
    display: flex;
    flex-direction: column;

    background: #FFFFFF;
    box-shadow: 2px 4px 4px rgba(174, 174, 174, 0.25);
    border-radius: 8px;

    p{
        font-size: 1.2em;
        font-family: Barlow-Medium;
    }

    &-top,
    &-bottom {
        display: flex;
        padding: 1em;
    }

    &-top {
        padding-left: 1.4em;
        p{
            color: #000;
        }
        border-bottom: 1px solid #D9D9D9;
    }

    &-bottom{

        p{
            color: #636363;
            display: flex;
            align-items: center;
            &::before{
                content: url("../assets/corner-down-right.svg");
                position: relative;
                bottom: 0;
                margin-right: 0.5em;
            }
        }
    }

    &-edit{
        background-color: #D9D9D9;
        display: flex;
        justify-content: space-between;

        button{
            font-size: 1.4em;
            padding: 0.8em;
            width: 100%;
            border: none;
            background-color: transparent;
            font-family: "Barlow-Medium";
            border-top: 1px solid #000;
            border-bottom-left-radius: 8px;
            border-bottom-right-radius: 8px;
        }
    }

    p {
        width: 100%;
        overflow-wrap: break-word;
    }
}
</style>