import { TasksModel } from "./../../models/index.js";

export const getAllTaskList = async (req, res) => {
    let status = 404, data;
    try {

        const allTaskList = await TasksModel.find();
        if (allTaskList) {
            status = 200;
            data = allTaskList;
        }
        return res.status(status).json({ status, data });
    } catch (error) {
        status = 500;
        return res.status(status).json({ status, error });
    }
}

export const createNewTask = async (req, res) => {
    let status = 404;
    let data = [];

    const { title, description, duedate, completed, sectionid, priority, listid, parentid, tagsids, user } = req.body

    if (req.user.user_id && title) {
        try {
            const NewTaskRecord = await new TasksModel({
                title,
                description,
                duedate,
                completed,
                sectionid,
                priority,
                listid,
                parentid,
                tagsids,
                userid: req.user.user_id
            }).save();

            if (NewTaskRecord) {
                status = 200;
                data = NewTaskRecord;
            }
            return res.status(status).json({ status, data });
        } catch (error) {
            const status = 500;
           
            return res.status(status).json({ status, error });
        }
    }
}

export const editTaskById = async (req, res) => {
    let status = 404, data;

    const { taskid } = req.params
    const { title, description, duedate, completed, sectionid, priority, listid, parentid, tagsids } = req.body
    try {
        if (taskid && title) {
            const UpdatedTask = await TasksModel
                .findByIdAndUpdate(taskid, { title, description, duedate, completed, sectionid, priority, listid, parentid, tagsids })

            if (UpdatedTask) {
                status = 200;
                data = UpdatedTask;
            }
        }
        return res.status(status).json({ status, data });

    } catch (error) {
        status = 500;
        return res.status(status).json({ status, error });
    }
}

export const markCompleteTaskById = async (req, res) => {
    let status = 404, data, completed = true;

    const { taskid } = req.params

    try {
        if (taskid) {
            const UpdatedTask = await TasksModel.findByIdAndUpdate(taskid, { completed })
            if (UpdatedTask) {
                status = 200;
                data = UpdatedTask;
            }
        }
        return res.status(status).json({ status, data });

    } catch (error) {
        status = 500;
        return res.status(status).json({ status, error });
    }
}

export const removeTaskById = async (req, res) => {
    let status = 404, data;
    const { taskid } = req.params

    try {
        const TaskRecord = await TasksModel.findByIdAndRemove(taskid)
        if (TaskRecord) {
            data = TaskRecord;
            status = 200;
        }
        return res.status(status).json({ status, data });
    } catch (error) {
        status = 500
        return res.status(status).json({ status, error });
    }
}

export const markUncompleteTaskById = async (req, res) => {

    let status = 404, data, completed = false;
    const { taskid } = req.params

    try {
        if (taskid) {
            const UpdatedTask = await TasksModel.findByIdAndUpdate(taskid, { completed })
            if (UpdatedTask) {
                status = 200;
                data = UpdatedTask;
            }
        }
        return res.status(status).json({ status, data });

    } catch (error) {
        status = 500;
        return res.status(status).json({ status, error });
    }
}

export const getTaskById = async (req, res) => {
    let status = 404, data;
    try {
        const { taskid } = req.params
        const TaskRecord = await TasksModel.findById(taskid)
        if (TaskRecord) {
            status = 200;
            data = TaskRecord;
        }
        return res.status(status).json({ status, data });
    } catch (error) {
        status = 500
        return res.status(status).json({ status, error });
    }
}

// Demo Method
export const test = (req, res) => {
    return res.json({ data: "This is task test API" })
}