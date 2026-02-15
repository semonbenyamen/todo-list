require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");


const User = require("./models/User");

const app = express();
const bcrypt = require("bcrypt");
const Product = require("./models/Product");
app.use(express.json());

const mongo_url = process.env.DB_URL;
async function dbconnection() {
    try {
        await mongoose.connect(mongo_url);
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