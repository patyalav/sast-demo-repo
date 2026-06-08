// fileHandler.js
// WARNING: This file demonstrates Path Traversal — allows attackers to read
// files outside the intended directory by manipulating file paths.

const fs   = require('fs');
const path = require('path');

// ── VULNERABILITY: Path Traversal ────────────────────────────────────────────
// Risk: Attacker sends filename = '../../etc/passwd' to read system files
// Fix:  Validate and sanitise filename — use path.basename() to strip directory parts
function readUserFile(filename) {
  // UNSAFE — no validation on filename — attacker can traverse directories
  const filePath = './uploads/' + filename;
  return fs.readFileSync(filePath, 'utf8');
}

// ── VULNERABILITY: No error handling ─────────────────────────────────────────
// Risk: Unhandled errors crash the server or leak stack traces to users
// Fix:  Always wrap file operations in try/catch
function writeUserFile(filename, data) {
  // UNSAFE — no try/catch — file write errors crash the process
  const filePath = './uploads/' + filename;
  fs.writeFileSync(filePath, data);
}

// ── VULNERABILITY: Directory listing ─────────────────────────────────────────
// Risk: Exposes all filenames in a directory — helps attackers map the system
// Fix:  Never expose directory listings to users
function listFiles(directory) {
  // UNSAFE — exposes full directory contents including sensitive files
  const files = fs.readdirSync(directory);
  return files;
}

// ── VULNERABILITY: Unsafe file deletion ──────────────────────────────────────
// Risk: Attacker can delete arbitrary files including system files
// Fix:  Whitelist allowed filenames — never allow user-controlled paths
function deleteFile(filename) {
  // UNSAFE — no path validation before deletion
  const filePath = './uploads/' + filename;

  // VULNERABILITY: Empty catch — deletion errors silently ignored
  try {
    fs.unlinkSync(filePath);
  } catch(e) {
    // swallowed silently — bad practice
  }
}

// ── VULNERABILITY: Synchronous file operations blocking event loop ────────────
// Risk: Large file reads block the entire Node.js event loop
// Fix:  Use async fs.readFile() with callbacks or promises
function readLargeFile(filename) {
  // UNSAFE — sync read blocks all other requests while file is being read
  return fs.readFileSync('./data/' + filename);
}

module.exports = {
  readUserFile,
  writeUserFile,
  listFiles,
  deleteFile,
  readLargeFile
};
