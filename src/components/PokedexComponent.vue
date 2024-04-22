<template>
  <div class="pokedex">
    <div class="filters">
      <label>
        <input type="checkbox" v-model="showFavorites">
        Mostrar preferits
      </label>

      <button @click="toggleShowTeam">Mostrar equip</button>

      <select v-model="selectedType">
        <option value="">Tots els tipus</option>
        <option v-for="type in types" :value="type" :key="type">{{ type }}</option>
      </select>

      <!-- Filtrar per rang de números -->
      <input type="range" min="1" max="151" v-model="selectedRange">
      <span>{{ selectedRange }}</span>
    </div>

    <div class="pokemon-list">
      <div v-for="(pokemon, index) in filteredPokemon" :key="index" class="pokemon-card">
        <img :src="pokemon.image" :alt="pokemon.name">
        <p>{{ pokemon.name }}</p>
        <p v-for="type in pokemon.types" :key="type">{{ type }}</p>
        <button @click="toggleFavorite(pokemon)">Favorit</button>
        <button @click="toggleTeam(pokemon)">Equip</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      favorites: new Set(), 
      team: new Set(), 
      showTeam: false, 
      showFavorites: false, 
      selectedType: '', 
      selectedRange: 1,
      pokemonsList: [
      { id: 1, name: 'Bulbasaur', types: ['Grass', 'Poison'], image: 'bulbasaur.png' },
      { id: 2, name: 'Charmander', types: ['Fire'], image: 'charmander.png' },
      { id: 3, name: 'Squirtle', types: ['Water'], image: 'squirtle.png' },
    ]
    };
  },
  computed: {
    types() {
      return [...new Set(this.pokemonsList.flatMap(pokemon => pokemon.types))];
    },
    filteredPokemon() {
      let filtered = this.pokemonsList;

      if (this.showFavorites) {
        filtered = filtered.filter(pokemon => this.favorites.has(pokemon.id));
      }

      if (this.showTeam) {
        filtered = filtered.filter(pokemon => this.team.has(pokemon.id));
      }

      if (this.selectedType) {
        filtered = filtered.filter(pokemon => pokemon.types.includes(this.selectedType));
      }

      filtered = filtered.filter(pokemon => pokemon.id <= this.selectedRange);

      return filtered;
    }
  },
  methods: {
    toggleFavorite(pokemon) {
      if (this.favorites.has(pokemon.id)) {
        this.favorites.delete(pokemon.id);
      } else {
        this.favorites.add(pokemon.id);
      }
    },
    toggleTeam(pokemon) {
      if (this.team.has(pokemon.id)) {
        this.team.delete(pokemon.id);
      } else {
        if (this.team.size < 6) {
          this.team.add(pokemon.id);
        } else {
          alert("Ja tens 6 Pokémon a l'equip!");
        }
      }
    },
    toggleShowTeam() {
      this.showTeam = !this.showTeam;
    }
  },
  mounted() {

  }
};
</script>

<style scoped>
.pokedex {
  /* Estils per al contenidor principal de la Pokédex */
}

.filters {
  /* Estils per a la secció de filtres */
}

.pokemon-list {
  /* Estils per a la llista de Pokémon */
}

.pokemon-card {
  /* Estils per a la targeta de cada Pokémon */
}
</style>
