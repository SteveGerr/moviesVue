<template>
<!-- List of movies -->
  <b-container>
    <h3 class="list-title">{{ listTitle }}</h3>
    <BRow>
      <template v-if="isExist">
        <BCol cols="3" v-for="(listMovie, id) in list" :key="id">
          <MovieListItem
          :movie="listMovie"
          @mouseover.native="onMouseOver(listMovie.Poster)"
          @removeItem="onRemoveItem"
          ></MovieListItem>
        </BCol>
      </template>
      <template v-else>
          <div>Empty list</div>
      </template>
    </BRow>
  </b-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
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
    ...mapGetters('moviesStore', ['isSearch']),
    listTitle () {
      return this.isSearch ? 'Search result' : 'IMDB Top'
    },
    // Проверяем есть ли список
    isExist () {
      return Boolean(Object.keys(this.list).length)
    }
  },

  methods: {
    ...mapActions('moviesStore', ['removeMovie']),
    onMouseOver (poster) {
      this.$emit('changePoster', poster)
    },
    async onRemoveItem ({ id, title }) {
      const isConfirmed = await this.$bvModal.msgBoxConfirm(`Are you sure ${title}?`)
      if (isConfirmed) {
        this.removeMovie(id)
      }
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
