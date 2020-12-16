import Vue from 'vue'
import Vuex from 'vuex'
import moviesStore from './modules/moviesStore'
import loader from './modules/loader'
import notificationStore from '@/store/modules/notificationStore'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    moviesStore,
    loader,
    notificationStore
  }
})

store.dispatch('initMoviesStore')

export default store
