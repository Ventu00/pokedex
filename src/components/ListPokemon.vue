<template>
  <div>
    <!-- Componente del Slider -->
    <div class="centered-content">
      <div class="btn-group mb-4">
        <button type="button" class="btn btn-danger" @click="showOnlyFavorites">Mostrar Preferidos</button>
        <button type="button" class="btn btn-success" @click="showOnlyTeam">Mostrar Equipo</button>
        <button type="button" class="btn btn-primary" @click="showAll">Mostrar Todos</button>
      </div>
      <PokemonSlider @pokemon-selected="filterPokemon"></PokemonSlider>


      <div class="select-container">
        <p>Tipos:  </p>
        <select v-if="pokemonList && pokemonTypes" v-model="selectedType" class="form-control mb-4 select-limited-width">
          <option value="">Tots els tipus</option>
          <option v-for="type in pokemonTypes" :value="type" :key="type">{{ type }}</option>
        </select>
      </div>

  </div>

    <div v-if="(showFavoritesOnly && !favorites.length) || (showTeamOnly && team.length < 6)" class="alert alert-info" role="alert">
      <p v-if="showFavoritesOnly">No hay Pokémon preferidos.</p>
      <p v-else-if="showTeamOnly">No hay Pokémon en el equipo. Añade 6 Pokémon de la lista:</p>
      <p v-else>No hay Pokémon que mostrar.</p>
    </div>

 

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

  const allTypes = this.getAllPokemonTypes();

  const uniqueTypes = this.removeDuplicates(allTypes);

  // lista de tipos únicos a pokemonTypes
  this.pokemonTypes = uniqueTypes;
  },
  methods: {
    getAllPokemonTypes() {
    const allTypes = [];

    this.pokemonList.forEach(pokemon => {
      const types = pokemon.types;

      allTypes.push(...types);//... con el propagador descomongo en elmentos individuales dentro del array sino incluso me aparecen pares
    });

    return allTypes;
  },

  removeDuplicates(array) {
    // creo un conjunto con set ya que con esa estructura los datos del array no se duplican
    const uniqueSet = new Set(array);

    // hay que pasar ahora el conjunto de nuevo a un array y sacaremos todos los tipos finalmente
    const uniqueArray = Array.from(uniqueSet);

    return uniqueArray;
  },

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

.centered-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.btn-group {
  margin-top: 20px;
}


.select-container {
  width: 220px; 
  display: flex;
}
</style>