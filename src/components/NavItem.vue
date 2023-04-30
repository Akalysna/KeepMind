<script setup lang="ts">

const props = defineProps({
    img:{type:String, required:true}, 
    text:{type:String, required:true},
    isSelected:{type:Boolean, default:false}
})

</script>

<template>
    <div class="nav-item">
        <slot name="icon"></slot>
        <p>{{text}}</p>
    </div>
</template>

<style scoped lang="scss">

.nav-item{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: end;
    gap: 0.2em;

    .red{
        color:red;
    }

    img{
        height: 1.5em;
        width: 1.5em;
    }

    p{
        font-size: 1em;
        font-family: "Barlow-Regular";
    }
}

    
</style>