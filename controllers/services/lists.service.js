import { ListModel, TaskModel } from "../../models/index.js";


export const getAllListOfTasks = async (req, res) => {
    let status = 404, data = [];
    const userid = req.user.user_id

    const queryRecord = await ListModel.find({ userid });
    if (queryRecord) {
        data = queryRecord;
        status = 200;
    }
    return res.status(status).json({ status, data });
}

export const createList = async (req, res) => {
    let status = 404, data = [];
    const userid = req.user.user_id
    const { name } = req.body

    if (name) {
        const queryRecord = await new ListModel({ name, userid }).save();
        if (queryRecord) {
            data = queryRecord;
            status = 200;
        }
    }
    return res.status(status).json({ status, data });
}


export const removeListById = async (req, res) => {
    let status = 404, data;
    const userid = req.user.user_id
    const { listid } = req.params

    if (listid) {

        const queryRecord = await ListModel.findOneAndRemove({ listid, userid })
        const taskQueryRecord = await TaskModel.updateOne({ listid, userid }, { listid: '0' })
        if (queryRecord && taskQueryRecord) {
            status = 200;
            data = queryRecord;
        }
    }
    return res.status(status).json({ status, data });
}


export const editListById = async (req, res) => {
    let status = 404, data;
    const userid = req.user.user_id
    const { listid } = req.params
    const { name } = req.body

    if (listid && name) {

        const queryRecord = await ListModel.findByIdAndUpdate({ listid, userid }, { name })

        if (queryRecord) {
            status = 200;
            data = queryRecord
        }
    }
    return res.status(status).json({ status, data });
}
