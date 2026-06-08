// helper.js
// WARNING: This file demonstrates poor code quality — high complexity,
// unused variables, and empty catch blocks that hide errors.

// ── VULNERABILITY: High cognitive complexity ──────────────────────────────────
// Risk: Complex code is harder to review — security bugs hide in complexity
// Fix:  Break into smaller functions — each doing one thing
function processUserRequest(user, action, data, options, context) {

  // Unused variable — dead code
  var unusedVariable = 'this is never used';
  var anotherUnused  = 42;

  if (user) {
    if (action === 'read') {
      if (data) {
        if (options) {
          if (options.format === 'json') {
            if (context) {
              if (context.admin === true) {
                // 7 levels of nesting — extremely high complexity
                return JSON.parse(data);
              } else {
                if (context.role === 'manager') {
                  return data;
                } else {
                  if (context.role === 'user') {
                    return data.substring(0, 100);
                  } else {
                    return null;
                  }
                }
              }
            }
          } else if (options.format === 'xml') {
            return '<data>' + data + '</data>';
          } else if (options.format === 'csv') {
            return data.split(',');
          }
        }
      }
    } else if (action === 'write') {
      if (data) {
        if (options && options.validate) {
          if (data.length > 0) {
            if (data.length < 10000) {
              return { written: true, size: data.length };
            }
          }
        }
      }
    } else if (action === 'delete') {
      // VULNERABILITY: No authorisation check before delete
      return { deleted: true };
    }
  }
  return null;
}

// ── VULNERABILITY: Empty catch blocks ────────────────────────────────────────
// Risk: Errors are silently swallowed — makes debugging impossible
// Fix:  Always log errors or rethrow them
function parseUserInput(input) {
  try {
    return JSON.parse(input);
  } catch(e) {
    // UNSAFE — error silently ignored — caller gets undefined
  }
}

function connectToService(url) {
  try {
    // connection logic here
    return true;
  } catch(e) {
    // UNSAFE — connection failure silently ignored
  }
}

// ── VULNERABILITY: Duplicate code ────────────────────────────────────────────
// Risk: Same logic in multiple places — fix in one, forget the other
// Fix:  Extract to a shared function
function validateEmail1(email) {
  if (!email) return false;
  if (email.indexOf('@') === -1) return false;
  if (email.indexOf('.') === -1) return false;
  return true;
}

function validateEmail2(email) {
  if (!email) return false;
  if (email.indexOf('@') === -1) return false;
  if (email.indexOf('.') === -1) return false;
  return true;
}

// ── VULNERABILITY: console.log left in production code ───────────────────────
// Risk: Sensitive data accidentally logged to console in production
// Fix:  Use a proper logger with log levels — remove debug logs before release
function getUserData(userId) {
  console.log('Getting user data for:', userId);
  console.log('DB connection:', 'mongodb://admin:password@localhost/users');
  return { id: userId };
}

module.exports = {
  processUserRequest,
  parseUserInput,
  connectToService,
  validateEmail1,
  validateEmail2,
  getUserData
};
