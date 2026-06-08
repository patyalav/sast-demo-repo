// login.js
// WARNING: This file demonstrates SQL Injection — one of the OWASP Top 10 vulnerabilities.
// User input is directly concatenated into SQL queries without sanitisation.

const express = require('express');
const router  = express.Router();
const db      = require('../config/database');

// ── VULNERABILITY: SQL Injection ──────────────────────────────────────────────
// Risk: Attacker can pass " OR '1'='1 as username to bypass authentication
// Fix:  Use parameterised queries — db.query('SELECT * FROM users WHERE username = ?', [username])
router.post('/login', function(req, res) {
  const username = req.body.username;
  const password = req.body.password;

  // UNSAFE — user input directly in SQL string
  const query = "SELECT * FROM users WHERE username = '" + username + "' AND password = '" + password + "'";

  db.query(query, function(err, results) {
    if (err) {
      // VULNERABILITY: Error details exposed to user — reveals database structure
      res.status(500).send('Database error: ' + err.message);
      return;
    }

    if (results.length > 0) {
      // VULNERABILITY: No session token generated — insecure session management
      res.json({ success: true, user: results[0] });
    } else {
      res.status(401).json({ success: false });
    }
  });
});

// ── VULNERABILITY: No rate limiting ──────────────────────────────────────────
// Risk: Attacker can brute force passwords with unlimited attempts
router.post('/admin', function(req, res) {
  const adminUser = req.body.user;

  // UNSAFE — admin check via SQL injection vulnerable query
  const query = "SELECT * FROM admins WHERE username = '" + adminUser + "'";

  db.query(query, function(err, results) {
    // VULNERABILITY: Empty catch — errors silently ignored
    try {
      res.json(results);
    } catch(e) {}
  });
});

module.exports = router;
