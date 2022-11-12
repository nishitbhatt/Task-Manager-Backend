import TasksModel from "../models/Tasks.model.js";


export const getAllTasks = async (req, res) => {
    try {
        let status, data;
        console.log({users: req.user})
        const allTodos = await TasksModel.find();
        if (allTodos) {
            status = 200;
            data = allTodos;
        } else {
            status = 404;
            data = allTodos;
        }
        return res.status(status).json({ status, data });
    } catch (error) {
        const status = 500;
        return res.status(status).json({ status, error });
    }
}

export const createTask = async (req, res) => {
    let status;
    let data = [];

    const { NewTaskTitle, NewTaskDescription, NewTaskDueDate, NewTaskCompleted, NewTaskSection, NewTaskPriority } = req.body

    if (NewTaskTitle) {
        try {
            const isNewTaskInserted = await new TasksModel({
                "title": NewTaskTitle,
                "description": NewTaskDescription,
                "duedate": NewTaskDueDate,
                "completed": NewTaskCompleted,
                "sectionid": NewTaskSection,
                "priority": NewTaskPriority,
            }).save();

            if (isNewTaskInserted) {
                status = 200;
                data = isNewTaskInserted;
            }
            return res.status(status).json({ status, data });
        } catch (error) {
            const status = 500;
            return res.status(status).json({ status, error });
        }
    }
}

export const updateTask = async (req, res) => {
    let status, message, data;
    await TasksModel.findByIdAndUpdate(req.body.TaskId,
        {
            "title": req.body.TaskTitle,
            "description": req.body.TaskDescription,
            "duedate": req.body.TaskDueDate,
            "completed": req.body.TaskCompleted,
            "sectionid": req.body.TaskSectionId,
            "priority": req.body.TaskPriority,
        },
    ).then((TaskRecord) => {
        if (TaskRecord) {
            status = 200;
            message = "Task updated " + req.body.TaskId;
            data = TaskRecord;
        } else {
            status = 404;
            message = "Task not found with id " + req.body.TaskId;
        }
        return res.status(status).json({ status, message, data });
    }).catch((err) => {
        if (err.kind === "ObjectId") {
            status = 404;
            message = "Task not found with id " + req.body.TaskId;
        } else {
            status = 500;
            message = "Error updating Task with id " + req.body.TaskId;
        }
        return res.status(status).json({ status, message, data });
    });
}

export const completeTask = async (req, res) => {
    let status, message, data;
    await TasksModel.findByIdAndUpdate(req.params.taskid,
        {
            completed: true
        },
    ).then((TodoRecord) => {
        if (TodoRecord) {
            status = 200;
            message = "Task updated " + req.params.taskid;
            data = TodoRecord;
        } else {
            status = 404;
            message = "Task not found with id " + req.params.taskid;
        }
        return res.status(status).json({ status, message, data });
    }).catch((err) => {
        if (err.kind === "ObjectId") {
            status = 404;
            message = "Task not found with id " + req.params.taskid;
        } else {
            status = 500;
            message = "Error updating Task with id " + req.params.taskid;
        }
        return res.status(status).json({ status, message, data });
    });
}

export const deleteTask = async (req, res) => {
    let status, message, data;
    const TaskRecord = await TasksModel.findByIdAndRemove(req.params.taskid)
    if (TaskRecord) {
        data = TaskRecord;
        status = 200;
        message = "Task Deleted " + req.params.taskid;
        return res.status(status).json({ status, message, data });
    } else {
        status = 404;
        message = "Something went wrong! " + req.params.taskid;
    }
    return res.status(status).json({ status, message, data });
}

export const uncompleteTask = (req, res) => {
    let status, message, data;
    TasksModel.findByIdAndUpdate(req.params.taskid,
        {
            completed: false
        },
    ).then((TodoRecord) => {
        if (TodoRecord) {
            status = 200;
            message = "Task updated " + req.params.taskid;
            data = TodoRecord;
        } else {
            status = 404;
            message = "Task not found with id " + req.params.taskid;
        }
        return res.status(status).json({ status, message, data });
    }).catch((err) => {
        if (err.kind === "ObjectId") {
            status = 404;
            message = "Task not found with id " + req.params.taskid;
        } else {
            status = 500;
            message = "Error updating Task with id " + req.params.taskid;
        }
        return res.status(status).json({ status, message, data });
    });
}

export const getTask = async (req, res) => {
    let status, message, data;
    try {
        const TaskRecord = await TasksModel.findById(req.params.taskid)
        if (TaskRecord) {
            status = 200;
            message = "Task updated " + req.params.taskid;
            data = TaskRecord;
        } else {
            status = 404;
            message = "Task Not Found " + req.params.taskid;
        }
    } catch (err) {
        console.log('error', err)
        return res.status(200).json({ asd: "asdads" });
    }
    return res.status(status).json({ status, message, data });
}

// Demo Method
export const test = (req, res) => {
    return res.json({ data: "This is task test API" })
}