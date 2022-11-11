import { Router } from 'express'
import { completeTask, createTask, deleteTask, getAllTasks, getTask, uncompleteTask, updateTask } from '../controllers/Tasks.controller.js'
const TaskRoutes = Router()

TaskRoutes.get('/test', (req, res) => {
    return res.json({ data: "Task Test Route" })
})

TaskRoutes.get('/all', getAllTasks)
TaskRoutes.get('/:taskid', getTask)

TaskRoutes.post('/create', createTask)
TaskRoutes.post('/update', updateTask)

TaskRoutes.get('/:taskid/complete', completeTask)
TaskRoutes.get('/:taskid/uncomplete', uncompleteTask)
TaskRoutes.get('/:taskid/delete', deleteTask)


export default TaskRoutes