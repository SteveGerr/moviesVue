<template>
<!-- List of movies -->
  <b-container>
    <h3 class="list-title">IMDB Top</h3>
    <BRow>
      <template v-if="isExist">
        <BCol cols="3" v-for="(listMovie, id) in list" :key="id">
          <MovieListItem :movie="listMovie" @mouseover.native="onMouseOver(listMovie.Poster)"></MovieListItem>
        </BCol>
      </template>
      <template v-else>
          <div>Empty list</div>
      </template>
    </BRow>
  </b-container>
</template>

<script>
import MovieListItem from './MoviesListItem'

export default {
  name: 'MoviesList',
  components: {
    MovieListItem
  },
  props: {
    list: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    // Проверяем есть ли список
    isExist () {
      return Boolean(Object.keys(this.list).length)
    }
  },

  methods: {
    onMouseOver (poster) {
      this.$emit('changePoster', poster)
    }
  }
}
</script>

<style scoped>
.list-title {
  font-size: 50px;
  margin-bottom: 30px;
}
</style>
