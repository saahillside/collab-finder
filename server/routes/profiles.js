const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

// Create the database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "mySQLpassword!",
  database: "collab_finder"
});

// GET all profiles or filter by username
router.get('/', (req, res) => {
  const { username } = req.query;

  let query = "SELECT * FROM profiles";
  let params = [];

  if (username) {
    query += " WHERE username = ?";
    params.push(username);
  }

  db.query(query, params, (err, data) => {
    if (err) {
      console.error("Error fetching profiles:", err);
      return res.status(500).json({ error: "Database error" });
    }

    return res.json(data);
  });
});

// GET a single profile by ID
router.get('/:id', (req, res) => {
  const q = "SELECT * FROM profiles WHERE id = ?";
  db.query(q, [req.params.id], (err, data) => {
    if (err) {
      console.error("Error fetching profile:", err);
      return res.status(500).json({ error: "Database error" });
    }
    if (data.length === 0) {
      return res.status(404).json({ error: "Profile not found" });
    }
    return res.json(data[0]);
  });
});

// POST a new profile
router.post('/', (req, res) => {
  const {
    id,
    username,
    password,
    displayName,
    bio,
    profilePicture,
    genres,
    roles,
    socialLinks
  } = req.body;

  const q = `
    INSERT INTO profiles 
    (id, username, password, displayName, bio, profilePicture, genres, roles, socialLinks)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    id,
    username,
    password,
    displayName,
    bio,
    profilePicture,
    JSON.stringify(genres),
    JSON.stringify(roles),
    JSON.stringify(socialLinks)
  ];

  db.query(q, values, (err, result) => {
    if (err) {
      console.error("Error inserting profile:", err);
      return res.status(500).json({ error: "Database insert failed" });
    }

    return res.status(201).json({ message: "Profile created!" });
  });
});

// PUT (update) an existing profile
router.put('/:id', (req, res) => {
  const {
    username,
    password,
    displayName,
    bio,
    profilePicture,
    genres,
    roles,
    socialLinks
  } = req.body;

  const q = `
    UPDATE profiles SET 
      username = ?, password = ?, displayName = ?, bio = ?, profilePicture = ?, 
      genres = ?, roles = ?, socialLinks = ?
    WHERE id = ?
  `;

  const values = [
    username,
    password,
    displayName,
    bio,
    profilePicture,
    JSON.stringify(genres),
    JSON.stringify(roles),
    JSON.stringify(socialLinks),
    req.params.id
  ];

  db.query(q, values, (err) => {
    if (err) {
      console.error("Error updating profile:", err);
      return res.status(500).json({ error: "Database update failed" });
    }

    return res.json({ message: "Profile updated!" });
  });
});

// DELETE a profile
router.delete('/:id', (req, res) => {
  const q = "DELETE FROM profiles WHERE id = ?";
  db.query(q, [req.params.id], (err) => {
    if (err) {
      console.error("Error deleting profile:", err);
      return res.status(500).json({ error: "Database delete failed" });
    }

    return res.json({ message: "Profile deleted!" });
  });
});

module.exports = router;
