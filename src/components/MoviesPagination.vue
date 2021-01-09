<template>
  <div class="movies-pagination">
    <BPagination
      v-model="currentPageModel"
      :per-page="perPage"
      :total-rows="total"
    />
    {{ currentPage }}
  </div>
</template>

<script>
export default {
  name: 'MoviesPagination',
  data () {
    return {}
  },

  props: {
    // from App
    currentPage: {
      type: Number,
      default: 1
    },
    total: {
      type: Number,
      default: 1
    },
    perPage: {
      type: Number,
      default: 1
    }
  },

  computed: {
    // Используется для получения текущей страницы и передачи новой
    currentPageModel: {
      // получаем текущую страницу
      get () {
        return this.currentPage
      },
      // Передаём новую страницу наверх
      set (value) {
        this.$emit('changePage', value)
      }
    }
  }
}
</script>

<style scoped>
.pagination {
  justify-content: center;
  background: #00008b42;
}
.movies-pagination {
  margin-top: auto;
}
.movies-pagination >>> .pagination .page-item .page-link {
  background-color: transparent;
  font-size: 12px;
  color: #fff;
  box-shadow: none;
}
.movies-pagination >>> .pagination .page-item.active .page-link {
  border-color: #fff;
  background-color: #fff;
  color: #000;
}
</style>
