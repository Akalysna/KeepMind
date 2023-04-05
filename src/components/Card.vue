<script setup lang="ts">
import { PropType } from 'vue';
import { CardFace } from '../model/interface'
import { ref, reactive, computed } from 'vue'
import { useCardStore } from '../stores/card';

const cardStore = useCardStore()
const props = defineProps({
    id: { type:Number, required: true },
    idTheme: { type:Number, required: true },
    recto: { type: Object as PropType<CardFace>, required: true },
    verso: { type: Object as PropType<CardFace>, required: true },
    edit: { type: Boolean, required: true },
})

let showEdit = ref(false)
function show(){
    showEdit.value = !showEdit.value
    console.log("ShowEdit : ", showEdit);
    console.log("Edit : ", props.edit);
}

function deleteCard(){
    cardStore.deleteCard(props.id, props.idTheme)
    console.log("Suppression de la carte : ", props.id);
}
</script>

<template>
    <div class="card" v-on:click="show()">
        <div class="card-top">
            <p>{{ recto.data }}</p>
        </div>
        <div class="card-bottom">
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

    p {
        // word-wrap: break-word;
        width: 100%;
        overflow-wrap: break-word;
    }
}
</style>