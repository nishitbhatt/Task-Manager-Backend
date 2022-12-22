import SectionModel from '../models/Section.js';
import TagsModel from '../models/Tags.js';
import TaskModel from '../models/Task.js';

// Task
export { markTaskCompleteById, markTaskUncompleteById, getAllTaskList, createNewTask, editTaskById, removeTaskById, getTaskById } from './services/tasks.service.js'

// Section
export { createSection, editSectionById, getAllSectionList, removeSectionById } from './services/section.service.js'

// List
export { createList, editListById, getAllListOfTasks, removeListById } from './services/lists.service.js'

// Tags
export { createTags, editTagsById, getAllTagsOfTasks, removeTagsById } from './services/tags.service.js'


// User Tak Meta
export const getInitialUserTasks = async (req, res) => {
    let status = 404, data = []
    const userid = req.user.user_id

    try {
        const filter = { userid, list: { $exists: false } }
        const sections = await SectionModel.find(filter);
        const tasks = await TaskModel.find(filter).populate({ path: 'section', select: 'name' }).populate({ path: 'tags', select: 'name' });;
        const tags = await TagsModel.find({ userid });

        status = 200;
        data = { tasks, sections, tags };
    } catch (error) {
        status = 500;
        data = { error };
    }
    return res.status(status).json({ status, data });
}