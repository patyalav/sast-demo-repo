// search.js
// WARNING: This file demonstrates Cross-Site Scripting (XSS) and eval() injection.
// User input is rendered directly into HTML without escaping.

const express = require('express');
const router  = express.Router();

// ── VULNERABILITY: Reflected XSS ─────────────────────────────────────────────
// Risk: Attacker sends a link with <script>maliciousCode()</script> as search term
// The script executes in the victim's browser — stealing cookies or redirecting
// Fix:  Always escape user input before inserting into HTML
router.get('/search', function(req, res) {
  const searchTerm = req.query.q;

  // UNSAFE — user input directly in HTML response
  const html = '<h1>Search results for: ' + searchTerm + '</h1>';
  res.send(html);
});

// ── VULNERABILITY: eval() with user input ────────────────────────────────────
// Risk: Attacker can execute arbitrary JavaScript on the server
// Fix:  Never use eval() — use JSON.parse() for data, proper parsers for code
router.post('/filter', function(req, res) {
  const filterExpression = req.body.filter;

  // UNSAFE — eval executes whatever the user sends
  const result = eval(filterExpression);
  res.json({ result });
});

// ── VULNERABILITY: innerHTML with user data ───────────────────────────────────
// Risk: DOM-based XSS — attacker injects HTML/script via URL fragment
// Fix:  Use textContent instead of innerHTML for user-supplied data
router.get('/display', function(req, res) {
  const userInput = req.query.data;

  const html = `
    <html>
      <body>
        <div id="output"></div>
        <script>
          // UNSAFE — directly setting innerHTML with URL parameter
          document.getElementById('output').innerHTML = '${userInput}';
        </script>
      </body>
    </html>`;

  res.send(html);
});

module.exports = router;
