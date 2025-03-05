// Modules
import express from "express";

// Utils
import readFile from "../Utils/readFile.js";
import writeFile from "../Utils/writeFile.js";

// db
import { TASKS_FILE } from "../app.js";

// Router
export const subtasksRouter = express.Router();



// Add subtask to your task
// Parent task's id - taskID is required
subtasksRouter.post("/:taskID", async (req, res) => {
    const { taskID } = req.params;
    try {
        const data = await readFile(TASKS_FILE);

        // Get task, which has heading equal to taskID
        const task = data.filter(task => task.heading === taskID);
        console.log(task)

        res.status(200).json(data)
    } catch (e) {
        return res.status(400).send(`Error on request: ${e}`)
    }
})