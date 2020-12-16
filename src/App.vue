<template>
  <div id="app">
    <Loader />
    <Notification />
    <Header />
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
import Loader from '@/components/Loader'
import Header from './components/Header'
import Notification from '@/components/Notification'

export default {
  name: 'App',
  components: {
    MoviesList,
    PosterBg,
    MoviesPagination,
    Loader,
    Header,
    Notification
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
      // Пушим в адресную строку название страницы 'page'
      this.$router.push({ query: { page } })
      this.changeCurrentPage(page)
    },
    onPageQueryChange (query) {
      console.log(query)
    }
  },
  computed: {
    ...mapGetters('moviesStore', [
      'moviesList',
      'currentPage',
      'moviesPerPAge',
      'moviesLength'
    ])
  },
  watch: {
    '$route.query': {
      handler: 'onPageQueryChange',
      immediate: true, // позволяет срабатывать после загрузки
      deep: true // мониторит изменения внутри объекта
    }
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
