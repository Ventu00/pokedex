<template>
  <div class="pokemon-inventory">
    <h2>Inventario Pokémon</h2>
    <div v-if="inventory.length === 0">
      <p>No has comprado ningún elemento aún.</p>
    </div>
    <div v-else>
      <div v-for="(item, index) in inventory" :key="index" class="pokemon-item">
        <h3>{{ item.name }}</h3>
        <img :src="getImagePath(item.name)" alt="imagen de {{ item.name }}" style="max-width: 100px;">
        <p>Cantidad: {{ item.quantity }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    inventory: {
      type: Array,
      default: () => [
        
      ]
    }
  },
  methods: {
    getImagePath(name) {
      return require(`@/assets/${name.toLowerCase()}.png`);
    }
  }
};
</script>

<style scoped>
.pokemon-inventory {
  text-align: center;
}

.pokemon-item {
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px;
  display: inline-block;
}
</style>
