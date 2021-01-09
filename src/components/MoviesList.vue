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
          @showModal="onShowModal"
          ></MovieListItem>
        </BCol>
      </template>
      <template v-else>
          <div>Empty list</div>
      </template>
    </BRow>
    <b-modal
      body-class="movie-modal-body"
      class="movie-modal"
      :id="movieInfoModalId" size="xl"
      hide-footer hide-header
      title="BootstrapVue">
      <MovieModalInfoContent :movie="selectMovie" @closeModal="onCloseModal" />
    </b-modal>
  </b-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import MovieListItem from './MoviesListItem'
import MovieModalInfoContent from './MovieModalInfoContent'

export default {
  name: 'MoviesList',
  components: {
    MovieListItem,
    MovieModalInfoContent
  },
  data: () => ({
    movieInfoModalId: 'modal-movie',
    selectMovieId: ''
  }),
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
    },
    selectMovie () {
      // Ежели ID есть, передаём в list
      return this.selectMovieId ? this.list[this.selectMovieId] : null
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
    },
    onShowModal (id) {
      // Когда выбирают фильм, записываем его Id в дата selectMovieId
      this.selectMovieId = id
      this.$bvModal.show(this.movieInfoModalId)
    },
    onCloseModal () {
      this.selectMovieId = null
      this.$bvModal.hide(this.movieInfoModalId)
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

<style>
  .movie-modal-body {
  padding: 0;
}

</style>
