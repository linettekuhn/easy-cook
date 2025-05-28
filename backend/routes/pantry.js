const express = require("express");
const router = express.Router();
const credentials = require("../api/spoonacular-credentials.json");
const firebase = require("firebase-admin");
const database = firebase.firestore();
const logger = require("../middleware/logger");
const authenticateUser = require("../middleware/authenticateUser");

router.use(logger);

router.get("/saved", authenticateUser, async (req, res) => {
  try {
    if (req.user) {
      const savedIngredientsRef = database
        .collection("users")
        .doc(req.user.uid)
        .collection("pantry");
      const snapshot = await savedIngredientsRef.get();
      const ingredients = [];

      snapshot.forEach((doc) => {
        if (doc.data() && doc.data().ingredient) {
          ingredients.push(doc.data().ingredient);
        }
      });
      res.json(ingredients);
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch saved ingredients." });
  }
});

router.post("/store", authenticateUser, async (req, res) => {
  try {
    if (req.user) {
      const savedIngredientsRef = database
        .collection("users")
        .doc(req.user.uid)
        .collection("pantry");
      const { ingredientsToUpdate, ingredientsToDelete } = req.body;
      const batch = database.batch();

      // ingredients to update
      if (Array.isArray(ingredientsToUpdate)) {
        ingredientsToUpdate.forEach((ingredient) => {
          let docId = `ingredient-${ingredient.id}`;
          const doc = savedIngredientsRef.doc(docId);
          batch.set(doc, { ingredient: ingredient });
        });
      }

      // ingredients to remove
      if (Array.isArray(ingredientsToDelete)) {
        ingredientsToDelete.forEach((docId) => {
          const doc = savedIngredientsRef.doc(docId);
          batch.delete(doc);
        });
      }

      await batch.commit();
      console.log("saved ingredients updated with: ", ingredientsToUpdate);
      res.status(200).json({
        message:
          "Ingredients saved successfully to the 'ingredients' document.",
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to save ingredients." });
  }
});

router.get("/search/autocomplete", async (req, res) => {
  try {
    // encode query for url
    const encondedQuery = encodeURIComponent(req.query.query);

    let apiRequest = `https://api.spoonacular.com/food/ingredients/autocomplete?query=${encondedQuery}&number=5&metaInformation=true&apiKey=${credentials.API_KEY}`;
    console.log(apiRequest);

    // request data from api
    const response = await fetch(apiRequest, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // parse json data returned by api
    const data = await response.json();
    console.log(data);
    res.send(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch autocomplete results." });
  }
});

router.get("/search/recipes", async (req, res) => {
  try {
    const encondedIngredients = encodeURIComponent(req.query.ingredients);

    let apiRequest = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${encondedIngredients}&number=20&apiKey=${credentials.API_KEY}`; // request data from api
    const response = await fetch(apiRequest, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log(data);
    res.send(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch recipes." });
  }
});
module.exports = router;
