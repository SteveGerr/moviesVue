import axios from '../../plugins/axios'
import IDs from '../mock/imdb_top'
import mutations from '@/store/mutations'

function serializeResponse (movies) {
  return movies.reduce((acc, movie) => {
    // Из объекта с фильмами создаём новый объект
    // у которого ключем будет ID фильма, а телом
    // информация об этом фильме
    acc[movie.imdbID] = movie
    return acc
  }, {})
}

// Деструктурируем мутации и вытягиваем свойство MOVIES
const { MOVIES, CURRENT_PAGE } = mutations

const moviesStore = {
  namespaced: true,

  state: {
    top: IDs, // МАссив ID всех фильмов imdb_top.js
    // Первые 12 фильмов
    moviesPerPAge: 12,
    // Текущая страница
    currentPage: 1,
    movies: {}
  },
  getters: {
    // ({ movies }) - деструктурируем state
    moviesList: ({ movies }) => movies,
    // Копируем массив c ID фильмов, начиная с from и заканчивая to
    // и получаем копию массива top
    slicedIDs: ({ top }) => (from, to) => top.slice(from, to),
    // возварщает текущую страницу
    currentPage: ({ currentPage }) => currentPage,
    moviesPerPAge: ({ moviesPerPAge }) => moviesPerPAge,
    moviesLength: ({ top }) => Object.keys(top).length
  },
  mutations: {
    [MOVIES] (state, value) {
      state.movies = value
    },
    // Изменение текущей страницы
    [CURRENT_PAGE] (state, value) {
      state.currentPage = value
    }
  },
  actions: {
    // Позволяет вызывать экшоны глобально, во время загрузки
    initMoviesStore: {
      handler ({ dispatch }) {
        dispatch('fetchMovies')
      },
      root: true
    },

    async fetchMovies ({ getters, commit }) {
      try {
        const { currentPage, moviesPerPAge, slicedIDs } = getters
        // Получаем начальный индекс копирования массива
        const from = currentPage * moviesPerPAge - moviesPerPAge
        // Получаем конечный индекс копирования массива
        const to = currentPage * moviesPerPAge
        const moviesToFetch = slicedIDs(from, to)
        // Проходимся по массиву с ID и на каждой итерации вытягиваем ID
        // и делаем синхронный запрос, чтобы получить массив промисов
        // т.е. 12 запросов на каждой итерации
        // к baseURL: process.env.VUE_APP_API_URL добавляется -  `/?i=${id}`
        // и таким образом формируется ссылка запроса(/адрес сайта/id фильма)
        const requests = moviesToFetch.map(id => axios.get(`/?i=${id}`))
        // получаем 12 ответов соответственно
        const response = await Promise.all(requests)
        // Сохряняем наш ответ и нормализуем
        const movies = serializeResponse(response)
        commit('MOVIES', movies)
      } catch (error) {
        console.log(error)
      }
    },
    // Меняем текущую страницу
    changeCurrentPage ({ commit, dispatch }, page) {
      commit(CURRENT_PAGE, page)
      dispatch('fetchMovies')
    }
  },
  modules: {}
}

export default moviesStore
