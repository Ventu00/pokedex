<template>
    <div class="object">
      <img :src="icon" alt="icon">
      <p>{{ name }}</p>
      <p>Quantitat: {{ quantity }}</p>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      icon: String, // La ruta de la icona de l'objecte
      name: String, // El nom de l'objecte
      quantity: Number // La quantitat de l'objecte
    }
  };
  </script>
  
  <style scoped>
  /* Afegiu els estils necessaris per al component aquí */
  .object {
    /* Estils per a la disposició i aparença de l'objecte */
  }
  </style>
  