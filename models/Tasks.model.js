import mongoose from 'mongoose'

const TasksSchema = new mongoose.Schema({
    title: String,
    description: String,
    duedate: String,
    sectionid: String,
    completed: Boolean,
    priority: Number
});


const TasksModel = new mongoose.model('tasks', TasksSchema);

export default TasksModel