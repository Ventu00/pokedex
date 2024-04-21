<template>
    <div class="shop">
      <div v-for="(item, index) in items" :key="index" class="shop-item">
        <p>{{ item.name }}: {{ item.quantity }}</p>
        <div class="quantity-selector">
          <button @click="decreaseQuantity(item)">-</button>
          <input type="number" v-model="item.selectedQuantity" min="0">
          <button @click="increaseQuantity(item)">+</button>
        </div>
        <button @click="buyItem(item)">Comprar</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      items: Array // La llista d'objectes disponibles amb les seves quantitats
    },
    methods: {
      increaseQuantity(item) {
        item.selectedQuantity++;
      },
      decreaseQuantity(item) {
        if (item.selectedQuantity > 0) {
          item.selectedQuantity--;
        }
      },
      buyItem(item) {
        // Comunica a l'inventari que es vol comprar un objecte amb la quantitat seleccionada
        this.$emit('buy', { item, quantity: item.selectedQuantity });
        // Reinicia la quantitat seleccionada
        item.selectedQuantity = 0;
      }
    }
  };
  </script>
  
  <style scoped>
  /* Afegiu els estils necessaris per al component aquí */
  .shop {
    /* Estils per a la disposició i aparença de la botiga */
  }
  .shop-item {
    /* Estils per a la disposició i aparença de cada element de la botiga */
  }
  .quantity-selector {
    /* Estils per a la disposició i aparença del selector de quantitat */
  }
  </style>
  