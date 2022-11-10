// const TodoModel = require('../models/todo.model');
// import TodoModel from "../models/todo.model"

// Demo Method
exports.demoMethods = (req, res) => {
    // res.send('Todo Home Page')
}

// Create New Todo
exports.createNewTodo = async (req, res) => {
    // let status, message, data = [];
    // console.log(req.body)
    // if (req.body.title) {

    //     try {
    //         const newTodo = new TodoModel({
    //             "title": req.body.title,
    //             "note": req.body.note,
    //             "status": req.body.status,
    //             "price": req.body.price
    //         });
    //         const todoInserted = await newTodo.save();
    //         if(todoInserted){
    //             status = 200;
    //             message = "Recored Created!";
    //             data = newTodo;
    //         }
    //     } catch (error) {
    //         status = 404;
    //         message = 'Error : ' + error;
    //     }
    // } else {
    //     status = 404;
    //     message = "No title given";
    // }
    // res.status(status).json({ status, message, data });
}

// Get All Todos
exports.getAllTodos =  (req, res) => {
    // console.log('/////////////////////')
    // let status, message, data;
    // try {
    //     console.log('try')
    //     const allTodos = await TodoModel.find();
    //     console.log('allTodos', allTodos)
    //     if (allTodos) {
    //         status = 200;
    //         message = "Recored Found!";
    //         data = allTodos;
    //     }
    // } catch (error) {
    //     console.log('catch')
    //     status = 404;
    //     message = "Error : " + error;
    //     data = null;
    // }
    // res.status(status).json({ status, message, data });
}


// Find Single Todo
exports.findOne = (req, res) => {
    // let status, message, data;
    // TodoModel.findById(req.params.todoId)
    //     .then((TodoRecord) => {
    //         if (TodoRecord) {
    //             status = 200;
    //             message = "Task found";
    //             data = TodoRecord;
    //         } else {
    //             status = 404;
    //             message = "Task not found with id " + req.params.todoId;
    //         }
    //         console.log('TodoRecord', TodoRecord)
    //         res.status(status).json({ status, message, data });
    //     })
    //     .catch((err) => {
    //         if (err.kind === "ObjectId") {
    //             status = 404;
    //             message = "Task not found with id " + req.params.todoId;
    //         } else {
    //             status = 500;
    //             message = "Error retrieving Task with id " + req.params.todoId;
    //         }
    //         res.status(status).json({ status, message, data });
    //     });
}

// Update Todo
exports.update = (req, res) => {
    // let status, message, data;
    // TodoModel.findByIdAndUpdate(req.params.todoId,
    //     {
    //         title: req.body.title,
    //         note: req.body.note,
    //         status: req.body.status,
    //         price: req.body.price
    //     },
    //     { new: true }
    // ).then((TodoRecord) => {
    //     if (TodoRecord) {
    //         status = 200;
    //         message = "Task updated " + req.params.todoId;
    //         data = TodoRecord;
    //     } else {
    //         status = 404;
    //         message = "Task not found with id " + req.params.todoId;
    //     }
    //     res.status(status).json({ status, message, data });
    // }).catch((err) => {
    //     if (err.kind === "ObjectId") {
    //         status = 404;
    //         message = "Task not found with id " + req.params.todoId;
    //     } else {
    //         status = 500;
    //         message = "Error updating Task with id " + req.params.todoId;
    //     }
    //     res.status(status).json({ status, message, data });
    // });
}

// Delete Todo
exports.delete = (req, res) => {
    // let status, message, data;
    // TodoModel.findByIdAndRemove(req.params.todoId)
    //     .then((TodoRecord) => {
    //         if (TodoRecord) {
    //             status = 200;
    //             message = "Task deleted " + req.params.todoId;
    //         } else {
    //             status = 404;
    //             message = "Task not found with id " + req.params.todoId;
    //             data = TodoRecord;
    //         }
    //         res.status(status).json({ status, message, data });
    //     })
    //     .catch((err) => {
    //         if (err.kind === "ObjectId" || err.name === "NotFound") {
    //             status = 404;
    //             message = "Task not found with id " + req.params.todoId;
    //         } else {
    //             status = 500;
    //             message = "Task not found with id " + req.params.todoId;
    //         }
    //         res.status(status).json({ status, message, data });
    //     });
}