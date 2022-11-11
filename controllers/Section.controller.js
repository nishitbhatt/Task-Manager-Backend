import SectionModel from "../models/Sections.model.js";

export const test = (req, res) => {
    status = 200;
    message = "Test API";
    data = [];
    return res.status(status).json({ status, message, data })
}

export const fetchAllSection = async (req, res) => {
    let status, message, data;
    try {
        const allTodos = await SectionModel.find();
        if (allTodos) {
            status = 200;
            message = "Recored Found!";
            data = allTodos;
        }
    } catch (error) {
        status = 404;
        message = "Error : " + error;
        data = null;
    }
    return res.status(status).json({ status, message, data });
}

export const createSection = async (req, res) => {
    let status;
    let message;
    let data = [];

    if (req.body.NewSection) {

        try {
            const newSection = new SectionModel({
                "name": req.body.NewSection,
            });
            const newSectionInserted = await newSection.save();
            if (newSectionInserted) {
                status = 200;
                message = "Recored Created!";
                data = newSection;
            }
        } catch (error) {
            status = 404;
            message = 'Error : ' + error;
        }
    } else {
        status = 404;
        message = "No name given";
    }
    return res.status(status).json({ status, message, data });
}


export const deleteSection = async (req, res) => {
    let status, message, data;


    const SectionRecord = await SectionModel.findByIdAndRemove(req.params.sectionid)
    const TaskRecord = await TaskModel.updateMany({ sectionid: req.params.sectionid }, { sectionid: '0' })
    if (SectionRecord && TaskRecord) {
        data = SectionRecord;
        status = 200;
        message = "Recored Deleted " + req.params.sectionid;
        return res.status(status).json({ status, message, data });
    } else {
        status = 404;
        message = "Something went wrong! " + req.params.sectionid;
    }
    return res.status(status).json({ status, message, data });
}


export const updateSection = async (req, res) => {
    let status, message, data;
    await SectionModel.findByIdAndUpdate(req.body.SectionId,
        {
            "name": req.body.SectionName,
        },
    ).then((SectionRecord) => {
        if (SectionRecord) {
            status = 200;
            message = "Task updated " + req.body.SectionId;
            data = SectionRecord;
        } else {
            status = 404;
            message = "Task not found with id " + req.body.SectionId;
        }
        return res.status(status).json({ status, message, data });
    }).catch((err) => {
        if (err.kind === "ObjectId") {
            status = 404;
            message = "Task not found with id " + req.body.SectionId;
        } else {
            status = 500;
            message = "Error updating Task with id " + req.body.SectionId;
        }
        return res.status(status).json({ status, message, data });
    });
}
