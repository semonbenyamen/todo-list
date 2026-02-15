require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());
const mongoose = require("mongoose");

const Task = require("./models/Task");

async function dbconnection() {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/firstApp");
        console.log("MongoDB connected successfully");
    } catch (err) {
        console.error("MongoDB connection error:", err);
    }
}
dbconnection();


const Task= require("./models/Task")

////sec step //POST Route
app.post('/api/tasks', async (req, res) => {
    try {
        const task= await Task.create(req.body);
        res.json({
            success:true,
            msg:"created task successfully",
            data:task,
        })
    } catch (error) {
        res.json({success: false, error: error.message });
    }
});

//third step // GET Route
app.get('/api/tasks', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json({
             success: true,
             data: tasks,
        });
    } catch (error) {
        res.json({ success: false, error: error.message });
    }
});




const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("Server is running");
});