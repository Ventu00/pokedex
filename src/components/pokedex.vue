<template>
  <div class="pokedex">
    <!-- Filtres -->
    <div class="filters">
      <!-- Filtrar per preferits -->
      <label>
        <input type="checkbox" v-model="showFavorites">
        Mostrar preferits
      </label>

      <!-- Filtrar per equip -->
      <button @click="toggleShowTeam">Mostrar equip</button>

      <!-- Filtrar per tipus -->
      <select v-model="selectedType">
        <option value="">Tots els tipus</option>
        <!-- Aquí pots generar dinàmicament les opcions basades en els tipus disponibles -->
        <option v-for="type in types" :value="type" :key="type">{{ type }}</option>
      </select>

      <!-- Filtrar per rang de números -->
      <input type="range" min="1" max="151" v-model="selectedRange">
      <span>{{ selectedRange }}</span>
    </div>

    <!-- Llistat de Pokémon -->
    <div class="pokemon-list">
      <div v-for="(pokemon, index) in filteredPokemon" :key="index" class="pokemon-card">
        <!-- Aquí pots mostrar la informació de cada Pokémon -->
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
      pokemonList: [], // Aquí guardaràs tots els Pokémon
      favorites: new Set(), // Aquí guardarem els Pokémon preferits
      team: new Set(), // Aquí guardarem el nostre equip de Pokémon
      showTeam: false, // Variable per controlar si es mostra o no l'equip
      showFavorites: false, // Variable per controlar si es mostren o no els preferits
      selectedType: '', // Tipus de Pokémon seleccionat pel filtre
      selectedRange: 1 // Rang de números seleccionat pel filtre
    };
  },
  computed: {
    types() {
      // Aquí pots calcular els tipus únics basats en la llista de Pokémon
      return [...new Set(this.pokemonList.flatMap(pokemon => pokemon.types))];
    },
    filteredPokemon() {
      let filtered = this.pokemonList;

      // Filtrar per preferits
      if (this.showFavorites) {
        filtered = filtered.filter(pokemon => this.favorites.has(pokemon.id));
      }

      // Filtrar per equip
      if (this.showTeam) {
        filtered = filtered.filter(pokemon => this.team.has(pokemon.id));
      }

      // Filtrar per tipus
      if (this.selectedType) {
        filtered = filtered.filter(pokemon => pokemon.types.includes(this.selectedType));
      }

      // Filtrar per rang de números
      filtered = filtered.filter(pokemon => pokemon.id <= this.selectedRange);

      return filtered;
    }
  },
  methods: {
    toggleFavorite(pokemon) {
      // Afegir o eliminar el Pokémon de preferits
      if (this.favorites.has(pokemon.id)) {
        this.favorites.delete(pokemon.id);
      } else {
        this.favorites.add(pokemon.id);
      }
    },
    toggleTeam(pokemon) {
      // Afegir o eliminar el Pokémon de l'equip (amb una restricció de màxim 6)
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
    // Aquí pots carregar els Pokémon de la PokéAPI al carregar el component
    // Recomano utilitzar Axios o fetch per fer la sol·licitud HTTP a la PokéAPI
    // i actualitzar la propietat pokemonList amb els resultats obtinguts.
  }
};
</script>

<style scoped>
/* Aquí pots afegir estils CSS per al teu component */
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
