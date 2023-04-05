<script setup>
import IconArrowLeft from './icons/IconArrowLeft.vue';
import IconPencil from './icons/IconPencil.vue'
import IconTrash from './icons/IconTrash.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const props = defineProps({
    
    topBarName: { type: String, default:"Keep Mind" },
    showSetting: { type: Boolean, default: false },
    path: { type: String },
    back: { type: Number },
})

function goTo() {
    if (props.path)
        router.push({ path: props.path })
    else
        router.go(props.back)
}

</script>

<template>
    <header>
        <div class="left">
            <button v-on:click="goTo()">
                <IconArrowLeft />
            </button>
            <p>{{topBarName}}</p>
        </div>
        <div v-show="showSetting" class="right">
            <button>
                <IconPencil />
            </button>
            <button>
                <IconTrash />
            </button>
        </div>
    </header>
</template>

<style lang="scss" scoped>

header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: sticky;
    top: 0;
    background-color: #f5f5f5;
    z-index: 5;

    padding: 1em 1.5em;

    .left, .right {
        display: flex;
        align-items: center;
    }

    .left{
        gap: 0.5em;
    }

    .right {
        gap: 0.8em;
    }
}

p {
    font-family: 'Barlow-Regular';
    font-size: 1.5em;
}

button {
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    background-color: transparent;
    height: 3em;
    width: 3em;
    padding: 0;

    svg {
        height: 2em;
        width: 2em;
    }
}</style>