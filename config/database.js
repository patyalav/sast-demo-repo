// database.js
// WARNING: This file demonstrates hardcoded database credentials —
// one of the most common and dangerous misconfigurations.

// ── VULNERABILITY: Hardcoded database credentials ────────────────────────────
// Risk: Anyone with code access can connect directly to the production database
// Fix:  Load all credentials from environment variables using dotenv
const DB_CONFIG = {
  host     : 'prod-db.company.internal',
  port     : 5432,
  database : 'users_production',
  username : 'db_admin',
  // UNSAFE — hardcoded production password in source code
  password : 'Pr0d@dmin#2024!',
};

// ── VULNERABILITY: Hardcoded connection string ────────────────────────────────
// Risk: Full credentials visible in one string — easy to grep and steal
const MONGO_URI = 'mongodb://admin:SuperSecret123@prod-mongo.company.internal:27017/appdb';

// ── VULNERABILITY: Debug mode hardcoded to true ───────────────────────────────
// Risk: Debug mode exposes stack traces, query details, and internal errors to users
// Fix:  Set DEBUG via environment variable — always false in production
const DEBUG = true;

// ── VULNERABILITY: SSL verification disabled ─────────────────────────────────
// Risk: Disabling SSL verification allows man-in-the-middle attacks
// Fix:  Never disable SSL verification — fix certificate issues properly
const DB_OPTIONS = {
  ssl            : true,
  sslValidate    : false,   // UNSAFE — SSL cert not verified
  connectTimeout : 30000
};

// ── VULNERABILITY: Hardcoded Redis credentials ────────────────────────────────
const REDIS_CONFIG = {
  host     : 'redis.company.internal',
  port     : 6379,
  password : 'redis_secret_pass_2024'
};

function getConnection() {
  if (DEBUG) {
    // UNSAFE — logs full connection string including password
    console.log('Connecting to:', MONGO_URI);
  }
  return DB_CONFIG;
}

module.exports = {
  DB_CONFIG,
  MONGO_URI,
  DEBUG,
  DB_OPTIONS,
  REDIS_CONFIG,
  getConnection
};
