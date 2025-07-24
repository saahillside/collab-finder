const express = require("express");
const router = express.Router();
const mysql = require("mysql2");

// Database connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "mySQLpassword!",
    database: "collab_finder"
});


// GET response by ID
router.get("/:id", (req, res) => {
    const responseId = req.params.id;
    const q = "SELECT * FROM responses WHERE id = ?";
    db.query(q, [responseId], (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Database error" });
        }
        if (data.length === 0) {
            return res.status(404).json({ error: "Response not found" });
        }
        return res.json(data[0]);
    });
});

// GET responses for a specific collab
router.get("/collab/:collabId", (req, res) => {
    const collabId = req.params.collabId;
    const q = "SELECT * FROM responses WHERE collabId = ?";
    db.query(q, [collabId], (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Database error" });
        }
        return res.json(data);
    });
});

// POST create a new response
router.post("/", (req, res) => {
    const { message, soundcloud, instagram, responseTo, responseBy } = req.body;

    const q = `
        INSERT INTO responses (message, soundcloud, instagram, responseTo, responseBy)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(q, [message, soundcloud, instagram, responseTo, responseBy], (err, result) => {
        if (err) {
            console.error("Error inserting response:", err);
            return res.status(500).json({ error: "Failed to add response" });
        }

        return res.status(201).json({ message: "Response added successfully", id: result.insertId });
    });
});

// PUT update a response
router.put("/:id", (req, res) => {
    const responseId = req.params.id;
    const { message } = req.body;

    const q = "UPDATE responses SET message = ? WHERE id = ?";
    db.query(q, [message, responseId], (err, result) => {
        if (err) {
            console.error("Error updating response:", err);
            return res.status(500).json({ error: "Update failed" });
        }

        return res.json({ message: "Response updated successfully" });
    });
});

// DELETE a response
router.delete("/:id", (req, res) => {
    const responseId = req.params.id;
    const q = "DELETE FROM responses WHERE id = ?";
    db.query(q, [responseId], (err, result) => {
        if (err) {
            console.error("Error deleting response:", err);
            return res.status(500).json({ error: "Delete failed" });
        }

        return res.json({ message: "Response deleted successfully" });
    });
});


router.get("/", (req, res) => {
    const { responseTo, responseBy } = req.query;

    let q = "SELECT * FROM responses";
    const params = [];

    if (responseTo && responseBy) {
        q += " WHERE responseTo = ? AND responseBy = ?";
        params.push(responseTo, responseBy);
    } else if (responseTo) {
        q += " WHERE responseTo = ?";
        params.push(responseTo);
    } else if (responseBy) {
        q += " WHERE responseBy = ?";
        params.push(responseBy);
    }

    db.query(q, params, (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Database error" });
        }
        return res.json(data);
    });
});


module.exports = router;
