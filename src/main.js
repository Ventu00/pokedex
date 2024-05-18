import { createApp } from 'vue';
import 'bootstrap/dist/css/bootstrap.min.css';

import PokedexComponent from './components/PokedexComponent.vue';

createApp(PokedexComponent).mount('#PokedexComponent');

import favoritos from './components/favoritosPokemons.vue';

createApp(favoritos).mount('#favoritos');


import ListPokemon from './components/ListPokemon.vue';

createApp(ListPokemon).mount('#ListPokemon');

import EquipPokemon from './components/equipPokemon.vue';

createApp(EquipPokemon).mount('#EquipPokemon');

import SliderContainer from './components/sliderContainer.vue';

createApp(SliderContainer).mount('#SliderContainer');


import PokeInventario from './components/pokeInventario.vue';

createApp(PokeInventario).mount('#PokeInventario');


import PokeTienda from './components/pokeTienda.vue';

createApp(PokeTienda).mount('#PokeTienda');