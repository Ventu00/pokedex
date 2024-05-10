import { createApp } from 'vue';
import 'bootstrap/dist/css/bootstrap.min.css';

import PokedexComponent from './components/PokedexComponent.vue';

createApp(PokedexComponent).mount('#PokedexComponent');

import favoritos from './components/favoritos-pokemons.vue';

createApp(favoritos).mount('#favoritos');


import List from './components/List-pokemon.vue';

createApp(List).mount('#List');