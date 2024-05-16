<template>
  <div class="pokemon-store">
    <h2 class="text-danger">Tienda Pokémon</h2>
    <div v-for="(item, index) in items" :key="index" class="pokemon-item">
      <h3>{{ item.name }}</h3>
      <img :src="getImagePath(item.name)" alt="imagen de {{ item.name }}" style="max-width: 100px;">
      <p class="text-danger">Cantidad: {{ item.quantity }}</p>
      <div class="quantity-selector d-flex justify-content-between align-items-center">
        <button class="btn btn-danger" @click="decrementQuantity(index)">-</button>
        <input type="number" v-model.number="item.selectedQuantity" min="0" :max="item.quantity" class="form-control" style="width: 50px;">
        <button class="btn btn-danger" @click="incrementQuantity(index)">+</button>
      </div>
      <br>
      <button class="btn btn-danger" @click="buyItem(index)">Comprar</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: Array,
    comprasHechas: Function
  },
  methods: {
    buyItem(index) {
      const item = this.items[index];
      if (item.selectedQuantity > 0) {
        item.quantity -= item.selectedQuantity;
        this.comprasHechas({ ...item, quantity: item.selectedQuantity });
        item.selectedQuantity = 0; // Reset selectedQuantity after purchase
        alert(`¡Has comprado ${item.name}!`);
      } else {
        alert(`Selecciona una cantidad válida para ${item.name} antes de comprar.`);
      }
    },
    incrementQuantity(index) {
      const item = this.items[index];
      if (item.selectedQuantity < item.quantity) {
        item.selectedQuantity++;
      } else {
        alert(`No puedes seleccionar más unidades de ${item.name}.`);
      }
    },
    decrementQuantity(index) {
      const item = this.items[index];
      if (item.selectedQuantity > 0) {
        item.selectedQuantity--;
      }
    },
    getImagePath(name) {
      return require(`@/assets/${name.toLowerCase()}.png`);
    }
  }
};
</script>

<style scoped>
.pokemon-store {
  text-align: center;
}

.pokemon-item {
  border: 1px solid #dc3545; /* Cambiar el color del borde a rojo */
  padding: 10px;
  margin: 10px;
  display: inline-block;
  width: 220px;
}

.quantity-selector button {
  margin: 0 5px;
}
</style>
