<template>
  <div class="edit flex flex-col">
    <div class="flex flex-col flex-grow items-start justify-between px-4">
      <label class="mt-2 py-2" for="">Заголовок</label>
      <input type="text" :value="column.name" />

      <label class="mt-2 py-2" for="">Color of Column</label>
      <input type="color" :value="column.style.backgroundColor" />

      <label class="mt-2 py-2" for="">Color of Text</label>
      <input type="color" :value="column.style.color" />
    </div>

    <div class="flex flex-grow items-start justify-between px-4 py-2 mt-4">
      <button><BaseCheck /></button>
      <button><BaseCancel /></button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import BaseCheck from '../components/Icons/BaseCheck'
import BaseCancel from '../components/Icons/BaseCancel'

export default {
  components: {
    BaseCheck,
    BaseCancel
  },
  computed: {
    ...mapGetters(['getColumn']),
    column() {
      return this.getColumn(this.$route.params.id)
    }
  },
  mounted() {
    console.log(this.column)
  }
}
</script>

<style lang="css" scoped>
.edit {
  position: absolute;
  top: 0;
  right: -231px;
  background-color: #fff;
  color: black;
  z-index: 2;

  max-width: 260px;
}
</style>
