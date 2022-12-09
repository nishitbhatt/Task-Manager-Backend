import mongoose from 'mongoose'

const TasksSchema = new mongoose.Schema({
    title: String,
    description: String,
    duedate: String,
    priority: Number,
    sectionid: String,
    listid: String,
    parentid: String,
    completed: Boolean,
    tagsids: String,
    userid: String,
}, {
    timestamps: true, versionKey: false
});


const TasksModel = mongoose.model('tasks', TasksSchema);

export default TasksModel