<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-danger">
      <div class="container">
        <a class="navbar-brand" href="#">Pokédex</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <a class="nav-link" href="#" @click="toggleView('list')">Home</a>
            </li>
          </ul>
          <ul class="navbar-nav">
            <li class="nav-item">
              <a href="#" class="nav-link" @click="toggleView('favorites')">Favorites</a>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link" @click="toggleView('equip')">Equip</a>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link" @click="toggleView('PokeInventario')">Inventari</a>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link" @click="toggleView('PokeTienda')">Tenda</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
<div class="lista"></div>
                                                <!-- para que se me espere al cargar -->
    <ListPokemon v-if="currentView === 'list' && pokemonList " :pokemonList="pokemonList" :favorites="favorites" :team="team" :inventory="inventory" @remove-from-favorites="removeFromFavorites" @add-to-favorites="addToFavorites" @add-to-team="addToTeam" @remove-from-team="removeFromTeam"></ListPokemon>
    <FavoritosPokemons v-if="currentView === 'favorites'" :favorites="favorites" @add-to-favorites="addToFavorites" @remove-from-favorites="removeFromFavorites"></FavoritosPokemons>
    <EquipPokemon v-if="currentView === 'equip' && team" :equip="team" @add-to-team="addToTeam" @remove-from-team="removeFromTeam"></EquipPokemon>


    <PokeInventario v-else-if="currentView === 'PokeInventario'" :inventory="compras" ></PokeInventario>
    <PokeTienda v-else-if="currentView === 'PokeTienda'" :items="items" :comprasHechas="handleCompra"></PokeTienda>

  </div>
</template>

<script>
import ListPokemon from './ListPokemon.vue';
import FavoritosPokemons from './favoritosPokemons.vue';
import EquipPokemon from './equipPokemon.vue';

import PokeInventario from './pokeInventario.vue';
import PokeTienda from './pokeTienda.vue';

export default {
  components: {
    ListPokemon,
    FavoritosPokemons,
    EquipPokemon,
    PokeInventario,
    PokeTienda
  },
  data() {
  return {
    pokemonList: null, // null por que se me carga el html sin los datos de forma asincrona
    favorites: [],
    team: [],
    inventory: [

    ],
    currentView: 'list',
    items: [
      { name: 'Pokeball', quantity: 15, selectedQuantity: 0, image: require('@/assets/pokeball.png') },
      { name: 'Potion', quantity: 5, selectedQuantity: 0, image: require('@/assets/potion.png') },
      { name: 'Elixir', quantity: 5, selectedQuantity: 0, image: require('@/assets/elixir.png') },
      { name: 'Masterball', quantity: 15, selectedQuantity: 0, image: require('@/assets/masterball.png') },
      { name: 'Ultraball', quantity: 15, selectedQuantity: 0, image: require('@/assets/ultraball.png') }
    ],
    //los elementos de tienda por defecto en el inventario los marco como compados al iniciarr
    compras: [
    { name: 'Pokeball', quantity: 1, selectedQuantity: 0, image: require('@/assets/pokeball.png') },
      { name: 'Potion', quantity: 1, selectedQuantity: 0, image: require('@/assets/potion.png') },
      { name: 'Elixir', quantity: 1, selectedQuantity: 0, image: require('@/assets/elixir.png') },
      { name: 'Masterball', quantity: 1, selectedQuantity: 0, image: require('@/assets/masterball.png') },
      { name: 'Ultraball', quantity: 1, selectedQuantity: 0, image: require('@/assets/ultraball.png') }
    ]
  };
},

  methods: {

  toggleView(view) {
      this.currentView = view;
   },
  
  handleCompra(item) {
    // Eliminar duplicados del array compras segun el nombre del item al comprar
    const existingIndex = this.compras.findIndex(i => i.name === item.name);
    if (existingIndex !== -1) {
      this.compras.splice(existingIndex, 1);//adios
    }
    this.compras.push(item);
  },
  addItemToInventory(item) {
      this.inventory.push(item);
  },



//                                            equipo
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
    },



    //                                    favoritos
    addToFavorites(pokemon) {
        this.favorites.push(pokemon);
    },
    removeFromFavorites(pokemon) {
      const index = this.favorites.findIndex(fav => fav.id === pokemon.id);
      if (index !== -1) {
        // Elimina el Pokémon de la lista de favoritos
        this.favorites.splice(index, 1);
      }
    },
    isOnFav(pokemon) {
      return this.fav.some(fav => fav.id === pokemon.id);
    },
    addToFav(pokemon) {
        this.favorites.push(pokemon);
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
</style>
