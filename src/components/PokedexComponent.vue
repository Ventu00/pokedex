<template>
  <div>
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-danger">
      <div class="container">
        <a class="navbar-brand" href="#">Pokédex</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <a class="nav-link" href="#">Home</a>
            </li>
          </ul>
          <ul class="navbar-nav">
            <li class="nav-item">
              <a href="#" class="nav-link" @click="toggleView('favorites')">Favorites</a> <!-- Enlace a la página de favoritos -->
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <!-- Fin Navbar -->

    <div v-if="currentView === 'list'">
      <h1 class="text-danger mt-4">Pokémon List</h1>
      <div class="container">
        <div class="row">
          <div v-for="pokemon in pokemonList" :key="pokemon.id" class="col-lg-3 col-md-4 col-sm-6 mb-4">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">#{{ pokemon.id }} - {{ pokemon.name }}</h5>
                <img :src="pokemon.imageUrl" :alt="pokemon.name" class="card-img-top">
                <p class="card-text">
                  <b>Types:</b>
                  <!-- Utiliza la clase de Bootstrap 'text-dark' -->
                  <span v-for="(type, index) in pokemon.types" :key="index" class="badge badge-primary text-dark">{{ type }}</span>
                </p>
                <button @click="addToFavorites(pokemon)" class="btn btn-outline-secondary">Add to Favorites</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <favoritos-pokemons v-else-if="currentView === 'favorites'" :favorites="favorites"></favoritos-pokemons>
  </div>
</template>

<script>
import FavoritosPokemons from './favoritos-pokemons.vue';

export default {
  components: {
    FavoritosPokemons
  },
  data() {
    return {
      pokemonList: [],
      favorites: [], // Nueva propiedad para almacenar los favoritos
      currentView: 'list' // Estado actual del componente
    };
  },
  methods: {
    addToFavorites(pokemon) {
      // Agregar el Pokémon a la lista de favoritos
      this.favorites.push(pokemon);
    },
    toggleView(view) {
      this.currentView = view;
    }
  },
  mounted() {
  fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
    .then(response => response.json())
    .then(data => {
      console.log("Data received from PokeAPI:", data); // Verifica que los datos se estén recibiendo correctamente
      const promises = data.results.map(pokemon => {
        return fetch(pokemon.url)
          .then(response => response.json())
          .then(pokeData => {
            console.log("Pokemon data received:", pokeData); // Verifica que los datos de cada Pokémon se estén recibiendo correctamente
            return {
              id: pokeData.id,
              name: pokeData.name,
              types: pokeData.types.map(type => type.type.name),
              imageUrl: pokeData.sprites.front_default
            };
          });
      });
      return Promise.all(promises);
    })
    .then(pokemonList => {
      console.log("Pokemon list:", pokemonList); // Verifica que la lista de Pokémon esté completa y correctamente estructurada
      this.pokemonList = pokemonList;
    })
    .catch(err => console.log("Error fetching data from PokeAPI: " + err.message));
}

};
</script>

<style scoped>
/* Estilos existentes */
</style>
