# sast-juice-shop-mini

> ⚠️ **This repository is intentionally vulnerable.**
> It is designed as a demo target for the SAST Pipeline Demo project.
> **Do NOT use any of this code in a real application.**

---

## Purpose

This repository contains deliberately vulnerable JavaScript files covering
common security issues across all OWASP Top 10 categories.

It is used to demonstrate how a multi-tool SAST pipeline detects different
types of security vulnerabilities and code quality issues.

---

## Files and What They Demonstrate

| File | Vulnerabilities |
|---|---|
| `secrets/api-keys.js` | Hardcoded AWS keys, JWT secret, Stripe key, GitHub token |
| `routes/login.js` | SQL Injection, missing rate limiting, empty catch |
| `routes/search.js` | XSS via innerHTML, eval() injection, DOM-based XSS |
| `utils/crypto.js` | Math.random() for tokens, MD5 passwords, DES encryption, SHA1 |
| `utils/fileHandler.js` | Path traversal, no error handling, directory listing |
| `utils/helper.js` | High complexity, unused variables, empty catch, duplicate code |
| `config/database.js` | Hardcoded DB credentials, debug mode on, SSL verification disabled |

---

## Tools That Scan This Repo

| Tool | What It Finds |
|---|---|
| Gitleaks | Hardcoded secrets — API keys, tokens, passwords |
| Semgrep | OWASP patterns — SQLi, XSS, eval, weak crypto |
| SonarQube | Code quality — complexity, bugs, security hotspots |
| Codacy | Best practices — unused vars, empty catch, duplications |

---

## ⚠️ Disclaimer

All vulnerabilities in this repository are intentional and for educational
and demonstration purposes only. This code must never be deployed or used
in any real environment.
