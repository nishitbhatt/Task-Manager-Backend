import { TaskModel } from "../../models/index.js"

export const markTaskCompleteById = async (req, res) => {
    const userid = req.user.user_id
    let status = 404, message = 'Task not found!', data = { message }, completed = true;
    const { taskid: _id } = req.params

    try {

        if (_id) {
            const queryRecord = await TaskModel.updateOne({ _id, userid }, { completed })

            const newSavedTask = await TaskModel.findOne({ userid, '_id': _id }).populate({ path: 'section', select: 'name' })
                .populate({ path: 'tags', select: 'name' })
                .populate({ path: 'list', select: 'name' })

            if (queryRecord) {
                status = 200;
                data = newSavedTask;
            }
        }
    } catch (error) {
        status = 500;
        data = { error };
    }
    return res.status(status).json({ status, data });
}

export const markTaskUncompleteById = async (req, res) => {
    const userid = req.user.user_id
    let status = 404, message = 'Task not found!', data = { message }, completed = false;
    const { taskid: _id } = req.params
    try {

        if (_id) {
            const queryRecord = await TaskModel.updateOne({ _id, userid }, { completed })

            const newSavedTask = await TaskModel.findOne({ userid, '_id': _id }).populate({ path: 'section', select: 'name' })
                .populate({ path: 'tags', select: 'name' })
                .populate({ path: 'list', select: 'name' })

            if (queryRecord) {
                status = 200;
                data = newSavedTask;
            }
        }
    } catch (error) {
        status = 500;
        data = { error };
    }
    return res.status(status).json({ status, data });
}

export const getAllTaskList = async (req, res) => {
    let status = 404, data = []
    const userid = req.user.user_id

    try {

        const queryRecord = await TaskModel.find({ userid }).populate({ path: 'tags', select: 'name' }).populate({ path: 'section', select: 'name' }).populate({ path: 'list', select: 'name' })
        if (queryRecord) {
            status = 200;
            data = queryRecord;
        }
    } catch (error) {
        status = 500;
        data = { error };
    }
    return res.status(status).json({ status, data });
}

export const createNewTask = async (req, res) => {
    let status = 404, message = 'Title field is required!', data = { message };
    const userid = req.user.user_id
    const { title, description, duedate, completed, section, priority, list, parentid, tags } = req.body

    try {

        if (title) {

            const newTask = await TaskModel.create({
                title,
                description,
                duedate,
                completed,
                priority,
                section,
                list,
                parentid,
                userid
            })
            if (tags.length) {
                newTask.tags = tags
            }
            const savedTask = await newTask.save()
            const newSavedTask = await TaskModel.findOne({ userid, '_id': savedTask._id }).populate({ path: 'section', select: 'name' })
                .populate({ path: 'tags', select: 'name' })
                .populate({ path: 'list', select: 'name' })
            if (newTask) {
                status = 200;
                data = newSavedTask;
            }
        }
    } catch (error) {
        status = 500;
        data = { error };
    }
    return res.status(status).json({ status, data });
}

export const editTaskById = async (req, res) => {
    let status = 404, message = 'Title and task id are required!', data = { message };
    const { taskid } = req.params
    const userid = req.user.user_id
    const { title, description, duedate, completed, section: sectionId, priority, parentid, tags } = req.body
    try {

        if (taskid && title) {

            const queryRecord = await TaskModel
                .updateOne({ userid, '_id': taskid }, { title, description, duedate, completed, section: sectionId, tags, priority, parentid })

            if (tags.length) {
                queryRecord.tags = tags
            } else {
                delete queryRecord.tags
            }

            const editedTask = await TaskModel.findOne({ userid, '_id': taskid }).populate({ path: 'section', select: 'name' })
                .populate({ path: 'tags', select: 'name' })
                .populate({ path: 'list', select: 'name' })

            if (queryRecord) {
                status = 200;
                data = editedTask;
            }
        }
    } catch (error) {
        status = 500;
        data = { error };
    }
    return res.status(status).json({ status, data });

}

export const removeTaskById = async (req, res) => {
    let status = 404, message = 'Task id is required!', data = { message };
    const userid = req.user.user_id
    const { taskid: _id } = req.params

    try {

        const queryRecord = await TaskModel.findByIdAndRemove({ _id, userid })
        if (queryRecord) {
            data = queryRecord;
            status = 200;
        }
    } catch (error) {
        status = 500;
        data = { error };
    }
    return res.status(status).json({ status, data });
}


export const getTaskById = async (req, res) => {
    let status = 404, message = 'Task id is required!', data = { message };
    const userid = req.user.user_id
    const { taskid: _id } = req.params

    try {
        if (_id) {
            const queryRecord = await TaskModel.findById({ _id, userid })
            if (queryRecord) {
                status = 200;
                data = queryRecord;
            }
        }
    } catch (error) {
        status = 500;
        data = { error };
    }
    return res.status(status).json({ status, data });
}
