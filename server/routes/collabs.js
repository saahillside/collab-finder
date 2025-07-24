const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

// Database connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "mySQLpassword!",
    database: "collab_finder"
});

// GET all collabs
router.get("/", (req, res) => {
    const q = "SELECT * FROM collabs";
    db.query(q, (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json("Error!");
        }
        return res.json(data);
    });
});

// GET single collab by ID
router.get("/:id", (req, res) => {
    const collabId = req.params.id;
    const q = "SELECT * FROM collabs WHERE id = ?";
    db.query(q, [collabId], (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Database error" });
        }
        if (data.length === 0) {
            return res.status(404).json({ error: "Collab not found" });
        }
        return res.json(data[0]);
    });
});

// CREATE new collab
router.post("/", (req, res) => {
    const { title, role, genre, description, link, postedBy, postedOn } = req.body;

    const mysqlDate = new Date(postedOn).toISOString().slice(0, 19).replace('T', ' ');

    const q = `
        INSERT INTO collabs (title, role, genre, description, link, postedBy, postedOn)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(q, [title, role, genre, description, link, postedBy, mysqlDate], (err, result) => {
        if (err) {
            console.error('Error inserting collab:', err);
            return res.status(500).json({ error: 'Failed to add collab' });
        }
        return res.status(201).json({ message: 'Collab added successfully', id: result.insertId });
    });
});

// UPDATE existing collab
router.put("/:id", (req, res) => {
    const collabId = req.params.id;
    const { title, role, genre, description, link } = req.body;

    const q = `
        UPDATE collabs
        SET title = ?, role = ?, genre = ?, description = ?, link = ?
        WHERE id = ?
    `;

    db.query(q, [title, role, genre, description, link, collabId], (err, result) => {
        if (err) {
            console.error("Error updating collab:", err);
            return res.status(500).json({ error: "Failed to update collab" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Collab not found" });
        }
        return res.json({ message: "Collab updated successfully" });
    });
});

// DELETE collab
router.delete("/:id", (req, res) => {
    const collabId = req.params.id;
    const q = "DELETE FROM collabs WHERE id = ?";

    db.query(q, [collabId], (err, result) => {
        if (err) {
            console.error("Error deleting collab:", err);
            return res.status(500).json({ error: "Failed to delete collab" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Collab not found" });
        }
        return res.json({ message: "Collab deleted successfully" });
    });
});

module.exports = router;
