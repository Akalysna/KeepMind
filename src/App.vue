<script setup>
import { RouterView } from 'vue-router'
import { useThemeStore } from './stores/theme/theme';
import { useCardStore } from './stores/card/card';
import { useRevisionStore } from './stores/revision/revision';

const storeTheme = useThemeStore()
const storeCard = useCardStore()
const storeRevision = useRevisionStore()

//Initialisation de la base de données
storeTheme.init()
storeCard.init()
storeRevision.init()

</script>

<template>
  <RouterView />
</template>

<style lang="scss">
.btn {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px 33px;
  gap: 10px;
  background: #171717;
  border-radius: 8px;
  color: #F5F5F5;
  font-family: 'Barlow-Regular';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

* {
  font-family: Barlow-Regular;
}

.core {
  flex-grow: 1;
  margin: 0 1.5em;
}

h1 {
  font-family: Barlow-SemiBold;
  text-transform: uppercase;
  font-size: 1.6em;
}

$dark :#171717;

@mixin font($name, $ext: "ttf") {
  @font-face {
    font-family: $name;
    src: url(./assets/font/Barlow/#{$name}.#{$ext});
  }
}

@include font("Barlow-Black");
@include font("Barlow-Bold");
@include font("Barlow-Italic");
@include font("Barlow-Light");
@include font("Barlow-Medium");
@include font("Barlow-Regular");
@include font("Barlow-SemiBold");
@include font("Barlow-Thin");

#app {
  padding: 0;
}
</style>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
