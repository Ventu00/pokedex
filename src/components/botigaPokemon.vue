<template>
  <div class="container">
    <h2 class="mt-4 mb-3">Botiga Pokémon</h2>
    <div v-for="item in inventory" :key="item.id" class="row mb-4">
      <div class="col-md-3">
        <img :src="item.icon" :alt="item.name" class="item-icon img-fluid">
      </div>
      <div class="col-md-6 d-flex align-items-center">
        <div class="item-details">
          <p class="item-name mb-1">{{ item.name }}</p>
          <div class="quantity-selector d-flex align-items-center">
            <button @click="decreaseQuantity(item)" :disabled="item.selectedQuantity === 0" class="btn btn-sm btn-primary me-2">-</button>
            <input type="text" v-model.number="item.selectedQuantity" class="form-control form-control-sm w-25 me-2 text-center">
            <button @click="increaseQuantity(item)" :disabled="item.selectedQuantity === item.maxQuantity" class="btn btn-sm btn-primary">+</button>
          </div>
        </div>
      </div>
      <div class="col-md-3 d-flex align-items-center">
        <button @click="buyItem(item)" class="btn btn-primary">Comprar</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inventory: [
        { id: 1, name: 'Pokéball', icon: '', quantity: 10, maxQuantity: 15, selectedQuantity: 1 },
        { id: 2, name: 'Poció', icon: '', quantity: 5, maxQuantity: 5, selectedQuantity: 1 },
        { id: 3, name: 'Elixir', icon: '', quantity: 5, maxQuantity: 5, selectedQuantity: 1 }
        // Puedes agregar más elementos aquí según sea necesario
      ]
    };
  },
  methods: {
    increaseQuantity(item) {
      if (item.selectedQuantity < item.maxQuantity) {
        item.selectedQuantity++;
      }
    },
    decreaseQuantity(item) {
      if (item.selectedQuantity > 0) {
        item.selectedQuantity--;
      }
    },
    buyItem(item) {
      if (item.selectedQuantity > 0) {
        // Emitir un evento para informar al componente padre sobre la compra
        this.$emit('buyItem', item); // Cambio aquí: emitir 'buyItem' en lugar de 'buy-item'
        // Restablecer la cantidad seleccionada después de la compra
        item.selectedQuantity = 1;
      }
    }
  }
};
</script>

<style scoped>
.item-icon {
  width: 100%;
  max-width: 100px; /* Ajusta el tamaño máximo según sea necesario */
}

.item-name {
  font-weight: bold;
}

.quantity-selector input[type="text"] {
  max-width: 50px; /* Ajusta el tamaño máximo del input según sea necesario */
}
</style>

