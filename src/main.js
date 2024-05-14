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



import InventrariPokemon from './components/inventrariPokemon.vue';

createApp(InventrariPokemon).mount('#InventrariPokemon');

import BotigaPokemon from './components/botigaPokemon.vue';

createApp(BotigaPokemon).mount('#BotigaPokemon');

import ExperimentoInventario from './components/experimentoInventario.vue';

createApp(ExperimentoInventario).mount('#ExperimentoInventario');


import ExperimentoTienda from './components/experimentoTienda.vue';

createApp(ExperimentoTienda).mount('#ExperimentoTienda');