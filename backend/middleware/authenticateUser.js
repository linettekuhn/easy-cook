const firebase = require("firebase-admin");

async function authenticateUser(req, res, next) {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    req.user = null;
    next();
  } else {
    const idToken = header.split("Bearer ")[1];
    try {
      const decoded = await firebase.auth().verifyIdToken(idToken);
      req.user = decoded;
      next();
    } catch (error) {
      console.log("error verifying token: ", error);
      return res.status(401).json({ error: "invalid or expired token" });
    }
  }
}

module.exports = authenticateUser;
