import { SectionModel, TaskModel } from "../../models/index.js";

export const getAllSectionList = async (req, res) => {
    let status = 404, data = [];
    const userid = req.user.user_id

    const queryRecord = await SectionModel.find({ userid });
    if (queryRecord) {
        data = queryRecord;
        status = 200;
    }
    return res.status(status).json({ status, data });
}

export const createSection = async (req, res) => {
    let status = 404, message = 'Name and list are required!', data = { message };
    const userid = req.user.user_id
    const { name, list } = req.body

    try {
        if (name) {
            const queryRecord = await new SectionModel({ name, list, userid }).save();

            if (queryRecord) {
                data = queryRecord;
                status = 200;
            }
        }
        
    } catch (error) {
        status = 500;
        data = { error };
    }
    return res.status(status).json({ status, data });
}


export const removeSectionById = async (req, res) => {
    let status = 404, data;
    const userid = req.user.user_id
    const { sectionid } = req.params

    if (sectionid) {

        const queryRecord = await SectionModel.findOneAndRemove({ '_id': sectionid, userid })
        const taskQueryRecord = await TaskModel.update({ userid, section: sectionid }, { $unset: { section: sectionid } })
        if (queryRecord && taskQueryRecord) {
            status = 200;
            data = queryRecord;
        }
    }
    return res.status(status).json({ status, data });
}


export const editSectionById = async (req, res) => {
    let status = 404, data;
    const userid = req.user.user_id
    const { sectionid } = req.params
    const { name } = req.body

    if (sectionid && name) {

        const queryRecord = await SectionModel.findByIdAndUpdate({ '_id': sectionid, userid }, { name })

        if (queryRecord) {
            status = 200;
            data = queryRecord
        }
    }
    return res.status(status).json({ status, data });
}
