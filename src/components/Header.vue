<template>
  <header class="header">
    <b-navbar type="dark" variant="dark">
      <b-container>
        <b-navbar-brand href="#">
          MovieDB
        </b-navbar-brand>
        <b-nav-form>
          <!-- debounce="500" - создаёт задержку перед следующим
          выполнением функции -->
          <b-form-input
            class="search-input mr-sm-2"
            placeholder="Search"
            v-model="searchValue"
            debounce="1000"
          ></b-form-input>
          <b-button variant="outline-success" class="my-2 my-sm-0" type="submit"
            >Search</b-button
          >
        </b-nav-form>
      </b-container>
    </b-navbar>
  </header>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Header',

  data: () => {
    return {
      searchValue: ''
    }
  },
  watch: {
    // Наблюдаем за изменениями в инпуте
    searchValue: 'onSearchValueChanged'
    // Когда searchValue изменяется, мы запускаем метод
    // onSearchValueChanged
  },
  methods: {
    ...mapActions('moviesStore', ['searchMovie', 'fetchMovies', 'toggleSearchState']),
    onSearchValueChanged (val) {
      console.log(val)
      if (val) {
        // Если пользователь вводит что то в поиск
        this.searchMovie(val)
        // Меняем главный заголовок "IMDB Top"
        this.toggleSearchState(true)
      } else {
        // Если просто загрузка с сервера
        this.toggleSearchState(false)
        // загружаем фильмы
        this.fetchMovies()
      }
    }
  }
}
</script>

<style scoped>
.header {
  margin-bottom: 30px;
}
.navbar {
  background-color: rgba(0, 0, 0, 0.7) !important;
}
.search-input {
  color: #ffffff;
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(0, 0, 0, 0.6);
}
</style>
