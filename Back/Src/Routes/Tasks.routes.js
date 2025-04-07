const { Router } = require("express");
const { getAllTaks, findTaskByID, CreateNewTask, EditTask, DeleteTask } = require("../Controllers/TasksControllers");
const router = Router();

//All routes send a 200 message if succesul or the corresponding error if not
//Routing to "/", to get All tasks or get an specific one if an ID is provided
router.get("/", async (req, res) => {
    try {
        const AllTasks = await getAllTaks();
        const { id } = req.query;
        if (id != undefined) {
            try{
                const taskID = await findTaskByID(id);
            res.status(200).send(taskID);
            } catch(error) {
                res.status(404).send("Task not found")
            }
        }
        else if (AllTasks.length > 0) {
            res.status(200).send(AllTasks)
        } else {
            res.status(404).send("No Tasks Found")
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})

//Post route for creating a New Task
router.post("/AddTask", async (req, res) => {
    const { Tittle, Description, Status, Priority, Estimate, SubTask } = req.body;
    try {
        await CreateNewTask(Tittle, Description, Status, Priority, Estimate, SubTask);
        res.status(200).status("Task added");
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

//Put route to edit a task.
router.put("/edit/:id", async (req, res) => {
    const { id } = req.params;
    const {Tittle, Description, Status, Priority, Estimate, CreationDate, LastUpdateDate, SubTask} = req.body;
    try {
        await EditTask (id, Tittle, Description, Status, Priority, Estimate, CreationDate, LastUpdateDate, SubTask);
        res.status(200).send("The task has been added")
    } catch (error) {
        res.status(400).json({ error: error.message})
    }
})

//Delete route to delete a task
router.delete("/delete/:id", async (req, res) => {
    const {id} = req.params;
    try {
        await DeleteTask(id);
        res.status(200).send("The Task has been Deleted")
    } catch (error){
        res.status(400).send(error)
    }
})

module.exports = router;