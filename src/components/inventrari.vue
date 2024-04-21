<template>
    <div class="inventory">
      <div v-for="(item, index) in items" :key="index" class="inventory-item">
        <p>{{ item.name }}: {{ item.quantity }}</p>
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
      buyItem(item) {
        // Comunica a la botiga que es vol comprar un objecte
        this.$emit('buy', item);
      }
    }
  };
  </script>
  
  <style scoped>
  /* Afegiu els estils necessaris per al component aquí */
  .inventory {
    /* Estils per a la disposició i aparença de l'inventari */
  }
  .inventory-item {
    /* Estils per a la disposició i aparença de cada element de l'inventari */
  }
  </style>
  