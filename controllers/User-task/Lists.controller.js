import { ListsModel, SectionModel, TasksModel } from "./../../models/index.js";

export const test = (req, res) => {
    status = 200;
    message = "Test API";
    data = [];
    return res.status(status).json({ status, message, data })
}

export const fetchAllTaskListsList = async (req, res) => {
    let status = 404, data;
    try {
        const TaskListsList = await ListsModel.find();
        if (allTodos) {
            status = 200;
            data = TaskListsList;
        }
        return res.status(status).json({ status, data });
    } catch (error) {
        status = 404;
        return res.status(status).json({ status, error });
    }
}

export const createNewTaskList = async (req, res) => {
    let status = 404, data;

    const { list_name: name } = req.body
    if (name) {

        try {
            const NewList = await new ListsModel({ name }).save();
            if (NewList) {
                status = 200;
                data = NewList;
            }
            return res.status(status).json({ status, data });
        } catch (error) {
            status = 500
            return res.status(status).json({ status, error });
        }
    }
}


export const removeTaskListById = async (req, res) => {
    let status = 404, data;

    const { listid } = req.params
    try {
        if (sectionid) {
            const ListRecord = await ListsModel.findByIdAndRemove(listid)
            const SectionRecord = await SectionModel.findByIdAndRemove(listid)
            const TaskRecord = await TasksModel.updateMany({ sectionid, listid }, { sectionid: '0', listid: '0' }).where('')
            if (ListRecord && TaskRecord && SectionRecord) {
                status = 200;
                data = ListRecord;
            }
        }
        return res.status(status).json({ status, data });
    } catch (error) {
        status = 500
        return res.status(status).json({ status, error });
    }
}


export const editTaskListById = async (req, res) => {
    let status = 404, data;

    const { listid } = req.params
    const { list_name: name } = req.body
    try {
        const ListRecord = await ListsModel.findByIdAndUpdate(listid, { name })

        if (ListRecord) {
            status = 200;
            data = ListRecord;
        }
        return res.status(status).json({ status, data });
    } catch (error) {
        status = 500
        return res.status(status).json({ status, data })
    }
}
