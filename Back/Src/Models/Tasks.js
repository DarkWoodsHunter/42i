//Defining the Model of Tasks, so it can be used with MongoDB
const { Schema, model } = require("mongoose")

const TaskSchema = new Schema({
    Tittle: {
        type: String,
        require: true,
    },
    Description: {
        type: String,
        require: true,
    },
    Status: {
        type: String,
        require: true,
    },
    Priority: {
        type: String,
        require: false,
    },
    Estimate: {
        type: Number,
        require: false,
    },
    CreationDate: {
        type: Date,
        default: () => { return new Date()},
    },
    LastUpdateDate: {
        type: String,
        default: "",
    },
    SubTask: [{
        Status: {
            type: String,
            require: true,
        },
        Estimate: {
            type: Number,
            require: true,
        }
    }]
})

module.exports = model("Tasks", TaskSchema)