<template>
  <AppDrop @drop="moveTaskOrColumn">
    <AppDrag
      :style="{ backgroundColor: column.style.backgroundColor }"
      class="column relative mt-4"
      :transferData="{
        type: 'column',
        fromColumnIndex: columnIndex
      }"
    >
      <div class="flex items-center justify-between mb-2 font-bold">
        {{ column.name }}
        <BaseView class="view-list" @click="goToEditColumn(columnIndex)" />
      </div>
      <div class="list-reset">
        <ColumnTask
          v-for="(task, $taskIndex) of column.tasks"
          :key="$taskIndex"
          :taskIndex="$taskIndex"
          :columnIndex="columnIndex"
          :task="task"
          :column="column"
          :board="board"
        />
        <input
          :style="{ color: column.style.color }"
          type="text"
          class="block p-2 w-full bg-transparent"
          placeholder="+ Enter new task"
          @keyup.enter="createTask($event, column.tasks)"
        />
      </div>

      <div class="task-bg" v-if="isEditOpen" @click.self="closeTask">
        <router-view />
      </div>
    </AppDrag>
  </AppDrop>
</template>

<script>
import ColumnTask from '../components/ColumnTask.vue'
import AppDrag from './AppDrag'
import AppDrop from './AppDrop'
import BaseView from '../components/Icons/BaseView'
import movingTasksAndColumnsMixin from '../mixins/movingTasksAndColumnsMixin.js'

export default {
  mixins: [movingTasksAndColumnsMixin],
  components: {
    ColumnTask,
    AppDrag,
    AppDrop,
    BaseView
  },
  computed: {
    isEditOpen() {
      if (this.$route.name === 'edit' && this.$route.params.id === this.columnIndex) {
        return true
      } else return false
    }
  },
  methods: {
    createTask(e, tasks) {
      this.$store.commit('CREATE_TASK', {
        tasks,
        name: e.target.value
      })
      e.target.value = ''
      console.log(this.column.style.backgroundColor)
    },
    pickColorColumn(e) {
      const backgroundColor = e.target.value
      this.$store.dispatch('changeBgcAndColor', {
        columnIndex: this.columnIndex,
        backgroundColor
      })
    },
    pickColorText(e) {
      const color = e.target.value
      this.$store.dispatch('changeBgcAndColor', {
        columnIndex: this.columnIndex,
        color
      })
    },
    removeColumn(columnIndex) {
      let remove = confirm('Are you sure ?')

      if (remove) {
        this.$store.commit('REMOVE_COLUMN', { columnIndex })
      }
    },
    goToEditColumn(columnIndex) {
      this.$router.push({ name: 'edit', params: { id: columnIndex } })
    },
    closeTask () {
      this.$router.push({ name: 'board' })
    },
  }
}
</script>

<style lang="css" scoped>
.column {
  @apply bg-grey-light p-2 mr-4 text-left shadow rounded;
  min-width: 350px;
}
.input-color {
  @apply bg-grey-light rounded;
}
</style>
