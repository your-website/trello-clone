import Vue from 'vue'
import Vuex from 'vuex'
import defaultBoard from './default-board'
import { saveStatePlugin, uuid } from './utils'

Vue.use(Vuex)

const board = JSON.parse(localStorage.getItem('board')) || defaultBoard

export default new Vuex.Store({
  plugins: [saveStatePlugin],
  state: {
    board
  },
  mutations: {
    CREATE_TASK(state, { tasks, name }) {
      tasks.push({
        name,
        id: uuid(),
        description: '',
        priority: false
      })
    },
    UPDATE_TASK(state, { task, key, value }) {
      task[key] = value
      // Vue.set(task, key, value)
    },
    REMOVE_TASK(state, { key, columnIndex }) {
      state.board.columns[columnIndex].tasks.splice(key, 1)
    },
    MOVE_TASK(state, { fromTasks, toTasks, fromTaskIndex, toTaskIndex }) {
      const taskToMove = fromTasks.splice(fromTaskIndex, 1)[0]
      toTasks.splice(toTaskIndex, 0, taskToMove)
    },
    MOVE_COLUMN(state, { fromColumnIndex, toColumnIndex }) {
      const columnList = state.board.columns
      const columnToMove = columnList.splice(fromColumnIndex, 1)[0]
      columnList.splice(toColumnIndex, 0, columnToMove)
    },
    CREATE_COLUMN(state, titleNewColumn) {
      const newColumn = {
        name: titleNewColumn,
        tasks: [],
        style: {
          backgroundColor: '#dae1e7',
          color: '#000000'
        }
      }
      state.board.columns.push(newColumn)
    },
    CHANGE_STYLE_COLUMN(state, { columnIndex, backgroundColor, color }) {
      state.board.columns[columnIndex].style = {
        backgroundColor,
        color
      }
    },
    CHANGE_PRIORITY_TASK(state, { task, priority }) {
      task.priority = priority
    }
  },
  getters: {
    getTask(state) {
      return id => {
        for (const column of state.board.columns) {
          for (const task of column.tasks) {
            if (task.id === id) {
              return task
            }
          }
        }
      }
    },
    getTaskPriority(state) {
      return (taskIndex, columnIndex) => {
        return state.board.columns[columnIndex].tasks[taskIndex].priority
      }
    }
  },
  actions: {
    changeBgcAndColor(
      { commit, state },
      { columnIndex, backgroundColor, color }
    ) {
      let bgc =
        backgroundColor === undefined
          ? state.board.columns[columnIndex].style.backgroundColor
          : backgroundColor
      let colorText =
        color === undefined
          ? state.board.columns[columnIndex].style.color
          : color

      commit('CHANGE_STYLE_COLUMN', {
        columnIndex,
        backgroundColor: bgc,
        color: colorText
      })
    }
  }
})
