<template>
  <div>
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-danger">
      <div class="container">
        <a class="navbar-brand" href="">Pokédex</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <a class="nav-link" href="" @click="toggleView('list')">Home</a>
            </li>
          </ul>
          <ul class="navbar-nav">
            <li class="nav-item">
              <a href="#" class="nav-link" @click="toggleView('favorites')">Favorites</a>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link" @click="toggleView('equip')">Equip</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <!-- Fin Navbar -->

    <ListPokemon 
      v-if="currentView === 'list'" 
      :pokemonList="pokemonList" 
      :favorites="favorites" 
      :team="team" 
      @add-to-favorites="addToFavorites" 
      @add-to-team="addToTeam"
      @remove-from-team="removeFromTeam"
    ></ListPokemon>
    <FavoritosPokemons v-else-if="currentView === 'favorites'" :favorites="favorites" @remove-from-favorites="removeFromFavorites"></FavoritosPokemons>
    <EquipPokemon v-else-if="currentView === 'equip'" :equip="team" @add-to-team="addToTeam" @remove-from-team="removeFromTeam"></EquipPokemon>
  </div>
</template>

<script>
import ListPokemon from './ListPokemon.vue';
import FavoritosPokemons from './favoritosPokemons.vue';
import EquipPokemon from './equipPokemon.vue';

export default {
  components: {
    ListPokemon,
    FavoritosPokemons,
    EquipPokemon
  },
  data() {
    return {
      pokemonList: [],
      favorites: [],
      team: [],
      currentView: 'list'
    };
  },
  methods: {
    addToFavorites(pokemon) {
      if (!this.favorites.some(fav => fav.id === pokemon.id)) {
        this.favorites.push(pokemon);
      }
    },
    removeFromFavorites(pokemon) {
      this.favorites = this.favorites.filter(fav => fav.id !== pokemon.id);
    },
    toggleView(view) {
      this.currentView = view;
    },
    addToTeam(pokemon) {
      if (this.team.length < 6 && !this.isOnTeam(pokemon)) {
        this.team.push(pokemon);
      }
    },
    removeFromTeam(pokemon) {
      this.team = this.team.filter(member => member.id !== pokemon.id);
    },
    isOnTeam(pokemon) {
      return this.team.some(member => member.id === pokemon.id);
    }
  },
  mounted() {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
      .then(response => response.json())
      .then(data => {
        const promises = data.results.map(pokemon => {
          return fetch(pokemon.url)
            .then(response => response.json())
            .then(pokeData => {
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
        this.pokemonList = pokemonList;
      })
      .catch(err => console.log("Error fetching data from PokeAPI: " + err.message));
  }
};
</script>

<style scoped>
/* Estilos existentes */
</style>
