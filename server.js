const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

/* DATABASE CONNECTION */

mongoose.connect("mongodb://127.0.0.1:27017/studentDB")
.then(() => console.log("MongoDB Connected Successfully"))
.catch((err) => console.log(err));

/* STUDENT SCHEMA */

const studentSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    course: {
        type: String,
        required: true
    },

    mobile: {
        type: String,
        required: true
    }

});

/* MODEL */

const Student = mongoose.model("Student", studentSchema);

/* HOME ROUTE */

app.get("/", (req, res) => {
    res.send("Student Management System API Running");
});

/* ADD STUDENT */

app.post("/students", async (req, res) => {

    try {

        const student = new Student(req.body);

        await student.save();

        res.status(201).json({
            success: true,
            message: "Student Added Successfully",
            student
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

});

/* GET ALL STUDENTS */

app.get("/students", async (req, res) => {

    try {

        const students = await Student.find();

        res.json(students);

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

});

/* SERVER */

app.listen(3000, () => {
    console.log("Server running on port 3000");
});