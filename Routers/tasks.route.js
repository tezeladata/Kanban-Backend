// Modules
import express from "express";

// Utils
import readFile from "../Utils/readFile.js";
import writeFile from "../Utils/writeFile.js";

// db
import { TASKS_FILE } from "../app.js";

// Router
export const tasksRouter = express.Router();

// Routes
tasksRouter.get("/", async (req, res) => {
    try {
        const data = await readFile(TASKS_FILE);
        
        res.status(200).json(data)
    } catch(e) {
        return res.status(400).send("Error on request:", e)
    }
})

tasksRouter.get("/:id", async (req, res) => {
    const heading = req.params.id;
    try {
        const data = await readFile(TASKS_FILE);

        // Item
        const item = data.filter(task => task.heading === heading);

        // Item does not exist
        if (item.length === 0) {
            return res.status(204).send("Task does not exist")
        }

        res.status(200).json(item)
    } catch(e) {
        return res.status(400).send("Error on request:", e)
    }
})

tasksRouter.post("/", async (req, res) => {
    // board, column, heading, description and currentStatus are required for task to have. subtasks will first be set to 0 and []. They will be changed in future by client
    const { board, column, heading, description } = req.body;
    const currentStatus = req.body["current status"];

    try {
        const data = await readFile(TASKS_FILE);

        // Generate new task
        const newTask = {board, column, heading, description, "current status": currentStatus, "subtasks count": 0, "number of completed subtasks": 0, "subtasks": []};

        // Check if task already exists in database with same heading
        const checked = data.filter(task => task.heading === newTask.heading);
        if (checked.length !== 0) {
            return res.status(403).send("Task already exists with same heading")
        }
        
        // Add new task to array
        data.push(newTask);

        // save data to json file
        await writeFile(TASKS_FILE, data);

        res.status(200).send("New task added to database successfully");
    } catch(e) {
        return res.status(400).send("Error on request:", e)
    }
})