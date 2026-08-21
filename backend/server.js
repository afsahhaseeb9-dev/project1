const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

let users = [];

app.get("/", (req, res) => {
    res.json({
        message: "Backend API is running successfully!"
    });
});

app.get("/api/users", (req, res) => {
    res.status(200).json(users);
});

app.post("/api/users", (req, res) => {

    const { name, email } = req.body;

    if (!name || !email || !name.trim() || !email.trim()) {
    return res.status(400).json({
        message: "Name and email are required."
    });
}

    const newUser = {
        id: users.length + 1,
        name: name,
        email: email
    };

    users.push(newUser);

    res.status(201).json({
        message: "User created successfully.",
        user: newUser
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});