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
        <div class="flex-col w-full">
          <span class="font-bold">{{ task.name }}</span>
          <p v-if="task.description" class="w-full flex-no-shrink mt-3 text-sm">
            {{ task.description }}
          </p>
        </div>

        <div class="flex-col">
          <BaseTrash @click.stop="removeTask(task)" />
          <BaseExclamation
            class="exclamation"
            :style="{ fill: taskPriority ? 'green' : 'gray' }"
            @click.stop="changePriorityTask"
          />
        </div>
      </div>
    </AppDrag>
  </AppDrop>
</template>

<script>
import AppDrag from './AppDrag'
import AppDrop from './AppDrop'
import BaseTrash from './Icons/BaseTrash'
import BaseExclamation from './Icons/BaseExclamation.vue'

import movingTasksAndColumnsMixin from '../mixins/movingTasksAndColumnsMixin.js'
import { mapGetters } from 'vuex'

export default {
  components: {
    AppDrag,
    AppDrop,
    BaseTrash,
    BaseExclamation
  },
  mixins: [movingTasksAndColumnsMixin],
  computed: {
    ...mapGetters(['getTaskPriority']),
    taskPriority() {
      return this.getTaskPriority(this.taskIndex, this.columnIndex)
    }
  },
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
      let isBoss = confirm('Are you sure ?')

      if (isBoss) {
        this.$store.commit('REMOVE_TASK', {
          key: this.taskIndex,
          columnIndex: this.columnIndex
        })
      }
    },
    hoverColorExclamation(e) {
      e.target.style.fill = this.task.priority ? 'gray' : 'green'
    },
    basedColorExclamation(e) {
      e.target.style.fill = this.task.priority ? 'red' : 'gray'
    },
    changePriorityTask() {
      const task = this.task
      this.$store.commit('CHANGE_PRIORITY_TASK', {
        task,
        priority: !task.priority
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
