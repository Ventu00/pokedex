// InventrariPokemon.vue
<template>
  <div class="inventory">
    <h2>Inventario Pokémon</h2>
    <div class="item" v-for="item in inventory" :key="item.id">
      <p class="item-name">{{ item.name }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['inventory']
};
</script>

<style scoped>
/* Estilos del componente */
</style>
