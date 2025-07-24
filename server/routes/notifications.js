// server/routes/notifications.js

const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "mySQLpassword!",
  database: "collab_finder"
});

// GET all notifications
router.get("/", (req, res) => {
  const q = "SELECT * FROM notifications";
  db.query(q, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json("Error!");
    }
    return res.json(data);
  });
});

// GET all notifications for a user
router.get('/:userId', (req, res) => {
  const userId = req.params.userId;

  const query = `
    SELECT * FROM notifications
    WHERE notifTo = ?
    ORDER BY created_at DESC
  `;

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Error fetching notifications:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    res.json(results);
  });
});

// GET count of unread notifications for a user
router.get('/:userId/unreadcount', (req, res) => {
  const userId = req.params.userId;

  const query = `
    SELECT COUNT(*) AS count FROM notifications
    WHERE notifTo = ? AND isRead = false
  `;

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Error counting unread notifications:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    res.json({ count: results[0].count });
  });
});

// POST a new notification
router.post('/', (req, res) => {
  const { notifTo, notifBy, type, message, relatedID } = req.body;

  const query = `
    INSERT INTO notifications (notifTo, notifBy, type, message, relatedID)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(query, [notifTo, notifBy, type, message, relatedID], (err, result) => {
    if (err) {
      console.error('Error inserting notification:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    res.status(201).json({ id: result.insertId });
  });
});

// Mark a specific notification as read
router.put('/:id/read', (req, res) => {
  const notifId = req.params.id;

  const query = 'UPDATE notifications SET isRead = true WHERE id = ?';
  db.query(query, [notifId], (err, result) => {
    if (err) {
      console.error('Error marking notification as read:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json({ success: true });
  });
});

// Mark a specific notification as unread (for testing or toggle)
router.put('/:id/unread', (req, res) => {
  const notifId = req.params.id;

  const query = 'UPDATE notifications SET isRead = false WHERE id = ?';
  db.query(query, [notifId], (err, result) => {
    if (err) {
      console.error('Error marking notification as unread:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json({ success: true });
  });
});

module.exports = router;
