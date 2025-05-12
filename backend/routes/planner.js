const express = require("express");
const router = express.Router();
const firebase = require("firebase-admin");
const database = firebase.firestore();

router.use((req, res, next) => {
  console.log(`[Router] ${req.method} ${req.url}`);
  next();
});

router.post("/week/:id", async (req, res) => {
  try {
    const weekId = req.params.id;
    const savedDataRef = database.collection("savedData");
    const weekData = req.body;
    if (Array.isArray(weekData)) {
      await savedDataRef.doc(`week-${weekId}`).set({ week: weekData });
      console.log(`saved week-${weekId} updated with: `, weekData);
      res.status(200).json({
        message: `Week saved successfully to the week-${weekId} document.`,
      });
    } else {
      res
        .status(400)
        .json({ error: "Invalid week data. Expected an array of days." });
    }
  } catch (error) {
    console.error("Error saving week:", error);
  }
});

router.get("/week/:id", async (req, res) => {
  try {
    const savedDataRef = database.collection("savedData");
    const doc = await savedDataRef.doc(`week-${req.params.id}`).get();

    if (doc.exists) {
      const data = doc.data();
      res.json(data ? data.recipes : []);
    } else {
      res.json([]);
    }
  } catch (error) {
    console.error("Error fetching saved recipe:", error);
  }
});

module.exports = router;
