<template>
  <div>
    <!-- Componente del Slider -->
    <PokemonSlider @pokemon-selected="filterPokemon"></PokemonSlider>

    <!-- Botones de filtrado -->
    <div class="btn-group mb-4">
      <button type="button" class="btn btn-primary" @click="showOnlyFavorites">Mostrar Preferidos</button>
      <button type="button" class="btn btn-primary" @click="showOnlyTeam">Mostrar Equip</button>
      <button type="button" class="btn btn-primary" @click="showAll">Mostrar Tots</button>
    </div>

    <div v-if="(showFavoritesOnly && !favorites.length) || (showTeamOnly && !team.length)" class="alert alert-info" role="alert">
      <p v-if="showFavoritesOnly">No hay Pokémon preferidos.</p>
      <p v-else-if="showTeamOnly">No hay Pokémon en el equipo.</p>
      <p v-else>No hay Pokémon que mostrar.</p>
    </div>

    <select v-if="pokemonList && pokemonTypes" v-model="selectedType" class="form-control mb-4">
      <option value="">Tots els tipus</option>
      <option v-for="type in pokemonTypes" :value="type" :key="type">{{ type }}</option>
    </select>

    <!-- Lista de Pokémon -->
    <div v-if="filteredPokemonList.length" class="container">
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
              <button @click="toggleFavorite(pokemon)" class="btn btn-outline-secondary">{{ isOnFav(pokemon) ? 'Remove from Favorites' : 'Add to Favorites' }}</button>
              <button @click="toggleTeam(pokemon)" class="btn btn-outline-secondary">{{ isOnTeam(pokemon) ? 'Remove from Team' : 'Add to Team' }}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PokemonSlider from './sliderContainer.vue';

export default {
  components: {
    PokemonSlider
  },
  props: {
    pokemonList: Object,
    favorites: Array, 
    team: Array,
  },
  data() {
    return {
      showFavoritesOnly: false,
      showTeamOnly: false,
      selectedType: '',
      pokemonTypes: [],
      selectedRange: [1, 8]
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
        filteredList = filteredList.filter(pokemon => this.isOnFav(pokemon));
      }

      if (this.showTeamOnly && this.team.length === 6 && this.team.every(member => member !== null)) {
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
    isOnFav(pokemon) {
      return this.favorites.some(fav => fav.id === pokemon.id);
    },
    toggleFavorite(pokemon) {
      if (this.isOnFav(pokemon)) {
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
    },
    // Nuevos métodos para manejar el filtrado de Pokémon
    showOnlyFavorites() {
      this.showFavoritesOnly = true;
      this.showTeamOnly = false;
    },
    showOnlyTeam() {
      this.showFavoritesOnly = false;
      this.showTeamOnly = true;
    },
    showAll() {
      this.showFavoritesOnly = false;
      this.showTeamOnly = false;
    }
  }
};
</script>

<style scoped>
/* Estilos aquí */
</style>
