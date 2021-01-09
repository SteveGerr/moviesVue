<template>
  <!-- One movie -->
  <div class="movie-item mb-3">
    <div class="movie-item-poster" :style="posterBG"></div>
    <div class="movie-info-wrap">
      <div class="movie-item-info">
        <h3 class="movie-title">{{ movie.Title }}</h3>
        <span class="movie-year">{{ movie.Year }}</span>
      </div>
      <div class="movie-item-controls row no-gutters">
        <div class="col m-1">
          <BButton
            size="md"
            block
            variant="outline-light"
            @click="shoInfoModal"
            >
            Info
            </BButton>
        </div>
        <div class="col m-1">
          <BButton size="md" block variant="outline-light" @click="emitRemoveEvent">Remove</BButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MoviesListItem',
  props: {
    movie: {
      type: Object,
      required: true
    }
  },
  computed: {
    posterBG () {
      // возвращаем строку, содержащую стиль,
      // которая подставляется в блок поста
      return {
        // ссылка на постер конкретного фильма
        'background-image': `url(${this.movie.Poster})`
      }
    }
  },

  methods: {
    emitRemoveEvent () {
      this.$emit('removeItem', {
        id: this.movie.imdbID,
        title: this.movie.Title
      })
    },
    shoInfoModal () {
      this.$emit('showModal', this.movie.imdbID)
    }
  }
}
</script>

<style scoped>
.movie-info-wrap {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding: 20px 10px;
  opacity: 0;
  transition: all 0.2s ease;
}
.movie-item:hover .movie-info-wrap {
  opacity: 1;
  background: rgba(0, 0, 0, 0.7);
}
.movie-item {
  position: relative;
  width: 100%;
  max-width: 255px;
  height: 400px;
  cursor: pointer;
  border-radius: 5px;
  overflow: hidden;
  transition: all 0.2s ease-in;
}
.movie-item:hover {
  box-shadow: 0px 5px 30px rgba(0, 0, 0, 0.7);
  transform: scale(1.02);
}
.movie-item-poster {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
.movie-item-poster {
  z-index: -1;
}
.movie-title {
  font-size: 22px;
}
.movie-year {
  font-size: 14px;
}
.movie-title,
.movie-year {
  color: #ffffff;
}
</style>
