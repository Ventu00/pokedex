import Vue from 'vue';
import App from './App.vue';
import PokedexComponent from './components/PokedexComponent.vue'; 

Vue.config.productionTip = false;

Vue.component('PokedexComponent', PokedexComponent); 

new Vue({
  render: h => h(App),
}).$mount('#app');
