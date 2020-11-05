<template>
  <AppDrop @drop="moveTaskOrColumn">
    <AppDrag
      class="column"
      :style="{ backgroundColor: bgc }"
      :transferData="{
        type: 'column',
        fromColumnIndex: columnIndex
      }"
    >
      <div class="flex items-center justify-between mb-2 font-bold">
        <div :style="{ color }">
          {{ column.name }}
          <input
            @change="pickColorText"
            class="input-color"
            type="color"
            :value="color"
          />
        </div>

        <input
          @change="pickColorColumn"
          class="input-color"
          type="color"
          :value="bgc"
        />
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
          :style="{ color }"
          type="text"
          class="block p-2 w-full bg-transparent"
          placeholder="+ Enter new task"
          @keyup.enter="createTask($event, column.tasks)"
        />
      </div>
    </AppDrag>
  </AppDrop>
</template>

<script>
import ColumnTask from '../components/ColumnTask.vue'
import AppDrag from './AppDrag'
import AppDrop from './AppDrop'
import movingTasksAndColumnsMixin from '../mixins/movingTasksAndColumnsMixin.js'

export default {
  mixins: [movingTasksAndColumnsMixin],
  data() {
    return {
      bgc: {
        type: String,
        default: ''
      },
      color: {
        type: String,
        default: ''
      }
    }
  },
  components: {
    ColumnTask,
    AppDrag,
    AppDrop
  },
  methods: {
    createTask(e, tasks) {
      this.$store.commit('CREATE_TASK', {
        tasks,
        name: e.target.value
      })
      e.target.value = ''
    },
    pickColorColumn(e) {
      this.bgc = e.target.value
    },
    pickColorText(e) {
      this.color = e.target.value
    }
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
