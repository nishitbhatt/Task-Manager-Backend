import mongoose, { Types } from 'mongoose'
import { TagsSchema } from './Tags.js';

const TasksSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, default: '' },
    duedate: { type: String, default: '' },
    priority: { type: Number, default: 0 },
    completed: { type: Boolean, default: false },
    section: {
        type: Types.ObjectId,
        ref: 'section',
    },
    list: {
        type: Types.ObjectId,
        ref: 'list',
    },
    parentid: { type: Types.ObjectId },
    // tags: [TagsSchema],
    tags: [{
        type: Types.ObjectId,
        ref: 'tags',
    }],
    userid: { type: Types.ObjectId, require: true },
}, {
    timestamps: true, versionKey: false,
});

const TaskModel = mongoose.model('task', TasksSchema);

export default TaskModel