import { Model } from "mongoose";
import { SectionModel, TaskModel } from "../../models/index.js"

export const markTaskCompleteById = async (req, res) => {
    const userid = req.user.user_id
    let status = 404, message = 'Task not found!', data = { message }, completed = true;
    const { taskid } = req.params

    try {

        if (taskid) {
            const queryRecord = await TaskModel.updateOne({ '_id': taskid, userid }, { completed })
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

export const markTaskUncompleteById = async (req, res) => {
    const userid = req.user.user_id
    let status = 404, message = 'Task not found!', data = { message }, completed = false;
    const { taskid } = req.params
    try {

        if (taskid) {
            const queryRecord = await TaskModel.updateOne({ '_id': taskid, userid }, { completed })
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

export const getAllTaskList = async (req, res) => {
    let status = 404, data = []
    const userid = req.user.user_id

    try {

        const queryRecord = await TaskModel.find({ userid })
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
    const { title, description, duedate, completed, sectionid, priority, listid, parentid, tags } = req.body

    try {

        if (title) {

            const queryRecord = await new TaskModel({
                title,
                description,
                duedate,
                completed,
                priority,
                section: sectionid,
                tags,
                listid,
                parentid,
                userid
            }).save()

            if (queryRecord) {
                status = 200;
                data = queryRecord;
            }
        }
    } catch (error) {
        status = 500;
        data = { error };
        console.log({ error })
    }
    return res.status(status).json({ status, data });
}

export const editTaskById = async (req, res) => {
    let status = 404, message = 'Title and task id are required!', data = { message };
    const { taskid } = req.params
    const userid = req.user.user_id
    const { title, description, duedate, completed, section: sectionId, priority, listid, parentid, tags } = req.body

    try {

        if (taskid && title) {
            // const queryRecord = await TaskModel
            //     .findOneAndUpdate({ userid, '_id': taskid }, { title, description, duedate, completed, section, priority, listid, parentid, tagsids })

            const queryRecord = await TaskModel
                .findOneAndUpdate({ userid, '_id': taskid }, { title, description, duedate, completed, section: sectionId, priority, listid, parentid, tags })

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
    const { taskid } = req.params

    try {

        const queryRecord = await TaskModel.findById({ taskid, userid })
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
