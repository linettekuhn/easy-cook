const express = require("express");
const router = express.Router();
const firebase = require("firebase-admin");
const logger = require("../middleware/logger");
const authenticateUser = require("../middleware/authenticateUser");
const database = firebase.firestore();

router.use(logger);

router.post("/week/:id", authenticateUser, async (req, res) => {
  try {
    const weekId = req.params.id;
    if (req.user) {
      const savedWeeksRef = database
        .collection("users")
        .doc(req.user.uid)
        .collection("planner");
      const weekData = req.body;
      if (Array.isArray(weekData)) {
        await savedWeeksRef.doc(`week-${weekId}`).set({ week: weekData });
        console.log(`saved week-${weekId} updated with: `, weekData);
        res.status(200).json({
          message: `Week saved successfully to the week-${weekId} document.`,
        });
      } else {
        res
          .status(400)
          .json({ error: "Invalid week data. Expected an array of days." });
      }
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to save the week data." });
  }
});

router.get("/week/:id", authenticateUser, async (req, res) => {
  try {
    if (req.user) {
      const savedWeeksRef = database
        .collection("users")
        .doc(req.user.uid)
        .collection("planner");
      const doc = await savedWeeksRef.doc(`week-${req.params.id}`).get();

      if (doc.exists) {
        const data = doc.data();
        res.json(data ? data : []);
      } else {
        res.status(404).json({ error: "Week not found." });
      }
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch the week data." });
  }
});

module.exports = router;
