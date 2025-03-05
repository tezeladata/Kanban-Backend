// Modules
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { tasksRouter } from "./Routers/tasks.route.js";
import { subtasksRouter } from "./Routers/subtasks.route.js";

// Server and extra
const app = express();
const PORT = 3000;
export const TASKS_FILE = "./Databases/tasks.json";

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routers
app.use("/tasks", tasksRouter)
app.use("/subtasks", subtasksRouter)

// Start server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))