// api-keys.js
// WARNING: This file demonstrates hardcoded secrets — a common security mistake.
// These credentials should NEVER appear in source code.
// They should always be stored in environment variables or a secrets manager.

// ── AWS Access Key ────────────────────────────────────────────────────────────
// Risk: Exposed AWS key allows attackers full access to cloud infrastructure
const AWS_ACCESS_KEY = 'AKIAIOSFODNN7EXAMPLE';
const AWS_SECRET_KEY = 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY';

// ── JWT Secret ────────────────────────────────────────────────────────────────
// Risk: Known JWT secret allows attackers to forge authentication tokens
const JWT_SECRET = 'jwt-secret-example-do-not-use-in-production';

// ── Stripe Payment API Key ────────────────────────────────────────────────────
// Risk: Exposed payment key allows attackers to make charges or steal funds
const STRIPE_SECRET_KEY = 'sk_test_XXXXXXXXXXXXXXXXXXXXXXXXXXXX';

// ── GitHub Personal Access Token ─────────────────────────────────────────────
// Risk: Exposed token allows attackers to access and modify GitHub repositories
const GITHUB_TOKEN = 'ghp_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';

module.exports = {
  AWS_ACCESS_KEY,
  AWS_SECRET_KEY,
  JWT_SECRET,
  STRIPE_SECRET_KEY,
  GITHUB_TOKEN
};