<template>
  <AppDrop @drop="moveTaskOrColumn">
    <AppDrag
      class="task"
      :transferData="{
        type: 'task',
        fromColumnIndex: columnIndex,
        fromTaskIndex: taskIndex
      }"
      @click.native="goToTask(task)"
    >
      <div class="flex w-full justify-between items-center">
        <span class="font-bold">{{ task.name }}</span>
        <BaseTrash @click.stop="removeTask(task)" />
      </div>
      <p v-if="task.description" class="w-full flex-no-shrink mt-1 text-sm">
        {{ task.description }}
      </p>
    </AppDrag>
  </AppDrop>
</template>

<script>
import AppDrag from './AppDrag'
import AppDrop from './AppDrop'
import BaseTrash from './Icons/BaseTrash'

import movingTasksAndColumnsMixin from '../mixins/movingTasksAndColumnsMixin.js'

export default {
  components: {
    AppDrag,
    AppDrop,
    BaseTrash
  },
  mixins: [movingTasksAndColumnsMixin],
  props: {
    task: {
      type: Object,
      required: true
    },
    taskIndex: {
      type: Number,
      required: true
    }
  },
  methods: {
    goToTask(task) {
      this.$router.push({ name: 'task', params: { id: task.id } })
    },
    removeTask(task) {
      this.$store.commit('REMOVE_TASK', {
        key: this.taskIndex,
        columnIndex: this.columnIndex
      })
    }
  }
}
</script>

<style lang="css">
.task {
  @apply flex items-center flex-wrap shadow mb-2 py-2 px-2 rounded bg-white text-grey-darkest no-underline;
}
</style>
