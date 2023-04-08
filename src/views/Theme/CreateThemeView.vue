<script setup lang="ts">
</script>


<template>
    <div>

        <h1>Création de thème</h1>
        <div>
            <p>Nom du thème</p>
            <input type="text">
        </div>
        <div>
            <p>Description du thème</p>
            <textarea name="" id="" cols="30" rows="10"></textarea>
        </div>
        <div>
            <p>Niveau maximum</p>
            <select name="level" id="level-select">
                <option value="level-1">Niveau 1</option>
                <option value="level-2">Niveau 2</option>
                <option value="level-3">Niveau 3</option>
                <option value="level-4">Niveau 4</option>
                <option value="level-5">Niveau 5</option>
                <option value="level-6">Niveau 6</option>
            </select>
        </div>

        <div class="btns">
            <button>Annuler</button>
            <button>Créer</button>
        </div>


    </div>
</template>

<style scoped>
textarea{
    resize: none;
}
</style>