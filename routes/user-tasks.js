import { Router } from 'express'
import { createNewTask, editTaskById, getAllTaskList, getTaskById, markCompleteTaskById, markUncompleteTaskById, removeTaskById } from '../controllers/User-task/Tasks.controller.js'
import { createNewSection, editSectionById, fetchAllSectionList, removeSectionById } from '../controllers/User-task/Section.controller.js'
import { createNewTaskList, editTaskListById, fetchAllTaskListsList, removeTaskListById } from '../controllers/User-task/Lists.controller.js'


const routes = Router()

// User Tasks Routes
routes.get('/task/:taskid/mark-complete', markCompleteTaskById)
routes.get('/task/:taskid/mark-uncomplete', markUncompleteTaskById)
routes.get('/task/', getAllTaskList)
routes.get('/task/:taskid', getTaskById)
routes.post('/task/create', createNewTask)
routes.post('/task/:taskid/edit', editTaskById)
routes.post('/task/:taskid/delete', removeTaskById)


// User Task Section Routes
routes.get('/section/', fetchAllSectionList)
routes.post('/section/create', createNewSection)
routes.post('/section/:sectionid/delete', removeSectionById)
routes.post('/section/:sectionid/edit', editSectionById)


// User Task List Routes
routes.get('/list/', fetchAllTaskListsList)
routes.post('/list/create', createNewTaskList)
routes.get('/list/:listid/delete', removeTaskListById)
routes.post('/list/:listid/edit', editTaskListById)

export default routes