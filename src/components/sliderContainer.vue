<template>
    <div class="slider-container">
      <label for="slider">Selecciona el rango de números de Pokémon:</label>
      <input type="range" id="slider" v-model="selectedRange" :min="minRange" :max="maxRange" class="form-range" @change="emitSelectedRange">
      <p>Rang seleccionat: {{ selectedRange[0] }} - {{ selectedRange[1] }}</p>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        minRange: 1,
        maxRange: 151,
        selectedRange: [1, 151]
      };
    },
    methods: {
      emitSelectedRange() {
        this.$emit('pokemon-selected', this.selectedRange);
      }
    }
  };
  </script>
  
  <style scoped>
  .slider-container {
    margin-top: 20px;
    text-align: center;
  }



  input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none; 
  appearance: none;
  width: 25px; 
  height: 25px; 
  background: url('@/assets/pokeball.png') no-repeat center center; 
  background-size: contain; 
  cursor: pointer; 
}

input[type="range"]::-moz-range-thumb {
  width: 40px; 
  height: 40px; 
  background: url('@/assets/pokeball.png') no-repeat center center; 
  background-size: contain; 
  cursor: pointer; 
}
  </style>
  