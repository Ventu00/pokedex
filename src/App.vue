<template>
  <div id="app">
    <h1>aaaaa</h1>
    <PokedexComponent></PokedexComponent> 
  </div>
</template>

<script>
import PokedexComponent from './components/PokedexComponent.vue';

export default {
  name: 'App',
  components: {
    PokedexComponent
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
