import axios from '../../plugins/axios'
import IDs from '../mock/imdb_top'
import mutations from '@/store/mutations'
// import { search } from 'core-js/fn/symbol'

function serializeResponse (movies) {
  return movies.reduce((acc, movie) => {
    // Из объекта с фильмами создаём новый объект
    // у которого ключем будет ID фильма, а телом
    // информация об этом фильме
    acc[movie.imdbID] = movie
    return acc
  }, {})
}

// Деструктурируем мутации и вытягиваем свойствa
const { MOVIES, CURRENT_PAGE, REMOVE_MOVIE, TOGGEL_SEARCH } = mutations

const moviesStore = {
  // НУжен, чтобы замкнуть данные и получать их только
  // при указании имени стора, например
  // ...mapActions('moviesStore', ['changeCurrentPage'])
  namespaced: true,

  state: {
    top: IDs, // МАссив ID всех фильмов imdb_top.js
    // Первые 12 фильмов
    moviesPerPAge: 12,
    // Текущая страница
    currentPage: 1,
    movies: {},
    isSearch: false
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
    moviesLength: ({ top }) => Object.keys(top).length,
    isSearch: ({ isSearch }) => isSearch
  },
  mutations: {
    [MOVIES] (state, value) {
      state.movies = value
    },
    // Изменение текущей страницы
    [CURRENT_PAGE] (state, value) {
      state.currentPage = value
    },
    [REMOVE_MOVIE] (state, index) {
      // index - с какого индекса удалить
      // 1 - кол-во элементов
      state.top.splice(index, 1)
    },
    [TOGGEL_SEARCH] (state, bool) {
      state.isSearch = bool
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

    async fetchMovies ({ getters, commit, dispatch }) {
      try {
        // dispatch будет вызывать экшн лоадера
        // показываем лоадер
        dispatch('toggleLoader', true, { root: true })
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
      } finally {
        // Стопаем лоадер
        // вызовется независимо от того, с ошибкой выполнилась функция или нет
        dispatch('toggleLoader', false, { root: true })
      }
    },
    // Меняем текущую страницу
    changeCurrentPage ({ commit, dispatch }, page) {
      commit(CURRENT_PAGE, page)
      dispatch('fetchMovies')
    },
    removeMovie ({ commit, dispatch, state }, id) {
      // Сравниваем текущий Id фильма, с тем, что пришёл в id
      // Ежели такой id найдётся, нам вернётся его индекс в массиве
      const index = state.top.findIndex(item => item === id)
      if (index !== -1) {
        commit(REMOVE_MOVIE, index)
        dispatch('fetchMovies')
      }
    },
    async searchMovie ({ dispatch, commit }, query) {
      try {
        dispatch('toggleLoader', true, { root: true })

        const response = await axios.get(`/?s=${query}`)

        if (response.Error) {
          throw Error(response.Error)
        }
        const movies = serializeResponse(response.Search)
        commit('MOVIES', movies)

        console.log(response)
      } catch (error) {
        console.log(error)

        dispatch('showNotify', {
          msg: error.message,
          title: 'Error',
          variant: 'danger'
        }, { root: true })
      } finally {
        dispatch('toggleLoader', false, { root: true })
      }
    },
    toggleSearchState ({ commit }, bool) {
      commit(TOGGEL_SEARCH, bool)
    }
  },
  modules: {}
}

export default moviesStore
