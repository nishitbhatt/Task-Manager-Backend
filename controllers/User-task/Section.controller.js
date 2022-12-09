import { SectionModel, TasksModel } from "./../../models/index.js";

export const test = (req, res) => {
    status = 200;
    message = "Test API";
    data = [];
    return res.status(status).json({ status, message, data })
}

export const fetchAllSectionList = async (req, res) => {
    let status = 404, data;
    try {
        const AllSectionList = await SectionModel.find();
        
        if (AllSectionList) {
            data = AllSectionList;
            status = 200;
        }
        return res.status(status).json({ status, data });
    } catch (error) {
        status = 500;
        return res.status(status).json({ status, error });
    }
}

export const createNewSection = async (req, res) => {
    let status = 404, data = [];

    const { name } = req.body

    if (name) {

        try {
            const NewSection = await new SectionModel({ name }).save();
            if (NewSection) {
                data = NewSection;
                status = 200;
            }
            return res.status(status).json({ status, data });
        } catch (error) {
            status = 404;
            return res.status(status).json({ status, error });
        }
    } else {
        status = 404;
        return res.status(status).json({ status, data });
    }
}


export const removeSectionById = async (req, res) => {
    let status = 404, data;

    const { sectionid } = req.params

    if (sectionid) {

        try {
            const SectionRecord = await SectionModel.findByIdAndRemove(sectionid)
            const TaskRecord = await TasksModel.updateMany({ sectionid }, { sectionid: '0' })
            if (SectionRecord && TaskRecord) {
                status = 200;
                data = SectionRecord;
                return res.status(status).json({ status, data });
            }
            return res.status(status).json({ status, data });

        } catch (error) {
            status = 500
            return res.status(status).json({ status, error });
        }
    }
}


export const editSectionById = async (req, res) => {
    let status = 404, data;

    const { sectionid } = req.params
    const { name } = req.body

    try {

        if (sectionid && name) {

            const UpdatedSection = await SectionModel.findByIdAndUpdate(sectionid, { name })

            if (UpdatedSection) {
                status = 200;
                data = UpdatedSection
                return res.status(status).json({ status, data });
            }
        }

    } catch (error) {
        return res.status(status).json({ status, error });
    }
}
