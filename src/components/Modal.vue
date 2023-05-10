<script setup lang="ts">
</script>

<template>
    <div id="back">
        <div>
            <div id="modal">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
#back{
    background-color: rgba($color: #000000, $alpha: 0.75);
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
}
#back > div{
    width: 100%;
    height: 100%;
    position: relative;
}
#modal{
    background-color: white;
    width: 50%;
    height: 50%;  
    top: 25%;
    left: 25%;
}
</style>