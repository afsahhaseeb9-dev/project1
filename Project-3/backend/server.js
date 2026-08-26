const express = require("express");
const cors = require("cors");
require("dotenv").config();

const db = require("./database");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.json({
        message: "Backend API is running successfully!"
    });
});

app.get("/api/users", (req, res) => {
    const users = db.prepare("SELECT * FROM users").all();

    res.status(200).json(users);
});

app.post("/api/users", (req, res) => {

    const { name, email } = req.body;

    if (!name || !email || !name.trim() || !email.trim()) {
        return res.status(400).json({
            message: "Name and email are required."
        });
    }

    const statement = db.prepare(
        "INSERT INTO users (name, email) VALUES (?, ?)"
    );

    const result = statement.run(name, email);

    const newUser = db.prepare(
        "SELECT * FROM users WHERE id = ?"
    ).get(result.lastInsertRowid);

    res.status(201).json({
        message: "User created successfully.",
        user: newUser
    });
});

app.put("/api/users/:id", (req, res) => {

    const { name, email } = req.body;
    const { id } = req.params;

    if (!name || !email || !name.trim() || !email.trim()) {
        return res.status(400).json({
            message: "Name and email are required."
        });
    }

    const statement = db.prepare(
        "UPDATE users SET name = ?, email = ? WHERE id = ?"
    );

    const result = statement.run(name, email, id);

    if (result.changes === 0) {
        return res.status(404).json({
            message: "User not found."
        });
    }

    const updatedUser = db.prepare(
        "SELECT * FROM users WHERE id = ?"
    ).get(id);

    res.status(200).json({
        message: "User updated successfully.",
        user: updatedUser
    });
});

app.delete("/api/users/:id", (req, res) => {

    const { id } = req.params;

    const statement = db.prepare(
        "DELETE FROM users WHERE id = ?"
    );

    const result = statement.run(id);

    if (result.changes === 0) {
        return res.status(404).json({
            message: "User not found."
        });
    }

    res.status(200).json({
        message: "User deleted successfully."
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});