const Task = require("../Models/Tasks.js")


//Find All tasks in the DB
const getAllTaks = async () => {
    try {
        return await Task.find();
    } catch (error) {
        console.log(error)
    }
}

//Find a Single Task By ID
const findTaskByID = async (id) => {
    try {
        return await Task.findById(id).exec();
    } catch (error) {
        console.log(error);
    }
}

//Create a New Task with the following elements [Tittle, Description, Status, Priority, Estimate, SubTask]
const CreateNewTask = async (Tittle, Description, Status, Priority, Estimate, SubTask) => {
    try {
        return await Task.create({ Tittle, Description, Status, Priority, Estimate, SubTask })
    } catch (error) {
        console.log(error);
    }
}

//Edit an existing Task
const EditTask = async (id, Tittle, Description, Status, Priority, Estimate, CreationDate, LastUpdateDate, SubTask) => {
    try {
        return await Task.findByIdAndUpdate(id, { Tittle, Description, Status, Priority, Estimate, CreationDate, LastUpdateDate, SubTask })
    } catch (error) {
        console.log(error)
    }
}

//Delete a Task
const DeleteTask = async (id) => {
    try {
        return await Task.findByIdAndDelete(id);
    } catch (error) {
        console.log(error)
    }
}

module.exports = { getAllTaks, findTaskByID, CreateNewTask, EditTask, DeleteTask }