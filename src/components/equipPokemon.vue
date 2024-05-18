<template>
  <div>
    <h1>Pokémon Equip</h1>
    <div class="container">
      <div class="row">
        <div v-for="pokemon in equip" :key="pokemon.id" class="col-lg-3 col-md-4 col-sm-6 mb-4">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">#{{ pokemon.id }} - {{ pokemon.name }}</h5>
              <img :src="pokemon.imageUrl" :alt="pokemon.name" class="card-img-top">
              <p class="card-text">
                <b>Types:</b>
                <span v-for="(type, index) in pokemon.types" :key="index" class="badge badge-primary text-dark">{{ type }}</span>
              </p>
              <button @click="toggleTeam(pokemon)" class="btn btn-outline-secondary">{{ isOnTeam(pokemon) ? 'Remove from Team' : 'Add to Team' }}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    equip: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    isOnTeam(pokemon) {
      return this.equip.some(teamMember => teamMember.id === pokemon.id);
    },
    toggleTeam(pokemon) {
      if (this.isOnTeam(pokemon)) {
        this.$emit('remove-from-team', pokemon);
      } else {
        this.$emit('add-to-team', pokemon);
      }
    }
  }
};
</script>

<style scoped>
</style>
