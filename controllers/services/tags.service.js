import { TagsModel, TaskModel } from "../../models/index.js";


export const getAllTagsOfTasks = async (req, res) => {
    let status = 404, message = 'No tags found!', data = { message };
    const userid = req.user.user_id

    const queryRecord = await TagsModel.find({ userid });
    if (queryRecord) {
        data = queryRecord;
        status = 200;
    }
    return res.status(status).json({ status, data });
}

export const createTags = async (req, res) => {
    let status = 404, message = 'Tag name is required!', data = { message };
    const userid = req.user.user_id
    const { name } = req.body

    if (name) {
        const queryRecord = await new TagsModel({ name, userid }).save();
        if (queryRecord) {
            data = queryRecord;
            status = 200;
        }
    }
    return res.status(status).json({ status, data });
}


export const removeTagsById = async (req, res) => {
    let status = 404, message = 'Tag id is required!', data = { message };
    const userid = req.user.user_id
    const { tagid } = req.params
    try {

        if (tagid) {

            const queryRecord = await TagsModel.findOneAndRemove({ '_id': tagid, userid })

            const taskQueryRecord = await TaskModel.update({
                userid, tags:
                    { "$elemMatch": { "_id": tagid } }
            }, {
                $pullAll: { tags: [tagid] }
            })            

            if (queryRecord) {
                status = 200;
                data = queryRecord;
            }
        }
    } catch (error) {
        status = 500;
        data = { error };
        console.log({error});
    }
    return res.status(status).json({ status, data });
}


export const editTagsById = async (req, res) => {
    let status = 404, message = 'Tag id and name are required!', data = { message };
    const userid = req.user.user_id
    const { tagid: _id } = req.params
    const { name } = req.body

    if (_id && name) {

        const queryRecord = await TagsModel.updateOne({ _id, userid }, { name })

        if (queryRecord) {
            status = 200;
            data = queryRecord
        }
    }
    return res.status(status).json({ status, data });
}
