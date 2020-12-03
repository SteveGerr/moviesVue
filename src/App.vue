<template>
  <div id="app">
    <!-- передаём значение переменной в компонент -->
    <poster-bg :poster="posterBg" />
    <movies-list :list="moviesList" @changePoster="onChangePoster" />
    <MoviesPagination
      :current-page="currentPage"
      :per-page="moviesPerPAge"
      :total="moviesLength"
      @changePage="onPageChanged"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import MoviesList from '@/components/MoviesList'
import PosterBg from './components/posterBG'
import MoviesPagination from '@/components/MoviesPagination'

export default {
  name: 'App',
  components: {
    MoviesList,
    PosterBg,
    MoviesPagination
  },

  data () {
    return {
      posterBg: ''
    }
  },

  methods: {
    ...mapActions('moviesStore', ['changeCurrentPage']),

    onChangePoster (poster) {
      // Передаём в переменную  posterBg пришедшую из события ссылку
      this.posterBg = poster
    },
    onPageChanged (page) {
      this.changeCurrentPage(page)
    }
  },
  computed: {
    ...mapGetters('moviesStore', [
      'moviesList',
      'currentPage',
      'moviesPerPAge',
      'moviesLength'
    ])
  }
}
</script>

<style>
#app {
  position: relative;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
