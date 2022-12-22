import { Router } from 'express'
import { createTags, editTagsById, getAllTagsOfTasks, removeTagsById } from '../controllers/services/tags.service.js'

import { createList, createNewTask, createSection, editListById, editSectionById, editTaskById, getAllListOfTasks, getAllSectionList, getAllTaskList, getInitialUserTasks, getTaskById, markTaskCompleteById, markTaskUncompleteById, removeListById, removeSectionById, removeTaskById } from '../controllers/userTasksController.js'

const routes = Router()

// User Tasks Routes
routes.post('/mark-task-complete/:taskid', markTaskCompleteById)
routes.post('/mark-task-uncomplete/:taskid', markTaskUncompleteById)
routes.get('/get-all-tasks', getAllTaskList)
routes.get('/get-task/:taskid', getTaskById)
routes.post('/create-task', createNewTask)
routes.post('/edit-task/:taskid', editTaskById)
routes.post('/delete-task/:taskid', removeTaskById)


// User Task Section Routes
routes.get('/get-all-sections', getAllSectionList)
routes.post('/create-section', createSection)
routes.post('/delete-section/:sectionid', removeSectionById)
routes.post('/edit-section/:sectionid', editSectionById)


// User Task List Routes
routes.get('/get-all-lists', getAllListOfTasks)
routes.post('/create-list', createList)
routes.post('/delete-list/:listid', removeListById)
routes.post('/edit-list/:listid', editListById)

// User Task Tags Routes
routes.get('/get-all-tags', getAllTagsOfTasks)
routes.post('/create-tag', createTags)
routes.post('/delete-tag/:tagid', removeTagsById)
routes.post('/edit-tag/:tagid', editTagsById)

// User TAsk META
routes.get('/get-initial-task-bundle', getInitialUserTasks)
export default routes