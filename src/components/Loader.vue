<template>
    <div class="loader-wrap text-center" v-if="isShowLoader">
        <b-spinner variant="primary" label="Text Centered"></b-spinner>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Loader',

  computed: {
    //   т.к. Стор лоадера глобальный, namespace не указан,
    // мы можем указать сразу имя геттера, без указания имени стора
    ...mapGetters(['isShowLoader'])
  }
}
</script>

<style scoled>
.loader-wrap {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100
}

</style>
