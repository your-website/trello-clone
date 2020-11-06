import { uuid } from './utils'

export default {
  name: 'workshop',
  columns: [
    {
      name: 'todo',
      tasks: [
        {
          description: 'description',
          name: 'first task',
          id: uuid(),
          userAssigned: null,
          priority: false
        },
        {
          description: 'description',
          name: 'second task',
          id: uuid(),
          userAssigned: null,
          priority: false
        },
        {
          description: 'description',
          name: 'and thrid',
          id: uuid(),
          userAssigned: null,
          priority: false
        }
      ],
      style: {
        backgroundColor: '#dae1e7',
        color: '#000000'
      }
    },
    {
      name: 'in-progress',
      tasks: [
        {
          description: '',
          name: 'first task',
          id: uuid(),
          userAssigned: null,
          priority: false
        }
      ],
      style: {
        backgroundColor: '#dae1e7',
        color: '#000000'
      }
    },
    {
      name: 'done',
      tasks: [
        {
          description: '',
          name: 'first task',
          id: uuid(),
          userAssigned: null,
          priority: false
        }
      ],
      style: {
        backgroundColor: '#dae1e7',
        color: '#000000'
      }
    }
  ]
}
