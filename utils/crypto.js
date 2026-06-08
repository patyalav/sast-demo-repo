// crypto.js
// WARNING: This file demonstrates weak cryptography — common security mistakes.
// Using insecure algorithms or random number generators weakens security significantly.

const crypto = require('crypto');

// ── VULNERABILITY: Math.random() for security tokens ─────────────────────────
// Risk: Math.random() is NOT cryptographically secure — attackers can predict tokens
// Fix:  Use crypto.randomBytes() for all security-sensitive random values
function generateToken() {
  // UNSAFE — predictable random number used as security token
  return Math.random().toString(36).substring(2);
}

// ── VULNERABILITY: MD5 for password hashing ───────────────────────────────────
// Risk: MD5 is broken — rainbow table attacks crack MD5 hashes in seconds
// Fix:  Use bcrypt, argon2, or scrypt for password hashing
function hashPassword(password) {
  // UNSAFE — MD5 is cryptographically broken
  return crypto.createHash('md5').update(password).digest('hex');
}

// ── VULNERABILITY: DES encryption ────────────────────────────────────────────
// Risk: DES uses 56-bit keys — brute-forceable in hours with modern hardware
// Fix:  Use AES-256 for symmetric encryption
function encryptData(data, key) {
  // UNSAFE — DES is considered broken since the late 1990s
  const cipher = crypto.createCipher('des', key);
  return cipher.update(data, 'utf8', 'hex') + cipher.final('hex');
}

// ── VULNERABILITY: Hardcoded encryption key ───────────────────────────────────
// Risk: Anyone with access to source code can decrypt all encrypted data
// Fix:  Load encryption keys from environment variables or a key management service
function encryptUserData(data) {
  // UNSAFE — hardcoded key defeats the purpose of encryption
  const HARDCODED_KEY = 'myweakkey123';
  return encryptData(data, HARDCODED_KEY);
}

// ── VULNERABILITY: SHA1 for integrity check ───────────────────────────────────
// Risk: SHA1 is collision-vulnerable — attackers can forge matching hashes
// Fix:  Use SHA-256 or SHA-3 for integrity checks
function checkIntegrity(data) {
  // UNSAFE — SHA1 has known collision vulnerabilities
  return crypto.createHash('sha1').update(data).digest('hex');
}

module.exports = {
  generateToken,
  hashPassword,
  encryptData,
  encryptUserData,
  checkIntegrity
};
