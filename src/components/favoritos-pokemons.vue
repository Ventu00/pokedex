<!-- FavoritosPokemons.vue -->
<template>
  <div>
    <h1>Favorite Pokémon</h1>
    <ul>
      <li v-for="pokemon in favorites" :key="pokemon.id">{{ pokemon.name }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    favorites: {
      type: Array,
      default: () => []
    }
  }
};
</script>

<style scoped>
/* Estilos existentes */
</style>
