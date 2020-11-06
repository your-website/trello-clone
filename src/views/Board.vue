<template>
  <div class="board">
    <div class="column flex w-1">
      <input
        type="text"
        class="p-2 w-full"
        placeholder="+ Enter new column"
        v-model="newColumnName"
        @keyup.enter="createColumn"
      />
    </div>
    <div class="absolute flex flex-row items-start mt-3">
      <BoardColumn
        v-for="(column, $columnIndex) of board.columns"
        :key="$columnIndex"
        :column="column"
        :columnIndex="$columnIndex"
        :board="board"
      />
    </div>

    <div class="task-bg" v-if="isTaskOpen" @click.self="closeTask">
      <router-view />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import BoardColumn from '../components/BoardColumn.vue'

export default {
  components: {
    BoardColumn
  },
  data () {
    return {
      newColumnName: ''
    }
  },
  computed: {
    ...mapState(['board']),
    isTaskOpen () {
      return this.$route.name === 'task'
    }
  },
  methods: {
    closeTask () {
      this.$router.push({ name: 'board' })
    },
    createColumn () {
      this.$store.commit('CREATE_COLUMN', this.newColumnName)
      this.newColumnName = ''
    }
  }
}
</script>

<style lang="css">

.board {
  @apply p-4 bg-teal-dark h-full overflow-auto;
}
.task-bg {
  @apply pin absolute;
  background: rgba(0, 0, 0, 0.5);
}
.column {
  @apply bg-grey-light p-2 mr-4 text-left shadow rounded;
  min-width: 350px;
}
</style>
