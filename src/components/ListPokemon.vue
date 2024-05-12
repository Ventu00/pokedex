<template>
  <div>
    <!-- Desplegable de selecció de tipus -->
    <select v-model="selectedType" class="form-control mb-4">
      <option value="">Tots els tipus</option>
      <option v-for="type in pokemonTypes" :value="type" :key="type">{{ type }}</option>
    </select>

    <!-- Componente del Slider -->
    <PokemonSlider @pokemon-selected="filterPokemon"></PokemonSlider>

    <!-- Botons de filtratge -->
    <div class="btn-group mb-4">
      <button type="button" class="btn btn-primary" @click="showFavoritesOnly = true; showTeamOnly = false">Mostrar Preferits</button>
      <button type="button" class="btn btn-primary" @click="showFavoritesOnly = false; showTeamOnly = true">Mostrar Equip</button>
      <button type="button" class="btn btn-primary" @click="showFavoritesOnly = false; showTeamOnly = false">Mostrar Tots</button>
    </div>

    <!-- Llista de Pokémon -->
    <div v-if="filteredPokemonList.length > 0" class="container">
      <div class="row">
        <div v-for="pokemon in filteredPokemonList" :key="pokemon.id" class="col-lg-3 col-md-4 col-sm-6 mb-4">
          <!-- Card del Pokémon -->
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">#{{ pokemon.id }} - {{ pokemon.name }}</h5>
              <img :src="pokemon.imageUrl" :alt="pokemon.name" class="card-img-top">
              <p class="card-text">
                <b>Types:</b>
                <span v-for="(type, index) in pokemon.types" :key="index" class="badge badge-primary text-dark">{{ type }}</span>
              </p>
              <button @click="toggleFavorite(pokemon)" class="btn btn-outline-secondary">{{ isFavorite(pokemon) ? 'Remove from Favorites' : 'Add to Favorites' }}</button>
              <button @click="toggleTeam(pokemon)" class="btn btn-outline-secondary">{{ isOnTeam(pokemon) ? 'Remove from Team' : 'Add to Team' }}</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Missatges informatius si no hi ha Pokémon per mostrar -->
    <div v-else>
      <p v-if="showFavoritesOnly">No hi ha Pokémon preferits.</p>
      <p v-else-if="showTeamOnly">No hi ha Pokémon en l'equip.</p>
      <p v-else>No hi ha Pokémon per mostrar.</p>
    </div>
  </div>
</template>

<script>
import PokemonSlider from './sliderContainer.vue';

export default {
  components: {
    PokemonSlider
  },
  props: ['pokemonList', 'favorites', 'team'],
  data() {
    return {
      showFavoritesOnly: false,
      showTeamOnly: false,
      selectedType: '',
      pokemonTypes: [],
      selectedRange: [1, 151]
    };
  },
  computed: {
    filteredPokemonList() {
      let filteredList = this.pokemonList;

      // Filtrar por tipo si se ha seleccionado uno
      if (this.selectedType) {
        filteredList = filteredList.filter(pokemon => pokemon.types.includes(this.selectedType));
      }

      // Filtrar por rango
      filteredList = filteredList.filter(pokemon => pokemon.id >= this.selectedRange[0] && pokemon.id <= this.selectedRange[1]);

      // Aplicar otros filtros según la configuración
      if (this.showFavoritesOnly) {
        filteredList = filteredList.filter(pokemon => this.isFavorite(pokemon));
      } else if (this.showTeamOnly && this.team.length === 6 && this.team.every(member => member !== null)) {
        filteredList = filteredList.filter(pokemon => this.isOnTeam(pokemon));
      }

      return filteredList;
    }
  },
  mounted() {
    // Crear la lista de tipos de Pokémon a partir de la lista de Pokémon disponibles
    this.pokemonTypes = [...new Set(this.pokemonList.flatMap(pokemon => pokemon.types))];
  },
  methods: {
    isFavorite(pokemon) {
      return this.favorites.some(favorite => favorite.id === pokemon.id);
    },
    toggleFavorite(pokemon) {
      if (this.isFavorite(pokemon)) {
        this.$emit('remove-from-favorites', pokemon);
      } else {
        this.$emit('add-to-favorites', pokemon);
      }
    },
    isOnTeam(pokemon) {
      return this.team.some(teamMember => teamMember.id === pokemon.id);
    },
    toggleTeam(pokemon) {
      if (this.isOnTeam(pokemon)) {
        this.$emit('remove-from-team', pokemon);
      } else {
        this.$emit('add-to-team', pokemon);
      }
    },
    // Método para manejar el evento de selección de Pokémon en el slider
    filterPokemon(selectedRange) {
      this.selectedRange = selectedRange;
    }
  }
};
</script>

<style scoped>
/* Estilos aquí */
</style>
