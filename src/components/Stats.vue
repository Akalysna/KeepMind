<script setup lang="ts">

defineProps({
    number: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
})
</script>

<template>
    <div class="stat">
        <p class="number">{{ number }}</p>
        <p class="name">{{ name }}</p>
    </div>
</template>

<style scoped lang="scss">
.stat {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    justify-content: end;

    padding: 1em;

    p{
        color: white;
        font-family: Barlow-Regular;
        font-size: 1.2em;
    }
    .number{
        font-weight: bold;
        font-size: 1.4em;
        font-family: Barlow-SemiBold;
     }
} 
</style>