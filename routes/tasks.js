import { Router } from 'express'
import { completeTask, createTask, deleteTask, getAllTasks, getTask, uncompleteTask, updateTask } from '../controllers/Tasks.controller.js'

const routes = Router()

routes.get('/test', (req, res) => {
    return res.json({ data: "Task Test Route" })
})

routes.get('/', getAllTasks)
routes.get('/:taskid', getTask)

routes.post('/create', createTask)
routes.post('/update', updateTask)

routes.get('/:taskid/complete', completeTask)
routes.get('/:taskid/uncomplete', uncompleteTask)
routes.get('/:taskid/delete', deleteTask)


export default routes