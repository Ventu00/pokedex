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
      icon: String, 
      name: String, 
      quantity: Number 
    }
  };
  </script>
  
  <style scoped>
  .object {
  }
  </style>
  