<template>
  <div>
    <h1>Favorite Pokémon</h1>
    <div class="container">
      <div class="row">
        <div v-for="pokemon in favorites" :key="pokemon.id" class="col-lg-3 col-md-4 col-sm-6 mb-4">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">#{{ pokemon.id }} - {{ pokemon.name }}</h5>
              <img :src="pokemon.imageUrl" :alt="pokemon.name" class="card-img-top">
              <p class="card-text">
                <b>Types:</b>
                <span v-for="(type, index) in pokemon.types" :key="index" class="badge badge-primary text-dark">{{ type }}</span>
              </p>
              <button @click="toggleFavorite(pokemon)" class="btn btn-outline-secondary">{{ isOnFav(pokemon) ? 'Remove from favorites' : 'Add to favorites' }}</button>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    favorites: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    isOnFav(pokemon) {
      return this.favorites.some(fav => fav.id ===  pokemon.id);
    },
    toggleFavorite(pokemon) {
      if (this.isOnFav(pokemon)) {
        this.$emit('remove-from-favorites', pokemon);
      } else {
        this.$emit('add-to-favorites', pokemon);
      }
    },
    removeFromFavorites(pokemon) {
      this.$emit('remove-from-favorites', pokemon); // Emitir evento para eliminar el Pokémon de la lista de favoritos
    }
  }
};
</script>


<style scoped>
/* Estilos existentes */
</style>
